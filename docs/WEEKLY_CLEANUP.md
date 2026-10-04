# Final Weekly UI Cleanup

The owner reviewed catalog build 003 and requested three essential fixes before the now-authorized worksheet draft. The preserved artifact is `0.1.0_Predict-Cut-Inspect_local-abigail-catalog_build-003_20261003T220212Z_gd077179401f5_web`, source `d077179401f5c5991aa47df5813d1ee670cd1861`. Its ZIP and evidence remain unchanged in `review-evidence/catalog/`. New review builds keep the same explicit local scope and consume a new ordinal; the final primary review keeps port 18444 for existing browser saves. Build 003 remains available unchanged on archive port 18446; the portable corrected launcher uses alternate port 18445.

## Required Behavior

Scale and Free Play comparison menus hide choices that cannot represent the exact current target/grid. Those options also retain native disabled and `aria-disabled` semantics. A visible explanation names the required scale, or the reason the scale is fixed/locked, and is linked using `aria-describedby`. The target and available input grid remain exact; unavailable choices do not silently accept a different value.

Fresh sessions, empty catalog saves and safely recovered invalid saves open Free Play. A validated active catalog run resumes the existing Challenge chooser/held inspection behavior, preserving partial runs, completed badges, replay history and original attempts. Free Play/Learn sessions still have their existing page-only lifetime. No URL/deep-link startup API was present or documented, so none is removed or added.

The build table remains visible while parts duplicate and assemble. In build 003 the code explicitly set `comparisonRack.visible=false` at the accepted-project transition and restored it in `rebuildParts`. Two actual Tree additions reproduced 152 hidden animation frames each, at a fixed camera position, across duplication and assembly. Removing that toggle fixes the cause. The corrected browser regression samples all 37 model additions, checking visibility through ancestors, stable bounds/camera, frustum intersection, depth-test/write state, and the ruler.

## Boundaries

The owner authorized the worksheet **draft** after these stable corrections; it is no longer blocked on decorative polish. [Worksheet Authoring Basis](WORKSHEET_AUTHORING_BASIS.md) supplies the exact controls, workflow, goals and key. Physical Chromebook/classroom verification and teacher acceptance remain distinct from automated review. No AI-proof assessment claim is supported.

[Deferred Cabin Polish](DEFERRED_CABIN_POLISH.md) preserves the later requested four cylindrical-log walls, arched timber roof, wood floor, forest window and eventual cabin default. This cleanup does not implement that scenery.

No main merge, deployment or other-game change is included. Exact final artifact identity and verification are recorded in `review-evidence/weekly/README.md` with the final build 005 results; evidence-only commits do not relabel a built artifact.
