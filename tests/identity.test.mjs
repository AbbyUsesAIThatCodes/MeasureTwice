import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {Worker} from 'node:worker_threads';
import {pathToFileURL} from 'node:url';
import {reserve} from '../scripts/identity.mjs';
test('Concurrent builders reserve different ordinals and failed attempts remain consumed',async()=>{
  const directory=fs.mkdtempSync(path.join(os.tmpdir(),'mt-identity-test-'));
  const moduleURL=pathToFileURL(path.resolve('scripts/identity.mjs')).href;
  const code=`const {parentPort,workerData}=require('node:worker_threads');import(workerData.url).then(m=>parentPort.postMessage(m.reserve(workerData.directory,'pr-999999').ordinal));`;
  const ordinals=await Promise.all(Array.from({length:8},()=>new Promise((resolve,reject)=>{const worker=new Worker(code,{eval:true,workerData:{url:moduleURL,directory}});worker.on('message',resolve);worker.on('error',reject)})));
  assert.deepEqual(ordinals.sort((a,b)=>a-b),[1,2,3,4,5,6,7,8]);
  assert.equal(reserve(directory,'pr-999999').ordinal,9);
  const before=fs.readFileSync(path.join(directory,'pr-999999-1.json'),'utf8');
  assert.equal(JSON.parse(before).status,'reserved');
  assert.equal(fs.readFileSync(path.join(directory,'pr-999999-1.json'),'utf8'),before);
});
