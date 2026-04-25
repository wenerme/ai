---
title: Rules
description: Create rules to include or exclude traffic from Web Analytics.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Rules

Use **Rules** to configure whether to track Web Analytics for specific websites or paths. By default, Web Analytics automatically creates a single rule for the zone that injects the JavaScript (JS) snippet for all pages.

Rules are only available for sites proxied through Cloudflare. For more information, refer to [Limits](https://developers.cloudflare.com/web-analytics/limits/).

1. In the Cloudflare dashboard, go to the **Web Analytics** page.  
[ Go to **Web analytics** ](https://dash.cloudflare.com/?to=/:account/web-analytics)
2. Find the site you want to configure and select **Manage site**.
3. Select **Advanced options** \> **Add rule**.
4. Select the **Action** and fill in the hostname and path(s) you want to add a rule for.
5. If you want to add additional rules, select **Add rule**. Otherwise select **Update** to save the rule.

Warning

Configuration rules have precedence over any Web Analytics rules. If a Web Analytics rule turns on analytics measurements for an incoming request and the same request matches a configuration rule turning off Web Analytics, the configuration rule will win.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/web-analytics/","name":"Cloudflare Web Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/web-analytics/configuration-options/","name":"Configuration options"}},{"@type":"ListItem","position":4,"item":{"@id":"/web-analytics/configuration-options/rules/","name":"Rules"}}]}
```
