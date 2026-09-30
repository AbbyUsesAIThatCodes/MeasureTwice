import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {execFileSync} from 'node:child_process';
import {reserve} from './identity.mjs';
import {actionsReservation, pagesManifest, assertActionsSource} from './pages-identity.mjs';
import {siteInputs, fingerprint, assemblePages} from './pages-output.mjs';

const inActions = process.env.GITHUB_ACTIONS === 'true';
let allocation, receipt, manifest;
if (inActions) {
  if (process.argv[2]) throw new Error('Actions derives identity from its own run; do not pass a PR scope.');
  allocation = actionsReservation(process.env);
  if (!process.env.RUNNER_TEMP) throw new Error('Missing runner reservation directory.');
  receipt = path.join(process.env.RUNNER_TEMP, `measuretwice-${allocation.scope}-${allocation.ordinal}.json`);
  fs.writeFileSync(receipt, JSON.stringify({...allocation, status: 'reserved'}), {flag: 'wx'});
} else {
  const scope = process.argv[2];
  if (!/^(pr-[1-9]\d*|local-[a-z0-9-]+)$/.test(scope || '')) throw new Error('Use an existing pr-N or explicit local-session scope.');
  if (scope.startsWith('pr-') && os.hostname().toLowerCase() !== 'jess_pc') throw new Error('PR builds are allocated on Jess_PC only. Use local-session elsewhere.');
  const ledger = path.join(os.homedir(), 'Documents', 'Codex', '2026-09-29', 'task-3', 'build-ledger');
  const reserved = reserve(ledger, scope); receipt = reserved.receipt;
  allocation = {scope, ordinal: reserved.ordinal, allocator: 'Jess_PC/MeasureTwice-build-ledger'};
}
console.log(`PAGES RESERVED ${allocation.scope} build-${allocation.ordinal}`);
try {
  const git = (...args) => execFileSync('git', args, {encoding: 'utf8'}).trim();
  const sourceRevision = git('rev-parse', 'HEAD'), dirty = Boolean(git('status', '--porcelain'));
  if (inActions) assertActionsSource(allocation, {sourceRevision, dirty});
  const inputs = siteInputs(git('ls-files', '-z').split('\0'));
  const source = {sourceRevision, dirty, fingerprint: fingerprint([...inputs, 'release.json', 'package.json', 'pnpm-lock.yaml',
    'scripts/build-pages.mjs', 'scripts/pages-identity.mjs', 'scripts/pages-output.mjs', '.github/workflows/pages.yml',
    'node_modules/three/build/three.module.js', 'node_modules/three/build/three.core.js', 'node_modules/three/LICENSE'])};
  manifest = pagesManifest(JSON.parse(fs.readFileSync('release.json')), allocation, source, new Date().toISOString());
  const parent = path.resolve('dist/pages', manifest.id), directory = path.join(parent, 'MeasureTwice');
  console.log('BUILD START ' + manifest.id);
  assemblePages(directory, inputs, manifest);
  // Local launcher lives outside the exact directory sent to Pages.
  fs.copyFileSync('scripts/serve.mjs', path.join(parent, 'serve.mjs'));
  fs.writeFileSync(path.join(parent, 'Start Pages Review.cmd'), '@echo off\r\ncd /d "%~dp0"\r\nset "MT_NODE=node"\r\nwhere node >nul 2>nul\r\nif errorlevel 1 set "MT_NODE=%USERPROFILE%\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\node\\bin\\node.exe"\r\nstart "" http://127.0.0.1:18447/MeasureTwice/\r\n"%MT_NODE%" serve.mjs . 18447\r\npause\r\n');
  const report = {...manifest, status: 'success', directory, reviewDirectory: parent, completedAt: new Date().toISOString()};
  fs.writeFileSync(receipt, JSON.stringify(report, null, 2));
  fs.writeFileSync('latest-pages.json', JSON.stringify(report, null, 2));
  if (inActions) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `id=${manifest.id}\npath=${directory}\n`);
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `### Pages Build\n\n\`${manifest.id}\`\n\nSource: \`${sourceRevision}\`. Built only; deployment is reported by the deploy job.\n`);
  }
  console.log('BUILD SUCCESS ' + manifest.id + '\n' + directory);
} catch (error) {
  fs.writeFileSync(receipt, JSON.stringify({...allocation, ...manifest, status: 'failed', error: error.message}, null, 2));
  console.error('BUILD FAILED ' + (manifest?.id || allocation.scope)); throw error;
}
