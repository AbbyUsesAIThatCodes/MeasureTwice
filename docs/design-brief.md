# MeasureTwice Design Brief

Recorded September 27, 2026, from the teacher's founding concept. This is a game design proposal grounded in [Curriculum Alignment](curriculum-alignment.md), not a replacement for the curricular-goals document.

## Teacher's Core Requirements

1. Practice translating numerical and fractional inch measurements into positions on a virtual ruler.
2. Let students click the appropriate hatch mark or the appropriate empty space on the scale.
3. Every successful ruler response sends virtual wood into a cutting machine and triggers an animated cut.
4. Keep the resulting measured piece visible, then send it into the model being built on screen.
5. Require each distinct length only once during a build. Visibly duplicate the cut piece to supply every copy needed at that exact length.
6. Build recognizable objects from composites of simple shapes: a small house, airplane, tree, and other familiar Dash challenge subjects.
7. Reference the Design And Modeling repository throughout design, with Activity 1.3 Measuring Matters as the curricular foundation.
8. Provide Free experimentation, Learn fundamental reviews in a freely navigable menu, and Challenge comprehension checks. Thoroughly ground every lesson and challenge in the Curricular Planning Document and document the content with links to the class repository.

The virtual machine is the reward for a measurement decision. Students do not need a separate sawing skill to progress. [Free, Learn, And Challenge](game-modes.md) defines how this loop changes by mode; [Curriculum Content](curriculum-content.md) indexes the proposed reviews and checks. Free permits valid chosen cuts without a prescribed answer; the question-and-feedback round below applies to Learn practice and Challenge tasks.

## Three Connected Mechanics

| Mechanic | Student Action And Visible Result | Learning Connection |
| --- | --- | --- |
| Locate The Length | Read a measurement with its inch unit and select its location from zero on a ruler. | Fractional intervals, fraction equivalence, and mixed numbers; DM 1.3 G10–G13, supported by G07 and G16. |
| Cut The Wood | A correct response commits the chosen length; wood enters the machine, the saw cuts, and the measured segment separates from the offcut. | Makes a specified length consequential. The animation supports context for G08; watching it is not evidence of physical measuring or cutting skill. |
| Duplicate And Assemble | The retained piece visibly becomes the required number of equal pieces; pieces fly into their assigned positions. | A local connection between measured parts and composite forms. Automatic duplication and assembly supply visual context, not independent evidence of source construction goals. |

## A Round In Detail

Show the next needed length and the model under construction. Keep the board's starting point aligned with the ruler's zero graduation. The student commits a location. A correct response locks that length and runs the feed, cut, separation, duplication, and placement sequence. The completed placements remain visible as the next distinct length is requested.

An incorrect response gives specific guidance and another attempt on the same target. Challenge preserves the initial unassisted response separately from helped retries; Learn can explain and scaffold throughout. An incorrect response does not consume material, trigger a successful cut, or erase the model. Examples of useful feedback include checking the whole-inch part, counting intervals from zero, and checking the ruler's subdivisions. Do not assert a particular misconception from one click; phrase uncertain diagnoses as suggestions.

Use a clear state sequence: **Awaiting Selection → Feedback Or Accepted → Feeding → Cutting → Duplicating → Assembling → Next Length Or Complete**. Accept at most one successful response per round. A double click, animation skip, or replay must never award a second set of parts.

Keep the cut position and resulting length consistent with the ruler answer. The offcut is visibly distinct from the retained piece. Pieces may rotate and move into the model; their lengths must not stretch to make them fit.

## Cut Once And Duplicate Visibly

Deduplicate by exact physical length, not by the prompt's spelling. For example, `3/4 in`, `6/8 in`, and `0.75 in` identify the same length. Within one model build, they belong to a single cut family. Equivalence practice can use different representations across builds or an explicitly separate practice round; it must not silently reinstate repeated cuts in one build.

If a family needs four pieces, show the original plus three new copies, with a total quantity of four. Spread them briefly so students can see their equal lengths before they fly into place. A quantity caption can support the animation, but cannot replace the visible duplication.

The proposed first version uses one stock width, thickness, and material so identical lengths can share pieces honestly. If later models introduce different profiles, design their production rule explicitly instead of silently turning equal lengths into incompatible parts.

## Model Collection

| Model | Composite-Shape Opportunity | Planning Status |
| --- | --- | --- |
| Small Model House | Repeated uprights and rails, a roof outline, and clear symmetry. | Suggested first model; exact geometry and cut schedule still to design. |
| Model Airplane | Fuselage, paired wings, tail, and repeated supports. | Teacher-requested subject for a later model. |
| Model Tree | Trunk and repeated branches arranged into a recognizable silhouette. | Teacher-requested subject for a later model. |
| Other Dash Subjects | Reuse familiar classroom ideas built from simple forms. | Consult the DM challenge materials before selecting additions. |

The teacher identifies these as familiar classroom challenge subjects. The checked DM quick-build template index also describes a chair example; this planning pass has not independently verified a complete Dash subject list or classroom-use history.

Prefer a small, readable 3D workshop with a clear measuring station, animated machine, and growing model. This visual direction is proposed; engine, art style, camera, and assets remain open. A flat ruler overlay or fixed straight-on ruler view should preserve measurement legibility regardless of the workshop camera.

## Proposed First Playable Scope

Start with one small house and a short schedule of distinct lengths, progressing from whole inches and halves to quarters, eighths, and sixteenths. Include a mixed-number target. Add the alternate representations and empty-space mode defined in [Ruler Interaction](ruler-interaction.md) after the ordinary ruler interaction is dependable.

The complete first playable milestone includes all three top-level modes and curriculum navigation. Prototype the ruler first if useful, but do not describe a single prescribed question sequence as the completed three-mode design. Learn's suggested review order never locks its menu.

Aim for a complete, untimed measurement-to-model loop. Use laptop mouse and trackpad controls, readable unit labels, compact overlays, keyboard access, and a reduced-motion or animation-skip option. Skipping must preserve visible final quantities and model progress. Treat audio as optional, with mute available.

Do not add a shop economy, resource penalties, grading system, account requirement, or timed leaderboard to the first version. The immediate design work is deciding what the ruler interaction teaches and making the construction reward understandable.

## Evidence Of Learning

Record target length, displayed representation, selected position, attempt count, and hints used in a proposed local session summary. Report distinct measurements separately from the number of assembled parts: one answer producing six pieces is one answer.

Unassisted first attempts can provide individual evidence about ruler-position interpretation. Hinted retries are practice. The finished model is a reward and progress indicator; it does not establish independent mastery of fraction equivalence, drawing, cutting, folding, assembly, or the full Measuring Matters activity.

Before classroom release, create a matching teacher guide tied to the actual build, with goal references, examples, likely errors, and a short physical-ruler transfer check. Student names, accounts, cloud reporting, and Learning Compass integration are not part of this initial plan.
