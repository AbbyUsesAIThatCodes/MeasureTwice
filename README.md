# MeasureTwice

A bright, cartoony 3D measuring woodshop for **Design And Modeling, Activity 1.3 — Measuring Matters**.

Read a requested inch measurement, choose its position on a ruler, and watch the plank move beneath the saw. Press **Cut** to commit the prediction. The saw cuts the selected length, correct or incorrect, with a shower of cartoony sawdust. The piece swings toward the camera for an inspection that compares what was cut with what was needed.

Correct pieces glow green and move into the right-hand stack before duplication and assembly. Incorrect pieces show red excess or a red ghost of the missing material, then move off-screen left after the student chooses Try Again. Correctness appears only after Cut; selection feedback is neutral.

**One successful measurement per distinct required length.** Retries are allowed. Repeated model parts come from visible copies of the accepted original, never repeated correct answers for the same length.

The current Challenge automatically builds a **chair, plane and house exterior** through twenty-five active mapped exercises. Each part follows measure, Cut, held inspection, confirmation and placement before the next part appears. Build Progress is review/status. All objectives and all three builds are required for the offline teacher report; original answers, retries and assistance remain separate. See [Current Challenge Review](docs/CHALLENGE_REVIEW.md).

## Start Here

- [Game Design](docs/game-design.md): the approved foundation, full predict–cut–inspect loop, feedback, staging, access, and remaining decisions.
- [Approved Workshop Mockup](docs/mockups/predict-cut-inspect/README.md): the accepted interactive reference, runnable export, exact source, and next-conversation handoff.
- [Approved Direction Review](docs/direction-review.md): post-merge consistency findings, reference precedence, and remaining implementation boundaries.
- [Free Play Learn and Challenge](docs/game-modes.md): the three modes and their support/evidence rules.
- [Curriculum Content](docs/curriculum-content.md): five Learn scripts and 25 active Challenge exercises with goal mappings and an offline completion report.
- [Curriculum Alignment](docs/curriculum-alignment.md): class sources, revision status, identifier rules, and coverage limits.
- [Ruler Interaction](docs/ruler-interaction.md): exact values, neutral selection, stock movement, fair input, and acceptance examples.
- [Roadmap](ROADMAP.md): existing issues and bounded handoffs.
- [Build Identity](docs/BUILD_IDENTITY.md): requirements and location inventory for the first build pipeline.
- [GitHub Pages Deployment](docs/PAGES.md): owner setup after merge, automatic main deployment behavior, and local project-path validation.
- [Design Brief](docs/design-brief.md): founding concept and the superseded correct-answer gate.
- [Contributor Instructions](AGENTS.md): rules for preserving the agreed design.

## Status

**Integrated Local Review — October 1, 2026 UTC.** The unchanged accepted mockup remains preserved. The review application builds a chair, plane and house exterior through 25 active Challenge objectives and seven additional construction measurements. Supplied-piece fit questions are retired; the 104 measured pieces and original 17-member frame remain. All ruler marks are visible, and held inspection clears old comparison previews. See [Current Challenge Review](docs/CHALLENGE_REVIEW.md). This branch remains a teacher review pending classroom pilot; production is unchanged by this local revision.

Build from source with `pnpm install --frozen-lockfile --ignore-scripts`, then `node scripts/build.mjs local-your-session`. Run the printed review directory's `Start Review.cmd` or `node serve.mjs . 18443`. Each artifact includes its pinned Three.js dependency and works without external runtime requests. See the draft PR handoff for exact snapshot identities; never substitute the archived four-upright reference for the new complete-house build.

The curricular home is [DesignAndModeling26-27](https://github.com/AbbyUsesAIThatCodes/DesignAndModeling26-27), especially [1.3 Measuring Matters](https://github.com/AbbyUsesAIThatCodes/DesignAndModeling26-27/tree/main/units/01-introduction-to-design/1.3-measuring-matters). Its goals document is currently in draft PR #21; pinned source links are maintained in the alignment record. The public game must work without access to the private class repository. This repository contains original planning and references, not the proprietary course archive.

Target student laptops with mouse/trackpad and keyboard access. Use a fullscreen 3D workshop, readable rulers, and compact overlays. Phone optimization is outside the classroom scope.
