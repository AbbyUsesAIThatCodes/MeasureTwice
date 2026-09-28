# MeasureTwice Roadmap

## Current Position

The teacher's September 27, 2026 concept is preserved in the [Design Brief](docs/design-brief.md). Curriculum mapping and proposed ruler rules are recorded. **No game implementation, classroom playtest, or deployment is complete.**

## Planned Work

| Order | Work | Completion Evidence |
| --- | --- | --- |
| [#1](https://github.com/AbbyUsesAIThatCodes/MeasureTwice/issues/1) | Refine the curriculum slice, representations, and first model's measurement schedule. | A short target set mapped to the current DM audit; core/extension status and prompt wording are explicit. |
| [#2](https://github.com/AbbyUsesAIThatCodes/MeasureTwice/issues/2) | Prototype the ruler with marked and empty-space modes. | Correct zero, exact values, fair tolerances, equivalent fractions, and usable mouse/trackpad/keyboard controls. |
| [#3](https://github.com/AbbyUsesAIThatCodes/MeasureTwice/issues/3) | Create the animated wood-feeding and cutting sequence. | A successful answer visibly produces the requested retained length once; wrong responses do not trigger it. |
| [#4](https://github.com/AbbyUsesAIThatCodes/MeasureTwice/issues/4) | Add visible duplication and one complete model. | Each unique length is requested once, total part quantities match the model, and every part fits without stretching. |
| [#5](https://github.com/AbbyUsesAIThatCodes/MeasureTwice/issues/5) | Add airplane, tree, and selected Dash models. | Each model has a reviewed cut schedule, readable silhouette, and the same measurement/duplication rules. |
| [#6](https://github.com/AbbyUsesAIThatCodes/MeasureTwice/issues/6) | Prepare teacher coverage and a classroom laptop pilot. | Guide, independent transfer check, access options, and real playtest findings for an identified version. |

The six issues form the initial backlog. Work flows through #1 → #2 → #3 → #4; the model collection (#5) and classroom preparation (#6) follow the complete first loop. Extra models are not required for the first classroom pilot.

## First Playable Milestone

One house; a short fraction-first sequence; a readable ruler; specific retry feedback; the full feed/cut/duplicate/assemble loop; a completion view that distinguishes answered lengths from assembled parts. Mark-or-space selection, exact equivalence, and duplicate counts must be correct before expanding the model collection.

Choose the engine and publishing setup during the prototype task, after checking available project conventions and laptop constraints. This planning record does not commit to a framework or create a play URL.

## Tomorrow's Starting Point

Review the [three mechanics](docs/design-brief.md#three-connected-mechanics) and the [representation progression](docs/ruler-interaction.md#representations-and-progression). Then settle the first house's geometry and distinct lengths. Proposed decisions to refine are the final ruler span, prompt mix, amount of scaffolding, decimal-inch placement in the sequence, empty-space presentation, and animation pace.

These decisions are saved for the next design conversation; they do not block preservation of tonight's concept. Advance through small implementation PRs after the first scope is concrete.
