import React from 'react';
import {registerRoot,Composition,Folder} from 'remotion';
import '@fontsource-variable/fraunces';
import '@fontsource-variable/manrope';
import {IntroComposition} from './IntroComposition';
import {DawnScene} from './DawnScene';
import {PumpScene} from './PumpScene';
import {TableScene} from './TableScene';
function Root(){return <>
 <Composition id="BacklogPlan-Intro" component={IntroComposition} durationInFrames={540} fps={60} width={1920} height={1080}/>
 <Composition id="BacklogPlan-Intro-Mobile" component={IntroComposition} durationInFrames={540} fps={60} width={720} height={1080}/>
 <Folder name="Scenes">
 <Composition id="Dawn" component={DawnScene} durationInFrames={192} fps={60} width={1920} height={1080}/>
 <Composition id="Pump" component={PumpScene} durationInFrames={192} fps={60} width={1920} height={1080}/>
 <Composition id="Table" component={TableScene} durationInFrames={192} fps={60} width={1920} height={1080}/>
 </Folder>
 </>}
registerRoot(Root);
