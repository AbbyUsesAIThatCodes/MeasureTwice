# Build Identity

**Status: Local Review And Pages Build Pipelines Implemented; Pages Deployment Awaits Owner Setup.** The archived [Approved Workshop Mockup](mockups/predict-cut-inspect/README.md) remains unchanged and keeps its historical interface-study identity. The application uses development version 0.1.0 and provisional review codename Predict Cut Inspect, drawn from that accepted study. The teacher has not accepted a production release name or compatibility contract. See [Pages Deployment](PAGES.md) for the owner setup and merge-trigger behavior.

## October 3 Local Review

See [Current Review](CURRENT_REVIEW.md). Abigail uses explicit local scope and `.build-state/<hostname>/` for atomic reservations. PR-scoped allocation remains restricted to Jess_PC and is not relabelled on another machine. The local manifest records the actual host, source, dirty state and fingerprint. Source, console, immutable artifact directory, ZIP, visible footer, report and evidence agree on one ID. Earlier Pages setup/deployment statements above describe their historical preparation, not this branch’s deployment state.

## Current Implementation Inventory

| Surface | Authoritative Location | Verification |
| --- | --- | --- |
| Version, codename, compatibility | `release.json` | Development review; reload resets sessions. |
| Atomic allocation | `scripts/identity.mjs`; persistent `C:\Users\jessg\Documents\Codex\2026-09-29\task-3\build-ledger` on Jess_PC | Exclusive receipt creation; all PR-scoped clones use this one allocator; PR scope refused on other hosts. Back up this ledger before moving build machines. |
| Local build entrypoint and console | `scripts/build.mjs` | Preserved one timestamp; start/success/failure ID; explicit local/PR scope. |
| Pages entrypoint and reservation | `scripts/build-pages.mjs`, `scripts/pages-identity.mjs` | `main-run-<GITHUB_RUN_ID>` scope with monotonic `GITHUB_RUN_ATTEMPT` ordinal; exclusive attempt receipt; exact clean event SHA required. Local Pages builds share the existing local/PR ledger. |
| Pages output and payload | `dist/pages/<full-id>/MeasureTwice/`; `scripts/pages-output.mjs` | One timestamp, full source SHA/fingerprint, target `pages`, project base path; allowlisted tracked static inputs and pinned Three.js runtime. Local launcher is outside payload. |
| Pages artifact and workflow | `.github/workflows/pages.yml` | Full ID is the single one-day artifact name; passed unchanged to dependent deployment. Main push/owner-dispatch only, no PR trigger or cache. No settings or hosted run performed during preparation. |
| Pages UI, report and summary | Generated `build-manifest.json`, `BUILD_REPORT.json`; existing footer; Actions build summary | Same manifest identity. `latest-pages.json` is an ignored local pointer; a built report is not evidence of deployment. Actual deployment status/URL is the owner-run deploy job. |
| Pages verification | `tests/pages.test.mjs`, `scripts/check-pages.mjs`, `scripts/pages-browser-check.cjs` | Run/rerun uniqueness, rejected PR/feature/fork contexts, tracked-input boundaries, manifest agreement and browser check at `/MeasureTwice/`. |
| Source provenance | Build manifest | Full SHA, dirty flag and SHA-256 of application, copied docs, data, dependency lock and build scripts. |
| Artifact directory | `review-builds/<full-id>/` | Immutable new directory for every invocation. Failed reservations remain consumed. |
| Manifest and current artifact report | `build-manifest.json`, `BUILD_REPORT.json`, `REVIEW.txt` inside each artifact | Same full ID. `latest-review.json` is an ignored local pointer to the newest artifact. |
| Visible game footer | `public/index.html#build-id`; `src/app.js` | Copyable, wrapping full manifest identity. |
| Review handoff | `docs/IMPLEMENTATION_REVIEW.md`, `docs/REVIEW_CHECKLIST.md`, draft PR bodies | Exact per-PR artifact IDs and final tested source supplied in the PR handoff. |
| Workshop visual repair evidence | `scripts/visual-check.cjs`, `test-results/<full-id>/visual-verification.json`; `docs/WORKSHOP_VISUAL_REVIEW.md` | Real rendered geometry, cut-state checks, viewport/camera sweep and screenshots carry the artifact identity; saved review evidence preserves its built source even when committed later. |
| Downloadable Challenge report | `src/assessment.js`, `src/learning.js`; `<full-id>_Challenge-Report.txt` | Report reads the immutable build manifest; its export time is separately labeled and never replaces the build timestamp. Full source SHA/fingerprint, content and construction revisions accompany project/step/exercise history. |
| Sequential construction review | `scripts/sequential-check.cjs`, `scripts/sequence-access-check.cjs`; `test-results/<full-id>/` | Three model screenshots, exact artifact browser results, and actual downloaded report retain the full build identity. Later evidence commits never relabel earlier build folders. |
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

## Catalog Header And Evidence Inventory

The October 3 explicit owner revision replaces the full-ID footer with `src/build-display.js`'s compact version, codename, actual scope/ordinal and source beneath Measure Twice. No timestamp appears on that line. `public/dm-bellringer-cube.svg` is the verified bellringer mark. Full ID/time/source/fingerprint remain in Build Details, manifests, console, folder/ZIP names and exports.

Current catalog locations: `src/catalog.js` (full-ID build report and progress JSON), `src/catalog-progress.js` (browser progress), `scripts/catalog-browser-check.cjs` and `scripts/catalog-access-check.cjs` (identified browser evidence), and `review-evidence/catalog/` (immutable artifact plus checks/screenshots). Local scope `local-abigail-catalog` uses the local ledger and port 18444. PR #32's old scope/artifact remains unchanged.

## October 4 Local Pages Promotion

[Locally Verified Pages Release](LOCAL_PAGES_RELEASE.md) is the current publication path. `site/` contains the unchanged identified runtime; `deployment/payload.json` records the separate deployment inventory. The manual-only workflow validates and publishes these bytes without rebuilding, relabeling or changing build counters. Runtime source and release-orchestration commit remain distinct.
