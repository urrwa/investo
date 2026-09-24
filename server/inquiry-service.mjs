import {newContact,inquiryTask,CRM} from '../automation/website-mapping.mjs';
import {createPropstack,eligibleContact,recordId,taskMatches,ReviewRequired} from './propstack.mjs';
export function createInquiryService({store,apiKey,newContactOwnerId,fetchImpl,timeoutMs}) {
  const vendor=createPropstack({apiKey,fetchImpl,timeoutMs});
  async function process(id) {
    const token=store.claim(id);if(!token)return store.get(id);
    const before=()=>store.touch(id,token),set=values=>store.update(id,token,values);
    try {
      let row=store.get(id);const payload=JSON.parse(row.payload_json);
      if(!row.contact_id){
        if(!store.emailLock(row)){set({next_attempt:Date.now()+15000});return store.get(id);}
        let contact=await vendor.findContact(payload.contact.email,before);
        if(!contact){
          if(row.phase==='contact_create_started') {set({next_attempt:Date.now()+30000});if(row.attempts>=3)throw new ReviewRequired('contact_creation_uncertain');return store.get(id);}
          if(!CRM.ceoIds.includes(newContactOwnerId))throw new ReviewRequired('new_owner_not_configured');
          // Persist intent before a mutating call. A crash/timeout can only reconcile, never repeat this POST.
          set({phase:'contact_create_started'});
          const created=await vendor.request('/contacts',{method:'POST',body:newContact(payload,newContactOwnerId),before});
          const contactId=recordId(created);if(!contactId)throw Error('Contact create response uncertain.');
          set({contact_id:contactId,phase:'contact_resolved'});
          contact=await vendor.request(`/contacts/${contactId}`,{before});
        }
        const owner=eligibleContact(contact,payload.contact.email);
        set({contact_id:recordId(contact),owner_id:owner,phase:'contact_resolved'});
        store.unlockEmail(id);
      }
      row=store.get(id);
      // Re-read restrictions/owner before every inquiry write or reconciliation.
      const fresh=await vendor.request(`/contacts/${row.contact_id}`,{before});
      const owner=eligibleContact(fresh,payload.contact.email);
      if(row.owner_id && row.owner_id!==owner && row.phase==='inquiry_create_started')throw new ReviewRequired('owner_changed_during_write');
      set({owner_id:owner});store.unlockEmail(id);row=store.get(id);
      if(row.inquiry_id){
        const task=await vendor.request(`/tasks/${row.inquiry_id}`,{before});
        if(!taskMatches(task,null,row))throw new ReviewRequired('inquiry_readback_mismatch');
        set({status:'accepted',phase:'inquiry_stored',review_reason:null});return store.get(id);
      }
      if(row.phase==='inquiry_create_started'){
        const found=await vendor.findInquiry(row,before);
        if(found){set({inquiry_id:found,status:'accepted',phase:'inquiry_stored',review_reason:null});return store.get(id);}
        if(row.attempts>=3)throw new ReviewRequired('inquiry_creation_uncertain');
        set({next_attempt:Date.now()+30000});return store.get(id);
      }
      const evidence=JSON.parse(row.evidence_json);
      const body=inquiryTask(payload,{contactId:row.contact_id,ownerId:owner,receivedAt:row.received_at,...evidence});
      set({phase:'inquiry_create_started'});
      const created=await vendor.request('/tasks',{method:'POST',body,before});
      const inquiryId=recordId(created);if(!inquiryId)throw Error('Inquiry create response uncertain.');
      set({inquiry_id:inquiryId});
      const task=await vendor.request(`/tasks/${inquiryId}`,{before});
      if(!taskMatches(task,null,store.get(id)))throw new ReviewRequired('inquiry_readback_mismatch');
      set({status:'accepted',phase:'inquiry_stored',review_reason:null});
    }catch(error){
      const row=store.get(id);
      if(error instanceof ReviewRequired){
        set({status:'review',review_reason:error.message});
        // Keep the email lock only if an unconfirmed contact creation could still appear.
        if(row.contact_id||row.phase!=='contact_create_started')store.unlockEmail(id);
      }else set({next_attempt:Date.now()+30000,review_reason:'vendor_unavailable'});
    }finally{store.release(id,token);}
    return store.get(id);
  }
  let working=false;
  async function resumePending(){if(working||!apiKey)return;working=true;try{for(const row of store.pending())await process(row.id);}finally{working=false;}}
  return {process,resumePending};
}
