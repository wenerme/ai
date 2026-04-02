---
title: Integrate with PagerDuty
description: To integrate Cloudflare health monitor notifications with PagerDuty, follow the steps outlined in PagerDuty’s Email Integration Guide. If you do not have a PagerDuty account, you will first need to set that up.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/load-balancing/additional-options/pagerduty-integration.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Integrate with PagerDuty

To integrate Cloudflare health monitor notifications with PagerDuty, follow the steps outlined in PagerDuty’s [Email Integration Guide ↗](https://www.pagerduty.com/docs/guides/email-integration-guide/). If you do not have a PagerDuty account, you will first need to set that up.

PagerDuty will generate an email address that will create incidents based on emails sent to that address. For help locating that email address, refer to the [PagerDuty documentation ↗](https://www.pagerduty.com/docs/guides/email-integration-guide/).

When creating the Notifier object, configure the email to go to the PagerDuty integration email. Consequently, whenever a pool or endpoint goes down, an Incident will be created to capture it.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/load-balancing/","name":"Load Balancing"}},{"@type":"ListItem","position":3,"item":{"@id":"/load-balancing/additional-options/","name":"Additional configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/load-balancing/additional-options/pagerduty-integration/","name":"Integrate with PagerDuty"}}]}
```
