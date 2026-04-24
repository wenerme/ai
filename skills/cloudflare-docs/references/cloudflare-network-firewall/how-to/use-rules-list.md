---
title: Use IP lists
description: Use IP lists in Network Firewall policies.
image: https://developers.cloudflare.com/zt-preview.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-network-firewall/how-to/use-rules-list.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Use IP lists

[IP lists](https://developers.cloudflare.com/waf/tools/lists/custom-lists/#ip-lists) are a part of Cloudflare's custom lists. Custom lists contain one or more items of the same type — IP addresses, hostnames or ASNs — that you can reference in rule expressions.

IP lists are defined at the account level and can be used to match against `ip.src` and `ip.dst` fields. Currently, Cloudflare Network Firewall (formerly Magic Firewall) only supports IPv4 addresses in these lists, not IPv6.

To use this feature:

## 1\. Create a [new IP list](https://developers.cloudflare.com/api/resources/rules/subresources/lists/methods/create/).

For example:

Terminal window

```

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

Terminal window

```

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

Terminal window

```

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

Explain Code

## Managed lists

Note

Available for customers with a Cloudflare Network Firewall Advanced plan.

You can create rules with managed lists. Managed IP Lists are [lists of IP addresses](https://developers.cloudflare.com/waf/tools/lists/managed-lists/#managed-ip-lists) maintained by Cloudflare and updated frequently.

You can access these managed lists when you create rules with either _IP destination address_ or _IP source address_ in the **Field** dropdown, and _is in list_ or _is not in list_ in the **Operator** dropdown.

For example:

| Field                    | Operator     | Value         |
| ------------------------ | ------------ | ------------- |
| _IP destination address_ | _is in list_ | _Anonymizers_ |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-network-firewall/","name":"Cloudflare Network Firewall"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-network-firewall/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-network-firewall/how-to/use-rules-list/","name":"Use IP lists"}}]}
```
