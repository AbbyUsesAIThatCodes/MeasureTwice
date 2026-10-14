// Fixed physical anchors: two world units per inch for every instrument.
// The 102 x 36 inch bench incorporates the former proposed left support.
export const workstation=Object.freeze({benchLeft:-102,benchRight:102,benchBack:-36,benchFront:36,benchTop:68,
 sawX:-22,boardY:70.125,boardZ:24,bladeY:87,bladeTravel:8,
 tableLeft:14,tableWidth:80,tableDepth:16,tableZ:-26,tableTop:68.15,
 modelOrigin:[84,68.15,22],modelWidth:24,modelDepth:20,
 staging:[54,68.61,-2],inspection:[-22,104,5],travelHeight:110,
 roomLeft:-144,roomRight:144,roomBack:-120,roomFront:120});
export function workshopLayout(stockLength=6){return {...workstation,stockLength,long:stockLength>6,modelOrigin:[...workstation.modelOrigin],staging:[...workstation.staging],inspection:[...workstation.inspection]};}
export function comparisonPosition(index,length,layout){return {x:layout.tableLeft+.3+length/2,y:layout.tableTop+.11+Math.floor(index/8)*.4,z:layout.tableZ+5.6-(index%8)*1.6};}
export function tableLegPositions(layout){return [layout.benchLeft+6,0,layout.benchRight-6].flatMap(x=>[layout.benchBack+6,layout.benchFront-6].map(z=>({x,z})));}
