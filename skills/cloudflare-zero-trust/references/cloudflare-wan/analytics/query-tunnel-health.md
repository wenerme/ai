---
description: Query tunnel health check results with the GraphQL API.
title: Querying Cloudflare WAN IPsec/GRE tunnel health check results with GraphQL
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-wan/llms.txt
> Use this file to discover all available pages before exploring further.

# Querying Cloudflare WAN IPsec/GRE tunnel health check results with GraphQL

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-wan/analytics/query-tunnel-health/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This example uses the GraphQL Analytics API to query Cloudflare WAN tunnel health check results. These results are aggregated from individual health checks that Cloudflare servers perform against the tunnels you configured in your account. You can query up to one week of data for dates up to three months in the past.

The following API call requests tunnel health checks for a specific account over a one-day period for a specific Cloudflare data center and outputs the requested fields. Replace `<CLOUDFLARE_ACCOUNT_TAG>` and `<API_TOKEN>`[1](#user-content-fn-1) with your API credentials, and adjust the `datetimeStart` and `datetimeEnd` variables as needed.

The API call returns tunnel health check results by Cloudflare data center. Cloudflare aggregates each data center's result from health checks conducted on individual servers. The `tunnelState` field represents the state of the tunnel. Cloudflare WAN uses these states for routing. A `tunnelState` value of `0` represents a down tunnel, `0.5` represents a degraded tunnel, and `1` represents a healthy tunnel.

## API Call

```bash
echo '{ "query":
  "query GetTunnelHealthCheckResults($accountTag: string, $datetimeStart: string, $datetimeEnd: string) {
    viewer {
      accounts(filter: {accountTag: $accountTag}) {
        magicTransitTunnelHealthChecksAdaptiveGroups(
          limit: 100,
          filter: {
            datetime_geq: $datetimeStart,
            datetime_lt:  $datetimeEnd,
          }
        ) {
          avg {
            tunnelState
          }
          dimensions {
            tunnelName
            edgeColoName
          }
        }
      }
    }
  }",
  "variables": {
    "accountTag": "<CLOUDFLARE_ACCOUNT_TAG>",
    "datetimeStart": "2022-08-04T00:00:00.000Z",
    "datetimeEnd": "2022-08-04T01:00:00.000Z"
  }
}' | tr -d '\n' | curl --silent \
https://api.cloudflare.com/client/v4/graphql \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
--data @-
```

The results are returned in JSON (as requested), so piping the output to `jq` formats them for easier parsing, as in the following example:

```bash
... | curl --silent \
https://api.cloudflare.com/client/v4/graphql \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
--data @- | jq .

## Example response:
#=> {
#=>   "data": {
#=>     "viewer": {
#=>       "accounts": [
#=>         {
#=>           "conduitEdgeTunnelHealthChecks": [
#=>             {
#=>               {
#=>                 "avg": {
#=>                   "tunnelState": 1
#=>                 },
#=>                 "dimensions": {
#=>                   "edgeColoName": "mel01",
#=>                   "tunnelName": "tunnel_01",
#=>                   "tunnelState": 0.5
#=>                 }
#=>               },
#=>               {
#=>                 "avg": {
#=>                   "tunnelState": 0.5
#=>                 },
#=>                 "count": 310,
#=>                 "dimensions": {
#=>                   "edgeColoName": "mel01",
#=>                   "tunnelName": "tunnel_02",
#=>                   "tunnelState": 0.5
#=>                 }
#=>               }
#=>           ]
#=>         }
#=>       ]
#=>     }
#=>   },
#=>   "errors": null
#=> }
```

## Footnotes

1. For details, refer to [Configure an Analytics API token](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-token-auth/). [↩](#user-content-fnref-1)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-wan/analytics/query-tunnel-health/#page","headline":"Querying Cloudflare WAN IPsec/GRE tunnel health check results with GraphQL · Cloudflare WAN docs","description":"Query tunnel health check results with the GraphQL API.","url":"https://developers.cloudflare.com/cloudflare-wan/analytics/query-tunnel-health/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
