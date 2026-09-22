---
description: GraphQL Analytics API fields that respect Customer Metadata Boundary configuration.
title: GraphQL datasets
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/data-localization/llms.txt
> Use this file to discover all available pages before exploring further.

# GraphQL datasets

Last updated May 5, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/data-localization/metadata-boundary/graphql-datasets/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/) allows you to programmatically query your Cloudflare analytics data (such as request counts, security events, and performance metrics). When Customer Metadata Boundary (CMB) is enabled, not all analytics data fields are available in every region.

The table below shows a non-exhaustive list of GraphQL Analytics API fields that respect CMB configuration. Fields marked "US and EU" return data regardless of your CMB region. Fields marked "US only" return data only when CMB is set to US — if your CMB is set to EU, queries for these fields will return empty results.

| Suite/Category | Product | GraphQL Analytics API Field(s) supported in |
| --- | --- | --- |
| Application Performance | Caching/CDN | US and EU <br> `httpRequestsAdaptive` <br> `httpRequestsAdaptiveGroups` <br> `httpRequestsOverviewAdaptiveGroups` <br> `httpRequests1mGroups` <br> `httpRequests1hGroups` <br> `httpRequests1dGroups` |
| Cache Reserve |  | US and EU <br> `cacheReserveOperationsAdaptiveGroups` <br> `cacheReserveRequestsAdaptiveGroups` <br> `cacheReserveStorageAdaptiveGroups` |
| DNS |  | US and EU <br> `dnsAnalyticsAdaptive` <br> `dnsAnalyticsAdaptiveGroups` |
| Image Resizing |  | US only <br> `imageResizingRequests1mGroups` <br> `imagesRequestsAdaptiveGroups` <br> `imagesUniqueTransformations` |
| Load Balancing |  | US only <br> [`loadBalancingRequestsAdaptive`](https://developers.cloudflare.com/load-balancing/reference/load-balancing-analytics/#graphql-analytics) <br> [`loadBalancingRequestsAdaptiveGroups`](https://developers.cloudflare.com/load-balancing/reference/load-balancing-analytics/#graphql-analytics) <br> `healthCheckEventsAdaptive` <br> `healthCheckEventsAdaptiveGroups` |
| Stream Delivery | Same as Caching/CDN | |
| Tiered Caching |  | US and EU <br> Only the field `upperTierColoName` part of `httpRequestsAdaptive` and `httpRequestsAdaptiveGroups` |
| Secondary DNS | Same as DNS | |
| Waiting Room |  | US and EU <br> [`waitingRoomAnalyticsAdaptive`](https://developers.cloudflare.com/waiting-room/waiting-room-analytics/#graphql-analytics) <br> [`waitingRoomAnalyticsAdaptiveGroups`](https://developers.cloudflare.com/waiting-room/waiting-room-analytics/#graphql-analytics) |
| Web Analytics / Real User Monitoring (RUM) |  | US only <br> `rumWebVitalsEventsAdaptive` <br> `rumWebVitalsEventsAdaptiveGroups` <br> `rumPerformanceEventsAdaptiveGroups` <br> `rumPageloadEventsAdaptiveGroups` |
| Zaraz |  | US and EU <br>`zarazActionsAdaptiveGroups` <br> `zarazTrackAdaptiveGroups` <br> `zarazTriggersAdaptiveGroups` |
| Application Security | Advanced Certificate Manager | US and EU <br> Only the fields `clientSSLProtocol` and `ja3Hash` part of `httpRequestsAdaptive` and `httpRequestsAdaptiveGroups` |
| Advanced DDoS Protection |  | US and EU <br> [`dosdAttackAnalyticsGroups`](https://developers.cloudflare.com/analytics/graphql-api/migration-guides/network-analytics-v2/node-reference/) <br> [`dosdNetworkAnalyticsAdaptiveGroups`](https://developers.cloudflare.com/analytics/graphql-api/migration-guides/network-analytics-v2/node-reference/) <br> [`flowtrackdNetworkAnalyticsAdaptiveGroups`](https://developers.cloudflare.com/analytics/graphql-api/migration-guides/network-analytics-v2/node-reference/) <br> `advancedTcpProtectionNetworkAnalyticsAdaptiveGroups` <br> `advancedDnsProtectionNetworkAnalyticsAdaptiveGroups` <br> `programmableFlowProtectionNetworkAnalyticsAdaptiveGroups` |
| API Shield |  | US and EU <br> [`apiGatewayGraphqlQueryAnalyticsGroups`](https://developers.cloudflare.com/api-shield/security/graphql-protection/api/#gather-graphql-statistics) <br> `apiGatewayMatchedSessionIDsAdaptiveGroups` <br> US only <br> `apiRequestSequencesGroups` |
| Bot Management |  | US and EU <br>`httpRequestsAdaptive` <br> [`httpRequestsAdaptiveGroups`](https://developers.cloudflare.com/analytics/graphql-api/migration-guides/graphql-api-analytics/) <br> [`firewallEventsAdaptive`](https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-firewall-events/) <br> [`firewallEventsAdaptiveGroups` ↗](https://blog.cloudflare.com/how-we-used-our-new-graphql-api-to-build-firewall-analytics/) |
| DNS Firewall | Same as DNS | |
| DMARC Management |  | US and EU <br> `dmarcReportsAdaptive` <br> `dmarcReportsSourcesAdaptiveGroups` |
| Client-side security (formerly Page Shield) |  | US and EU <br> [`pageShieldReportsAdaptiveGroups`](https://developers.cloudflare.com/client-side-security/rules/violations/#get-rule-violations-via-graphql-api) |
| SSL |  | US and EU <br> Only the fields `clientSSLProtocol` and `ja3Hash` part of `httpRequestsAdaptive` and `httpRequestsAdaptiveGroups` |
| SSL 4 SaaS |  | US and EU <br> [clientRequestHTTPHost](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/hostname-analytics/#explore-customer-usage) <br> Refer to [GraphQL Tutorial on querying HTTP events by hostname](https://developers.cloudflare.com/analytics/graphql-api/tutorials/end-customer-analytics/) |
| Turnstile |  | US and EU <br> [`turnstileAdaptiveGroups`](https://developers.cloudflare.com/turnstile/turnstile-analytics/) |
| WAF/L7 Firewall |  | US and EU <br> [`firewallEventsAdaptive`](https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-firewall-events/) <br> [`firewallEventsAdaptiveGroups` ↗](https://blog.cloudflare.com/how-we-used-our-new-graphql-api-to-build-firewall-analytics/) <br> `firewallEventsAdaptiveByTimeGroups` |
| Developer Platform | Cloudflare Images | US only <br> `imagesRequestsAdaptiveGroups` |
| Cloudflare Pages |  | US only <br> `pagesFunctionsInvocationsAdaptiveGroups` <br> |
| Durable Objects |  | US only <br> [`durableObjectsInvocationsAdaptiveGroups`](https://developers.cloudflare.com/durable-objects/observability/metrics-and-analytics/) <br> [`durableObjectsPeriodicGroups`](https://developers.cloudflare.com/durable-objects/observability/metrics-and-analytics/) <br> [`durableObjectsStorageGroups`](https://developers.cloudflare.com/durable-objects/observability/metrics-and-analytics/) <br> [`durableObjectsSubrequestsAdaptiveGroups`](https://developers.cloudflare.com/durable-objects/observability/metrics-and-analytics/) |
| Email Routing |  | US and EU <br> `emailRoutingAdaptive` <br> `emailRoutingAdaptiveGroups` |
| R2 |  | US and EU <br> `r2OperationsAdaptiveGroups` <br> `r2StorageAdaptiveGroups` |
| Stream |  | US only <br> [`streamMinutesViewedAdaptiveGroups`](https://developers.cloudflare.com/stream/getting-analytics/fetching-bulk-analytics/) <br> [`videoPlaybackEventsAdaptiveGroups`](https://developers.cloudflare.com/stream/getting-analytics/fetching-bulk-analytics/) <br> [`videoBufferEventsAdaptiveGroups`](https://developers.cloudflare.com/stream/getting-analytics/fetching-bulk-analytics/) <br> [`videoQualityEventsAdaptiveGroups`](https://developers.cloudflare.com/stream/getting-analytics/fetching-bulk-analytics/) |
| Workers (deployed on a Zone) |  | US and EU <br> `workerPlacementAdaptiveGroups` <br> `workersAnalyticsEngineAdaptiveGroups` <br> US only <br> `workersZoneInvocationsAdaptiveGroups` <br> `workersZoneSubrequestsAdaptiveGroups` <br> `workersOverviewRequestsAdaptiveGroups` <br> `workersOverviewDataAdaptiveGroups` <br> [`workersInvocationsAdaptive`](https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-workers-metrics/) <br> `workersInvocationsScheduled` <br> `workersSubrequestsAdaptiveGroups` |
| Network Services | Network Error Logging (NEL) / Edge Reachability / Last Mile Insights | US only <br> `nelReportsAdaptiveGroups` |
| Cloudflare Network Firewall |  | US and EU <br> [`magicFirewallSamplesAdaptiveGroups`](https://developers.cloudflare.com/cloudflare-network-firewall/tutorials/graphql-analytics/) <br> [`magicFirewallNetworkAnalyticsAdaptiveGroups`](https://developers.cloudflare.com/cloudflare-network-firewall/tutorials/graphql-analytics/#example-queries-for-cloudflare-network-firewall) |
| Network Flow |  | US only <br> [`mnmFlowDataAdaptiveGroups`](https://developers.cloudflare.com/network-flow/tutorials/graphql-analytics/) |
| Magic Transit |  | US and EU <br> [`magicTransitNetworkAnalyticsAdaptiveGroups`](https://developers.cloudflare.com/analytics/graphql-api/migration-guides/network-analytics-v2/node-reference/) <br> [`flowtrackdNetworkAnalyticsAdaptiveGroups`](https://developers.cloudflare.com/analytics/graphql-api/migration-guides/network-analytics-v2/node-reference/) <br> `magicTransitTunnelHealthCheckSLOsAdaptiveGroups` <br>[`magicTransitTunnelHealthChecksAdaptiveGroups`](https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-magic-transit-tunnel-healthcheck-results/) <br> [`magicTransitTunnelTrafficAdaptiveGroups`](https://developers.cloudflare.com/magic-transit/analytics/query-bandwidth/) |
| Cloudflare WAN |  | US and EU <br> `MagicWANConnectorMetricsAdaptiveGroups` |
| Spectrum |  | US and EU <br> [`spectrumNetworkAnalyticsAdaptiveGroups`](https://developers.cloudflare.com/analytics/graphql-api/migration-guides/network-analytics-v2/node-reference/) |
| Platform | GraphQL Analytics API | US and EU <br> [All GraphQL Analytics API datasets](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/introspection/) |
| Logpush |  | US and EU <br> [`logpushHealthAdaptiveGroups`](https://developers.cloudflare.com/logs/logpush/alerts-and-analytics/#enable-logpush-health-analytics) |
| Zero Trust | Access | US and EU <br> [`accessLoginRequestsAdaptiveGroups`](https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-access-login-events/) |
| Browser Isolation |  | US and EU <br> Only the field `isIsolated` part of `gatewayL7RequestsAdaptiveGroups` |
| DLP | Part of Gateway HTTP / Gateway L7 | |
| Gateway |  | US and EU <br> `gatewayL7RequestsAdaptiveGroups` <br> `gatewayL4SessionsAdaptiveGroups` <br> `gatewayResolverQueriesAdaptiveGroups` <br> `gatewayResolverByCategoryAdaptiveGroups` <br> `gatewayResolverByRuleExecutionPerformanceAdaptiveGroups` <br> US only <br> `gatewayL4DownstreamSessionsAdaptiveGroups` <br> `gatewayL4UpstreamSessionsAdaptiveGroups` |
| WARP |  | US and EU <br> `warpDeviceAdaptiveGroups` |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/data-localization/metadata-boundary/graphql-datasets/#page","headline":"GraphQL datasets","description":"GraphQL Analytics API fields that respect Customer Metadata Boundary configuration.","url":"https://developers.cloudflare.com/data-localization/metadata-boundary/graphql-datasets/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["GraphQL","Analytics"]}
```
