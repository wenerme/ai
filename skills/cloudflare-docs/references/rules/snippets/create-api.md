---
title: Configure Snippets via API
description: Create Snippets using the Cloudflare API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Configure Snippets via API

You can create Snippets using the [Cloudflare API](https://developers.cloudflare.com/fundamentals/api/).

## Required permissions

The [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) used in API requests to manage Snippets must have at least the following permission:

* _Zone_ \> _Snippets_ \> _Edit_

Note

A token with this permission is only valid for the Snippets endpoints described in this page. You cannot use it to interact with the `http_request_snippets` phase via [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api/).

## Endpoints

To obtain the complete endpoint, append the Snippets endpoints listed below to the Cloudflare API base URL:

```

https://api.cloudflare.com/client/v4


```

The `{zone_id}` argument is the [zone ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) (a hexadecimal string). You can find this value in the Cloudflare dashboard.

The following table summarizes the available operations.

| Operation                          | Verb + Endpoint                                        |
| ---------------------------------- | ------------------------------------------------------ |
| List all code snippets             | GET /zones/{zone\_id}/snippets                         |
| Create/update code snippet         | PUT /zones/{zone\_id}/snippets/{snippet\_name}         |
| Get code snippet details           | GET /zones/{zone\_id}/snippets/{snippet\_name}         |
| Get code snippet content           | GET /zones/{zone\_id}/snippets/{snippet\_name}/content |
| Delete code snippet                | DELETE /zones/{zone\_id}/snippets/{snippet\_name}      |
| List snippet rules                 | GET /zones/{zone\_id}/snippets/snippet\_rules          |
| Create/update/delete snippet rules | PUT /zones/{zone\_id}/snippets/snippet\_rules          |
| Delete all snippet rules           | DELETE /zones/{zone\_id}/snippets/snippet\_rules       |

## Example API calls

### Create/update code snippet

To create or update a Snippet, use the following `PUT` request. The snippet is named `$SNIPPET_NAME` and the body contains the JavaScript code.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Snippets Write`

Update a zone snippet

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/snippets/$SNIPPET_NAME" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --form "files=@example.js" \

  --form "metadata={\"main_module\": \"example.js\"}"


```

The name of a snippet can only contain the characters `a-z`, `0-9`, and `_` (underscore). The name must be unique in the context of the zone. You cannot change the snippet name after creating the snippet.

The required body parameters are:

* `files`: The file with your JavaScript code.
* `metadata`: Object containing `main_module`, which must match the filename of the uploaded file.

To make this example work, save your JavaScript code in a file named `example.js`, and then execute `curl` command with a `PUT` request from the folder where `example.js` is located.

Example response

```

{

  "errors": [],

  "messages": [],

  "success": true,

  "result": {

    "created_on": "2023-07-24-00:00:00",

    "modified_on": "2023-07-24-00:00:00",

    "snippet_name": "snippet_name_01"

  }

}


```

To deploy a new snippet you must [create a snippet rule](#createupdatedelete-snippet-rules). The expression of the snippet rule defines when the snippet code will run.

### Create/update/delete snippet rules

Warning

When using this endpoint to create a new rule and keep existing rules, you must include all rules in the request body. Omitting an existing rule will delete the corresponding rule.

Once you have created a code snippet, you can link it to rules. This is done via the following `PUT` request to the `snippet_rules` endpoint.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Snippets Write`

Update zone snippet rules

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/snippets/snippet_rules" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "rules": [

        {

            "description": "Trigger snippet on specific cookie",

            "enabled": true,

            "expression": "http.cookie eq \"a=b\"",

            "snippet_name": "snippet_name_01"

        }

    ]

  }'


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/snippets/","name":"Cloudflare Snippets"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/snippets/create-api/","name":"Configure Snippets via API"}}]}
```
