# Agents

This document outlines the agents in this project. Agents are autonomous or semi-autonomous programs that can perform tasks on behalf of the user.

## Agent Responsibilities and Invocation

The following table outlines the responsibilities of each agent and provides guidance on when to use them.

| Agent Name | Responsibilities | Invocation/Selection Guidance | Constraints |
| --- | --- | --- | --- |
| **DocsAgent** | - Keeps documentation in sync with code changes.<br>- Automatically generates documentation for new features.<br>- Fixes typos and grammatical errors in documentation. | Select this agent when you need to update or improve the project's documentation. For example, after adding a new feature or fixing a bug. | - Requires access to the source code and documentation files.<br>- May require guidance for complex or ambiguous documentation tasks. |
| **CodeAgent** | - Refactors code to improve readability and maintainability.<br>- Fixes bugs and security vulnerabilities.<br>- Implements new features based on user specifications. | Use this agent for code-related tasks. It can help you with everything from simple bug fixes to implementing complex new features. | - Requires a clear and detailed description of the task.<br>- May need access to external libraries or APIs. |
| **ReleaseAgent** | - Automates the release process.<br>- Bumps the version number according to semantic versioning.<br>- Generates a changelog from commit messages.<br>- Publishes the new version to npm. | Invoke this agent when you are ready to release a new version of the project. | - Requires credentials for publishing to npm.<br>- Should be used with caution, as it will publish a new version of the package. |

## Styling Rule: Tailwind Only

Hard rule for every agent and contributor working on this site: **do not hand-write
pure CSS. All styling is authored as Tailwind CSS utilities in the component.**

- New markup is styled with utility classes on the element. Do not invent a
  bespoke class name and back it with a rule in a `.css` file.
- Do not create new `.css` files. `app/global.css` and `app/(home)/landing.css`
  are the only stylesheets in the repository.
- Anything CSS can do, an arbitrary-property utility can do:
  `[counter-increment:row]`, `before:[content:counter(row)]`,
  `[mask-image:linear-gradient(...)]`, `supports-[backdrop-filter]:...`. Reach
  for those before reaching for a stylesheet.
- Design tokens are declared once in the `@theme` block of `app/global.css` and
  consumed as `bg-stock`, `text-ink-faint`, `border-rule`, `font-mark`,
  `ease-editorial`. Do not restate a colour, font, or easing curve as a raw
  value in markup or CSS.
- Raw CSS is permitted only where Tailwind has no expression: `@font-face`
  declarations, the `@theme` token block, `--color-fd-*` overrides that fumadocs
  reads directly, and `@keyframes` bodies. Every one of those lives in
  `app/global.css`.
- When editing an existing surface that still carries hand-written CSS, move the
  rules you touch to utilities rather than extending the stylesheet.

## Adding New Agents

To add a new agent, please update this document with the agent's name, responsibilities, invocation guidance, and any constraints.
