---
description: Temporarily pause Cloudflare on your domain to send traffic directly to your origin server for troubleshooting.
title: Pause Cloudflare
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt
> Use this file to discover all available pages before exploring further.

# Pause Cloudflare

Last updated Apr 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/fundamentals/manage-domains/pause-cloudflare/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

To troubleshoot your site, you can pause Cloudflare globally. This will send traffic directly to your origin web server instead of Cloudflare's reverse proxy. Paused domains also cannot use Cloudflare services like [Rules](https://developers.cloudflare.com/rules/), [WAF](https://developers.cloudflare.com/waf/), and [SSL/TLS certificates](https://developers.cloudflare.com/ssl/edge-certificates/). Consider turning on [Development Mode](https://developers.cloudflare.com/fundamentals/manage-domains/pause-cloudflare/#enable-development-mode) to bypass caching while preserving protection.

1. In the Cloudflare dashboard, go to the **Account home** page and select your account and domain.
[Go to **Account home** ↗](https://dash.cloudflare.com/?to=/:account/home)
2. Within **Overview**, choose **Advanced Actions** \> **Pause Cloudflare on Site**.

The process of pausing Cloudflare takes five minutes or less. This approach is preferable to [changing nameservers](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/), which can cause propagation delays of several hours.

Note

Disabling a zone does not impact Spectrum applications.

---

## Alternatives to global pause

### Disable proxy on DNS records

Instead of pausing Cloudflare globally, you can disable the proxy on individual records:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **DNS** \> **Records**. Choose the record and select **Edit**.
3. Toggle **Proxy Status** to **Off**.

Adjusting the proxy status will prevent that record from using Cloudflare services like [Rules](https://developers.cloudflare.com/rules/), [WAF](https://developers.cloudflare.com/waf/), and [SSL/TLS certificates](https://developers.cloudflare.com/ssl/edge-certificates/).

### Enable Development Mode

To troubleshoot caching issues, you could [enable Development Mode](https://developers.cloudflare.com/cache/reference/development-mode/). This will bypass Cloudflare's cache while still preserving Cloudflare services like [Rules](https://developers.cloudflare.com/rules/), [WAF](https://developers.cloudflare.com/waf/), and [SSL/TLS certificates](https://developers.cloudflare.com/ssl/edge-certificates/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/manage-domains/pause-cloudflare/#page","headline":"Pause Cloudflare · Cloudflare Fundamentals docs","description":"Temporarily pause Cloudflare on your domain to send traffic directly to your origin server for troubleshooting.","url":"https://developers.cloudflare.com/fundamentals/manage-domains/pause-cloudflare/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
