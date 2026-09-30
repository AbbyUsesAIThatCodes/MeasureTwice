# Workshop Implementation Review

## Scope

The first application retains the accepted procedural Three.js 0.180.0 workshop, saw, wood, inspection composition, and camera sequence. The archive is unchanged. Exact lengths are integer sixteenths; one world unit is half an inch. The house schedule has 17 pieces across 3 families. Every valid commitment cuts; feedback first appears after camera travel and remains until acknowledgement. Free Play retains kept pieces and offers equal copies. Each mode retains its own in-memory session and pending inspection; restarting only resets that mode.

## Run a Review

Install the pinned dependency with `pnpm install --frozen-lockfile --ignore-scripts`. Run `node scripts/build.mjs local-your-session`. The console prints the unique output directory. From that directory run `node serve.mjs . 8134`, then open `http://127.0.0.1:8134`. The included `Start Review.cmd` does this on Windows with Node installed. Runtime needs no network. No workflow, production deployment, or Pages change is added.

Use the pointer or ruler arrow keys to select. Enter or Cut commits. Drag the workshop or use camera controls to orbit; wheel or +/- zooms. Home View restores the measuring/inspection view. Geometry and text supplement feedback colors. Highlight Wood identifies an object with an emissive shader and a textual selection cue. Magnify Ruler keeps the same exact target-independent selection bands.

## Mechanics Verification

The September 30 local Chrome WebGL run verified full saw/camera travel, held short inspection, long inspection, correct retries, the complete 17-piece house, once-only commitments/acknowledgements, Free Play retention/duplication, mode switching during a cut, camera controls, keyboard ruler, offline runtime and visible manifest identity. No page errors or external requests occurred. Unit checks cover every selectable pointer position across multiple widths, exact fractions, failed/successful attempts, and house lengths/counts. See the task's evidence and final integrated build report for the tested identity; do not equate a later source edit with the earlier tested artifact.

## Review Limits

This is a development review, not a classroom release. The subsequent stacked learning change supplies all five lessons and six checks. Primary-source page verification, physical-ruler transfer, teacher pilot, alternate models, and sparse-ruler transfer remain open issues. Browser reload clears in-memory sessions; mode switching does not. The provisional review codename derives from the accepted Predict Cut Inspect study and awaits teacher acceptance as a release name.

No new reusable bitmap or shared catalog mutation was made. [Asset Manifest](ASSET_MANIFEST.json) records the adapted procedural workshop and new exact house schedule for parent consolidation.
