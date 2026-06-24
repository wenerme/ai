---
name: Run code migrations
tagline: Migrate legacy stacks in controlled checkpoints.
summary: Use Codex to map a legacy system to a new stack, land the move in
  milestones, and validate parity before each transition.
skills:
  - token: $security-best-practices
    url: https://github.com/openai/skills/tree/main/skills/.curated/security-best-practices
    description: Check risky migrations, dependency changes, and exposed surfaces
      before you merge.
  - token: $gh-fix-ci
    url: https://github.com/openai/skills/tree/main/skills/.curated/gh-fix-ci
    description: Work through failing CI after each migration milestone instead of
      leaving cleanup until the end.
  - token: $aspnet-core
    url: https://github.com/openai/skills/tree/main/skills/.curated/aspnet-core
    description: Use framework-specific guidance when a migration touches ASP.NET
      Core app models, `Program.cs`, middleware, testing, performance, or
      version upgrades.
bestFor:
  - Legacy-to-modern stack moves where frameworks, runtimes, build systems, or
    platform conventions need to change.
  - Teams that need compatibility layers, phased transitions, and explicit
    validation at each migration checkpoint.
starterPrompt:
  title: Migrate With Guardrails
  body: >-
    Migrate this codebase from [legacy stack or system] to [target stack or
    system].


    Requirements:

    - Start by inventorying the legacy assumptions: routing, data models, auth,
    configuration, build tooling, tests, deployment, and external contracts.

    - Map the old stack to the new one and call out anything that has no direct
    equivalent.

    - Propose an incremental migration plan with compatibility layers or
    checkpoints instead of one big rewrite.

    - Keep behavior unchanged unless the migration explicitly requires a
    user-visible change.

    - Work in milestones and run lint, type-check, and focused tests after each
    milestone.

    - Keep rollback or fallback options visible until the transition is
    complete.

    - If validation fails, fix it before continuing.

    - Start by mapping the migration surface and proposing the checkpoint plan.
relatedLinks:
  - label: Modernizing your Codebase with Codex
    url: /cookbook/examples/codex/code_modernization
  - label: Follow a goal
    url: /codex/use-cases/follow-goals
  - label: Worktrees in the Codex app
    url: /codex/app/worktrees
---

## Introduction

When you are moving from one stack to another, you can leverage Codex to map and execute a controlled migration: routing, data models, configuration, auth, background jobs, build tooling, deployment, tests, or even the language and framework conventions themselves.

Codex is useful here because it can inventory the legacy system, map old concepts to new ones, and land the change in checkpoints instead of one giant rewrite. That matters when you are moving off a legacy framework, porting to a new runtime, or incrementally replacing one stack with another while the product still has to keep working.

## How to use



1. Start by inventorying the migration surface: legacy packages, framework conventions, routing, data access, auth, configuration, build tooling, tests, deployment assumptions, and any external contracts that must survive the move.
2. Ask Codex to map the legacy concepts to the target stack and call out what has no direct match.
3. Choose an incremental strategy: compatibility layer, module-by-module port, branch-by-abstraction, or a strangler-style replacement around one boundary at a time.
4. Keep behavior stable until the migration itself forces a visible change, and name those exceptions explicitly.
5. After each milestone, run the smallest validation that proves parity: lint, type-check, focused tests, contract tests, smoke tests, or a side-by-side check against the legacy path.
6. Review the diff and the remaining transition risk after each checkpoint instead of waiting for the full rewrite.



## Leverage ExecPlans

In our [code modernization cookbook](https://developers.openai.com/cookbook/examples/codex/code_modernization), we introduce ExecPlans: documents that let Codex keep an overview of the cleanup, spell out the intended end state, and log validation after each pass.
When you ask Codex to run a complex migration, ask it to create an ExecPlan for each part of the system to make sure every decision and tech stack choice is recorded and can be reviewed later.

## Combine with a goal

For long-running migration slices, use a [goal](https://developers.openai.com/codex/use-cases/follow-goals) to guide Codex through the work. Set the goal with a clear end state, parity checks, rollback expectations, and a stopping condition.