import React,{createContext,useCallback,useContext,useEffect,useRef,useState} from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const MotionContext=createContext(null);
export function MotionProvider({children}){
 const [systemReduced,setSystemReduced]=useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 const [userEnabled,setUserEnabled]=useState(true);
 const reduced=systemReduced||!userEnabled,engine=useRef(null),nativeScroll=useRef(null),reducedRef=useRef(reduced);
 reducedRef.current=reduced;
 useEffect(()=>{
  const cancel=()=>{nativeScroll.current?.kill();nativeScroll.current=null};
  const keys=event=>{if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key))cancel()};
  window.addEventListener('wheel',cancel,{passive:true});window.addEventListener('touchstart',cancel,{passive:true});window.addEventListener('keydown',keys);
  return()=>{cancel();window.removeEventListener('wheel',cancel);window.removeEventListener('touchstart',cancel);window.removeEventListener('keydown',keys)};
 },[]);
 useEffect(()=>{if(reduced)nativeScroll.current?.kill()},[reduced]);
 useEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)');const change=()=>setSystemReduced(media.matches);media.addEventListener('change',change);return()=>media.removeEventListener('change',change)},[]);
 useEffect(()=>{
  document.documentElement.classList.toggle('motion-reduced',reduced);
  if(reduced)return;
  const media=gsap.matchMedia();
  media.add('(min-width: 1001px) and (pointer: fine)',()=>{
   const lenis=new Lenis({autoRaf:false,lerp:.085,smoothWheel:true,syncTouch:false,anchors:true,prevent:node=>!!node.closest('dialog,.mobile-menu,[data-native-scroll]')});
   engine.current=lenis;lenis.on('scroll',ScrollTrigger.update);
   const tick=time=>lenis.raf(time*1000);gsap.ticker.add(tick);gsap.ticker.lagSmoothing(0);
   const refresh=()=>lenis.resize();ScrollTrigger.addEventListener('refresh',refresh);
   return()=>{ScrollTrigger.removeEventListener('refresh',refresh);gsap.ticker.remove(tick);lenis.destroy();engine.current=null};
  });return()=>media.revert();
 },[reduced]);
 const scrollTo=useCallback((target,options={})=>{
  nativeScroll.current?.kill();
  if(engine.current){engine.current.scrollTo(target,options);return}
  const y=typeof target==='number'?target:target.getBoundingClientRect().top+window.scrollY;
  const top=Math.max(0,y+(options.offset||0));
  if(reducedRef.current||options.immediate){window.scrollTo({top,behavior:'instant'});return}
  const position={y:window.scrollY};
  nativeScroll.current=gsap.to(position,{y:top,duration:options.duration||1,ease:'power3.inOut',onUpdate:()=>window.scrollTo({top:position.y,behavior:'instant'}),onComplete:()=>{nativeScroll.current=null}});
 },[]);
 return <MotionContext.Provider value={{reduced,systemReduced,toggleMotion:()=>setUserEnabled(v=>!v),scrollTo}}>{children}</MotionContext.Provider>;
}
export const useMotion=()=>useContext(MotionContext);
