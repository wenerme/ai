---
canonical: https://grafana.com/docs/grafana/latest/alerting/set-up/configure-rbac/access-roles
description: Manage access using roles
keywords:
  - grafana
  - alerting
  - set up
  - configure
  - RBAC
  - role access
labels:
  products:
    - enterprise
    - cloud
title: Manage access using roles
weight: 100
---

# Manage access using roles

In Grafana Enterprise and Grafana Cloud there are Basic, Fixed, and Custom roles.

## Basic roles

There are four basic roles: `Admin`, `Editor`, `Viewer`, and `None`. Each basic role contains a number of fixed roles.

Details of the basic roles and the access they provide for Grafana Alerting are below.

| Role          | Access                                                                                                                                                                                                                                              |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Admin         | Write access to alert rules, notification resources (notification API, contact points, templates, time intervals, notification policies, and silences), alert enrichments, and provisioning.                                                        |
| Editor        | Write access to alert rules, notification resources (notification API, contact points, templates, time intervals, notification policies, and silences), alert enrichments, and provisioning.                                                        |
| Viewer        | Read access to alert rules, notification resources (notification API, contact points, templates, time intervals, notification policies, and silences), and alert enrichments.                                                                       |
| No basic role | A blank canvas to assign fixed or custom roles and craft permissions more precisely. For example, if you want to give a user the ability to see alert rules, but not notification settings, add No basic role and then the fixed role Rules reader. |

## Fixed roles

A fixed role is a group of multiple permissions.

Fixed roles provide users more granular access to create, view, and update Alerting resources than you would have with basic roles alone.

Details of the fixed roles and the access they provide for Grafana Alerting are below.

