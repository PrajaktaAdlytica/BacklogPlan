# BacklogPlan — Precision Atelier

A responsive, multipage React website and isolated synthetic maintenance-planning demo. The selected visual direction is first-set Option 1, Precision Atelier. This is a local frontend concept, not an operating maintenance product.

## Preview

The development preview runs at http://127.0.0.1:4173/.

- React 19 / Vite 6 / React Router
- Lenis smooth wheel scrolling synchronized with the GSAP ticker on desktop
- GSAP ScrollTrigger: separate hero planes, staggered product objects, planner reveal, layered evidence folio, and a pinned five-stage horizontal evaluation journey
- Native horizontal touch scrolling, numbered/keyboard controls, skip link and a visible reduced-motion toggle
- Fraunces Variable + Manrope Variable, served locally
- Phosphor UI icons; Simple Icons Crunchbase footer mark
- Original generated pump, module, folio, walkway and brand assets; optimized WebP delivery

## What is included

Full navigation, product suite and five individual product pages; platform, capabilities, problem, buyer solutions, evidence/results, hypothesis pricing, CMMS fit, trust, company, resources, request/contact forms, privacy, terms, accessibility and complete concept access screens. The footer includes explicitly unpublished LinkedIn and Crunchbase profile states.

The demo includes ten fictional work orders, queue search/filter/empty states, individual records, source inspection, R0/R1/R2 revisions, a disabled write-back preview, explicit simulated supervisor approval, a local annotation, evidence exports and an illustrative evaluation workspace.

## Local development

```sh
npm install
npm run dev -- --host 127.0.0.1 --port 4173
npm run build
npm run test:sites
```

The build uses the preserved prototype packaging scripts. `dist/client` contains the frontend; `dist/server/index.js` supplies SPA fallback behavior. No deployment has been performed.

## Boundaries

- Every organization, person, work order, asset and source in the demo is synthetic.
- Approval changes in-memory state only. No permits, execution, dispatch or CMMS writes.
- Forms validate locally. They do not send, store or subscribe anyone. Authentication is explicitly unconnected.
- Pricing is a test hypothesis. No payment or commercial commitment is collected.
- No analytics, pixels, external fonts or CRM delivery are installed.
- Domain ownership, trademark clearance and production security claims are not asserted.
- Refresh/reset clears demo state. Downloaded packets remain on the user's device until deleted.

## Files

- `src/data.js`: product scopes, prices, synthetic fixtures, research links and pilot scorecard.
- `src/Home.jsx`: homepage and motion.
- `src/ContentPages.jsx`: product/company/research/legal/form pages.
- `src/Demo.jsx`: deterministic demo and reversible evidence export.
- `src/components.jsx`: navigation, footer, shared page components.
- `src/styles.css`: responsive visual system and reduced-motion treatment.
- `docs/coverage.md`: brief coverage and launch dependencies.
- `docs/analytics-plan.md`: future event and consent plan, not active tracking.
- `design-qa.md`: browser verification and visual comparisons.
- `qa/`: actual browser captures and comparison evidence.

The preceding IA and validation deliverables remain alongside this folder: `../BacklogPlan-Website-Blueprint.md` and `../BacklogPlan-Demo-and-Validation-Spec.md`.

Motion integration follows the official [Lenis GSAP integration](https://github.com/darkroomengineering/lenis/#gsap-scrolltrigger). `src/Motion.jsx` owns the single scroll engine; `src/EvaluationJourney.jsx` owns the pinned sequence and its native fallback.

The shared `useSiteMotion` hook extends editorial reveals, image parallax, closing scenes and footer motion across routes. The home hero has independent pump, headline, eyebrow, supporting-copy, button and caption transforms. Forms and operational demo controls remain stationary. A reduced-motion control is available in every footer, and a thin copper reading-progress line follows page scroll when motion is enabled.

### Cinematic films
`src/MotionFilm.jsx` handles lazy loading, viewport/document visibility, pause controls and reduced-motion posters. `src/MotionFilmPlayer.jsx` contains the 16-second material studies and 18-second synthetic planning composition. These are embedded Remotion Player animations, not exported MP4 files. The planning film has a separately arranged portrait composition; it does not change the interactive planner's local state. Remotion packages are pinned together at 4.0.534; consult Remotion's license terms before commercial deployment.

## Opening film
Direction 1, Before the Week Begins, is implemented above the homepage hero. Nine seconds, three authored scenes, 60 fps desktop and portrait MP4s. Remotion source: `src/intro/`; native site player: `src/IntroFilm.jsx`. Use `npm run intro:studio` and `npm run intro:render` to edit/export. All film assets are local under `public/intro/`. Keep the aspect ratios intact to preserve title safe areas. Playback is silent, once per mount, with pause/replay, skip with focus transfer, visibility pausing, and a still-only reduced-motion fallback. Source images and full prompt provenance are archived in `../intro-film/`.

## Hostinger deployment

See [docs/HOSTINGER.md](docs/HOSTINGER.md). Source lives on `main`; the `hostinger` branch contains the compiled website for ordinary PHP/HTML hosting. GitHub Actions rebuilds that branch after source pushes. No Node.js web-app slot or PHP rewrite is required. `public/.htaccess` supplies SPA routing on Apache/LiteSpeed. Forms and authentication remain frontend previews.

The opening now uses a dismissible fullscreen film layer with an automatic, blur-free fade into the hero. The shared navbar is sticky throughout the page and hidden during the intro. Skip, Escape, intentional scrolling and reduced-motion stills remain supported.
