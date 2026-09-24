import {fields, FORM_ID, SCHEMA_VERSION, CONSENT_VERSION} from './lead-schema.mjs';
export const isUuid = value => typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
export const contactKeys = ['first_name','last_name','email','phone'];
const object = value => value && typeof value === 'object' && !Array.isArray(value);
const text = (value,max) => typeof value==='string' && value.length<=max && !/[\u0000-\u001f\u007f]/.test(value);
export function normalizePhone(value) {
  if(!text(value,40) || /\(\s*0\s*\)/.test(value) || !/^(?:\+|00)[\d .()-]+$/.test(value.trim()))return null;
  const normalized=value.trim().replace(/^00/,'+').replace(/[ .()-]/g,'');
  return /^\+[1-9]\d{7,14}$/.test(normalized)?normalized:null;
}
export function validateAnswers(input) {
  const errors=[], values={};
  if(!object(input))return {errors:['answers'],values};
  for(const field of fields){
    const v=input[field.key];
    if(v===undefined||v===null||v==='') {if(field.required)errors.push(field.key);continue;}
    if(field.multiple){
      if(!Array.isArray(v)||v.length<1||v.length>6||new Set(v).size!==v.length||v.some(item=>!text(item,80)||!field.options.some(o=>o.value===item)))errors.push(field.key);
      else values[field.key]=[...v];
    }else if(field.options){
      if(!text(v,80)||!field.options.some(o=>o.value===v))errors.push(field.key);else values[field.key]=v;
    }else if(field.type==='number'){
      if(typeof v!=='number'||!Number.isSafeInteger(v)||v<field.min||v>field.max)errors.push(field.key);else values[field.key]=v;
    }else if(!text(v,field.maxLength)||!v.trim())errors.push(field.key);
    else if(field.type==='email'){
      const email=v.trim().toLowerCase();
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.split('@')[0].length>64)errors.push(field.key);else values[field.key]=email;
    }else if(field.type==='tel'){
      const phone=normalizePhone(v);if(!phone)errors.push(field.key);else values[field.key]=phone;
    }else values[field.key]=v.trim();
  }
  return {errors,values};
}
export function validateInquiry(input) {
  if(!object(input))return {errors:['body']};
  const errors=[];
  if(input.schema_version!==SCHEMA_VERSION)errors.push('schema_version');
  if(input.form_id!==FORM_ID)errors.push('form_id');
  if(!isUuid(input.submission_id))errors.push('submission_id');
  if(!['de','en','fr'].includes(input.language))errors.push('language');
  // Only whitelisted browser data participates in hashing or reaches Propstack.
  const combined={};
  for(const field of fields)combined[field.key]=(contactKeys.includes(field.key)?input.contact:input.answers)?.[field.key];
  const result=validateAnswers(combined);errors.push(...result.errors);
  if(!object(input.contact_permission)||input.contact_permission.granted!==true||input.contact_permission.text_version!==CONSENT_VERSION)errors.push('contact_permission');
  if(input.newsletter_preference!==undefined && typeof input.newsletter_preference!=='boolean')errors.push('newsletter_preference');
  const attribution={};
  if(!object(input.attribution))errors.push('attribution');
  for(const key of ['utm_source','utm_medium','utm_campaign']){
    const v=input.attribution?.[key]??'';
    if(!text(v,200))errors.push(key);else attribution[key]=v.trim();
  }
  const contact={},answers={};
  for(const field of fields)if(result.values[field.key]!==undefined)(contactKeys.includes(field.key)?contact:answers)[field.key]=result.values[field.key];
  return {errors,payload:{schema_version:SCHEMA_VERSION,submission_id:input.submission_id,form_id:FORM_ID,language:input.language,contact,answers,contact_permission:{granted:true,text_version:CONSENT_VERSION},newsletter_preference:input.newsletter_preference??false,attribution}};
}
