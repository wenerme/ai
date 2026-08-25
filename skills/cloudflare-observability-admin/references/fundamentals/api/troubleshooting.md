---
description: Resolve common Cloudflare API token issues including verification failures, incorrect permissions, and syntax errors.
title: Troubleshooting
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt
> Use this file to discover all available pages before exploring further.

# Troubleshooting

Last updated Apr 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/fundamentals/api/troubleshooting/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## The token is not verified

Ensure the token has been verified by running the following `curl` command and confirming that the response returns `"status": "active"`.

```bash
curl "https://api.cloudflare.com/client/v4/user/tokens/verify" \
--header "Authorization: Bearer <API_TOKEN>"
```

```json
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": {
    "id": "f267e341f3dd4697bd3b9f71dd96247f",
    "status": "active",
    "not_before": "2018-07-01T05:20:00Z",
    "expires_on": "2020-01-01T00:00:00Z"
  }
}
```

## The token has incorrect permissions

Review the permissions groups for your token in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/profile/api-tokens). Refer to [API token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) for more information.

## The incorrect syntax is used

Occasionally customers will attempt to use an API token with an API key syntax. Ensure you are using the Bearer option rather than the email and API key pair.

## You have the incorrect user permissions

You cannot create a token that exceeds the permission granted to you on your account. For example, if you have been granted an **Admin (Read only)** role, you would need your Super Administrator to update your role so that you could create a token for yourself.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/api/troubleshooting/#page","headline":"Troubleshooting · Cloudflare Fundamentals docs","description":"Resolve common Cloudflare API token issues including verification failures, incorrect permissions, and syntax errors.","url":"https://developers.cloudflare.com/fundamentals/api/troubleshooting/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
