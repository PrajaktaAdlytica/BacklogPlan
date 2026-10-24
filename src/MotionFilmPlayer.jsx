import React,{useEffect,useRef} from 'react';
import {Player} from '@remotion/player';
import {AbsoluteFill,Img,interpolate,useCurrentFrame,useVideoConfig} from 'remotion';

const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'};
const beats=[
 {asset:'work-proof',chapter:'01 / THE CONSTRAINT',title:['A missing part.','An impossible slot.'],note:'R0 · BLOCKED',detail:'Seal unavailable. Monday conflicts with the recorded window.',source:'SYNTHETIC INVENTORY SNAPSHOT',stamp:'16 OCT 2026 · 14:15 UTC'},
 {asset:'work-review',chapter:'02 / THE REVISION',title:['Move the work.','Keep the condition.'],note:'R1 · CONDITIONAL',detail:'Wednesday, 13:00–17:00. Receipt still needs confirmation.',source:'PROPOSED PLANNING WINDOW',stamp:'21 OCT 2026 · 13:00–17:00'},
 {asset:'evidence-folio',chapter:'03 / THE REVIEW',title:['Evidence attached.','Decision with a person.'],note:'R2 · AWAITING REVIEW',detail:'Synthetic receipt recorded. Supervisor review remains required.',source:'ILLUSTRATIVE REVIEW PACKET',stamp:'NO PERMIT, DISPATCH OR WRITE-BACK'},
];
function SequenceFilm(){
 const frame=useCurrentFrame(),{fps,width}=useVideoConfig(),portrait=width<1000,seconds=frame/fps;
 return <AbsoluteFill style={{background:'#eee9df',color:'#342d27',fontFamily:'Manrope Variable, sans-serif'}}>
  {beats.map((beat,i)=>{
   const local=seconds-i*6,opacity=interpolate(local,[-.45,0,5.55,6],[0,1,1,0],clamp),travel=interpolate(local,[0,6],[30,-14],clamp);
   return <AbsoluteFill key={beat.asset} style={{opacity}}>
    <Img src={`/assets/${beat.asset}.webp`} style={{position:'absolute',width:portrait?700:930,height:portrait?540:780,objectFit:'contain',right:portrait?-30:-20,top:portrait?310:-20,transform:`translateY(${travel}px) scale(${1+Math.max(0,Math.min(local/6,1))*.035})`}}/>
    <div style={{position:'absolute',inset:0,background:portrait?'linear-gradient(180deg,#eee9df 0%,#eee9df 25%,transparent 60%)':'linear-gradient(90deg,#eee9df 0%,#eee9df 28%,transparent 68%)'}}/>
    <div style={{position:'absolute',top:portrait?65:95,left:portrait?45:85,width:640,transform:`translateY(${interpolate(local,[0,.9],[18,0],clamp)}px)`}}>
     <div style={{fontSize:15,letterSpacing:3,color:'#8b573a',marginBottom:portrait?25:38}}>{beat.chapter}</div>
     <div style={{fontFamily:'Fraunces Variable, serif',fontSize:portrait?53:65,fontWeight:300,lineHeight:1.1,letterSpacing:-2}}>{beat.title[0]}<br/><em>{beat.title[1]}</em></div>
     <p style={{fontSize:21,lineHeight:1.65,maxWidth:470,marginTop:32}}>{beat.detail}</p>
    </div>
    <div style={{position:'absolute',right:portrait?45:85,bottom:portrait?110:115,width:380,padding:'27px 30px',background:'#fbf8f0',border:'1px solid #d4c4ae',boxShadow:'0 26px 50px #4334211a',transform:`translateY(${interpolate(local,[.4,1.5],[45,0],clamp)}px) rotate(${interpolate(local,[0,6],[2,-1],clamp)}deg)`,opacity:interpolate(local,[.4,1.2],[0,1],clamp)}}>
     <div style={{fontSize:12,letterSpacing:2,color:'#827361'}}>{beat.source}</div>
     <div style={{fontSize:26,fontFamily:'Fraunces Variable, serif',margin:'18px 0'}}>{beat.note}</div><div style={{fontSize:12,letterSpacing:.6}}>{beat.stamp}</div>
    </div>
   </AbsoluteFill>
  })}
  <div style={{position:'absolute',bottom:49,left:portrait?45:85,fontSize:12,letterSpacing:2}}>CONCEPT PREVIEW / DEMO · SIMULATED DATA</div>
  <div style={{position:'absolute',bottom:0,left:0,width:`${seconds/18*100}%`,height:3,background:'#9a6242'}}/>
 </AbsoluteFill>
}
function MaterialStudy({src,kind}){
 const frame=useCurrentFrame(),{durationInFrames}=useVideoConfig(),phase=frame/durationInFrames*Math.PI*2;
 // A closed camera path avoids a visible jump at the loop boundary.
 const drift=(1-Math.cos(phase))/2,scale=1.035+drift*(kind==='hero'?.023:.045);
 return <AbsoluteFill style={{background:'#f0ece3',overflow:'hidden'}}><Img src={src} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:kind==='landscape'?'right center':'center',transform:`translate(${Math.sin(phase)*(kind==='hero'?4:7)}px,${drift*-7}px) scale(${scale})`,transformOrigin:kind==='hero'?'75% 65%':'50% 55%'}}/>{kind==='study'&&<div style={{position:'absolute',inset:0,background:`linear-gradient(${105+Math.sin(phase)*8}deg, transparent 35%, #fff9e511 52%, transparent 70%)`,mixBlendMode:'screen'}}/>}</AbsoluteFill>
}
function FilmComposition(props){return props.kind==='sequence'?<SequenceFilm/>:<MaterialStudy {...props}/>}
export default function FilmPlayer({src,kind,playing,portrait,size}){
 const ref=useRef(null);
 useEffect(()=>{if(playing)ref.current?.play();else ref.current?.pause()},[playing]);
 return <Player ref={ref} component={FilmComposition} inputProps={{src,kind}} durationInFrames={kind==='sequence'?540:480} compositionWidth={kind==='sequence'?(portrait?760:1440):size?.width||(kind==='study'?1000:1738)} compositionHeight={kind==='sequence'?(portrait?900:700):size?.height||(kind==='study'?760:905)} fps={30} autoPlay={playing} loop muted controls={false} clickToPlay={false} doubleClickToFullscreen={false} spaceKeyToPlayOrPause={false} moveToBeginningWhenEnded={false} style={{width:'100%',height:'100%'}}/>;
}
