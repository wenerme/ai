---
title: "Configure RBAC permissions | Grafana Plugins documentation"
description: "Configure RBAC permissions"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure RBAC permissions

SLO creation and management permissions are configurable through the [Role-based access control (RBAC)](/docs/grafana/latest/administration/roles-and-permissions/access-control/plan-rbac-rollout-strategy/) function in Grafana Cloud. This page tells you how to configure SLO access on an organizational level, or on a user level with folder permissions.

## RBAC user-based roles

You can use RBAC permissions to control which users can view, create, edit, and delete SLOs.

### Basic organizational roles

The following [basic roles](/docs/grafana/latest/administration/roles-and-permissions/#organization-roles) provide access to SLO functionality:

Expand table

| Basic Role    | Access                                                                         |
|---------------|--------------------------------------------------------------------------------|
| Admin         | View, create, edit, and delete SLOs. Can also modify organization preferences. |
| Editor        | View, create, edit, and delete SLOs.                                           |
| Viewer        | View SLOs.                                                                     |
| No basic role | No access to SLOs unless additional SLO roles or SLO permissions are assigned. |

These permissions apply to all SLOs in your Grafana instance.

### SLO-specific roles

You can also assign SLO-specific roles to grant access independently of a user’s basic role. This is useful when you want to grant individual access to users who don’t have an **Editor** or **Admin** basic role.

> Note
>
> SLO roles grant permission to perform SLO actions, but users must also have **folder permissions** to access SLOs in specific folders. For example, a user with the SLO Writer role can only create or edit SLOs in folders where they have folder edit permission.

Expand table

| SLO Role   | Access                                                                                                                          |
|------------|---------------------------------------------------------------------------------------------------------------------------------|
| SLO Admin  | View, create, edit, and delete SLOs in folders where the user has folder permissions. Can also modify organization preferences. |
| SLO Writer | View, create, edit, and delete SLOs in folders where the user has folder permissions.                                           |
| SLO Viewer | View SLOs in folders where the user has folder read permission.                                                                 |

## Configure SLO access across Grafana

To grant a user permission to view, create, update, and delete SLOs across your entire Grafana Cloud instance:

1. Sign in to Grafana as an organization administrator.
2. In the left navigation menu, click **Administration &gt; Users and access &gt; Users**.
3. Search for the user whose permissions you want to update.
4. In the **Role** field, assign the following roles: **SLO &gt; SLO Writer** and **Folders &gt; Writer**.
5. Click **Apply** to save the changes.

## Configure SLO access within folders

You can manage access to individual SLOs using folder-level permissions.

To allow a user to view, create, update, or delete SLOs within a specific folder, assign appropriate roles and configure the folder’s permissions.

You can customize access for users, service accounts, teams, and roles. For more information, see the [Grant folder permissions](/docs/grafana/latest/administration/user-management/manage-dashboard-permissions/#grant-folder-permissions) in the Grafana administration documentation.

> Note
>
> If a folder with restricted permissions is deleted, the visibility of the SLOs contained in that folder will default to the visibility settings for the Grafana SLO folder and will be visible in the SLO Overview accordingly.

To give a user view, create, update, and delete access for only the SLOs contained in a certain folder:

01. Sign in to Grafana as an organization administrator.
02. In the left-side menu, click **Administration &gt; Users and access &gt; Users**.
03. Search for the user whose permissions you want to edit.
04. Click the user’s role and, under the Plugins section of the drowpdown, click **SLO &gt; SLO Writer**.
05. Click **Apply** to save the changes.
06. Next, go to the left-side menu and click **Dashboards**.
07. Choose the folder you want to add permissions for.
08. Click **Folder actions** and select **Manage permissions** from the dropdown.
09. Click **Add a permission** and grant the specific user **Folder Edit** permissions.
10. The user is now able to view, create, update, and delete SLOs restricted to the chosen Folder.

## RBAC permissions

Grafana SLO supports the following RBAC permissions:

Expand table

| Permission                   | Description           | Included in roles                 | Available scopes                                         |
|------------------------------|-----------------------|-----------------------------------|----------------------------------------------------------|
| `grafana-slo-app.slo:read`   | Read SLOs             | SLO Reader, SLO Writer, SLO Admin | `plugins:id:grafana-slo-app` `folders:*` `folders:uid:*` |
| `grafana-slo-app.slo:write`  | Create or update SLOs | SLO Writer, SLO Admin             | `plugins:id:grafana-slo-app` `folders:*` `folders:uid:*` |
| `grafana-slo-app.slo:delete` | Delete SLOs           | SLO Writer, SLO Admin             | `plugins:id:grafana-slo-app` `folders:*` `folders:uid:*` |

> Note
>
> The **Available scopes** column shows where each permission *can be applied*, not what access is automatically granted. For example, `folders:*` means the permission can be scoped to all folders or to specific folders using `folders:uid:<folder-uid>`. You must explicitly assign these scopes when creating custom roles. The built-in SLO roles (SLO Reader, SLO Writer, SLO Admin) already include the `plugins:id:grafana-slo-app` scope, but users must still be granted folder permissions separately to access SLOs in specific folders.

### Permissions required for SLO actions

To perform specific SLO actions, users must be granted multiple permissions across the SLO app, folders, and plugin system. For most users, assigning an SLO role combined with folder permissions is the simplest approach.

| SLO action                      | Required permissions       | Applicable scope           | Recommended approach                                  |
|---------------------------------|----------------------------|----------------------------|-------------------------------------------------------|
| **Read**                        | grafana-slo-app.slo:read   | plugins:id:grafana-slo-app | **SLO Reader** + `folders:read` for required folders  |
|                                 | plugins.app:access         | plugins:id:grafana-slo-app |                                                       |
|                                 | folders:read               | folders:\*, folders:uid:*  |                                                       |
| **Create or**  **Update** | grafana-slo-app.slo:write  | plugins:id:grafana-slo-app | **SLO Writer** + `folders:write` for required folders |
|                                 | plugins.app:access         | plugins:id:grafana-slo-app |                                                       |
|                                 | folders:read               | folders:\*, folders:uid:*  |                                                       |
|                                 | folders:write              | folders:\*, folders:uid:*  |                                                       |
| **Delete**                      | grafana-slo-app.slo:delete | plugins:id:grafana-slo-app | **SLO Writer** + `folders:write` for required folders |
|                                 | plugins.app:access         | plugins:id:grafana-slo-app |                                                       |
|                                 | folders:read               | folders:\*, folders:uid:*  |                                                       |
|                                 | folders:write              | folders:\*, folders:uid:*  |                                                       |

### Role summary

Expand table

| Role           | Permissions included                                                                                                                                                                                                    |
|----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **SLO Reader** | Grants `grafana-slo-app.slo:read` and plugin access. Users can view SLOs in folders where they have folder read permission.                                                                                             |
| **SLO Writer** | Grants all SLO permissions (`read`, `write`, `delete`) and plugin access. Users can manage SLOs in folders where they have folder edit permission, and can view SLOs in folders where they have folder view permission. |
| **SLO Admin**  | Same as SLO Writer, plus the ability to modify organization preferences.                                                                                                                                                |

> Tip
>
> **Recommendation**: For most use cases, assign **SLO roles** (SLO Reader, SLO Writer, SLO Admin) combined with appropriate **folder permissions**. The SLO roles grant the ability to perform SLO actions, while folder permissions control which folders those actions apply to.
