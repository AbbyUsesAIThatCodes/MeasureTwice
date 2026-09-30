# PR 20 Workshop Visual Review

[Download the Playable ZIP](./0.1.0_Predict-Cut-Inspect_pr-20_build-001_20260930T222545Z_g06cbb0da92c3_web.zip?raw=true) · [Workshop Screenshot](./0.1.0_Predict-Cut-Inspect_pr-20_build-001_20260930T222545Z_g06cbb0da92c3_web_Workshop.png) · [Rear View](./0.1.0_Predict-Cut-Inspect_pr-20_build-001_20260930T222545Z_g06cbb0da92c3_web_Rear-View.png)

Build: `0.1.0_Predict-Cut-Inspect_pr-20_build-001_20260930T222545Z_g06cbb0da92c3_web`

Clean built source: `06cbb0da92c3103623739b1eb128b6c223caf6f8`; UTC `2026-09-30T22:25:45.171Z`. This later evidence commit preserves the built artifact without changing or relabeling it.

## Quick Test

Extract the ZIP and run **Start PR20 Review.cmd** with Node installed. Open `http://127.0.0.1:18453/`. The original per-build launcher is also preserved inside the named build folder. Check the connected saw grip and pointed leaves; orbit all the way around, zoom toward rear/left walls, and return with Home View. Cut 1 1/8 in for a held wrong inspection, then accept 1 1/4, 2 and 1 in to assemble the house.

## Evidence

17 unit tests and exact-house geometry passed. The exact artifact passed real Chrome WebGL testing of full/skipped/reduced cut paths, correct and incorrect inspection, original/offcut lengths, duplication, 17-piece assembly, mode switching, reset and retained Free Play pieces. 720 camera positions across three laptop viewports plus inspection and retained-piece focus cleared actual walls/props and near-plane bounds. The minimum measured clearance was 0.3772 world units. Seven assessment-integrity regressions also pass. No page errors or external/failed runtime requests.

[Visual Results](./visual-verification.json) · [Assessment Results](./assessment-verification.json) · [Artifact Hashes](./artifact-manifest.json) · [Graphics Provenance Handoff](./asset-handoff.json) · [Implementation Notes](../../docs/WORKSHOP_VISUAL_REVIEW.md)

All 360 degrees remain available. Zoom-out stops sooner toward walls; open directions retain the full range. This is room clearance, not a general collision system for every small prop. No gameplay/curriculum/measurement or workflow changes. The approved archive and older review builds are preserved. No merge, settings change, hosted run or deployment was performed.

| File | Bytes | SHA-256 |
| --- | ---: | --- |
| `0.1.0_Predict-Cut-Inspect_pr-20_build-001_20260930T222545Z_g06cbb0da92c3_web.zip` | 521008 | `ade44fd69b36e08f13b38bbf93a9cbf7b68b1f29b4a3535b10e6ffe968c1dfe9` |
| `0.1.0_Predict-Cut-Inspect_pr-20_build-001_20260930T222545Z_g06cbb0da92c3_web_Workshop.png` | 227865 | `ee9b4c38e235c1d655b7e44606058b01db8759c8485b34630975e9d1b79d2d01` |
| `0.1.0_Predict-Cut-Inspect_pr-20_build-001_20260930T222545Z_g06cbb0da92c3_web_Rear-View.png` | 207470 | `0ded0a78dbc6181a1e96bd9f28b6b826c85c2f87defdc1c151c5a62ffc0202bf` |
