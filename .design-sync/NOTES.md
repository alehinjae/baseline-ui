# design-sync notes — baseline-ui

## Gotchas found this sync

- **6 components are declared as `declare namespace X { export {...} }` in
  the shipped `.d.ts`** (Accordion, Dialog, Field, Progress, Switch, Tabs —
  the compound-namespace components built on `@base-ui/react`). The
  converter's `.d.ts` scan only recognizes value-declaration exports
  (`const`/`function`/`class`), so it silently dropped all 6 on the first
  build (`components: 8` instead of 14). Fixed via `componentSrcMap` pinning
  each to its `src/components/<Name>/<Name>.tsx` — `finalize_plan`'s
  `names.add(k)` path adds them regardless of what the `.d.ts` scan found.
  **If a future baseline-ui release changes how these are exported, re-check
  the component count against the 14 real components before trusting a
  lower number.**
- **Raw text placed directly inside `Card`/`Grid`/`Stack` renders in the
  browser's default serif font**, not the DS's sans font — only components
  that set their own `font-family` (`Button`, `Badge`, `Alert`, `Text`) look
  right with raw string children. Caught via `Grid`'s first capture (visibly
  serif in the screenshot); fixed by wrapping in `<Text variant="body-sm">`.
  This is now documented in `.design-sync/conventions.md` as the #1 usage
  rule for the design agent — **don't remove that section on a future
  header rewrite**.
- No Storybook, no per-component docs (`docs/` holds only ADRs + roadmap,
  no per-component `.md`/`.mdx`) — previews were authored from
  `demo/index.html`, which is the repo's own canonical usage page and
  matches every component's real prop API closely. If `demo/index.html`
  is ever restructured or removed, previews will need a new source (the
  ADRs in `docs/decisions/` don't carry usage examples).
- No `defaultOpen` issue for Dialog — Base UI's `DialogRoot` supports it
  directly, so the authored preview renders the popup open without needing
  a click simulation. `cfg.overrides.Dialog = {cardMode: "single", viewport:
"480x360"}` keeps it from escaping/collapsing in the grid view.

## Scope of this sync

First-time import, user-scoped to 9 of 14 components for authored previews:
Button, Card, Text, Field, Badge, Alert, Stack, Grid, Dialog. The other 5
(Accordion, Progress, Spinner, Switch, Tabs) ship fully functional in the
bundle but sit on the floor card — no authored `.tsx` yet. Authoring them is
a standing offer for a future re-sync; nothing about them is broken.

## Re-sync risks

- The `componentSrcMap` pins above are load-bearing, not cosmetic — without
  them, a re-sync silently reverts to 8 components. `package-build.mjs`
  doesn't warn about this on its own; only comparing the printed component
  count against 14 catches it.
- `conventions.md` was authored from a single build's token/CSS grep — if
  baseline-ui renames a semantic token (e.g. `--bl-color-info-soft-text`) or
  adds a new component family, the header could drift out of date. The
  base skill's re-sync step re-validates every named token/class against
  the fresh build automatically — trust that check over assuming the file
  is still accurate.
- Toolchain: build ran on Node (via nvm-for-windows / git-bash), npm
  lockfile (`package-lock.json`), no pinned Node version in the repo
  (`.nvmrc` absent) — a future sync on a different Node major could produce
  a different `dist/` output; re-run `npm ci` fresh rather than trusting a
  stale `node_modules`.
- Playwright/Chromium were installed fresh into `.ds-sync/node_modules`
  during this sync (not previously present on this machine) — a fresh
  clone/machine needs the same install step again before `package-validate.mjs`
  can render-check.
