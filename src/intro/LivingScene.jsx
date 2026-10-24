import React,{useEffect,useLayoutEffect,useRef,useState} from 'react';
import {cancelRender,continueRender,delayRender,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
const W=1672,H=940;
const bounded=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const hash=(x,y)=>{const v=Math.sin(x*127.1+y*311.7)*43758.5453;return v-Math.floor(v)};
function noise(x,y){const i=Math.floor(x),j=Math.floor(y),u=x-i,v=y-j,s=u*u*(3-2*u),t=v*v*(3-2*v);return (hash(i,j)*(1-s)+hash(i+1,j)*s)*(1-t)+(hash(i,j+1)*(1-s)+hash(i+1,j+1)*s)*t}
function canvas(w=W,h=H){const c=document.createElement('canvas');c.width=w;c.height=h;return c}
function cloudTexture(){
 const c=canvas(512,128),ctx=c.getContext('2d'),pixels=ctx.createImageData(512,128);
 for(let y=0;y<128;y++)for(let x=0;x<512;x++){
  const n=.57*noise(x/48,y/25)+.28*noise(x/20,y/12)+.15*noise(x/8,y/5);
  const feather=Math.pow(Math.sin(y/128*Math.PI),2)*Math.pow(Math.sin(x/512*Math.PI),.5),a=bounded((n-.28)*1.6)*feather;
  const p=(y*512+x)*4;pixels.data[p]=244;pixels.data[p+1]=232;pixels.data[p+2]=210;pixels.data[p+3]=a*200;
 }ctx.putImageData(pixels,0,0);return c;
}
const paperOutline=[[29,650],[634,545],[1285,849],[1094,940],[183,940]];
function trace(ctx,points){ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath()}
function paperTexture(image){const c=canvas(),ctx=c.getContext('2d');trace(ctx,paperOutline);ctx.clip();ctx.drawImage(image,0,0,W,H);return c}
function warpPaper(x,y,t){
 const u=bounded((x-29)/1256),v=bounded((y-545)/395);
 // The near edge stays on the table while a breeze lifts the far edge.
 const lift=(8+30*Math.pow(Math.sin(t*3.4+.3),2)+7*Math.sin(t*5.1-u*3))*Math.pow(1-v,1.6)*(.3+.7*u);
 return [x+lift*.16,y-lift];
}
function triangle(ctx,texture,s,d){
 const [p0,p1,p2]=s,[q0,q1,q2]=d;
 const sx1=p1[0]-p0[0],sy1=p1[1]-p0[1],sx2=p2[0]-p0[0],sy2=p2[1]-p0[1],det=sx1*sy2-sx2*sy1;
 const dx1=q1[0]-q0[0],dy1=q1[1]-q0[1],dx2=q2[0]-q0[0],dy2=q2[1]-q0[1];
 const a=(dx1*sy2-dx2*sy1)/det,b=(dy1*sy2-dy2*sy1)/det,c=(dx2*sx1-dx1*sx2)/det,dv=(dy2*sx1-dy1*sx2)/det;
 ctx.save();trace(ctx,d);ctx.clip();ctx.transform(a,b,c,dv,q0[0]-a*p0[0]-c*p0[1],q0[1]-b*p0[0]-dv*p0[1]);ctx.drawImage(texture,0,0);ctx.restore();
}
function flutterPaper(ctx,texture,t){
 ctx.save();ctx.filter='blur(7px)';ctx.fillStyle='rgba(26,20,13,.21)';trace(ctx,paperOutline.map(([x,y])=>{const p=warpPaper(x,y,t);return [p[0]+6,p[1]+15]}));ctx.fill();ctx.restore();
 for(let row=0;row<8;row++)for(let col=0;col<16;col++){
  const x=20+col*80,y=540+row*50,p=[[x,y],[x+80,y],[x+80,y+50],[x,y+50]],q=p.map(([a,b])=>warpPaper(a,b,t));
  triangle(ctx,texture,[p[0],p[1],p[2]],[q[0],q[1],q[2]]);triangle(ctx,texture,[p[0],p[2],p[3]],[q[0],q[2],q[3]]);
 }
}
function atmosphere(ctx,cloud,t,kind){
 const dawn=kind==='dawn',base=dawn?235:230;
 ctx.save();ctx.globalAlpha=dawn?.43:.16;
 ctx.drawImage(cloud,-430+t*72,base+Math.sin(t*.75)*9,1450,190);
 ctx.globalAlpha=dawn?.24:.10;ctx.drawImage(cloud,80-t*40,base+65,1500,130);ctx.restore();
 // Small illuminated dust motes travel through the foreground light, not the UI.
 ctx.save();ctx.fillStyle='#ffdb9b';
 for(let i=0;i<17;i++){
  const x=hash(i,6)*1600+Math.sin(t*.8+i)*18+t*(3+i%3),y=hash(i,8)*470+180-t*(8+i%4);
  ctx.globalAlpha=(.08+.1*Math.sin(t*1.2+i)**2)*(kind==='table'?1:.55);ctx.beginPath();ctx.arc(x,y,.8+hash(i,3)*1.3,0,Math.PI*2);ctx.fill();
 }ctx.restore();
}
function sunLight(ctx,t,kind){
 ctx.save();ctx.globalCompositeOperation='screen';
 const x=kind==='dawn'?350:320,y=kind==='dawn'?210:140;
 const glow=ctx.createRadialGradient(x,y,5,x,y,510);glow.addColorStop(0,`rgba(255,198,100,${.12+.045*Math.sin(t*1.4)})`);glow.addColorStop(.35,'rgba(255,190,94,.035)');glow.addColorStop(1,'rgba(255,190,94,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,W,H);
 ctx.translate(x,y);ctx.rotate(.045*Math.sin(t*.6));
 for(let i=0;i<3;i++){const g=ctx.createLinearGradient(0,0,600,850);g.addColorStop(0,'rgba(255,219,146,.055)');g.addColorStop(1,'rgba(255,219,146,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(300+i*280,940);ctx.lineTo(410+i*280,940);ctx.fill()}ctx.restore();
}
function metalReflection(ctx,t,kind){
 ctx.save();
 if(kind==='pump'){
  trace(ctx,[[635,388],[811,302],[813,194],[1040,178],[1054,277],[1131,300],[1220,358],[1501,434],[1506,583],[1234,620],[1134,725],[654,690]]);
 }else{trace(ctx,[[714,490],[817,469],[862,527],[1490,689],[1600,738],[1532,807],[1370,782],[1295,711],[754,544]])}
 ctx.clip();ctx.globalCompositeOperation='screen';
 const x=kind==='pump'?550+t*250:560+t*310;
 const light=ctx.createLinearGradient(x-170,0,x+170,0);light.addColorStop(0,'rgba(255,226,180,0)');light.addColorStop(.42,'rgba(255,228,189,.055)');light.addColorStop(.5,'rgba(255,236,210,.23)');light.addColorStop(.58,'rgba(255,228,189,.055)');light.addColorStop(1,'rgba(255,226,180,0)');ctx.fillStyle=light;ctx.fillRect(0,0,W,H);ctx.restore();
}
/** Frame-addressable scene motion; no requestAnimationFrame or nondeterministic particles. */
export function LivingScene({asset,position='center'}){
 const frame=useCurrentFrame(),{fps,width,height}=useVideoConfig(),t=frame/fps,ref=useRef(null),[resources,setResources]=useState(null);
 useEffect(()=>{
  const handle=delayRender(`Load ${asset} motion layers`),image=new Image();let disposed=false;
  image.onload=()=>{if(!disposed)setResources({image,cloud:cloudTexture(),paper:asset==='table'?paperTexture(image):null});continueRender(handle)};
  image.onerror=()=>cancelRender(new Error(`Cannot load intro/${asset}.webp`));image.src=staticFile(`intro/${asset}.webp`);
  return()=>{disposed=true;continueRender(handle)};
 },[asset]);
 useLayoutEffect(()=>{
  if(!resources||!ref.current)return;
  const ctx=ref.current.getContext('2d'),{image,cloud,paper}=resources;ctx.clearRect(0,0,W,H);ctx.drawImage(image,0,0,W,H);
  atmosphere(ctx,cloud,t,asset);sunLight(ctx,t,asset);
  if(asset==='pump'||asset==='table')metalReflection(ctx,t,asset);
  if(asset==='table')flutterPaper(ctx,paper,t);
 },[resources,t,asset]);
 const scale=Math.max(width/W,height/H)*1.045,pct=parseFloat(position)/100||.5;
 const drift=asset==='dawn'?t*7:asset==='pump'?-t*9:t*4;
 return <canvas ref={ref} width={W} height={H} data-scene-motion={asset} style={{position:'absolute',width:W*scale,height:H*scale,left:(width-W*scale)*pct+drift-10,top:(height-H*scale)/2}}/>;
}
