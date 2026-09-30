# Build Identity

**Status: Local Review Pipeline Implemented; No Production Deployment.** The archived [Approved Workshop Mockup](mockups/predict-cut-inspect/README.md) remains unchanged and keeps its historical interface-study identity. The application uses development version 0.1.0 and provisional review codename Predict Cut Inspect, drawn from that accepted study. The teacher has not accepted a production release name or compatibility contract.

## Current Implementation Inventory

| Surface | Authoritative Location | Verification |
| --- | --- | --- |
| Version, codename, compatibility | `release.json` | Development review; reload resets sessions. |
| Atomic allocation | `scripts/identity.mjs`; persistent `C:\Users\jessg\Documents\Codex\2026-09-29\task-3\build-ledger` on Jess_PC | Exclusive receipt creation; all local clones use this one allocator; PR scope refused on other hosts. Back up this ledger before moving build machines. |
| Build entrypoint and console | `scripts/build.mjs` | One timestamp; start/success/failure ID; explicit scope; no workflow or CI job. |
| Source provenance | Build manifest | Full SHA, dirty flag and SHA-256 of application, copied docs, data, dependency lock and build scripts. |
| Artifact directory | `review-builds/<full-id>/` | Immutable new directory for every invocation. Failed reservations remain consumed. |
| Manifest and current artifact report | `build-manifest.json`, `BUILD_REPORT.json`, `REVIEW.txt` inside each artifact | Same full ID. `latest-review.json` is an ignored local pointer to the newest artifact. |
| Visible game footer | `public/index.html#build-id`; `src/app.js` | Copyable, wrapping full manifest identity. |
| Review handoff | `docs/IMPLEMENTATION_REVIEW.md`, `docs/REVIEW_CHECKLIST.md`, draft PR bodies | Exact per-PR artifact IDs and final tested source supplied in the PR handoff. |
| Automated checks | `tests/identity.test.mjs`; browser evidence | Eight simultaneous reservations are distinct; reserved/failed attempts stay consumed; artifact reopens preserve metadata. |

Initial PR #13 artifact used a temporary ledger during setup. Those existing reservations were copied to the persistent allocator before further PR builds, preserving PR #13 build 001. Historical review identities remain unchanged. This local designated allocator is not a distributed build service; do not independently allocate the same PR scope on another machine.

## Required Convention

The first implementation/build pipeline must generate one immutable manifest containing MAJOR.MINOR.PATCH, the accepted release codename and filesystem-safe slug, build scope, PR number when known, scope-local ordinal, UTC build timestamp, full source revision, dirty/fingerprint information when relevant, target/configuration, and the complete canonical identifier.

The codename follows an agreed release milestone; it is not automatically tied to the middle version number. Establish the initial version, codename, and compatibility contract when implementation begins. Do not treat an unaccepted future name as settled.

Reserve each PR-local ordinal durably and atomically before producing an artifact. Every new artifact-producing invocation, including a rerun at the same source, consumes a new ordinal; failed reservations remain recorded. A re-download, retest, or redeployment of identical bytes keeps the identity. Outside a PR, use an explicit main, release, or local-session scope with its own counter. Never substitute a global CI run number for a PR-local ordinal.

Capture UTC once immediately before build metadata is injected, and propagate the same manifest to every surface. It is not page-load time, commit time, or documentation-edit time. Record the actual full built revision and, when relevant, both the CI merge revision and PR head. Never label dirty sources as a clean commit.

## Historical Pre-Implementation Inventory

The table below preserves the September 28 planning snapshot. Its pending entries are historical; the current implementation locations are listed above.

| Surface | Current Location | Status and Required Check |
| --- | --- | --- |
| Contributor rule | AGENTS.md | Present; links here. |
| Design requirement | docs/game-design.md | Present; prominent readable UI identity required. |
| Current project status | README.md; ROADMAP.md | Present; distinguishes the approved interactive study from a production game build. |
| Archived interface study | docs/mockups/predict-cut-inspect/source.fragment.html; index.html; README.md | Preserved approved source and standalone shell; source SHA-256 and verification record in the adjacent README. Visible Interface Study footer; not a production build identity surface. |
| Release record | None yet | Pending issue #2; choose one authoritative version/codename source. |
| Build manifest and ordinal ledger | None yet | Pending issue #2; durable serialized/atomic allocation and immutable manifest. |
| Local and CI build entrypoints | None yet | Pending issue #2; print identical full ID at start and success/failure, including child stages and CI summary. |
| Artifact filename or outer directory | None yet | Pending issue #2; full ID in filename/enclosing distribution while preserving index.html and stable routes. |
| Prominent in-game footer/overlay | None yet | Pending initial UI; complete legible, wrappable, copyable ID from the manifest, not only in a tooltip/About/console. |
| Current build and verification report | None yet | Pending first artifact; generated from manifest, with deployed and review builds distinguished. |
| PR template | None yet | Pending repository tooling; add a link here when introduced. |

## Verification Gate

Before claiming the first build identity implementation complete, compare the actual build console, artifact name, embedded manifest, prominent game display, and current report. Verify two builds get different IDs, reuse preserves an existing ID, and concurrent allocation cannot collide. Keep historical identifiers intact. Update documentation without generating a self-referential rebuild loop.

This records the teacher's standing requirement. It does not authorize a release, merge, or deployment by itself.
