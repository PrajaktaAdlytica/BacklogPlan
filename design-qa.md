# BacklogPlan design QA

Date: 24 October 2026. Scope: local frontend concept and isolated synthetic demo; not production service certification.

## Source and implementation

- Source visual truth: `../visual-directions/01-precision-atelier.png` (971 × 1619 pixels).
- Implementation: http://127.0.0.1:4173/.
- Desktop viewport: 1440 × 1000 CSS px; screenshot: `qa/desktop-home.png`, 1440 × 1000 pixels.
- Mobile viewport: 390 × 844 CSS px; screenshot: `qa/mobile-home.png`, 390 × 844 pixels.
- Full browser captures: `qa/home-r1-full.png`, `qa/mobile-planner.png`, `qa/mobile-form.png`.
- Density normalization: source scaled proportionally to 1440px width; first 1000px cropped for top-of-page comparison. Both captures omit browser chrome. Comparison contact sheets are downsampled only for joint inspection; original screenshots remain available.
- State: homepage hero and offers; homepage planner at R1 conditional; standalone planner additionally tested through approved R2.
- Combined full-view comparison: `qa/comparison-final.jpg` (reference left, implementation right).
- Focused interface comparison: `qa/planner-comparison.jpg`; original rendered component crop in `qa/planner-detail.png`. Reference and actual panel are normalized to equal width without distorting height. The actual panel is taller because it exposes the blocking-reason paragraph and explicit boundary absent from the short mock.

## Comparison history and fixes

1. Initial comparison (`qa/comparison-before.jpg`): P2 supporting text too small, display weight too heavy, hero too tall and product objects too tightly cropped. Fixed desktop supporting type from 12px to 17px, display weight to 300, hero height/padding, and object-fit to contain. Post-fix evidence: `qa/comparison-after.jpg`, then `qa/comparison-final.jpg`.
2. Focused planner comparison: P2 UI text insufficiently legible at desktop scale. Increased title, revision, source, timestamp, status and constraint text sizes; increased source-pane width to 300px. Final focused evidence: `qa/planner-comparison.jpg`. Mobile source/timestamp text also enlarged; `qa/mobile-planner.png` confirms provenance and boundaries remain visible.
3. Functional check: packet CTA pointed to an unimplemented nested route. Corrected to /demo/evidence. Verified the navigation and downloaded JSON after R2 approval.
4. Scope consistency: a non-pump annotation could have appeared in the pump packet. Restricted editable annotation to its pump case; other record pages retain their own seeded facts.

## Required fidelity surfaces

- Typography: locally loaded Fraunces Variable and Manrope Variable confirmed in browser; editorial display hierarchy, large four-line desktop hero and mobile reflow retained. Thin display weight matches the selected direction. Supporting copy and dense UI sizes refined after comparison.
- Spacing/layout: ivory hero, large right-side cutaway pump, five object-led offers, graphite planner chapter, evidence folio and industrial closing retained. Native mobile stacking and horizontally scrollable inner tables keep all controls reachable. No whole-page overflow in tested 1440px and 390px routes.
- Colors/tokens: ivory #f7f5ef, copper #985637 and graphite #292b28; muted amber/green statuses also have text labels. Source palette and material hierarchy retained without generic blue/gradient styling.
- Images: original raster assets match the steel/copper/paper/stone direction. Whole module objects are visible. WebP optimization preserves details; custom mark and favicon replace template branding. Functional diagrams/tables are HTML; UI icons are Phosphor, not improvised decorative SVGs.
- Copy/content: all five module scopes/prices retained as hypotheses. Mock text corrected to synthetic DEMO-P-204, Wednesday 21 Oct 13:00–17:00, Nia Arden and appropriate source timing. No real repair instructions, customer proof or connector claims introduced.

## Intentional differences

The exact display font is an implementation selection, not an identified licensed font from the generated image. The pipe/timeline decoration above the pump is omitted; the real decision sequence is demonstrated in the planner. Copper emphasis is added to two hero words. The implementation adds the full brief's pages and evidence sections. Source fictional UI claims and inconsistent dates were deliberately corrected rather than reproduced. These are acceptable adaptations of the chosen direction.

