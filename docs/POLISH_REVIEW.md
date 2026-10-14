# October 14 Polish Review

This is a fresh refinement pass for teacher review before the intended October 15–16 colleague handoff. It starts from current main `8c445776b47338bb028fe1e8e39d02fe9edab0ef`, after the catalog release and verified play-link update. It does not repeat PR #26 or incorporate the remaining draft branches.

## Findings And Changes

- The neutral ruler marker crossed whole-inch numerals. It now stops above the numeral row, retaining the same exact selection position and all graduations.
- Fixed overlay offsets left about one pixel between the lesson card and ruler dock at 1280 × 600. The existing scrollable card and camera controls now reserve a 12-pixel gap based on the rendered dock height, including wrapped guidance and narrower laptop viewports.
- Full Screen continued to say Enter Full Screen while active. Its visible and accessible action labels now follow the browser's full-screen state, including browser-initiated exit.
- The empty/completed Challenge chooser said a piece was being inspected or placed. Its ruler guidance now directs the student to choose a build.
- README and Current Review now distinguish the live catalog build from this review pass and label the older handoff as historical.

The live orbit buttons render correctly; apparent question marks in shell output were an encoding artifact and required no change. No arithmetic defect was found in the existing unit coverage. No model, lesson, question, target, save key, geometry, font, workshop design or feature was added or replaced.

## Source And Scope

Branch: `polish/teacher-handoff-20261014`. Work occurs in a separate clone on Abigail. The four discovered October 3/4/8 checkouts, old draft PRs, original ledgers, browser saves and historical artifacts remain untouched. The public `site/` and deployment inventory are not modified.

The same existing DM 1.3 G07, G08, G10–G13 and G16 practice remains, traced in [Curriculum Alignment](curriculum-alignment.md) and [Build Catalog Review](BUILD_CATALOG_REVIEW.md). Student action remains reading the requested measurement, selecting a visible graduation, committing Cut and inspecting the result. Evidence remains the committed endpoint and separate support/retry records. Fixed zero, guided readouts, hints and automatic construction remain scaffolds. No new instructional requirement or mastery claim is introduced.

## Review Build And Verification

The final identified artifact, portable ZIP, screenshot evidence and test outcomes are recorded in [Polish Evidence](../review-evidence/polish/README.md). Abigail uses an explicit local scope; it cannot mint a Jess_PC PR ordinal. Development version `0.1.0` and provisional codename `Predict Cut Inspect` follow the repository's current policy. The first exploratory artifact is preserved as build 001; it is explicitly marked as modified sources.

Run tests with Node 24. The existing `npm test` command covers exact arithmetic, visible grids, catalog persistence, connected model geometry, progression and build identity allocation. Browser checks use the existing Playwright/Chromium overrides `PLAYWRIGHT_MODULE` and `MT_BROWSER`; run `scripts/polish-check.cjs`, `scripts/catalog-browser-check.cjs`, `scripts/catalog-access-check.cjs` and `scripts/weekly-cleanup-check.cjs` against `latest-review.json`.

## Live Build And Limits

Live on October 14: `0.1.0_Predict-Cut-Inspect_local-abigail-catalog_build-005_20261003T225833Z_g6479bb949b7d_web` at [Play Measure Twice](https://abbyusesaithatcodes.github.io/MeasureTwice/). Its manifest and rendered page were inspected in a fresh browser profile without changing owner saves.

Review uses Chromium on Abigail with software WebGL and synthetic responses. Physical Chromebook/trackpad performance, a classroom pilot and teacher visual acceptance remain unverified. No merge, deployment or message to Eugene was performed. A local review URL is available only on Abigail; the public play link still serves the older identified build.
