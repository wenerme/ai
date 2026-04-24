---
title: Analytics and logs
description: View analytics and logs for Internal DNS queries.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Analytics ](https://developers.cloudflare.com/search/?tags=Analytics)[ GraphQL ](https://developers.cloudflare.com/search/?tags=GraphQL) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/dns/internal-dns/analytics.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Analytics and logs

Internal DNS leverages [Gateway analytics](https://developers.cloudflare.com/cloudflare-one/insights/analytics/gateway/). Below you can find information about specific fields and different methods you can use to access this data.

## GraphQL

For detailed metrics, use the [GraphQL API](https://developers.cloudflare.com/analytics/graphql-api/). Refer to the GraphQL Analytics API documentation for guidance on how to [get started](https://developers.cloudflare.com/analytics/graphql-api/getting-started/).

The [fields](https://developers.cloudflare.com/analytics/graphql-api/getting-started/querying-basics/) added to cover Internal DNS are the following:

* `InternalDNSFallbackStrategy`: The fallback strategy applied to the internal DNS response. Empty if no fallback strategy was applied.
* `InternalDNSRCode`: The response code sent back by the internal DNS service.
* `InternalDNSViewID`: The view identifier that was sent to the internal DNS service.
* `InternalDNSZoneID`: The internal zone identifier returned by the internal DNS service.

## Logs

Leverage Logpush jobs for [Gateway DNS](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/gateway%5Fdns/#internaldnsfallbackstrategy). For help setting up Logpush, refer to [Logpush](https://developers.cloudflare.com/logs/logpush/) documentation.

You can also set up [Logpush filters](https://developers.cloudflare.com/logs/logpush/logpush-job/filters/) to only push logs related to a specific [internal zone](https://developers.cloudflare.com/dns/internal-dns/internal-zones/) or [view](https://developers.cloudflare.com/dns/internal-dns/dns-views/) ID.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/internal-dns/","name":"Internal DNS (beta)"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/internal-dns/analytics/","name":"Analytics and logs"}}]}
```
