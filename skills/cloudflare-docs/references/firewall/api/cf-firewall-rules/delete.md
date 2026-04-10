---
title: DELETE examples
description: This example deletes firewall rules with IDs {rule_id_1} and {rule_id_2}.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/firewall/api/cf-firewall-rules/delete.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# DELETE examples

Note

The `DELETE` operation does not delete any filter related to the firewall rule. To delete the filter, use the [Filters API](https://developers.cloudflare.com/firewall/api/cf-filters/).

## Delete multiple rules

This example deletes firewall rules with IDs `{rule_id_1}` and `{rule_id_2}`.

Request

```

curl --request DELETE \

"https://api.cloudflare.com/client/v4/zones/{zone_id}/firewall/rules?id={rule_id_1}&id={rule_id_2}" \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>"


```

Response

```

{

  "result": [

    {

      "id": "<RULE_ID_1>"

    },

    {

      "id": "<RULE_ID_2>"

    }

  ],

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

## Delete a single rule

This example deletes the rule with ID `{rule_id}`.

Request

```

curl --request DELETE \

"https://api.cloudflare.com/client/v4/zones/{zone_id}/firewall/rules/{rule_id}" \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>"


```

Response

```

{

  "result": [

    {

      "id": "<RULE_ID>"

    }

  ],

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/firewall/","name":"Firewall Rules (deprecated)"}},{"@type":"ListItem","position":3,"item":{"@id":"/firewall/api/","name":"Manage rules via the APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/firewall/api/cf-firewall-rules/","name":"Firewall Rules API"}},{"@type":"ListItem","position":5,"item":{"@id":"/firewall/api/cf-firewall-rules/delete/","name":"DELETE examples"}}]}
```
