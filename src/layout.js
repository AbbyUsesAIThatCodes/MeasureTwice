// Named anchors share one physical scale: two world units per inch.
export function workshopLayout(stockLength=6){
  const long=stockLength>6,benchLeft=Math.min(-6.925,-1.4-stockLength-.3),benchRight=Math.max(12.125,-1.4+stockLength+.3);
  const tableLeft=benchRight+.9,tableWidth=Math.max(7.2,stockLength+.6),tableZ=-4.3;
  return {stockLength,long,benchLeft,benchRight,tableLeft,tableWidth,tableZ,tableTop:2.78,
    modelOrigin:[tableLeft+tableWidth/2,2.9,tableZ],
    staging:long?[stockLength/2+1,2.91,3.5]:[8.3,2.91,1.35],
    roomLeft:Math.min(-22,benchLeft-5),roomRight:Math.max(32,tableLeft+tableWidth+5)};
}
export function comparisonPosition(index,length,layout){return {x:layout.tableLeft+.3+length/2,y:2.89+Math.floor(index/8)*.4,z:layout.tableZ+2.55-(index%8)*.72};}
export function tableLegPositions(layout){
  const left=layout.tableLeft+.2,right=layout.tableLeft+layout.tableWidth-.2;
  const spans=Math.ceil((right-left)/4),positions=[];
  for(let i=0;i<=spans;i++)for(const z of [layout.tableZ-2.7,layout.tableZ+2.7])positions.push({x:left+(right-left)*i/spans,z});
  return positions;
}
