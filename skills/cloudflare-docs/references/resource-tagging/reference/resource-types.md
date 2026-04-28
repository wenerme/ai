---
title: Supported resource types
description: Resource types that support tagging and their required fields.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Supported resource types

The Tagging API supports the following resource types across account-level and zone-level scopes.

## Account-level resources

Use `/accounts/{account_id}/tags` endpoints for these resource types.

| Resource type              | Required extra fields | Description                          |
| -------------------------- | --------------------- | ------------------------------------ |
| account                    | None                  | The Cloudflare account itself        |
| access\_application        | None                  | Access application                   |
| access\_group              | None                  | Access group                         |
| ai\_gateway                | None                  | AI Gateway                           |
| alerting\_policy           | None                  | Notification policy                  |
| alerting\_webhook          | None                  | Notification webhook destination     |
| cloudflared\_tunnel        | None                  | Cloudflare Tunnel                    |
| d1\_database               | None                  | D1 database                          |
| durable\_object\_namespace | None                  | Durable Objects namespace            |
| gateway\_list              | None                  | Gateway list                         |
| gateway\_rule              | None                  | Gateway rule                         |
| image                      | None                  | Cloudflare Image                     |
| kv\_namespace              | None                  | Workers KV namespace                 |
| queue                      | None                  | Queue                                |
| r2\_bucket                 | None                  | R2 bucket                            |
| stream\_live\_input        | None                  | Stream live input                    |
| stream\_video              | None                  | Stream video                         |
| workers\_script            | None                  | Workers script                       |
| workers\_script\_version   | script\_name          | Specific version of a Workers script |

## Zone-level resources

Use `/zones/{zone_id}/tags` endpoints for these resource types.

| Resource type                | Required extra fields   | Description                       |
| ---------------------------- | ----------------------- | --------------------------------- |
| access\_application\_policy  | access\_application\_id | Access application policy         |
| api\_gateway\_operation      | None                    | API Gateway operation             |
| custom\_certificate          | None                    | Custom SSL certificate            |
| custom\_hostname             | None                    | Custom hostname (SSL for SaaS)    |
| dns\_record                  | None                    | DNS record                        |
| managed\_client\_certificate | None                    | Managed client certificate (mTLS) |
| zone                         | None                    | DNS zone                          |

## Extra fields

Most resource types only require `resource_type` and `resource_id`. Two types require an additional field in both request bodies and query parameters.

### `workers_script_version`

Include the `script_name` field:

Terminal window

```

# GET

curl -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags?resource_type=workers_script_version&resource_id=$VERSION_ID&script_name=my-worker" \

  -H "Authorization: Bearer $API_TOKEN"


# PUT

curl -X PUT "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags" \

  -H "Authorization: Bearer $API_TOKEN" \

  -H "Content-Type: application/json" \

  -d '{

    "resource_type": "workers_script_version",

    "resource_id": "'"$VERSION_ID"'",

    "script_name": "my-worker",

    "tags": {

      "version": "1.2.3",

      "environment": "staging"

    }

  }'


```

Explain Code

### `access_application_policy`

Include the `access_application_id` field:

Terminal window

```

# GET

curl -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/tags?resource_type=access_application_policy&resource_id=$POLICY_ID&access_application_id=$APP_ID" \

  -H "Authorization: Bearer $API_TOKEN"


# PUT

curl -X PUT "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/tags" \

  -H "Authorization: Bearer $API_TOKEN" \

  -H "Content-Type: application/json" \

  -d '{

    "resource_type": "access_application_policy",

    "resource_id": "'"$POLICY_ID"'",

    "access_application_id": "'"$APP_ID"'",

    "tags": {

      "sensitivity": "high",

      "team": "security"

    }

  }'


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/resource-tagging/","name":"Resource Tagging"}},{"@type":"ListItem","position":3,"item":{"@id":"/resource-tagging/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/resource-tagging/reference/resource-types/","name":"Supported resource types"}}]}
```
