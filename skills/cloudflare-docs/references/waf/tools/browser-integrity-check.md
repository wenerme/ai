---
title: Browser Integrity Check
description: Block requests with suspicious HTTP headers using Browser Integrity Check.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/waf/tools/browser-integrity-check.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Browser Integrity Check

Cloudflare's Browser Integrity Check (BIC) looks for common HTTP headers abused most commonly by spammers and denies access to your page.

It also challenges visitors without a user agent or with a non-standard user agent such as commonly used by abusive bots, crawlers, or visitors.

Browser Integrity Check is enabled by default.

## Disable Browser Integrity Check

### Disable globally

To disable BIC globally for your zone:

* [  New dashboard ](#tab-panel-9401)
* [ Old dashboard ](#tab-panel-9402)

1. In the Cloudflare dashboard, go to the Security **Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. (Optional) Filter by **DDoS attacks**.
3. Turn off **Browser integrity check**.

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com).
2. Select your account and zone.
3. Go to **Security** \> **Settings**.
4. Turn off **Browser Integrity Check**.

### Disable selectively

To disable BIC selectively, you can skip Browser Integrity Check using a [custom rule with a skip action](https://developers.cloudflare.com/waf/custom-rules/skip/).

Also, use a [configuration rule](https://developers.cloudflare.com/rules/configuration-rules/) to selectively enable or disable this feature for certain sections of your website using a filter expression (such as a matching hostname or request URL path).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/tools/","name":"Additional tools"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/tools/browser-integrity-check/","name":"Browser Integrity Check"}}]}
```
