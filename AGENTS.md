# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Selected BacklogPlan direction
The user selected first-set Option 1, Precision Atelier, after considering all nine visuals. Earlier concern about overlap with WattTrace was explicitly removed. Preserve ivory/copper materials, refined serif headings, layered pump imagery, the five distinct tabletop module assets, and the graphite planner chapter. The source is ../visual-directions/01-precision-atelier.png.

The website is a frontend concept with a deterministic synthetic demo. Do not add operational authority, fake lead-delivery success, fabricated customer proof, active pricing, or production connector claims. Preserve all five separately quoted modules. All consequential demo actions remain local.

The latest user explicitly authorized pushing this website to https://github.com/PrajaktaAdlytica/BacklogPlan. Source belongs on main; compiled static files belong on hostinger. Hostinger account setup and domain changes are instructions for the user, not performed here.

## Motion refinement — user direction
Keep Precision Atelier, but make scrolling more immersive through depth and layered animations, especially the horizontal chapters. The user explicitly permits Lenis + GSAP. Preserve the initial hero and five-offer architecture; enrich the evaluation sequence with independently moving object imagery and evidence slips. Keep content reachable with motion reduced, native touch scrolling, keyboard stage controls and a visible skip link.

## Site-wide motion refinement
The user wants a subtler premium hero with separately moving pump, heading, supporting copy and caption, plus scrolling motion across the website. Extend the shared Lenis/GSAP grammar to product, company, research, pricing and supporting pages. Keep interactive demo controls and form fields steady; reduced motion and route cleanup remain mandatory. Preserve the selected artwork and layout rather than introducing a new visual direction.

## Cinematic sequence direction
The user wants motion-sequence films throughout the website. Preserve Precision Atelier. Use silent, frame-driven Remotion compositions for the hero, product/page artwork and closing scenes; the homepage also has an 18-second, three-scene synthetic planning film. Keep local playback controls, offscreen/background pausing, lazy loading, portrait framing and global reduced-motion stills. Illustrative films never imply actual equipment motion, live records or automatic approval.

## Material background refinement
The user finds repeated white backgrounds dull. Use a deliberate full-width rhythm of sandstone offers, deep olive film/page introductions, parchment evidence, copper evaluation journey and graphite approval boundaries. Supporting content uses warm stone surfaces. Retain the selected artwork and typography; preserve readable contrast, responsive scrolling and synthetic-demo labels.

## Browser review corrections
The user rejected the copper/tan evaluation-journey background. Use mineral sage (#cbd1c4) with dark green-gray text instead. Closing artwork must meet the footer without blank space; mobile uses content followed by an in-flow image, and animated material compositions match their container proportions so poster edges cannot show through.

## Logo exploration feedback
The user rejected abstract geometric logo symbols as meaningless and explicitly asked to think beyond geometrical shapes. Latest direction explores an authored illustration: a maintenance spanner wrapped with a work-order sheet. Do not treat previous tentative responses as approval to replace the site logo. Latest board is ../logo-exploration/06-the-planners-tool.png; current site logo remains unchanged until a selection.

## Selected opening film
User selected intro option 1, Before the Week Begins: dawn industrial facility → copper-and-steel pump → planner’s table. Build a premium nine-second silent opening above the hero, gentle camera moves and slow dissolves. Keep it in normal page flow, never an unskippable splash screen. Native rendered desktop/portrait videos, immediate skip, pause/replay, offscreen/background pause and reduced-motion poster. All imagery is illustrative; no autoplay approval or operating-equipment claims.

## Opening film motion correction
User rejected the first intro as static images fading together. Add movement inside the shots: drifting valley mist, changing metal reflections, and a physically deforming top sheet with a moving shadow. Shorten transitions to 0.3s while retaining nine seconds overall. Do not describe a procedural still-based composite as live-action or AI-generated video. Weave image-to-video discovery currently requires the user's Figma account to be linked to Weave.

## Intro-to-hero handoff
The updated V2 film is integrated. Blend it into the existing hero with a scroll-driven, reversible ivory dissolve: film stays behind the incoming hero, image layers recede gently, and hero text enters in sequence. Continue/Skip use smooth scrolling on desktop and mobile; reduced motion uses immediate navigation and normal document flow. The latest user instruction supersedes the original manual-only handoff: automatically advance when the visible intro ends.

## Automatic intro handoff and clean edge
The user explicitly requests automatic smooth progression when the intro ends, no website navbar during the intro, and removal of the blur. The homepage header belongs to the incoming hero section; other routes retain their header. Remove the feathered mask, ivory wash and backdrop blur from intro controls. Keep Pause/Skip and reduced-motion stills; never auto-pull a visitor back from later content.

## Intro layout correction — latest direction
The user rejected the strip of video remaining above the navbar during the scroll transition and wants navigation to remain available after the hero. Replace the scrolling intro section with a dismissible fullscreen film layer that fades out as one frame. Keep the header at the application root, sticky across the full page, hidden and inert only while the intro is active. The intro must leave no document-height spacer or video strip. Preserve automatic completion, Skip/Pause, Escape, scroll dismissal, responsive video, and reduced-motion fallback. This supersedes the earlier in-flow hero-arrival header arrangement.

## Logo applied — 25 October 2026
The user confirmed the new logo should be on the website. Use the finished Planner’s Tool spanner-and-work-order SVG lockup from the brand kit: color in the header, reversed in the dark footer, matching favicons under /brand/planners-tool/. This supersedes earlier instructions to leave the old bracket logo unchanged.
