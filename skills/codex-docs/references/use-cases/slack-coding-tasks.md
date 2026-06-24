---
name: Kick off coding tasks from Slack
tagline: Turn Slack threads into scoped cloud tasks.
summary: Mention `@Codex` in Slack to start a task tied to the right repo and
  environment, then review the result back in the thread or in Codex cloud.
bestFor:
  - Async handoffs that start in a Slack thread and already have enough context
    to act on
  - Teams that want quick issue triage, bug fixes, or scoped implementation work
    without context switching
starterPrompt:
  title: Kick Off the Task From a Thread
  body: "@Codex analyze the issue mentioned in this thread and implement a fix in
    <name of your environment>."
  suggestedModel: cloud
relatedLinks:
  - label: Use Codex in Slack
    url: /codex/integrations/slack
  - label: Codex cloud environments
    url: /codex/cloud/environments
---

## How to use

1. Install the Slack app, connect the right repositories and environments, and add `@Codex` to the channel.
2. Mention `@Codex` in a thread with a clear request, constraints, and the outcome you want.
3. Open the task link, review the result, and continue the follow-up in Slack if the task needs another pass.

You can learn more about how to use Codex in Slack in the [dedicated guide](https://developers.openai.com/codex/integrations/slack).

## Tips

- If the thread does not already include enough context or suggested fix, include in your prompt some guidance
- Make sure the repo and environment mapping are correct by mentioning the name of the project or environment in your prompt
- Scope the request so Codex can finish it without a second planning loop
- If your project is a large codebase, guide Codex by mentioning which files or folders are relevant to the task