import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const report = JSON.parse(fs.readFileSync('latest-pages.json'));
const manifest = JSON.parse(fs.readFileSync(path.join(report.directory, 'build-manifest.json')));
const buildReport = JSON.parse(fs.readFileSync(path.join(report.directory, 'BUILD_REPORT.json')));
assert.equal(manifest.id, report.id); assert.equal(buildReport.id, report.id);
assert.equal(manifest.target, 'pages'); assert.equal(manifest.basePath, '/MeasureTwice/');
assert.equal(path.basename(path.dirname(report.directory)), manifest.id);
assert.equal(manifest.sourceRevision, report.sourceRevision);
const files = [];
function inspect(directory) {
  for (const name of fs.readdirSync(directory)) {
    const file = path.join(directory, name), stat = fs.lstatSync(file);
    assert.equal(stat.isSymbolicLink(), false, 'No symlinks in Pages output');
    if (stat.isDirectory()) inspect(file); else { assert.equal(stat.isFile(), true); files.push(path.relative(report.directory, file).replaceAll('\\', '/')); }
  }
}
inspect(report.directory);
for (const required of ['index.html', 'reference.css', 'style.css', 'src/app.js', 'src/learning.js', 'data/house.json', 'docs/curriculum-content.md', 'vendor/three.module.js', 'vendor/three.core.js', 'vendor/three-LICENSE.txt']) assert.ok(files.includes(required), required);
for (const file of files) {
  assert.match(file, /^(index\.html|reference\.css|style\.css|build-manifest\.json|BUILD_REPORT\.json|(?:src|data|docs|vendor)\/.+)$/);
  assert.doesNotMatch(file, /(?:^|\/)(?:\.|review-evidence|test-results|node_modules|source-verification-private)|\.(?:zip|pdf|docx|env|pem|key)$/i);
}
const html = fs.readFileSync(path.join(report.directory, 'index.html'), 'utf8');
for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  assert.ok(!match[1].startsWith('/') && !match[1].includes('://'), 'Entrypoint assets stay relative');
  assert.ok(fs.existsSync(path.join(report.directory, match[1])), match[1]);
}
console.log(`PAGES CHECK PASS ${manifest.id}: ${files.length} allowlisted files; relative entrypoint links and identity agree.`);
