export function installLearning(game){
  const {$,panel}=game;
  for(const id of ['lessons','demo','practice','checks'])$(id).onclick=()=>panel('<h2>Learning Review</h2><p>The preserved five-lesson and six-check scripts are being integrated in the next stacked review change. This mechanics checkpoint practices cuts and model assembly.</p>');
}
