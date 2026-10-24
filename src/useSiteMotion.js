import {useEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useMotion} from './Motion';

gsap.registerPlugin(ScrollTrigger);

/** Route-scoped motion. Operational controls stay stationary once in view. */
export function useSiteMotion(routeKey,pathname){
 const {reduced}=useMotion();
 useEffect(()=>{
  if(reduced)return;
  const main=document.getElementById('main');
  if(!main)return;
  let disposed=false;
  const media=gsap.matchMedia();
  const context=gsap.context(()=>{
   const progress=document.querySelector('.reading-progress-fill');
   gsap.fromTo(progress,{scaleX:0},{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:true}});
   // The homepage owns its signature sequences; other routes share this quieter grammar.
   if(pathname!=='/'){
    main.querySelectorAll('.page-hero .container > div:first-child,.workspace-heading > div:first-child,.record-heading,.auth-form').forEach(el=>{
     gsap.from(el,{y:18,opacity:.65,duration:.85,ease:'power3.out'});
    });
    const groups=['.steps-list article','.products-grid .product-item','.related-links > a','.resource-list > a','.price-row','.faq-list details','.two-column > div','.inset-panel','.scope-note','.table-scroll','.article-body > h2','.article-body > h3','.auth-status'];
    const animated=new Set();
    main.querySelectorAll(groups.join(',')).forEach((el,i)=>{
     if(animated.has(el)||el.closest('.planner,.lead-form,.queue-list,.evaluation-grid'))return;
     // Never animate a nested control independently of its containing reveal.
     if([...animated].some(parent=>parent.contains(el)))return;
     animated.add(el);
     gsap.from(el,{y:22,opacity:.55,duration:.8,delay:Math.min(i%3*.055,.11),ease:'power2.out',scrollTrigger:{trigger:el,start:'top 94%',once:true}});
    });
   }
   document.querySelectorAll('.footer-top > div').forEach((el,i)=>gsap.from(el,{y:15,opacity:.6,duration:.7,delay:i*.055,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 98%',once:true}}));
   media.add('(min-width: 1001px) and (min-height: 700px)',()=>{
    if(pathname!=='/'){
     main.querySelectorAll('.page-hero').forEach(hero=>{
      const image=hero.querySelector('.page-hero-art'),heading=hero.querySelector('h1');
      const timeline=gsap.timeline({scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:1.15}});
      if(image)timeline.to(image,{y:46,scale:1.035,transformOrigin:'60% 50%',ease:'none'},0);
      if(heading)timeline.to(heading,{y:-20,ease:'none'},0);
     });
     main.querySelectorAll('.product-image img').forEach(image=>gsap.fromTo(image,{y:12},{y:-12,ease:'none',scrollTrigger:{trigger:image.parentElement,start:'top bottom',end:'bottom 25%',scrub:1.2}}));
    }
    main.querySelectorAll('.closing').forEach(section=>{
     gsap.fromTo(section.querySelector('.closing-bg'),{scale:1.07,y:0},{scale:1.03,y:0,ease:'none',scrollTrigger:{trigger:section,start:'top bottom',end:'bottom bottom',scrub:1.3}});
     gsap.from(section.querySelector('.closing-content'),{y:24,opacity:.6,duration:1,ease:'power2.out',scrollTrigger:{trigger:section,start:'top 85%',once:true}});
    });
   });
  });
  const refresh=()=>{if(!disposed)ScrollTrigger.refresh()};
  document.fonts.ready.then(refresh);
  const images=[...main.querySelectorAll('img')];images.forEach(img=>img.addEventListener('load',refresh,{once:true}));
  return()=>{disposed=true;images.forEach(img=>img.removeEventListener('load',refresh));media.revert();context.revert()};
 },[routeKey,pathname,reduced]);
}
