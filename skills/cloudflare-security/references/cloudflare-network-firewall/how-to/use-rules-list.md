---
description: Use IP lists in Network Firewall policies.
title: Use IP lists
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-network-firewall/llms.txt
> Use this file to discover all available pages before exploring further.

# Use IP lists

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-network-firewall/how-to/use-rules-list/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[IP lists](https://developers.cloudflare.com/waf/tools/lists/custom-lists/#ip-lists) are a part of Cloudflare's custom lists. Custom lists contain one or more items of the same type — IP addresses, hostnames or ASNs — that you can reference in rule expressions.

IP lists are defined at the account level and can be used to match against `ip.src` and `ip.dst` fields. Currently, Cloudflare Network Firewall (formerly Magic Firewall) only supports IPv4 addresses in these lists, not IPv6.

To use this feature:

## 1\. Create a [new IP list](https://developers.cloudflare.com/api/resources/rules/subresources/lists/methods/create/).

For example:

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/rules/lists \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
  "name": "iplist",
  "description": "This contains IPs that should be allowed.",
  "kind": "ip"
}'
```

## 2\. Add IPs to the list

Next, [create list items](https://developers.cloudflare.com/api/resources/rules/subresources/lists/subresources/items/methods/create/). This will add elements to the current list.

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/rules/lists/{list_id}/items \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '[
  {"ip":"10.0.0.1"},
  {"ip":"10.10.0.0/24"}
]'
```

## 3\. Use the list in a rule

Finally, add a Network Firewall rule referencing the list into an existing ruleset:

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets/{ruleset_id}/rules \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "action": "skip",
  "action_parameters": {
    "ruleset": "current"
  },
  "expression": "ip.src in $iplist",
  "description": "Allowed IPs from iplist",
  "enabled": true
}'
```

## Managed lists

Note

Available for customers with a Cloudflare Network Firewall Advanced plan.

You can create rules with managed lists. Managed IP Lists are [lists of IP addresses](https://developers.cloudflare.com/waf/tools/lists/managed-lists/#managed-ip-lists) maintained by Cloudflare and updated frequently.

You can access these managed lists when you create rules with either _IP destination address_ or _IP source address_ in the **Field** dropdown, and _is in list_ or _is not in list_ in the **Operator** dropdown.

For example:

| Field                    | Operator     | Value         |
| ------------------------ | ------------ | ------------- |
| _IP destination address_ | _is in list_ | _Anonymizers_ |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-network-firewall/how-to/use-rules-list/#page","headline":"Define an IP list · Cloudflare Network Firewall docs","description":"Use IP lists in Network Firewall policies.","url":"https://developers.cloudflare.com/cloudflare-network-firewall/how-to/use-rules-list/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
