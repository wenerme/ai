---
description: Create rules to include or exclude traffic from Web Analytics.
title: Rules
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/web-analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Rules

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/web-analytics/configuration-options/rules/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Use **Rules** to configure whether to track Web Analytics for specific websites or paths. By default, Web Analytics automatically creates a single rule for the zone that injects the JavaScript (JS) snippet for all pages.

Rules are only available for sites proxied through Cloudflare. For more information, refer to [Limits](https://developers.cloudflare.com/web-analytics/limits/).

1. In the Cloudflare dashboard, go to the **Web Analytics** page.
[Go to **Web analytics** ↗](https://dash.cloudflare.com/?to=/:account/web-analytics)
2. Find the site you want to configure and select **Manage site**.
3. Select **Advanced options** \> **Add rule**.
4. Select the **Action** and fill in the hostname and path(s) you want to add a rule for.
5. If you want to add additional rules, select **Add rule**. Otherwise select **Update** to save the rule.

Warning

Configuration rules have precedence over any Web Analytics rules. If a Web Analytics rule turns on analytics measurements for an incoming request and the same request matches a configuration rule turning off Web Analytics, the configuration rule will win.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/web-analytics/configuration-options/rules/#page","headline":"Rules · Cloudflare Web Analytics docs","description":"Create rules to include or exclude traffic from Web Analytics.","url":"https://developers.cloudflare.com/web-analytics/configuration-options/rules/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
