# MeasureTwice Game Design

**Approved Design Foundation — September 28, 2026 (America/New_York).** This records the teacher's accepted design from the September 27–28 discussion. It is the authoritative gameplay foundation, subject to later explicit teacher decisions. The [Workshop Mockup](mockups/predict-cut-inspect/README.md) was subsequently approved the same day and is archived as the visual/interaction reference. Production implementation, exact first-model geometry, and classroom validation remain future work; the mockup's documented shortcuts do not amend this design.

MeasureTwice is a bright, cartoony 3D woodshop for Design And Modeling Activity 1.3 Measuring Matters. Students translate a written inch measurement into a ruler position, commit their prediction by pressing **Cut**, and inspect the actual result before receiving the next attempt or part. See [Curriculum Alignment](curriculum-alignment.md) for the source record and [Curriculum Content](curriculum-content.md) for all lesson and challenge scripts.

## Learning Focus

The core targets are DM 1.3 G10 (equal intervals), G11 (fractional inches through sixteenths), G12 (equivalent fractions), and G13 (whole inches plus a fraction), supported by G16 (starting graduation), G07 (number and unit), and G08 (why accurate measurement matters). These are local audit identifiers, not official PLTW or Ohio standard codes.

The student must make a measurement decision. A finished model and automatic duplication do not demonstrate independent equivalence reasoning, physical ruler control, cutting, assembly, or mastery of the whole activity. Metric measurement and skimmer fabrication remain classroom work. Decimal-inch prompts and sparse-ruler interpolation are labeled local extensions.

## Three Modes

The shared educational-game pattern is **Free Play**, **Learn**, and **Challenge**. These are the exact authored display names; the interface may render them in capitals. This repository implements the convention for MeasureTwice; it does not claim changes to other games.

- **Free Play:** choose any supported length, inspect live values and equivalent fractions, cut, compare, duplicate, and reset. No compulsory target, score, lesson order, or failure gate. An optional comparison target enables the same post-cut inspection; no target means no right/wrong judgment.
- **Learn:** five short lessons in a freely navigable menu. Each has an objective, worked animation, guided task, feedback, and optional practice with support reduced. All lessons remain accessible and replayable.
- **Challenge:** untimed curriculum-based checks with the initial response recorded before solution feedback. Hints and retries remain available and are identified as assisted practice. Model progress and comprehension results are distinct.

Details, curriculum access, and mode-switch behavior are in [Game Modes](game-modes.md).

## Predict Cut Inspect

### Choose the Measurement

Show the requested length and inch unit. A click or keyboard movement selects a ruler position, adds a neutral pencil mark, and smoothly repositions the plank relative to the stationary saw until the selected cut line is under the blade. Further selections revise the prediction without consuming an attempt.

Every action receives visible feedback, but correctness is withheld. Do not show a green/red correctness glow, a target-solving numerical cursor readout, the target cut line, a ghost target, or an answer-dependent movement before a Challenge commitment. Keep the ruler readable and the measuring origin tied to the retained plank's starting end as the stock moves. The approved mockup demonstrates the ruler overlay and moving stock; issue #2 must verify the production mapping and input geometry.

### Commit With Cut

**Cut** commits the selected length and records the response once. Every valid selected length is cut, whether correct or incorrect. Invalid selections such as zero length or a position beyond supported stock receive a neutral input explanation; that is not a curricular correctness judgment.

The saw animates through the wood, throws a short shower of chunky cartoony sawdust, and separates the retained piece from the offcut. The retained piece has the selected length, even when it differs from the requested length. Saw-blade thickness must not silently subtract from the student's selected length.

### Swing Into Inspection

The retained piece leaves the saw, swings smoothly toward the camera, and settles into a straight-on closeup. Align its starting end with the reference's starting end. Show the required length and actual length in the same scale and unit. Only now reveal correctness.

| Result | Required Feedback |
| --- | --- |
| Too Long | Red shader/glow on the piece, a red line at the required cut position, and a translucent red overlay over the excess material. Label the amount as too long. |
| Too Short | Red shader/glow on the piece and a ghostly red translucent extension representing the missing material, ending at the required endpoint. Label the amount as too short. |
| Correct | Brief green glow, an animated green checkmark, and a text confirmation that the piece fits. |

For example, Needed: 1 1/4 in and Your Piece: 1 1/8 in produces 1/8 in too short. Pair color with geometry, labels, and a success icon. Diagnostic suggestions should not claim certainty about the cause of one wrong response.

### Hold for the Student

Hold the inspection until **Keep Piece** or **Try Again** is selected. Do not dismiss the explanation on a timer. The student can study the mismatch as long as needed.

- **Keep Piece:** the correct piece glides into the stack on the right. The original and its required copies appear visibly, then move from this staging stack into their model placements.
- **Try Again:** the incorrect piece tips and swoops off-screen to the left. Fresh stock arrives for another prediction on the same target. Existing model progress stays intact.
- **Free Play without a target:** show the chosen length neutrally and allow keeping the piece for comparison. Nothing is rejected merely because it differs from an unstated answer.

There is no material budget, failure penalty, countdown, economy, or leaderboard in the initial scope.

## Duplicate and Assemble

A model requires one successful measurement per distinct normalized target length. Failed attempts may repeat that target. It never requires another correct answer merely because another identical part is needed. Free Play allows voluntary recutting.

