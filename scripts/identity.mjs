import fs from 'node:fs';
import path from 'node:path';
export function reserve(directory,scope){
  fs.mkdirSync(directory,{recursive:true});
  for(let ordinal=1;;ordinal++){
    const receipt=path.join(directory,`${scope}-${ordinal}.json`);
    try{fs.writeFileSync(receipt,JSON.stringify({scope,ordinal,status:'reserved'}),{flag:'wx'});return {ordinal,receipt}}
    catch(e){if(e.code!=='EEXIST')throw e}
  }
}
