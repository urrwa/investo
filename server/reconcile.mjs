// Private operator reconciliation. Never mark a receipt accepted without a CRM read.
import 'dotenv/config';
import path from 'node:path';
import {createStore} from './inquiry-store.mjs';
import {createInquiryService} from './inquiry-service.mjs';
import {isUuid} from '../shared/inquiry-schema.mjs';
import {DatabaseSync} from 'node:sqlite';
const [id]=process.argv.slice(2);
if(!isUuid(id)||!process.env.PROPSTACK_API_KEY)throw Error('Usage: node server/reconcile.mjs <submission-id>; configure the private Propstack key first.');
const filename=path.resolve(process.env.LEAD_DB_PATH||'.data/submissions.sqlite');
const store=createStore(filename);const row=store.get(id);
if(!row){store.close();throw Error('Unknown submission.');}
if(row.phase!=='inquiry_create_started'||row.status==='accepted'){store.close();throw Error('This CLI only reconciles an uncertain inquiry write. Contact-resolution incidents require operator review.');}
const db=new DatabaseSync(filename);
db.prepare("UPDATE inquiries SET status='pending',next_attempt=0 WHERE id=? AND lease_until<?").run(id,Date.now());db.close();
const service=createInquiryService({store,apiKey:process.env.PROPSTACK_API_KEY,newContactOwnerId:null});
try{const result=await service.process(id);console.log(JSON.stringify({submission_id:id,status:result.status}));}finally{store.close();}
