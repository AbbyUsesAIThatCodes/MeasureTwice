# Chair, Plane, and House Challenge

The teacher approved this revision of issue #22 / PR #24 on September 30, 2026. Challenge follows the same automatic loop for each part: **measure → Cut → held inspection → confirm → staging and copies → place → next part**. Build Progress is status and completed-step review; future exercises are not a picker. There is no required menu visit between parts. Completed models remain visible until the first accepted part of the next build is placed.

These are original MeasureTwice wooden models, with no Tinkercad adaptation claim. The tree idea is outside this revision. The unchanged approved reference and every older identified review build remain historical evidence.

## Construction Schedule

| Build | Assessed Exercises | Measured Length Families | Exact Wooden Pieces |
| --- | ---: | ---: | ---: |
| Chair | 11 | 10 | 24 |
| Plane | 10 | 10 | 18 |
| House Exterior | 9 | 11 | 62 |

Thirty stable exercise IDs map to the constructions below. The house also retains the two original 2-inch and 1-inch frame-family cuts. Its 1 1/4-inch family is measured in C05, which now couples the original fit judgment to a needed-length cut. The first unit-order check is a held planning confirmation before wood is cut. Thus there are 32 ordered steps: one planning check and 31 cut families. No model repeats a successful measurement merely to obtain an equal piece.

| Step | Build | Stable ID | Model Part | Target (Sixteenths of an Inch) | Pieces |
| ---: | --- | --- | --- | ---: | ---: |
| 1 | chair | MT-C06 | Read the Chair Order | Planning | 0 |
| 2 | chair | MT-C13 | Front Legs | 17 | 2 |
| 3 | chair | MT-C15 | Back Posts | 35 | 2 |
| 4 | chair | MT-C04 | Seat Rails and Backrest Rails | 19 | 5 |
| 5 | chair | MT-C29 | Three Seat Boards | 22 | 3 |
| 6 | chair | MT-C03 | Backrest Slats | 12 | 3 |
| 7 | chair | MT-C01 | Arm Supports | 6 | 2 |
| 8 | chair | MT-C07 | Armrests | 8 | 2 |
| 9 | chair | MT-C08 | Armrest Tips | 4 | 2 |
| 10 | chair | MT-C02 | Backrest Crown | 7 | 1 |
| 11 | chair | MT-C10 | Backrest Joint Caps | 1 | 2 |
| 12 | plane | MT-C28 | Lengthwise Display Foot | 37 | 1 |
| 13 | plane | MT-C18 | Crosswise Display Foot | 48 | 1 |
| 14 | plane | MT-C12 | Landing Struts | 15 | 2 |
| 15 | plane | MT-C14 | Fuselage | 30 | 2 |
| 16 | plane | MT-C17 | Lower Wing Boards | 47 | 2 |
| 17 | plane | MT-C21 | Diagonal Wing Supports | 20 | 4 |
| 18 | plane | MT-C16 | Upper Wing Boards | 40 | 2 |
| 19 | plane | MT-C22 | Tail Wing | 28 | 1 |
| 20 | plane | MT-C20 | Tail Fin | 6 | 1 |
| 21 | plane | MT-C11 | Wooden Propeller | 11 | 2 |
| 22 | house | MT-C26 | House Platform | 48 | 4 |
| 23 | house | MT-C05 | Frame Uprights and Rafters | 20 | 8 |
| 24 | house | house:front-and-back-rails | Frame Front and Back Rails | 32 | 4 |
| 25 | house | house:side-rails-and-ridge | Frame Sides, Ridge, and Side Walls | 16 | 13 |
| 26 | house | MT-C30 | Five Outer Wall Boards | 34 | 5 |
| 27 | house | MT-C19 | Wall Boards Beside the Door | 8 | 6 |
| 28 | house | MT-C09 | Door Boards | 14 | 3 |
| 29 | house | MT-C23 | Window Frames | 11 | 8 |
| 30 | house | MT-C25 | Front and Back Fascia | 36 | 2 |
| 31 | house | MT-C24 | Pitched Roof Boards | 25 | 8 |
| 32 | house | MT-C27 | Door Handle | 3 | 1 |

