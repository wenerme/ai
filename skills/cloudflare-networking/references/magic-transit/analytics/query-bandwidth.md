---
description: Query tunnel bandwidth analytics with the GraphQL API.
title: Query Magic Transit tunnel bandwidth analytics with GraphQL
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/magic-transit/llms.txt
> Use this file to discover all available pages before exploring further.

# Query Magic Transit tunnel bandwidth analytics with GraphQL

Last updated May 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/magic-transit/analytics/query-bandwidth/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This example uses the GraphQL Analytics API to query Magic Transit ingress tunnel traffic over a specified time period.

The following API call requests Magic Transit ingress tunnel traffic over a one-hour period and outputs the requested fields. Replace `<CLOUDFLARE_ACCOUNT_TAG>` with your account ID, `<EMAIL>`, `<API_KEY>`[1](#user-content-fn-1) (legacy), or `<API_TOKEN>`[2](#user-content-fn-2) (preferred) with your API credentials, and adjust the `datetime_geq` and `datetime_leq` values as needed.

The example queries for ingress traffic. To query for egress traffic, change the value in the `direction` filter.

## API Call

```bash
PAYLOAD='{ "query":
  "query GetTunnelHealthCheckResults($accountTag: string, $datetimeStart: string, $datetimeEnd: string) {
      viewer {
        accounts(filter: {accountTag: $accountTag}) {
          magicTransitTunnelTrafficAdaptiveGroups(
            limit: 100,
            filter: {
              datetime_geq: $datetimeStart,
              datetime_lt:  $datetimeEnd,
              direction: $direction
            }
          ) {
            avg {
              bitRateFiveMinutes
            }
            dimensions {
              tunnelName
              datetimeFiveMinutes
            }
          }
        }
      }
  }",
    "variables": {
      "accountTag": "<CLOUDFLARE_ACCOUNT_TAG>",
      "direction": "ingress",
      "datetimeStart": "2022-05-04T11:00:00.000Z",
      "datetimeEnd": "2022-05-04T12:00:00.000Z"
    }
  }
}'

# curl with Legacy API Key
curl https://api.cloudflare.com/client/v4/graphql \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
--data "$(echo $PAYLOAD)"

# curl with API Token
curl https://api.cloudflare.com/client/v4/graphql \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
--data "$(echo $PAYLOAD)"
```

The returned values represent the total bandwidth in bits per second during the five-minute interval for a particular tunnel. To use aggregations other than five minutes, use the same time window for both your metric and datetime. For example, to analyze hourly groups, use `bitRateHour` and `datetimeHour`.

The result is in JSON (as requested), so piping the output to `jq` formats it for easier parsing, as in the following example:

```bash
curl https://api.cloudflare.com/client/v4/graphql \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
--data "$(echo $PAYLOAD)" | jq .

## Example response:
#=> {
#=>   "data": {
#=>     "viewer": {
#=>       "accounts": [
#=>         {
#=>           "magicTransitTunnelTrafficAdaptiveGroups": [
#=>             {
#=>               avg: { bitRateFiveMinutes:  327680 },
#=>               dimensions: {
#=>                 datetimeFiveMinute: '2021-05-12T22:00-00:00',
#=>                 tunnelName: 'tunnel_name'
#=>               }
#=>             },
#=>             {
#=>               avg: { bitRateFiveMinutes:  627213680 },
#=>               dimensions: {
#=>                 datetimeFiveMinute: '2021-05-12T22:05-00:00',
#=>                 tunnelName: 'another_tunnel'
#=>              }
#=>             }
#=>           ]
#=>         }
#=>       ]
#=>     }
#=>   },
#=>   "errors": null
#=> }
```

## Footnotes

1. For details, refer to [Authenticate with a Cloudflare API key](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-key-auth/). [↩](#user-content-fnref-1)
2. For details, refer to [Configure an Analytics API token](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-token-auth/). [↩](#user-content-fnref-2)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/magic-transit/analytics/query-bandwidth/#page","headline":"Query Magic Transit tunnel bandwidth analytics with GraphQL · Cloudflare Magic Transit docs","description":"Query tunnel bandwidth analytics with the GraphQL API.","url":"https://developers.cloudflare.com/magic-transit/analytics/query-bandwidth/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["GraphQL","Shell"]}
```
