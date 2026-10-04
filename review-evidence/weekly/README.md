# Corrected Weekly Measure Twice Review

**Ready for owner review and the authorized worksheet draft.** No main merge or deployment occurred. Draft PR #33 remains stacked on preserved PR #32.

## Open The Corrected Build

**http://127.0.0.1:18444** is the primary review address on Abigail. It retains the existing browser origin so prior saves remain available. A fresh/empty/invalid-save visit opens Free Play; a valid active saved build resumes Challenge without resetting its history. The unchanged build 003 is also available at http://127.0.0.1:18446 and remains archived in `../catalog/`.

The portable [0.1.0_Predict-Cut-Inspect_local-abigail-catalog_build-005_20261003T225833Z_g6479bb949b7d_web.zip](0.1.0_Predict-Cut-Inspect_local-abigail-catalog_build-005_20261003T225833Z_g6479bb949b7d_web.zip) extracts to an immutable identified folder. Its `Start Review.cmd` uses port 18445 as an alternate local review address. Browser storage belongs to an origin, so a different port/device has separate progress. To keep an existing 18444 save, use the primary address above or serve the extracted artifact on 18444 after stopping its prior server. No saved data was erased or converted by this update.

- Build: `0.1.0_Predict-Cut-Inspect_local-abigail-catalog_build-005_20261003T225833Z_g6479bb949b7d_web`
- Clean source: `6479bb949b7d19e4ae0e9b79b4edf67de7fea007`
- Built UTC: `2026-10-03T22:58:33.060Z`
- Fingerprint: `be3d91c54dfdda5331b0318c5674f8735b923d68b003658f492aaf460cb86e81`
- ZIP SHA-256: `5b15518c7d68483d6070ba0de1e1aca833c60ccfcc0118360d16b3a8614f6c12`

The ZIP was verified byte-for-byte against the served build. Later evidence/documentation commits do not change its source identity.

## Three Fixes

1. Incompatible ruler subdivision and Free Play comparison choices are hidden, retain native disabled semantics, and have visible accessible explanations linked by `aria-describedby`. Required graduations and fixed/locked states are explained. The compact note uses the existing instruction area, preserving blue-pointer access and ruler space.
2. The side build table stays visible throughout duplication and assembly. The exact cause in build 003 was an explicit `comparisonRack.visible=false` transition. Two real Tree additions reproduced 152 hidden frames each at a fixed camera. The toggle was removed; no camera/frustum workaround was substituted.
3. Fresh and empty-save sessions start in Free Play. Valid active catalog saves keep the existing resume behavior, badges and attempts; invalid data is preserved under a recovery key. There was no documented deep-link startup interface to preserve or change.

## Verification

- **40 passing unit tests** covering the retained math, grids, geometry, history and persistence rules.
- **All 37 additions across House, Plane, Chair and Tree**, totaling 114 pieces and **7661 sampled real animation frames**. Every frame retained table/ancestor visibility; duplication/assembly retained stable table bounds and camera, frustum intersection and enabled depth testing/writing. The ruler remained visible. Screenshots include early and late additions for every model.
- **All ten Learn stages**, wrong-cut/wrong-choice retries, unchanged originals, guided/practice differences and progression.
- **Seven instruments, 1008 camera-clearance samples**, exact endpoints/physical geometry, comparison copies and evidence downloads.
- Mouse ruler/blue-pointer drag, camera gesture ownership, keyboard, emulated touch, reduced motion, vocabulary focus, fixed-target scale compatibility and imperial/metric comparison filtering passed.
- Fresh/empty/invalid startup and saved held/replay/badge resume passed. The exact build 003 exported recipes and attempts resumed unchanged on the corrected primary origin.
- **47 current screenshots** cover 1366x768, 1280x600 and 1024x768; the two older reproduction screenshots are explicitly separated in `baseline-003/`.

Reports: `weekly-cleanup-verification.json`, `catalog-verification.json`, `catalog-access-verification.json`, `local-server-verification.json`, `verification-summary.json`, and `unit-tests.txt`. QA records are synthetic. Chromium 153.0.8010.12 used software rendering; touch is emulated. Physical Chromebook/classroom testing is not claimed.

## Worksheet Handoff And Deferred Work

[Worksheet Authoring Basis](../../docs/WORKSHEET_AUTHORING_BASIS.md) contains exact final controls, startup/resume behavior, measuring/inspection workflow, five lesson answer keys, DM 1.3 G07/G08/G10-G13/G16 evidence limits, and all 37 part lengths/counts. [Machine-readable data](../../docs/WORKSHEET_AUTHORING_DATA.json) carries the same teacher key. EasyAsPie precedes equivalent-fraction work. No AI-proof claim is supported. The owner authorized the draft against this stable corrected build; another task owns worksheet production.

[Deferred Cabin Polish](../../docs/DEFERRED_CABIN_POLISH.md) preserves the later request for four connected wide cylindrical toy-log walls, an arched timber roof, wood floor, forest window and eventual default cabin look. None of that scenery was implemented here.

No known mechanics blocker remains. Teacher review and physical-device/classroom verification remain separate from the completed automated checks. Public main remains `ff5fec1144ca57448baad9f5205809bae15f0333`; catalog 003's ZIP hash remains `3db23a7c2c89e1cc2293aeedac993c2847abdd09b73f30d76ddf141fc1f5f31d`. No other game was changed.
