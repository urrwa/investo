import {useEffect,useRef} from 'react';
declare global {interface Window {turnstile?:any}}
let loading:Promise<void>|undefined;
function loadWidget(){
  if(window.turnstile)return Promise.resolve();
  if(!loading)loading=new Promise<void>((resolve,reject)=>{
    const script=document.createElement('script');script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';script.async=true;
    script.onload=()=>resolve();script.onerror=()=>{loading=undefined;script.remove();reject(Error('Verification unavailable'));};document.head.appendChild(script);
  });
  return loading;
}
export default function BotChallenge({siteKey,submissionId,language,resetVersion,onVerify}:{siteKey:string;submissionId:string;language:string;resetVersion:number;onVerify:(token:string)=>void}) {
  const container=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    let disposed=false,widget:string|undefined;onVerify('');
    void loadWidget().then(()=>{if(disposed||!container.current)return;widget=window.turnstile.render(container.current,{sitekey:siteKey,action:'investo-inquiry',cData:submissionId,language,size:container.current.clientWidth<300?'compact':'flexible',theme:'dark',callback:onVerify,'expired-callback':()=>onVerify(''),'error-callback':()=>onVerify('')});}).catch(()=>onVerify(''));
    return()=>{disposed=true;if(widget!==undefined)window.turnstile?.remove(widget);};
  },[siteKey,submissionId,language,resetVersion,onVerify]);
  return <div ref={container} className="mt-5 min-w-0"/>;
}
