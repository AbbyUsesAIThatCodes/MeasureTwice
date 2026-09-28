# Ruler Interaction

These proposed rules make the teacher's mark-or-empty-space interaction concrete. Refine them with the [curriculum mapping](curriculum-alignment.md) before implementation.

Apply these ruler settings within [Free, Learn, And Challenge](game-modes.md). Marked and empty-space settings are not extra top-level modes. Free allows chosen cuts and optional numeric readouts; Learn can reveal explanations and scaffolds; Challenge preserves an initial response before solution feedback. The source-mapped review/check entries live in [Curriculum Content](curriculum-content.md).

## Representations And Progression

Always display `in` or an unambiguous inch label. Fractions and decimals do not determine a unit by themselves.

| Practice | Example Prompt | Exact Position In Sixteenths | Status |
| --- | --- | --- | --- |
| Whole Inches | `2 in` | 32 | Core preparation. |
| Familiar Fractions | `3/4 in` | 12 | Core fractional-inch interpretation. |
| Equivalent Fractions | `6/8 in` | 12 | Same position as `3/4 in`; choose representations across distinct builds. |
| Smaller Intervals | `7/16 in` | 7 | Core sixteenth-inch interpretation. |
| Mixed Numbers | `1 3/16 in` | 19 | One whole inch plus three sixteenth-inch intervals. |
| Decimal Inches | `1.1875 in` | 19 | Proposed interpretation of numerical representation; a local extension beyond the audit's fractional-inch convention. |

Start with whole numbers and larger fractions, then reduce scaffolding as students work with eighths, sixteenths, equivalents, and mixed numbers. Decimal inches remain explicitly distinguished from the source's decimal-centimeter work. The first prototype can be fraction-first without losing decimal-inch prompts from the backlog.

## Hatch Marks And Empty Space

**Marked mode:** render accurate ruler subdivisions and let a student click at the requested graduation, including anywhere within the ruler's response band at that horizontal position. Do not require pixel-perfect contact with the thin printed line.

**Empty-space mode:** deliberately display a coarser scale while asking for a finer, exactly representable position. For example, show quarter-inch marks and request `3/8 in`, halfway between `1/4 in` and `1/2 in`. The target must visibly fall in blank space. Retain the surrounding marks so this assesses interval reasoning rather than guessing on an unanchored line.

This is a proposed interpretation of the teacher's empty-space requirement. It is a local transfer exercise; the source audit does not establish sparse-scale interpolation as a required PLTW task. Keep it selectable and explain it. Do not unexpectedly request thirty-seconds on a sixteenth-inch ruler in the initial content set.

## Fair Position Selection

- Anchor the measuring origin to the zero graduation, including examples where the zero numeral is hidden. Never assume the physical edge of the drawn ruler is zero.
- Map screen coordinates to a stable measurement axis. Camera perspective, browser zoom, screen resize, and interface panels must not change which value a location represents.
- Store targets exactly, using integer sixteenths for the first content set or reduced rational values. Displayed decimal strings must resolve to the same exact length rather than creating separate families through floating-point drift.
- Derive hit tolerance from the spacing between adjacent valid target positions. Acceptance regions must not overlap. Preserve a usable ruler size or provide magnification when a laptop view makes nearby values too close to select fairly.
- Apply the same correctness rule to pointer and keyboard selection. An arrow-controlled marker and explicit commit key are a proposed keyboard path; its step size must permit all targets, including empty-space targets.
- A cursor guide may indicate the selected position. Do not highlight the correct answer or display an automatically solved target before an unassisted response. Any numeric cursor readout that helps solve the task must be treated as a scaffold and recorded as assistance.
- Offer graduated hints: find the whole-inch interval; identify how many equal subdivisions it contains; count from zero. Show equivalence explanations after a response or a requested hint.

## Acceptance Examples For The Future Implementation

| Situation | Expected Behavior |
| --- | --- |
| `1 3/16 in` on a sixteenth-inch scale | Accept 19/16 inch; reject 3/16 inch. |
| `3/4 in`, `6/8 in`, and `0.75 in` | All normalize to one length and one cut family within a build. |
| `3/8 in` with quarter-inch marks | The accepted position is between printed marks, with nonoverlapping tolerance. |
| Ruler edge precedes zero | Measuring still starts at the zero graduation. |
| Wrong answer followed by a correct retry | One successful cut; the attempt history preserves the retry. |
| Double click during the cutting animation | One family completes and the model receives its specified total quantity once. |
| Four equal pieces needed | Original plus three visible copies; four placements and one answered target. |
| Animation skipped or reduced | Same lengths, quantities, placements, and progress as full animation. |

These are planned acceptance criteria. No software tests or playtests have been run because implementation has not begun.
