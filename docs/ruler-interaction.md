# Ruler Interaction

Follow the approved [Game Design](game-design.md). The student chooses a length, sees neutral stock movement, and commits with Cut. Correctness appears during inspection after the saw runs. This replaces the earlier answer gate.

## Representations

Always display in or an unambiguous inch label. Fractions and decimals do not identify a unit by themselves.

| Prompt | Exact Position in Sixteenths | Status |
| --- | --- | --- |
| 2 in | 32 | Whole-inch preparation. |
| 3/4 in | 12 | Core fractional-inch interpretation. |
| 6/8 in | 12 | Equivalent fraction; same physical family as 3/4 in. |
| 7/16 in | 7 | Core sixteenth-inch interpretation. |
| 1 3/16 in | 19 | Core mixed-number interpretation. |
| 1.1875 in | 19 | Decimal-inch local extension, not the audit's decimal-centimeter G14 target. |

Use whole inches and larger fractions before reducing support for eighths, sixteenths, equivalents, and mixed numbers. The final ruler span and house schedule remain in issue #1.

## Full Tick Pattern

The teacher clarified on October 1: always draw all 15 interior sixteenth-inch hatch marks between inch marks, across Free Play, Learn, Challenge, denominator settings and existing zooms. Whole-inch, half, quarter, eighth and sixteenth marks retain their descending tick lengths. Only whole inches receive numerical scale labels; no target-solving annotation is added. The earlier sparse-ruler display proposal is superseded.

The denominator setting remains the existing practice context, not a filter on visible marks. Students map halves, quarters, eighths and sixteenths onto the same inch: 1/2, 2/4, 4/8 and 8/16 share one physical position. An eighth spans two smallest intervals, a quarter four and a half eight; counting every adjacent hatch as the requested denominator would be incorrect. Questions, lesson prompts, exact targets, scoring and session/report records remain unchanged. Pointer and keyboard input already select every sixteenth regardless of denominator; keep that precision and the existing magnification/scroll behavior. Selection accepts the same target-independent response bands without requiring contact with a hairline mark.

## Selection and Stock Movement

- Measure from the zero graduation, including examples with an inset physical edge or an unprinted zero numeral. A fixed automatic origin only scaffolds placement; it does not demonstrate physical ruler alignment.
- Map selection to a stable axis independent of camera perspective, panel size, browser zoom, or viewport changes.
- Store core values as integer sixteenths or exact rational values. Normalize equivalent representations for part families.
- Apply a target-independent candidate/tolerance rule. If snapping is used, snap consistently to all selectable positions, never specifically to the answer. Adjacent acceptance regions must not overlap.
- Keep the ruler large enough or offer magnification to make adjacent positions distinguishable. Define the final tolerance and verify it when actual geometry is implemented.
- Show a neutral pencil mark and move the board so that selected cut line reaches the fixed saw. Keep the starting-end reference coherent; do not realign zero to a misleading physical edge.
- Allow prediction revisions before Cut. A click or arrow movement is not an attempt. Pointer and keyboard use the same commit action and numerical rule.
- In Challenge, suppress target-solving cursor numbers, target ghosts, target cut lines, correctness colors, and answer-dependent motion before Cut. Free Play can show values; Learn supports and fades them explicitly.

## Cutting and Inspection

Every valid committed selection produces a retained piece of its selected length, including wrong answers. Stock limits and positive length define validity, not proximity to the answer. Treat visible kerf as cosmetic or compensate the retained side so it remains exact.

Compare actual and target spans from a common starting end and at a common scale. If selected > target, shade the excess red and put a red line at the target. If selected < target, draw the missing extension as translucent red. Display Needed, Your Piece, and the simplified difference with units. A correct piece glows green and receives a checkmark.

Hold for Keep Piece or Try Again. A rejected piece moves left; an accepted one moves right to staging, duplication, and assembly. Full, skipped, and reduced-motion routes all preserve these results. No extra attempt is created by revisiting inspection.

## Acceptance Examples

| Situation | Required Outcome |
| --- | --- |
| Target 1 3/16 in, selected 3/16 in | Cut the short piece; inspection shows 1 in missing. No pre-cut correctness clue. |
| Target 1 1/4 in, selected 1 1/8 in | Cut 18/16 in; show a 2/16 = 1/8 in red ghost extension. |
| Target 1 1/4 in, selected 1 3/8 in | Cut 22/16 in; show the target cut line and 2/16 = 1/8 in red excess. |
| Target and selected both 7/16 in | Cut once, inspect green, await Keep Piece, then advance the family once. |
| 3/4 in, 6/8 in, 0.75 in | Same exact length; one successful family per build, with decimal coverage labeled as an extension. |
| 3/8 in with Quarters selected | All sixteenth marks remain visible; select the sixth sixteenth at the same physical position as three eighths. Pointer and keyboard use the unchanged response bands. |
| Wrong cut followed by a correct retry | Two committed attempts and two cuts, but only one accepted family and one allocation of its required parts. |
| Marker moved five times before Cut | One committed attempt, not five. |
| Four equal parts required | Original plus three copies, four placements, one successful measurement. |
| Double Cut or repeated acknowledgement | One transition; no duplicate attempt, retained piece, family, or copies. |
| Animation skipped or motion reduced | Arrive at inspection with identical length and feedback; acknowledgement still required. |
| Free Play without target | Cut any valid chosen length and inspect neutrally; no invented correctness. |

These are production acceptance examples, not completed implementation checks. The [archived mockup's verification record](mockups/predict-cut-inspect/README.md#verification-record) reports syntax and headless logic checks plus the teacher's visual acceptance of the original study. Those checks do not establish production input geometry, browser accessibility, or laptop performance. No production game or classroom pilot has been tested.
