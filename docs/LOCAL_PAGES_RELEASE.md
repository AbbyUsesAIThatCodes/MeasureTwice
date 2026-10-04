# Locally Verified Pages Release

## Release Candidate

Promote `0.1.0_Predict-Cut-Inspect_local-abigail-catalog_build-005_20261003T225833Z_g6479bb949b7d_web`, built 2026-10-03T22:58:33.060Z from clean runtime source `6479bb949b7d19e4ae0e9b79b4edf67de7fea007`. Gameplay, lesson sequence, save keys and existing build identity are unchanged. Copying the existing artifact consumes no new build ordinal. The merge commit identifies release orchestration; the app manifest identifies the actual runtime build.

The October 4 owner approval covers bounded release preparation, source/workflow pushes, consolidated PR integration and Pages publication for this game. Previous no-deployment statements describe the earlier review phase. Mean Machine and unrelated projects are outside this release.

## Public Payload

Only `site/` is uploaded. `deployment/payload.json` inventories every path, byte count and SHA-256; `node deployment/verify.mjs` rejects additional or altered files, links, unsafe names, incorrect identity and payloads over 5 MiB. Archive launchers, review evidence, teacher keys, worksheet authoring files, private documents and student records are excluded. The old public curriculum path now serves an original student reference; the reviewed JavaScript is byte-identical.

## Local Checks And Publication

Run the required model/browser suites on Abigail against this payload and record their results in `deployment/LOCAL_VALIDATION.md`. Do not substitute old PR CI results for this release check. Inspect the full main-to-candidate diff and preserve all earlier branches and artifacts.

The workflow is manual-only, main-only and uses the existing Pages configuration. A merge alone does not run Actions. After allowance/storage is confirmed, dispatch pages.yml on main with `expected_build_id` equal to the exact ID above. One standard Ubuntu job verifies hashes, uploads one artifact with one-day retention, and deploys. It installs no project dependencies, builds nothing, runs no browser suite and creates no Actions cache. No settings or billing changes are needed.

After success, verify the real public URL, rendered identity, loaded runtime hashes, reference links and essential worksheet flows in a fresh browser. Report any physical school-device testing limits.

## Rollback

Previous main/deployment: `ff5fec1144ca57448baad9f5205809bae15f0333`. A local HTTP snapshot and SHA-256 inventory were saved on Abigail before release under the October 4 task-2 rollback folder; EasyAsPie additionally retains Actions artifact 11095322692. Keep those copies outside this public repository. Roll back by preparing the preserved public runtime as another explicit, locally verified deployment; never reset branches, overwrite review artifacts, erase browser saves or change settings as a shortcut. Apply the same public-file exclusions to rollback: retain the safe student reference instead of republishing historical teacher-facing documents.