For N required pieces, show the retained original plus N−1 new copies; the original counts in the total. Equivalent representations such as 3/4 in and 6/8 in belong to the same physical-length family. Keep one stock width, thickness, and material initially. Pieces may translate and rotate during assembly but cannot stretch to fit. The right-hand stack is a visible staging area, not a separate inventory-management mechanic.

Begin with one recognizable model house. Its exact dimensions, stock limits, distinct length schedule, quantities, and placements must be designed and checked in issue #1. Airplane and tree models follow the complete first loop. A list of sample lesson measurements is not yet a geometrically valid house plan.

## Interaction State Contract

| State | Student Action or Transition | Invariant |
| --- | --- | --- |
| Selecting | Move marker and stock; revise; choose Cut. | No correctness revelation; no attempt until commitment. |
| Cutting | Run saw, sawdust, and separation. | One recorded attempt and one cut per commitment; retained length equals selected length. |
| Moving to Inspection | Swing piece toward camera. | Preserve length, target, units, and attempt identity. |
| Inspecting | Show result; wait for Keep Piece or Try Again. | Feedback stays visible until acknowledged. |
| Rejecting | Move failed piece left; supply new stock. | Same target; no model progress or accepted duplicates. |
| Stacking and Duplicating | Move accepted piece right and produce required copies. | Original plus N−1 copies, once per successful family. |
| Assembling | Place accepted pieces; continue or finish. | No stretching or duplicate awards. |

Reduce motion by replacing sawdust and camera travel with a short/static transition to the same inspection. Skipping animation must still show the inspection and require acknowledgement. Rapid clicks, repeated keys, mode switches, and replay cannot duplicate attempts, parts, or rewards. See [Ruler Interaction](ruler-interaction.md) for numerical examples.

## Visual and Access Direction

Use a fullscreen bright, cartoony 3D workshop with compact overlay menus. Keep ruler marks and unit labels legible on student laptops with mouse/trackpad and keyboard input. Use a straight-on measuring/inspection view so perspective cannot change the answer. The [Approved Workshop Mockup](mockups/predict-cut-inspect/README.md) establishes the workshop composition, ruler dock, moving stock, inspection, and staging direction. Refine camera travel, shader treatment, particle count, and timing during implementation and laptop testing within that accepted direction.

Provide mute, reduced motion, clear focus, keyboard equivalents, and magnification where needed. A green checkmark can celebrate the result without covering the comparison labels or the next action. All requested controls must be understandable without hover. Phone optimization is outside the classroom scope.

Provide **Curriculum** from every mode and **What This Practices** on each lesson/check. The playable explanations work without private class-repository access. Keep source revision details in the teacher record. Follow [Build Identity](BUILD_IDENTITY.md) when the first build pipeline is introduced.

## Evidence and Content Boundaries

Keep target, displayed representation, selected position, unit, question ID, first committed response, attempt history, and assistance status in the planned local session record. Animation completion is not an extra answer. Feedback-informed retries and worked examples are practice. A correct equivalence position and its explanation are separate evidence. The G08 consequence question asks students to explain the mismatch before showing its answer; viewing an automatically labeled gap alone is not scored as understanding.

No names, accounts, cloud reporting, or Learning Compass integration are part of the initial scope. No mastery percentage or grading rubric has been approved.

## Remaining Decisions and Work Order

1. Approved reference: [Workshop Mockup](mockups/predict-cut-inspect/README.md), including ruler selection, cutting, inspection, right-hand staging, and mode navigation. Preserve its accepted direction and read its implementation boundaries. The earlier Check & Cut concept sketch predates this agreement and does not specify current behavior.
2. Issue #1: verify relevant primary-source pages, finalize the first house and its exact cut schedule, ruler span, and prompt distribution.
3. Issue #2: implement accurate ruler/stock selection and the explicit Cut commitment, choosing the engine and establishing the build identity pipeline.
4. Issues #3 and #4: animate all valid cuts and inspection, then successful stacking, duplication, and assembly.
5. Issues #7 and #8: implement all three modes and the indexed instructional content. Issue #6: validate a classroom release and physical-ruler transfer. Issue #5 adds models later.

This foundation approves the learning and interaction design. The archived mockup demonstrates that direction; it does not establish a completed production build, published deployment, finalized assets, browser verification of the standalone export, or completed classroom pilot.

## Decision History

- September 27: preserve the measuring woodshop, once-per-length duplication, course links, and three-mode concept.
- September 28: approve bright cartoony 3D, five Learn lessons, explicit challenge mapping, prediction before commitment, cutting incorrect attempts, post-cut closeup feedback, student-held inspection, right-hand accepted stack, left-hand rejection, and subsequent automatic assembly.
- September 28 clarification: the teacher intended correctness feedback only after pressing Cut. Pre-cut motion and neutral selection feedback must not reveal correctness. This replaces the earlier correct-answer gate and Check & Cut proposal.
- September 28 mockup approval: the teacher explicitly accepted the interactive Predict, Cut, Inspect study and requested its repository archive as the handoff to implementation. Exact source and runnable export are linked above; full lessons, assessment, complete house geometry, and production session behavior remain in their existing issues.

## October 1 Approved Construction Progression

The teacher approved revising the current Challenge PR to automatically progress through **chair → plane → house exterior** with thirty mapped exercises. This supersedes the initial house-only entry and the interim required exercise picker. The house retains its original frame and adds walls and roof. Inspection confirmation and actual placement precede advancement; Build Progress is status/completed-step review. See [Current Challenge Review](CHALLENGE_REVIEW.md) for the exact schedule and evidence rules.
