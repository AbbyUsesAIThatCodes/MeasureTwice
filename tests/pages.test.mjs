import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {actionsReservation, pagesManifest, assertActionsSource} from '../scripts/pages-identity.mjs';
import {siteInputs} from '../scripts/pages-output.mjs';
const env = {GITHUB_ACTIONS: 'true', GITHUB_REPOSITORY: 'AbbyUsesAIThatCodes/MeasureTwice', GITHUB_REF: 'refs/heads/main', GITHUB_EVENT_NAME: 'push', GITHUB_RUN_ID: '123456', GITHUB_RUN_ATTEMPT: '1', GITHUB_SHA: 'a'.repeat(40)};
const source = {sourceRevision: env.GITHUB_SHA, dirty: false, fingerprint: 'b'.repeat(64)};
const release = JSON.parse(fs.readFileSync('release.json'));
test('Pages identities distinguish runs and reruns without assigning fake PR ordinals', () => {
  const at = '2026-09-30T12:00:00.000Z';
  const first = pagesManifest(release, actionsReservation(env), source, at);
  const rerun = pagesManifest(release, actionsReservation({...env, GITHUB_RUN_ATTEMPT: '2'}), source, at);
  const next = pagesManifest(release, actionsReservation({...env, GITHUB_RUN_ID: '123457'}), source, at);
  assert.equal(first.scope, 'main-run-123456'); assert.equal(first.pr, null); assert.equal(rerun.ordinal, 2);
  assert.equal(new Set([first.id, rerun.id, next.id]).size, 3); assert.equal(first.builtAt, at);
  assert.equal(pagesManifest(release, actionsReservation(env), source, at).id, first.id);
  assert.equal(first.basePath, '/MeasureTwice/'); assert.equal(first.target, 'pages');
});
test('Pages production identity rejects PR events, feature branches, forks and missing provenance', () => {
  for (const patch of [{GITHUB_EVENT_NAME: 'pull_request'}, {GITHUB_EVENT_NAME: 'pull_request_target'}, {GITHUB_REF: 'refs/heads/review'}, {GITHUB_REPOSITORY: 'someone/MeasureTwice'}, {GITHUB_RUN_ATTEMPT: '0'}, {GITHUB_RUN_ID: ''}, {GITHUB_SHA: ''}, {GITHUB_ACTIONS: 'false'}]) assert.throws(() => actionsReservation({...env, ...patch}));
  assert.equal(actionsReservation({...env, GITHUB_EVENT_NAME: 'workflow_dispatch'}).scope, 'main-run-123456');
  const allocation = actionsReservation(env);
  assert.doesNotThrow(() => assertActionsSource(allocation, source));
  assert.throws(() => assertActionsSource(allocation, {...source, dirty: true}));
  assert.throws(() => assertActionsSource(allocation, {...source, sourceRevision: 'c'.repeat(40)}));
});
test('Pages selection excludes checkout infrastructure, private documents and response evidence', () => {
  assert.deepEqual(siteInputs(['public/index.html', 'src/app.js', '.env', '.git/config', 'review-evidence/session.json', 'test-results/records.json', 'node_modules/.modules.yaml']), ['public/index.html', 'src/app.js']);
  assert.deepEqual(siteInputs(['docs/private-course.pdf', 'docs/WORKSHEET_AUTHORING_DATA.json', 'docs/WORKSHEET_AUTHORING_BASIS.md', 'docs/curriculum-content.md']), []);
  assert.deepEqual(siteInputs(['deployment/student-reference.md']), ['deployment/student-reference.md']);
  assert.throws(() => siteInputs(['public/private-course.pdf']), /Unexpected site input/);
  assert.throws(() => siteInputs(['public/.env']), /Unexpected site input/);
});
