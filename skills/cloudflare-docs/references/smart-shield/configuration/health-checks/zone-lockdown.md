---
title: Zone Lockdown
description: Currently, any Cloudflare customer on a paid plan can configure Health Checks against any host or IP. Zone Lockdown specifies a list of one or more IP addresses, CIDR ranges, or networks that are the only IPs allowed to access a domain, subdomain, or URL. It allows multiple destinations in a single rule as well as IPv4 and IPv6 addresses. IP addresses not specified in the Zone Lockdown rule are denied access to the specified resources.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/smart-shield/configuration/health-checks/zone-lockdown.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Zone Lockdown

Currently, any Cloudflare customer on a paid plan can configure Health Checks against any host or IP. [Zone Lockdown](https://developers.cloudflare.com/waf/tools/zone-lockdown/) specifies a list of one or more IP addresses, CIDR ranges, or networks that are the only IPs allowed to access a domain, subdomain, or URL. It allows multiple destinations in a single rule as well as IPv4 and IPv6 addresses. IP addresses not specified in the Zone Lockdown rule are denied access to the specified resources.

Customers who use zone lockdown and want their health checks to continue passing can use [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) to bypass zone lockdown.

## Bypass zone lockdown

To bypass zone lockdown using a WAF custom rule:

1. Follow the steps to [create a custom rule in the dashboard](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/).
2. Create a custom rule matching on **user agent**.  
Cloudflare Health Checks have a user agent of the following format:`Mozilla/5.0 (compatible;Cloudflare-Healthchecks/1.0;+https://www.cloudflare.com/; healthcheck-id: XXX)` where `XXX` is replaced with the first 16 characters of the Health Check ID.  
To allow a specific Health Check, verify if the user agent contains the first 16 characters of the Health Check ID.
3. Set the action to _Skip_ and the corresponding feature to **Zone Lockdown** under **More components to skip**.

### Via the API

This example adds a new WAF custom rule to the ruleset with ID `{ruleset_id}` that skips zone lockdown for incoming requests with a user agent containing `1234567890abcdef`:

Terminal window

```

curl "https://api.cloudflare.com/client/v4/{zone_id}/rulesets/{ruleset_id}/rules" \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Content-Type: application/json" \

--data '{

  "action": "skip",

  "action_parameters": {

    "products": [

      "zoneLockdown"

    ]

  },

  "expression": "http.user_agent contains \"1234567890abcdef\"",

  "description": "bypass zone lockdown - specific healthcheck"

}'


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/smart-shield/","name":"Smart Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/smart-shield/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/smart-shield/configuration/health-checks/","name":"Health Checks"}},{"@type":"ListItem","position":5,"item":{"@id":"/smart-shield/configuration/health-checks/zone-lockdown/","name":"Zone Lockdown"}}]}
```
