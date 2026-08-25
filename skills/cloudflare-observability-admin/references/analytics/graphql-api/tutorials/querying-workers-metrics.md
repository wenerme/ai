---
description: Query Workers invocation metrics via GraphQL.
title: Querying Workers Metrics with GraphQL
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Querying Workers Metrics with GraphQL

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-workers-metrics/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

In this example, we are going to use the GraphQL Analytics API to query for Workers Metrics over a specified time period. We can query up to one month of data for dates up to three months ago.

The following API call will request a Worker script's metrics over a one day period, and output the requested fields. Be sure to replace `<CLOUDFLARE_ACCOUNT_TAG>` and `<API_TOKEN>`[1](#user-content-fn-1) with your API credentials, and adjust the `datetimeStart`, `datetimeEnd`, and `scriptName` variables as needed.

## API Call

```bash
echo '{ "query":
  "query GetWorkersAnalytics($accountTag: string, $datetimeStart: string, $datetimeEnd: string, $scriptName: string) {
    viewer {
      accounts(filter: {accountTag: $accountTag}) {
        workersInvocationsAdaptive(limit: 100, filter: {
          scriptName: $scriptName,
          datetime_geq: $datetimeStart,
          datetime_leq: $datetimeEnd
        }) {
          sum {
            subrequests
            requests
            errors
          }
          quantiles {
            cpuTimeP50
            cpuTimeP99
          }
          dimensions{
            datetime
            scriptName
            status
          }
        }
      }
    }
  }",
  "variables": {
    "accountTag": "<CLOUDFLARE_ACCOUNT_TAG>",
    "datetimeStart": "2022-08-04T00:00:00.000Z",
    "datetimeEnd": "2022-08-04T01:00:00.000Z",
    "scriptName": "worker-subrequest-test-client"
  }
}' | tr -d '\n' | curl --silent \
https://api.cloudflare.com/client/v4/graphql \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
--data @-
```

The results returned will be in JSON (as requested), so piping the output to `jq` will make them easier to read, like in the following example:

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
#=>           "workersInvocationsAdaptive": [
#=>             {
#=>               "dimensions": {
#=>                 "datetime": "2020-05-04T18:10:35Z",
#=>                 "scriptName": "worker-subrequest-test-client",
#=>                 "status": "success"
#=>               },
#=>               "quantiles": {
#=>                 "cpuTimeP50": 206,
#=>                 "cpuTimeP99": 206
#=>               },
#=>               "sum": {
#=>                 "errors": 0,
#=>                 "requests": 1,
#=>                 "subrequests": 0
#=>               }
#=>             },
#=>             {
#=>               "dimensions": {
#=>                 "datetime": "2020-05-04T18:10:34Z",
#=>                 "scriptName": "worker-subrequest-test-client",
#=>                 "status": "success"
#=>               },
#=>               "quantiles": {
#=>                 "cpuTimeP50": 291,
#=>                 "cpuTimeP99": 291
#=>               },
#=>               "sum": {
#=>                 "errors": 0,
#=>                 "requests": 1,
#=>                 "subrequests": 0
#=>               }
#=>             },
#=>             {
#=>               "dimensions": {
#=>                 "datetime": "2020-05-04T18:10:49Z",
#=>                 "scriptName": "worker-subrequest-test-client",
#=>                 "status": "success"
#=>               },
#=>               "quantiles": {
#=>                 "cpuTimeP50": 212.5,
#=>                 "cpuTimeP99": 261.19
#=>               },
#=>               "sum": {
#=>                 "errors": 0,
#=>                 "requests": 4,
#=>                 "subrequests": 0
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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-workers-metrics/#page","headline":"Querying Workers Metrics with GraphQL · Cloudflare Analytics docs","description":"Query Workers invocation metrics via GraphQL.","url":"https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-workers-metrics/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
