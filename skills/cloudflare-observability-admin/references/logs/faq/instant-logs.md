---
description: Review frequently asked questions about Instant Logs.
title: Instant Logs FAQ
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

# Instant Logs FAQ

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/logs/faq/instant-logs/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[❮ Back to FAQ](https://developers.cloudflare.com/logs/faq/)

### I am getting an HTTP 301 when attempting to connect to my WebSocket. What can I do?

Make sure you are using the `wss://` protocol when connecting to your WebSocket.

### I am getting an HTTP 429\. What can I do?

Connection requests are rate limited. Try your request again after waiting a few minutes.

### Why am I not receiving data?

First, double-check if you have a filter defined. If you do, it may be too strict (or incorrect) which ends up dropping all your data.

If you are confident in your filter, check the sample rate you used when creating the session. For example, a sample of 100 means you will receive one log for every 100 requests to your zone.

Finally, make sure the destination is proxied through Cloudflare (also known as orange clouded). We cannot log your request if it does not go through Cloudflare's global network.

### I am getting an error fetching my data. How can I solve this?

Make sure you have the correct permissions. To use Instant Logs you need Super Administrator, Administrator, Log Share, or Log Share Reader permissions.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/faq/instant-logs/#page","headline":"Instant Logs FAQ · Cloudflare Logs docs","description":"Review frequently asked questions about Instant Logs.","url":"https://developers.cloudflare.com/logs/faq/instant-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
