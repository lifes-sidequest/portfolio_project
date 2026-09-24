# Deferred repository cleanup

This inventory was captured after the non-destructive performance pass. It is a cleanup plan, not authorization to delete files. Retained originals and generated caches stay in place until portfolio content work is complete.

## Current disk usage

| Area | Approximate size | Notes |
| --- | ---: | --- |
| Entire workspace | 6.0 GB | Includes Git history, generated output, dependencies, and source media |
| `.git` | 2.5 GB | Almost entirely packed history (`size-pack: 2.50 GiB`) |
| `.next` | 1.5 GB | Includes approximately 1.3 GB of development output and 145 MB of cache |
| `node_modules` | 1.0 GB | Reproducible from the pnpm lockfile |
| `public` | 718 MB | Includes active optimized assets and retained source originals |

## Confirmed cleanup groups

1. **Generated output:** `.next`, Playwright output, Lighthouse reports, and other ignored caches can be recreated. Clearing these will provide the largest safe immediate workspace reduction after work is finished.
2. **Dependency installation:** `node_modules` can be recreated with `pnpm install --frozen-lockfile`. The current pnpm store contains several peer-context variants of Next.js, so a clean install may also reduce duplication.
3. **Unused package candidates:** `@phosphor-icons/react` has no source import. Tailwind and `@tailwindcss/postcss` currently produce no runtime styles, but their removal also requires updating `postcss.config.mjs` and rerunning every visual and build gate.
4. **Retained media originals:** a conservative string-reference scan finds 102 of 206 public files, approximately 702.2 MB, with no active source reference. Most are the original WebM/MP4/PNG/SVG files preserved after optimized derivatives were introduced. This is a candidate list only: dynamic references and archival intent must be reviewed before deletion.
5. **Git history:** deleting working-tree media will not materially shrink the 2.5 GB Git pack. Reducing repository clone size would require a separately approved history rewrite and coordinated force-push. That operation is optional, disruptive, and must never be bundled with ordinary file cleanup.

## Required order when cleanup is authorized

1. Create a recoverable backup or confirm the remote contains the current history.
2. Produce and manually review an exact deletion manifest for public assets.
3. Remove only confirmed unused assets and dependencies.
4. Reinstall dependencies from the lockfile and create a clean production build.
5. Run `pnpm check`, `pnpm test:e2e`, and `pnpm perf:audit`.
6. Compare representative light/dark, desktop/mobile screenshots.
7. Measure the new workspace and deployment sizes.
8. Decide separately whether Git history rewriting is worth the coordination cost.

## Expected outcome

Without rewriting Git history, generated output, dependencies, and retained public originals account for roughly 3.2 GB and are the practical cleanup target. Git history remains the largest separate item and should be handled only if repository transfer size is itself a problem.
