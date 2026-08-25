---
description: Restrict Health Checks access to specific Cloudflare IP addresses.
title: Zone Lockdown
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/health-checks/llms.txt
> Use this file to discover all available pages before exploring further.

# Zone Lockdown

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/health-checks/how-to/zone-lockdown/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Currently, any Cloudflare customer on a paid plan can configure Health Checks against any host or IP. [Zone Lockdown](https://developers.cloudflare.com/waf/tools/zone-lockdown/) specifies a list of one or more IP addresses, CIDR ranges, or networks that are the only IPs allowed to access a domain, subdomain, or URL. It allows multiple destinations in a single rule as well as IPv4 and IPv6 addresses. IP addresses not specified in the Zone Lockdown rule are denied access to the specified resources.

Customers who use zone lockdown and want their health checks to continue passing can use [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) to bypass zone lockdown.

## Bypass zone lockdown

To bypass zone lockdown using a WAF custom rule:

1. Follow the steps to [create a custom rule in the dashboard](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/).
2. Create a custom rule matching on **user agent**.
Cloudflare Health Checks have a user agent of the following format: `Mozilla/5.0 (compatible;Cloudflare-Healthchecks/1.0;+https://www.cloudflare.com/; healthcheck-id: XXX)` where `XXX` is replaced with the first 16 characters of the Health Check ID.
To allow a specific Health Check, verify if the user agent contains the first 16 characters of the Health Check ID.
3. Set the action to _Skip_ and the corresponding feature to **Zone Lockdown** under **More components to skip**.

### Via the API

This example adds a new WAF custom rule to the ruleset with ID `{ruleset_id}` that skips zone lockdown for incoming requests with a user agent containing `1234567890abcdef`:

```bash
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

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/health-checks/how-to/zone-lockdown/#page","headline":"Zone lockdown migration guide · Cloudflare Health Checks docs","description":"Restrict Health Checks access to specific Cloudflare IP addresses.","url":"https://developers.cloudflare.com/health-checks/how-to/zone-lockdown/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
