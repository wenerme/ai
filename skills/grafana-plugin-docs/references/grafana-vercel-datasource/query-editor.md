---
title: "Vercel query editor | Grafana Enterprise Plugins documentation"
description: "Use the Vercel query editor to query deployments, projects, domains, and other Vercel resources in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Vercel query editor

This document explains how to use the Vercel query editor to query resources from the Vercel REST API.

## Before you begin

Before you build a query, ensure you have [configured the Vercel data source](/docs/plugins/grafana-vercel-datasource/latest/configure/) and that your access token has permission to read the resources you want to query.

## Key concepts

If you’re new to Vercel, this document uses the following terms:

Expand table

| Term                        | Description                                                                                        |
|-----------------------------|----------------------------------------------------------------------------------------------------|
| **Action**                  | The Vercel REST API resource that a query targets. You select an action from the **Action** field. |
| **Deployment**              | A build of a project deployed to Vercel. Each deployment has a state, such as `READY` or `ERROR`.  |
| **Alias**                   | A custom or generated URL assigned to a deployment.                                                |
| **Drain** and **Log Drain** | Destinations that receive a team’s events or logs.                                                 |
| **Edge Config**             | A global key-value store that your projects read at the edge.                                      |

## Build a query

Each query targets a single Vercel REST API resource, which you select with the **Action** field.

1. In a panel or in [Explore](/docs/grafana/latest/explore/), select your Vercel data source.
2. Select an action from the **Action** field.
3. Enter any required parameters, such as a deployment or drain identifier.
4. Expand **Additional Parameters** to set optional query parameters.
5. Run the query.

Some parameters populate their values from a drop-down. For example, when you select an action that requires a `deployment_id`, the editor loads the available deployments so you can pick one instead of entering an ID manually.

## Actions

The query editor supports the following actions, grouped by resource category.

Expand table

| Category       | Action                                          | Description                                                                                   | API endpoint                             |
|----------------|-------------------------------------------------|-----------------------------------------------------------------------------------------------|------------------------------------------|
| Access Groups  | List access groups                              | Lists access groups for a team, project, or member.                                           | `/v1/access-groups`                      |
| Access Groups  | Reads an access group                           | Reads a single access group by ID or name.                                                    | `/v1/access-groups/{idOrName}`           |
| Access Groups  | List projects of an access group                | Lists the projects in an access group.                                                        | `/v1/access-groups/{idOrName}/projects`  |
| Access Groups  | List members of an access group                 | Lists the members of an access group.                                                         | `/v1/access-groups/{idOrName}/members`   |
| Aliases        | List aliases                                    | Lists aliases for the account or team, optionally filtered by domain or project.              | `/v4/aliases`                            |
| Aliases        | Get an Alias                                    | Gets a single alias by host name or alias ID.                                                 | `/v4/aliases/{idOrName}`                 |
| Aliases        | List Deployment Aliases                         | Lists the aliases assigned to a deployment.                                                   | `/v2/deployments/{id}/aliases`           |
| Artifacts      | Get status of Remote Caching for this principal | Reports whether Remote Caching is enabled, disabled, or disabled due to usage limits.         | `/v8/artifacts/status`                   |
| Authentication | List Auth Tokens                                | Lists the authentication tokens for the current user.                                         | `/v5/user/tokens`                        |
| Authentication | Get Auth Token Metadata                         | Gets metadata for a single authentication token.                                              | `/v5/user/tokens/{tokenId}`              |
| Checks         | Retrieve a list of all checks                   | Lists the checks created for a deployment.                                                    | `/v1/deployments/{deploymentId}/checks`  |
| Deployments    | List deployments                                | Lists deployments for the account or team, with filters for project, state, target, and more. | `/v6/deployments`                        |
| Deployments    | Get a deployment by ID or URL                   | Gets a single deployment by its ID or URL.                                                    | `/v13/deployments/{deployment_id}`       |
| Deployments    | Get deployment events                           | Gets the build logs and events for a deployment.                                              | `/v3/deployments/{deployment_id}/events` |
| Domains        | List all the domains                            | Lists domains registered to the account or team.                                              | `/v5/domains`                            |
| Domains        | Check the price for a domain                    | Checks the purchase price and period for a domain.                                            | `/v4/domains/price`                      |
| Drains         | Retrieve a list of all drains                   | Lists the drains configured for the team.                                                     | `/v1/drains`                             |
| Drains         | Find a drain by ID                              | Gets a single drain by its ID.                                                                | `/v1/drains/{id}`                        |
| Edge Config    | Get Edge Configs                                | Lists all Edge Configs.                                                                       | `/v1/edge-config`                        |
| Log Drains     | Retrieves a list of all the Log Drains          | Lists all log drains owned by the account.                                                    | `/v1/log-drains`                         |
| Log Drains     | Get a log drain                                 | Gets a single log drain by its ID (deprecated).                                               | `/v1/log-drains/{id}`                    |
| Projects       | Retrieve a list of projects                     | Lists projects for the account or team.                                                       | `/v9/projects`                           |
| Security       | Read active attack data                         | Returns firewall attack activity from the last 24 hours for a project.                        | `/v1/security/firewall/attack-status`    |
| Teams          | List all teams                                  | Lists the teams the authenticated user belongs to.                                            | `/v2/teams`                              |
| Webhooks       | Get a list of webhooks                          | Lists webhooks for a team or project.                                                         | `/v1/webhooks`                           |
| Webhooks       | Get a webhook                                   | Gets a single webhook by its ID.                                                              | `/v1/webhooks/{webhook_id}`              |

