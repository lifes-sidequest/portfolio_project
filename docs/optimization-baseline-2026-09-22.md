# Portfolio optimization baseline — 2026-09-22

This pass establishes reliable checks before changing visual behavior or deleting media.

## Verified

- `pnpm lint`: passes.
- `pnpm test`: 48 Node tests pass. The default script now runs every existing `tests/*.test.mjs` file.
- `pnpm exec tsc --noEmit`: passes.
- `pnpm build`: passes; all 13 routes are generated successfully.
- `pnpm test:e2e`: 6 Chromium tests pass against the production server across desktop and mobile. They check the home page, browser errors, Car Parts carousel navigation, key case-study media, Links navigation, and persisted language/theme preferences.

## Resolved build issue

Next.js 16.2.6 with webpack incorrectly normalized the `/index` app route and generated its client manifest under a nested `index/index` path. Moving the already user-facing “Links” page to `/links` resolves the collision. `/index` now permanently redirects to `/links`, so existing external links continue to work.

## Disk baseline

- `.git`: 2.5 GB
- `.next`: 1.5 GB
- `node_modules`: 883 MB
- `public`: 699 MB; project media is 682 MB

No files were deleted. Disk cleanup remains deferred as requested. Generated build/test outputs are ignored by Git.

## Next pass

1. Run E2E against a production build, then add checks for navigation and language/theme preferences.
2. Capture CPU, memory, and network baselines before and after targeted GSAP, media, and rendering changes.
