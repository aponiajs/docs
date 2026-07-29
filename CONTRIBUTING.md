# Contributing to AponiaJS Docs & Artwork

This repository uses GitHub Flow for documentation, visual-identity, artwork,
and website changes. Keep each pull request focused and make its intent easy to
review.

## Branch from `main`

Start every change from an up-to-date `main` branch:

```bash
git switch main
git pull --ff-only origin main
```

Create a short, descriptive branch with one of these prefixes:

| Prefix | Use |
| --- | --- |
| `feature/` | New website or documentation capability. |
| `fix/` | Bug fixes and corrections. |
| `docs/` | Documentation-only changes. |
| `chore/` | Maintenance, tooling, or repository housekeeping. |

Examples:

```text
feature/goal-paper
fix/mobile-navigation
docs/route-validation
chore/refresh-tokens
```

Do not work directly on `main`.

## Prepare the change

- Keep the branch limited to one coherent purpose.
- Preserve unrelated work already present in the repository.
- Update documentation when behavior or public content changes.
- Do not add third-party artwork. The site ships the project-owned brand mark
  and nothing else.

## Open a pull request

Every change must be submitted through a pull request targeting `main`.
Describe:

- what changed;
- why the change is needed;
- how it was verified;
- any visual, accessibility, metadata, or asset-provenance impact.

Include screenshots for visible website changes. Do not include generated
build output in the pull request unless the repository explicitly requires it.

## Required checks

All configured CI checks must pass before merge. Do not merge with a failed,
cancelled, or skipped required check.

When the change affects the website, run the relevant repository checks locally
before opening the pull request:

```bash
bun run lint
bun run types:check
bun run build
bun run seo:check
```

Documentation-only changes should still be reviewed for accurate links,
spelling, formatting, source attribution, and consistency with the current
implementation.

## Review and merge

- A pull request review is required.
- Resolve review comments and rerun affected checks.
- Use **Squash and merge** after approval and successful CI.
- Write the squash commit message as a concise description of the completed
  change.
- Delete the source branch after merge.

The resulting `main` branch should always contain the complete, reviewable
state of the documentation and artwork archive.
