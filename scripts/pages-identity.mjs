export function actionsReservation(env) {
  if (env.GITHUB_ACTIONS !== 'true') throw new Error('Production identity requires GitHub Actions.');
  if (env.GITHUB_REPOSITORY !== 'AbbyUsesAIThatCodes/MeasureTwice' || env.GITHUB_REF !== 'refs/heads/main' || !['push', 'workflow_dispatch'].includes(env.GITHUB_EVENT_NAME)) {
    throw new Error('Pages production builds are restricted to this repository main on push or owner dispatch.');
  }
  if (!/^[1-9]\d*$/.test(env.GITHUB_RUN_ID || '') || !/^[1-9]\d*$/.test(env.GITHUB_RUN_ATTEMPT || '') || !/^[a-f0-9]{40}$/.test(env.GITHUB_SHA || '')) {
    throw new Error('Missing GitHub run ID, attempt or source revision.');
  }
  const ordinal = Number(env.GITHUB_RUN_ATTEMPT);
  if (!Number.isSafeInteger(ordinal)) throw new Error('Invalid GitHub attempt.');
  // GitHub durably allocates the run ID and increments the attempt on reruns.
  // These are explicit main-run scopes, never fabricated PR ordinals.
  return {scope: `main-run-${env.GITHUB_RUN_ID}`, ordinal, allocator: 'GitHub Actions Run ID / Run Attempt',
    runId: env.GITHUB_RUN_ID, runAttempt: ordinal, expectedRevision: env.GITHUB_SHA,
    runUrl: `https://github.com/${env.GITHUB_REPOSITORY}/actions/runs/${env.GITHUB_RUN_ID}/attempts/${ordinal}`};
}

export function pagesManifest(release, allocation, source, builtAt) {
  const stamp = builtAt.replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
  const id = `${release.version}_${release.slug}_${allocation.scope}_build-${String(allocation.ordinal).padStart(3, '0')}_${stamp}_g${source.sourceRevision.slice(0, 12)}${source.dirty ? '-dirty-' + source.fingerprint.slice(0, 8) : ''}_pages`;
  return {...release, ...allocation, ...source, id, builtAt, target: 'pages', basePath: '/MeasureTwice/',
    pr: allocation.scope.startsWith('pr-') ? Number(allocation.scope.slice(3)) : null};
}

export function assertActionsSource(allocation, source) {
  if (source.dirty || source.sourceRevision !== allocation.expectedRevision) throw new Error('Pages must build the exact clean GitHub event revision.');
}