## Interaction verification

- Desktop product navigation opens; Escape closes it. Mobile menu opens/closes.
- R0 review button disabled. Propose Wednesday → R1 conditional. Synthetic receipt → R2 awaiting review. Explicit modal approval → local reviewed state.
- Source dialog opens with timestamp/excerpt; Escape closes it.
- Disabled CMMS write-back remains disabled.
- Export downloaded as DEMO-EP-001-R2.json. Parsed file confirms simulation=true, revision R2, Nia Arden reviewer, eight synthetic sources and no-control boundary.
- Queue search produces a clear empty state; Clear filters restores 10 rows. Bearing record remains blocked by unknown stock.
- Mobile request form validates sample values and states “Nothing was sent.” No submission endpoint exists.
- Desktop horizontal chapter advances its native scroll offset with page scrolling; mobile uses native horizontal scrolling. Reduced-motion CSS and GSAP media conditions remove animated treatment; OS preference itself was not changed during QA.
- Route/asset smoke report: `qa/route-checks.json`; tested route headings present, no broken images or desktop overflow. Primary home, demo, product and request routes separately inspected.
- Browser error/warning logs checked after core workflows: none reported.
- Production build passes. Four existing hosting/SPA fallback tests pass.

## Residual test gaps / P3 follow-up

Full assistive-technology and cross-browser/device coverage remain launch tasks. No real backend, analytics, authentication, domain, security certification or lead delivery was tested or represented as available. Full-page captures of scroll animation may show later chapters before their entrance; focused screenshots record the inspected visual states. A finalized vector logo is a branding follow-up, not a fabricated vector export.

## Implementation checklist

- [x] Selected direction compared jointly with actual browser screenshots.
- [x] Typography, rhythm, colors, imagery and copy reviewed.
- [x] Identified P2 fidelity/usability issues corrected and recaptured.
- [x] Desktop/mobile core workflows and evidence export verified.
- [x] Five offers, prices, boundaries and pilot method preserved.
- [x] Build and existing hosting checks pass.
- [x] Local preview retained; no Git push or public deployment.

final result: passed

## Motion refinement — 24 October 2026

User request: more immersive depth and layered animations, especially horizontal sections, while preserving Precision Atelier. Lenis and GSAP explicitly authorized.

- Added one Lenis engine driven by GSAP's ticker for desktop wheel scrolling. Native touch/short viewport behavior retained. Engine, ticker listeners and ScrollTriggers clean up on preference/breakpoint changes; route navigation resets the scroll position without leaving pin spacers.
- Replaced the short horizontal text track with an illustrated five-stage evaluation sequence: pinned editorial introduction, separate moving object/slip layers, copper progress rail, stage counter, numbered navigation, arrow-key controls and a visible Continue reading exit.
- Added separate travel rates to hero photograph, copy and caption; staggered depth to the five module objects; a shallow planner reveal; a timestamped source slip over the folio; and a restrained closing-image parallax.
- Hero composition, type, palette and all five product scopes remain intact. Source-versus-current combined evidence: `qa/motion/direction-comparison.jpg`. Same 1440 × 1000 viewport and normalization as the original review.
- New chapter evidence: `qa/motion/horizontal-desktop.png` (1440 × 1000, stage 03). Mobile evidence: `qa/motion/mobile-full.png` (390px width). Reduced-motion evidence: `qa/motion/reduced-motion.png`.
- The new chapter has no literal layout counterpart in the short reference image. Its imagery, paper surfaces, copper accents and serif hierarchy extend the selected direction under the user's explicit motion request.

Verification:

- Stage 03 produced rail translateX -698.5px and an independently transformed image layer; stage 05 reached -1397px and counter 05/05.
- Continue reading placed the next section at the viewport top and moved keyboard focus to planning-boundary.
- Reduce motion removed Lenis and all pin spacers. Every stage remained reachable through native horizontal scrolling and numbered controls, including stage 05.
- At 390px: document width equals viewport width; no pins or Lenis instance; native horizontal scene scrolling. ArrowRight moved settled stage 03 (scrollLeft 696) to stage 04 (1044).
- Navigating away mid-sequence removed the pin and reset the destination route to scrollY 0.
- One development-only React hot-refresh warning appeared while a dependency array was edited. Clean reload after the final code reported no warnings/errors.
- Build passes with motion split into a separate 135kB minified chunk; no chunk-size warning.

