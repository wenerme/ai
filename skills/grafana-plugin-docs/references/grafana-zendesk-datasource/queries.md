---
title: "Queries | Grafana Enterprise Plugins documentation"
description: "Querying Zendesk data source plugin"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Queries

Query instruction for the Zendesk data source plugin.

## Query types / Actions

The first step of the querying is selecting the **Action**/**Query Type**. Each action / query type represents an API in the Zendesk. Once you selected the Action / Query Type, you have to provide relevant additional information required for the API.

Some APIs require to pass mandatory parameters and they are available next to the action selection. If there are any optional parameters, they are available in the **Optional parameters** section of the query editor

* * *

## Search

Search allows you to search for tickets, users, and organizations in your Zendesk account.

When making a search request, you use the query parameter to specify a resource type, such as tickets or users. You also specify the criteria for the search, such as “users named Jane Doe” or “tickets with an open status”.

To see the full list of search parameters, refer to the [Zendesk Search documentation](https://support.zendesk.com/hc/en-us/articles/4408886879258-Zendesk-Support-search-reference).

#### Examples

Expand table

| Task                       | Query                                  |
|----------------------------|----------------------------------------|
| Search for a specific word | `Grafana`                              |
| Search for an exact string | `"Grafana Labs"`                       |
| Search for a ticket by id  | `3245227`                              |
| Search for a resource type | `type:user "Jane Doe"`                 |
| Search by ticket status    | `type:ticket status:open`              |
| Search by date             | `type:organization created<2099-05-01` |

* * *

## Show ticket by IDs

This action allows you to retrieve multiple ticket records by providing a list of ticket IDs.

The will return up to 100 ticket records in a single request.

#### Parameters

Expand table

| Name       | Required | Description         |
|------------|----------|---------------------|
| Ticket IDs | yes      | List of ticket IDs. |

* * *

## Show ticket comments

This query retrieves the comments associated with a specific ticket.

#### Parameters

Expand table

| Name      | Required | Description           |
|-----------|----------|-----------------------|
| Ticket ID | yes      | The ID of the ticket. |

* * *

## Show deleted tickets

This action returns a list of all deleted (and not yet archived) tickets.

#### Parameters

Expand table

| Name       | Required | Description                                                         |
|------------|----------|---------------------------------------------------------------------|
| Sort by    | no       | Sort by. Allowed values are `id`, `subject`, or `deleted_at`.       |
| Sort order | no       | Sort order. Defaults to `asc`. Allowed values are `asc`, or `desc`. |

* * *

## Count tickets

Returns an approximate count of tickets in the account. If the count exceeds 100,000, it is updated every 24 hours.

* * *

## Show all users

List all users registered to the Zendesk instance.

#### Parameters

Expand table

| Name | Required | Description                                                                       |
|------|----------|-----------------------------------------------------------------------------------|
| Role | no       | Filters the results by role. Possible values are `end-user`, `agent`, or `admin`. |

* * *

## Show selected users

This actions shows information about multiple users by their IDs.

#### Parameters

Expand table

| Name     | Required | Description                              |
|----------|----------|------------------------------------------|
| User IDs | yes      | The IDs of the users you want to lookup. |
