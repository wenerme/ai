# Assign and delegate issues

![Linear issue assignment and delegation](https://webassets.linear.app/images/ornj730p/production/a9981795b1c0e68807294bef731fd782d1ead7ac-1676x1148.png?q=95&auto=format&dpr=2)

## Overview

Issues in Linear are assigned to a single person at a time, giving teams clear ownership and responsibility. Assignment helps teammates triage, track, and prioritize work.

Users can delegate issues to [agents](https://linear.app/docs/agents-in-linear), allowing the agent to work on an issue while the assigned teammate maintains ownership.

### Assigning issues

To assign an issue, open the issue and use the assignee field in the properties sidebar to choose a teammate or agent. You can also assign directly from cards in board views and issue list views by clicking the assignee avatar, or press `A` when viewing or hovering over an issue to open the assignment menu.

![Video](https://webassets.linear.app/files/ornj730p/production/6014369daf3b3b4e2af4ac3730ba1d662bfe1447.mp4)

To assign yourself quickly, press `I` while viewing an issue or when hovering in list view.

You can also open the command menu (`⌘K`) and search for "Assign to..." to make updates via keyboard. For bulk assignment, use multi-select in list or board views by typing `X` when hovering over the issue, and right-click to update the assignee from the bulk action bar.

To remove an assignee, choose "No assignee" from the assignment menu.

#### **Assignment permissions**

* Issues in public teams can be assigned to any workspace member
* Private team issues can only be assigned to members of the private team
* Issues cannot be assigned to suspended users

### Delegating to agents

Delegate an issue to an agent while keeping a human teammate as the assignee. The assignee remains responsible for the work, while the agent contributes on their behalf.

You can change the agent at any time or remove them by selecting "No agent" from the assignment menu.

To delegate an issue to an agent, make sure the agent has access to the team the issue belongs to. Team membership is set when the agent integration is added to a workspace and can be changed by an admin at any time.

For more on Linear’s built-in agent, see [Linear Agent](https://linear.app/docs/linear-agent). For installed third-party agents, see [AI agents](https://linear.app/docs/agents-in-linear).

### Managing assigned issues

#### User views

Assigned issues, even those delegated to an agent, appear in your [My Issues](https://linear.app/docs/my-issues) default view, where you can review all issues you're responsible for across your workspace. This view updates automatically based on assignment changes to track the progress of your assigned and delegated work.

Assigned and delegated issues also appear in any [custom views](https://linear.app/docs/custom-views) filtered by _Assignee_ or _Agent_.

![Custom views to filter delegated issues](https://webassets.linear.app/images/ornj730p/production/bda0c02e457681d4f23db0c76c8cf72b2e532d83-2674x794.png?q=95&auto=format&dpr=2)

#### History

When viewing issues, the assignment and delegation history is tracked in its Activity feed, which shows changes over time and who made them.

#### Inbox

You are automatically subscribed to issues that are assigned to you. You will be notified of any updates to your assigned issues in your [Inbox](https://linear.app/docs/inbox). You can filter Inbox activity by assignment using the "Notification type" filter to focus on issues that have been assigned to you.

#### Search

You can filter your searches by assignee or by the agent they've been delegated to through [Search](https://linear.app/docs/search) to locate relevant issues based on ownership or automation.

#### Insights

[Insights](https://linear.app/docs/insights) surface trends in how work is distributed across assigned teammates and agents. You can report on issues by assignee or by the agent they’ve been delegated to, helping teams understand ownership patterns and automation coverage.

> [!NOTE]
> Available to workspaces on our [Business](https://linear.app/pricing) and [Enterprise](https://linear.app/pricing) plans.

### Automation

Linear supports automated issue assignment that helps teams route and manage issues with minimal input.

Optionally enable an automation to automatically assign yourself to issues you create. To set up this automation, refer to [Preferences](https://linear.app/docs/account-preferences). If you choose not to enable this setting, you can still use the Create more button in an issue draft or press `⌘` + `Shift` + `Enter` when submitting an issue to quickly create another with the same assignee.

Linear doesn't currently support setting a default assignee for every newly created issue. Use templates to pre-fill the assignee field, triage responsibility to assign issues entering Triage, or triage rules to assign issues based on conditions.

![Settings in preferences to optionally auto-assign yourself when creating new issues.](https://webassets.linear.app/images/ornj730p/production/4fc5803c93a3b6f9aecb4a7ddef902866ecf29dc-1524x298.png?q=95&auto=format&dpr=2)

When a teammate creates a Git branch from an issue, it can automatically assign the issue to them and move it to a started status when you copy the git branch name. This is configurable in [Code & reviews](https://linear.app/settings/account/code-and-reviews).

![Code & reviews preferences](https://webassets.linear.app/images/ornj730p/production/e682be7d1852152db81b49a2d6c1862cf4e3791b-1436x554.png?q=95&auto=format&dpr=2)

For custom rules to assign issues when they enter Triage, you can configure [Triage rules](https://linear.app/docs/triage#triage-rules) based on issue properties like team, status, or label, these rules route issues to a specific team and set an assignee. Rules can also delegate issues to an agent as part of the same flow for even greater automation during triage.

> [!NOTE]
> Triage rules are available on our Business and Enterprise plans.

### Open issues in coding tools

Open issues in your coding tool of choice with a click. All the issue's data, as well as a custom prompt, help your tool start work with the right context.

Enable one or more coding tools like Cursor, Claude Code*, or Codex in [_Settings > Code & reviews_](https://linear.app/settings/account/code-and-reviews) and optionally add a custom prompt. Once configured, open the _Work on issue_ menu to select between your tools by pressing `W` then `O`, or open the issue in your last used tool by clicking on the button, by using the `Cmd` `Option` `.` or `Ctrl` `Alt` `.` keyboard shortcuts.

You can also add custom coding tools not listed in your settings. Use the custom link option to launch coding tools from a URL with query params, or open issues with local scripts (read more [here](https://linear.app/docs/open-issues-with-custom-scripts).)

Prompt templates can also be customized to add standing instructions for how your agent should approach issues. For example, you may always want your agent to give you a detailed plan before writing any code.

![prompt template in Linear](https://webassets.linear.app/images/ornj730p/production/b9851c34cd4a30d857605b44aa07f465b97cec56-3600x1988.heif?q=95&auto=format&dpr=2)

_*For terminal-based tools, please use the [desktop app](https://linear.app/download) and refer to the configuration sets in our [FAQ](https://linear.app/docs/assigning-issues#collapsible-914243845565)_.

### Share issues from private teams

> [!NOTE]
> Private issue sharing is available on the Enterprise plans

On Enterprise plans, teams can share individual issues from private teams with users who aren't team members. Enable issue sharing and configure who can share issues under **Team settings** → Access and permissions → Issue sharing. External collaborators can edit shared issues and be assigned to them.

Shared issues will have a banner prominently displayed to indicate who that issue is visible to.

To share an issue, choose “Share issue” from the … menu, or hit `CMD/CTRL K` and type “Share issue”.

## FAQ

<details>
<summary>Open issues in your preferred terminal on macOS desktop</summary>
On macOS desktop, you can choose your preferred terminal:

![Select between system default, ghostty, warp, and iTerm on the custom script selector in preferences](https://webassets.linear.app/images/ornj730p/production/397bf2abef355881e9f9b648fab6f3cad7dab8a0-1818x646.png?q=95&auto=format&dpr=2)

If you want to change your System default option, here’s how to do so. These examples use iTerm, but you can replace it with any terminal app.

**Option 1: Via Finder (GUI)**

1. Right-click any .command file in Finder
2. Select Get Info (or press Cmd+I)
3. Under Open with, select iTerm.app
4. Click Change All... to apply to all .command files

**Option 2: Using duti (CLI, scriptable)**

Install and use duti to set it programmatically:

`brew install duti
duti -s com.googlecode.iterm2 .command all`

This is great for dotfiles since you can add it to your setup script.

**Option 3: Using defaults (CLI, no extra tools)**

`defaults write com.apple.LaunchServices/com.apple.launchservices.secure LSHandlers -array-add \
'{LSHandlerContentType="public.command-script"; LSHandlerRoleAll="com.googlecode.iterm2";}`
</details>
