---
title: Security Analytics (new dashboard)
description: Security Analytics shows information about all incoming HTTP requests or mitigated requests (rule matches).
image: https://developers.cloudflare.com/cf-twitter-card.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/security/analytics.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Security Analytics (new dashboard)

Security Analytics shows information about all incoming HTTP requests or only about requests mitigated by Cloudflare.

Use Security Analytics as your starting point to understand and analyze traffic patterns, and to create security rules based on the filters you applied.

To access Security Analytics in the new security dashboard, go to the **Analytics** page.

[ Go to **Analytics** ](https://dash.cloudflare.com/?to=/:account/:zone/security/analytics) 

By default, Security Analytics queries filter on `requestSource = 'eyeball'`, which represents requests from end users. Note that requests from Cloudflare Workers (subrequests) are not visible in Security Analytics.

## Traffic

The **Traffic** tab displays information about all incoming HTTP requests for your domain, including requests not handled by Cloudflare security products.

In this tab you can perform several tasks:

* View the traffic distribution for your domain.
* Understand which traffic is being mitigated by Cloudflare security products, and where non-mitigated traffic is being served from (Cloudflare global network or [origin server ↗](https://www.cloudflare.com/learning/cdn/glossary/origin-server/)).
* Analyze suspicious traffic and create tailored custom [security rules](https://developers.cloudflare.com/security/rules/) based on applied filters.
* [Find an appropriate rate limit](https://developers.cloudflare.com/waf/rate-limiting-rules/find-rate-limit/) for incoming traffic.

For information on how to use the **Traffic** tab, refer to [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/#adjusting-displayed-data).

If you need to modify existing security-related rules you already configured, consider also using the [Events](#events) tab. This tab displays information about requests affected by Cloudflare security products.

Note

The **Traffic** tab includes functionality available in the [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/) page in the previous dashboard navigation structure.

## Events

Use the **Events** tab to review mitigated requests and to tailor your security configurations.

The **Events** tab displays information about requests actioned or flagged by Cloudflare security products. Each incoming HTTP request might generate one or more security events. The tab only shows these events, not the HTTP requests themselves. To obtain information on all incoming HTTP requests, use the [Traffic](#traffic) tab.

Users on a Free plan can view summarized events by date in sampled logs. Customers on paid plans have access to additional graphs and dashboards that summarize the most relevant information about the current behavior of Cloudflare's security features on your domain.

For more information on the **Events** tab, refer to [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/).

Note

The **Events** tab corresponds to the [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/) page in the previous dashboard navigation structure.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/security/","name":"Security dashboard"}},{"@type":"ListItem","position":3,"item":{"@id":"/security/analytics/","name":"Security Analytics (new dashboard)"}}]}
```