| Display name in UI / Fixed role                                                          | Permissions                                                                                                                                                                                                                                                                                                                                                                          | Description                                                                                                                                              |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Silences Writer: `fixed:alerting.instances:writer`                                       | All permissions from `fixed:alerting.instances:reader` and `alert.instances:create``alert.instances:write` for organization scope  `alert.instances.external:write` for scope `datasources:*`                                                                                                                                                                            | Add and update silences in Grafana and external providers.                                                                                               |
| Instances and Silences Reader: `fixed:alerting.instances:reader`                         | `alert.instances:read` for organization scope  `alert.instances.external:read` for scope `datasources:*`                                                                                                                                                                                                                                                                         | Read alert instances and silences in Grafana and external providers.                                                                                     |
| Notifications Writer: `fixed:alerting.notifications:writer`                              | All permissions from `fixed:alerting.notifications:reader`, `fixed:alerting.receivers:writer`, `fixed:alerting.templates:writer`, `fixed:alerting.time-intervals:writer`, `fixed:alerting.routes:writer`, `fixed:alerting.inhibition-rules:writer`, `fixed:alerting.notifications.external:writer`and `alert.notifications:write` for organization scope | Add, update, and delete notification policies and contact points in Grafana and external providers.                                                      |
| Notifications Reader: `fixed:alerting.notifications:reader`                              | All permissions from `fixed:alerting.receivers:reader`, `fixed:alerting.templates:reader`, `fixed:alerting.time-intervals:reader`, `fixed:alerting.routes:reader`, `fixed:alerting.inhibition-rules:reader`, `fixed:alerting.notifications.external:reader`and `alert.notifications:read` for organization scope                                             | Read notification policies and contact points in Grafana and external providers.                                                                         |
| Rules Writer: `fixed:alerting.rules:writer`                                              | All permissions from `fixed:alerting.rules:reader` and  `alert.rule:create`  `alert.rule:write`  `alert.rule:delete`  `alert.silences:create`  `alert.silences:write` for scope `folders:*`  `alert.rules.external:write` for scope `datasources:*`                                                                                                          | Create, update, and delete all alert rules and manage rule-specific silences.                                                                            |
| Rules Reader: `fixed:alerting.rules:reader`                                              | `alert.rule:read`, `alert.silences:read` for scope `folders:*`  `alert.rules.external:read` for scope `datasources:*`  `alert.notifications.time-intervals:read`  `alert.notifications.receivers:list`                                                                                                                                                                   | Read all alert rules and rule-specific silences in Grafana and external providers.                                                                       |
| Full access: `fixed:alerting:writer`                                                     | All permissions from `fixed:alerting.rules:writer` `fixed:alerting.instances:writer``fixed:alerting.notifications:writer`                                                                                                                                                                                                                                                    | Add, update, and delete alert rules, silences, contact points, and notification policies in Grafana and external providers.                              |
| Full read-only access: `fixed:alerting:reader`                                           | All permissions from `fixed:alerting.rules:reader` `fixed:alerting.instances:reader``fixed:alerting.notifications:reader`                                                                                                                                                                                                                                                    | Read alert rules, alert instances, silences, contact points, and notification policies in Grafana and external providers.                                |
| Read via Provisioning API + Export Secrets: `fixed:alerting.provisioning.secrets:reader` | `alert.provisioning:read` and `alert.provisioning.secrets:read`                                                                                                                                                                                                                                                                                                                      | Read alert rules, alert instances, silences, contact points, and notification policies using the provisioning API and use export with decrypted secrets. |
| Access to alert rules provisioning API: `fixed:alerting.provisioning:writer`             | `alert.provisioning:read` and `alert.provisioning:write`                                                                                                                                                                                                                                                                                                                             | Manage all alert rules, notification policies, contact points, templates, in the organization using the provisioning API.                                |
| Set provisioning status: `fixed:alerting.provisioning.provenance:writer`                 | `alert.provisioning.provenance:write`                                                                                                                                                                                                                                                                                                                                                | Set provisioning rules for Alerting resources. Should be used together with other regular roles (Notifications Writer and/or Rules Writer.)              |
| Contact Point Reader: `fixed:alerting.receivers:reader`                                  | `alert.notifications.receivers:read` for scope `receivers:*`                                                                                                                                                                                                                                                                                                                         | Read all contact points.                                                                                                                                 |
| Contact Point Creator: `fixed:alerting.receivers:creator`                                | `alert.notifications.receivers:create`  `alert.notifications.receivers.test:create` for scope `receivers:uid:-`                                                                                                                                                                                                                                                                  | Create a new contact point. The user is automatically granted full access to the created contact point.                                                  |
| Contact Point Writer: `fixed:alerting.receivers:writer`                                  | All permissions from `fixed:alerting.receivers:creator`  `alert.notifications.receivers:read`, `alert.notifications.receivers:write`, `alert.notifications.receivers:delete` and `alert.notifications.receivers.test:create` for scope `receivers:*`                                                                                                                             | Create a new contact point and manage all existing contact points.                                                                                       |
| Templates Reader: `fixed:alerting.templates:reader`                                      | `alert.notifications.templates:read`                                                                                                                                                                                                                                                                                                                                                 | Read all notification templates.                                                                                                                         |
| Templates Writer: `fixed:alerting.templates:writer`                                      | `alert.notifications.templates:read`, `alert.notifications.templates:write`, `alert.notifications.templates:delete`, `alert.notifications.templates.test:write`                                                                                                                                                                                                                      | Create new and manage existing notification templates. Test templates with custom payloads.                                                              |
| Time Intervals Reader: `fixed:alerting.time-intervals:reader`                            | `alert.notifications.time-intervals:read`                                                                                                                                                                                                                                                                                                                                            | Read all time intervals.                                                                                                                                 |
| Time Intervals Writer: `fixed:alerting.time-intervals:writer`                            | `alert.notifications.time-intervals:read`, `alert.notifications.time-intervals:write`, `alert.notifications.time-intervals:delete`                                                                                                                                                                                                                                                   | Create new and manage existing time intervals.                                                                                                           |
| Notification Policies Reader: `fixed:alerting.routes:reader`                             | `alert.notifications.routes:read`                                                                                                                                                                                                                                                                                                                                                    | Read all notification policies.                                                                                                                          |
| Notification Policies Writer: `fixed:alerting.routes:writer`                             | `alert.notifications.routes:read``alert.notifications.routes:write`                                                                                                                                                                                                                                                                                                              | Create new and manage existing notification policies.                                                                                                    |
| Inhibition Rules Reader: `fixed:alerting.inhibition-rules:reader`                        | `alert.notifications.inhibition-rules:read` for scope `inhibition-rules:*`                                                                                                                                                                                                                                                                                                           | Read all inhibition rules.                                                                                                                               |
| Inhibition Rules Writer: `fixed:alerting.inhibition-rules:writer`                        | All permissions from `fixed:alerting.inhibition-rules:reader` and`alert.notifications.inhibition-rules:write`, `alert.notifications.inhibition-rules:delete` for scope `inhibition-rules:*`                                                                                                                                                                                      | Create, update, and delete all inhibition rules.                                                                                                         |
| Full admin access: `fixed:alerting:admin`                                                | All permissions from `fixed:alerting:writer` and`alert.notifications.receivers.permissions:read`, `alert.notifications.receivers.permissions:write`, `alert.notifications.receivers:readSecrets`, `alert.notifications.receivers:updateProtected` for scope `receivers:*`                                                                                                        | Full write access in Grafana and all external providers, including their permissions, protected fields and secrets.                                      |
| Enrichments Reader: `fixed:alerting.enrichments:reader`                                  | `alert.enrichments:read`                                                                                                                                                                                                                                                                                                                                                             | Read all alert enrichment configurations.                                                                                                                |
| Enrichments Writer: `fixed:alerting.enrichments:writer`                                  | `alert.enrichments:read``alert.enrichments:write`                                                                                                                                                                                                                                                                                                                                | Create new and manage existing alert enrichment configurations.                                                                                          |
| External Notifications Reader: `fixed:alerting.notifications.external:reader`            | `alert.notifications.external:read` for scope `datasources:*`                                                                                                                                                                                                                                                                                                                        | Read notification policies and contact points in external providers.                                                                                     |
| External Notifications Writer: `fixed:alerting.notifications.external:writer`            | All permissions from `fixed:alerting.notifications.external:reader` and`alert.notifications.external:write` for scope `datasources:*`                                                                                                                                                                                                                                            | Add, update, and delete contact points and notification policies in external providers.                                                                  |

