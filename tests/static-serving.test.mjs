import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {get} from 'node:http';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
import {gunzipSync} from 'node:zlib';
import {createApp} from '../server/app.mjs';

async function harness(t,{clientShell=false}={}){
  const folder=mkdtempSync(path.join(tmpdir(),'investo-static-test-'));
  const distPath=path.join(folder,'dist');
  mkdirSync(path.join(distPath,'assets'),{recursive:true});
  mkdirSync(path.join(distPath,'images','optimized'),{recursive:true});
  const html='<!doctype html><html><body>'+('<p>Investo legal page</p>'.repeat(100))+'</body></html>';
  const clientHtml='<!doctype html><html><body><div id="root"></div>'+('<!-- Client-only page -->'.repeat(100))+'</body></html>';
  const js='console.log("Investo asset");\n'.repeat(100);
  const css='.investo { color: #d4b27c; }\n'.repeat(100);
  const image=Buffer.alloc(2048,0x42);
  writeFileSync(path.join(distPath,'index.html'),html);
  if(clientShell)writeFileSync(path.join(distPath,'client.html'),clientHtml);
  writeFileSync(path.join(distPath,'assets','index-test1234.js'),js);
  writeFileSync(path.join(distPath,'assets','index-test1234.css'),css);
  writeFileSync(path.join(distPath,'images','property.jpg'),image);
  writeFileSync(path.join(distPath,'images','optimized','property-ab123456-640.webp'),image);
  const instance=createApp({databasePath:path.join(folder,'db.sqlite'),distPath,fetchImpl:()=>{throw Error('Static tests must not contact external services');}});
  const server=instance.app.listen(0,'127.0.0.1');
  await new Promise(resolve=>server.once('listening',resolve));
  t.after(async()=>{
    server.closeAllConnections();
    await new Promise(resolve=>server.close(resolve));
    instance.close();
    if(path.dirname(folder)===path.resolve(tmpdir())&&path.basename(folder).startsWith('investo-static-test-'))rmSync(folder,{recursive:true});
  });
  const request=(route,headers={})=>new Promise((resolve,reject)=>{
    get(`http://127.0.0.1:${server.address().port}${route}`,{headers},response=>{
      const chunks=[];
      response.on('data',chunk=>chunks.push(chunk));
      response.on('error',reject);
      response.on('end',()=>resolve({status:response.statusCode,headers:response.headers,body:Buffer.concat(chunks)}));
    }).on('error',reject);
  });
  return {request,html,clientHtml,js,css,image};
}

test('legal and receipt routes use the client shell instead of the prerendered homepage',async t=>{
  const h=await harness(t,{clientShell:true});
  const homepage=await h.request('/');
  assert.equal(homepage.body.toString(),h.html);
  for(const route of ['/impressum','/impressum/','/datenschutz','/datenschutz/','/danke','/danke/']){
    const response=await h.request(route,{'Accept-Encoding':'gzip'});
    assert.equal(response.status,200,route);
    assert.equal(response.headers['content-encoding'],'gzip',route);
    assert.equal(response.headers['cache-control'],'public, max-age=0',route);
    assert.equal(gunzipSync(response.body).toString(),h.clientHtml,route);
  }
});

test('static HTML, JS and CSS are compressed when accepted; deep links remain usable',async t=>{
  const h=await harness(t);
  for(const [route,expected] of [['/',h.html],['/impressum/',h.html],['/datenschutz',h.html],['/danke',h.html],['/assets/index-test1234.js',h.js],['/assets/index-test1234.css',h.css]]){
    const response=await h.request(route,{'Accept-Encoding':'gzip'});
    assert.equal(response.status,200,route);
    assert.equal(response.headers['content-encoding'],'gzip',route);
    assert.match(response.headers.vary,/Accept-Encoding/i,route);
    assert.equal(gunzipSync(response.body).toString(),expected,route);
    assert.ok(response.body.length<Buffer.byteLength(expected),route);
  }
  const plain=await h.request('/assets/index-test1234.js',{'Accept-Encoding':'identity'});
  assert.equal(plain.headers['content-encoding'],undefined);
  assert.equal(plain.body.toString(),h.js);
});

test('fingerprinted assets cache immutably while HTML and unhashed images revalidate',async t=>{
  const h=await harness(t);
  const asset=await h.request('/assets/index-test1234.js');
  assert.equal(asset.headers['cache-control'],'public, max-age=31536000, immutable');
  const cached=await h.request('/assets/index-test1234.js',{'If-None-Match':asset.headers.etag});
  assert.equal(cached.status,304);
  const optimized=await h.request('/images/optimized/property-ab123456-640.webp');
  assert.equal(optimized.headers['cache-control'],'public, max-age=31536000, immutable');
  assert.deepEqual(optimized.body,h.image);
  for(const route of ['/','/impressum','/datenschutz/','/danke/','/images/property.jpg']){
    const response=await h.request(route,{'Accept-Encoding':'gzip'});
    assert.equal(response.status,200,route);
    assert.equal(response.headers['cache-control'],'public, max-age=0',route);
  }
  const image=await h.request('/images/property.jpg',{'Accept-Encoding':'gzip'});
  assert.equal(image.headers['content-encoding'],undefined);
  assert.deepEqual(image.body,h.image);
});

test('static optimizations leave API and receipt responses private and uncompressed',async t=>{
  const h=await harness(t);
  for(const [route,status] of [['/api/inquiries/config',200],[`/api/inquiries/status/${randomUUID()}`,404],['/api/not-found',404]]){
    const response=await h.request(route,{'Accept-Encoding':'gzip','Authorization':`Bearer ${randomUUID()}`});
    assert.equal(response.status,status,route);
    assert.equal(response.headers['cache-control'],'no-store',route);
    assert.equal(response.headers['content-encoding'],undefined,route);
    assert.doesNotMatch(response.headers.vary||'',/Accept-Encoding/i,route);
    assert.match(response.headers['content-type'],/application\/json/i,route);
  }
});
