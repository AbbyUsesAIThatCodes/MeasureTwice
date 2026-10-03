# Workshop Implementation Review

Historical review snapshot. The October 3 reconciled behavior and current artifact are described in [Current Review](CURRENT_REVIEW.md). Preserve these earlier observations and identities; their merge order and superseded geometry/evidence requirements are not current instructions.


## Scope

The first application retains the accepted procedural Three.js 0.180.0 workshop, saw, wood, inspection composition, and camera sequence. The archive is unchanged. Exact lengths are integer sixteenths; one world unit is half an inch. The house schedule has 17 pieces across 3 families. Every valid commitment cuts; feedback first appears after camera travel and remains until acknowledgement. Free Play retains kept pieces and offers equal copies. Each mode retains its own in-memory session and pending inspection; restarting only resets that mode.

## Run a Review

Install the pinned dependency with `pnpm install --frozen-lockfile --ignore-scripts`. Run `node scripts/build.mjs local-your-session`. The console prints the unique output directory. From that directory run `node serve.mjs . 18443`, then open `http://127.0.0.1:18443`. The included `Start Review.cmd` does this on Windows with Node installed. Runtime needs no network. No workflow, production deployment, or Pages change is added.

Use the pointer or ruler arrow keys to select. Enter or Cut commits. Drag the workshop or use camera controls to orbit; wheel or +/- zooms. Home View restores the measuring/inspection view. Geometry and text supplement feedback colors. Highlight Wood identifies an object with an emissive shader and a textual selection cue. Magnify Ruler keeps the same exact target-independent selection bands.

## Mechanics Verification

Reproduce model checks with `node --test --test-isolation=none tests/*.test.mjs` and `node scripts/check-house.mjs`. `node scripts/browser-check.cjs --learning` checks the latest artifact in a new headless Chrome profile on loopback port 18444 and writes evidence under `test-results/<full-build-id>/`. It requires Playwright (tested 1.62.1); set `PLAYWRIGHT_MODULE` to an existing local installation and optionally `MT_BROWSER` to another Chrome/Chromium executable. It never attaches to or terminates the user's browser. Manual reviews use port 18443.

The learning stack also fixes the independent static review findings: comparison spacing is the actual 0.63 wood width plus a 0.09 gap; feedback-informed Challenge retries are assisted while their original first answers remain unchanged; magnified ruler keyboard movement scrolls the marker and nearby graduations into view without exposing a Challenge numerical readout. Browser checks include seven differently sized pieces and magnified End/Home/arrow navigation.

The September 30 local Chrome WebGL run verified full saw/camera travel, held short inspection, long inspection, correct retries, the complete 17-piece house, once-only commitments/acknowledgements, Free Play retention/duplication, mode switching during a cut, camera controls, keyboard ruler, offline runtime and visible manifest identity. No page errors or external requests occurred. Unit checks cover every selectable pointer position across multiple widths, exact fractions, failed/successful attempts, and house lengths/counts. See the task's evidence and final integrated build report for the tested identity; do not equate a later source edit with the earlier tested artifact.

## Assessment And Source Follow-Up

C03 keeps its authored 6/8 prompt independently of the normalized 12-sixteenth arithmetic; 3/4 is shown as a comparison candidate and in post-cut feedback, never as the solved pre-cut target. Activity-level exposure tracks visible guidance, hints, worked examples and inspection, including house contexts. Objective and explanation components inherit support. Navigation and Restart preserve that history and original responses; restarting resets construction. `node scripts/assessment-check.cjs` uses task-owned port 18446 to regress these paths and the untouched C03 screen.

[Selected Primary-Source Verification](PRIMARY_SOURCE_VERIFICATION.md) records the completed page checks for the seven targets. The formal source edition remains unresolved, but no selected-goal claim depends on it.

## Review Limits

This is a development review, not a classroom release. The integrated learning layer supplies all five lesson choices and six checks with source mappings, before-feedback concept commitments, hints, retained first answers, and teacher-review explanations. Detailed worked-animation polish, fresh independent variants after exposure, physical-ruler transfer, teacher pilot, alternate models, and sparse-ruler transfer remain open issues. Browser reload clears in-memory sessions; mode switching does not. The provisional review codename derives from the accepted Predict Cut Inspect study and awaits teacher acceptance as a release name.

No new reusable bitmap or shared catalog mutation was made. [Asset Manifest](ASSET_MANIFEST.json) records the adapted procedural workshop and new exact house schedule for parent consolidation.
