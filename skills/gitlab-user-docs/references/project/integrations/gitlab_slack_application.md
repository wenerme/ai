# GitLab for Slack app

Configure the GitLab for Slack app to use slash commands, receive notifications, and interact with GitLab Duo from your Slack workspace.

- Tier: Free, Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

> [!note]
> For administrator documentation, see [GitLab for Slack app administration](../../../administration/settings/slack_app.md).

The GitLab for Slack app is a native Slack app that provides [slash commands](#slash-commands), [notifications](#slack-notifications),
and the [GitLab Duo integration](#gitlab-duo) in your Slack workspace. GitLab links your Slack user
with your GitLab user so that any command you run in Slack is run by your linked GitLab user.

## Install the GitLab for Slack app

Prerequisites:

- You must have the [appropriate permissions to add apps to your Slack workspace](https://slack.com/help/articles/202035138-Add-apps-to-your-Slack-workspace).
- On GitLab Self-Managed, an administrator must [turn on the integration](../../../administration/settings/slack_app.md).

The GitLab for Slack app uses
[granular permissions](https://medium.com/slack-developer-blog/more-precision-less-restrictions-a3550006f9c3).
Although functionality has not changed, you should [reinstall the app](#reinstall-the-gitlab-for-slack-app).

### From the project or group settings

- [Generally available](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/175803) in GitLab 17.8. Feature flag `gitlab_for_slack_app_instance_and_group_level` removed.

To install the GitLab for Slack app from the project or group settings:

1. In the top bar, select **Search or go to** and find your project or group.
1. In the left sidebar, select **Settings** > **Integrations**.
1. Select **GitLab for Slack app**.
1. Select **Install GitLab for Slack app**. You're redirected to the Slack confirmation page.
1. On the Slack confirmation page:
   1. Optional. If you're signed in to more than one Slack workspace, in the upper right,
      from the dropdown list, select the workspace you want to install the app in.
      On GitLab Self-Managed and GitLab Dedicated, an administrator must first
      [enable support for multiple workspaces](../../../administration/settings/slack_app.md#enable-support-for-multiple-workspaces) for the dropdown list to appear.
   1. Select **Allow**.

When you install the app for a group, the integration is also turned on for all subgroups and
projects in the group that don't already have the integration configured.
Subgroups and projects that already have the integration configured are not affected,
but can use the inherited settings at any time.
For more information, see [manage group default settings for a project integration](_index.md#manage-group-default-settings-for-a-project-integration).
Each project gets a project-specific alias based on its project path, which you can use in
[slash commands](#slash-commands).

### From the Slack App Directory

- Tier: Free, Premium, Ultimate
- Offering: GitLab.com

On GitLab.com, you can also install the GitLab for Slack app from the
[Slack App Directory](https://slack-platform.slack.com/apps/A676ADMV5-gitlab).

To install the GitLab for Slack app from the Slack App Directory:

1. Go to the [GitLab for Slack page](https://gitlab.com/-/profile/slack/edit).
1. Select a GitLab project to link with your Slack workspace.
   To use GitLab Duo in Slack, select a top-level group instead.
   You can select a top-level group when:
   - You have the Owner role for the group.
   - The `slack_duo_group` feature flag is enabled for the group.
   - The group is not archived or scheduled for deletion.
   - The group does not have the GitLab for Slack app yet, of its own or inherited.
     To change an existing installation, [install the app from the group settings](#from-the-project-or-group-settings).
   - Beta and experimental features are turned on for the group.

   The page lists up to 100 groups.
   If your group is not listed, [install the app from the group settings](#from-the-project-or-group-settings).

### Effect on the Slack notifications integration

The deprecated [Slack notifications](slack.md) integration is hidden from the list of
integrations in a project's settings when all of the following are true:

- The GitLab for Slack app is available on the instance.
- The project has no Slack notifications integration, including one that is turned off
  or inherited from a group.
- No Slack notifications integration exists for the instance.

Hiding affects only the list. Projects that have Slack notifications configured still
see it in the list and keep receiving notifications.

## Reinstall the GitLab for Slack app

When GitLab releases new features for the GitLab for Slack app, you might have to reinstall the app to use these features.

To reinstall the GitLab for Slack app:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **Settings** > **Integrations**.
1. Select **GitLab for Slack app**.
1. Select **Install GitLab for Slack app**. You're redirected to the Slack confirmation page.
1. On the Slack confirmation page:
   1. Optional. If you're signed in to more than one Slack workspace, in the upper right,
      from the dropdown list, select the workspace you want to reinstall the app in.
      On GitLab Self-Managed and GitLab Dedicated, an administrator must first
      [enable support for multiple workspaces](../../../administration/settings/slack_app.md#enable-support-for-multiple-workspaces) for the dropdown list to appear.
   1. Select **Allow**.

The GitLab for Slack app is updated for all projects that use the integration.

Alternatively, you can [configure the integration](https://about.gitlab.com/solutions/slack/) again.

## GitLab Duo

- Tier: Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated
- Status: Experiment

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/590434) in GitLab 19.1 [with a feature flag](../../../administration/feature_flags/_index.md) named `slack_duo_agent`. Disabled by default. This feature is an [experiment](../../../policy/development_stages_support.md).
- [Enabled on GitLab.com, GitLab Self-Managed, and GitLab Dedicated](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/254087) in GitLab 19.4.
- Feature flag `slack_duo_agent` [removed](https://gitlab.com/gitlab-org/gitlab/-/work_items/592185) in GitLab 19.6.
- Direct messages and the Slack top bar agent [introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/606312) in GitLab 19.5 [with a feature flag](../../../administration/feature_flags/_index.md) named `slack_duo_agent_app`. Disabled by default.

> [!flag]
> The availability of this feature is controlled by a feature flag.
> For more information, see the history.
> This feature is available for testing, but not ready for production use.

> [!note]
> If you use multiple Slack installations without Slack Enterprise Grid, Slack rate limits GitLab Duo to 15 conversation objects in each minute.
> This prevents the integration from functioning because a single invocation requests 50 messages from the channel history to use as context.
> To avoid rate limits for GitLab Duo in Slack, keep all of your Slack workspaces in a single Enterprise Grid organization.

You can interact with [GitLab Duo](../../gitlab_duo/_index.md) directly from Slack by mentioning the
GitLab bot in any channel or thread where the bot is present. GitLab Duo reads the full
conversation thread and recent channel history as context, runs a flow, and posts the
result back to the Slack thread.

For example, you can ask GitLab Duo to do the following:

- Turn a conversation into a GitLab issue.
- Search for existing issues or merge requests.
- Summarize a discussion thread.
- Answer questions about your projects.

Each interaction runs a GitLab Duo Agent session and consumes GitLab Credits.
Where the session runs depends on the `slack_duo_group` feature flag:

- When the flag is enabled, all sessions from a Slack workspace run in one top-level group,
  the [GitLab Duo group of the workspace](#choose-where-gitlab-duo-runs).
  The sessions use the GitLab Duo settings of that group and, on GitLab.com, its GitLab Credits.
- When the flag is disabled, sessions run on a CI/CD runner, in a [workspace project](#workspace-project).
  The project is in the default GitLab Duo namespace of the person who mentions GitLab Duo.
  If you ask about a project in a different top-level group, GitLab Duo in Slack fails.

In both cases, GitLab Duo acts with the permissions of the person who mentions it.

When mentioned in a channel, the agent reads recent messages from that channel as context for its response.
Messages posted after the one it is responding to are not included.
After users interact with GitLab Duo, it creates an agent session that is visible only to the person who invoked it.

> [!note]
> When you mention the GitLab bot in a thread, the full conversation content
> (including messages from all participants) is sent to a large language model (LLM)
> to generate a response. Do not share sensitive information in threads where you
> mention GitLab Duo.

### Prerequisites

- Link a Slack account to your GitLab account.
  If your accounts are not linked, GitLab sends you a message
  with a link to authorize the connection on first mention.
- Add the GitLab bot to the Slack channel where you want to use it.
- For existing installations, [reinstall the GitLab for Slack app](#reinstall-the-gitlab-for-slack-app)
  to grant the additional permissions required for GitLab Duo.

When the `slack_duo_group` feature flag is enabled, you also need the following:

- An Owner of a top-level group, or an administrator on GitLab Self-Managed, must
  choose the GitLab Duo group of the Slack workspace.
- In the GitLab Duo group, [turn on GitLab Duo](../../gitlab_duo/turn_on_off.md) and the
  [GitLab Duo Agent Platform](../../duo_agent_platform/turn_on_off.md#turn-gitlab-duo-agent-platform-on-or-off).
- [Turn on beta and experimental features](../../gitlab_duo/turn_on_off.md#turn-on-beta-and-experimental-features)
  in the GitLab Duo group on GitLab.com, or for the instance on GitLab Self-Managed.
- You must have at least the Developer role for the GitLab Duo group.
- If the subscription has a GitLab Duo add-on with seats, you must have an
  [assigned seat](../../../subscriptions/subscription-add-ons.md#assign-gitlab-duo-seats).
  On GitLab.com, the subscription of the GitLab Duo group applies.
  On GitLab Self-Managed, the subscription of the instance applies.

When the `slack_duo_group` feature flag is disabled, you also need the following:

- Turn on the GitLab Duo Agent Platform, and turn on beta and experimental features.
- [Set a default GitLab Duo namespace](../../profile/preferences.md#set-a-default-gitlab-duo-namespace).
- Turn on the [Developer Flow](../merge_requests/developer.md) for the top-level group.

### Choose where GitLab Duo runs

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/633566) in GitLab 19.6 [with a feature flag](../../../administration/feature_flags/_index.md) named `slack_duo_group`. Disabled by default.

> [!flag]
> The availability of this feature is controlled by a feature flag.
> For more information, see the history.

Each Slack workspace runs GitLab Duo in one top-level group, the GitLab Duo group of the workspace.
Until a group is chosen, GitLab Duo is off for the workspace.
When someone mentions GitLab Duo, the reply says who can turn it on.

The first top-level group that installs the GitLab for Slack app becomes the GitLab Duo group.
This happens only if the Slack workspace does not have a GitLab Duo group yet.
Installing the app on a subgroup or project does not choose a GitLab Duo group.
Reinstalling the app never moves GitLab Duo to another group.

#### Turn GitLab Duo on or off for a Slack workspace

Prerequisites:

- You must have the Owner role for the top-level group.
- The Slack workspace must be connected to the group.
  To connect it, [install the GitLab for Slack app](#install-the-gitlab-for-slack-app) on the group.

To turn GitLab Duo on or off for a Slack workspace:

1. In the top bar, select **Search or go to** and find your top-level group.
1. In the left sidebar, select **Settings** > **Integrations**.
1. Select **GitLab for Slack app**.
1. In the **GitLab Duo** section, turn the toggle for the Slack workspace on or off.
   To turn GitLab Duo off, select **Turn off GitLab Duo** to confirm.

If GitLab Duo cannot answer in Slack, the section lists the settings to fix in the group.

Turning off GitLab Duo affects only new mentions in Slack.
Sessions that already run continue, and GitLab Duo in GitLab is not affected.

A Slack workspace has only one GitLab Duo group.
If another group already runs GitLab Duo for the workspace, the **GitLab Duo** section says so.
The section names that group only if you can view it.
To move GitLab Duo to your group, an Owner of the other group must turn it off first.

GitLab Duo turns off for the Slack workspace when the GitLab Duo group:

- Is archived or scheduled for deletion.
- Is transferred and is no longer a top-level group.
- No longer has an installation of the GitLab for Slack app for the workspace, in the group or
  in any of its subgroups or projects.

The GitLab for Slack app settings of subgroups and projects show where GitLab Duo runs for their
Slack workspace, and who can change it.
Notification and slash command settings are not affected.

#### Choose the GitLab Duo group of the instance workspace

- Offering: GitLab Self-Managed

When an administrator installs the GitLab for Slack app for the instance, only an administrator
chooses the GitLab Duo group of that Slack workspace.
Installing the app on a group does not choose the GitLab Duo group of that Slack workspace.

Prerequisites:

- You must be an administrator.

To choose the GitLab Duo group of the Slack workspace installed for the instance:

1. In the upper-right corner, select **Admin**.
1. In the left sidebar, select **Settings** > **Integrations**.
1. Select **GitLab for Slack app**.
1. In the **GitLab Duo** section, from the **Choose a top-level group** dropdown list, select a group.
1. Select **Turn on GitLab Duo**.

To move GitLab Duo to another group, select the other group, then select **Move GitLab Duo**.
To turn GitLab Duo off, select **Turn off GitLab Duo**, then select **Turn off GitLab Duo** again to confirm.

### Use GitLab Duo in Slack

To use GitLab Duo in Slack:

1. Invite the app to a channel with `/invite @GitLab`.
1. In the Slack channel or in a thread in the channel, type `@GitLab` followed by your request
   (for example, `@GitLab create an issue to track this bug`).
1. The first time you type `@GitLab`, GitLab sends you a message with a link to connect your Slack and GitLab accounts.
1. GitLab Duo acknowledges your request and starts working on the task.
1. When the task is complete, GitLab Duo posts a threaded reply with the result.

If an error occurs, GitLab Duo reacts to your message with a locked padlock emoji and sends you a message with details about the issue.
This message is visible only to you.

To leave feedback on this feature's performance, use the thumbs up or thumbs down on any response.

GitLab Duo in Slack works in the following places:

- Public and private channels where the agent is a member of the channel. Mention `@GitLab` to start.
- Group direct messages that include the agent. Mention `@GitLab` to start.
- One-to-one direct messages with the agent, including when you open the agent from the Slack top bar.

GitLab Duo does not run in channels or direct messages shared with external organizations through Slack Connect.
An answer in these conversations could show people outside your organization content that only you can access.

In direct messages, GitLab Duo uses the earlier messages in the conversation as context.

Direct messages require the `assistant:write`, `im:history`, and
`mpim:history` [permissions](#gitlab-for-slack-app-permissions). If the GitLab for Slack app
was installed before these permissions were added, you must
[reinstall the app](#reinstall-the-gitlab-for-slack-app) before GitLab Duo responds in these places.

### Workspace project

When the `slack_duo_group` feature flag is enabled, sessions run in the GitLab Duo group
and no workspace project is created.

When the flag is disabled, GitLab creates a workspace project called `duo-workspace` the first time
you use GitLab Duo from Slack.
The project is in your default GitLab Duo namespace and is the execution environment for flows
triggered from Slack.

You can customize the agent behavior in the workspace project.
For more information, see [Developer Flow](../merge_requests/developer.md).

### GitLab for Slack app permissions

GitLab Duo requires the following additional GitLab for Slack app permissions:

| Scope               | Purpose |
|---------------------|---------|
| `app_mentions:read` | Receives events when users mention the bot in a channel. |
| `assistant:write`   | Marks the app as an agent that appears in the Slack top bar and shows a status while it works. |
| `channels:history`  | Reads conversation history in public channels to provide thread and channel context to the agent. |
| `groups:history`    | Reads conversation history in private channels to provide thread and channel context to the agent. |
| `im:history`        | Reads conversation history in direct messages with the agent. |
| `mpim:history`      | Reads conversation history in group direct messages that include the agent. |
| `reactions:write`   | Adds emoji reactions to messages to indicate agent lifecycle status. |

New installations receive the permissions that are available for your GitLab instance automatically.
The `assistant:write`, `im:history`, and `mpim:history` permissions are available only when the
`slack_duo_agent_app` feature flag is enabled. For more information, see the history.
Existing installations receive new permissions only after you
[reinstall the GitLab for Slack app](#reinstall-the-gitlab-for-slack-app).

## Slash commands

You can use slash commands to run common GitLab operations.

For the GitLab for Slack app:

- You must authorize your Slack user when you run your first slash command.
- You can replace `<project>` with a project full path or
  [create a project alias](#create-a-project-alias) for slash commands.

If you use [Mattermost slash commands](mattermost_slash_commands.md) instead:

- Replace `/gitlab` with the trigger name you've configured for these integrations.
- Remove `<project>`.

The following slash commands are available for GitLab:

| Command | Description |
| ------- | ----------- |
| `/gitlab help` | Shows all available slash commands. |
| `/gitlab <project> issue show <id>` | Shows the issue with the ID `<id>`. |
| `/gitlab <project> issue new <title>` <kbd>Shift</kbd>+<kbd>Enter</kbd> `<description>` | Creates an issue with the title `<title>` and description `<description>`. |
| `/gitlab <project> issue search <query>` | Shows up to five issues that match `<query>`. |
| `/gitlab <project> issue move <id> to <project>` | Moves the issue with the ID `<id>` to `<project>`. |
| `/gitlab <project> issue close <id>` | Closes the issue with the ID `<id>`. |
| `/gitlab <project> issue comment <id>` <kbd>Shift</kbd>+<kbd>Enter</kbd> `<comment>` | Adds a comment with the comment body `<comment>` to the issue with the ID `<id>`. |
| `/gitlab <project> deploy <from> to <to>` | [Deploys](#deploy-command) from the `<from>` environment to the `<to>` environment. |
| `/gitlab <project> run <job name> <arguments>` | Executes the [ChatOps](../../../ci/chatops/_index.md) job `<job name>` on the default branch. |
| `/gitlab incident declare` | Opens a dialog to [create an incident from Slack](../../../operations/incident_management/slack.md). |
{.sortable}

### `deploy` command

To deploy to an environment, GitLab tries to find a manual deployment action in the pipeline.

If only one deployment action is defined for an environment, that action is triggered.
If more than one deployment action is defined, GitLab tries to find an action name
that matches the environment name.

The command returns an error if GitLab cannot find a matching deployment action.

### Create a project alias

In the GitLab for Slack app, slash commands use a project full path by default.
You can use a project alias instead.

To create a project alias for slash commands in the GitLab for Slack app:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **Settings** > **Integrations**.
1. Select **GitLab for Slack app**.
1. Next to the project path or alias, select **Edit**.
1. Enter the new alias and select **Save changes**.

If an alias collision occurs in a Slack workspace (for example, multiple projects or groups attempt to use the same alias), GitLab automatically assigns a fallback alias
in the following format:

- For projects: `p-<project_id>` (for example, `p-12345`)
- For groups: `g-<group_id>` (for example, `g-67890`)

You can use these fallback aliases in slash commands when the preferred alias is unavailable.

## Slack notifications

You can receive notifications to Slack channels for certain GitLab [events](#notification-events).

### Configure notifications

To configure Slack notifications:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **Settings** > **Integrations**.
1. Select **GitLab for Slack app**.
1. In the **Trigger** section:
   - Select the checkbox for each GitLab [event](#notification-events) you want to receive notifications for in Slack.
   - For each checkbox you select, enter the names of the Slack channels you want to receive notifications.
     You can enter up to 10 channel names separated by commas (for example, `#channel-one, #channel-two`).

     > [!note]
     > If the Slack channel is private, you must [add the GitLab for Slack app to the channel](#receive-notifications-to-a-private-channel).

1. Optional. In the **Notification settings** section:
   - Select the **Notify only broken pipelines** checkbox
     to receive notifications for failed pipelines only.
   - Select the **Notify only when status changes** checkbox
     to receive notifications only when the pipeline status for the ref changes.
   - From the **Branches for which notifications are to be sent** dropdown list,
     select the branches you want to receive notifications for.

     Notifications are also sent for pipelines triggered by tags created from these branches.

     Notifications for vulnerabilities are only triggered by the default branch,
     regardless of the selected branches.
     For more details, see [issue 469373](https://gitlab.com/gitlab-org/gitlab/-/issues/469373).
   - For **Labels to be notified**, enter any or all of the labels a GitLab
     issue, merge request, or comment must have to receive notifications for.
     Leave blank to receive notifications for all events.
1. Optional. Select **Test settings**.
1. Select **Save changes**.

### Receive notifications to a private channel

To receive notifications to a private Slack channel, you must add the GitLab for Slack app to the channel:

1. Mention the app in the channel by entering `@GitLab`.
1. Select **Add to Channel**.

### Notification events

The following GitLab events can trigger notifications in Slack:

| Event                                                                 | Description |
| --------------------------------------------------------------------- | ----------- |
| Push                                                                  | A push is made to the repository. |
| Issue                                                                 | A work item is created, closed, or reopened. |
| Confidential issue                                                    | A confidential work item is created, closed, or reopened. |
| Merge request                                                         | A merge request is created, merged, approved, closed, or reopened. |
| Note                                                                  | A comment is added. |
| Confidential note                                                     | An internal note or comment on a confidential work item is added. |
| Tag push                                                              | A tag is pushed to the repository or removed. |
| Pipeline                                                              | A pipeline status changes. |
| Wiki page                                                             | A wiki page is created or updated. |
| Deployment                                                            | A deployment is started or finished. |
| [Group mention](#trigger-notifications-for-group-mentions) in public  | A group is mentioned in a public channel. |
| [Group mention](#trigger-notifications-for-group-mentions) in private | A group is mentioned in a private channel. |
| [Incident](../../../operations/incident_management/slack.md)          | An incident is created, closed, or reopened. |
| [Vulnerability](../../application_security/vulnerabilities/_index.md) | A new, unique vulnerability is recorded on the default branch. |
| Alert                                                                 | A new, unique alert is recorded. |
{.sortable}

### Trigger notifications for group mentions

- [Generally available](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/175803) in GitLab 17.8. Feature flag `gitlab_for_slack_app_instance_and_group_level` removed.

To trigger a [notification event](#notification-events) for a group mention, use `@<group_name>` in:

- Issue and merge request descriptions
- Comments on issues, merge requests, and commits
