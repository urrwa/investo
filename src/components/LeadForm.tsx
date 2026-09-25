import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, X } from 'lucide-react';
import { useLanguage } from '../i18n';
import { fields, FORM_ID, SCHEMA_VERSION, CONSENT_VERSION, consentText } from '../../shared/lead-schema.mjs';

import {validateAnswers, contactKeys} from '../../shared/inquiry-schema.mjs';
import BotChallenge from './BotChallenge';

const copy = {
  de: { title:'Ihr persönlicher Strategie-Check', intro:'In vier Schritten zu Ihrer Immobilienanfrage. Kostenfrei und unverbindlich.', steps:['Ihr Vorhaben','Ihre Möglichkeiten','Ihr Kontakt','Prüfen & senden'], next:'Weiter', back:'Zurück', choose:'Bitte auswählen', required:'Pflichtfelder sind mit * markiert.', review:'Bitte prüfen Sie Ihre Angaben.', contact:'Datenschutz & Kontakterlaubnis *', newsletter:'Newsletter (freiwillig)', privacy:'Datenschutzerklärung lesen', submit:'Anfrage senden', sending:'Wird übermittelt …', close:'Formular schließen', error:'Bitte prüfen Sie die markierten Pflichtfelder und Ihre Kontakterlaubnis.', unavailable:'Das Formular kann derzeit nicht übermittelt werden. Bitte kontaktieren Sie uns unter info@investo-immobilien.de.', pending:'Der Eingang Ihrer Anfrage ist noch nicht bestätigt. Bitte senden Sie sie nicht erneut. Prüfen Sie den Status oder kontaktieren Sie uns mit Ihrer Referenznummer.', check:'Status prüfen', checking:'Status wird geprüft …', accepted:'Vielen Dank für Ihre Anfrage.', confirmed:'Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns über Ihren bevorzugten Kontaktweg.', reference:'Ihre Referenznummer', home:'Zur Startseite', missing:'Für diesen Browser liegt keine bestätigte Übermittlung vor.', retry:'Die Anfrage wurde nicht empfangen. Sie können Ihre Angaben prüfen und erneut senden.', rate:'Zu viele Anfragen. Bitte warten Sie eine Minute.', time:'Kontaktzeiten gelten in der Zeitzone Europe/Berlin.', yes:'Ja', no:'Nein', bot:'Bitte schließen Sie die Sicherheitsprüfung ab.', newInquiry:'Neue Anfrage beginnen', unknown:'Keine Angabe' },
  en: { title:'Your personal strategy check', intro:'Four steps to your property enquiry. Free and without obligation.', steps:['Your plans','Your finances','Your contact details','Review & send'], next:'Continue', back:'Back', choose:'Please select', required:'Required fields are marked with *.', review:'Please review your details.', contact:'Privacy & permission to contact *', newsletter:'Newsletter (optional)', privacy:'Read the privacy policy', submit:'Submit enquiry', sending:'Submitting …', close:'Close form', error:'Please check the required fields and your permission to contact.', unavailable:'The form cannot be submitted at the moment. Please contact info@investo-immobilien.de.', pending:'Your enquiry has not yet been confirmed. Please do not submit it again. Check its status or contact us with your reference number.', check:'Check status', checking:'Checking status …', accepted:'Thank you for your enquiry.', confirmed:'Your enquiry was successfully submitted. We will contact you using your preferred method.', reference:'Your reference number', home:'Back to homepage', missing:'There is no confirmed submission for this browser.', retry:'Your enquiry was not received. You can review your details and submit again.', rate:'Too many requests. Please wait one minute.', time:'Contact times use the Europe/Berlin time zone.', yes:'Yes', no:'No', bot:'Please complete the security check.', newInquiry:'Start another enquiry', unknown:'Not provided' },
  fr: { title:'Votre bilan stratégique personnalisé', intro:'Quatre étapes pour votre demande immobilière. Gratuit et sans engagement.', steps:['Votre projet','Vos finances','Vos coordonnées','Vérifier et envoyer'], next:'Continuer', back:'Retour', choose:'Veuillez sélectionner', required:'Les champs obligatoires sont marqués d’un *.', review:'Veuillez vérifier vos informations.', contact:'Confidentialité et autorisation de contact *', newsletter:'Newsletter (facultative)', privacy:'Lire la politique de confidentialité', submit:'Envoyer la demande', sending:'Envoi en cours …', close:'Fermer le formulaire', error:'Veuillez vérifier les champs obligatoires et votre autorisation de contact.', unavailable:'Le formulaire ne peut pas être envoyé actuellement. Contactez info@investo-immobilien.de.', pending:'La réception de votre demande n’est pas encore confirmée. Ne la renvoyez pas. Vérifiez son statut ou contactez-nous avec votre référence.', check:'Vérifier le statut', checking:'Vérification en cours …', accepted:'Merci pour votre demande.', confirmed:'Votre demande a été transmise avec succès. Nous vous contacterons par le moyen choisi.', reference:'Votre numéro de référence', home:'Retour à l’accueil', missing:'Aucun envoi confirmé n’est associé à ce navigateur.', retry:'La demande n’a pas été reçue. Vous pouvez vérifier vos informations et réessayer.', rate:'Trop de demandes. Veuillez patienter une minute.', time:'Les horaires suivent le fuseau Europe/Berlin.', yes:'Oui', no:'Non', bot:'Veuillez effectuer la vérification de sécurité.', newInquiry:'Commencer une nouvelle demande', unknown:'Non renseigné' },
};
const STORAGE = 'investo-inquiry-v1';
type Draft = {values:Record<string,string|string[]>;contact:boolean;newsletter:boolean;step:number};
type Submission = {id:string;token:string;metadata:Record<string,string>;attempted:boolean;eventSent?:boolean;accepted?:boolean;draft?:Draft};
let memory:Submission|null=null;
function readSubmission():Submission|null {
  try{const saved=JSON.parse(sessionStorage.getItem(STORAGE)||'null');if(saved?.id&&saved?.token&&saved?.metadata)return saved;}catch{/* Memory fallback if session storage is unavailable. */}
  return memory;
}
function saveSubmission(value:Submission){memory=value;try{sessionStorage.setItem(STORAGE,JSON.stringify(value));}catch{/* Never automatically resend on reload. */}}
function getSubmission(fresh=false):Submission {
  const saved=readSubmission();if(saved&&!fresh)return saved;
  const page=new URL(location.href),metadata:Record<string,string>={};
  for(const key of ['utm_source','utm_medium','utm_campaign'])metadata[key]=(page.searchParams.get(key)||'').slice(0,200);
  const created={id:crypto.randomUUID(),token:crypto.randomUUID(),metadata,attempted:false};saveSubmission(created);return created;
}
function emitSuccess(receipt:any) {
  const saved=readSubmission(); if(!saved||saved.id!==receipt.submission_id||saved.eventSent)return;
  saveSubmission({...saved,eventSent:true,accepted:true,draft:undefined});
  window.dispatchEvent(new CustomEvent('investo:lead-submitted',{detail:{form_id:FORM_ID,submission_id:receipt.submission_id,received_at:receipt.received_at}}));
}
async function readStatus(submission:Submission) {
  const response=await fetch(`/api/inquiries/status/${submission.id}`,{headers:{Authorization:`Bearer ${submission.token}`},cache:'no-store',signal:AbortSignal.timeout(15000)});
  if(response.status===404)return {status:'not_found'};
  if(!response.ok)throw new Error('status_unavailable');
  return response.json();
}

