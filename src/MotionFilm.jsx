import React,{lazy,Suspense,useEffect,useRef,useState} from 'react';
import {Pause,Play} from '@phosphor-icons/react';
import {useMotion} from './Motion';
const FilmPlayer=lazy(()=>import('./MotionFilmPlayer'));

class FilmFallback extends React.Component {
 state={failed:false};
 static getDerivedStateFromError(){return {failed:true}}
 render(){return this.state.failed?null:this.props.children}
}

/** Still artwork is always present; frame-based films only run while visible. */
export function MotionFilm({src,alt='',className='',kind='study',label='Material study',decorative=false}){
 const {reduced}=useMotion(),host=useRef(null);
 const [size,setSize]=useState(null),[portrait,setPortrait]=useState(false),[visible,setVisible]=useState(false),[loaded,setLoaded]=useState(false),[paused,setPaused]=useState(false),[foreground,setForeground]=useState(!document.hidden);
 useEffect(()=>{
  const observer=new IntersectionObserver(([entry])=>{setVisible(entry.isIntersecting);if(entry.isIntersecting)setLoaded(true)},{threshold:.08});
  observer.observe(host.current);
  const resize=new ResizeObserver(([entry])=>{const {width,height}=entry.contentRect;setPortrait(width<650);if(width>0&&height>0)setSize({width:Math.round(width),height:Math.round(height)})});resize.observe(host.current);
  const change=()=>setForeground(!document.hidden);document.addEventListener('visibilitychange',change);
  return()=>{observer.disconnect();resize.disconnect();document.removeEventListener('visibilitychange',change)};
 },[]);
 return <div ref={host} className={`motion-film ${className} motion-film--${kind}`} data-film-state={reduced?'still':paused?'paused':visible&&foreground?'playing':'idle'}>
  <img className="film-poster" src={src} alt={alt} loading={kind==='hero'?'eager':'lazy'}/>
  {!reduced&&loaded&&<div className="film-canvas" aria-hidden="true"><FilmFallback><Suspense fallback={null}><FilmPlayer src={src} kind={kind} portrait={portrait} size={size} playing={visible&&foreground&&!paused}/></Suspense></FilmFallback></div>}
  {!decorative&&<div className="film-label"><span>{label}</span><small>Illustrative motion study</small></div>}
  {!reduced&&<button className="film-toggle" onClick={()=>setPaused(p=>!p)} aria-label={`${paused?'Play':'Pause'} ${label.toLowerCase()}`} aria-pressed={paused}>{paused?<Play size={12} weight="fill"/>:<Pause size={12} weight="fill"/>}<span>{paused?'Play':'Pause'}</span></button>}
 </div>
}

export function PlanningFilm(){return <div className="surface-olive"><section className="container planning-film-section"><div className="film-section-heading"><div><span className="micro">A week, reconstructed / 18-second film</span><h2>Every revision<br/>has a reason.</h2></div><p>A visual study of the pump case.<br/>Missing part → conditional slot → human review.<br/><strong>DEMO · SIMULATED DATA</strong></p></div><MotionFilm kind="sequence" src="/assets/work-proof.webp" alt="Illustrative parts study. R0 is blocked by a missing seal and conflicting window. R1 moves to Wednesday, conditional on receipt. R2 records a synthetic receipt and awaits a human review; no execution is authorized." label="The planning sequence"/><div className="film-transcript"><span>01 / Recognize the constraint</span><span>02 / Revise the proposal</span><span>03 / Request human review</span></div></section></div>}
