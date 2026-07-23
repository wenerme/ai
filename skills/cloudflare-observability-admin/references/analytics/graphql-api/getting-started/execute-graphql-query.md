---
description: Learn about execute a graphql query with curl in Cloudflare analytics.
title: Execute a GraphQL query with curl
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Execute a GraphQL query with curl

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/analytics/graphql-api/getting-started/execute-graphql-query/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Using a plain curl to send a query provides the ability to slice-n-dice with the results and apply post-processing if needed. For example, converting results received from GraphQL API into a CSV format.

For more functionality, like auto-completion, schema exploring, etc., you can look at GraphQL [clients](https://developers.cloudflare.com/analytics/graphql-api/getting-started/compose-graphql-query/).

GraphQL API expects JSON with two essentials fields: "query" and "variables".

A query should be stripped from newline symbols and sent as a single-line string when the variables is an object full of values for all placeholders used in the query:

```json
{
  "query": "{viewer { ... }}",
  "variables": {}
}
```

It is still possible to use a human-friendly query though. In the example below you can see how `echo` piped together with `tr` to provide a proper payload with `curl`:

```bash
echo '{ "query":
  "{
    viewer {
      zones(filter: { zoneTag: $zoneTag }) {
        firewallEventsAdaptive(
          filter: $filter
          limit: 10
          orderBy: [datetime_DESC]
        ) {
          action
          clientAsn
          clientCountryName
          clientIP
          clientRequestPath
          clientRequestQuery
          datetime
          source
          userAgent
        }
      }
    }
  }",
  "variables": {
    "zoneTag": "<zone-tag>",
    "filter": {
      "datetime_geq": "2022-07-24T11:00:00Z",
      "datetime_leq": "2022-07-24T12:00:00Z"
    }
  }
}' | tr -d '\n' | curl --silent \
https://api.cloudflare.com/client/v4/graphql \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data @-
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/getting-started/execute-graphql-query/#page","headline":"Execute a GraphQL query with curl · Cloudflare Analytics docs","description":"Learn about execute a graphql query with curl in Cloudflare analytics.","url":"https://developers.cloudflare.com/analytics/graphql-api/getting-started/execute-graphql-query/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
