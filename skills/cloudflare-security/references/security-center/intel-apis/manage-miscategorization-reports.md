---
description: Submit domain miscategorization reports using the Cloudflare API.
title: Manage miscategorization reports
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/security-center/llms.txt
> Use this file to discover all available pages before exploring further.

# Manage miscategorization reports

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/security-center/intel-apis/manage-miscategorization-reports/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide will show you how to manage miscategorization of reports. To complete this guide, you will need to generate an [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

1. Create an [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) if you do not have one already.
2. Choose **Custom Token**.
3. Name the token, and grant permissions.
4. Send a `POST` request to the miscategorization [API endpoint ↗](https://developers.cloudflare.com/api/resources/intel/subresources/miscategorizations/methods/create/). You can find an example below:

```json

export URL="https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/miscategorization"
curl -X POST "$URL" \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type:application/json" \
--data '{
  "content_adds": [
  ],
  "content_removes": [
  ],
  "indicator_type": "domain",
  "ip": null,
  "security_adds": [
    115
  ],
  "security_removes": [
  ],
  "url": "cloudflare.com"
}'
```

You should receive a response with the value `"success": true`:

```json
{
  "result": "",
  "success": true,
  "errors": [],
  "messages": []
}
```

Once you send the request, the Cloudflare Support team will receive it and will be able to take action.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/security-center/intel-apis/manage-miscategorization-reports/#page","headline":"Manage miscategorization reports · Cloudflare Security Center docs","description":"Submit domain miscategorization reports using the Cloudflare API.","url":"https://developers.cloudflare.com/security-center/intel-apis/manage-miscategorization-reports/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
