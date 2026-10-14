# Workshop Polish Review Evidence

The current review candidate is **build 006**. On Abigail, open **http://127.0.0.1:18448** and refresh an already-open tab. The public game remains unchanged. This local origin preserves the existing public-game and older review-origin saves.

[Download The Portable Review ZIP](0.1.0_Predict-Cut-Inspect_local-abigail-polish-20261014_build-006_20261014T223550Z_g0a4ff39f45e7_web.zip). Extract it and run `Start Review.cmd`, or use Node 24 to run `node serve.mjs . 18448` inside its identified folder. Runtime dependencies are included and play requires no external requests.

- Full ID: `0.1.0_Predict-Cut-Inspect_local-abigail-polish-20261014_build-006_20261014T223550Z_g0a4ff39f45e7_web`
- Clean built source: `0a4ff39f45e7063ca71a72d71add03cff5546e37`
- Built UTC: `2026-10-14T22:35:50.364Z`
- Fingerprint: `c243313ba8a30bd2e1273ab37de7a03db3594c94fe4b3042d28caefa3d506e7b`
- ZIP SHA-256: `2b8379c26856d45cd95edda5269014cce78362a684736e48023729702d0a090a`

All 72 archive files and all 72 files served by the local preview match the immutable artifact byte for byte. Console, folder, manifest, report, compact header and export identities agree. Abigail uses its local scope and durable ledger; no Jess_PC PR ordinal is invented. Subsequent evidence/test-documentation commits do not relabel built runtime bytes. Earlier artifacts remain preserved; [Initial Polish Build 002](../polish/README.md) is historical. Build 005 preceded the final short-screen framing correction.

## Findings And Review Material

The [change rationale](../../docs/POLISH_REVIEW.md) covers the initial ruler/UI polish and the subsequently requested camera, room and focus work. The reproduced baseline used a fresh synthetic browser session against build 002, not the owner's saved browser profile.

- **Pale scene:** three light instances and exposure 1.12 remained unchanged. Fog moved from 35/70 to 24/48 at the 6-inch switch, while camera distance was 36.37. Removing indoor distance fog restores consistent contrast. [Baseline Diagnostic](baseline-build-002.json), [Before](before-inch-6.png), [After](workshop-inch-6-timber.png), [Zoomed-Out Before](before-inch-6-zoom-out.png), [Zoomed-Out After](workshop-inch-6-zoom-out.png).
- **Camera:** wall clearance now shortens only the effective radius. The preferred radius stays 30.55094 during the representative obstruction and recovers smoothly after it clears; manual zoom updates that preference. Reduced motion restores immediately. Clicking the saw/bench, tray or model/table synchronizes the focus dropdown. Deliberate drags, the blue cutting marker and ordinary piece highlighting retain priority.
- **Room:** [Warm Timber](workshop-inch-3-timber.png), [Log Cabin](workshop-inch-3-logs.png), [Front Wall](workshop-wall-front.png), and [Right Wall](workshop-wall-right.png). Existing detail continues above/below the window; log caps stay under the trim; floor detail is subdued. Instrument changes dispose replaced room geometry. Light instances and geometry/texture counts stay stable across repeated cycles.
- **Workspace framing:** [3-Inch Cutting Focus](workshop-inch-3-cut-focus.png), [Metre Cutting Focus](workshop-metre-cut-focus.png), [1366-Pixel Focus](workshop-focus-laptop-1366.png), and [1024-Pixel Focus](workshop-focus-laptop-1024.png). Short-screen Home View exposes the build table above the camera controls. Framing applies when choosing a preset, not as continuous snapback.
- **Layout and scale:** [Top-Down Plan And Front Elevation](../../docs/mockups/workshop-layout-proposal.png), [SVG](../../docs/mockups/workshop-layout-proposal.svg), and [Exact Mapping / Dimensions Proposal](../../docs/WORKSHOP_LAYOUT_PROPOSAL.md). These use the clarified saw-front-left, tray-center, examples-behind, model-front-right arrangement. Furniture relocation and proposed fixed physical dimensions remain unimplemented pending review. The current metre table growth is still visible and documented.

## Verification

- **42 unit tests passed**, including exact fractions, imperial/metric grids, connected model geometry, saved evidence, room coverage, preferred zoom recovery and concurrent identity reservation. The original house schedule check passed.
- **Four models, 37 distinct measurements and 114 parts passed**, including wrong cuts, held inspection, exact duplicate geometry, refresh during transitions, replay, badges and report/progress downloads.
- **All ten Learn stages passed**, including incorrect responses, retries, support marking, mode switching and retention of original attempts.
- **Seven instruments and 1,008 camera samples passed**, including endpoints, adjacent wrong cuts, exact physical ticks, visible-grid pointer/keyboard, magnification, zero recovery, marker ownership and emulated touch.
- **All 37 full-motion assembly cycles passed across 7,659 sampled frames.** Table/ruler visibility, stable bounds/camera and valid depth/frustum behavior remained intact. [Assembly Example](weekly-house-assembly-0.png), [Completed House](house-complete-1366.png).
- **Focused workshop tests passed:** repeated instrument/theme resource stability, fog/exposure/light checks, preferred/effective radius separation, monotonic recovery, zoom while blocked, reduced motion, focus transition cancellation, click-versus-drag, synchronized dropdown, marker/piece priority, and real click targets at 1366 x 768 and 1024 x 600.
- **Five polish viewports passed**, down to 900 x 600, with keyboard-accessible lesson scrolling, ruler numeral clearance, full-screen labels, audio-context mute gating, once-only commitments and correct chooser guidance. [Learn At 1280 x 600](polish-learn-1280x600.png).
- Final browser reports contain **no JavaScript errors or unexpected external requests**. Testing used Chromium/software WebGL and synthetic responses.

Reports: [Workshop And Focus](workshop-polish-verification.json), [UI Polish](polish-verification.json), [Catalog](catalog-verification.json), [Lessons And Access](catalog-access-verification.json), [Full Motion](weekly-cleanup-verification.json), [Unit Tests](unit-tests.txt), [House Schedule](house-check.txt), [Identity](identity-verification.json), [Archive](archive-verification.json), [Local Server And Public Identity](local-server-verification.json).

During verification, two harness issues were corrected: the polish suite received its own port to avoid the full-motion server, and viewport tests now await the browser's camera resize before using the real workspace chooser. The final identified reports above are successful reruns. The additional laptop test also caught and drove the actual Home View framing fix in build 006.

## Remaining Limits

The [public play link](https://abbyusesaithatcodes.github.io/MeasureTwice/) retains `0.1.0_Predict-Cut-Inspect_local-abigail-catalog_build-005_20261003T225833Z_g6479bb949b7d_web`, rechecked after the final preview switch. `site/`, deployment inventory and the manual-only workflow are unchanged. No merge, deployment or message/file to Eugene occurred.

The owner still needs to review the layout/physical-scale proposal and the visual handoff. Physical Chromebook/trackpad performance, projector legibility, screen-reader and speaker checks and classroom acceptance remain unverified. The existing metre workspace remains oversized until the approved layout/scale work is implemented; the drawing explains the cause and a fixed-dimension alternative. No new curriculum requirement or mastery claim is introduced.
