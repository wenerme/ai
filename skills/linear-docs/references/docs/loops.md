# Loops

![Loops](https://webassets.linear.app/images/ornj730p/production/d50a83fccc38ccc78ad8c0092dbd8796d092e759-3600x2080.png?q=95&auto=format&dpr=2)

## Overview

> [!NOTE]
> Available to workspaces on [Business](https://linear.app/pricing) and [Enterprise](https://linear.app/pricing) plans. Usage draws from your workspace's [AI credits](https://linear.app/docs/ai-credits).

Loops let Linear drive work forward automatically. They can trigger on a scheduled cadence, or when issues match a set of conditions.

Consider creating loops for repeatable tasks, like:

* When an issue enters this team's triage queue, investigate its likely root cause with [Code Intelligence](https://linear.app/docs/code-intelligence). If you think you can fix it, start a coding session.
* Every Monday afternoon, review projects that had their first update in the last week or were mentioned as newly kicked off in `@Weekly sync document`. Send a Slack message to the `#product-marketing` channel so they're aware of what's coming.
* When an issue is created in team Mobile, create separate issues for the iOS and Android teams, if relevant.

Each loop has a schedule or issue-based trigger, instructions for the agent, optional tools for communicating with other services, and permissions that control its access. Loops can be configured for a specific team, a set of teams, or the whole workspace.

## Example loops

Here are some basic loops that are useful for most workspaces. Create custom loops for your team by prompting Linear, or get started with one of these examples.

#### Investigate and delegate bug reports (,[Build this loop ↗](https://linear.app/agent?skill=loop-bug-triage),)

When new bugs arrive in Triage, check the codebase for a root cause. Delegate the issue to Linear to fix if the cause is found.

![Video](https://webassets.linear.app/files/ornj730p/production/aaafc7577b0e892bef05a313a18d0692bba838af.mp4)

#### Create follow-up issues from resolved incidents: (,[Build this loop ↗](https://linear.app/agent?skill=loop-incident-follow-up),)

When an issue with an incident label is marked done, do a root cause analysis and create follow-up issues.

![Video](https://webassets.linear.app/files/ornj730p/production/c4c37995fa812bf22c56261c7c11e97eae861dc0.mp4)

#### Create platform specific versions of incoming requests: (,[Build this loop ↗](https://linear.app/agent?skill=loop-cross-platform-handoff),)

When a new incoming issue is created, determine if new issues also need to be created for multiple platforms.

![Video](https://webassets.linear.app/files/ornj730p/production/94fd2b994d955887413cbbbbfe0c2776816cb632.mp4)

#### Create user-facing messaging after issues close: (,[Build this loop ↗](https://linear.app/agent?skill=loop-customer-follow-up),)

After an issue closes, check the PR that closed it and generate user-facing messaging that Support can share with customers.

![Video](https://webassets.linear.app/files/ornj730p/production/7eea0fd4bd8d2f019cb4f846cdb4b57ac444e1a4.mp4)

## Create loops with Linear Agent

The best way to create loops is to first achieve the outcome you want in a Linear Agent chat, then continue to refine it into a loop. For example, you might be the lead of a project that has check-in meetings each Thursday morning. You're about to write the agenda, but realize you could automate this instead.

* Press ⌘/Ctrl + J to open a Linear Agent chat
* Prompt Linear: Check the project Slack channel, open questions in the last update, and any issue threads that seem relevant. Add a new section in the Meetings project document with those details, using a format like [...]
* Review the result to make sure it looks right. If it doesn't, continue prompting Linear until the agenda looks complete, and in the desired format.
* Then, ask Linear to create the loop. You’ll be prompted to add any missing details.

## Create loops manually

You can also create a new loop directly in the interface.

1. In your sidebar, click **Loops** under the workspace group to start a new workspace-level loop. To create a new team loop, click the team name in your sidebar, then choose the **Loops** tab on that page.
2. Click **New loop**
3. Choose a trigger: an issue being created or updated and meeting conditions, or a schedule
4. Add instructions describing the outcome you want Linear to achieve
5. Optionally, add [Tools](https://linear.app/docs/loops#tools)
6. Review the loop's scope and permissions
7. Click **Create loop**

![Create a Loop](https://webassets.linear.app/images/ornj730p/production/a74f69f266bec89619ddeec9d71d5571e6fe30e7-3088x2088.png?q=95&auto=format&dpr=2)

## Update loops

Prompt Linear to update an existing loop, or make changes directly in the interface:

1. Open the list of **Loops**
2. Select the loop you want to update
3. Click **Edit**
4. Update the loop fields as needed. These changes are saved as a draft, and not yet live.
5. Click on **Publish** to apply all changes at once to the loop

![Edit a Loop](https://webassets.linear.app/images/ornj730p/production/de5836e670cc38d0b5b8818e266dd8b94cc184c1-1800x1200.png?q=95&auto=format&dpr=2)

## Review a loop's runs

Each loop has a run history to let you audit its behavior.

1. Open **Loops** from the workspace or team that contains the loop
2. Open the loop you want to review
3. Select **Run history**
4. Review recent runs to see when the loop executed and what actions it took

![Run History Menu](https://webassets.linear.app/images/ornj730p/production/831089d29114df09dbc0dd742b4fd6448121d0aa-1988x882.png?q=95&auto=format&dpr=2)

![Run History](https://webassets.linear.app/images/ornj730p/production/9abb797a2ce8eb11c7072cbc780468b81144a63f-3088x2088.png?q=95&auto=format&dpr=2)

## Restoring a previous version

All published versions of a loop are saved and can be restored. Please note that removed tools cannot be restored as they need to be authenticated again manually.

1. Start editing a loop as usual
2. Click on **Published versions**
3. Select a past version you want to restore
4. Click on **Restore version**

## Tools

Tools extend what Linear Agent can do during a loop run. When a connected tool is available to a loop, Linear can use it to gather context or take supported actions in other services. For example:

* Search or retrieve content from connected sources such as GitHub, Notion, or Sentry
* Post comments or updates to external services like Slack
* Fetch documentation, pull request details, or error reports to enrich an issue

A tool can only access data and perform actions that are permitted by the connected integration's configuration and the loop's data scope. When a user connects a tool to a loop, they authorize that loop to act in the other service, so tool access should be granted thoughtfully.

Each tool must first be approved in your workspace before it can be used in a loop. Workspace admins and owners can configure the full set of tools allowed in a workspace in [Security](https://linear.app/settings/security) settings.

![Tools available during a loop run](https://webassets.linear.app/images/ornj730p/production/999d447a8b89d77c8498345fb2c6b1e6602e4cb0-1984x888.png?q=95&auto=format&dpr=2)

## Setup

* Workspace owners can manage who can create and manage workspace loops in [**Settings → Security → Workspace management → Manage loops**](https://linear.app/settings/security).
* Team owners can control who can create and manage loops in **Settings → Teams → [Team name] → Access and permissions → Loop management**.

![Manage Loops Access](https://webassets.linear.app/images/ornj730p/production/358fe38b142196a3259b9bbb79290df811462fb5-1924x850.png?q=95&auto=format&dpr=2)

## Permissions

Loops support a range of permissions to control what they can access and do. Enable only the permissions your loop needs to fulfill its intended purpose, and consider the impact of each one before enabling it.

![Loop Permissions](https://webassets.linear.app/images/ornj730p/production/b7815db70390ffeb5a9a60a075cf6f27d255e9e5-1988x1704.png?q=95&auto=format&dpr=2)

### Team access

Controls which teams the loop can access. It can read and write data only in those teams. By default, a loop at the workspace level or in a public team will have access to all public teams, while a loop inside a private team will have access only to that team.

Loops that can access all public teams can also access workspace-level objects like Initiatives and Customers.

### Web access

If enabled, the loop can query any website. You can use this to set up loops that can take actions like researching competitor announcements, or checking the documentation of services your product integrates with.

Use caution when enabling web access. **Web access can send workspace content to external services.** Do not enable it for loops that may process sensitive data unless you are comfortable with that data leaving Linear.

### Code Intelligence

If enabled, the loop can use [Code Intelligence](https://linear.app/docs/code-intelligence) to browse and analyze repositories configured in your workspace. Enable Code Intelligence for loops designed to investigate bugs or answer questions about your code.

### Coding sessions

If enabled, the loop will be able to start a [coding session](https://linear.app/docs/coding-sessions) to open a draft pull request. Allow coding session access for loops that delegate implementation work to Linear.

### Externally synced issues and comments

If enabled, the loop will be able to write data on issues or comment threads that are synced with external applications, like issues created from Slack with bi-directionally synced threads.

Enable this with care, as some synced threads may be visible outside your workspace — if you use [GitHub sync](https://linear.app/docs/github#configure-github-issues-sync) in a public repo for instance, the loop would be able to post comments to that repo's GitHub Issues.

### External sources

Issues can be created from sources outside Linear, like Slack messages or emails received to a particular address. For security reasons, loops will only run by default on issues created from within Linear.

If you want a loop to run on issues created from external sources, you can enable specific external sources on a per-loop basis. Workspace owners can configure the list of allowed external sources in [Security](https://linear.app/settings/security) settings. After that, configured external sources can be enabled for individual loops.

### Allow changes outside of triggering issue

If enabled, the loop can write data to any issues included in the **Team access** scope. If disabled, the loop can only write data on the single issue that triggered the loop for a given run.

---

## AI credits

Starting July 20, Loops will require AI credits to run. AI credits are purchased and managed by workspace admins in [Settings](https://linear.app/settings/billing).

To help your team get started, we're giving Business and Enterprise workspaces **$20 per seat** in promotional credits. These credits are pooled at the workspace level, applied automatically, and expire on August 20.

If your balance reaches zero or your promotional credits expire, Loops will pause unless an admin has enabled auto top-ups or purchased additional credits. Your workspace is only charged automatically if auto top-ups are enabled.

Learn more about [AI Credits](https://linear.app/docs/ai-credits).

---

## FAQ

<details>
<summary>What are the best practices for writing instructions?</summary>
Clearly describe the intended outcome and any actions Linear Agent should avoid.

For example:

> Investigate the issue using the available context. Add a comment summarizing the likely cause and recommend the next action. Do not change the issue's assignee or status.

For best results:

* Use Linear Agent Chat to help build your instructions (see Create a loop with Linear agent)
* Describe the outcome, not only an action
* Specify which context or connected tools Linear Agent should use
* State which changes are permitted
</details>

<details>
<summary>What tools can loops use?</summary>
A loop can only use tools that are connected to your workspace, enabled for Linear Agent, and allowed by your workspace admins. Tool access also depends on the loop's scope and permissions.
</details>

<details>
<summary>When should web access be enabled?</summary>
Enable web access only when a loop needs information from external websites.

A good fit is research on public information, like competitor announcements, documentation, or API references, where the loop does not need to send sensitive workspace content to external services.

Enable this intentionally, since allowing external web access can increase the risk of exposing workspace data outside Linear.
</details>

<details>
<summary>How do I use Code Intelligence?</summary>
First, a workspace admin must enable Code Intelligence and configure code access for the workspace. Then, enable the [Code Intelligence permission](https://linear.app/settings/ai/code-intelligence) on the loop itself.
</details>

<details>
<summary>How do I use Coding Sessions?</summary>
First, a workspace admin must enable coding sessions and configure code access for the workspace. Then, enable the [Coding Sessions permission](https://linear.app/settings/ai/coding-sessions) on the loop itself.
</details>

<details>
<summary>How can I review loop costs and AI credit usage?</summary>
Workspace admins can review credits and usage via Settings under [AI & Agents > AI usage & credits](https://linear.app/settings/billing/usage)

If your workspace runs out of AI credits, loops stop running until more credits are added.
</details>

<details>
<summary>Why did I get a loop run failed notification?</summary>
To troubleshoot, open the loop's **Run history** to check recent runs and any visible failures.

Common causes a loop run might fail include missing permissions, untrusted external sources, or your workspace running out of AI credits.

To get a more detailed description of what went wrong, you can also ask Linear. Press ⌘/Ctrl + J while looking at the run history and ask for a detailed description of why the loop run failed.
</details>

<details>
<summary>How do I enable or disable a loop?</summary>
Right-click on the loop from either the workspace or team loop view and select **Enable** or **Disable.**
</details>

<details>
<summary>What happens when I delete a loop?</summary>
Deleting a loop is permanent and cannot be undone. Consider disabling the loop instead if you may need to restore it in the future.
</details>
