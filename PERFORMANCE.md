# Investo website performance

The performance optimizations are implemented and functional checks pass. **Consistent 90+ performance on both devices has not yet been confirmed.** Local runs have reached the target, but repeated measurements vary; the public website/PageSpeed report URL was not supplied, so the actual deployment has not been audited.

## Homepage motion follow-up — 26 September 2026

The homepage adds original SVG architectural artwork and finite timeline drawing, with no new image/video requests or dependency. Selection state stays inside `HeroShowcase`, avoiding a whole-homepage render for every stage click. The added main bundle is about 2.34 KB gzip and CSS about 1.21 KB gzip compared with the performance release. Initial content remains prerendered and layout space is reserved.

A standard mobile Lighthouse CLI follow-up measured performance **79**, FCP **2.5 s**, LCP **3.8 s**, TBT **210 ms** and CLS **0**. The report warns that the local CPU is slower than Lighthouse expects. Best practices and SEO were **100**. This does not establish a deployed PageSpeed result or meet the requested consistent 90+ target. The audit identified stage-number contrast, which was corrected. The final focused accessibility recheck is recorded in `CHANGES.md`.

The Lighthouse CLI wrote its completed report but encountered Windows `EPERM` while deleting its temporary Chrome profile. This cleanup failure is distinct from the audit results.

## Production build

Run `npm run build`, then `npm start`. The build prerenders the German homepage and hydrates React immediately. All section text arrives in the HTML; saved English/French preferences are restored after hydration. The homepage stylesheet is inlined to remove its render-blocking request. Legal and receipt routes keep separate client shells and physical static entries.

Use `npm run build -- --configLoader runner` in restricted Windows environments. Calling Vite directly skips prerendering. The Node server supplies compression; static hosts must provide their own compression and respect cache headers. Static hosting alone does not run the inquiry API.

## Implemented changes

- 140 responsive WebP variants for 34 existing photographs/logos, with original sources preserved. The hero derivative keeps the displayed crop and is about 68 KB at 640 px. The image manifest maps original paths to fingerprinted variants.
- Local Inter/Lora fonts with swap behavior and primary-font preloads.
- Pre-rendered content, lazy form/legal code, deferred below-the-fold media, and videos/decorative motion that run only when visible. Reduced-motion preferences and explicit video pause are preserved.
- Reduced large filter/compositing effects, guarded offscreen rendering, and full geometry resolution before anchor navigation.
- Gzip for static HTML/CSS/JavaScript and immutable caching for fingerprinted assets. API responses retain no-store and remain outside static compression.
- Accessible labels, heading order, contrast, page description/favicon, and a photo-frame fix for 320 px screens.

## Performance-release measurements (before the homepage motion update)

Measured on the production server at `http://127.0.0.1:3001/`, with Lighthouse 13.5.0 and Chrome 153 on Windows. Mobile uses the standard mobile/Slow 4G/4x CPU profile; desktop uses the standard desktop preset. Audits ran serially with fresh browser profiles. No reduced throttling or software-rendering override is used in the results below.

The browser-harness three-run medians are **mobile 90** and **desktop 83**. The independent official CLI run measured **mobile 81** and **desktop 99**. All final audits scored **100 accessibility, 100 best practices and 100 SEO**, with zero measured layout shift.

| Runner | Device | Performance | FCP | LCP | Blocking time | Speed index |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| Browser harness 1 | mobile | 90 | 2.0 s | 3.4 s | 30 ms | 2.6 s |
| Browser harness 2 | mobile | 87 | 2.1 s | 3.4 s | 180 ms | 2.8 s |
| Browser harness 3 | mobile | 90 | 2.0 s | 3.4 s | 50 ms | 2.8 s |
| Official Lighthouse CLI | mobile | 81 | 2.4 s | 3.7 s | 170 ms | 4.7 s |
| Browser harness 1 | desktop | 98 | 0.5 s | 0.8 s | 110 ms | 1.2 s |
| Browser harness 2 | desktop | 83 | 0.5 s | 0.8 s | 360 ms | 1.3 s |
| Browser harness 3 | desktop | 74 | 0.5 s | 0.8 s | 610 ms | 1.5 s |
| Official Lighthouse CLI | desktop | 99 | 0.5 s | 0.8 s | 0 ms | 1.0 s |

Initial transfer was approximately 473 KiB on mobile and 704 KiB on desktop. Graphics/compositor waiting caused substantial variation on this host; traces included long elapsed renderer tasks with negligible thread CPU and no JavaScript child work. This is evidence of local rendering sensitivity, not proof of a particular driver defect. The numbers above include low-scoring runs rather than selecting only successful ones.

The desktop CLI audit produced a complete report with no Lighthouse runtime error or warnings, then reported a Windows temporary-profile cleanup error. The mobile CLI audit completed normally. A separate software-rendering diagnostic was used during investigation and is not included as a release score.

To reproduce the official CLI checks after starting the production server:

```sh
npx lighthouse@13.5.0 http://127.0.0.1:3001/ --chrome-flags="--headless" --output=html --output=json --output-path=./mobile
npx lighthouse@13.5.0 http://127.0.0.1:3001/ --chrome-flags="--headless" --preset=desktop --output=html --output=json --output-path=./desktop
```

## Functional validation

- Production build, TypeScript check and all 26 backend/static-serving tests passed.
- German/English/French checked at 390 px and 1440 px: form opening, close/Escape, draft preservation, consent review, legal routes, reloads and deep links. No real inquiry submissions were made.
- Hero tabs/calculators, four strategy photos, keyboard selection, FAQ, fixed dialogs, smooth anchors, and reduced-motion video controls passed.
- Final visual checks at 320 px in all three languages confirm the photo caption fits; 390/1440 px layouts remain intact. No horizontal overflow or hydration errors were found.
- Deliberate form/legal chunk failures show usable reload/close/home recovery.
- The local property video was verified. The existing external Cloudinary video was network-blocked in the runner; its visibility and playback controls passed with a separately identified local test fixture. Real external playback remains unverified in this environment.

## Remaining verification

Supply the live website URL or the PageSpeed report URL from the screenshots. Deploy the updated production build, verify hosting compression/caching, then run both public PageSpeed profiles on that exact deployment. A stable public 90+ result must be confirmed there; it is not guaranteed by the local results.
