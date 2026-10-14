# October 14 Polish Review

This is a fresh refinement pass for teacher review before the intended October 15–16 colleague handoff. It starts from current main `8c445776b47338bb028fe1e8e39d02fe9edab0ef`, after the catalog release and verified play-link update. It does not repeat PR #26 or incorporate the remaining draft branches.

## Findings And Changes

- The neutral ruler marker crossed whole-inch numerals. It now stops above the numeral row, retaining the same exact selection position and all graduations.
- Fixed overlay offsets left about one pixel between the lesson card and ruler dock at 1280 × 600. The existing scrollable card and camera controls now reserve a 12-pixel gap based on the rendered dock height, including wrapped guidance and narrower laptop viewports.
- Full Screen continued to say Enter Full Screen while active. Its visible and accessible action labels now follow the browser's full-screen state, including browser-initiated exit.
- The empty/completed Challenge chooser said a piece was being inspected or placed. Its ruler guidance now directs the student to choose a build.
- README and Current Review now distinguish the live catalog build from this review pass and label the older handoff as historical.

The live orbit buttons render correctly; apparent question marks in shell output were an encoding artifact and required no change. No arithmetic defect was found in the existing unit coverage. The initial polish artifact is preserved in [Build 002 Evidence](../review-evidence/polish/README.md).

## Owner-Requested Workshop Refinements

The owner reviewed build 002 and explicitly authorized these additional changes:

- Collision shortening now affects an effective orbit radius, while manual zoom maintains a separate preferred radius. Clearing a wall eases back toward the current preference; reduced motion restores immediately. Cutting, focus changes and manual orbit cancel competing camera motion.
- Repeated instrument switches kept exactly three light instances and exposure 1.12. The pale 6-inch scene came from fog changing from near/far 35/70 to 24/48 while the camera was about 36.37 units away. The indoor scene now has no distance fog; existing daylight, light intensity and tone mapping are preserved.
- All four room walls are present. Both existing themes continue above and below the window; log ends are buried under its trim. A subdued procedural plank floor uses constant-size texture repeats. Replaced wall geometry is disposed on instrument changes; repeated cycles stabilize at the same geometry/texture counts.
- An explicit instrument/workspace switch frames the cutting bench and actual stock span. The user retains orbit/zoom afterward. Saw/bench, green tray, build table and assembled model clicks focus their existing area, with a synchronized dropdown and brief hover label. This is the owner's explicit narrow exception to the original no-new-features scope. A cumulative six-pixel drag threshold distinguishes orbit from click; the blue cutting pointer and ordinary piece highlighting keep priority. Transitions respect reduced motion and can be interrupted by orbit.

The blue sphere is the existing cutting pointer, offset just in front of the plank at the saw line. Its geometry and exact graduation input are preserved. It was not stray scenery or a second measurement marker.

Furniture placement, stock profiles, measurement conversion, model dimensions, content and saved-history format remain unchanged. The current long-instrument layout still expands with stock length. The owner requested a plan before changing that arrangement: [Layout And Scale Proposal](WORKSHOP_LAYOUT_PROPOSAL.md) contains the clarified saw-front-left / tray-center / examples-behind / model-front-right plan, front elevation, exact current mapping and a fixed-dimension proposal. It quantifies why a wide view cannot resolve sixteenths and retains exact keyboard/ruler controls. The proposed physical dimensions and furniture remain unapproved and unimplemented.

The final laptop check also found that the Home View's build table sat behind the camera controls at 1024 x 600. Its short-screen overview framing now places the work surfaces above those overlays when the preset is chosen. Resize does not continually recenter a user's camera. The pointer and all three focus targets are verified at 1366 x 768 and 1024 x 600.

## Source And Scope

Branch: `polish/teacher-handoff-20261014`. Work occurs in a separate clone on Abigail. The four discovered October 3/4/8 checkouts, old draft PRs, original ledgers, browser saves and historical artifacts remain untouched. The public `site/` and deployment inventory are not modified.

The same existing DM 1.3 G07, G08, G10–G13 and G16 practice remains, traced in [Curriculum Alignment](curriculum-alignment.md) and [Build Catalog Review](BUILD_CATALOG_REVIEW.md). Student action remains reading the requested measurement, selecting a visible graduation, committing Cut and inspecting the result. Evidence remains the committed endpoint and separate support/retry records. Fixed zero, guided readouts, hints and automatic construction remain scaffolds. No new instructional requirement or mastery claim is introduced.

## Review Build And Verification

The current identified artifact, portable ZIP, screenshots and test outcomes are recorded in [Workshop Evidence](../review-evidence/workshop-polish/README.md). Abigail uses an explicit local scope; it cannot mint a Jess_PC PR ordinal. Development version `0.1.0` and provisional codename `Predict Cut Inspect` follow the repository's current policy. Earlier artifacts remain preserved: initial polish 002, exploratory modified-source builds 001/003/004, and build 005 before the short-screen framing correction. Build 006 is the corrected review candidate.

Run tests with Node 24. The existing `npm test` command covers exact arithmetic, visible grids, catalog persistence, connected model geometry, progression and build identity allocation, plus room coverage and camera recovery. Browser checks use the existing Playwright/Chromium overrides `PLAYWRIGHT_MODULE` and `MT_BROWSER`; run `scripts/workshop-polish-check.cjs`, `scripts/polish-check.cjs`, `scripts/catalog-browser-check.cjs`, `scripts/catalog-access-check.cjs` and `scripts/weekly-cleanup-check.cjs` against `latest-review.json`.

## Live Build And Limits

Live on October 14: `0.1.0_Predict-Cut-Inspect_local-abigail-catalog_build-005_20261003T225833Z_g6479bb949b7d_web` at [Play Measure Twice](https://abbyusesaithatcodes.github.io/MeasureTwice/). Its manifest and rendered page were inspected in a fresh browser profile without changing owner saves.

Review uses Chromium on Abigail with software WebGL and synthetic responses. Physical Chromebook/trackpad performance, a classroom pilot and teacher visual acceptance remain unverified. No merge, deployment or message to Eugene was performed. A local review URL is available only on Abigail; the public play link still serves the older identified build.
