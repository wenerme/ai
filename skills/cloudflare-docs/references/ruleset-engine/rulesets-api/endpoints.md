---
title: Endpoints
description: Available Rulesets API endpoints for zones and accounts.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ruleset-engine/rulesets-api/endpoints.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Endpoints

For some operations, you can use specific endpoints provided by the Rulesets API for managing phase entry point rulesets. These endpoints include the phase name in the endpoint instead of the ruleset ID.

For example, instead of using the following endpoint:

```

PUT /zones/{zone_id}/rulesets/{ruleset_id}


```

You can use the following endpoint:

```

PUT /zones/{zone_id}/rulesets/phases/{phase_name}/entrypoint


```

To invoke a Rulesets API operation, append the endpoint to the Cloudflare API base URL:

```

https://api.cloudflare.com/client/v4


```

For authentication instructions, refer to [Getting Started: Requests](https://developers.cloudflare.com/fundamentals/api/) in the Cloudflare API documentation.

For help with endpoints and pagination, refer to [Getting Started: Endpoints](https://developers.cloudflare.com/fundamentals/api/).

Note

The Rulesets API endpoints require a value for `{account_id}` or `{zone_id}`.

To retrieve a list of accounts you have access to, use the [List Accounts](https://developers.cloudflare.com/api/resources/accounts/methods/list/) operation. Note the IDs of the accounts you want to manage.

To retrieve a list of zones you have access to, use the [List Zones](https://developers.cloudflare.com/api/resources/zones/methods/list/) operation. Note the IDs of the zones you want to manage.

The Cloudflare Rulesets API supports the operations outlined below. Visit the associated links for API endpoints and examples.

## List and view rulesets

| Operation                                                                                                                                                                      | Method | Notes                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ | ---------------------------------------------------------------------------------- |
| [List existing rulesets](https://developers.cloudflare.com/ruleset-engine/rulesets-api/view/#list-existing-rulesets)                                                           | GET    | Returns the list of existing rulesets at the account level or at the zone level.   |
| [View a specific ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/view/#view-a-specific-ruleset)                                                         | GET    | Returns the properties of the most recent version of a specific ruleset.           |
| [List all versions of a ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/view/#list-all-versions-of-a-ruleset)                                           | GET    | Returns a list of all the versions of a ruleset.                                   |
| [View a specific version of a ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/view/#view-a-specific-version-of-a-ruleset)                               | GET    | Returns the configuration of a specific version of a ruleset, including its rules. |
| [List rules in a managed ruleset with a specific tag](https://developers.cloudflare.com/ruleset-engine/rulesets-api/view/#list-rules-in-a-managed-ruleset-with-a-specific-tag) | GET    | Returns a list of all the rules in a managed ruleset with a specific tag.          |

## Create rulesets

| Operation                                                                                 | Verb | Notes                                             |
| ----------------------------------------------------------------------------------------- | ---- | ------------------------------------------------- |
| [Create a ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/create/) | POST | Creates a new ruleset or a new phase entry point. |

## Update and deploy rulesets

| Operation                                                                                                | Verb   | Notes                                                                                                                                              |
| -------------------------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Update or deploy a ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update/)      | PUT    | Updates the basic properties of a ruleset and the list of rules in the ruleset.Allows you to configure the execution of managed rulesets.          |
| [Add a rule to a ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/add-rule/)       | POST   | Adds a single rule to an existing ruleset.Allows you to add a single rule without having to include all the existing ruleset rules in the request. |
| [Update a rule in a ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update-rule/) | PATCH  | Updates the definition of a single rule within a ruleset.Allows you to change the order of a rule in a ruleset.                                    |
| [Delete a rule in a ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/delete-rule/) | DELETE | Deletes a single rule in a ruleset.                                                                                                                |

## Delete rulesets

| Operation                                                                                                                | Verb   | Notes                                    |
| ------------------------------------------------------------------------------------------------------------------------ | ------ | ---------------------------------------- |
| [Delete a ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/delete/#delete-ruleset)                 | DELETE | Deletes all the versions of a ruleset.   |
| [Delete a ruleset version](https://developers.cloudflare.com/ruleset-engine/rulesets-api/delete/#delete-ruleset-version) | DELETE | Deletes a specific version of a ruleset. |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rulesets-api/","name":"Rulesets API"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rulesets-api/endpoints/","name":"Endpoints"}}]}
```
