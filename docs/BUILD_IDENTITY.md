# Build Identity

**Status: Requirements Recorded; Implementation Pending.** MeasureTwice currently contains planning documents only. This documentation change has no compiled/bundled game artifact, game version, release codename, PR build ordinal, or build timestamp. Do not invent one for a documentation commit.

## Required Convention

The first implementation/build pipeline must generate one immutable manifest containing MAJOR.MINOR.PATCH, the accepted release codename and filesystem-safe slug, build scope, PR number when known, scope-local ordinal, UTC build timestamp, full source revision, dirty/fingerprint information when relevant, target/configuration, and the complete canonical identifier.

The codename follows an agreed release milestone; it is not automatically tied to the middle version number. Establish the initial version, codename, and compatibility contract when implementation begins. Do not treat an unaccepted future name as settled.

Reserve each PR-local ordinal durably and atomically before producing an artifact. Every new artifact-producing invocation, including a rerun at the same source, consumes a new ordinal; failed reservations remain recorded. A re-download, retest, or redeployment of identical bytes keeps the identity. Outside a PR, use an explicit main, release, or local-session scope with its own counter. Never substitute a global CI run number for a PR-local ordinal.

Capture UTC once immediately before build metadata is injected, and propagate the same manifest to every surface. It is not page-load time, commit time, or documentation-edit time. Record the actual full built revision and, when relevant, both the CI merge revision and PR head. Never label dirty sources as a clean commit.

## Location Inventory

The paths below distinguish present documentation from future surfaces. Update this inventory with actual implementation paths/functions/jobs as they are added; no pending surface is implemented by this document.

| Surface | Current Location | Status and Required Check |
| --- | --- | --- |
| Contributor rule | AGENTS.md | Present; links here. |
| Design requirement | docs/game-design.md | Present; prominent readable UI identity required. |
| Current project status | README.md; ROADMAP.md | Present; accurately states no playable build. |
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
