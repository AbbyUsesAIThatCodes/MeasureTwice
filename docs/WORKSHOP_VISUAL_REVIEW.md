# Workshop Visual Repair

[Issue 19](https://github.com/AbbyUsesAIThatCodes/MeasureTwice/issues/19) fixes three teacher-reported visual defects. This changes decoration and camera clearance; all measurement values, stock profiles, 17 house placements, instructional records and gameplay transitions remain unchanged. The approved source archive is preserved.

## Identified Object

The screenshot's circled object was the static yellow saw grip, present before any measurement was committed. Its former constructor was `box(.18,.15,.82,yellow,SAW_X+.47,4.65,.6)` in `src/workshop.js`. It was disconnected from the saw housing. Two dark supports now visibly join the repositioned grip to that housing. No stock, offcut or inspection piece was removed to conceal the problem.

## Plant And Room

The plant uses seven thin, curved, pointed leaf meshes with folded faces, midribs and visible stems. The original rounded ellipsoid cluster has been replaced. The pot retains its location and color, with a rim and soil surface.

The rear wall moves from Z=-6 to Z=-16; the left wall moves from X=-12 to X=-22. Window and tool props stay attached to the rear wall. A 1.5-unit interior margin includes wall thickness, projecting props and near-plane clearance. `clearOrbitRadius` limits zoom only where the chosen direction approaches that margin. Every azimuth remains available. The requested 4–27 unit range and 0.2–1.5 radian polar range remain; open directions allow the full zoom-out, while wall-facing directions stop inside the room. Home and straight-on inspection framing are unchanged.

This is room clearance, not a general collision system for every small workshop object. Gameplay parts and their exact physical dimensions are unchanged.

## Local Verification

Run the model/build/house tests with the existing package test command. `tests/view-limits.test.mjs` additionally checks all azimuths at two-degree spacing, polar limits/intermediate elevation, extreme zoom requests, and home/inspection/comparison focus points.

After building an identified review artifact, run `node scripts/visual-check.cjs` with the existing Playwright installation available as `PLAYWRIGHT_MODULE`. It uses its own headless browser and localhost port 18453, closing both in `finally`. No installed user browser session is touched.

The browser checks actual grip/support/housing bounds; retained and offcut lengths; full wrong and correct cuts; held inspection; acknowledgement, visible duplication and assembly; reduced motion; skipping; mid-cut mode switching; reset; and seven retained Free Play pieces. Camera sweeps use the same orbit function as pointer/buttons at 24 azimuths, three elevations and both zoom extremes, at 1920×1080, 1366×768 and 1024×768, plus inspection and retained-piece focus. Near-plane clearance is compared with the actual room and mounted-prop bounds. Screenshots and `visual-verification.json` are saved under the exact artifact ID.

Use the draft PR's immutable ZIP and evidence for the actual tested source and results. Local development snapshots are distinct from the final clean PR artifact. No workflow dispatch, merge, settings change or deployment is part of this repair.

## Asset Provenance

`docs/ASSET_MANIFEST.json` retains the teacher-approved MeasureTwice archive provenance and Three.js attribution. The changed procedural components remain in `src/workshop.js`, with camera clearance in `src/view-limits.js`. The review handoff supplies exact source revision and file hashes for coordinated EdugamesGraphicsStorage work. This PR does not edit the central shared catalog, infer a new license, or copy private course material.