## Geometry and Attribution

`src/construction.js` is the indexed cut/placement schedule. Every vector has its exact requested length, and every wooden part uses the unchanged 0.22 × 0.63 world-unit profile. Coordinates are sixteenths of an inch at two world units per inch. Rotation and translation position pieces; no part is stretched. Ordinary butt/overlap joints are modeled without subtracting a hidden kerf. Oriented-box contact tests check that each wooden model is connected, including its supports and trim.

The chair has grounded front legs/back posts, rails, three equal seat boards, back slats, arms and joint caps. The biplane has crossed display feet, connected 9–12–15 landing supports, a two-board fuselage, paired upper/lower wing boards, 12–16–20 wing braces, tail and propeller. The house keeps every endpoint of the original 17-member frame and adds a platform, four wall faces with a door, window frames, fascia and a pitched roof. Roof vectors extend the original 12–16–20 triangle to 15–20–25; the wood remains its measured size. Equal 1-inch side-wall boards duplicate the accepted frame-side measurement in that same family.

The plane canopy/propeller hub and house window glazing are original procedural decorative fixtures. They are not cut responses or automatically passed objectives. Wood materials and workshop styling preserve the accepted MeasureTwice archive attribution; Three.js remains MIT. Source/asset hashes accompany each review artifact. No central GraphicsStorage catalog is changed by this PR.

## Response and Progress Rules

Every valid wrong or correct selection is cut. Feedback stays hidden until the camera reaches inspection. Authored unreduced targets remain unreduced before commitment. Neither elapsed animation time nor a correct length can conceal a wrong objective choice. A wrong cut is acknowledged and rejected, staying on the same part. If the wood is correct but the reasoning is wrong, it stays held while a separate supported reasoning retry is answered; no second successful cut is demanded. The corrected plan returns to that held piece for explicit confirmation.

Placement completion advances the step once. Duplicate actions cannot award more pieces. Build Progress can review completed steps; Redo This Step records a new supported practice attempt and returns to the current frontier after confirmation. It never adds a second copy of an already completed construction family. Review alone does not change the current step. Learn visits preserve the held piece and all progress. Restart clears constructions and returns to the chair order while retaining all observations, support and original responses. Reload still clears the in-memory session; persistence/resume was not requested.

Completion and report download require all thirty automatic objectives and all three complete constructions. Typed reasoning must be saved where requested, but its correctness remains for teacher review. The UTF-8 report contains exact immutable build/source identity, content and construction revisions, project/step/exercise IDs, first responses, retries, assistance, final outcomes and construction counts. Completion is not an independent-mastery grade. The student attaches the file to Google Classroom manually; no accounts, telemetry or automatic upload are used.

## Curriculum and Verification

Source-backed targets remain DM 1.3 G07/G08/G10–G13/G16. The audit stays pinned at `1713a3bd537035f2ce09dfc7fe05ce6bf6b70cc3`. Current primary PDF metadata was rechecked: blob `f2f789a39160e52a8951826504f01ceca2556677` is unchanged from the previously inspected pages in [Primary Source Verification](PRIMARY_SOURCE_VERIFICATION.md). The text-only connector rejected direct PDF retrieval; directory metadata supplied the verified byte identity. No private source pages or student data are copied here. Copy planning and the original models are local applications/extensions; all five Learn lessons remain freely accessible. Richer worked teaching animations and a classroom pilot remain pending.

Current browser entrypoints are `scripts/sequential-check.cjs` (ordered flow, models, full/reduced animation, 1296 camera positions, redo/reset and actual report download) and `scripts/sequence-access-check.cjs` (assessment exposure, ruler input, Free Play, Learn and workshop regressions). Older entrypoint names forward to these current checks; earlier source snapshots preserve their old harnesses. `tests/construction.test.mjs` verifies exact lengths, contact connectivity, original frame endpoints and state/report invariants.

This revision remains stacked on PR #23, which depends on PR #20. The owner merges each dependency into main first, then retargets the next PR to main and reviews its remaining diff. Do not merge follow-ups into their feature bases. No merge, deployment, hosted Actions dispatch or settings change was performed.