## Common parameters

Many actions share the following parameters. The query editor hides time range and limit parameters by default; they appear under **Additional Parameters**.

Expand table

| Parameter | Description                                                                                     | Default         |
|-----------|-------------------------------------------------------------------------------------------------|-----------------|
| `teamId`  | The team identifier to perform the request on behalf of. Populated from the configured Team ID. | `${team_id}`    |
| `slug`    | The team slug to perform the request on behalf of.                                              | None            |
| `limit`   | Limits the number of results retrieved.                                                         | `100`           |
| `since`   | Returns results created after this JavaScript timestamp. Bound to the dashboard time range.     | `${__timeFrom}` |
| `until`   | Returns results created before this JavaScript timestamp. Bound to the dashboard time range.    | `${__timeTo}`   |

Actions that target a specific resource include a required path parameter, such as `deployment_id`, `idOrName`, `id`, `tokenId`, or `webhook_id`. The editor populates these from a drop-down using a related list action, so you can select a resource instead of entering its identifier.

## Action-specific parameters

Some actions expose additional parameters and filters.

### List deployments

The **List deployments** action supports these filters, in addition to the common parameters:

Expand table

| Parameter           | Description                                                                                         |
|---------------------|-----------------------------------------------------------------------------------------------------|
| `app`               | Name of the deployment.                                                                             |
| `projectId`         | Filter deployments by the given project ID or name.                                                 |
| `rollbackCandidate` | Filter deployments based on their rollback candidacy.                                               |
| `state`             | Filter deployments by state: `BUILDING`, `ERROR`, `INITIALIZING`, `QUEUED`, `READY`, or `CANCELED`. |
| `target`            | Filter deployments by environment.                                                                  |
| `users`             | Filter deployments by the users who created them.                                                   |

### Get deployment events

The **Get deployment events** action supports a `direction` parameter with the values `backward` or `forward`, along with `builds`, `delimiter`, and `follow` flags.

### Check the price for a domain

The **Check the price for a domain** action requires a domain `name` and supports a `type` parameter with the values `new`, `renewal`, `transfer`, or `redemption`.

### Read active attack data

The **Read active attack data** action requires a `projectId` and returns active attack data from the last 24-hour window.

## Query examples

The following examples show how to configure common queries. Each example assumes you’ve selected your Vercel data source in a panel.

### List failed deployments for a project

Use this query to build a table of deployments that failed to build.

1. Select **List deployments** from the **Action** field.
2. Expand **Additional Parameters**.
3. Set `projectId` to your project ID or name.
4. Set `state` to `ERROR`.
5. Run the query, then set the panel visualization to **Table**.

The `since` and `until` parameters default to the dashboard time range, so the table follows the selected time window.

### Chart deployment frequency over time

Use this query to visualize how often you deploy.

1. Select **List deployments** from the **Action** field.
2. Optionally expand **Additional Parameters** and set `target` to an environment, such as `production`.
3. Run the query, then set the panel visualization to **Table** or a time-based visualization.
4. Use the parsed `created` time field to group or graph deployments by time.

### Monitor firewall attack activity

Use this query to surface active attacks on a project.

1. Select **Read active attack data** from the **Action** field.
2. Set the required `projectId`.
3. Run the query, then set the panel visualization to **Stat** or **Table**.

### Audit registered domains

Use this query to list the domains registered for your account or team.

1. Select **List all the domains** from the **Action** field.
2. Run the query, then set the panel visualization to **Table**.
3. Use the parsed `createdAt` and `boughtAt` time fields to track domain age.

## Use cases

The Vercel data source supports scenarios such as:

- **Deployment monitoring:** Track deployment status and frequency, and alert on failed builds with the **List deployments** action filtered by `state`.
- **Security monitoring:** Watch firewall activity across projects with the **Read active attack data** action.
- **Domain management:** Audit registered domains and their purchase dates with the **List all the domains** action.
- **Log drain oversight:** Confirm which log drains are configured for your account or team with the **Retrieves a list of all the Log Drains** action.

## Next steps

- [Use template variables](/docs/plugins/grafana-vercel-datasource/latest/template-variables/)
- [Troubleshoot the Vercel data source](/docs/plugins/grafana-vercel-datasource/latest/troubleshooting/)
