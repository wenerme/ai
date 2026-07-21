---
description: Migrate to new GraphQL analytics nodes.
title: Migrate to new GraphQL nodes
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt
> Use this file to discover all available pages before exploring further.

#  Migrate to new GraphQL nodes

Last updated Apr 17, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/load-balancing/reference/migration-guides/load-balancing-graphql-nodes/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

After 30 September 2021, Cloudflare will make the following changes to the Load Balancing GraphQL schema:

* Deprecate nodes:
  * `loadBalancingRequestsGroups` will be deprecated for `loadBalancingRequestsAdaptiveGroups`
  * `loadBalancingRequests` will be deprecated for `loadBalancingRequestsAdaptive`
* Deprecate the `date` field (replace it with the existing `datetime` field)
* Add the `sampleInterval` field

## Example query

The following example:

* Replaces `loadBalancingRequestsGroups` with `loadBalancingRequestsAdaptiveGroups`
* Replaces `date` with `datetime`
* Uses the new `sampleInterval` field

```json
query {
  viewer {
    zones(filter: { zoneTag: "your Zone ID" }) {
      loadBalancingRequestsAdaptiveGroups(
        filter: {
          datetime_gt: "2021-06-12T04:00:00Z",
          datetime_lt: "2021-06-13T06:00:00Z"
        }
      ) {
        dimensions {
          datetime
          coloCode
          ...
        }
        avg {
          sampleInterval
        }
      }
    }
  }
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/load-balancing/reference/migration-guides/load-balancing-graphql-nodes/#page","headline":"Migrate to new GraphQL nodes · Cloudflare Load Balancing docs","description":"Migrate to new GraphQL analytics nodes.","url":"https://developers.cloudflare.com/load-balancing/reference/migration-guides/load-balancing-graphql-nodes/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["GraphQL","Migration"]}
```
