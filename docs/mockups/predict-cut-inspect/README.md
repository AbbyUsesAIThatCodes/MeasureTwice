# Approved Workshop Mockup

**Approved September 28, 2026 (America/New_York).** This preserves the interactive MeasureTwice mockup the teacher reviewed and explicitly accepted in the project conversation. It is the visual and interaction reference for implementation, alongside the authoritative [Game Design](../../game-design.md).

## Open the Mockup

From the repository root, run:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Then open <http://127.0.0.1:8000/docs/mockups/predict-cut-inspect/index.html> in a desktop browser with WebGL enabled. Stop the server with Ctrl+C. No npm install or game build is required. GitHub's file viewer shows source; it does not run the mockup. No hosted deployment is included.

The preview imports Three.js **0.180.0** from `cdn.jsdelivr.net` and requires an internet connection. Its workshop geometry and textures are procedural; no private course assets or student data are included. The standalone shell isolates the preview in an iframe. If its Curriculum link does not open in that shell, use [Curriculum Content](../../curriculum-content.md) here.

## Files and Provenance

| File | Purpose |
| --- | --- |
| [index.html](index.html) | Standalone browser export containing the approved fragment and its preview shell. |
| [source.fragment.html](source.fragment.html) | Exact editable HTML/CSS/JavaScript fragment shown in the conversation, preserved without gameplay or visual changes. |

Source SHA-256: `dc9a6aa15a42497c54bb52d3fc6d72d5fa6a358904ff7950dd1c86d1954ad992`.

The export embeds that fragment verbatim. The shell was generated with the visualization export helper; the committed export runs without that helper. Preserve this approved snapshot and make subsequent implementation changes in the application or a separately named study. The earlier Check & Cut concept is superseded and is not this reference.

This is an archived interface study, with the visible footer “Interface Study · Predict, Cut, Inspect.” It is not a production release or an implementation of the game's pending build pipeline. No game version, release codename, PR build ordinal, or classroom-readiness claim is assigned by this archive. See [Build Identity](../../BUILD_IDENTITY.md) before producing game builds.

## Review the Interaction

Challenge opens with a **1 1/4 in** wall-upright target. Click the ruler or use the left/right buttons to revise a neutral prediction. The plank moves under the stationary saw; **Cut** commits it. Correctness appears in the inspection after cutting and camera travel.

| Selected Length | Inspection | After Acknowledgement |
| --- | --- | --- |
| 1 1/8 in | 1/8 in too short; red missing extension. | Try Again rejects left and supplies fresh stock for the same target. |
| 1 3/8 in | 1/8 in too long; target line and red excess. | Try Again rejects left and supplies fresh stock for the same target. |
| 1 1/4 in | Green confirmation and checkmark. | Keep Piece stages right, creates three copies of the original, and places four uprights. |

Inspection waits for acknowledgement. Reduced Motion and Skip Animation reach the same comparison. Replay Preview restarts the study. Free Play demonstrates neutral inspection without a target; Learn exposes all five lesson choices with short guidance and sample targets.

## Implementation Boundaries

- The model stops after four wall uprights. The ghost house is visual context, not an approved complete cut schedule or proof of valid roof/joint geometry. Issue #1 must define and check the whole house.
- The 0–3 in ruler, sixteenth-inch steps, sample measurements, camera path, particles, and timings are demonstration choices. Confirm production scale and access through implementation and laptop testing.
- Learn contains menu entries and brief sample guidance, not the five complete worked lessons in [Curriculum Content](../../curriculum-content.md). Challenge does not implement the six-item assessment or first-response/assistance records.
- Mode changes and Replay reset this study. Production must follow [Game Modes](../../game-modes.md): separate retained mode sessions and preserved committed attempts. This shortcut does not amend that requirement.
- Complete keyboard interaction, focus behavior, magnification, mute, persistence, scoring, and classroom validation remain implementation work. The study uses Three.js; the production engine decision remains in issue #2.

## Next Conversation Handoff

1. Begin with [Issue #1 — Finalize the First House and Curriculum Scope](https://github.com/AbbyUsesAIThatCodes/MeasureTwice/issues/1). Read [Contributor Instructions](../../../AGENTS.md), the game design, this approved reference, and the curriculum records. Recheck current main, open work, and the primary-source status. Deliver exact part lengths and quantities, distinct normalized length families, placements, stock/ruler limits, and prompt distribution in a bounded planning PR.
2. Continue with [Issue #2 — Prototype Ruler Selection and Cut Commitment](https://github.com/AbbyUsesAIThatCodes/MeasureTwice/issues/2), using the reviewed schedule and this interface direction. Establish the engine, build identity, exact arithmetic, pointer/keyboard input, neutral stock movement, and once-only Cut commitment. The remaining animation, assembly, mode, and curriculum work stays in its existing issues; see the [Roadmap](../../../ROADMAP.md).

Keep the core agreement: every valid prediction is cut; reveal red/green correctness only afterward; hold inspection for the student; reject left or stage right; count the accepted original among the required copies; never stretch a piece to fit.

Curricular trace: the ruler task practices DM 1.3 G10–G13, supported by G07 and G16; the fit comparison provides G08 context. The source record is [Curriculum Alignment](../../curriculum-alignment.md). A committed endpoint is limited measurement evidence. Fixed zero, Learn guidance, and post-cut diagnoses are scaffolds; viewing those diagnoses or automatic assembly does not demonstrate independent reasoning or full mastery. This archive introduces no new curricular goals or assessment items.

## Verification Record

- Confirmed the archived fragment is byte-for-byte identical to the approved source and is embedded unchanged in the standalone export.
- JavaScript syntax check passed. A headless logic harness using real Three.js geometry and a stub renderer passed short/long/correct outcomes, four-piece duplication, same-target retries, duplicate-commit prevention, neutral Free Play, Learn selection, and skipping into held inspection, including stale-animation callback cancellation.
- The teacher visually reviewed and accepted the original interactive mockup. Automated WebGL/browser layout verification of the standalone export was unavailable; the logic harness does not validate rendering, browser accessibility, or laptop performance. No production game or classroom pilot has been tested.
