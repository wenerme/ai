---
title: Analytics
description: Review Email Routing metrics for received, forwarded, dropped, and rejected emails, and inspect activity logs.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-routing/get-started/email-routing-analytics.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Analytics

The Overview page shows you a summary of your account. You can check details such as how many custom and destination addresses you have configured, as well as the status of your routing service.

## Email Routing summary

In Email Routing summary you can check metrics related the number of emails received, forwarded, dropped, and rejected. To filter this information by time interval, select the drop-down menu. You can choose preset periods between the previous 30 minutes and 30 days, as well as a custom date range.

## Activity Log

This section allows you to sort through emails received, and check Email Routing actions - for example, `Forwarded`, `Dropped`, or `Rejected`. Select a specific email to expand its details and check information regarding the [SPF ↗](https://datatracker.ietf.org/doc/html/rfc7208), [DKIM ↗](https://datatracker.ietf.org/doc/html/rfc6376), and [DMARC ↗](https://datatracker.ietf.org/doc/html/rfc7489) statuses. Depending on the information shown, you can opt to mark an email as spam or block the sender.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-routing/","name":"Email Routing"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-routing/get-started/","name":"Get started"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-routing/get-started/email-routing-analytics/","name":"Analytics"}}]}
```
