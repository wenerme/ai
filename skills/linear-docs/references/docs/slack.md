# Slack

Combine Linear with Slack to keep everyone in sync.

![Linear logo and Slack logo](https://webassets.linear.app/images/ornj730p/production/42ec7d05b6dd1e64e3803ac7752b7e2c325058a5-2880x1620.png?q=95&auto=format&dpr=2)

## Overview

Create Linear issues from Slack messages, sync threads between Slack and Linear, set up personal and channel-specific notifications, display rich unfurls in Slack and more.

![Video](https://webassets.linear.app/files/ornj730p/production/2a280601a9524ece805063f095182863bdc13602.mp4)

## Configure

### Integration setup

Connect your Slack workspace to Linear in [integration settings](https://linear.app/settings/integrations/slack). You must be a Linear admin to complete this step (or owner, on Enterprise.)

Once completed, others in your Linear workspace can:

* Mention @Linear in Slack to take actions like creating issues, or asking questions about data in your workspace
* View and take actions from rich unfurls in Slack that show key issue, comment, document, initiative or project details
* Enable personal Slack notifications
* Send team and project updates to dedicated Slack channels

### Connect multiple Slack workspaces

Linear's Enterprise plan supports connecting multiple Slack workspaces to Linear to use the Slack integration. If you're using Slack's Enterprise Grid plan for example, this allows you to use the Slack integration across your workspaces. To add a new workspace, go to Linear's Slack integration settings and click the `+` button under connected workspaces. This action requires admin permissions (or owner, on Enterprise.)

## Linear Agent for Slack

Mention `@Linear` in discussions on Slack to take actions in Linear based on your conversation’s context. Use natural language to specify the details or simply let the agent infer what's needed.

For example, try sending:

* @Linear file a bug, assign me
* @Linear make feature requests from this thread
* @Linear who usually works on notifications?

To use `@Linear` in Slack, setup depends on the type of conversation:

* **Public channels:** You can mention `@Linear` directly. In some workspaces, Linear can join the channel automatically when needed.
* **Private channels:** Add Linear to the channel first with `/invite @Linear`.
* **Group DMs:** You have to invite the Linear Agent at the creation of the group DM, and Linear Agent cannot be added to existing DMs.

In [settings](https://linear.app/settings/integrations/slack), you can choose to allow Slack’s workflow builder to mention @Linear to support automating actions.

### Set Linear Agent guidance

Linear Agent considers instructions you write in Slack integration [settings](https://linear.app/settings/integrations/slack) on how to create issues. Use this field to refine the agent's behavior and give it more context about how you use Slack.

You might give it context about your channel naming structure and how it relates to your Linear projects, what statuses you prefer it create in, the team it should use when unsure, and more.

Outside of this field, the agent also uses contextual clues to help infer where to create issues (for example, if you're sending project updates from a project to a channel that sounds related, issues created in that channel will favor creation in that project.)

## **Linear with Slackbot**

Connect Linear's MCP server to Slackbot to bring Linear context into your Slackbot conversations.

Find more information [here](https://linear.app/integrations/slack#connect-linear's-mcp-server-to-slackbot).

_If you're looking to create issues and take actions by mentioning `@Linear` in Slack, see [the section above](https://linear.app/docs/slack#linear-agent-for-slack)._

## Create issues with message actions

You can also create issues using **More actions → Connect to apps → Create new issue…**  on a Slack message if you prefer to specify all the details of your created issue.

If you select a team in the resulting window that uses default templates, that template's text will appear in the description field.

> [!NOTE]
> Only Linear users in your Slack workspace can create issues with this integration.  If you're interested in allowing non-Linear users in your Slack workspace to create issues, consider using [Asks](https://linear.app/docs/linear-asks) instead.

### Use templates

Your issue templates in Linear can also be used in Slack. Add templates to your Slack integration from [workspace template settings](https://linear.app/settings/templates) or the [Slack](https://linear.app/settings/integrations/slack) settings page. Admins can make up to 10 issue templates available in your Slack integration, which any Linear members in your Slack workspace can view and apply during issue creation. If you have a default template set for your team, it’ll show up as an additional template option after the team has been selected.

Templates in private teams are not available to the Slack integration (nor in other integrations that support templates like Intercom and Zendesk.) If you need to allow users to create issues using templates in private teams, consider using [Asks](https://linear.app/docs/linear-asks) where this use-case is supported.

### Sync threads

![Image showing a synced thread in Linear that also posts to Slack](https://webassets.linear.app/images/ornj730p/production/18da45a9e1f8d905e993d47d20f2ccc3fdbb48d6-1440x1194.png?q=95&auto=format&dpr=2)

> [!NOTE]
> To use synced threads in private channels, invite the integration using `/invite @Linear`. Synced threads are not available in DMs. Files from direct messages can't be attached to issues.

To create a synced thread, create an issue from Slack through **More actions → Connect to apps → Create new issue…**  on a Slack message.

When you create an issue from Slack, you can also create a synced comment thread. If Linear is available in the channel, comments will stay in sync between Linear and Slack. Otherwise, the issue is created without thread sync.

When people in your company report issues in Slack, syncing threads is a great way to keep them in the loop regardless of whether they're in your Linear workspace. Comments made in the synced Linear thread will also appear in Slack, and the Slack thread will be updated when the issue is completed, canceled, or marked as a duplicate.

If an issue synced to a Slack thread is marked as a duplicate of another issue, we'll also update the Slack thread where the duplicate was created once the original issue is resolved.

### Add Slack messages to existing issues

There are a few options to link Slack messages to existing Linear issues.

#### Ask Linear

![Linear agent linking a slack thread to an existing issue by saying @Linear link this conversation to the issue about...](https://webassets.linear.app/images/ornj730p/production/626b68cc60cf324d95a90722433fdbbdffe3b392-1374x802.png?q=95&auto=format&dpr=2)

#### Link to issue from Slack

On a Slack message, open **More actions → Connect to apps → Link existing issue**. Search for and select the issue to associate the Slack message with the Linear issue. With this type of linking, no terminal updates will be sent to the Slack thread, and no synced thread will be created.

#### Attach the Slack message's URL in Linear

To associate a Slack message to a Linear issue without syncing, copy the Slack message's URL through the overflow menu on that message. In the Linear issue, use `Control L` to add that URL as an attachment. No updates or messages will be sent to the Slack message when linking this way.

## Notifications

Slack notifications are available for teams, projects, initiatives, individuals, and views. Once the Slack integration has been configured for your workspace, any user can set up the notification types available to them.

### Team notifications

Set up team notifications from the team’s Slack notifications settings menu Authenticate to Slack and then choose a channel for the notifications to post to.

Team notifications post updates to a specific Slack channel for issue activity, including issue creation, comments, status changes, and project updates.

### Project & initiative notifications

Set up project and initiative notifications from the individual project or initiative page. Click the bell icon in the top right, authenticate to Slack, and choose a channel for the notifications to post to.

Project and initiative Slack channel notifications post updates to a specific Slack channel for selected activity related to that project or initiative.

### Personal notifications

Set up personal Slack notifications from [_Settings > Personal > Notifications_](https://linear.app/settings/account/notifications). Authenticate to Slack and then choose which notifications to receive.

Personal Slack notifications can send the same updates you normally receive in Inbox, email, or desktop push notifications. These notifications are sent in a direct message from the Linear app in Slack.

### View subscriptions

Open the view’s `…`  menu and select _Configure custom view Slack notifications_. Turn on the toggle and authorize Linear to post to a particular channel.

Choose whether to be notified when an issue is added to the view, completed or canceled, or both. Moving forward, notifications for those selected changes will be sent as messages to the chosen Slack channel.

### Project Slack channels

If you create a Slack channel to discuss each project you work on, you can automate project channel creation with this integration. When enabled, a new connected channel is created in Slack each time a new project is created in Linear. Project updates post to that channel, and every project member is added to the channel by default.

#### Enabling auto-creation

Admins can turn this on in Slack [settings](https://linear.app/settings/integrations/slack) under the _Create channel for new projects_ sub-section of _Project channels_.

![Create channels for new projects automatically.](https://webassets.linear.app/images/ornj730p/production/8f41f4287e52f748c2dc4425e6fe97650f30544d-1046x500.png?q=95&auto=format&dpr=2)

Once enabled, Linear will automatically:

* Create a public Slack channel for each new project
* Invite all project members to that channel
* Add a bookmark in the channel linking back to the Linear project

If your workspace connected to Slack before these permissions were added, you'll be prompted to reauthorize the integration. A workspace owner or admin must complete the reauthorization before auto-creation will work.

### Rich unfurls and issue actions

Once you've connected the integration for Slack, we'll show expanded links anytime you post issue, project, document, or initiative links from public teams in Slack.

 URLs associated with private Linear teams never unfurl. Unfurling can be disabled in Settings > Integrations > Slack if desired.

#### Issue links

**Issue links** show the issue title, description, status, assignee, and creation date.

They also give other Linear users in Slack the option to update the assignee, comment on the issue, and subscribe or unsubscribe to the issue directly from Slack. You can also engage Slack sync in an existing thread from this menu.

#### Project links

**Project links** in Slack will show a preview with the project name, description, status and target date.

#### Issue IDs

Whenever you mention an issue ID in Slack , a reply with the issue link is automatically added in thread. To prevent clutter, repeated mentions of the same issue ID in this thread within 60 minutes won't generate additional replies. After 60 minutes, posting the issue ID in this thread will prompt a new link reply. Mentioning this issue ID in additional messages or threads elsewhere during this 60 minutes will generate a reply. You can disable this feature in 'Linear settings > Integrations > Slack' if desired.

## FAQ

<details>
<summary>Can anyone in my Slack workspace create Linear issues?</summary>
Only users with Linear accounts can create issues in Slack using the Linear integration. Slack Guests cannot install or approve apps in Slack, so they'll be unable to use the Linear integration even if they have a Linear account.

Everyone in your Slack workspace will be able to see team and project notifications pushed to Slack channels and issues created in channels as long as they are part of the Slack channel.

We do have an integration which enables non-Linear users to create issues for workspaces on on our Business and Enterprise plans: [Linear Asks](https://linear.app/docs/linear-asks).
</details>

<details>
<summary>Can I get in touch with Linear's team on Slack? </summary>
Yes! Separate from the integration, you can also [join our community](https://linear.app/join-slack) on Slack! We have a community of Linear users who share tips, feedback, and discuss how they're using Linear with their team. There's also an #api channel for people building apps on our GraphQL API.
</details>

<details>
<summary>How can I access additional support for this integration?</summary>
Please contact us at support@linear.app for any feedback or issues around using the Linear integration for Slack.
</details>

<details>
<summary>How does the integration collect, manage, and store third-party data?</summary>
Our privacy policy is [here](https://linear.app/privacy) and you can refer to our security FAQs [here](https://linear.app/docs/security) for further information.
</details>

<details>
<summary>Can I link a Slack thread to a Linear issue over API to create a synced thread?</summary>
Yes, you can link an existing Slack thread to a Linear issue over our API. To do so, pass `syncToCommentThread: true` in the input to the `attachmentLinkSlack` mutation (documentation is available [here](https://studio.apollographql.com/public/Linear-API/variant/current/schema/reference/objects/Mutation?query=attachmentLinkSlack#attachmentLinkSlack).)
</details>

<details>
<summary>Slack URLs aren't unfurling in Linear after installing this integration</summary>
If you are not seeing the expected preview of Linear issues in Slack, please check the following:

#### Slack Preferences

Certain preview types may be blocked by Slack’s Messages and Media settings.

If you are seeing an empty preview block in Slack when a Linear issue is mentioned, please toggle on “Show text previews of linked websites” in your Slack Preferences > Messages & Media > In-line media and links

![Slack Messages and Media Settings toggled on](https://webassets.linear.app/images/ornj730p/production/459fe5bfcd919ab55ead0bd67b6dab71d42e7898-377x153.png?q=95&auto=format&dpr=2)

#### Installation Order

If your org installed Linear Asks first and the Slack integration discussed on this page second, unfurls will not work for the regular Slack integration. To fix this:

1. Disconnect both the Asks and Slack integrations from Linear.
2. Disconnect Asks from the [Slack Marketplace](https://instance.slack.com/marketplace/A04RHP43AKH-linear-asks?next_id=0&tab=settings)

![Disconnect connected workspace](https://webassets.linear.app/images/ornj730p/production/98546c65ca6fb71b615df4631d3cb11d4bd64750-703x406.png?q=95&auto=format&dpr=2)

![Disconnect connected workspace](https://webassets.linear.app/images/ornj730p/production/adec2590b6f0181b3028a9c19534c49625dcdd44-723x539.png?q=95&auto=format&dpr=2)

* On the Slack side, go to Tools & settings -> Manage apps. Linear Asks should not appear in the list of installed apps (Linear may still appear if other users in the workspace have personal Slack integrations installed, but this is fine)

![Manage apps in Slack](https://webassets.linear.app/images/ornj730p/production/d845d745081aed4e5faa33baa0c0bcbf3a808ac9-651x761.png?q=95&auto=format&dpr=2)

* Reconnect the Slack integration in Linear
  * Unfurls for public team issues should now work in Slack
  * Templates available to Slack will need to be reconfigured
* Reconnect the Asks integration in Linear. You will have to manually re-add the Asks bot to any channels you have configured for Asks in Slack.
  * Asks team to Linear channel configuration is retained after reconnecting, but you will need to toggle the available templates on for each team.
</details>

<details>
<summary>Is there a slash command for creating issues?</summary>
You can use the `/linear` command in Slack as a lightweight way to create an issue.

This action will be confirmed by an ephemeral message in Slack which is only displayed to you. `/linear` is not supported in Slack threads, for Slack sync, or for uploading files to issues. Asking `@Linear` to create an issue is a more powerful workflow.
</details>

<details>
<summary>Why doesn't the preview in Slack match what I see in Linear?</summary>
Previews in Slack may not match the issue in Linear exactly. Some details and formatting are only visible in Linear.
</details>
