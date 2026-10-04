# Local Release Validation

Validated 2026-10-04T14:44:45.984Z on Abigail against the exact public payload.

Build: `0.1.0_Predict-Cut-Inspect_local-abigail-catalog_build-005_20261003T225833Z_g6479bb949b7d_web`. Runtime source: `6479bb949b7d19e4ae0e9b79b4edf67de7fea007`.

- Unit tests: **40 passed; zero failed**.
- Browser suites: **3 passed**. All four models, 37 assembly cycles, ten Learn stages, seven instruments, input/access, persistence and replay passed.
- Public-path, identity, runtime-byte and exclusion checks passed. The local rollback snapshot loads.
- Workflow YAML is manual-only and main-only, with one standard Ubuntu publishing job and one-day artifact retention. No hosted build, browser test, package install or cache step.

[Machine-Readable Validation](LOCAL_VALIDATION.json) records hashes of retained local evidence. Raw screenshots, synthetic response downloads and local paths remain outside the public repository. Hosted CI was not run. Physical school-device/projector/screen-reader checks remain separate.
