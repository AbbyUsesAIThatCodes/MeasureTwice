# October 14 Measure Twice Polish Evidence

Historical initial-pass artifact, build 002. The shared Abigail preview URL below now serves the newer [Workshop Review](../workshop-polish/README.md). Use this preserved ZIP to reopen the original pass. Its identifiers, tests and screenshots remain unchanged.

Ready for owner review. This is a small refinement of the existing game, with no redesign, new feature, merge or deployment. The changes and their rationale are in [Polish Review](../../docs/POLISH_REVIEW.md).

## Open The Review Build

On Abigail, open **http://127.0.0.1:18448**. This separate localhost origin preserves existing review and public-game saves; it starts with its own browser progress.

[Download The Portable Review ZIP](0.1.0_Predict-Cut-Inspect_local-abigail-polish-20261014_build-002_20261014T215301Z_gbe01344fa2a5_web.zip). Extract it, then run `Start Review.cmd`, or use Node 24 to run `node serve.mjs . 18448` inside its identified folder. The dependency is included; runtime play needs no external requests. The ZIP is a review artifact, not a published website.

- Full ID: `0.1.0_Predict-Cut-Inspect_local-abigail-polish-20261014_build-002_20261014T215301Z_gbe01344fa2a5_web`
- Clean built source: `be01344fa2a5019a0221fe9dc8f1cc775868fa46`
- Built UTC: `2026-10-14T21:53:01.996Z`
- Source fingerprint: `a8170a41793e0277b7e4c4cb46fc6b19fdba88a1b1dddde4fab5c3692b44e3f1`
- ZIP SHA-256: `f1007a59575189ef95dc27262f1c5d05cb7f08b99034a16d3470511f330042f6`

The ZIP's 68 files were extracted and compared byte for byte with the tested artifact. The running review server's HTML, CSS, app code, vendor files and metadata also match. Build 001 and build 002 have distinct reserved identities; reopening and archiving build 002 do not change it. Console, directory, manifest, report, compact header and export identities agree. Subsequent test/evidence commits do not relabel the built runtime. The catalog test's historical `/2026/` assertion was narrowed to actual timestamp formats because the new local scope legitimately includes a date.

## Verification

- **40 unit tests passed**, including exact fractions, visible imperial/metric grids, once-only commitments, model geometry, progression, persistence and eight concurrent identity reservations. The original house schedule check also passed.
- **Four models completed: 37 distinct measurements, 114 parts.** Real ruler pointer drag and keyboard input, wrong-cut recovery, refresh during cutting/placement, replay badges, exact part lengths, supporting questions and downloaded report/progress JSON passed.
- **All ten Learn stages passed**, including wrong-cut/wrong-choice retries, guided versus practice support, held inspection, mode switching and retained original responses.
- **Seven instruments and 1,008 camera samples passed**, with endpoints, adjacent incorrect cuts, physical geometry, duplicates, magnification, zero recovery, blue-pointer gesture ownership and emulated touch.
- **All 37 full-motion assembly cycles passed across 7,659 sampled frames.** The table remained visible, with stable bounds/camera and valid depth/frustum behavior; the Challenge ruler stayed visible.
- **Five viewports passed:** 1366 × 768, 1280 × 600, 1024 × 768, 1024 × 600 and 900 × 600. The existing lesson card stays scrollable and keyboard-accessible, with at least 12 pixels between it and the ruler; camera controls have the same clearance. Whole-inch numerals remain unobscured. Full-screen labels follow entry and both button/browser exit. Empty-build guidance describes the actual state.
- Fresh/empty/invalid saves, held attempts, badges, replay and support exposure passed. No existing owner browser profile was used. Browser suites reported no JavaScript errors or unexpected external requests.

Machine-readable reports: [Focused Polish](polish-verification.json), [Catalog](catalog-verification.json), [Lessons And Access](catalog-access-verification.json), [Full Motion](weekly-cleanup-verification.json), [Unit Tests](unit-tests.txt), [Identity](identity-verification.json), [Archive](archive-verification.json), and [Local Server](local-server-verification.json).

## Visual Review

- [Live Before: Free Play](live-before-free-1366.png) → [Review: Free Play](polish-free-1366x768.png)
- [Learn At 1280 × 600](polish-learn-1280x600.png)
- [Challenge At 1024 × 600](polish-challenge-1024x600.png)
- [Completed House](house-complete-1366.png) and [Completed Catalog](catalog-completed-1024.png)
- [All Lessons Complete](learn-complete.png) and [Emulated Touch](touch-tree-1280.png)

## Public Build And Remaining Limits

The [public game](https://abbyusesaithatcodes.github.io/MeasureTwice/) still serves catalog build 005 from October 3, verified by its live manifest on October 14. [Live Inspection](live-build-verification.json) records that separate identity. This branch leaves `site/`, `deployment/` and the manual-only workflow unchanged.

Validation used Chromium on Abigail with software WebGL and synthetic responses. Physical Chromebook, trackpad, projector, screen-reader and speaker testing and classroom/teacher acceptance remain separate. Mute is checked through actual audio-context creation, not a speaker listening test. No message or file was sent to Eugene. The intended October 15–16 handoff still needs owner review and approval of any deployment or delivery.
