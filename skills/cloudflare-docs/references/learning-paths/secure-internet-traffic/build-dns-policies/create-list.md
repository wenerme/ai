---
title: Create an allowlist or blocklist
description: Create DNS allow and block lists.
image: https://developers.cloudflare.com/cf-twitter-card.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/learning-paths/secure-internet-traffic/build-dns-policies/create-list.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Create an allowlist or blocklist

In the context of DNS filtering, a blocklist is a list of known harmful domains or IP addresses. An allowlist is a list of allowed domains or IP addresses, such as the domains of essential corporate applications.

Gateway supports creating [lists](https://developers.cloudflare.com/cloudflare-one/reusable-components/lists/) of URLs, hostnames, or other entries to use in your policies.

## Example list policy

* [ Dashboard ](#tab-panel-7638)
* [ API ](#tab-panel-7639)
* [ Terraform ](#tab-panel-7640)

The following DNS policy will allow access to all approved corporate domains included in a list called **Corporate Domains**.

| Selector | Operator | Value               | Action |
| -------- | -------- | ------------------- | ------ |
| Domain   | in list  | _Corporate Domains_ | Allow  |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "All-DNS-CorporateDomain-AllowList",

    "description": "Allow access to the corporate domains defined under the Corporate Domains list",

    "precedence": 1,

    "enabled": true,

    "action": "allow",

    "filters": [

        "dns"

    ],

    "traffic": "any(dns.domains[*] in $<CORPORATE_DOMAINS_LIST_UUID>)"

  }'


```

Explain Code

To create a new DNS policy using **Terraform** to allow access to all approved corporate domains included in a list called **Corporate Domains**.

```

resource "cloudflare_zero_trust_gateway_policy" "allow_corporate_domain_access" {

  account_id  = var.cloudflare_account_id

  name        = "All-DNS-CorporateDomain-AllowList"

  description = "Allow access to the corporate domains defined under the Corporate Domains list"

  precedence  = 1

  enabled     = false

  action      = "allow"

  filters     = ["dns"]

  traffic     = "any(dns.domains[*] in $<Corporate Domains List UUID>)"

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-internet-traffic/build-dns-policies/","name":"Build DNS security policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-internet-traffic/build-dns-policies/create-list/","name":"Create an allowlist or blocklist"}}]}
```
