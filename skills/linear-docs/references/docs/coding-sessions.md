# Coding sessions

![Delegate work to Linear Agent for implementation](https://webassets.linear.app/images/ornj730p/production/31d2a903f275e8ce4ea5a04a0ce4bab5b1c72c6a-2360x1606.png?q=95&auto=format&dpr=2)

## Overview

Coding sessions let you run agentic coding workflows in Linear.

When you delegate an issue to Linear, we start a secure coding session through Claude Code or Codex. Linear drafts a PR and adds a diff to the issue, which you can check yourself before requesting review. Once approved, merge your PR directly from Linear.

Use coding sessions to

* Automatically fix incoming issues in [Triage](https://linear.app/docs/triage)
* Start multi-player coding sessions from Linear, or by mentioning `@linear` in Slack or Teams
* Let workspace members with repository access create PRs without a local setup

> [!NOTE]
> Coding sessions are supported on Basic, Business and Enterprise plans. Usage draws from your workspace’s AI credits. See [our docs](https://linear.app/docs/ai-credits) for more information.

## Setup

A Linear owner or admin with GitHub organization owner access can enable coding sessions within your workspace by:

1. Navigating into your [GitHub Integration settings](https://linear.app/settings/integrations/github) and granting code access
2. Enabling [Coding sessions](https://linear.app/settings/ai/coding-agent)

Afterwards, any workspace member with a GitHub account linked in [Connected Accounts](https://linear.app/linear/settings/account/connections) will be able to start a coding session.

## Choose a model

Our default model (tracked under _Auto_) is Claude Opus 4.8. We will continue to update our model selection over time. The model selected here is used for all subsequent coding sessions in the workspace.

Workspace owners or admins can update the model selection from [Coding sessions settings](https://linear.app/settings/ai/coding-agent). We currently support Claude Fable 5, Claude Opus 4.8, Claude Sonnet 5, GPT-5.6 Sol, GPT-5.5 and GPT-5.4.

![Coding sessions model selection](https://webassets.linear.app/images/ornj730p/production/7a592b6d536ee7e96905893333428b232289f56b-1711x906.png?q=95&auto=format&dpr=2)

## Start a coding session

When you delegate work to Linear, Linear Agent creates an secure coding session tied to that issue and begins working from the context already there. Click on the session to steer or follow up with the agent, or let it run — you'll be notified when your input is needed.

![Collaborate with Linear Agent in a secure coding session](https://webassets.linear.app/images/ornj730p/production/583931386478f7632a8e9c9d841ed8a2cd760f41-2550x1904.png?q=95&auto=format&dpr=2)

When you ask Linear to make a change, Linear agent starts working right away. That includes direct requests like fixing a bug, implementing a feature, opening a PR, or starting a coding session. If Linear has already offered to handle something, a quick reply like “proceed” is typically enough to begin.

If you’re asking Linear to look into something first, it won’t start coding yet. Requests to investigate, debug, research, plan, or create the actual task are treated as scoping the problem, not implementing it. The same goes for messages that only say where the work should be tracked, like a team, project, cycle, milestone, or triage.

## Review code changes

When a coding session produces a pull request, the workflow continues in your _Reviews_ tab, where you can inspect the resulting diffs and follow review discussions.

You can also delegate code review actions to the Linear Agent directly to address any left review comments from other teammates, requirements to rebase open PRs onto master, or fixing tedious lint issues.

![Inspect Linear Agent's code change in your Reviews tab](https://webassets.linear.app/images/ornj730p/production/f95d33c6f3b7a1d0ffac9f64c9d89c167d674b78-2140x1488.png?q=95&auto=format&dpr=2)

## Guidance and skills

Coding sessions work from the issue you delegate and the repository access available to your workspace, and the guidance configured for Linear Agent.

Coding sessions are guided from the existing Claude Code or Codex setup your team already uses, depending on your preferred model. If your repositories include guidance within a dedicated `skills.md` file, Linear Agent can use that context during a coding session alongside the issue and repository context.

### Writing effective issues

Coding sessions begin from the issue you delegate. The more clearly an issue defines the desired outcome, scope, and constraints, the less time Linear spends exploring the codebase or inferring requirements.

**Too ambiguous**

> Search is broken.

> Improve the search experience.

> Users can't find archived projects through search.,
,This should respect the ,_Include archived_, toggle.

---

**Well-scoped**

> Issue search excludes issues from archived projects, even when Include archived is enabled.,
,,
,Update ,`issueSearch.ts`, so issue search respects the existing ,`includeArchivedProjects`, flag. When enabled, issue search should include issues from archived projects that match the search query. When disabled, existing behavior should remain unchanged.,
,,
,Reuse the existing ,`includeArchivedProjects`, filtering behavior used elsewhere in search rather than implementing archived project filtering independently.,
,,
,Do not modify search ranking, pagination, or project search behavior.

---

The well-scoped example above points Linear toward the relevant code, existing patterns, and expected behavior while defining what should not change. [Code Intelligence](https://linear.app/docs/code-intelligence) can also be a useful tool to help iterate on issue descriptions for optimization prior to delegation.

Information that reduces ambiguity or codebase exploration helps Linear reach an implementation faster and use AI credits more efficiently.

For more detail on typical costs per session, see our [AI Credits documentation](https://linear.app/docs/ai-credits#typical-costs).

## Agent automations

Once you've enabled coding sessions, the next way to drive efficiency is to kick them off automatically.

Triage automations let you run agent behaviors, including coding sessions, each time an issue arrives in Triage. Optionally, filter to run only when an issue meets specific criteria, like a label, creator, or other filterable property.

Internally, our favorite way to use these automations has been to have Linear take the first pass at issues coming into Triage. Each time [Triage Intelligence](https://linear.app/docs/triage-intelligence) identifies a new issue in triage issue as a bug, this automation runs to investigate and draft a PR if called for. You can set up automations of your own in a team's triage settings.

![Triage automations lets you kick-off Linear Agent's implementation automatically](https://webassets.linear.app/images/ornj730p/production/0b9bc1b157109715d3638d94da379768b48d17dc-2210x988.png?q=95&auto=format&dpr=2)

## AI credits

Coding sessions usage will draw from your workspace’s AI usage credits. Any chat or automation that prompts for a code change will open a coding session.

On our launch date of June 11th, 2026, all workspaces on Basic, Business and Enterprise have a shared pool of promotional credits ($20 multiplied by the number of unsuspended users in your workspace). Once used, workspace admins can top up AI credits to continue using coding sessions.

Please see [AI credits](https://linear.app/docs/ai-credits) for more information.
