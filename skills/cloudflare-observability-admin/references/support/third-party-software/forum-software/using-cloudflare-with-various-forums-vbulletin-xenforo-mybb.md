---
description: Use Cloudflare with vBulletin, Xenforo, and other forums.
title: Using Cloudflare with various forums
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

#  Using Cloudflare with various forums

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/support/third-party-software/forum-software/using-cloudflare-with-various-forums-vbulletin-xenforo-mybb/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## Overview

Many widely used forum platforms are compatible with Cloudflare.

These include:

* [Discourse ↗](https://community.cloudflare.com/t/using-discourse-with-cloudflare-best-practices/602890)
* vBulletin
* Xenforo
* MyBB

If you have a forum using these platforms, you can increase its speed and safety by adding Cloudflare.

---

## Steps

**1**. Cloudflare acts as a reverse proxy, meaning that all visitor IP addresses will become Cloudflare-affiliated IP addresses. If you are using services like **Stopforumspan** or blocking registration by IP address, you need to [restore original visitor IPs](https://developers.cloudflare.com/support/troubleshooting/restoring-visitor-ips/restoring-original-visitor-ips/).

**2**. To prevent admin functions from being affected by caching or performance features, create a [Cache Rule](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/#bypass-cache) to bypass cache on the admin section of your site.

**3**. If you want certain services to access your website (APIs or certain IPs), [configure the WAF](https://developers.cloudflare.com/waf/).

**4**. Review your DNS records to make sure all your subdomain records are present. If you cannot find a subdomain, [add the DNS record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/third-party-software/forum-software/using-cloudflare-with-various-forums-vbulletin-xenforo-mybb/#page","headline":"Using Cloudflare with various forums · Cloudflare Support docs","description":"Use Cloudflare with vBulletin, Xenforo, and other forums.","url":"https://developers.cloudflare.com/support/third-party-software/forum-software/using-cloudflare-with-various-forums-vbulletin-xenforo-mybb/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
