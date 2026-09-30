import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(process.argv[2]||'.');
const port=Number(process.argv[3]||8134);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.css':'text/css','.png':'image/png','.woff2':'font/woff2'};
http.createServer((req,res)=>{
  let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400).end();return}
  let file=path.resolve(root,'.'+pathname);
  if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403).end();return}
  if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  if(!fs.existsSync(file)){res.writeHead(404).end('Not Found');return}
  res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.setHeader('Cache-Control','no-store');fs.createReadStream(file).pipe(res);
}).listen(port,'127.0.0.1',()=>console.log(`Local review: http://127.0.0.1:${port}`));
