---
description: Map Network Analytics v1 fields to v2 fields.
title: NAv1 to NAv2 schema map
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# NAv1 to NAv2 schema map

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/analytics/graphql-api/migration-guides/network-analytics-v2/schema-map/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The following table lists direct mappings between NAv1 and NAv2 fields, when available, and provides related fields when there is no direct mapping available.

| ipFlows1mGroups        | magicTransitNetworkAnalytics-AdaptiveGroups /spectrumNetworkAnalytics-AdaptiveGroups | dosdNetworkAnalytics-AdaptiveGroups         | dosdAttackAnalytics-Groups | flowtrackdNetworkAnalytics-AdaptiveGroups   | magicFirewallNetworkAnalytics-AdaptiveGroups |
| ---------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------- | -------------------------- | ------------------------------------------- | -------------------------------------------- |
| date                   | _Related fields:_datetimedatetimeTenSeconds                                          | _Related fields:_datetimedatetimeTenSeconds |                            | _Related fields:_datetimedatetimeTenSeconds | _Related fields:_datetimedatetimeTenSeconds  |
| datetimeMinute         | datetimeMinute                                                                       | datetimeMinute                              |                            | datetimeMinute                              | datetimeMinute                               |
| datetimeFiveMinutes    | datetimeFiveMinutes                                                                  | datetimeFiveMinutes                         |                            | datetimeFiveMinutes                         | datetimeFiveMinutes                          |
| datetimeFifteenMinutes | datetimeFifteenMinutes                                                               | datetimeFifteenMinutes                      |                            | datetimeFifteenMinutes                      | datetimeFifteenMinutes                       |
| datetimeHour           | datetimeHour                                                                         | datetimeHour                                |                            | datetimeHour                                | datetimeHour                                 |
| attackId\*             |                                                                                      | attackId\*                                  | attackId\*                 |                                             |                                              |
| attackType             |                                                                                      |                                             | attackType                 |                                             |                                              |
| attackMitigationType   |                                                                                      |                                             | mitigationType             |                                             |                                              |
| sourceIPCountry        | sourceCountry                                                                        | sourceCountry                               |                            | sourceCountry                               | sourceCountry                                |
| sourceIPAsn            | sourceAsn                                                                            | sourceAsn                                   |                            | sourceAsn                                   | sourceAsn                                    |
| sourceIPASNDescription | _Related field:_sourceGeohash                                                        | _Related field:_sourceGeohash               |                            | _Related field:_sourceGeohash               | _Related field:_sourceGeohash                |
| coloCode               | coloCode                                                                             | coloCode                                    |                            | coloCode                                    | coloCode                                     |
| coloCity               | coloCity                                                                             | coloCity                                    |                            | coloCity                                    | coloCity                                     |
| coloCountry            | coloCountry                                                                          | coloCountry                                 |                            | coloCountry                                 | coloCountry                                  |
| coloRegion             | _Related field:_coloGeohash                                                          | _Related field:_coloGeohash                 |                            | _Related field:_coloGeohash                 | _Related field:_coloGeohash                  |
| ipFlows1mGroups        | magicTransitNetworkAnalytics-AdaptiveGroups /spectrumNetworkAnalytics-AdaptiveGroups | dosdNetworkAnalytics-AdaptiveGroups         | dosdAttackAnalytics-Groups | flowtrackdNetworkAnalytics-AdaptiveGroups   | magicFirewallNetworkAnalytics-AdaptiveGroups |
| ipVersion              | ethertype                                                                            | ethertype                                   |                            | ethertype                                   | ethertype                                    |
| bits                   | ipTotalLength (bits divided by 8)                                                    | ipTotalLength (bits divided by 8)           | bits                       | ipTotalLength (bits divided by 8)           | ipTotalLength (bits divided by 8)            |
| packets                | _n/a_                                                                                | _n/a_                                       | packets                    | _n/a_                                       | _n/a_                                        |
| ipProtocol             | ipProtocol                                                                           | ipProtocol                                  | ipProtocol                 | ipProtocol                                  | ipProtocol                                   |
| sourceIP               | ipSourceAddress                                                                      | ipSourceAddress                             | sourceIp                   | ipSourceAddress                             | ipSourceAddress                              |
| destinationIP          | ipDestinationAddress                                                                 | ipDestinationAddress                        | destinationIp              | ipDestinationAddress                        | ipDestinationAddress                         |
| destinationIPv4Range24 | ipDestinationSubnet                                                                  | ipDestinationSubnet                         |                            | ipDestinationSubnet                         | ipDestinationSubnet                          |
| destinationIPv4Range23 | _n/a_                                                                                | _n/a_                                       |                            | _n/a_                                       | _n/a_                                        |
| sourcePort             | sourcePort                                                                           | sourcePort                                  | sourcePort                 | sourcePort                                  | sourcePort                                   |
| destinationPort        | destinationPort                                                                      | destinationPort                             | destinationPort            | destinationPort                             | destinationPort                              |
| tcpFlags               | tcpFlags                                                                             | tcpFlags                                    | tcpFlags                   | tcpFlags                                    | tcpFlags                                     |

\* The `attackId` field value may be different between NAv1 and NAv2 for the same attack.

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/migration-guides/network-analytics-v2/schema-map/#page","headline":"NAv1 to NAv2 schema map · Cloudflare Analytics docs","description":"Map Network Analytics v1 fields to v2 fields.","url":"https://developers.cloudflare.com/analytics/graphql-api/migration-guides/network-analytics-v2/schema-map/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
