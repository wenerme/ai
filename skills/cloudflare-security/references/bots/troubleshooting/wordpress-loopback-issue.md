---
description: Fix WordPress loopback errors caused by Super Bot Fight Mode blocking diagnostics.
title: Super Bot Fight Mode for WordPress
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt
> Use this file to discover all available pages before exploring further.

# Super Bot Fight Mode for WordPress

Last updated Aug 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/bots/troubleshooting/wordpress-loopback-issue/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When users attempt to run diagnostics in the Site Status page for WordPress installations, loopback issues arise when our bot detection services block them.

WordPress relies on making loopback requests to monitor and occasionally administer its websites. Customers can opt-in to optimize Super Bot Fight Mode for WordPress. If this feature is enabled, automated loopback requests made by your WordPress site will be authorized even when Super Bot Fight Mode blocks other bots.

Note

Loopback requests may also be blocked by [I’m Under Attack mode](https://developers.cloudflare.com/fundamentals/reference/under-attack-mode/) or certain [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/).

## Enable Optimize for WordPress

1. In the Cloudflare dashboard, go to the **Security Settings** page.
[Go to **Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Filter by **Bot traffic**.
3. Go to **Super Bot Fight Mode**.
4. Under **Configurations**, select the edit icon for **Optimize for WordPress** and turn it on.

## Availability

This feature is available for all Super Bot Fight Mode customers.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/troubleshooting/wordpress-loopback-issue/#page","headline":"Super Bot Fight Mode for WordPress · Cloudflare bot solutions docs","description":"Fix WordPress loopback errors caused by Super Bot Fight Mode blocking diagnostics.","url":"https://developers.cloudflare.com/bots/troubleshooting/wordpress-loopback-issue/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["WordPress"]}
```
