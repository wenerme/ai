---
title: "GitLab query editor | Grafana Enterprise Plugins documentation"
description: "Use the GitLab query editor to query commits, merge requests, pipelines, and more"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# GitLab query editor

This document explains how to use the GitLab query editor to build queries and visualize GitLab data. The query editor provides 13 resource types that map to the GitLab API, letting you query everything from commits and merge requests to pipelines, deployments, and audit events. Each resource type has its own set of filters to narrow results.

## Before you begin

- [Configure the GitLab data source](/docs/plugins/grafana-gitlab-datasource/latest/configure/).
- Verify your personal access token has the `read_api` scope.

## Resource types

The query editor supports the following resource types. Select a resource type from the **Resource Type** drop-down to configure the query.

- [Audit events](#audit-events)
- [Commits](#commits)
- [Deployments](#deployments)
- [Environments](#environments)
- [Issues](#issues)
- [Labels](#labels)
- [Merge request approvals](#merge-request-approvals)
- [Merge requests](#merge-requests)
- [Pipelines](#pipelines)
- [Projects](#projects)
- [Releases](#releases)
- [Tags](#tags)
- [Users](#users)

## Audit events

Query audit events for a specific project, group, or (on self-hosted GitLab with admin privileges) the entire instance.

> Note
>
> Audit events require a GitLab Premium subscription for project and group queries, or a self-hosted instance with admin privileges for instance-level queries.

Expand table

| Field          | Description                                                                         |
|----------------|-------------------------------------------------------------------------------------|
| **Query Type** | Select **Project** or **Group** to scope the audit event query.                     |
| **Project Id** | The numeric ID of the project. Displayed when **Query Type** is set to **Project**. |
| **Group ID**   | The numeric ID of the group. Displayed when **Query Type** is set to **Group**.     |

On self-hosted GitLab, if no project ID or group ID is set, the data source returns all audit events for the instance.

## Commits

Query commits from a specific project.

Expand table

| Field                  | Description                              |
|------------------------|------------------------------------------|
| **Project Id**         | Required. The numeric ID of the project. |
| **Ref (Branch / Tag)** | Optional. Filter by branch or tag name.  |

## Deployments

Query deployments from a specific project.

Expand table

| Field                 | Description                                                                                                               |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------|
| **Project Id**        | Required. The numeric ID of the project.                                                                                  |
| **Environment Query** | Optional. Filter by environment name.                                                                                     |
| **Status Query**      | Optional. Filter by deployment status. Accepted values: `created`, `running`, `success`, `failed`, `canceled`, `blocked`. |

## Environments

Query environments from a specific project.

Expand table

| Field          | Description                              |
|----------------|------------------------------------------|
| **Project Id** | Required. The numeric ID of the project. |
| **Name**       | Optional. Filter environments by name.   |

## Issues

Query issues from a specific project.

Expand table

| Field            | Description                                                  |
|------------------|--------------------------------------------------------------|
| **Project Id**   | Required. The numeric ID of the project.                     |
| **Search Query** | Optional. Search issues against their title and description. |

## Labels

Query labels from a specific project.

Expand table

| Field          | Description                              |
|----------------|------------------------------------------|
| **Project Id** | Required. The numeric ID of the project. |

## Merge request approvals

Retrieve approval information for a specific merge request.

Expand table

| Field          | Description                                                  |
|----------------|--------------------------------------------------------------|
| **Project Id** | Required. The numeric ID of the project.                     |
| **MR Number**  | Required. The merge request number (IID) within the project. |

## Merge requests

Query merge requests for a project, group, or all merge requests associated with the configured GitLab account.

If no **Project Id** or **Group Id** is provided, the data source returns all merge requests associated with the configured GitLab account.

Expand table

| Field                 | Description                                                                                                                                                                      |
|-----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Project Id**        | Optional. The numeric ID of the project.                                                                                                                                         |
| **Group Id**          | Optional. The numeric ID of the group.                                                                                                                                           |
| **State**             | Optional. Filter by state: `opened`, `closed`, `locked`, `merged`.                                                                                                               |
| **Milestone**         | Optional. Filter by milestone name. Use `None` for merge requests with no milestone, or `Any` for merge requests with any milestone. You can also enter a custom milestone name. |
| **Labels**            | Optional. Comma-separated list of label names. Use `None` for merge requests with no labels, or `Any` for merge requests with at least one label.                                |
| **Not labels**        | Optional. Comma-separated list of label names to exclude.                                                                                                                        |
| **Scope**             | Optional. Filter by scope: `created_by_me`, `assigned_to_me`, `all`.                                                                                                             |
| **Author Id**         | Optional. Filter by author’s numeric user ID. Mutually exclusive with **Author username**.                                                                                       |
| **Author username**   | Optional. Filter by author’s username. Mutually exclusive with **Author Id**.                                                                                                    |
| **Assignee Id**       | Optional. Filter by assignee’s numeric user ID.                                                                                                                                  |
| **Reviewer Id**       | Optional. Filter by reviewer’s numeric user ID. Mutually exclusive with **Reviewer username**.                                                                                   |
| **Reviewer username** | Optional. Filter by reviewer’s username. Mutually exclusive with **Reviewer Id**.                                                                                                |
| **Source branch**     | Optional. Filter by source branch name.                                                                                                                                          |
| **Target branch**     | Optional. Filter by target branch name.                                                                                                                                          |
| **Search**            | Optional. Search merge requests against their title and description.                                                                                                             |
| **Work in progress**  | Optional. Filter by draft status: `Yes` to return only draft merge requests, `No` to return only non-draft merge requests.                                                       |

## Pipelines

Query pipelines from a specific project.

Expand table

| Field           | Description                                                                                                                                                                                                                                                           |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Project Id**  | Required. The numeric ID of the project.                                                                                                                                                                                                                              |
| **Scope**       | Optional. Filter by pipeline scope: `running`, `pending`, `finished`, `branches`, `tags`.                                                                                                                                                                             |
| **Status**      | Optional. Filter by pipeline status: `created`, `waiting_for_resource`, `preparing`, `running`, `success`, `failed`, `canceled`, `skipped`, `manual`, `scheduled`.                                                                                                    |
| **Source**      | Optional. Filter by how the pipeline was triggered: `push`, `web`, `trigger`, `schedule`, `api`, `external`, `pipeline`, `chat`, `webide`, `merge_request_event`, `external_pull_request_event`, `parent_pipeline`, `ondemand_dast_scan`, `ondemand_dast_validation`. |
| **Ref**         | Optional. Filter by the Git ref (branch or tag name).                                                                                                                                                                                                                 |
| **SHA**         | Optional. Filter by the commit SHA.                                                                                                                                                                                                                                   |
| **Yaml Errors** | Optional. Select `Yes` to return only pipelines with invalid configurations, or `No` to exclude them.                                                                                                                                                                 |
| **Username**    | Optional. Filter by the username of the user who triggered the pipeline.                                                                                                                                                                                              |

## Projects

Query projects accessible to the configured GitLab account.

Expand table

| Field        | Description                                                                                                                       |
|--------------|-----------------------------------------------------------------------------------------------------------------------------------|
| **Owned**    | Optional. Select `True` to return only projects owned by the configured account, `False` to exclude them, or `All` for no filter. |
| **Archived** | Optional. Select `True` to return only archived projects, `False` to exclude them, or `All` for no filter.                        |
| **Search**   | Optional. Search projects by name.                                                                                                |
| **Sort**     | Optional. Sort results in `Ascending` or `Descending` order. Default: `Descending`.                                               |
| **Starred**  | Optional. Select `True` to return only starred projects, `False` to exclude them, or `All` for no filter.                         |

> Note
>
> Fetching all projects (with **Owned** set to `All` or `False`) may take a long time depending on how many projects are accessible.

## Releases

Query releases from a specific project.

Expand table

| Field          | Description                              |
|----------------|------------------------------------------|
| **Project Id** | Required. The numeric ID of the project. |

## Tags

Query tags from a specific project.

Expand table

| Field          | Description                                                                                                                   |
|----------------|-------------------------------------------------------------------------------------------------------------------------------|
| **Project Id** | Required. The numeric ID of the project.                                                                                      |
| **Search**     | Optional. Search tags by name. Use `^term` to find tags that begin with `term`, or `term$` to find tags that end with `term`. |
| **Order By**   | Optional. Order results by `Name` or `Update`. Default: `Update`.                                                             |
| **Sort**       | Optional. Sort results in `Ascending` or `Descending` order. Default: `Descending`.                                           |

## Users

Query users. Most filter fields require GitLab admin privileges.

Expand table

| Field                | Description                                                                                                           |
|----------------------|-----------------------------------------------------------------------------------------------------------------------|
| **Username**         | Optional. Filter by exact username.                                                                                   |
| **Active**           | Optional. Select `True` to return only active users, `False` to return only inactive users, or `All` for no filter.   |
| **Blocked**          | Optional. Select `True` to return only blocked users, `False` to return only unblocked users, or `All` for no filter. |
| **Search**           | Optional. Search by name, username, or public email.                                                                  |
| **Order By**         | Optional. Admin only. Order results by `Id`, `Name`, `Username`, `Created at`, or `Updated at`.                       |
| **Sort**             | Optional. Admin only. Sort results in `Ascending` or `Descending` order.                                              |
| **Two Factor**       | Optional. Admin only. Filter by two-factor authentication status: `Enabled` or `Disabled`.                            |
| **Admins**           | Optional. Admin only. Select `True` to return only admin users.                                                       |
| **External**         | Optional. Admin only. Select `True` to return only external users, or `All` for no filter.                            |
| **Without Projects** | Optional. Admin only. Select `True` to return only users without projects.                                            |

## Use transformations to answer common questions

You can use [transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to aggregate, group, and join query results to answer more complex questions.

### Count commits, issues, or deployments per day

To count the number of commits (or issues, or deployments) per day:

1. Add a query:

   a. Select the resource type (for example, **Commits**).

   b. Enter the **Project Id**.
2. Add a **Group by** transformation:

   a. Set **Group by** to `created_at_date`.

   b. Set **Calculate** to **Count** on the `id` field.
3. Select the **Time series** visualization.

### Track open merge requests in a table

To display a table of currently open merge requests:

1. Add a query:

   a. Select the **Merge Requests** resource type.

   b. Enter the **Project Id**.

   c. Set **State** to `opened`.
2. Select the **Table** visualization.
3. Optionally, add an **Organize fields by name** transformation to reorder or hide columns. A useful column order is `title`, `author`, `source_branch`, `target_branch`, `created_at`.

### Track deployment frequency by environment

To visualize how often deployments occur across environments:

1. Add a query:

   a. Select the **Deployments** resource type.

   b. Enter the **Project Id**.

   c. Optionally, set **Status Query** to `success` to count only successful deployments.
2. Add a **Group by** transformation:

   a. Set **Group by** to `environment`.

   b. Set **Calculate** to **Count** on the `id` field.
3. Select the **Bar chart** visualization to compare deployment counts across environments.

### Monitor pipeline failure rate

To track the ratio of failed pipelines over time:

1. Add two queries, both using the **Pipelines** resource type with the same **Project Id**:

   a. **Query A:** Set **Status** to `failed`.

   b. **Query B:** Leave **Status** empty to return all pipelines.
2. For each query, add a **Group by** transformation:

   a. Set **Group by** to `created_at_date`.

   b. Set **Calculate** to **Count** on the `id` field.
3. Add a **Merge** transformation to join both queries by `created_at_date`.
4. Add an **Add field from calculation** transformation:

   a. Set **Mode** to **Binary Operation**.

   b. Set the operation to **Query A** `id (count)` / **Query B** `id (count)`.

   c. Set **Alias** to `failure_rate`.
5. Select the **Time series** visualization to chart the failure rate over time.

### Calculate average issue resolution time

To find the average time to close issues:

1. Add a query:

   a. Select the **Issues** resource type.

   b. Enter the **Project Id**.
2. Add an **Add field from calculation** transformation:

   a. Set **Mode** to **Binary Operation**.

   b. Set the operation to `closed_at` - `created_at`.

   c. Set **Alias** to `resolution_time`.
3. Add another **Add field from calculation** transformation:

   a. Set **Mode** to **Binary Operation**.

   b. Set the operation to `resolution_time` / `86400000` (milliseconds in a day: 1000 x 3600 x 24).

   c. Set **Alias** to `resolution_time`.

   d. Enable **Replace all fields**.
4. Select the **Stat** visualization:

   a. Set **Show** to **Calculate**.

   b. Set **Calculation** to **Mean**.

   c. Set **Fields** to `resolution_time`.
