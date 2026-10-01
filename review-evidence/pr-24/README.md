# Current PR24 Review

[Build 002: Automatic Chair, Plane, and House Progression](./build-002/README.md) is the current integrated review. The build001 snapshot below remains preserved as historical evidence of the earlier exercise-picker version.

---

# PR 24 Review

[Download the Playable ZIP](./0.1.0_Predict-Cut-Inspect_pr-24_build-001_20260930T231202Z_g50ff58b6f73f_web.zip?raw=true) · [Screenshot 1](./0.1.0_Predict-Cut-Inspect_pr-24_build-001_20260930T231202Z_g50ff58b6f73f_web_Review-1.png) · [Screenshot 2](./0.1.0_Predict-Cut-Inspect_pr-24_build-001_20260930T231202Z_g50ff58b6f73f_web_Review-2.png)

Build: `0.1.0_Predict-Cut-Inspect_pr-24_build-001_20260930T231202Z_g50ff58b6f73f_web`

Clean built source: `50ff58b6f73f0389a169bdfd04852f451b4cfe0a`; UTC `2026-09-30T23:12:02.479Z`. This later evidence commit does not change or relabel the build.

## Quick Test

Extract all files. Run Start PR24 Review.cmd with Node installed, or run node serve.mjs . 18453 inside the named build folder. Open http://127.0.0.1:18453. Close only this review server before opening another snapshot on this port.
Inspect the hollow cup and seated pencils, taller bench and clear receiving tray. Cut 1 1/8 for a wrong inspection, then 1 1/4, 2 and 1 inch to assemble the house.
Challenge Progress offers all 30 exercises. Every automatic component and the house must be correct before Download Completion Report is enabled. Retry preserves original answers; Learn/hints/feedback mark support. The text report is saved locally for manual Classroom attachment.
The full-ID build folder is preserved byte-for-byte; this launcher is outside it. No merge, deployment, account or automatic upload.

## Validation

22 unit tests and exact house geometry pass. Full correct/wrong cuts, held inspection, original/offcut lengths, visible duplication, 17-piece assembly, skip/reduced motion, reset, retained pieces and mode switching pass in Chrome WebGL. The camera sweep checks 720 positions over three viewports plus inspection/piece focus. Pencil wall/spacing, grounded bench legs and tray clearances pass. Seven assessment-integrity regressions pass. All 30 exercises were completed through the actual controls, including wrong concept/cut retries, progress across Learn, copy counts, gated completion and the actual downloaded teacher report. All generated student observations in test evidence are synthetic. No page errors or failed/external runtime requests.

[visual-verification.json](./visual-verification.json) · [assessment-verification.json](./assessment-verification.json) · [challenge-verification.json](./challenge-verification.json) · [Artifact Hashes](./artifact-manifest.json) · [Graphics Handoff](./asset-handoff.json)

The unchanged accepted reference and all older review artifacts are preserved. No merge, settings change, hosted Actions dispatch or deployment was performed.

| File | Bytes | SHA-256 |
| --- | ---: | --- |
| `0.1.0_Predict-Cut-Inspect_pr-24_build-001_20260930T231202Z_g50ff58b6f73f_web.zip` | 533558 | `0fb8e0a84da7bd9276c07b09cb940665a2107394b344b6d8c1b12c0ca5e1c51d` |
| `0.1.0_Predict-Cut-Inspect_pr-24_build-001_20260930T231202Z_g50ff58b6f73f_web_Review-1.png` | 208766 | `c661faea1849d31dc9857aeba2f6cee9dbdaaf22b07f47f3e66461422b9afed6` |
| `0.1.0_Predict-Cut-Inspect_pr-24_build-001_20260930T231202Z_g50ff58b6f73f_web_Review-2.png` | 179903 | `9bce0a787cf37a1c2e2ef773cdf4df5b064260b6db55cda35acec819b6a70be8` |

[Earlier Gameplay and Input Regression Results](./review-verification.json). The progression screenshot intentionally shows 29/30 with download disabled; the completed-workshop screenshot shows 30/30. The actual enabled-download flow and saved file were tested after the last exercise.
