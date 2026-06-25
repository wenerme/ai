---
title: "Configure RBAC permissions | Grafana Plugins documentation"
description: "Configure RBAC permissions"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure RBAC permissions

Dynamic Alerting creation and management permissions are configurable through the [Role-based access control (RBAC)](/docs/grafana/latest/administration/roles-and-permissions/access-control/plan-rbac-rollout-strategy/) function in Grafana Cloud.

## RBAC user-based permissions

You can use RBAC permissions to control which users can view, create, edit, and delete Dynamic Alerting forecasts and outlier detectors.

By default, all users with Viewer [basic organizational role](/docs/grafana/latest/administration/roles-and-permissions/#organization-roles) have access to view all resources, and all Editor and Admin roles have access to view, create, edit, and delete resources.

The ML plugin specific RBAC roles are:

- **ML Editors**:

  - Create/edit/delete forecasts and outlier detectors
  - Create/edit/delete holidays
- **ML Viewers**:

  - View forecasts and outlier detectors

### Configure ML permissions access across Grafana

You can modify an individual user’s permissions so that they are able to view, create, edit, and delete forecasts and outlier detectors across the entire Grafana Cloud instance. This is useful when you want to grant individual access to users who don’t have an Editor or Admin [basic organizational role](/docs/grafana/latest/administration/roles-and-permissions/#organization-roles).

To grant a user access to view, create, update, and delete Dynamic Alerting forecasts and outlier detectors across the entire Grafana Cloud instance:

1. Sign in to Grafana as an organization administrator.
2. In the left navigation menu, click **Administration &gt; Users and access &gt; Users**.
3. Find the user whose RBAC permissions you want to change.
4. Under the **Role** section, add **Plugin roles -&gt; Grafana AI/ML -&gt; ML Editor/ML Viewer**
5. Click **Apply** to save the changes.
