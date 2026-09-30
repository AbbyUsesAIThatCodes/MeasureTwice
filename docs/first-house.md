# First House Review Schedule

Related to issue #1. This is a review proposal built from the accepted September 28 workshop. The archive remains unchanged. Dimensions below describe a small open timber house, not construction instructions or a physical fabrication assessment.

## Exact Geometry

`data/house.json` is the single machine-readable schedule. Every endpoint is an integer number of sixteenths of an inch. The same wooden profile is used throughout: 0.11 in thick by 0.315 in wide, retaining the accepted mockup's 0.22 by 0.63 world-unit profile at two world units per inch. Stock and ruler span are 3 in. Decorative assembly uses overlapping centerline joints; no hidden shortening, stretching, bevel cutting, or kerf deduction is taught.

| Family | Length | Required Total | Copies After One Accepted Original |
| --- | --- | --- | --- |
| Uprights and Rafters | 1 1/4 in | 8 (4 uprights, 4 roof slopes) | 7 |
| Front and Back Rails | 2 in | 4 | 3 |
| Side Rails and Ridge | 1 in | 5 | 4 |

The footprint centerlines are 2 by 1 in. Walls rise 1 1/4 in; the ridge rises another 3/4 in to 2 in. Each roof slope has run 1 in and rise 3/4 in, so its length is exactly 1 1/4 in (12² + 16² = 20² in sixteenth units). Both gables, all perimeter rails, and the ridge are explicitly placed. All 17 pieces retain their measured length and profile through staging and rotation.

Three correct model measurements complete the house; rejected attempts preserve accepted families. Roof slopes intentionally reuse the upright family instead of asking for the same length again. Finer fractions, equivalence, origin, units, and explanations are separate checks, not invented extra house parts.

## Curriculum and Evidence

The house loop practices DM 1.3 G11/G13 with G07 units and G08 fit context. The student's committed endpoint is the evidence; fixed zero and post-cut diagnoses are support. Automatic copies and assembly do not prove comprehension or physical construction skill. The existing five MT-L lessons and six MT-C seed checks remain authoritative in [Curriculum Content](curriculum-content.md), including 7/16 in, 6/8 in equivalence, and 1 3/16 in mixed-number checks. No new course requirement or mastery score is introduced.

September 30 UTC source status: DM main is `279ddf7b047c58087632dbe3ce650f1cc156fc9f`; the accepted audit remains open draft PR #21 at unchanged head `1713a3bd537035f2ce09dfc7fe05ce6bf6b70cc3`. Original primary-source page verification and teacher pilot remain release gates. Do not claim they occurred in this recovery pass.

## Acceptance and Review

Run `node scripts/check-house.mjs`: every endpoint separation must equal its scheduled length, all stock limits hold, and totals are exactly 8 + 4 + 5. The integrated playable review must show the original plus 7, 3, and 4 copies respectively; no second successful cut for a completed family; no progress on rejection; and the complete recognizable frame from movable viewpoints.

Engine implementation continues under #2–#4, retained modes under #7, learning checks under #8. Those issues remain open until their full criteria are met. Review the preserved mockup with `node scripts/serve.mjs . 18443`, then open `/docs/mockups/predict-cut-inspect/index.html`. It is the archived interface study, not a new game build.
