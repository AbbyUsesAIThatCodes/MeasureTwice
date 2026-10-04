# GitHub Pages Deployment

## October 4 Publication Procedure

[Locally Verified Pages Release](LOCAL_PAGES_RELEASE.md) supersedes the workflow and payload procedure below. Pages is already configured. The current workflow publishes only the locally checked `site/` inventory after an explicit main-branch dispatch; it does not install, build, or run browser tests on GitHub. A merge alone does not deploy. The historical builder now excludes the broad `docs/` tree and maps only `deployment/student-reference.md` to the public curriculum reference path. Historical setup details below are retained for provenance.

This workflow publishes the existing static game at the intended project address `https://AbbyUsesAIThatCodes.github.io/MeasureTwice/`. That address is not a verified live deployment yet. The owner must merge this change and configure Pages. No gameplay, curriculum, UI or classroom-readiness claim changes.

## Owner Setup After Merge

1. Review and manually merge the Pages PR into `main`. The merge queues **Deploy MeasureTwice Pages** because it changes the workflow. If Pages is still disabled, the **Read Owner-Configured Pages Settings** step fails early. It does not enable Pages or change repository settings.
2. Open **Repository → Settings → Pages → Build and deployment → Source**, and select **GitHub Actions**. Skip the suggested starter templates: `.github/workflows/pages.yml` is already supplied. Do not choose a branch or `/docs` publishing source.
3. Open **Actions → Deploy MeasureTwice Pages → Run workflow**, choose **main**, and run it when you are ready to publish. This is the actual public deployment. Approve the `github-pages` environment if your repository requires approval.
4. After both jobs succeed, use the URL shown by the deploy job/Pages settings. Open `/MeasureTwice/`, verify the full build ID in the footer against the Actions summary and `build-manifest.json`, and test a cut plus Curriculum. No hosted run or live-URL test was performed while preparing the PR.

**After setup, relevant future pushes or merges into main automatically deploy.** Paths are restricted to deployed inputs, build/check scripts, tests, dependency/release records and this workflow. Evidence-only and root README changes do not queue a deployment. An owner can also dispatch a run from main. There are no pull-request triggers; both jobs and the production builder reject feature branches/forks. If you want approval for every deployment, configure that protection on the `github-pages` environment yourself. This PR does not change it.

Official instructions: [Choose GitHub Actions as the Pages Source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow) and [Custom Pages Workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Build And Review Locally

Use Node 24 and install the dependency with `npx --yes pnpm@10.17.1 install --frozen-lockfile --ignore-scripts`. Then:

```text
npm test
node scripts/build-pages.mjs local-pages-your-session
node scripts/check-pages.mjs
```

The command prints an immutable `dist/pages/<full-build-id>/MeasureTwice/` site directory. Its parent contains `Start Pages Review.cmd` and `serve.mjs`. Open the launcher on Windows, or run `node serve.mjs . 18447` from that parent and visit `http://127.0.0.1:18447/MeasureTwice/`. The upload action sends only the inner `MeasureTwice` directory, whose root is the site's root; GitHub supplies the project URL prefix. Relative scripts, data, CSS and Curriculum links therefore work at both the project path and existing local-review root.

`node scripts/pages-browser-check.cjs` checks the latest Pages artifact using an isolated browser on port 18447 and writes `test-results/<full-id>/`. It needs Playwright (set `PLAYWRIGHT_MODULE` to an existing installation) and Chrome/Chromium (`MT_BROWSER` can override the executable). Playwright is not installed or run in Actions; the small model/build checks run there. The existing `node scripts/build.mjs <scope>` command and saved review artifacts remain unchanged.

## Identity And Cost

The same `release.json` supplies version 0.1.0 and provisional review codename Predict Cut Inspect. Public hosting does not promote it to a classroom release.

- Pages builds use target `pages`. Local review scope allocation remains in the existing durable ledger; real `pr-N` scopes are allowed only on Jess_PC.
- Production uses scope `main-run-<GITHUB_RUN_ID>` and build ordinal `<GITHUB_RUN_ATTEMPT>`. GitHub owns both durable values. A new run has a distinct scope; rerunning its build increments the attempt. No PR number or workflow-global run number is passed off as a PR ordinal. One exclusive local reservation prevents two builder invocations in one runner attempt. Failed attempts retain their identity. Rerunning only deployment reuses the original artifact and identity while it remains available.
- One UTC timestamp, source SHA, dirty flag and fingerprint feed the output folder, artifact name, logs, manifest, report, Actions summary and existing visible footer. Production rejects dirty or mismatched checkouts. It does not use the Jess_PC allocator.
- The upload's exact full-ID artifact name is passed to the dependent deploy job. There is one Pages artifact, retained for one day; no extra artifact uploads or Actions caches. If an expired artifact must be rebuilt, use a new run or rerun all jobs for a fresh identity.
- Official actions are pinned to verified commits. Build has only contents/pages read permissions; only deployment receives pages write and OIDC permissions. Configuration uses `enablement: false` and the built-in token, with no added secret/PAT or billing change.
- Only tracked `public`, `src`, `data`, `docs` inputs of supported static types, three pinned vendor files and generated identity records reach the site. Checkout metadata, workflows, dependencies beyond the runtime bundle, review ZIPs, test/response records, private PDFs and credentials are excluded. The server and Windows launcher stay outside the deployment payload.

The minimum hosted path is two short dependent jobs, with a five-minute build timeout, ten-minute deployment timeout and serialized deployments. [Build Identity](BUILD_IDENTITY.md) inventories the implemented surfaces. The exact tested review artifact and limits belong in the PR; do not claim a production deployment until the owner's run succeeds.