No actionable P0/P1/P2 visual or functional issues remain in the checked states. OS-level motion preference was not changed; the same reduced-state branch was exercised through the visible control. Cross-browser and physical-device coverage remains a future launch check.

final result: passed

## Hero and site-wide motion extension — 24 October 2026

User request: independently moving pump and text layers with subtle premium motion, extended across the website.

Implementation: `src/useSiteMotion.js` adds route-scoped editorial reveals, product imagery parallax, closing-scene movement, footer reveals and a reading-progress line. The homepage retains its signature scenes. A shared footer motion control makes the reduced state reachable from every page. Forms, queues, approval controls and other operational UI are excluded from moving content groups.

Verified at 1440 × 1000:

- Hero at scrollY 400: pump image translated +51.34px vertically with scale 1.0269; headline -23.47px; description -9.78px; buttons -4.89px; caption -28.36px. This confirms independent layers without a pinned or prolonged hero. Capture: `qa/site-motion/hero-scrolled.png`.
- Product page at scrollY 200: illustration +8.78px and scale 1.0067; heading -3.82px. Capture: `qa/site-motion/product-scrolled.png`.
- Footer Reduce motion removed the product image transform and Lenis. Re-enabling restored the shared system.
- Company, resources, pricing, pilot request, sign-in and planner routes rendered their headings with no horizontal page overflow, leftover pin spacers or retained route scroll position.
- At 390 × 844, product-page width remained 390px with no Lenis class or pin spacers. Capture: `qa/site-motion/product-mobile.png`.
- Clean-load warning/error logs remained empty. Production build passed.

Visual truth remains `../visual-directions/01-precision-atelier.png`. Hero typography, ivory/copper colors, original pump crop and CTA hierarchy are unchanged at scroll origin. Combined direction comparison: `qa/site-motion/direction-comparison.jpg` (source left, current render right, both normalized to 1440px width). Shared page motion changes entry/scroll states without changing the underlying page architecture.

No actionable P0/P1/P2 issue found in the checked states. Physical touch-device and full cross-browser testing remain outside this local QA.

final result: passed

## Cinematic motion sequences — 24 October 2026
- Added looping pump, module/page-art and industrial closing studies; preserved separate GSAP scroll transforms on outer layers.
- Added an 18-second three-scene planning film: R0 blocked, R1 conditional, R2 awaiting explicit human review. All records remain synthetic.
- Desktop composition and dedicated 390px portrait composition inspected in the browser. No mobile document overflow.
- Verified playback advances through all three scenes; pause keeps image transforms unchanged across observations. Offscreen films report idle; only visible compositions play.
- Global Reduce motion removes all players and retains artwork, accessible scenario descriptions and the three-stage text summary.
- Product mobile layout inspected. Lazy player bundle is separate from initial app code.
- Build and four hosting tests pass. Screenshots: qa/films/.
- Final result: passed.

## Material surfaces — 24 October 2026
Replaced repeated pale backgrounds with sandstone, deep olive, parchment, copper and graphite chapters. Extended warmer surfaces to shared page heroes, content sections and forms. Verified 1440px homepage and 390px pilot/journey/boundary layouts with no document overflow. Checked key foreground/background contrast pairs and darkened small labels where needed. Confirmed the mobile journey stage and continue-reading controls still work. Browser screenshots saved in qa/surfaces/. Build passed.

## Browser comment fixes — 24 October 2026
- Changed the evaluation journey from tan to mineral sage, including artwork surfaces and stage controls.
- Removed the closing section's mobile reserved-space layout; the image is now an in-flow final child touching the footer.
- Sized material compositions to their actual containers, eliminating mismatched poster/player edges. Added camera overscan and removed the closing scroll translation that could expose the lower edge.
- Verified at the reported 556×804 viewport and at 390px with motion reduced: image bottom and footer top match exactly. Inspected 1440px desktop animation, with no visible gap or horizontal overflow.
- Build passes. Captures in qa/review-fixes/.
