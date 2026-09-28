# Free, Learn, And Challenge

The teacher's September 27, 2026 direction establishes **Free**, **Learn**, and **Challenge** as the preferred three-mode structure across our educational games. This document applies that shared pattern to MeasureTwice; it does not claim the other game repositories have been updated.

## Mode Contract

| Mode | Purpose | MeasureTwice Behavior | Learning Evidence |
| --- | --- | --- | --- |
| Free | Experiment freely with the tools. | Choose a length, move the ruler marker, inspect equivalent representations, cut wood, duplicate pieces, and inspect/reset the result. No prescribed question sequence or required model completion. | Exploration only; do not report experimentation as passed comprehension checks. |
| Learn | Review fundamentals through a freely navigable lesson menu. | Open any available review, see a worked example, try guided ruler interactions, request hints, and return to the menu or revisit a lesson at any time. | Supported practice, with assistance identified. |
| Challenge | Check comprehension of documented curricular content. | Respond to source-mapped measurement tasks before seeing their answers, then receive feedback and a goal-specific result. Correct cut tasks feed the construction loop. | Keep the first unassisted response separate from hinted attempts and retries. |

Use these exact three mode names in the main menu and navigation. Marked and empty-space ruler settings are options within the modes, not additional top-level modes. All three use the same exact measurement values, ruler geometry, and wood lengths.

## Free

Free has no right-answer gate: a valid selected length can be cut without matching a hidden target. Give students control of the ruler settings, measurement display, duplication, and reset within supported tool ranges. Numeric cursor readouts and equivalent fractions are useful here. Do not impose a lesson order, countdown, score, or failure penalty.

Students may deliberately repeat an experiment. The cut-once rule means that a model never *requires* repeated answers for the same length; it does not prohibit voluntary recutting in Free. If a student experiments with a model, offer reuse/duplication of an existing length. Free does not initially require a general-purpose CAD or arbitrary model-building editor.

## Learn

Present a freely navigable menu of fundamental reviews, starting with the proposed entries in [Curriculum Content](curriculum-content.md). A suggested order may help students choose, but completing one review must not unlock another. Every review can be opened, revisited, or left directly.

Each lesson needs a plain-language objective, a thorough link to the Curricular Planning Document, a worked explanation, an interactive example, useful feedback, and an optional practice opportunity. Explain equal intervals and the zero reference before reducing support; let learners choose where to begin. Any progress indicators describe visits or practice, not automatic mastery.

## Challenge

Challenge checks comprehension; difficulty comes from the measurement reasoning. Speed, time limits, a leaderboard, and punishment are not implied by the mode name. Use untimed checks initially.

Every challenge needs an explicit curricular basis, a defined student response, an exact answer or justified acceptable range, a scoring/interpretation rule, and misconception-aware feedback. Do not reveal the solution or a target-solving cursor readout before the initial response. Accessibility controls such as keyboard input and magnification remain available.

After a response, give an explanation and a direct link to the relevant Learn review. Allow a retry, while preserving the original result separately. If a learner asks for a hint, record the assisted attempt as practice. Keep any completion requirement distinct from an unassisted comprehension result. Do not invent a mastery percentage without a reviewed assessment plan.

Within a model build, each normalized length is required once and supplies all its copies. A separate comparison/explanation check can examine fraction equivalence without requiring another cut. Check variants can reuse a length in a new session without violating that build rule.

## Curriculum Access

Provide a **Curriculum** entry reachable from the main menu and each mode. Each Learn lesson and Challenge task also links to its own **What This Practices** entry. Show the learning objective, related review/check, and a link to the relevant class repository and planning document. Preserve the current document revision and exact source locators in the maintained developer/teacher record.

[Curriculum Content](curriculum-content.md) is the content index; [Curriculum Alignment](curriculum-alignment.md) owns source revisions, identifier rules, and coverage limits. Keep the student-facing explanation useful without exposing development metadata in the normal play flow. Source links may require teacher access to the private DM repository; all original explanations and playable content must work without that access.

## Shared State And Boundaries

Students can switch modes through clear navigation. Keep Free experiments, Learn practice, and Challenge results distinct; exploring an answer must not silently mark a comprehension check as passed. Preserve or explicitly reset a mode's work when switching, and document the final behavior. Mode switches must not duplicate parts or award answers during an unfinished animation.

The shared three-mode structure is teacher-directed. The examples, content sequence, result presentation, and exact controls remain design proposals. Implementation and classroom verification are still pending.
