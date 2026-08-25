---
description: Query Email Routing activity logs via GraphQL.
title: Querying Email Routing events with GraphQL
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Querying Email Routing events with GraphQL

Last updated Jun 9, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-email-routing/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This example uses the GraphQL Analytics API to query for Email Routing events over a specified time period.

## Activity logs API call

The following API call will request Email Routing activity logs over a one day period, and output the requested fields. Be sure to replace `<CLOUDFLARE_ZONE_TAG>` and `<API_TOKEN>`[1](#user-content-fn-1) with your zone tag and API credentials, and adjust the `datetime_geg` and `datetime_leq` values as required.

```bash
echo '{ "query":
  "query EmailRoutingActivity($zoneTag: string, $filter: EmailRoutingAdaptiveFilter_InputObject) {
    viewer {
      zones(filter: { zoneTag: $zoneTag }) {
        emailRoutingAdaptive(
          filter: $filter
          limit: 3
          orderBy: [datetime_DESC]
        ) {
          datetime
          id: sessionId
          messageId
          from
          to
          subject
          status
          action
          spf
          dkim
          dmarc
          arc
          errorDetail
          isNDR
          isSpam
          spamThreshold
          spamScore
        }
      }
    }
  }",
  "variables": {
    "zoneTag": "<CLOUDFLARE_ZONE_TAG>",
    "filter": {
      "datetime_geq": "2026-01-18T11:00:00Z",
      "datetime_leq": "2026-01-19T11:00:00Z"
    }
  }
}' | tr -d '\n' | curl --silent \
https://api.cloudflare.com/client/v4/graphql \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
--data @- | jq .
```

The results returned will be in JSON (as requested):

```json
{
  "data": {
    "viewer": {
      "zones": [
        {
          "emailRoutingAdaptive": [
            {
              "action": "forward",
              "arc": "none",
              "datetime": "2026-01-19T10:51:25Z",
              "dkim": "pass",
              "dmarc": "pass",
              "errorDetail": "",
              "from": "John <john@email.example.com>",
              "id": "AfWyaZ7V1TAH",
              "isNDR": 0,
              "isSpam": 0,
              "messageId": "<9e6574f1-97f8-4060-ad62-c54b6408ac3f@local>",
              "spamScore": 0,
              "spamThreshold": 5,
              "spf": "pass",
              "status": "delivered",
              "subject": "How are you doing?",
              "to": "me@example.com"
            },
            {
              "action": "forward",
              "arc": "none",
              "datetime": "2026-01-19T10:30:00Z",
              "dkim": "pass",
              "dmarc": "pass",
              "errorDetail": "",
              "from": "eBay <ebay@ebay.co.uk>",
              "id": "aYPegrIfLWia",
              "isNDR": 0,
              "isSpam": 0,
              "messageId": "<1A513C40-F2CD808A928-029BBE999993-0000000000FA8855@starship>",
              "spamScore": 0,
              "spamThreshold": 5,
              "spf": "pass",
              "status": "delivered",
              "subject": "New offers",
              "to": "me@example.com"
            },
            {
              "action": "forward",
              "arc": "none",
              "datetime": "2026-01-19T10:29:59Z",
              "dkim": "pass",
              "dmarc": "pass",
              "errorDetail": "",
              "from": "Notification <notifications@example.com>",
              "id": "nWIl9gs95mY3",
              "isNDR": 0,
              "isSpam": 0,
              "messageId": "<0AB8F1C3-3015EDF2980-019BBE9B58F2-0000000000FA7C4D@local>",
              "spamScore": 0,
              "spamThreshold": 5,
              "spf": "pass",
              "status": "delivered",
              "subject": "You're over quota",
              "to": "me@example.com"
            }
          ]
        }
      ]
    }
  },
  "errors": null
}
```

## Analytics API Call

The following API call will count the number of events grouped by hour.

```bash
echo '{ "query":
  "query EmailRoutingActivity($zoneTag: string, $filter: EmailRoutingAdaptiveFilter_InputObject) {
     viewer {
       zones(filter: { zoneTag: $zoneTag }) {
         emailRoutingAdaptiveGroups(
           limit: 10000
           filter: $filter
           orderBy: [datetimeHour_ASC]
         ) { count
               dimensions {
                 datetimeHour
               }
             }
           }
     }
  }",
  "variables": {
    "zoneTag": "<CLOUDFLARE_ZONE_TAG>",
    "filter": {
      "datetimeHour_geq": "2026-01-18T11:00:00Z",
      "datetimeHour_leq": "2026-01-19T11:00:00Z"
    }
  }
}' | tr -d '\n' | curl --silent \
https://api.cloudflare.com/client/v4/graphql \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
--data @- | jq .
```

The results returned will be in JSON (as requested):

```json
{
  "data": {
    "viewer": {
      "zones": [
        {
          "emailRoutingAdaptiveGroups": [
            {
              "count": 2,
              "dimensions": {
                "datetimeHour": "2026-01-18T11:00:00Z"
              }
            },
            {
              "count": 1,
              "dimensions": {
                "datetimeHour": "2026-01-18T12:00:00Z"
              }
            },
            {
              "count": 1,
              "dimensions": {
                "datetimeHour": "2026-01-18T13:00:00Z"
              }
            },
            {
              "count": 2,
              "dimensions": {
                "datetimeHour": "2026-01-18T14:00:00Z"
              }
            },
            {
              "count": 1,
              "dimensions": {
                "datetimeHour": "2026-01-18T15:00:00Z"
              }
            },
            {
              "count": 1,
              "dimensions": {
                "datetimeHour": "2026-01-18T16:00:00Z"
              }
            },
            {
              "count": 2,
              "dimensions": {
                "datetimeHour": "2026-01-18T17:00:00Z"
              }
            },
            {
              "count": 3,
              "dimensions": {
                "datetimeHour": "2026-01-18T18:00:00Z"
              }
            },
            {
              "count": 1,
              "dimensions": {
                "datetimeHour": "2026-01-18T22:00:00Z"
              }
            },
            {
              "count": 2,
              "dimensions": {
                "datetimeHour": "2026-01-19T01:00:00Z"
              }
            },
            {
              "count": 1,
              "dimensions": {
                "datetimeHour": "2026-01-19T02:00:00Z"
              }
            },
            {
              "count": 4,
              "dimensions": {
                "datetimeHour": "2026-01-19T05:00:00Z"
              }
            },
            {
              "count": 1,
              "dimensions": {
                "datetimeHour": "2026-01-19T08:00:00Z"
              }
            },
            {
              "count": 5,
              "dimensions": {
                "datetimeHour": "2026-01-19T09:00:00Z"
              }
            },
            {
              "count": 6,
              "dimensions": {
                "datetimeHour": "2026-01-19T10:00:00Z"
              }
            },
            {
              "count": 2,
              "dimensions": {
                "datetimeHour": "2026-01-19T11:00:00Z"
              }
            }
          ]
        }
      ]
    }
  },
  "errors": null
}
```

## Footnotes

1. Refer to [Configure an Analytics API token](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-token-auth/) for more information on configuration and permissions. [↩](#user-content-fnref-1)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-email-routing/#page","headline":"Querying Email Routing events with GraphQL · Cloudflare Analytics docs","description":"Query Email Routing activity logs via GraphQL.","url":"https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-email-routing/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
