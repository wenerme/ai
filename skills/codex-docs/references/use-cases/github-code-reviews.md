---
name: Codex code review for GitHub pull requests
tagline: Catch regressions and potential issues before human review.
summary: Use Codex code review in GitHub to automatically surface regressions,
  missing tests, and documentation issues directly on a pull request.
coverImage: /codex/use-cases/gh-pr-use-case.png
skills:
  - token: $security-best-practices
    url: https://github.com/openai/skills/tree/main/skills/.curated/security-best-practices
    description: Focus the review on risky surfaces such as secrets, auth, and
      dependency changes.
bestFor:
  - Teams that want another review signal before human merge approval
  - Large codebases for projects in production
starterPrompt:
  title: Ask Codex to review a pull request
  body: "@codex review for security regressions, missing tests, and risky behavior
    changes."
  suggestedModel: cloud
relatedLinks:
  - label: Codex code review in GitHub
    url: /codex/integrations/github
  - label: Custom instructions with AGENTS.md
    url: /codex/guides/agents-md
---

## How to use

Start by adding Codex code review to your GitHub organization or repository.
See [Codex code review in GitHub](https://developers.openai.com/codex/integrations/github) for more details.

You can set up Codex to automatically review every pull request, or you can request a review with `@codex review` in a pull request comment.

If Codex flags a regression or potential issue, you can ask it to fix it by commenting on the pull request with a follow-up prompt like `@codex fix it`.

This will start a new cloud task that will fix the issue and update the pull request.

## Define review guidance

To customize what Codex reviews, add or update a top-level `AGENTS.md` with a section like this:

```md
## Review guidelines

- Flag typos and grammar issues as P0 issues.
- Flag potential missing documentation as P1 issues.
- Flag missing tests as P1 issues.
  ...
```

Codex applies guidance from the closest `AGENTS.md` to each changed file. You can place more specific instructions deeper in the tree when particular packages need extra scrutiny.