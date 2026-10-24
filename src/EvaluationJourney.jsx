import React,{useLayoutEffect,useRef,useState} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {Link} from 'react-router-dom';
import {Eyebrow,ArrowRight,ArrowDown,ArrowUpRight} from './components';
import {protocol} from './data';
import {useMotion} from './Motion';
const artifacts=[
 {image:'work-desk',label:'01 / People',caption:'The evaluation team',detail:'Planner · Sponsor · Operator · Data owner'},
 {image:'evidence-folio',label:'02 / Permission',caption:'A clearly bounded dataset',detail:'Scope · Access · Retention · Review'},
 {image:'work-review',label:'03 / Baseline',caption:'One historical week',detail:'Work orders · Crews · Parts · Windows'},
 {image:'work-proof',label:'04 / Comparison',caption:'An independently reviewed case',detail:'Planner time · Exceptions · Evidence'},
 {image:'work-report',label:'05 / Decision',caption:'A documented go / no-go',detail:'Agreed threshold · Named evaluator'}
];
export function EvaluationJourney(){
 const root=useRef(),viewport=useRef(),rail=useRef(),controller=useRef(null),activeRef=useRef(0);
 const [active,setActive]=useState(0);const {reduced,scrollTo}=useMotion();
 useLayoutEffect(()=>{
  const section=root.current,view=viewport.current,track=rail.current;
  const update=i=>{if(activeRef.current!==i){activeRef.current=i;setActive(i)}};
  const mm=gsap.matchMedia();
  if(!reduced)mm.add('(min-width: 1001px) and (min-height: 700px)',()=>{
   const ctx=gsap.context(()=>{
    section.classList.add('journey-pinned');view.removeAttribute('data-native-scroll');
    const scenes=[...track.children],distance=()=>Math.max(0,track.scrollWidth-view.clientWidth);
    const tl=gsap.timeline({scrollTrigger:{trigger:section,start:'top top',end:()=>'+='+Math.round(distance()*1.25),pin:true,scrub:.85,invalidateOnRefresh:true,anticipatePin:1,onUpdate:self=>update(Math.min(4,Math.round(self.progress*4)))}});
    tl.to(track,{x:()=>-distance(),ease:'none',duration:1},0);
    tl.fromTo(section.querySelector('.journey-progress-fill'),{scaleX:0},{scaleX:1,ease:'none',duration:1},0);
    scenes.forEach(scene=>{
     gsap.fromTo(scene.querySelector('.journey-art img'),{x:-30,y:28,scale:.94,rotation:-3},{x:28,y:-18,scale:1.035,rotation:1,ease:'none',scrollTrigger:{trigger:scene,containerAnimation:tl,start:'left right',end:'right left',scrub:true}});
     gsap.fromTo(scene.querySelector('.journey-slip'),{y:35,rotation:3},{y:-16,rotation:-1,ease:'none',scrollTrigger:{trigger:scene,containerAnimation:tl,start:'left right',end:'right left',scrub:true}});
    });
    controller.current=tl.scrollTrigger;
   },section);
   return()=>{controller.current=null;section.classList.remove('journey-pinned');view.setAttribute('data-native-scroll','');ctx.revert()};
  });
  const onScroll=()=>{if(!controller.current){const max=view.scrollWidth-view.clientWidth;update(max>0?Math.min(4,Math.round(view.scrollLeft/max*4)):0)}};
  view.addEventListener('scroll',onScroll,{passive:true});
  return()=>{view.removeEventListener('scroll',onScroll);mm.revert()};
 },[reduced,scrollTo]);
 const go=i=>{
  const st=controller.current;
  if(st)scrollTo(st.start+(st.end-st.start)*(i/4),{duration:.85});
  else {const view=viewport.current;view.scrollTo({left:(view.scrollWidth-view.clientWidth)*i/4,behavior:reduced?'instant':'smooth'})}
 };
 const skip=e=>{e.preventDefault();const next=document.getElementById('planning-boundary');scrollTo(next,{duration:.8});next.focus({preventScroll:true})};
 return <section id="evaluation-journey" className="evaluation-journey" ref={root} aria-label="Five-step evaluation journey">
  <div className="journey-top container"><span className="micro">The evaluation journey</span><a href="#planning-boundary" onClick={skip}>Continue reading <ArrowDown size={15}/></a></div>
  <div className="journey-stage container">
   <div className="journey-intro"><Eyebrow>A small, serious first step</Eyebrow><h2>Prove one <br/>planning job. <br/><em>Then decide.</em></h2><p>Move from a named team to a defensible decision. Agree the evidence before evaluating the promise.</p><div className="journey-count"><span>{String(active+1).padStart(2,'0')}</span><span>/ 05</span></div><Link className="text-link" to="/resources/shadow-planning-protocol">Read the full protocol <ArrowUpRight size={16}/></Link></div>
   <div className="journey-viewport" ref={viewport} data-native-scroll tabIndex="0" aria-label="Evaluation stages. Use the numbered controls or scroll horizontally." onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();go(Math.max(0,Math.min(4,active+(e.key==='ArrowRight'?1:-1))))}}}>
    <div className="journey-rail" ref={rail}>{protocol.map(([n,title,copy],i)=><article key={n} className={`journey-scene ${active===i?'is-current':''}`} aria-label={`Step ${n}: ${title}`}>
     <div className="journey-art"><img src={`/assets/${artifacts[i].image}.webp`} alt="" width="600" height="400" loading="lazy"/><div className="journey-slip"><span className="micro">{artifacts[i].label}</span><strong>{artifacts[i].caption}</strong><span>{artifacts[i].detail}</span></div></div>
     <div className="journey-copy"><span className="step-number">{n}</span><div><h3>{title}</h3><p>{copy}</p></div></div>
    </article>)}</div>
   </div>
  </div>
  <div className="journey-bottom container"><div className="journey-controls" aria-label="Choose an evaluation stage">{protocol.map(([n,t],i)=><button key={n} onClick={()=>go(i)} aria-label={`Go to step ${n}: ${t}`} aria-current={active===i?'step':undefined}><span>{n}</span><span>{t}</span></button>)}</div><div className="journey-progress" aria-hidden="true"><div className="journey-progress-fill"/></div><div className="journey-hint"><span>One module. A measured comparison.</span><span>Scroll to explore <ArrowRight size={14}/></span></div></div>
 </section>;
}
