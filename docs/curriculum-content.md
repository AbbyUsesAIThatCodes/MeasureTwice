# Curriculum Content

This is the instructional record for MeasureTwice's approved [Game Design](game-design.md), connecting Free Play, Learn, and Challenge to [Design And Modeling](https://github.com/AbbyUsesAIThatCodes/DesignAndModeling26-27) and [Activity 1.3 Measuring Matters](https://github.com/AbbyUsesAIThatCodes/DesignAndModeling26-27/tree/main/units/01-introduction-to-design/1.3-measuring-matters).

**Content Revision: September 28, 2026; Implementation Review September 30 UTC.** The teacher accepted this five-lesson design and challenge mapping. The local review implements the index in `src/content.js` and `src/learning.js`, with separate exact-cut and conceptual records. Five guided cuts, six checks, support tracking, and teacher-review explanations have browser checks. Detailed animations (including separately illuminated origin/interval spans and paired equivalence markers), fresh independent variants, and a teacher pilot remain incomplete. The scripts below remain the full acceptance contract; the current review does not close issues #7/#8.

The planning reference is the [Curricular Goals Audit PDF](https://github.com/AbbyUsesAIThatCodes/DesignAndModeling26-27/blob/1713a3bd537035f2ce09dfc7fe05ce6bf6b70cc3/units/01-introduction-to-design/1.3-measuring-matters/teacher-guides/measuring-matters-curricular-goals.pdf), with [Word Source](https://github.com/AbbyUsesAIThatCodes/DesignAndModeling26-27/blob/1713a3bd537035f2ce09dfc7fe05ce6bf6b70cc3/units/01-introduction-to-design/1.3-measuring-matters/teacher-guides/measuring-matters-curricular-goals.docx). The audit PR #21 remains open at that revision when rechecked September 30. DM main is `279ddf7b047c58087632dbe3ce650f1cc156fc9f`; its current primary Activity 1.3 PDF blob `f2f789a39160e52a8951826504f01ceca2556677` is identical to the verified source recorded in [Primary Source Verification](PRIMARY_SOURCE_VERIFICATION.md). No private source pages are copied into this repository. Audit pp. 2–3 provide the selected target descriptions. References A below use the audit's page locators. The seven selected targets were independently checked against those primary pages on September 30; see [Source Verification](PRIMARY_SOURCE_VERIFICATION.md). See [Curriculum Alignment](curriculum-alignment.md).

## Content Index

MT-L and MT-C are stable game content IDs. All G IDs below mean **DM 1.3 G** and are distinct from existing Learning Compass IDs. Every Learn entry is available from the outset.

| Learn Lesson | Related Challenge | Audit Basis and Source Locator |
| --- | --- | --- |
| MT-L01 — Start at Zero | MT-C01; MT-C06 | G07, G10, G16; A p. 5, p. 11, pp. 37–38, p. 66. |
| MT-L02 — Meet the Fractions | MT-C02 | G10, G11; A step 3, pp. 11–25. |
| MT-L03 — Same Length, Different Names | MT-C03 | G12; A pp. 15, 17–21, 23, 25. |
| MT-L04 — Whole Inches and a Little More | MT-C04 | G13; A step 6, p. 39. |
| MT-L05 — Will It Fit? | MT-C05; MT-C06 | G08, reinforced by G07 and G11; A pp. 5, 42, 47, 66; fractional reading A pp. 11–25. |

These targets are directly described in the audit. Their woodshop presentation is an original local teaching design. Watching animations supplies context, not evidence by itself.

## Shared Lesson Rules

Each lesson aims for approximately two to three minutes, subject to playtesting. Present its objective, short text, worked animation, guided action, feedback, and optional practice with less support. All can be replayed or left directly; visits are not mastery results. A worked example is explicitly a demonstration. On the student's cut attempt, neutral selection precedes Cut, the saw runs for every valid selection, and correctness appears in inspection afterward.

Keep inches explicit. Use equal unit sizes and an origin independent of the physical edge. Pointer and keyboard share the same exact-length rule from [Ruler Interaction](ruler-interaction.md); final hit tolerances await actual geometry. Keyboard controls and magnification are access features. Numerical cursor readouts, highlighted interval counts, and worked answers are support. Post-cut feedback pairs color with geometry and text. Exact-length arithmetic never requires a separate fraction calculation merely to place the marker.

## MT-L01 — Start at Zero

**Objective:** identify the starting graduation and count equal intervals from it, with a value and unit attached. This practices G10 and the recognition component of G16, while explicitly explaining G07. Automatic board alignment does not establish physical ruler-placement skill.

**Text:** “Start at the zero mark. The edge of the ruler may stick out past it. Count the spaces after zero.” Then: “A measurement needs a number and a unit. Here, our unit is the inch.”

**Animation:** highlight the physical edge and the inset zero graduation separately. Begin a bracket at zero and illuminate three eighth-inch spaces one at a time. Label the span 3/8 in.

**Guided Task:** “Select the starting mark. Now mark 3/8 inch.” Use an eighth-inch display. The starting-mark response selects the zero graduation; the length response ends three intervals later. Cut commits the length and leads to inspection.

**Feedback:** “Three eighth-inch spaces take you from zero to 3/8 inch.” On an error: “Check where you started. Count spaces after the starting mark.” A hint may identify zero before counting.

**Practice:** show the same starting graduation without its zero numeral, remove interval highlighting, and request 5/8 in. Keep the unit label visible. Prompt “What information would be missing if the order only said 2?” and explain that the unit is needed.

**Evidence:** starting-mark choice, committed endpoint, support used, and unit explanation. All guided examples remain practice.

## MT-L02 — Meet the Fractions

**Objective:** interpret equal subdivisions and locate fractional inches through sixteenths (G10–G11).

**Text:** “One inch can be divided into equal parts. More parts mean smaller spaces.”

**Animation:** keep one inch and its plank span fixed while dividing it into halves, quarters, eighths, then sixteenths. Additional marks appear; the whole never grows.

**Guided Task:** “Mark 5/8 inch.” Shade the five eighth-inch intervals in the demonstration; the same endpoint is 10/16 in on the sixteenth scale. Let the student make a guided cut.

**Practice:** remove the solved highlight and ask “Try 7/16 inch.” The answer is the seventh sixteenth-inch interval endpoint after zero. Keep larger subdivisions available as a chosen review, not a progression lock.

**Feedback:** after Cut, show the chosen span and compare it with the requested span. “Check how many equal spaces make one inch on this ruler.” Then, when explaining: “Seven sixteenth-inch spaces make 7/16 inch.”

**Evidence:** selected endpoint and scale; record whether the readout or interval highlights were visible. A wrong endpoint alone does not prove a specific counting misconception.

## MT-L03 — Same Length, Different Names

**Objective:** recognize and explain equivalent fractions at the same ruler position (G12).

**Text:** “Changing the fraction's name does not always change the length.”

**Animation:** keep a marker at 1/2 in while its label changes to 2/4, 4/8, and 8/16. Change the partition display while preserving the same one-inch whole.

**Task:** “Place 3/4 inch and 6/8 inch on the ruler. Do they land together?” Use two distinguishable markers and a comparison submission. Both belong at 12/16 in. Do not require two cuts of the same family.

**Feedback:** overlay the equal spans. “Yes. Both end at the same position.” Explain that six eighths and three quarters cover the same portion of this inch.

**Practice:** ask the learner to predict whether 2/8 and 1/4 coincide before revealing both spans. They share the 4/16-in endpoint. Hints can show quarter partitions or paired eighth intervals; track this support.

**Evidence:** both positions and the learner's comparison/explanation. Merely normalizing fractions in software does not demonstrate student reasoning.

## MT-L04 — Whole Inches and a Little More

**Objective:** combine whole inches and a fractional remainder (G13).

**Text:** “Read the whole inches first. Then add the fraction beyond that whole-inch mark.”

**Animation:** for 2 1/4 in, illuminate two whole inches, then the next quarter inch. Briefly contrast that endpoint with 1/4 in from zero.

**Task:** “Mark 1 3/16 inches.” The answer is 19/16 in: one full inch plus three sixteenths. Use a sufficiently long sixteenth-inch scale. Cut and inspect the actual selected length.

**Feedback:** if the learner chose 3/16 in, show the missing whole-inch span after cutting: “Your mark includes the fraction. Check the whole inch at the beginning.” Otherwise describe the measured difference and suggest reviewing whole inches before the remainder.

**Practice:** request 1 5/8 in with solved highlights removed. The answer is 26/16 in. This preserves the earlier challenge example as a content variant, not another required duplicate cut in one model.

**Evidence:** selected endpoint, retained whole-inch component, and assistance state. Do not require improper-fraction conversion as an unrelated input barrier.

## MT-L05 — Will It Fit?

**Objective:** explain why an inaccurate measurement changes a part's fit (G08), reinforced by explicit units and fractional lengths (G07, G11).

**Text:** “A part can look nearly right and still leave a gap. Compare its measured length with the length needed.”

**Animation:** align the start of a 1 1/8-in piece with a reference opening needing 1 1/4 in. Leave a visible gap. This is a worked example, not a hidden-answer Challenge trial.

**Task:** “Is this piece too short, too long, or the right length? Mark the length it needs.” The piece is too short; the correct new cut is 1 1/4 in. Commit that prediction with Cut.

**Feedback:** reveal the missing 1/8-in extension in translucent red. The corrected piece fits with a green glow and checkmark. Ask: “What did the measurement change about the fit?” Expected reasoning connects insufficient length to the gap. Naming the difference is explanatory support, not a required new subtraction objective.

**Practice:** show a 1 3/8-in piece against the same required span and ask for a prediction before revealing the red excess. It is 1/8 in too long.

**Evidence:** short/long/fit judgment and explanation. Watching a labeled animation is not itself a scored explanation. This teaches consequences digitally, not physical sawing or construction proficiency.

## Shared Challenge Record

Use these original prompts as seed items. Vary measurements across sessions and model schedules while preserving the targeted skill; a sample prompt is not a finalized house part. All cut items commit with Cut; separate origin/comparison/explanation/unit questions commit with an explicit submission.

Before commitment, no answer-solving cursor readout, target highlight, ghost, correctness glow, or target-dependent motion. The prompt's requested numerical length remains visible. After a cut, show actual and required lengths and the mismatch; hold for Keep Piece or Try Again. Hints progressively offer the relevant whole-inch span, subdivision meaning, then interval counting, with assistance recorded.

For each item retain target, representation, scale, selected location, question/variant ID, units, first commitment, later attempts, and support used. First unassisted evidence is distinct from guided completion. Following feedback, retries on the same target are practice. Score position, origin, comparison, and explanation components separately. No overall mastery threshold or grade is established.

## Challenge Items

| ID and Exact Prompt | Answer and Observable Evidence | Target, Feedback, and Review |
| --- | --- | --- |
| **MT-C01** — “Mark 3/8 inch. Select where your measurement begins.” Use an eighth-inch scale whose physical edge extends before zero. | Endpoint 6/16 in, plus zero graduation selected as origin. Collect both responses before their feedback. Automatic ruler alignment alone is not evidence. | G10, G11, G16; see L01 and A p. 11, pp. 11–25, pp. 37–38. After commitment, explain three spaces after zero; suggest checking origin/counting. |
| **MT-C02** — “Cut a piece 7/16 inch long.” Use a sixteenth-inch scale. | Seventh interval endpoint; actual retained length equals the committed selection, even when wrong. | G11; L02; A step 3, pp. 11–25. Reveal selected versus required intervals after Cut. |
| **MT-C03** — “Mark 6/8 inch. Would a 3/4-inch piece have the same length? Explain.” | Location 12/16 in; yes, both span the same length/end at the same point. Record position and comparison/explanation independently. | G12; L03; A pp. 15, 17–21, 23, 25. Collect the comparison before showing solved overlays. A single cut can follow both submissions; do not require an equivalent duplicate cut. |
| **MT-C04** — “Cut an upright 1 3/16 inches long.” Use a scale extending beyond the target. | Location 19/16 in, preserving the full inch. 3/16 in omits one inch. | G13; L04; A step 6, p. 39. After Cut, show a missing whole inch when applicable. Variant: 1 5/8 in = 26/16 in. |
| **MT-C05** — “This opening needs 1 1/4 inches. Your piece measures 1 1/8 inches. Will it fit correctly? Why?” | Too short; it leaves a gap because its length is less than the required length. A numerical difference is optional. | G08, with G07/G11 support; L05; A pp. 5, 42, 47, 66. Use a prepared, neutrally rendered comparison. Withhold the automatic gap diagnosis until submission, then show the 1/8-in ghost. This is a transfer check, not a question asked after displaying its answer. |
| **MT-C06** — “The order says 'length: 2.' What information is missing?” | The unit; a number alone does not specify whether the order means inches, centimeters, or another length unit. | G07; L01 and L05; A p. 5, pp. 44, 49, 66. Deliberate incomplete-order example; normal measurement prompts retain units. Explain why the unit matters after submission. |

For explanatory responses, the expected reasoning above is a teacher-review criterion. Do not claim that any typed text passes. The response UI and reliable scoring approach must be resolved in issue #8; automated checks must genuinely distinguish the intended reasoning. Keep student-facing questions separate from developer goal IDs.

## Free Play Connections and Extensions

Free Play supports the same ideas through marker movement, live equivalent displays, constant-size units with changing subdivisions, cuts compared from aligned starting ends, and optional fit targets. It has no mandatory question sequence and produces no passed comprehension results. A voluntary Try This invitation can ask “Can you give this length three different names?”

Decimal-inch prompts and sparse-scale empty-space selection remain local extensions, not additional source requirements. Metric reading, physical ruler alignment, sketch interpretation, skimmer cutting/folding, and testing remain outside this initial digital assessment slice. See [Curriculum Alignment](curriculum-alignment.md) for exact limits.

## Maintenance and Release Review

Each future entry must preserve a stable ID, objective, qualified goal/source locator, direct/inferred/extension status, exact prompt, student action, worked answer with unit, scale/tolerance, scaffolds, feedback, evidence interpretation, related lesson, content revision, and review status. See `src/content.js`, `src/learning.js`, `src/assessment.js` and the report contract below for the implemented review.

Every implemented lesson/check appears here and in Curriculum/What This Practices. See [Quick Review Checklist](REVIEW_CHECKLIST.md) and [Implementation Review](IMPLEMENTATION_REVIEW.md) for current behavior and limits. Retain the pinned primary-source verification, verify the mathematical examples, review final response/scoring behavior, and pilot with the actual identified build. Keep the curriculum-only source audit in DM and original game design here.

## Expanded Challenge Bank

Content revision: `2026-09-30-bank-30-v1`. The six original items retain their IDs and prompts. C07-C30 add 24 mechanics-based tasks: six fractional cuts, six longer whole/fraction cuts, four equivalent-name decisions plus cuts (including non-equivalent pairs), four fit decisions plus corrected cuts, two origin decisions plus cuts, and two equal-copy plans plus cuts. Values range from 1/16 to the 3-inch stock endpoint. Equal-copy arithmetic is a local construction extension; its ruler component uses G11/G13.

| ID | Task and Exact Measurement | Goals and Source | Observable Components |
| --- | --- | --- | --- |
| MT-C01 | Mark 3/8 inch. Select where your measurement begins. | DM 1.3 G10, G11, G16; A p. 5, p. 11, pp. 37–38, p. 66 | Committed ruler endpoint and acknowledged actual cut; Explicit choice |
| MT-C02 | Cut a piece 7/16 inch long. | DM 1.3 G11; A step 3, pp. 11–25 | Committed ruler endpoint and acknowledged actual cut |
| MT-C03 | Mark 6/8 inch. Would a 3/4-inch piece have the same length? Explain. | DM 1.3 G12; A pp. 15, 17–21, 23, 25 | Committed ruler endpoint and acknowledged actual cut; Explicit choice; Written reasoning for teacher review |
| MT-C04 | Cut an upright 1 3/16 inches long. | DM 1.3 G13; A step 6, p. 39 | Committed ruler endpoint and acknowledged actual cut |
| MT-C05 | This opening needs 1 1/4 inches. Your piece measures 1 1/8 inches. Will it fit correctly? Why? | DM 1.3 G08, G07, G11; A pp. 5, 42, 47, 66; fractional reading pp. 11–25 | Explicit choice; Written reasoning for teacher review |
| MT-C06 | The order says “length: 2.” What information is missing? | DM 1.3 G07; A p. 5, p. 11, pp. 37–38, p. 66 | Explicit choice |
| MT-C07 | Cut a 1/2-inch spacer. Read the printed marks from zero. | DM 1.3 G10, G11; A step 3, pp. 11–25 | Committed ruler endpoint and acknowledged actual cut |
| MT-C08 | Cut a 1/4-inch spacer. Read the printed marks from zero. | DM 1.3 G10, G11; A step 3, pp. 11–25 | Committed ruler endpoint and acknowledged actual cut |
| MT-C09 | Cut a 7/8-inch spacer. Read the printed marks from zero. | DM 1.3 G10, G11; A step 3, pp. 11–25 | Committed ruler endpoint and acknowledged actual cut |
| MT-C10 | Cut a 1/16-inch spacer. Read the printed marks from zero. | DM 1.3 G10, G11; A step 3, pp. 11–25 | Committed ruler endpoint and acknowledged actual cut |
| MT-C11 | Cut an 11/16-inch spacer. Read the printed marks from zero. | DM 1.3 G10, G11; A step 3, pp. 11–25 | Committed ruler endpoint and acknowledged actual cut |
| MT-C12 | Cut a 15/16-inch spacer. Read the printed marks from zero. | DM 1.3 G10, G11; A step 3, pp. 11–25 | Committed ruler endpoint and acknowledged actual cut |
| MT-C13 | Cut a rail 1 1/16 inches long. Keep every whole inch. | DM 1.3 G11, G13; A step 6, p. 39 | Committed ruler endpoint and acknowledged actual cut |
| MT-C14 | Cut a rail 1 7/8 inches long. Keep every whole inch. | DM 1.3 G11, G13; A step 6, p. 39 | Committed ruler endpoint and acknowledged actual cut |
| MT-C15 | Cut a rail 2 3/16 inches long. Keep every whole inch. | DM 1.3 G11, G13; A step 6, p. 39 | Committed ruler endpoint and acknowledged actual cut |
| MT-C16 | Cut a rail 2 1/2 inches long. Keep every whole inch. | DM 1.3 G11, G13; A step 6, p. 39 | Committed ruler endpoint and acknowledged actual cut |
| MT-C17 | Cut a rail 2 15/16 inches long. Keep every whole inch. | DM 1.3 G11, G13; A step 6, p. 39 | Committed ruler endpoint and acknowledged actual cut |
| MT-C18 | Cut a rail 3 inches long. Keep every whole inch. | DM 1.3 G11, G13; A step 6, p. 39 | Committed ruler endpoint and acknowledged actual cut |
| MT-C19 | Mark 2/4 inch. Compare that length with 1/2 inch, then cut your prediction. | DM 1.3 G11, G12; A pp. 15, 17–21, 23, 25 | Committed ruler endpoint and acknowledged actual cut; Explicit choice; Written reasoning for teacher review |
| MT-C20 | Mark 6/16 inch. Compare that length with 3/4 inch, then cut your prediction. | DM 1.3 G11, G12; A pp. 15, 17–21, 23, 25 | Committed ruler endpoint and acknowledged actual cut; Explicit choice; Written reasoning for teacher review |
| MT-C21 | Mark 10/8 inch. Compare that length with 1 1/4 inch, then cut your prediction. | DM 1.3 G11, G12; A pp. 15, 17–21, 23, 25 | Committed ruler endpoint and acknowledged actual cut; Explicit choice; Written reasoning for teacher review |
| MT-C22 | Mark 14/8 inch. Compare that length with 1 1/2 inch, then cut your prediction. | DM 1.3 G11, G12; A pp. 15, 17–21, 23, 25 | Committed ruler endpoint and acknowledged actual cut; Explicit choice; Written reasoning for teacher review |
| MT-C23 | An opening needs 11/16 inches. The sample is 9/16 inches. Predict its fit, then cut a new piece to the needed length. | DM 1.3 G08, G07, G11; A pp. 5, 42, 47, 66; fractional reading pp. 11–25 | Committed ruler endpoint and acknowledged actual cut; Explicit choice; Written reasoning for teacher review |
| MT-C24 | An opening needs 1 9/16 inches. The sample is 1 11/16 inches. Predict its fit, then cut a new piece to the needed length. | DM 1.3 G08, G07, G11; A pp. 5, 42, 47, 66; fractional reading pp. 11–25 | Committed ruler endpoint and acknowledged actual cut; Explicit choice; Written reasoning for teacher review |
| MT-C25 | An opening needs 2 1/4 inches. The sample is 2 1/4 inches. Predict its fit, then cut a new piece to the needed length. | DM 1.3 G08, G07, G11; A pp. 5, 42, 47, 66; fractional reading pp. 11–25 | Committed ruler endpoint and acknowledged actual cut; Explicit choice; Written reasoning for teacher review |
| MT-C26 | An opening needs 3 inches. The sample is 2 7/8 inches. Predict its fit, then cut a new piece to the needed length. | DM 1.3 G08, G07, G11; A pp. 5, 42, 47, 66; fractional reading pp. 11–25 | Committed ruler endpoint and acknowledged actual cut; Explicit choice; Written reasoning for teacher review |
| MT-C27 | Choose the correct starting reference and cut 3/16 inch. | DM 1.3 G10, G11, G16; A p. 5, p. 11, pp. 37–38, p. 66 | Committed ruler endpoint and acknowledged actual cut; Explicit choice |
| MT-C28 | Choose the correct starting reference and cut 2 5/16 inch. | DM 1.3 G10, G11, G16; A p. 5, p. 11, pp. 37–38, p. 66 | Committed ruler endpoint and acknowledged actual cut; Explicit choice |
| MT-C29 | Make 3 equal 1 3/8-inch pieces. One successful cut is kept as the original. Predict how many additional copies are needed, then cut. | DM 1.3 G11, G13; A step 6, p. 39 | Committed ruler endpoint and acknowledged actual cut; Explicit choice; One original plus 2 unchanged copies (local extension) |
| MT-C30 | Make 5 equal 2 1/8-inch pieces. One successful cut is kept as the original. Predict how many additional copies are needed, then cut. | DM 1.3 G11, G13; A step 6, p. 39 | Committed ruler endpoint and acknowledged actual cut; Explicit choice; One original plus 4 unchanged copies (local extension) |

Exact answers, authored fraction representations, selected scale, post-commit feedback and related lesson are maintained together in `src/content.js`. The sixth seed item remains a unit-identification concept question; every added item uses a ruler commitment, physical-length inspection and retained wood. No tolerance or hidden normalization changes the actual selected length. L01 supports origin/unit tasks; L02 fractional cuts; L03 equal-name decisions; L04 whole/fraction cuts and explicitly labeled equal-copy planning; L05 fit/corrective cuts. Learn remains open in any order. Showing guidance conservatively marks all linked exercises as supported; it never rewrites an existing independent record.

## Completion and Teacher Report

The 17-piece house alone is not Challenge completion. Every one of the 30 exercises must have all automatic components correct: latest cut in the current retry round, held inspection acknowledged, and latest objective choice when present. Required written reasoning must be saved, but its correctness remains ungraded for teacher review. The current house must also be assembled. A correct cut cannot conceal a wrong comparison/fit/origin/copy decision. A new explicit retry starts a separate round; earlier answers stay immutable. Repeating a cut can correct its endpoint without requiring the same choice again. Duplicate submit events in one round are ignored.

Challenge Progress shows item status and enables Download Completion Report only at completion. The UTF-8 plain text report includes the complete immutable build ID, UTC build time, full source SHA and fingerprint, content revision, all exercise IDs/prompts/goal locators, final automatic outcomes, original and retry observations, recorded assistance, written explanations and house history. It contains no automatic grade or full-mastery claim. The first-attempt label requires every original automatic component to be correct without recorded assistance; any wrong/assisted first component prevents that label, even after successful retries. A label about recorded support cannot rule out help outside the game. Fixed zero and automatic stock alignment remain universal digital scaffolds, not evidence of physical ruler placement or fabrication.

The student downloads locally and attaches the file to Google Classroom manually. No account, telemetry, storage upload or Classroom connection is used. Files are editable, not cryptographically certified assessments. Navigation and Learn visits preserve progress; Restart retains all exercise observations/rounds/support while rebuilding the house. Reload still clears in-memory sessions; persistence/resume was not requested.

Verification uses synthetic data only. `tests/challenge.test.mjs` tests completion/report invariants and immutable retries; `scripts/challenge-check.cjs` exercises every item, wrong concepts/cuts, Learn navigation, exact copy quantities, report gating, actual browser download and laptop access. Detailed paired-marker/origin-span teaching animations and a classroom pilot remain pending; this expansion does not claim those earlier full lesson contracts are complete.