## Create custom roles

Create custom roles of your own to manage permissions. Custom roles contain unique combinations of permissions, actions and scopes. Create a custom role when basic roles and fixed roles do not meet your permissions requirements.

For more information on creating custom roles, refer to [Create custom roles](https://grafana.com/docs/grafana/latest/administration/roles-and-permissions/access-control/manage-rbac-roles/#create-custom-roles).

{{< admonition type="note" >}}
It is not recommended to create custom roles that include `alerting.notifications.receiver` actions with a scope other than `receivers:*`. The UID used in the scope is not stable and changes whenever a contact point is renamed.
{{< /admonition >}}

### Examples

The following examples give you an idea of how you can combine permissions for Grafana Alerting.

A custom role for read access to alert rules in folder F:

```
PUT access-control/roles
{
	"name": "custom:alert_rules_reader",
	"displayName": "Alert rule reader in folder F",
	"description": "Read access to rules in folder F that use DS1 and DS2",
	"permissions": [
    	{
        	"action": "alert.rules:read",
        	"scope": "folders:uid:UID_F"
    	},
    	{
        	"action": "folders:read",
        	"scope": "folders:uid:UID_F"
    	}
	]
}
```

A custom role for write access to alert rules that uses simplified routing:

```
PUT access-control/roles
{
	"name": "custom:alert_rules_updater",
	"displayName": "Alert rules editor in folder F",
	"description": "Edit access to rules in folder F that use DS1 and DS2",
	"permissions": [
    	{
        	"action": "alert.rules:read",
        	"scope": "folders:uid:UID_F"
    	},
    	{
        	"action": "alert.rules:read",
        	"scope": "folders:uid:UID_F"
    	},
    	{
        	"action": "alert.rules:write",
        	"scope": "folders:uid:UID_F"
    	},
    	{
        	"action": "alert.rules:create",
        	"scope": "folders:uid:UID_F"
    	},
    	{
        	"action": "alert.notifications.receivers:list",
    	},
{
        	"action": "alert.notifications.time-intervals:read",
    	},
	]
}
```

{{< admonition type="note" >}}
Delete the last two permissions if you aren’t using simplified notification routing.
{{< /admonition >}}

## Assign roles

To assign roles, complete the following steps.

1. Navigate to Administration > Users and access > Users, Teams, or Service Accounts.
1. Search for the user, team or service account you want to add a role for.
1. Select the role you want to assign.
