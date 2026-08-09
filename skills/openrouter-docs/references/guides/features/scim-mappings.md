> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# SCIM Group Mappings

> Automatically provision workspace access from your identity provider groups

SCIM group mappings connect groups from your identity provider to OpenRouter workspaces. Once a group is mapped, members of that group are automatically granted the chosen role in the mapped workspace, and access stays in sync as people join and leave groups in your IdP.

<Info>
  SCIM group mappings are available for organizations on Enterprise plans and require an active [SSO connection](/docs/guides/features/sso).
</Info>

## Prerequisites

* Your organization must be on an Enterprise plan
* You must be an **organization admin**
* Your organization must have an SSO connection (see [Single Sign-On (SSO)](/docs/guides/features/sso))
* Your identity provider must push groups to OpenRouter via SCIM provisioning

If no SSO connection exists yet, the SCIM Mappings tab prompts you to set one up first.

## Viewing Your Groups

While in your organization context, navigate to [Settings > Members](https://openrouter.ai/settings/organization-members?tab=scim-mappings) and select the **SCIM Mappings** tab.

Groups pushed by your identity provider appear here as cards, each showing the group name and how many workspaces it's mapped to. You can:

* **Filter** groups by all / mapped / unmapped
* **Refresh from IdP** to pull the latest groups on demand (the "Last synced" timestamp shows when groups were last refreshed)
* **View audit log** to see a history of mapping and membership changes

<Tip>
  Groups also sync automatically as your identity provider pushes changes. Use **Refresh from IdP** if you've just configured provisioning and don't see your groups yet.
</Tip>

## Creating a Mapping

<Steps>
  <Step title="Find the group">
    Locate the group card you want to map (use the **unmapped** filter to see groups without any mappings).
  </Step>

  <Step title="Add a mapping">
    Click **Add mapping**, then choose a workspace and a role, either **Member** or **Admin**. The role defaults to Member (or Admin, for groups whose name contains "admin").
  </Step>

  <Step title="Confirm">
    Click **Add mapping** to save. Everyone in the group is granted the chosen role in that workspace.
  </Step>
</Steps>

A group can be mapped to any number of workspaces, with one mapping per group–workspace pair.

## How Membership Sync Works

* **Joining a group**: when someone is added to a mapped group in your identity provider, they're automatically added to the mapped workspaces with the mapping's role.
* **Leaving a group**: when someone is removed from a mapped group, workspace access granted by that mapping is removed as well.
* **Multiple groups**: if a member belongs to several groups mapped to the same workspace, they get the highest role across those mappings (Admin wins over Member).
* **Deactivation or deletion**: when someone is deactivated or deleted in your identity provider, their organization membership and the API keys they created in the organization are deactivated. See [User Deactivation and Deletion](/docs/guides/features/sso#user-deactivation-and-deletion).

## Changing a Mapping's Role

Use the role selector on any mapping row to switch between **Member** and **Admin**. Existing members provisioned by the mapping are updated to their new effective role. Highest role still wins: a member who also gets Admin from another mapped group keeps Admin even if you lower this mapping to Member.

## Removing a Mapping

Click the delete button on a mapping row. Because members may have been added to the workspace by this mapping, you'll be asked what should happen to them:

* **Keep members**: the mapping is removed, but members added by it stay in the workspace. Their memberships become manually managed (keeping their current role), so group changes in your identity provider no longer affect them.
* **Remove members**: the mapping is removed, and members whose access came from this mapping are removed from the workspace

<Warning>
  Members who belong to another group still mapped to the same workspace keep their access either way. Only access that came solely from the deleted mapping is affected.
</Warning>

## Audit Log

Every change made through SCIM mappings is recorded. Click **View audit log** on the SCIM Mappings tab to see:

* Mappings created, role changes, and deletions, with the admin who made the change
* Members added to, removed from, or changed in workspaces, including changes triggered automatically by your identity provider

Entries link to the affected member and workspace so you can trace exactly why someone's access changed.

## Frequently Asked Questions

<AccordionGroup>
  <Accordion title="Why don't I see the SCIM Mappings tab?">
    The tab is available to organization admins on Enterprise plans. If you're on an Enterprise plan and still don't see it, contact [support@openrouter.ai](mailto:support@openrouter.ai).
  </Accordion>

  <Accordion title="Why is my group list empty?">
    Groups appear once your identity provider pushes them via SCIM provisioning. Check your IdP's provisioning configuration, then click **Refresh from IdP**. You also need an active [SSO connection](/docs/guides/features/sso).
  </Accordion>

  <Accordion title="Can I map one group to multiple workspaces?">
    Yes. Add as many mappings as you need on a group's card. Each workspace can have its own role for that group.
  </Accordion>

  <Accordion title="What happens if a group is deleted in my identity provider?">
    Once the deletion syncs (automatically, or via **Refresh from IdP**), the group is deactivated on OpenRouter and stops granting access through its mappings. Members who aren't entitled through another mapped group lose the access it granted, and the removals are recorded in the audit log.
  </Accordion>

  <Accordion title="Do mappings replace manual workspace membership?">
    No. Mappings work alongside manually managed members. Manually added members are unaffected by mapping changes.
  </Accordion>
</AccordionGroup>

## Getting Help

* **Setup assistance**: Email [support@openrouter.ai](mailto:support@openrouter.ai)
* **Enterprise plans**: Contact our sales team to enable SCIM group mappings for your organization
