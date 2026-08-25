---
description: Query Network Firewall packet samples via GraphQL.
title: Querying Cloudflare Network Firewall Samples with GraphQL
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Querying Cloudflare Network Firewall Samples with GraphQL

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-network-firewall-samples/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

In this example, we are going to use the GraphQL Analytics API to query for Cloudflare Network Firewall Samples over a specified time period.

The following API call will request Cloudflare Network Firewall Samples over a one hour period, and output the requested fields. Be sure to replace `<CLOUDFLARE_ACCOUNT_TAG>` and `<API_TOKEN>`[1](#user-content-fn-1) with your zone tag and API credentials, and adjust the `datetime_geg` and `datetime_leq` values to your liking.

## API Call

```bash
echo '{ "query":
  "query MFWActivity {
    viewer {
      accounts(filter: { accountTag: $accountTag }) {
        magicFirewallSamplesAdaptiveGroups(
          filter: $filter
          limit: 10
          orderBy: [datetimeFiveMinute_DESC]
        ) {
          sum {
            bits
            packets
          }
          dimensions {
            datetimeFiveMinute
            ruleId
          }
        }
      }
    }
  }",
  "variables": {
    "accountTag": "<CLOUDFLARE_ACCOUNT_TAG>",
    "filter": {
      "datetime_geq": "2022-07-24T11:00:00Z",
      "datetime_leq": "2022-07-24T11:10:00Z"
    }
  }
}' | tr -d '\n' | curl --silent \
https://api.cloudflare.com/client/v4/graphql \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
--data @-
```

The returned values represent the total number of packets and bits received during the five minute interval for a particular rule. The result will be in JSON (as requested), so piping the output to `jq` will make it easier to read, like in the following example:

```bash
... | curl --silent \
https://api.cloudflare.com/client/v4/graphql \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
--data @- | jq .

#=> {
#=>   "data": {
#=>     "viewer": {
#=>       "accounts": [
#=>         {
#=>           "magicFirewallSamplesAdaptiveGroups": [
#=>             {
#=>               sum: { bits:  327680, packets: 16384 },
#=>               dimensions: {
#=>                 datetimeFiveMinute: '2021-05-12T22:00-00:00',
#=>                 ruleId: 'bdfa8f8f0ae142b4a70ef15f6160e532'
#=>               }
#=>             },
#=>             {
#=>               sum: { bits:  360448, packets: 8192 },
#=>               dimensions: {
#=>                 datetimeFiveMinute: '2021-05-12T22:05-00:00',
#=>                 ruleId: 'bdfa8f8f0ae142b4a70ef15f6160e532'
#=>               }
#=>             },
#=>             {
#=>               sum: { bits:  327680, packets: 8192 },
#=>               dimensions: {
#=>                 datetimeFiveMinute: '2021-05-12T22:05-00:00',
#=>                 ruleId: 'bdfa8f8f0ae142b4a70ef15f6160e532'
#=>               }
#=>             },
#=>             {
#=>               sum: { bits:  360448, packets: 8192 },
#=>               dimensions: {
#=>                 datetimeFiveMinute: '2021-05-12T22:20-00:00',
#=>                 ruleId: 'bdfa8f8f0ae142b4a70ef15f6160e532'
#=>               }
#=>             },
#=>             {
#=>               sum: { bits:  327680, packets: 8192 },
#=>               dimensions: {
#=>                 datetimeFiveMinute: '2021-05-12T22:20-00:00',
#=>                 ruleId: 'bdfa8f8f0ae142b4a70ef15f6160e532'
#=>               }
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

1. Refer to [Configure an Analytics API token](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-token-auth/) for more information on configuration and permissions. [↩](#user-content-fnref-1)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-network-firewall-samples/#page","headline":"Querying Cloudflare Network Firewall Samples with GraphQL · Cloudflare Analytics docs","description":"Query Network Firewall packet samples via GraphQL.","url":"https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-network-firewall-samples/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
