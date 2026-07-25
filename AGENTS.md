# Agents

This document outlines the agents in this project. Agents are autonomous or semi-autonomous programs that can perform tasks on behalf of the user.

## Agent Responsibilities and Invocation

The following table outlines the responsibilities of each agent and provides guidance on when to use them.

| Agent Name | Responsibilities | Invocation/Selection Guidance | Constraints |
| --- | --- | --- | --- |
| **DocsAgent** | - Keeps documentation in sync with code changes.<br>- Automatically generates documentation for new features.<br>- Fixes typos and grammatical errors in documentation. | Select this agent when you need to update or improve the project's documentation. For example, after adding a new feature or fixing a bug. | - Requires access to the source code and documentation files.<br>- May require guidance for complex or ambiguous documentation tasks. |
| **CodeAgent** | - Refactors code to improve readability and maintainability.<br>- Fixes bugs and security vulnerabilities.<br>- Implements new features based on user specifications. | Use this agent for code-related tasks. It can help you with everything from simple bug fixes to implementing complex new features. | - Requires a clear and detailed description of the task.<br>- May need access to external libraries or APIs. |
| **ReleaseAgent** | - Automates the release process.<br>- Bumps the version number according to semantic versioning.<br>- Generates a changelog from commit messages.<br>- Publishes the new version to npm. | Invoke this agent when you are ready to release a new version of the project. | - Requires credentials for publishing to npm.<br>- Should be used with caution, as it will publish a new version of the package. |

## Adding New Agents

To add a new agent, please update this document with the agent's name, responsibilities, invocation guidance, and any constraints.
