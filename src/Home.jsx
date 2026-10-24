import React,{useEffect,useRef,useState} from 'react';
import {Link} from 'react-router-dom';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {Button,Eyebrow,DemoLabel,ProductGrid,Closing,FAQ,ArrowUpRight,ArrowDown,FileText,Users,Package,Lock} from './components';
import {Planner} from './Demo';
import {useMotion} from './Motion';
import {EvaluationJourney} from './EvaluationJourney';
import {MotionFilm,PlanningFilm} from './MotionFilm';
import {IntroFilm} from './IntroFilm';
gsap.registerPlugin(ScrollTrigger);
export function Home(){const root=useRef(),focusAfterIntro=useRef(false);const [introComplete,setIntroComplete]=useState(false);const {reduced,toggleMotion,systemReduced}=useMotion();
useEffect(()=>{if(introComplete&&focusAfterIntro.current)document.getElementById('home-hero')?.focus({preventScroll:true})},[introComplete]);
useEffect(()=>{
 if(reduced)return;
 const media=gsap.matchMedia(),ctx=gsap.context(()=>{
  gsap.from('.hero-copy > *',{y:16,opacity:0,duration:.85,stagger:.06,ease:'power3.out',scrollTrigger:{trigger:'.home-hero',start:'top 65%',once:true}});
  gsap.utils.toArray('[data-reveal]').forEach(el=>gsap.from(el,{y:36,opacity:.2,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 92%',once:true}}));
  media.add('(min-width: 1001px) and (min-height: 700px)',()=>{
   // The pump stays in the scene while the headline and supporting text travel forward.
   const hero=gsap.timeline({scrollTrigger:{trigger:'.home-hero',start:'top top',end:'bottom top',scrub:1.15}});
   hero.to('.hero-image',{y:105,x:10,scale:1.055,transformOrigin:'74% 62%',ease:'none'},0)
    .to('.hero-copy h1',{y:-48,ease:'none'},0)
    .to('.hero-copy > .eyebrow',{y:-26,ease:'none'},0)
    .to('.hero-copy > p',{y:-20,ease:'none'},0)
    .to('.hero-copy > .button-row',{y:-10,ease:'none'},0)
    .to('.hero-caption',{y:-58,x:-8,ease:'none'},0);
   gsap.utils.toArray('.offers-section .product-item').forEach((item,i)=>{
    gsap.from(item,{y:55+(i%2)*25,rotationX:5,opacity:.35,ease:'power2.out',scrollTrigger:{trigger:'.offers-section .products-grid',start:'top 92%',end:'center 65%',scrub:1+i*.08}});
    gsap.fromTo(item.querySelector('img'),{y:20,scale:1.04},{y:-12,scale:1,ease:'none',scrollTrigger:{trigger:item,start:'top bottom',end:'bottom 25%',scrub:1.2}});
   });
   gsap.from('.dark-section .planner',{y:80,scale:.94,rotationX:4,transformOrigin:'50% 100%',ease:'none',scrollTrigger:{trigger:'.dark-section',start:'top 90%',end:'top 15%',scrub:1}});
   const folio=gsap.timeline({scrollTrigger:{trigger:'.evidence-story',start:'top 85%',end:'bottom 25%',scrub:1.1}});
   folio.fromTo('.folio-art img',{y:55,rotation:-4,scale:.94},{y:-45,rotation:1,scale:1.04,ease:'none'},0)
    .fromTo('.folio-source',{y:95,rotation:3},{y:-38,rotation:-1,ease:'none'},0)
    .fromTo('.folio-art .art-caption',{y:20},{y:-15,ease:'none'},0);

  });
 },root);
 let disposed=false;const refresh=()=>{if(!disposed)ScrollTrigger.refresh()};document.fonts.ready.then(refresh);window.addEventListener('load',refresh);
 return()=>{disposed=true;window.removeEventListener('load',refresh);media.revert();ctx.revert()};
},[reduced]);
return <div ref={root}>{!introComplete&&<IntroFilm onComplete={({focusHero})=>{focusAfterIntro.current=focusHero;setIntroComplete(true)}}/>}<div className="home-content" inert={!introComplete}><section className="home-hero" id="home-hero" tabIndex={-1} aria-label="Maintenance planning overview"><MotionFilm className="hero-image" kind="hero" src="/assets/hero-pump.webp" alt="Original illustrative cutaway of a steel pump with copper impeller on a pale stone plinth" label="Pump study" decorative/><div className="container hero-layout"><div className="hero-copy"><Eyebrow>Maintenance planning, with the reasoning attached</Eyebrow><h1>Turn a messy<br/>maintenance backlog<br/>into a <em>feasible,</em><br/><em>reviewable</em> week.</h1><p>For maintenance planners and their reliability sponsors.<br className="desktop-only"/> Bring work orders, crews, parts and production windows<br className="desktop-only"/> into one human-reviewed proposal.</p><div className="button-row"><Button to="/request-pilot">Request a paid evaluation</Button><Button to="/demo" secondary>Explore the demo</Button></div><DemoLabel/><span className="hero-boundary">No production connection or control.</span></div><div className="hero-caption"><span>FIG. 01 / THE PART THAT CHANGES THE PLAN</span><small>Illustrative industrial study · BacklogPlan</small></div><div className="hero-motion-tools"><a className="scroll-cue" href="#offers"><ArrowDown size={16}/> Explore the planning workbench</a><button className="motion-toggle" onClick={toggleMotion} disabled={systemReduced} aria-pressed={!reduced}>{reduced?'Motion reduced':'Reduce motion'}</button></div></div></section>
<div className="surface-sand"><section id="offers" className="section container offers-section"><div className="section-heading" data-reveal><div><Eyebrow>Five offers. Each with a specific job.</Eyebrow><h2>From scattered inputs<br/>to a week you can explain.</h2></div><p>Choose the planning problem to evaluate first.<br/>Five proposed modules, separately scoped<br/>and separately quotable.</p></div><ProductGrid/><div className="section-foot"><span>Proposed modules · Pricing remains a test hypothesis</span><Link to="/products" className="text-link">Explore the product suite <ArrowUpRight size={17}/></Link></div></section></div>
<PlanningFilm/><section className="dark-section"><div className="container"><div className="section-heading" data-reveal><div><Eyebrow>One work order. Three revisions.</Eyebrow><h2>From blocked<br/>to reviewable.</h2></div><p>A missing seal. A conflicting window.<br/>Follow the evidence as the proposal changes.<br/>The final decision belongs to a person.</p></div><Planner compact/><div className="section-foot"><span>Ten fictional records. One transparent planning case.</span><Button to="/demo/planner" light>Open the interactive demo</Button></div></div></section>
<div className="surface-parchment"><section className="section container evidence-story"><div className="folio-art" data-reveal><img src="/assets/evidence-folio.webp" alt="Layered paper evidence folio with a copper clip" loading="lazy"/><div className="folio-source"><span className="micro">Source / 04</span><strong>Expected is not received.</strong><p>DEMO-SRC-ETA-01<br/>16 Oct 2026 · 14:15 UTC</p><span className="demo-tag">Synthetic evidence · R1 conditional</span></div><span className="art-caption">THE RECORD BEHIND THE REVISION</span></div><div data-reveal><Eyebrow>Evidence stays attached</Eyebrow><h2>A proposal is better<br/>when you can<br/><em>question it.</em></h2><p className="lead">See where the input came from, when it was recorded, and what it cannot tell you.</p><div className="evidence-lines">{[[FileText,'Source, not just a summary','Open the exact synthetic excerpt and timestamp.'],[Package,'Unknown stays unknown','Stale inventory and unconfirmed arrivals remain exceptions.'],[Users,'The reviewer owns the revision','Keep the decision, annotation and next action in the packet.']].map(([Icon,t,d])=><div key={t}><Icon size={25}/><p><strong>{t}</strong><span>{d}</span></p></div>)}</div><Link className="text-link" to="/demo/evidence">Inspect the example packet <ArrowUpRight/></Link></div></section></div>
<EvaluationJourney/><div className="surface-graphite"><section id="planning-boundary" className="section container boundary-section" tabIndex="-1"><div><Eyebrow>A deliberate boundary</Eyebrow><h2>Planning support.<br/>Human authority.</h2></div><div><p className="lead">A reviewed proposal is one input to your site’s established process.</p><div className="boundary-list">{['No permits or safety authorization','No work execution or dispatch','No production connectors or CMMS write-back','No unvalidated performance or savings claims'].map(t=><div key={t}><Lock size={18}/>{t}</div>)}</div><Link className="text-link" to="/trust">Read the scope and limitations <ArrowUpRight/></Link></div></section></div><div className="surface-sand"><FAQ/></div><Closing/></div></div>}
