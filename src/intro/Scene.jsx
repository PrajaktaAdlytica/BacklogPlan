import React from 'react';
import {AbsoluteFill,interpolate,useCurrentFrame,useVideoConfig,Easing} from 'remotion';
import {LivingScene} from './LivingScene';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'};
export function Scene({asset,kicker,lines,position='center',duration=3.6,opening=false,closing=false}){
 const frame=useCurrentFrame(),{fps,width,height}=useVideoConfig(),portrait=height>width,t=frame/fps;
 const pad=portrait?52:100;
 return <AbsoluteFill style={{background:'#283029',overflow:'hidden',color:'#f7f2e7',fontFamily:'Manrope Variable, sans-serif'}}>
  <LivingScene asset={asset} position={position}/>
  <AbsoluteFill style={{background:'linear-gradient(180deg,rgba(18,25,20,.06) 20%,rgba(18,25,20,.14) 38%,rgba(18,25,20,.55) 65%,rgba(18,25,20,.82) 100%)'}}/>
  <div style={{position:'absolute',left:pad,right:pad,bottom:portrait?160:135,opacity:opening?interpolate(t,[2.65,2.9],[1,0],clamp):closing?interpolate(t,[.25,.6],[0,1],clamp):interpolate(t,[.25,.6,2.65,2.9],[0,1,1,0],clamp),translate:`0 ${interpolate(t,[.25,1.0],[opening?0:24,0],{...clamp,easing:Easing.bezier(.16,1,.3,1)})}px`}}>
   <div style={{fontSize:portrait?17:17,letterSpacing:3.5,textTransform:'uppercase',marginBottom:25,color:'#edc6a0'}}>{kicker}</div>
   <div style={{fontFamily:'Fraunces Variable, serif',fontSize:portrait?64:108,fontWeight:350,letterSpacing:portrait?-2:-3.6,lineHeight:1.02,maxWidth:1250,textShadow:'0 3px 24px #121b1420'}}>{lines.map(line=><React.Fragment key={line}>{line}<br/></React.Fragment>)}</div>
  </div>
 </AbsoluteFill>;
}