export default function LeadForm({open,onClose}:{open:boolean;onClose:()=>void}) {
  const {language}=useLanguage();const c=copy[language];
  const [step,setStep]=useState(()=>readSubmission()?.draft?.step||1);const [values,setValues]=useState<Record<string,string|string[]>>(()=>readSubmission()?.draft?.values||{});
  const [contact,setContact]=useState(()=>readSubmission()?.draft?.contact||false);const [newsletter,setNewsletter]=useState(()=>readSubmission()?.draft?.newsletter||false);
  const [config,setConfig]=useState<{available:boolean;turnstile_site_key?:string}|null>(null);const [botToken,setBotToken]=useState('');const [botReset,setBotReset]=useState(0);
  const [status,setStatus]=useState<'idle'|'sending'|'pending'|'checking'>('idle');const [error,setError]=useState('');
  const dialog=useRef<HTMLDivElement>(null);const heading=useRef<HTMLHeadingElement>(null);const busy=useRef(false);
  const submission=useRef<Submission | null>(null);
  useEffect(()=>{submission.current=getSubmission();},[]);
  useEffect(()=>{const saved=readSubmission();if(saved&&!saved.accepted){const updated={...saved,draft:{values,contact,newsletter,step}};saveSubmission(updated);submission.current=updated;}},[values,contact,newsletter,step]);
  useEffect(()=>{if(open)void fetch('/api/inquiries/config',{signal:AbortSignal.timeout(10000)}).then(r=>r.json()).then(setConfig).catch(()=>setConfig({available:false}));},[open]);
  useEffect(()=>{
    if(!open)return;
    const previous=document.activeElement as HTMLElement;const overflow=document.body.style.overflow;
    document.body.style.overflow='hidden';heading.current?.focus();
    const saved=submission.current||getSubmission();
    if(saved.attempted){setStep(4);setStatus('pending');}
    return()=>{document.body.style.overflow=overflow;previous?.focus({preventScroll:true});};
  },[open]);
  useEffect(()=>{if(open){dialog.current?.scrollTo({top:0,behavior:'instant'});heading.current?.focus({preventScroll:true});}},[step,open]);
  const finish=(receipt:any)=>{emitSuccess(receipt);window.location.assign('/danke');};
  const checkStatus=async()=>{
    if(busy.current)return;busy.current=true;setStatus('checking');setError('');
    try{const saved=submission.current||getSubmission();const result=await readStatus(saved);
      if(result.status==='accepted'){finish(result);return;}
      if(result.status==='not_found'){const updated={...saved,attempted:false};saveSubmission(updated);submission.current=updated;setStatus('idle');setStep(1);setError('retry');}
      else setStatus('pending');
    }catch{setStatus('pending');setError('unavailable');}finally{busy.current=false;}
  };
  const submit=async(event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();if(busy.current)return;
    if(step<4){const missing=fields.find(f=>f.step===step&&f.required&&f.multiple&&(!Array.isArray(values[f.key])||!values[f.key].length));if(missing){setError('error');return;}setStep(step+1);setError('');return;}
    const lead=Object.fromEntries(fields.map(field=>[field.key,field.type==='number'?(typeof values[field.key]==='string'&&String(values[field.key]).trim()?Number(values[field.key]):undefined):values[field.key]||undefined]));
    const validation=validateAnswers(lead);
    if(validation.errors.length||!contact){setError('error');const field=fields.find(f=>f.key===validation.errors[0]);if(field)setStep(field.step);return;}
    if(!config?.available){setError('unavailable');return;}
    if(!botToken){setError('bot');return;}
    const saved=submission.current||getSubmission();const pending={...saved,attempted:true};submission.current=pending;saveSubmission(pending);
    busy.current=true;setStatus('sending');setError('');
    try{
      const response=await fetch('/api/inquiries',{method:'POST',headers:{'Content-Type':'application/json','Idempotency-Key':saved.id,'X-Submission-Token':saved.token},body:JSON.stringify({schema_version:SCHEMA_VERSION,submission_id:saved.id,form_id:FORM_ID,language,contact:Object.fromEntries(contactKeys.map(key=>[key,validation.values[key]])),answers:Object.fromEntries(Object.entries(validation.values).filter(([key])=>!contactKeys.includes(key))),contact_permission:{granted:contact,text_version:CONSENT_VERSION},newsletter_preference:newsletter,attribution:saved.metadata,bot_token:botToken}),signal:AbortSignal.timeout(25000)});
      const result=await response.json();
      if(response.ok&&result.accepted===true&&result.status==='accepted'&&result.submission_id===saved.id){finish(result);return;}
      if(response.status===202||response.status===409){setStatus('pending');return;}
      if([400,403,413,422,429,503].includes(response.status)){
        const updated={...saved,attempted:false};submission.current=updated;saveSubmission(updated);setStatus('idle');
        setBotToken('');setBotReset(n=>n+1);setError(result.fields?.includes('bot_token')?'bot':response.status===422?'error':response.status===429?'rate':'unavailable');return;
      }
      setStatus('pending');
    }catch{setStatus('pending');}finally{busy.current=false;}
  };
  if(!open)return null;
  const locked=status==='sending'||status==='checking';
  const inputClass='w-full rounded-xl border border-white/20 bg-[#16273D] px-3 py-3 text-sm text-white focus:border-investo-gold focus:outline-none focus:ring-1 focus:ring-investo-gold';
  return <div className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6" onClick={event=>{if(event.target===event.currentTarget&&!locked)onClose();}}>
    <div ref={dialog} id="strategy-modal" role="dialog" aria-modal="true" aria-labelledby="lead-title" aria-busy={locked} className="relative w-full max-w-2xl max-h-[92dvh] overflow-y-auto rounded-3xl border border-white/15 bg-[#091726] p-5 sm:p-8 text-white shadow-2xl"
      onKeyDown={event=>{
        if(event.key==='Escape'&&!locked)onClose();
        if(event.key==='Tab'){
          const focusable=(Array.from(dialog.current?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled])')||[]) as HTMLElement[]).filter(el=>el.getClientRects().length);
          const first=focusable[0],last=focusable.at(-1);if(event.shiftKey&&(document.activeElement===first||document.activeElement===heading.current)){event.preventDefault();last?.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
        }
      }}>
      <button type="button" onClick={onClose} disabled={locked} aria-label={c.close} className="absolute right-4 top-4 p-2 rounded-full hover:bg-white/10 disabled:opacity-30"><X size={20}/></button>
      <p className="text-investo-gold text-xs tracking-widest uppercase mb-3">INVESTO IMMOBILIEN</p>
      <h2 ref={heading} tabIndex={-1} id="lead-title" className="font-serif text-2xl sm:text-3xl pr-7 outline-none">{c.title}</h2>
      <p className="mt-3 text-sm text-slate-300 leading-relaxed">{c.intro}</p>
      <ol className="grid grid-cols-4 gap-2 mt-6 mb-7" aria-label={c.title}>{c.steps.map((title,index)=><li key={index} aria-current={step===index+1?'step':undefined} className="min-w-0"><div className={`h-1 rounded-full mb-2 ${step>=index+1?'bg-investo-gold':'bg-white/15'}`}/><span className={`block text-[10px] sm:text-xs ${step===index+1?'text-investo-gold':'text-slate-400'}`}>{index+1}. {title}</span></li>)}</ol>
      {error&&<p role="alert" className="mb-5 rounded-xl border border-amber-300/30 bg-amber-300/10 p-3 text-sm text-amber-100">{c[error as keyof typeof c]}</p>}
      {status==='pending'||status==='checking'?<div className="space-y-5" role="status"><p className="text-sm leading-relaxed">{c.pending}</p><p className="text-xs text-slate-300 break-all">{c.reference}: {submission.current?.id}</p><button type="button" disabled={locked} onClick={checkStatus} className="rounded-xl bg-investo-gold text-[#091726] font-semibold px-5 py-3 disabled:opacity-50">{locked?c.checking:c.check}</button></div>:
      <form onSubmit={submit}>
        {step<4?<><h3 className="text-lg font-semibold mb-1">{c.steps[step-1]}</h3><p className="text-xs text-slate-400 mb-5">{c.required}</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{fields.filter(field=>field.step===step).map(field=><div key={field.key} className="block text-sm font-medium"><label htmlFor={`lead-${field.key}`} className="block mb-2">{field.label[language]}{field.required?' *':''}</label>{field.multiple?<span className="block space-y-2" role="group" aria-label={field.label[language]}>{field.options.map(opt=><label key={opt.value} className="flex items-center gap-2 font-normal"><input type="checkbox" name={field.key} value={opt.value} checked={Array.isArray(values[field.key])&&values[field.key].includes(opt.value)} onChange={event=>setValues(v=>{const selected=Array.isArray(v[field.key])?v[field.key] as string[]:[];return {...v,[field.key]:event.target.checked?[...selected,opt.value]:selected.filter(item=>item!==opt.value)};})}/>{opt.label[language]}</label>)}</span>:field.options?<select id={`lead-${field.key}`} name={field.key} required={field.required} value={values[field.key]||''} onChange={event=>setValues(v=>({...v,[field.key]:event.target.value}))} className={inputClass}><option value="">{c.choose}</option>{field.options.map(opt=><option key={opt.value} value={opt.value}>{opt.label[language]}</option>)}</select>:<input id={`lead-${field.key}`} name={field.key} type={field.type} required={field.required} min={field.min} max={field.max} step={field.type==='number'?1:undefined} maxLength={field.maxLength} autoComplete={field.autoComplete} value={String(values[field.key]??'')} onChange={event=>setValues(v=>({...v,[field.key]:event.target.value}))} className={inputClass}/>}</div>)}</div>{step===3&&<p className="text-xs text-slate-400 mt-4">{c.time}</p>}</>:
          <><h3 className="text-lg font-semibold mb-4">{c.review}</h3><dl className="divide-y divide-white/10 mb-6">{fields.map(field=><div key={field.key} className="py-2 grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm"><dt className="text-slate-400">{field.label[language]}</dt><dd className="break-words">{field.multiple?(Array.isArray(values[field.key])?(values[field.key] as string[]).map(v=>field.options.find(o=>o.value===v)?.label[language]||v).join(', '):c.unknown):field.options?.find(opt=>opt.value===values[field.key])?.label[language]||values[field.key]||c.unknown}</dd></div>)}</dl>
          <fieldset disabled={locked} className="space-y-5"><legend className="sr-only">{c.contact}</legend>
            <label className="flex gap-3 text-sm leading-relaxed"><input id="lead-contact-consent" type="checkbox" required checked={contact} onChange={event=>setContact(event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#d4b27c]"/><span><strong className="block mb-1">{c.contact}</strong>{consentText.contact[language]} <a href="/datenschutz" target="_blank" rel="noopener noreferrer" className="text-investo-gold underline">{c.privacy}</a></span></label>
            <label className="flex gap-3 text-sm leading-relaxed text-slate-300"><input id="lead-newsletter-consent" type="checkbox" checked={newsletter} onChange={event=>setNewsletter(event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#d4b27c]"/><span><strong className="block mb-1">{c.newsletter}</strong>{consentText.newsletter[language]}</span></label>
          </fieldset>{config?.available&&config.turnstile_site_key?<BotChallenge resetVersion={botReset} siteKey={config.turnstile_site_key} submissionId={submission.current?.id||''} language={language} onVerify={setBotToken}/>:<p className="mt-5 text-sm text-amber-100" role="status">{c.unavailable}</p>}</>}
        <div className="flex gap-3 mt-7">{step>1&&<button type="button" disabled={locked} onClick={()=>{setStep(step-1);setError('');}} className="flex items-center gap-2 px-4 py-3 border border-white/20 rounded-xl disabled:opacity-40"><ArrowLeft size={16}/>{c.back}</button>}<button type="submit" disabled={locked} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-investo-gold text-[#091726] font-bold px-4 py-3 disabled:opacity-50">{locked?<><Loader2 size={18} className="animate-spin"/>{c.sending}</>:<>{step===4?c.submit:c.next}<ArrowRight size={18}/></>}</button></div>
      </form>}
    </div>
  </div>;
}

export function ThankYouPage() {
  const {language}=useLanguage();const c=copy[language];const [status,setStatus]=useState('checking');const [id,setId]=useState('');
  const check=async()=>{const saved=readSubmission();if(!saved){setStatus('missing');return;}setId(saved.id);setStatus('checking');try{const result=await readStatus(saved);if(result.status==='accepted'){emitSuccess(result);setStatus('accepted');}else setStatus(result.status==='not_found'?'missing':'pending');}catch{setStatus('pending');}};
  useEffect(()=>{void check();},[]);
  return <main className="min-h-screen bg-[#16273D] text-white flex items-center justify-center px-5 py-12"><div className="max-w-xl w-full border border-white/15 rounded-3xl p-8 sm:p-12 bg-[#091726] text-center"><p className="tracking-widest text-investo-gold text-xs mb-7">INVESTO IMMOBILIEN</p>{status==='accepted'&&<CheckCircle2 className="mx-auto text-investo-gold mb-5" size={44}/>}<h1 className="font-serif text-3xl mb-5">{status==='accepted'?c.accepted:status==='checking'?c.checking:status==='missing'?c.missing:c.pending}</h1>{status==='accepted'&&<><p className="text-slate-300 leading-relaxed">{c.confirmed}</p><button onClick={()=>{getSubmission(true);location.assign('/');}} className="mt-6 rounded-xl bg-investo-gold px-5 py-3 text-black">{c.newInquiry}</button></>}{id&&<p className="mt-5 text-xs text-slate-400 break-all">{c.reference}: {id}</p>}{status==='pending'&&<button onClick={check} className="mt-6 bg-investo-gold text-black rounded-xl px-5 py-3">{c.check}</button>}<a href="/" className="block mt-8 text-investo-gold underline">{c.home}</a></div></main>;
}
