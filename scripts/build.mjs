import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {reserve} from './identity.mjs';
const release=JSON.parse(fs.readFileSync('release.json'));
const scope=process.argv[2]||'local-jess-recovery';
if(!/^(pr-\d+|local-[a-z0-9-]+)$/.test(scope))throw new Error('Use a real pr-N or explicit local-session scope.');
// This machine is the designated review allocator. Shared by all local clones.
const ledger=scope.startsWith('local-')?path.resolve('.build-state',os.hostname()):path.join(os.homedir(),'Documents','Codex','2026-09-29','task-3','build-ledger');
if(scope.startsWith('pr-')&&os.hostname().toLowerCase()!=='jess_pc')throw new Error('PR builds are allocated on Jess_PC only. Use an explicit local scope on another machine.');
const {ordinal,receipt}=reserve(ledger,scope);
const git=(...args)=>execFileSync('git',args,{encoding:'utf8'}).trim();
const sourceRevision=git('rev-parse','HEAD');
const dirty=Boolean(git('status','--porcelain'));
const inputs=['public','src','data','docs','release.json','package.json','pnpm-lock.yaml','scripts/build.mjs','scripts/identity.mjs','scripts/serve.mjs'];
const hash=crypto.createHash('sha256');
function digest(p){if(!fs.existsSync(p))return;if(fs.statSync(p).isDirectory()){for(const f of fs.readdirSync(p).sort())digest(path.join(p,f));return}hash.update(p.replaceAll('\\','/'));hash.update(fs.readFileSync(p))}
inputs.forEach(digest);const fingerprint=hash.digest('hex');
const builtAt=new Date().toISOString(),stamp=builtAt.replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z');
const id=`${release.version}_${release.slug}_${scope}_build-${String(ordinal).padStart(3,'0')}_${stamp}_g${sourceRevision.slice(0,12)}${dirty?'-dirty-'+fingerprint.slice(0,8):''}_web`;
const manifest={...release,id,scope,pr:scope.startsWith('pr-')?Number(scope.slice(3)):null,ordinal,builtAt,sourceRevision,dirty,fingerprint,target:'web',allocator:scope.startsWith('local-')?os.hostname()+'/MeasureTwice-local-build-ledger':'Jess_PC/MeasureTwice-build-ledger'};
console.log('BUILD START '+id);
const destination=path.resolve('review-builds',id);
try{
  fs.mkdirSync('review-builds',{recursive:true});
  fs.mkdirSync(destination,{recursive:false});
  for(const p of ['public','src','data','docs'])fs.cpSync(p,p==='public'?destination:path.join(destination,p),{recursive:true});
  fs.mkdirSync(path.join(destination,'vendor'),{recursive:true});
  for(const name of ['three.module.js','three.core.js'])fs.copyFileSync('node_modules/three/build/'+name,path.join(destination,'vendor',name));
  fs.copyFileSync('node_modules/three/LICENSE',path.join(destination,'vendor/three-LICENSE.txt'));
  fs.writeFileSync(path.join(destination,'build-manifest.json'),JSON.stringify(manifest,null,2));
  fs.copyFileSync('scripts/serve.mjs',path.join(destination,'serve.mjs'));
  fs.writeFileSync(path.join(destination,'Start Review.cmd'),'@echo off\r\ncd /d "%~dp0"\r\nset "MT_NODE=node"\r\nwhere node >nul 2>nul\r\nif errorlevel 1 set "MT_NODE=%USERPROFILE%\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\node\\bin\\node.exe"\r\nstart "" http://127.0.0.1:18443\r\n"%MT_NODE%" serve.mjs . 18443\r\npause\r\n');
  fs.writeFileSync(path.join(destination,'REVIEW.txt'),`${id}\nRun: node serve.mjs . 18443\nOpen http://127.0.0.1:18443\nNo external requests or deployment required. Teacher review build, not a classroom release.\n`);
  fs.writeFileSync(path.join(destination,'BUILD_REPORT.json'),JSON.stringify({...manifest,status:'Built for Local Review',productionDeployment:false},null,2));
  const report={...manifest,status:'success',completedAt:new Date().toISOString(),directory:destination};
  fs.writeFileSync(receipt,JSON.stringify(report,null,2));
  fs.writeFileSync('latest-review.json',JSON.stringify(report,null,2));
  console.log('BUILD SUCCESS '+id+'\n'+destination);
}catch(e){fs.writeFileSync(receipt,JSON.stringify({...manifest,status:'failed',error:e.message},null,2));console.error('BUILD FAILED '+id);throw e}
