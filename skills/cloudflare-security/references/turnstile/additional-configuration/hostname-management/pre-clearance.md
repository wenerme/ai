---
description: Configure Pre-clearance to reduce repeated challenges for visitors.
title: Pre-clearance configuration
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/turnstile/llms.txt
> Use this file to discover all available pages before exploring further.

#  Pre-clearance configuration

Last updated May 5, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/turnstile/additional-configuration/hostname-management/pre-clearance/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

[Pre-clearance](https://developers.cloudflare.com/cloudflare-challenges/concepts/clearance/#pre-clearance-support-in-turnstile) allows Turnstile to issue clearance cookies that can be used across your Cloudflare-protected domains. This feature requires specific hostname configuration for proper functionality.

## Prerequisites

For pre-clearance to work correctly, you must:

1. Use a registered Cloudflare zone.
The hostname must be a zone registered in your Cloudflare account. When configuring your widget via the dashboard, you can select from existing zones.
2. Select the registered Cloudflare zone with intended WAF rule to set pre-clearance.
The zone you select must contain the WAF rule you wish to set pre-clearance through Turnstile.
For example, if you have `example.com` and `app.example.com` as registered zones and you want to have Turnstile issue pre-clearance for `app.example.com`, you must select `app.example.com`.

## Validation

The clearance cookie `cf_clearance` will only be accepted on domains that match the widget's configured hostnames, are registered as zones in your Cloudflare account, and have challenges enabled through Cloudflare's security settings.

If pre-clearance is configured incorrectly, clearance cookies may become invalid and lead to additional challenge requests.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/turnstile/additional-configuration/hostname-management/pre-clearance/#page","headline":"Pre-clearance configuration · Cloudflare Turnstile docs","description":"Configure Pre-clearance to reduce repeated challenges for visitors.","url":"https://developers.cloudflare.com/turnstile/additional-configuration/hostname-management/pre-clearance/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Cookies"]}
```
