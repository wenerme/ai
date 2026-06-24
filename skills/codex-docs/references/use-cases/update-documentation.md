---
name: Keep documentation up-to-date
tagline: Use code and other sources to automate docs updates.
summary: Use Codex to compare source code changes, public docs, release notes,
  and PR context, then draft focused documentation updates with verification
  steps before publishing.
skills:
  - token: github
    url: https://github.com/openai/plugins/tree/main/plugins/github
    description: Read issues, pull requests, comments, review threads, and failed
      checks when GitHub is part of your bug intake.
bestFor:
  - Developer docs, READMEs, runbooks, examples, and migration notes that need
    to track behavior that changes frequently.
  - Teams that maintain documentation for a technical product.
starterPrompt:
  title: Update Docs From Source Changes
  body: >-
    Update the [product/feature] documentation based on the following sources:

    - the changed source files in [this repo/source linked repo]

    - the existing docs pages that mention a new behavior

    - any linked issue, PR, release note, or public reference I provide below


    Then:

    - identify what is user-facing

    - update only the docs that need to change

    - keep unpublished roadmap, private customer details, and internal-only
    context out of public docs

    - preserve the existing docs structure, terminology, and cross-links

    - run the docs checks that fit the change


    Before finalizing, summarize what changed, what you verified, and any claims
    you could not prove from trusted sources.


    [link release notes or other references here]
relatedLinks:
  - label: Workflows
    url: /codex/workflows
---

## Introduction

Documentation is easiest to keep current when it is updated alongside source changes, not weeks later. Codex can inspect changed code, tests, release notes, linked issues, and pull request context, then draft a scoped docs update that matches the existing structure.

Use this workflow for developer docs, README updates, changelog drafts, migration notes, runbooks, or anything else that needs to track behavior that changes frequently.

## How to use



1. Start from the change you need to document.

   Share the branch, pull request, commit, issue, or files. If the docs are public, say explicitly that unpublished roadmap, private customer details, and internal-only context should stay out.

2. Ask Codex to map the affected docs.

   Have it search existing docs for feature names, config keys, commands, examples, and related terms before drafting.

3. Update the smallest useful docs surface.

   Codex should preserve the current page structure, terminology, cross-links, and frontmatter. It should avoid broad rewrites when a precise note, example, or section update is enough.

4. Verify the changes.

   Ask Codex to run formatting and docs checks that fit the repo, then summarize the evidence behind each user-facing claim.

## What to give Codex

| Source                               | Why it helps                                                               |
| ------------------------------------ | -------------------------------------------------------------------------- |
| Changed code and tests               | Lets Codex analyze actual behavior to draft focused documentation updates. |
| Public release notes or product docs | Helps Codex match public terminology, availability, and feature status.    |
| Pull request or issue context        | Explains why the change happened and which user-facing behavior matters.   |
| Local docs checks                    | Gives Codex a concrete definition of done before the docs are published.   |

Adding more context such as public release notes lets Codex avoid including private context or updates that are not yet public.

## Make the workflow repeatable

For a repo-wide convention, add documentation expectations to [AGENTS.md](https://developers.openai.com/codex/guides/agents-md). For example:

```md
## Documentation

- When user-facing behavior changes, check whether docs, examples, or changelogs need updates.
- Public docs must only include public information or behavior visible in this repo.
- Preserve existing terminology and frontmatter.
- Run the docs formatting and build checks before final handoff.
```

If the process has more steps, turn it into a [skill](https://developers.openai.com/codex/skills) so future Codex threads can follow the same source-checking, drafting, and verification loop. See [Save workflows as skills](https://developers.openai.com/codex/use-cases/reusable-codex-skills) that shares more details on this pattern.

You can also turn this workflow into a [thread automation](https://developers.openai.com/codex/app/automations#thread-automations) by asking Codex to run it on a schedule, asking to fetch all the recent PRs from GitHub to automatically keep docs up-to-date, for example on a weekly basis: