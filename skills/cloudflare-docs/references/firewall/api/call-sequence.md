---
title: Call sequence
description: Recommended API call sequence for firewall rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/firewall/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Call sequence

The API call examples in this site illustrate the **recommended sequence** of calling the two APIs (the [Cloudflare Filters API](https://developers.cloudflare.com/firewall/api/cf-filters/) and the [Firewall Rules API](https://developers.cloudflare.com/firewall/api/cf-firewall-rules/)).

Deprecation notice

Cloudflare Firewall Rules has been deprecated. Cloudflare has moved existing firewall rules to [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/). For more information on this change, refer to the [upgrade guide](https://developers.cloudflare.com/waf/reference/legacy/firewall-rules-upgrade/).

The image below depicts this sequence, which can be applied for creating and editing rules. The reverse would apply for delete operations.

![Recommended flow for calling the Cloudflare Filters API and Firewall Rules API when creating or editing rules](https://developers.cloudflare.com/_astro/recommended-flow.DBuGef-x_Z1MtD3V.webp) 

Cloudflare recommends this sequence because it facilitates filter reusability and allows working with either API independently. Thanks to the standalone nature of Cloudflare Filters, the same filter can be shared in multiple firewall rules and in other future Cloudflare products and features.

For example, a filter that matches all traffic for your API (that is, `http.request.uri.path matches "^/api/.*$"`) may disable caching, disable human CAPTCHAs, configure JSON custom errors, and appear in a firewall rule. With the recommended sequence above, you would repeat steps 3-6 for every Cloudflare feature to configure against the same filter created in steps 1-2.

However, for a `POST` operation, the **simplified sequence** — shown below — allows you to create both a filter and rule in the same call. In this case, the filter and rule only refer to each other.

![Basic flow for invoking the Firewall Rules API to create both a filter and a rule in a single call](https://developers.cloudflare.com/_astro/simple-flow.DifdHPUG_Z1uWBix.webp) 

In this sequence, a single `POST` request to the `/firewall/rules` endpoint takes the filter object in the JSON to create the filter in the Filters API (also via a `POST` request). If successful, the firewall rule is created.

Below is an example call and response using this method:

Request

```

curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/firewall/rules" \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>" \

--header "Content-Type: application/json" \

--data '[

  {

    "filter": {

      "expression": "http.request.uri.path contains \"/api/\" and ip.src eq 93.184.216.34"

    },

    "action": "block"

  }

]'


```

Explain Code

Response

```

{

  "result": [

    {

      "id": "<RULE_ID>",

      "paused": false,

      "action": "block",

      "priority": null,

      "filter": {

        "id": "<FILTER_ID>",

        "expression": "http.request.uri.path contains \"/api/\" and ip.src eq 93.184.216.34",

        "paused": false

      }

    }

  ],

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

However, this approach has some disadvantages:

* The firewall rules client has to implement error and exception handling for every potential failure occurring in both the firewall rules and the filters APIs.
* To protect against accidentally modifying or deleting filters used by other Cloudflare features, the `PUT` or `DELETE` operations are not allowed.

By default, if either the filter or rule is invalid, neither will be created.

However, one exception applies. If you are about to exceed your rule quota, Cloudflare may create the filter but not the firewall rule. This happens because the rule is only created after the filter in the sequence diagram.

After you resolve the issue of exceeding your quota or requesting a feature that is unavailable to your zone, return to the recommended flow to create a rule that references the filter.

In summary, Cloudflare strongly recommends the sequence with the two API calls. Limit your rule and filter creation using the simplified sequence for emergency situations, and only via `curl` requests.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/firewall/","name":"Firewall Rules (deprecated)"}},{"@type":"ListItem","position":3,"item":{"@id":"/firewall/api/","name":"Manage rules via the APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/firewall/api/call-sequence/","name":"Call sequence"}}]}
```
