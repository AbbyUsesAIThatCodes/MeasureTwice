import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

export const siteRoots = ['public', 'src', 'data'];
const studentReference = 'deployment/student-reference.md';
const extensions = new Set(['.html', '.css', '.js', '.json', '.md', '.txt', '.png', '.jpg', '.svg', '.webp', '.woff2']);
export function siteInputs(tracked) {
  return tracked.filter(file => file === studentReference || siteRoots.some(root => file.startsWith(root + '/'))).map(file => {
    if (file.split('/').some(part => part.startsWith('.')) || !extensions.has(path.extname(file))) throw new Error(`Unexpected site input: ${file}`);
    if (!fs.lstatSync(file).isFile()) throw new Error(`Site input must be a regular file: ${file}`);
    return file;
  }).sort();
}
export function fingerprint(files) {
  const hash = crypto.createHash('sha256');
  for (const file of [...files].sort()) { hash.update(file.replaceAll('\\', '/')); hash.update(fs.readFileSync(file)); }
  return hash.digest('hex');
}
export function assemblePages(directory, inputs, manifest) {
  fs.mkdirSync(path.dirname(directory), {recursive: true});
  fs.mkdirSync(directory); // Never overwrite an existing identified artifact.
  for (const file of inputs) {
    const destination = path.join(directory, file === studentReference ? 'docs/curriculum-content.md' : file.replace(/^public\//, ''));
    fs.mkdirSync(path.dirname(destination), {recursive: true});
    fs.copyFileSync(file, destination);
  }
  fs.mkdirSync(path.join(directory, 'vendor'));
  for (const name of ['three.module.js', 'three.core.js']) fs.copyFileSync('node_modules/three/build/' + name, path.join(directory, 'vendor', name));
  fs.copyFileSync('node_modules/three/LICENSE', path.join(directory, 'vendor/three-LICENSE.txt'));
  fs.writeFileSync(path.join(directory, 'build-manifest.json'), JSON.stringify(manifest, null, 2));
  fs.writeFileSync(path.join(directory, 'BUILD_REPORT.json'), JSON.stringify({...manifest, buildStatus: 'Built for Pages; Deployment Is Separate'}, null, 2));
}
