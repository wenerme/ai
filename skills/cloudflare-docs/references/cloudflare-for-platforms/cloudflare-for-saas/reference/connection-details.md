---
title: Connection request details
description: How Cloudflare sets Host headers and SNI when forwarding connections to your origin.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-for-platforms/cloudflare-for-saas/reference/connection-details.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Connection request details

When forwarding connections to your origin server, Cloudflare will set request parameters according to the following:

## Host header

Cloudflare will not alter the Host header by default, and will forward exactly as sent by the client. If you wish to change the value of the Host header you can utilise [Page-Rules](https://developers.cloudflare.com/workers/configuration/workers-with-page-rules/) or [Workers](https://developers.cloudflare.com/workers/) using the steps outlined in [certificate management](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/).

## SNI

When establishing a TLS connection to your origin server, if the request is being sent to your configured Fallback Host then the value of the SNI sent by Cloudflare will match the value of the Host header sent by the client (i.e. the custom hostname).

If however the request is being forwarded to a Custom Origin, then the value of the SNI will be that of the Custom Origin.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/","name":"Cloudflare for SaaS"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/reference/","name":"Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/reference/connection-details/","name":"Connection request details"}}]}
```
