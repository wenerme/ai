# Asks with Slack

Linear Asks with Slack lets teams turn Slack conversations into issues in Linear without leaving the thread where the request started.

> [!NOTE]
> Available to workspaces on our [Business](https://linear.app/pricing) and [Enterprise](https://linear.app/pricing) plans. Additional features available to Enterprise workspaces through [Advanced Linear Asks.](https://linear.app/docs/linear-asks-slack#linear-asks-vs-advanced-linear-asks)

![Linear logo and Asks logo](https://webassets.linear.app/images/ornj730p/production/cff11bd50226622e9a026cea6894fca9b30aee27-2880x1620.png?q=95&auto=format&dpr=2)

## Overview

Linear Asks gives organizations a powerful tool to manage common workplace requests. Once enabled, anyone can create an Ask to send their request to the relevant Linear team via Slack, even if they don’t have a Linear account.

Use Slack Asks when teams want to:

* Capture requests directly from Slack conversations
* Keep discussion connected to the original Slack thread
* Let people submit requests without needing a Linear account
* Intake bug reports, internal requests, questions, and operational needs from the conversation channels where they already happen

When an Ask is submitted to a Linear team, it lands in that team’s Triage for review, prioritization, and assignment.

### Purpose and use cases

`@Linear Asks` is ideal for Slack request intake from people who do not have Linear accounts. It uses channel-specific configuration and templates to turn those messages into structured requests in Linear.

Use it when you want requests from Slack to follow a more consistent intake flow, with the destination and available templates controlled by the channel’s setup.

> [!NOTE]
> If the requester already has a Linear account, the regular [Slack workflows with `@Linear`](https://linear.app/docs/slack#linear-agent-for-slack) are often a better fit.

## Linear Asks vs Advanced Linear Asks

Slack Asks is available on both Business and Enterprise plans, with additional Slack-specific functionality available through Advanced Linear Asks on Enterprise.

**Feature** | **Business (Linear Asks)** | **Enterprise (Advanced Linear Asks)**
--- | --- | ---
Private Asks (DMs & Linear Asks bot) | ✔ | ✔
Asks fields | ✔ | ✔
Auto-create on 🎫 emoji reaction | ✔ | ✔
Form template support | ✔ | ✔
@Linear Asks | ✔ | ✔
Asks in private Slack channels | — | ✔
Per-channel configuration | — | ✔
Auto-create on every new message | — | ✔
Multiple Slack workspace support | — | ✔

## Configure Slack Asks

### Install Asks

1. Go to [Settings → Features → Asks](https://linear.app/settings/asks).
2. Click the + icon under Slack intake to connect the Asks integration.
3. Authenticate into a Slack workspace.

## Permissions and visibility

### Managing Asks configuration

Workspace Admins or Owners can choose whether Asks channels, teams, and templates are managed by:

* Admins only (or Owners & Admins on Enterprise workspaces)
* All users

![Allow members to manage Asks](https://webassets.linear.app/images/ornj730p/production/a39ecbd9a59ce94927a590c95f9950fb64430bdb-721x154.png?q=95&auto=format&dpr=2)

### Behavior for Slack users outside your Linear workspace

You can control if Slack users outside your Linear workspace can update the issue status and priority in Slack. Also, if [Customer Requests](https://linear.app/docs/customer-requests) are enabled, Slack Asks can surface a customer field. This is useful when someone in Slack wants to associate a message with a specific customer. With customer requests enabled, this can happen automatically when the Slack message came from the actual customer, but not when the request is being raised internally.
Because this field exposes customer data, admins can restrict visibility to:

* Linear users only in Slack
* All members of the Slack workspace
* Slack members and guests if it is in a template (Slack Connect users outside your Slack workspace will never see this field).

![Behavior for Slack users outside your Linear workspace](https://webassets.linear.app/images/ornj730p/production/1e64a472d136e12f628913c64a0135f317792aef-676x207.png?q=95&auto=format&dpr=2)

### Linear Asks Agent

There is the option to enable Linear Asks Agent. This gives you the ability to create an Ask by mentioning `@Linear Asks` in a Slack channel or thread. If the channel is configured with templates that have required fields, Linear will prompt the requestor to reply with all required information before creating the Ask.

![Linear Agent for Asks](https://webassets.linear.app/images/ornj730p/production/215e5763fb3a8c960c07191dcc6a0985ead81298-655x239.png?q=95&auto=format&dpr=2)

### Connect teams and invite the app

After connecting Slack, connect Linear teams to Private Asks or to specific public channels.

1. Click the three dots next to **Private Asks** or **All public Slack channels**.
2. Hover over **Add teams to channel**.
3. Select the team to add to a private Ask or public Slack channel.
4. Repeat this for each channel that should support Asks.
5. Then, in Slack, invite the app to each channel with `/invite @Linear Asks`.

Use **Private Asks** for requests that should stay private between the requester and the team managing the issue.

Private Asks includes Asks created in DMs or in the Asks app home in Slack. Templates added to Private Asks are also available when creating Asks in DMs.

DMs do not need to be added as channels. Private Asks configuration covers Asks created in DMs and from the Asks app home in Slack.

> [!NOTE]
> Ensure that the Linear teams connected to Private Asks are also private. This ensures that only members of the relevant team can view the content shared on the issue.

### Per-channel configuration (,[Enterprise](https://linear.app/docs/linear-asks-slack#linear-asks-vs-advanced-linear-asks),)

Use per-channel configuration when you need different behavior for a specific channel, including support for private channels.

1. Click **Add channel**.
2. Select the correct Slack workspace.
3. Select the specific channel.
4. Click **Allow**.
5. In Slack, invite the app to each configured channel with `/invite @Linear Asks`.

> [!NOTE]
> For Private Slack channels, you’ll need to use a channel-specific configuration

### Add templates to channels

1. In Linear, go to [Settings → Features → Asks](https://linear.app/settings/asks).
2. Under the relevant channel or **Private Asks**, click the three dots next to the team.
3. Select the templates you want to make available for that channel.

* Select available templates under each team in your Asks settings.
* Workspace-level templates are not available for use with Asks.
* Templates added to Private Asks are available when creating Asks in DMs.

Supported fields include Text, Long text, Dropdown, Checkboxes, Date, File upload, and Instructions. You can also include customer, label group, priority, title, and due date fields.

> [!NOTE]
> To let people submit Asks without choosing a template, keep **Create Asks without a template** enabled.

If multiple Ask templates are available in a Slack channel, Linear chooses the best match based on the message context and the templates configured for that channel. In most cases, people do not need to name or invoke a specific template manually.

### Enable auto-creation

You can configure Slack Asks to create Asks automatically in public channels.

* To set a default template, hover over the template you want to use and click **Set as default.**
* The default template applies to auto-created Asks in that channel type or specific channel.
* For auto-created Asks, the template description is replaced by the user’s message.
* If you only want to set a default team, consider using **Create Asks without a template**.
* If the default template has required form fields, auto-creation options won’t be available for that channel.

> [!NOTE]
> Default templates only work for auto-created Asks, and not the @Linear Asks agent.

<details>
<summary>On 🎫 emoji</summary>
By default, users can turn a Slack message into an ask by reacting to it with the 🎫 emoji.

Additional behavior:

* This can be turned off in Asks settings.
* Starting a Slack message with 🎫 also triggers ask creation.
* Bot-posted messages can create an ask if the first character is 🎫.
* If multiple Linear teams are associated with the channel or channel type, the 🎫 emoji creates an issue using the team template marked as default.

![Create Ask with :ticket: emoji](https://webassets.linear.app/images/ornj730p/production/46abc3360d101385fa4ae68fac0b73c176378a9d-847x198.png?q=95&auto=format&dpr=2)
</details>

<details>
<summary>On every new message</summary>
For channels intended solely for intake, you can enable auto-creation whenever a new message is posted.

This is useful for channels like `#it-asks` or `#bugs`, where every message should enter Triage.

Important constraints:

* Available only on Enterprise as part of Advanced Linear Asks
* Requires a single-channel configuration
* Not available in private channels
* To exempt a message from auto-creation, begin it with 📢 or 📣

![Auto-create asks option](https://webassets.linear.app/images/ornj730p/production/1fafc86e8d2f3b8aaf8c24de2c171a60197166ec-845x235.png?q=95&auto=format&dpr=2)
</details>

<details>
<summary>On mention of @Linear Asks</summary>
If enabled for your workspace, people can mention `@Linear Asks` in a Slack message or thread to start the Ask creation flow.

> [!NOTE]
> The Linear Asks agent _does not_ rely on default templates, and will pick the appropriate template based on user message.

If you have templates with required fields in the channel, Linear will prompt the user to reply with any missing information before creating the Ask. If you have multiple templates in the channel, Linear will use the context of the conversation to decide which template questions need to be answered.

![Template in Slack Asks](https://webassets.linear.app/images/ornj730p/production/1c16b6956b299a9b7d85364edc29529f81f33da3-668x250.png?q=95&auto=format&dpr=2)

Once created, the Ask includes the Slack thread as context so the original conversation is easy to reference later. If you add more information to the Slack thread after the Ask is created, it will get updated in the Linear issue automatically.
</details>

<details>
<summary>On bot-posted messages</summary>
Bot-posted messages can create an ask automatically if the bot's message begins with 🎫.

Use this when auto-create asks on 🎫 reaction or on new message is enabled.

On Business plans, this still works for bot messages posted in public channels.
</details>

## Submitting Asks from Slack

People can create Asks from connected Slack channels in several ways:

* From the overflow menu on an existing Slack message
* With the `/Asks` slash command
* In a DM with Linear Asks by creating a Private Ask
* By applying the 🎫 emoji to a message
* By mentioning `@Linear Asks` in a message, if enabled
* Automatically on every new message in configured public channels

Once created, Linear Asks posts a threaded reply with a link to the connected issue.

## Synced thread behavior

Slack Asks creates a synced comment thread between Slack and the Linear issue.

That means:

* Replies in the Slack thread are posted to the issue’s synced thread in Linear
* Replies in the synced Linear thread are posted back to the Slack thread
* Comments and files can be shared across both applications

This keeps the requester and the team working from the same conversation without moving the discussion elsewhere.

People who submit Asks can:

* See the issue status and assignee from Slack
* Reply in the synced thread
* Receive thread updates for key Ask status changes, such as when an Ask leaves Triage or reaches a terminal status, depending on the channel's Asks notification settings

Users with a Linear account can also use Slack quick actions to update the Ask, including changing its status or assigning it to themselves.

## Managing Asks from Slack

In the Linear Asks app home in Slack, requesters can:

* View active and closed Asks
* Open the original thread for an Ask
* See the real-time status and assignee
* Mark an Ask as urgent
* Close their own Ask by changing its status

Marking an Ask as urgent also adds a 🚨 reaction for visibility in Slack.

They can also use the Messages tab to view Asks and their threads, including private Asks.

Requesters are notified in the original thread when comments are posted and for key status changes configured for that Asks channel.

People in shared Slack channels can create Asks from Slack, including with `@Linear Asks`. The exact experience can vary depending on your workspace setup, channel configuration, and whether the person is an internal or external participant.

## FAQ

<details>
<summary>Can Asks be used in shared Slack Connect channels?</summary>
Yes. In a shared channel initiated by your organization, external Slack users can create issues in your Linear workspace by applying the 🎫 emoji reaction or mentioning `@Linear Asks`, if that option is enabled in Asks settings.

If auto-create on every new message is enabled for that channel, messages from both internal and external users will create asks.

Other creation methods are not available to external users in a shared channel. Depending on your Asks settings, external users may also be able to interact with the Ask unfurl, including marking an Ask as urgent when external user actions are enabled.
</details>

<details>
<summary>Why are there multiple Asks icons in a Slack thread?</summary>
This is a limitation of the Slack integration. Slack may show a different Asks icon for each distinct Linear user response sent through the Linear Asks app.
</details>

<details>
<summary>Can I link a Slack thread to a Linear issue over the API to create a synced thread?</summary>
Yes. You can link an existing Slack thread to a Linear issue over the API by passing `syncToCommentThread: true` to the `attachmentLinkSlack` mutation.
</details>

<details>
<summary>Can Asks be used in multi-person DMs?</summary>
Yes, with an important limitation. If Linear Asks is included in the DM from the beginning, asks can be used there.

Slack does not allow adding a bot to an ongoing multi-person DM later, so you cannot create an ask from an existing group DM unless the bot was already present from the start.

On Enterprise plans, one workaround is to convert the DM into a private channel and configure that channel in Asks settings.
</details>

<details>
<summary>Can I use Asks in multi-workspace channels on an Enterprise Grid?</summary>
Yes, though additional setup is required.

* Check which Slack workspaces in the Grid the channel belongs to
* Connect each relevant Slack workspace in Settings → Asks
* Add the same channel under the Asks settings for each individual Slack workspace
* Keep auto-create settings aligned so behavior stays consistent
</details>

<details>
<summary>When do URLs associated with an ask show unfurl previews in Slack?</summary>
If an ask belongs to a private team, it will not unfurl in Slack.

For other asks, make sure **Enable unfurls and actions in Slack** is turned on in Settings → Integrations → Asks.
</details>

<details>
<summary>Why am I not seeing some linked private channels in Asks settings?</summary>
Linear only shows private channels in Asks settings when it can verify that you belong to those channels in Slack.

If a private channel is missing, make sure your Slack account is connected to Linear, make sure you are a member of the private channel in Slack, and make sure Linear Asks has been invited to the channel with `/invite @Linear Asks`. After linking your Slack account or inviting the app, refresh the Asks settings page and check again.
</details>

<details>
<summary>Is every Slack Ask flow powered by @Linear Asks?</summary>
No. `@Linear Asks` is the conversational Ask flow in Slack that opens a guided creation dialog. Other Ask creation methods, such as emoji reaction or channel auto-create, may use different workflows depending on your workspace setup.
</details>

<details>
<summary>Why doesn't the preview in Slack match what I see in Linear?</summary>
Previews in Slack may not match the issue in Linear exactly. Some details and formatting are only visible in Linear.
</details>
