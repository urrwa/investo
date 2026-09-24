import 'dotenv/config';
import path from 'node:path';
import {createApp} from './app.mjs';
const port=Number(process.env.PORT||3001);
const {app,service,close}=createApp({
  databasePath:path.resolve(process.env.LEAD_DB_PATH||'.data/submissions.sqlite'),
  apiKey:process.env.PROPSTACK_API_KEY,
  newContactOwnerId:process.env.PROPSTACK_NEW_CONTACT_OWNER_ID?Number(process.env.PROPSTACK_NEW_CONTACT_OWNER_ID):null,
  consentApproved:process.env.CONTACT_CONSENT_APPROVED==='true',
  turnstileSecret:process.env.TURNSTILE_SECRET_KEY,turnstileSiteKey:process.env.TURNSTILE_SITE_KEY,
  siteUrl:process.env.PUBLIC_SITE_URL||'http://127.0.0.1:'+port,
  allowedOrigins:(process.env.ALLOWED_ORIGINS||'http://localhost:3000,http://127.0.0.1:3000,http://localhost:3001').split(',').filter(Boolean),
  trustProxy:process.env.TRUST_PROXY?process.env.TRUST_PROXY.split(',').map(x=>x.trim()):false,
});
const server=app.listen(port,process.env.HOST||'127.0.0.1',()=>console.log('Investo website and inquiry API: http://127.0.0.1:'+port));
const worker=setInterval(()=>{void service.resumePending().catch(()=>console.error('Inquiry worker unavailable; inspect server storage/configuration.'));},15000);
worker.unref();
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>{clearInterval(worker);server.close(()=>{close();process.exit(0);});});
