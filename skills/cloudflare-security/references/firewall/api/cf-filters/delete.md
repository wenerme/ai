---
description: Delete filters or rules with DELETE API requests.
title: DELETE examples
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/firewall/llms.txt
> Use this file to discover all available pages before exploring further.

# DELETE examples

Last updated Apr 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/firewall/api/cf-filters/delete/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Delete multiple filters

This example deletes filters with IDs `{filter_id_1}` and `{filter_id_2}`.

```bash
curl --request DELETE \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/filters?id={filter_id_1}&id={filter_id_2}" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>"
```

```json
{
  "result": [
    {
      "id": "<FILTER_ID_1>"
    },
    {
      "id": "<FILTER_ID_2>"
    }
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```

## Delete a single filter

This example deletes a single filter with ID `{filter_id}`.

```bash
curl --request DELETE \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/filters/{filter_id}" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>"
```

```json
{
  "result": [
    {
      "id": "<FILTER_ID>"
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

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/firewall/api/cf-filters/delete/#page","headline":"DELETE examples - Filters · Cloudflare Firewall Rules (deprecated) docs","description":"Delete filters or rules with DELETE API requests.","url":"https://developers.cloudflare.com/firewall/api/cf-filters/delete/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
