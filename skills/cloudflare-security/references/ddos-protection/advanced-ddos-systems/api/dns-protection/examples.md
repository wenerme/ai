---
description: Example API requests for managing Advanced DNS Protection rules and settings.
title: Common API calls
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt
> Use this file to discover all available pages before exploring further.

# Common API calls

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/dns-protection/examples/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The following sections contain example requests for common API calls. For a list of available API endpoints, refer to [Endpoints](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/dns-protection/#endpoints).

## Get all DNS protection rules

The following example retrieves the currently configured rules for Advanced DNS Protection.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/advanced_dns_protection/configs/dns_protection/rules" \
--header "Authorization: Bearer <API_TOKEN>"
```

```json
---
{
  "result": [
    {
      "id": "<RULE_ID>",
      "scope": "<SCOPE>",
      "name": "<NAME>",
      "mode": "<MODE>",
      "profile_sensitivity": "<SENSITIVITY>",
      "rate_sensitivity": "<RATE>",
      "burst_sensitivity": "<BURST>",
      "created_on": "2023-10-01T13:10:38.762503+01:00",
      "modified_on": "2023-10-01T13:10:38.762503+01:00",
      }
    ],
  "success": true,
  "errors": [],
  "messages": []
}
```

### Create DNS protection rule

The following example creates an Advanced DNS Protection rule with a global scope.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/advanced_dns_protection/configs/dns_protection/rules" \
--header "Authorization: Bearer <API_TOKEN>" \
--data '{
  "scope": "global",
  "name": "global",
  "mode": "<MODE>",
  "rate_sensitivity": "<RATE>",
  "burst_sensitivity": "<BURST>",
  "profile_sensitivity": "<SENSITIVITY>"
}'
```

```json
{
  "result": {
    "id": "<RULE_ID>",
    "scope": "global",
    "name": "global",
    "mode": "<MODE>",
    "rate_sensitivity": "<RATE>",
    "burst_sensitivity": "<BURST>",
    "profile_sensitivity": "<SENSITIVITY>",
    "created_on": "2023-10-01T13:10:38.762503+01:00",
    "modified_on": "2023-10-01T13:10:38.762503+01:00",
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

Refer to [JSON objects](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/dns-protection/json-objects/) for more information on the fields in the JSON body.

### Update DNS protection rule

The following example updates an existing DNS protection rule with ID `{rule_id}`.

The request body can contain only the fields you want to update (from `mode`, `profile_sensitivity`, `rate_sensitivity`, and `burst_sensitivity`).

```bash
curl --request PATCH \
"https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/advanced_dns_protection/configs/dns_protection/rules/{rule_id}" \
--header "Authorization: Bearer <API_TOKEN>" \
--data '{
  "mode": "<NEW_MODE>",
  "profile_sensitivity": "<NEW_SENSITIVITY>",
  "rate_sensitivity": "<NEW_RATE>",
  "burst_sensitivity": "<NEW_BURST>"
}'
```

```json
{
  "result": {
    "id": "<RULE_ID>",
    "scope": "<SCOPE>",
    "name": "<NAME>",
    "mode": "<NEW_MODE>",
    "profile_sensitivity": "<NEW_SENSITIVITY>",
    "rate_sensitivity": "<NEW_RATE>",
    "burst_sensitivity": "<NEW_BURST>",
    "created_on": "2023-10-01T13:10:38.762503+01:00",
    "modified_on": "2023-10-01T13:10:38.762503+01:00",
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

Refer to [JSON objects](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/dns-protection/json-objects/) for more information on the fields in the JSON body.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/dns-protection/examples/#page","headline":"Common API calls · Cloudflare DDoS Protection docs","description":"Example API requests for managing Advanced DNS Protection rules and settings.","url":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/dns-protection/examples/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["REST API"]}
```
