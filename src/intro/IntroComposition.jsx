import React from 'react';
import {AbsoluteFill,useVideoConfig} from 'remotion';
import {TransitionSeries,linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {DawnScene} from './DawnScene';
import {PumpScene} from './PumpScene';
import {TableScene} from './TableScene';
export function IntroComposition(){const {fps,width,height}=useVideoConfig();return <AbsoluteFill style={{background:'#293029'}}>
 <TransitionSeries>
  <TransitionSeries.Sequence name="The site at dawn" durationInFrames={3.2*fps} premountFor={fps}><DawnScene/></TransitionSeries.Sequence>
  <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:.3*fps})}/>
  <TransitionSeries.Sequence name="The asset" durationInFrames={3.2*fps} premountFor={fps}><PumpScene/></TransitionSeries.Sequence>
  <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:.3*fps})}/>
  <TransitionSeries.Sequence name="The planner’s table" durationInFrames={3.2*fps} premountFor={fps}><TableScene/></TransitionSeries.Sequence>
 </TransitionSeries>
 <div style={{position:'absolute',left:height>width?52:100,bottom:height>width?105:65,fontFamily:'Manrope Variable,sans-serif',fontSize:height>width?13:14,letterSpacing:2,color:'#eee5d5'}}>ILLUSTRATIVE CONCEPT · DEMO / SIMULATED DATA</div>
 </AbsoluteFill>}
