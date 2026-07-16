# Intercom

Our Intercom integration makes it easy to keep track of bugs and feature requests and interact with the customers who report them.

> [!NOTE]
> Available to workspaces on our [Business](https://linear.app/pricing) and [Enterprise](https://linear.app/pricing) plans.

![Linear and Intercom logos](https://webassets.linear.app/images/ornj730p/production/b37ff30ec6a94c31bf19c16a4151747ff924f9fb-2880x1620.png?q=95&auto=format&dpr=2)

## Overview

The Intercom integration lets you create and link Linear issues from Intercom conversations. Linked issues appear in the Intercom sidebar with their identifier, status, and assignee. Linked Intercom conversations will show up in Linear issues as link attachments.

## Configure

Enable the integration in Linear from [Settings > Features > Integrations > Intercom](https://linear.app/settings/integrations/intercom). A Linear app will show up in the Conversation details sidebar in Intercom with options to create issues or link issues. You can show or hide the Linear app in Intercom's sidebar by pinning Linear under _Edit apps._

When you uninstall and reinstall the Intercom integration on the same Linear workspace, syncing resumes for existing linked conversations. Changes made while the integration is disconnected will not sync retroactively, and integration settings will reset to their defaults.

## User Access

Anyone in Intercom can create or link Linear issues and see the issue details in the sidebar. Only Linear users will be able to view linked issues in Linear. If the person who created the issue is a Linear member, the issue will show that it was created by them and they'll see the issue under _Created_ in _My Issues_. Otherwise, the issue will show it was created by Intercom.

## Create new issues

Create a new issue using the button from the right sidebar. It will bring up a form which requires a title and that you assign a team. You can also optionally include a description with additional details from the Intercom conversation, assign a priority, add an assignee or add a label.

If Triage is enabled for the team, issues created without a manually selected status will go to Triage. Otherwise, they'll use the team's default issue status, falling back to the first Backlog status if no default is configured. The Intercom conversation will show up as a link attachment in the Linear issue.

### Create with Linear Agent

In addition to creating issues manually from an Intercom conversation, you can now use the _Create with Linear Agent_ option to automatically create Linear issues using AI.

When selected, Linear analyzes the entire conversation, including customer messages, support replies, metadata, and any attachments, and identifies the underlying product request or bug. The Linear Agent generates an informed title and description while pulling in the relevant context from your conversation with the customer.

![Create Linear issues automatically with the Linear Agent](https://webassets.linear.app/images/ornj730p/production/6690f2e2a1414f007321531ab0a8f1213a6aae70-696x760.png?q=95&auto=format&dpr=2)

When an Intercom conversation is linked to a Linear issue, a customer request is automatically created using the contact and company information from the conversation.

To use the Linear Agent in Intercom, make sure the Intercom integration is installed and connected, then enable the feature in _Settings_ > _Integrations_ > _Intercom_.

You can provide optional instructions each time you create issues with Linear Agent. Workspace admins can also configure persistent guidance that applies whenever Linear Agent creates issues from Intercom.

Once enabled, you can optionally provide guidance that helps the agent choose the right team or template when creating issues. These instructions can include examples, routing hints, or references to internal documentation. The agent will follow this guidance when creating issues, ensuring they land in the appropriate place within your workflow.

![Linear Agent guidance to route new issues created through Intercom](https://webassets.linear.app/images/ornj730p/production/b11dd176e244aba10997374331bb0afa8c2c5c38-1524x1428.png?q=95&auto=format&dpr=2)

### Use templates

Linear admins can designate up to 10 [templates](https://linear.app/docs/issue-templates) to be available for quick use from within the Linear integration in Intercom. Selecting any of these templates will pre-fill issue property fields appropriately, helping to speed up issue creation and maintain a high level of data hygiene in your issues.

## Search and link issues

Click the link issue option and then search for it by title or issue ID. The Intercom conversation will be added to the Linear issue as a link attachment. Optionally add all or parts of the newly linked conversation to the Linear issue as a comment.

### View issue details

From the Intercom conversation, you will see all linked issues in the sidebar along with the issue ID, status, and assignee.  Click the issue title from the Intercom sidebar to view more details. From here, you will also have the option to view the issue in Linear or remove the link with the associated Linear issue.

### Link multiple issues

You can link multiple Intercom conversations to a single Linear issue. You can also link multiple Linear issues to a single conversation in Intercom.

## Re-open conversations

When a linked issue is completed or canceled, Linear posts an internal note to the Intercom conversation and reopens it by default. You can configure reopening for completed issues, canceled issues, and new comments separately in the integration settings.

![Intercom integration re-open conversations setting](https://webassets.linear.app/images/ornj730p/production/e959a66c93d9b6003aba0a3079defedb0d84ea3d-1446x502.png?q=95&auto=format&dpr=2)

## Internal notes

By default, Intercom posts an internal note when issues are created, canceled, or completed. Optionally set the integration to post an internal note whenever the issue status is updated. This feature allows Intercom users to gain additional signal on the issue without context switching away from Intercom. Please note that internal notes left in Intercom do not sync to the associated Linear issue.

![Intercom integration internal notes setting](https://webassets.linear.app/images/ornj730p/production/24290a9f755f88502131461fe54f3be5ac2b13b4-1372x440.png?q=95&auto=format&dpr=2)

## Link Intercom conversations in Linear issues

* Open the issue's `…` menu icon.
* Click _Add link_
* Click _Intercom conversation_

### Remove links

Click _Unlink_ from the Linear sidebar in Intercom to remove the link between the conversation and a Linear issue. You can also remove this from the Linear issue by right-clicking on the Intercom link attachment or clicking the `…` icon on the link attachment.

### Filter for Intercom links

From any Linear view, you can filter by issues linked to Intercom conversations. Click`F`, then select `Links` and then select `Intercom`.
