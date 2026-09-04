---
title: "Zendesk query editor | Grafana Enterprise Plugins documentation"
description: "Use the Zendesk query editor to query tickets, users, and organizations."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Zendesk query editor

This document explains how to use the Zendesk query editor to retrieve data from your Zendesk account.

## Before you begin

Before you build a query, ensure you have:

- Configured the [Zendesk data source](/docs/plugins/grafana-zendesk-datasource/latest/configure/).
- An API token with permission to access the resources you want to query.

## Key concepts

The following terms are used throughout the query editor:

Expand table

| Term                    | Description                                                                                                                    |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| **Action**              | The Zendesk API endpoint a query calls, selected from the **Action** drop-down. Also called the query type.                    |
| **Search query syntax** | Zendesk’s expression language for the **Search** action, using filters such as `type:`, `status:`, and `created>`.             |
| **Resource type**       | The kind of Zendesk object a search targets, set with `type:`, for example `type:ticket`, `type:user`, or `type:organization`. |

## Query types

The first step when building a query is selecting the **Action**, also called the query type. Each action represents an API endpoint in Zendesk. After you select an action, provide the additional information the API requires. Required parameters appear next to the action selector, and any optional parameters appear in the **Optional parameters** section of the query editor.

The query editor supports the following query types:

- **Search:** Search for tickets, users, and organizations.
- **Show tickets by IDs:** Retrieve multiple ticket records by their IDs.
- **Show ticket comments:** Retrieve the comments on a specific ticket.
- **Show deleted tickets:** List deleted tickets that aren’t yet archived.
- **Count tickets:** Return an approximate ticket count for the account.
- **Show all users:** List all users registered to the Zendesk instance.
- **Show selected users:** Retrieve information about specific users by their IDs.

## Search

Search lets you search for tickets, users, and organizations in your Zendesk account. Use the query parameter to specify a resource type, such as tickets or users, along with the search criteria, such as users named Jane Doe or tickets with an open status.

To see the full list of search parameters, refer to the [Zendesk search reference](https://support.zendesk.com/hc/en-us/articles/4408886879258-Zendesk-Support-search-reference).

### Parameters

Expand table

| Name         | Required | Description                                                                                                                                                                                                                   |
|--------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Search query | yes      | The search expression. Defaults to `type:ticket`. Refer to the [Zendesk search query syntax](https://developer.zendesk.com/documentation/ticketing/using-the-zendesk-api/searching-with-the-zendesk-api/#basic-query-syntax). |

### Examples

The following table shows example search queries:

Expand table

| Task                       | Query                                  |
|----------------------------|----------------------------------------|
| Search for a specific word | `Grafana`                              |
| Search for an exact string | `"Grafana Labs"`                       |
| Search for a ticket by ID  | `3245227`                              |
| Search for a resource type | `type:user "Jane Doe"`                 |
| Search by ticket status    | `type:ticket status:open`              |
| Search by date             | `type:organization created<2099-05-01` |

## Show tickets by IDs

This action retrieves multiple ticket records by providing a list of ticket IDs. It returns up to 100 ticket records in a single request.

### Parameters

Expand table

| Name       | Required | Description                                                                                                                       |
|------------|----------|-----------------------------------------------------------------------------------------------------------------------------------|
| Ticket IDs | yes      | The list of ticket IDs to retrieve. Enter a single ID, such as `35436`, or several comma-separated IDs, such as `35436,20057623`. |

## Show ticket comments

This action retrieves the comments associated with a specific ticket.

### Parameters

Expand table

| Name      | Required | Description           |
|-----------|----------|-----------------------|
| Ticket ID | yes      | The ID of the ticket. |

## Show deleted tickets

This action returns a list of all deleted tickets that aren’t yet archived.

### Parameters

Expand table

| Name       | Required | Description                                                                                    |
|------------|----------|------------------------------------------------------------------------------------------------|
| Sort by    | no       | The field to sort by. Allowed values are `subject` and `deleted_at`. Defaults to `deleted_at`. |
| Sort order | no       | The sort order. Allowed values are `asc` and `desc`. Defaults to `asc`.                        |

## Count tickets

This action returns an approximate count of tickets in the account. If the count exceeds 100,000, Zendesk updates it every 24 hours. Because it returns a numeric value, this query type works well as an alerting condition.

## Show all users

This action lists all users registered to the Zendesk instance.

### Parameters

Expand table

| Name | Required | Description                                                                       |
|------|----------|-----------------------------------------------------------------------------------|
| Role | no       | Filters the results by role. Allowed values are `end-user`, `agent`, and `admin`. |

## Show selected users

This action shows information about multiple users by their IDs.

### Parameters

Expand table

| Name  | Required | Description                                                                                                                                 |
|-------|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| Users | yes      | The IDs of the users to look up. The editor populates this list from your Zendesk users, and you can also type the ID of any user manually. |

The editor fills the **Users** drop-down from the results of the **Show all users** query, showing each user’s name while sending the user ID to the API. This pairs well with a template variable: create a `user` variable from **Show all users**, then reference it here as `${user}`. Refer to [Zendesk template variables](/docs/plugins/grafana-zendesk-datasource/latest/template-variables/).

## Use cases

The following examples show common ways to use the Zendesk data source. Query examples show how to configure fields, while use cases show when each query type is useful.

Expand table

| Use case                          | Query type           | How to configure it                                                                                     |
|-----------------------------------|----------------------|---------------------------------------------------------------------------------------------------------|
| Monitor open ticket volume        | Count tickets        | Add the query with no parameters, then show the result in a stat panel or use it as an alert condition. |
| Track your open ticket backlog    | Search               | Set **Search query** to `type:ticket status:open`.                                                      |
| Find tickets created in a period  | Search               | Set **Search query** to `type:ticket created>2026-01-01`.                                               |
| Audit your agent roster           | Show all users       | Set **Role** to `agent` to list only agents.                                                            |
| Investigate a ticket conversation | Show ticket comments | Set **Ticket ID** to the ticket you want to inspect.                                                    |
| Review recently deleted tickets   | Show deleted tickets | Set **Sort by** to `deleted_at` and **Sort order** to `desc`.                                           |
| Look up specific customers        | Show selected users  | Select one or more users in the **Users** drop-down, or drive it from a template variable.              |

Because the **Search**, **Show tickets by IDs**, and user query types return timestamped fields, such as `created_at` and `updated_at`, you can plot them on time series panels or use them to drive [annotations](/docs/plugins/grafana-zendesk-datasource/latest/annotations/).

## Next steps

After you build a query, you can:

- Visualize the results in a [panel](/docs/grafana/latest/panels-visualizations/).
- Query data interactively in [Explore](/docs/grafana/latest/explore/).
- Set up [Alerting](/docs/plugins/grafana-zendesk-datasource/latest/alerting/) rules on numeric queries, such as ticket counts.
