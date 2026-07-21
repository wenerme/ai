---
description: Create filters or rules with a POST API request.
title: POST example
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/firewall/llms.txt
> Use this file to discover all available pages before exploring further.

#  POST example

Last updated Apr 24, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/firewall/api/cf-firewall-rules/post/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

This example creates several firewall rules using a single API call.

Note

To create a firewall rule you need a [filter](https://developers.cloudflare.com/firewall/api/cf-filters/what-is-a-filter/) identifier (`id`). If you have not created a filter yet, refer to the [Cloudflare Filters API documentation](https://developers.cloudflare.com/firewall/api/cf-filters/).

```bash
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/firewall/rules" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '[
  {
    "filter": {
      "id": "<FILTER_ID_1>"
    },
    "action": "allow",
    "description": "Do not challenge login from office"
  },
  {
    "filter": {
      "id": "<FILTER_ID_2>"
    },
    "action": "challenge",
    "description": "Challenge login"
  },
  {
    "filter": {
      "id": "<FILTER_ID_3>"
    },
    "action": "js_challenge",
    "description": "Non-interactive challenge site"
  },
  {
    "filter": {
      "id": "<FILTER_ID_4>"
    },
    "action": "allow",
    "description": "Allow API traffic without challenge"
  }
]'
```

```json
{
  "result": [
    {
      "id": "<RULE_ID_1>",
      "paused": false,
      "description": "Do not challenge login from office",
      "action": "allow",
      "priority": null,
      "filter": {
        "id": "<FILTER_ID_1>",
        "expression": "ip.src in {2400:cb00::/32 2803:f800::/32 2c0f:f248::/32 2a06:98c0::/29} and (http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")",
        "paused": false,
        "description": "Login from office"
      }
    },
    {
      "id": "<RULE_ID_2>",
      "paused": false,
      "description": "Challenge login",
      "action": "challenge",
      "priority": null,
      "filter": {
        "id": "<FILTER_ID_2>",
        "expression": "(http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")",
        "paused": false,
        "description": "Login"
      }
    },
    {
      "id": "<RULE_ID_3>",
      "paused": false,
      "description": "Non-interactive challenge site",
      "action": "js_challenge",
      "priority": null,
      "filter": {
        "id": "<FILTER_ID_3>",
        "expression": "not http.request.uri.path matches \"^/api/.*$\"",
        "paused": false,
        "description": "not /api"
      }
    },
    {
      "id": "<RULE_ID_4>",
      "paused": false,
      "description": "Allow API traffic without challenge",
      "action": "allow",
      "priority": null,
      "filter": {
        "id": "<FILTER_ID_4>",
        "expression": "http.request.uri.path matches \"^/api/.*$\"",
        "paused": false,
        "description": "/api"
      }
    }
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/firewall/api/cf-firewall-rules/post/#page","headline":"POST examples - Firewall rules · Cloudflare Firewall Rules (deprecated) docs","description":"Create filters or rules with a POST API request.","url":"https://developers.cloudflare.com/firewall/api/cf-firewall-rules/post/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
