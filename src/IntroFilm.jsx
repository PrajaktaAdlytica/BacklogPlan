import React,{useCallback,useEffect,useLayoutEffect,useRef,useState} from 'react';
import {ArrowDown,Pause,Play} from '@phosphor-icons/react';
import {useMotion} from './Motion';

/** A dismissible opening layer; the website remains in its normal document flow. */
export function IntroFilm({onComplete}){
 const {reduced,toggleMotion,systemReduced}=useMotion();
 const video=useRef(null),exitTimer=useRef(null),leaving=useRef(false),complete=useRef(onComplete);
 complete.current=onComplete;
 const [portrait,setPortrait]=useState(()=>matchMedia('(max-width: 700px)').matches);
 const [foreground,setForeground]=useState(!document.hidden);
 const [paused,setPaused]=useState(false),[ready,setReady]=useState(false),[progress,setProgress]=useState(0),[failed,setFailed]=useState(false),[exiting,setExiting]=useState(false);
 const source=`/intro/backlogplan-intro${portrait?'-mobile':''}-v2.mp4`;
 const finish=useCallback((fromScroll=false)=>{
  if(leaving.current)return;
  leaving.current=true;video.current?.pause();setExiting(true);
  // The header appears behind the dissolving frame, never between two scenes.
  document.documentElement.classList.remove('intro-active');
  exitTimer.current=setTimeout(()=>{
   complete.current({focusHero:!fromScroll});
  },reduced?0:800);
 },[reduced]);
 useLayoutEffect(()=>{
  const header=document.querySelector('.site-header');
  document.documentElement.classList.add('intro-active');
  if(header)header.inert=true;
  return()=>{
   clearTimeout(exitTimer.current);
   document.documentElement.classList.remove('intro-active');
   if(header)header.inert=false;
  };
 },[]);
 useEffect(()=>{
  const media=matchMedia('(max-width: 700px)'),resize=()=>setPortrait(media.matches);
  media.addEventListener('change',resize);
  const visibility=()=>setForeground(!document.hidden);
  document.addEventListener('visibilitychange',visibility);
  return()=>{media.removeEventListener('change',resize);document.removeEventListener('visibilitychange',visibility)};
 },[]);
 useEffect(()=>{
  // An intentional scroll also dismisses the opening, without moving the visitor back.
  const scroll=()=>{if(window.scrollY>8)finish(true)};
  window.addEventListener('scroll',scroll,{passive:true});
  const escape=event=>{if(event.key==='Escape')finish()};
  window.addEventListener('keydown',escape);
  return()=>{window.removeEventListener('scroll',scroll);window.removeEventListener('keydown',escape)};
 },[finish]);
 useEffect(()=>{setReady(false);setProgress(0);setFailed(false)},[source,reduced]);
 useEffect(()=>{
  const el=video.current;if(!el)return;
  if(!reduced&&foreground&&!paused&&!failed&&!exiting){el.play().catch(()=>setPaused(true))}else el.pause();
 },[reduced,foreground,paused,source,failed,exiting]);
 return <section className={`intro-film${exiting?' is-exiting':''}`} aria-label="Before the week begins — opening film" data-state={exiting?'exiting':reduced?'still':failed?'unavailable':paused?'paused':foreground?'playing':'idle'} inert={exiting}>
  <h2 className="sr-only">Every week begins with a decision.</h2>
  <div className="intro-visual" aria-hidden="true"><img className="intro-poster" src={`/intro/poster${portrait?'-mobile':''}-v2.jpg`} alt="Illustrative industrial site at dawn. Every week begins with a decision." fetchPriority="high"/>
  {!reduced&&!failed&&<video ref={video} key={source} className={`intro-video${ready?' is-ready':''}`} src={source} muted playsInline preload="metadata" aria-hidden="true" onPlaying={()=>setReady(true)} onCanPlay={()=>setReady(true)} onEnded={()=>{setProgress(1);finish()}} onError={()=>setFailed(true)} onTimeUpdate={event=>setProgress(event.currentTarget.currentTime/9)}/>}
  </div>
  <div className="intro-toolbar"><span>BACKLOGPLAN <span className="intro-slash">/</span> OPENING FILM</span><div>
   {!reduced&&!failed&&<button type="button" onClick={()=>setPaused(value=>!value)} aria-label={paused?'Play opening film':'Pause opening film'}>{paused?<Play weight="fill"/>:<Pause weight="fill"/>}<span>{paused?'Play':'Pause'}</span></button>}
   <button type="button" onClick={()=>finish()}>Skip intro <ArrowDown/></button>
  </div></div>
  <div className="intro-bottom"><button type="button" onClick={toggleMotion} disabled={systemReduced}>{reduced?'Still view':'Reduce motion'}</button><button type="button" onClick={()=>finish()}>Continue to website <ArrowDown/></button></div>
  <div className="intro-progress" aria-hidden="true"><span style={{scale:`${progress} 1`}}/></div>
  <p className="sr-only">A silent nine-second illustrative film: a fictional industrial site at dawn, a copper-and-steel pump, and a planner’s table with a spanner and an unsigned work-order sheet. Automatically reveals the website when finished. Skip intro or press Escape to continue immediately. Demo and simulated data; no equipment control or approval takes place.</p>
 </section>;
}
