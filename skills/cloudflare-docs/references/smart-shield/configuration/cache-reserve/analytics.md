---
title: Cache Reserve analytics
description: View Cache Reserve storage, read, and write operation metrics.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/smart-shield/configuration/cache-reserve/analytics.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Cache Reserve analytics

Cache Reserve Analytics provides insights regarding your Cache Reserve usage. It allows you to check what content is stored in Cache Reserve, how often it is being accessed, how long it has been there and how much egress from your origin it is saving you.

You have access to the following metrics:

* **Egress savings (bandwidth)** \- is an estimation based on response bytes served from Cache Reserve that did not need to be served from your origin server. These are represented as cache hits.
* **Requests served by Cache Reserve** \- is the number of requests served by Cache Reserve (total).
* **Data storage summary** \- is based on a representative sample of requests. Refer to [Sampling](https://developers.cloudflare.com/analytics/graphql-api/sampling/) for more details about how Cloudflare samples data.  
   * **Current data stored** \- is the data stored (currently) over time.  
   * **Aggregate storage usage** \- is the total of storage used for the selected timestamp.
* **Operations** \- Class A (writes) and Class B (reads) operations over time.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/smart-shield/","name":"Smart Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/smart-shield/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/smart-shield/configuration/cache-reserve/","name":"Cache Reserve"}},{"@type":"ListItem","position":5,"item":{"@id":"/smart-shield/configuration/cache-reserve/analytics/","name":"Cache Reserve analytics"}}]}
```
