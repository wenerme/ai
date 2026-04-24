---
title: Release notes
description: Review recent changes to Cloudflare Radar.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/radar/release-notes.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Release notes

[ Subscribe to RSS ](https://developers.cloudflare.com/radar/release-notes/index.xml)

## 2026-04-01

**Promote Routing to a dedicated section with sub-pages**
* Expanded the Routing page into a full section with dedicated [Overview](https://radar.cloudflare.com/routing), [RPKI](https://radar.cloudflare.com/routing/rpki), and [Anomalies](https://radar.cloudflare.com/routing/anomalies) sub-pages.
* Added new **Top 100 ASes** widget to the routing overview, with rankings by customer cone, IPv4 address space, and IPv6 address space.
* Added new **RPKI prefix validation** widget showing per-ASN prefixes grouped by validation status (Valid, Invalid, Unknown).
* Improved the IP address space chart to display both IPv4 and IPv6 trends on all views including global.

## 2026-03-06

**Add region filtering and AS/location dimensions to API**
* Added region filtering across all location-aware pages, including continents, geographic subregions, political regions (EU, ASEAN, African Union), and US Census regions/divisions.
* Added traffic volume insights by top autonomous systems and countries/territories.
* Added AS and location dimensions to the [HTTP](https://developers.cloudflare.com/api/resources/radar/subresources/http/), [DNS](https://developers.cloudflare.com/api/resources/radar/subresources/dns/), and [NetFlows](https://developers.cloudflare.com/api/resources/radar/subresources/netflows/) APIs.
* Added breadcrumb navigation.

## 2026-02-27

**Add Post-Quantum and Key Transparency insights**
* Added new [Post-Quantum](https://developers.cloudflare.com/api/resources/radar/subresources/post%5Fquantum/) API:  
   * [/post\_quantum/tls/support](https://developers.cloudflare.com/api/resources/radar/subresources/post%5Fquantum/subresources/tls/methods/support/) \- Tests whether a host supports post-quantum TLS key exchange.  
   * [/post\_quantum/origin/summary/{dimension}](https://developers.cloudflare.com/api/resources/radar/subresources/post%5Fquantum/methods/summary/) \- Returns origin post-quantum data summarized by key agreement algorithm.  
   * [/post\_quantum/origin/timeseries\_groups/{dimension}](https://developers.cloudflare.com/api/resources/radar/subresources/post%5Fquantum/methods/timeseries%5Fgroups/) \- Returns origin post-quantum timeseries data grouped by key agreement algorithm.
* Launched [Post-Quantum Encryption](https://radar.cloudflare.com/post-quantum) page.
* Launched [Key Transparency](https://radar.cloudflare.com/key-transparency) page.

## 2026-02-25

**Add RPKI ASPA deployment insights**
* Added new [ASPA](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/rpki/subresources/aspa/) API endpoints:  
   * [/bgp/rpki/aspa/snapshot](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/rpki/subresources/aspa/methods/snapshot/) \- Retrieves current or historical ASPA objects.  
   * [/bgp/rpki/aspa/changes](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/rpki/subresources/aspa/methods/changes/) \- Retrieves changes to ASPA objects over time.  
   * [/bgp/rpki/aspa/timeseries](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/rpki/subresources/aspa/methods/timeseries/) \- Retrieves ASPA object counts over time as a timeseries.
* Added ASPA deployment trend and objects count widgets to the [global routing page](https://radar.cloudflare.com/routing).
* Added ASPA deployment rate widget to country and region routing pages.
* Added ASPA-verified upstreams and change timeline to AS routing pages.

## 2026-02-12

**Add content type dimension to AI Bots**
* Added new `content_type` dimension and filter to the AI Bots API:  
   * [/ai/bots/summary/{dimension}](https://developers.cloudflare.com/api/resources/radar/subresources/ai/subresources/bots/methods/summary%5Fv2/)  
   * [/ai/bots/timeseries\_groups/{dimension}](https://developers.cloudflare.com/api/resources/radar/subresources/ai/subresources/bots/methods/timeseries%5Fgroups/)
* Added new **Content Type Distribution** chart to the [AI Insights page](https://radar.cloudflare.com/ai-insights#content-type).
* Added content type chart to individual [bot information pages](https://radar.cloudflare.com/bots/directory) for AI crawlers.

## 2025-12-16

**New client type dimension in Web Crawlers and Mixed Purpose entry**
* Added new Mixed Purpose entry to the `crawl_purpose` dimension of the [Web Crawlers](https://developers.cloudflare.com/api/resources/radar/subresources/bots/subresources/web%5Fcrawlers/) API, which as of this release includes Googlebot and Bingbot.
* Added new dimension `client_type` to the [Web Crawlers](https://developers.cloudflare.com/api/resources/radar/subresources/bots/subresources/web%5Fcrawlers/) API.  
   * Added new **HTML page requests by client type graph** to the [AI Insights page](https://radar.cloudflare.com/ai-insights#html-page-requests-by-client-type).

## 2025-11-24

**Add HTTP origins insights**
* Added new [Origins](https://developers.cloudflare.com/api/resources/radar/subresources/origins/) API.
* Extended [Annotations](https://developers.cloudflare.com/api/resources/radar/subresources/annotations/) and [Traffic Anomalies](https://developers.cloudflare.com/api/resources/radar/subresources/traffic%5Fanomalies/) APIs to support origin outages and anomalies.

## 2025-10-27

**Add TLD insights**
* Added new dimensions `tld` and `tld_dns_magnitude` to the [DNS](https://developers.cloudflare.com/api/resources/radar/subresources/dns/) API.
* Added new endpoints [/tlds](https://developers.cloudflare.com/api/resources/radar/subresources/tlds/methods/list/) and [/tlds/{tld}](https://developers.cloudflare.com/api/resources/radar/subresources/tlds/methods/get/).

## 2025-10-09

**Add CT log activity statistics**
* Added new CT log activity stats to the [Get Certificate Log Details](https://developers.cloudflare.com/api/resources/radar/subresources/ct/subresources/logs/methods/get/) API response.

## 2025-10-06

**Add PQ encryption browser support check**
* Added a [post-quantum encryption browser support check](https://radar.cloudflare.com/adoption-and-usage#browser-support) to the PQ encryption card in the Adoption & Usage section.

## 2025-09-29

**Add geolocation, ADM1 dimension to HTTP endpoints, and NetFlows endpoints**
* Added new [geolocation endpoints](https://developers.cloudflare.com/api/resources/radar/subresources/geolocations/).
* Added new ADM1 dimension to [HTTP](https://developers.cloudflare.com/api/resources/radar/subresources/http/) `summary` and `timeseries_groups` endpoints.
* Added new [NetFlows](https://developers.cloudflare.com/api/resources/radar/subresources/netflows/) summary by dimension endpoint [summary\_v2](https://developers.cloudflare.com/api/resources/radar/subresources/netflows/methods/summary%5Fv2/).
* Added new `geoId` filter to all [HTTP](https://developers.cloudflare.com/api/resources/radar/subresources/http/) and [NetFlows](https://developers.cloudflare.com/api/resources/radar/subresources/netflows/) endpoints.

## 2025-09-22

**Add IRR AS-SET membership lookup endpoint**
* Added IRR AS-SET membership lookup endpoint  
   * [ /entities/asns/{asn}/as\_set ](https://developers.cloudflare.com/api/resources/radar/subresources/entities/subresources/asns/methods/as%5Fset/)

## 2025-08-27

**Add industry and vertical to AI Bots and Web Crawlers, and bot kind to Bots**
* Added vertical and industry dimensions/filters to:  
   * [/ai/bots/summary/{dimension}](https://developers.cloudflare.com/api/resources/radar/subresources/ai/subresources/timeseries%5Fgroups/methods/summary/)  
   * [/ai/bots/timeseries\_groups/{dimension}](https://developers.cloudflare.com/api/resources/radar/subresources/ai/subresources/timeseries%5Fgroups/methods/timeseries%5Fgroups/)  
   * [/bots/crawlers/summary/{dimension}](https://developers.cloudflare.com/api/resources/radar/subresources/bots/subresources/web%5Fcrawlers/methods/summary/)  
   * [/bots/crawlers/timeseries\_groups/{dimension}](https://developers.cloudflare.com/api/resources/radar/subresources/bots/subresources/web%5Fcrawlers/methods/timeseries%5Fgroups/)
* Added bot kind dimension/filter to:  
   * [/bots/summary/{dimension}](https://developers.cloudflare.com/api/resources/radar/subresources/bots/methods/summary/)  
   * [/bots/timeseries\_groups/{dimension}](https://developers.cloudflare.com/api/resources/radar/subresources/bots/methods/timeseries%5Fgroups/)
* Added new `botKind` filter to:  
   * [/bots/timeseries](https://developers.cloudflare.com/api/resources/radar/subresources/bots/methods/timeseries/)
* Added new `kind` property/filter to:  
   * [/bots](https://developers.cloudflare.com/api/resources/radar/subresources/bots/methods/list/)  
   * [/bots/{bot\_slug}](https://developers.cloudflare.com/api/resources/radar/subresources/bots/methods/get/)

## 2025-08-14

**Add AI Bots crawl purpose**
* Added AI Bots crawl purpose dimension and filter to [summary](https://developers.cloudflare.com/api/resources/radar/subresources/ai/subresources/timeseries%5Fgroups/methods/summary/) and [timeseries\_groups](https://developers.cloudflare.com/api/resources/radar/subresources/ai/subresources/timeseries%5Fgroups/methods/timeseries%5Fgroups/) endpoints.

## 2025-08-06

**Add Certificate Transparency (CT) endpoints**
* Added [CT endpoints](https://developers.cloudflare.com/api/resources/radar/subresources/ct/).

## 2025-07-01

**Add Bots and Web Crawlers endpoints**
* Added new [bots endpoints](https://developers.cloudflare.com/api/resources/radar/subresources/bots/), replacing the deprecated verified bots endpoints. Use the following replacements:  
   * `/verified_bots/top/bots` → `/bots/summary/bot`  
   * `/verified_bots/top/categories` → `/bots/summary/bot_category`
* Added [web crawlers endpoints](https://developers.cloudflare.com/api/resources/radar/subresources/bots/subresources/web%5Fcrawlers/).

## 2025-03-20

**Endpoint deprecations and new BGP real-time routes endpoint**
* Deprecated endpoints for improved consistency (switch to the following):  
   * `/attacks/layer3/top/industry` → [/attacks/layer3/summary/industry](https://developers.cloudflare.com/api/resources/radar/subresources/attacks/subresources/layer3/subresources/summary/methods/industry/)  
   * `/attacks/layer3/top/vertical` → [/attacks/layer3/summary/vertical](https://developers.cloudflare.com/api/resources/radar/subresources/attacks/subresources/layer3/subresources/summary/methods/vertical/)  
   * `/attacks/layer7/top/industry` → [/attacks/layer7/summary/industry](https://developers.cloudflare.com/api/resources/radar/subresources/attacks/subresources/layer7/subresources/summary/methods/industry/)  
   * `/attacks/layer7/top/vertical` → [/attacks/layer7/summary/vertical](https://developers.cloudflare.com/api/resources/radar/subresources/attacks/subresources/layer7/subresources/summary/methods/vertical/)
* Added the [BGP real-time routes endpoint](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/routes/methods/realtime/).

## 2025-03-18

**Add leaked credential checks endpoints**
* Added [leaked credential checks endpoints](https://developers.cloudflare.com/api/resources/radar/subresources/leaked%5Fcredentials/).

## 2025-02-27

**Add DNS endpoints**
* Added [DNS endpoints](https://developers.cloudflare.com/api/resources/radar/subresources/dns/).

## 2025-02-04

**Add Internet services ranking, robots.txt, and AI inference endpoints**
* Added [Internet services ranking endpoints](https://developers.cloudflare.com/api/resources/radar/subresources/ranking/subresources/internet%5Fservices/).
* Added [robots.txt endpoints](https://developers.cloudflare.com/api/resources/radar/subresources/robots%5Ftxt/).
* Added [AI inference endpoints](https://developers.cloudflare.com/api/resources/radar/subresources/ai/subresources/inference/).

## 2024-06-27

**Change TCP connection tampering API endpoints to TCP Resets Timeouts**
* Changed the connection tampering summary and timeseries API endpoints to TCP resets timeouts [summary](https://developers.cloudflare.com/api/resources/radar/subresources/tcp%5Fresets%5Ftimeouts/methods/summary/)and [timeseries](https://developers.cloudflare.com/api/resources/radar/subresources/tcp%5Fresets%5Ftimeouts/methods/timeseries%5Fgroups/), respectively.

## 2023-11-27

**Add more meta information's**
* Added meta.lastUpdated to all summaries and top endpoints (timeseries and timeseriesGroups already had this).
* Fixed meta.dateRange to return date ranges for all requested series.

## 2023-11-16

**Add new layer 3 endpoints and layer 7 dimensions**
* Added layer 3 [top origin locations](https://developers.cloudflare.com/api/resources/radar/subresources/attacks/subresources/layer3/subresources/top/subresources/locations/methods/origin/)and [top target location](https://developers.cloudflare.com/api/resources/radar/subresources/attacks/subresources/layer3/subresources/top/subresources/locations/methods/target/).
* Added layer 7 Summaries by `http_method`, `http_version`, `ip_version`, `managed_rules`, `mitigation_product`.
* Added layer 7 Timeseries Groups by `http_method`, `http_version`, `ip_version`, `managed_rules`, `mitigation_product`, `industry`, `vertical`.
* Added layer 7 Top by `industry`, `vertical`.
* Deprecated layer 7 timeseries groups without dimension.  
   * To continue getting this data, switch to the new[timeseries group by mitigation\_product](https://developers.cloudflare.com/api/resources/radar/subresources/attacks/subresources/layer7/subresources/timeseries%5Fgroups/methods/mitigation%5Fproduct/)endpoint.
* Deprecated layer 7 summary without dimension.  
   * To continue getting this data, switch to the new[summary by mitigation\_product](https://developers.cloudflare.com/api/resources/radar/subresources/attacks/subresources/layer7/subresources/summary/methods/mitigation%5Fproduct/)endpoint.
* Added new [Error codes](https://developers.cloudflare.com/radar/get-started/error-codes/).

## 2023-10-31

**Add new layer 3 direction parameter**
* Added a `direction` parameter to all layer 3 endpoints. Use together with `location` parameter to filter by origin or target location [timeseries groups](https://developers.cloudflare.com/api/resources/radar/subresources/attacks/subresources/layer3/subresources/timeseries%5Fgroups/methods/vector/).

## 2023-09-08

**Add Connection Tampering endpoints**
* Added Connection Tampering [summary](https://developers.cloudflare.com/api/resources/radar/subresources/tcp%5Fresets%5Ftimeouts/methods/summary/)and [timeseries](https://developers.cloudflare.com/api/resources/radar/subresources/tcp%5Fresets%5Ftimeouts/methods/timeseries%5Fgroups/) endpoints.

## 2023-08-14

**Deprecate old layer 3 dataset**
* Added Regional Internet Registry (see field `source` in response) to [get asn by id](https://developers.cloudflare.com/api/resources/radar/subresources/entities/subresources/asns/methods/get/)and [get asn by ip](https://developers.cloudflare.com/api/resources/radar/subresources/entities/subresources/asns/methods/ip/) endpoints.
* Stopped collecting data in the old layer 3 data source.
* Updated layer 3[timeseries](https://developers.cloudflare.com/api/resources/radar/subresources/attacks/subresources/layer3/methods/timeseries/) endpoint to start using the new layer 3 data source by default, fetching the old data source now requires sending the parameter`metric=bytes_old`.
* Deprecated layer 3 summary endpoint, this will stop receiving data after 2023-08-14.  
   * To continue getting this data, switch to the new [timeseries group protocol](https://developers.cloudflare.com/api/resources/radar/subresources/attacks/subresources/layer3/subresources/summary/methods/protocol/)endpoint.
* Deprecated layer 3 timeseries groups endpoint, this will stop receiving data after 2023-08-14.  
   * To continue getting this data, switch to the new [timeseries group protocol](https://developers.cloudflare.com/api/resources/radar/subresources/attacks/subresources/layer3/subresources/timeseries%5Fgroups/methods/protocol/)endpoint.

## 2023-07-31

**Fix HTTP timeseries endpoint URLs**
* Updated HTTP `timeseries` endpoints URLs to [timeseries\_groups](https://developers.cloudflare.com/api/resources/radar/subresources/http/subresources/timeseries%5Fgroups/)due to consistency. Old timeseries endpoints are still available, but will soon be removed.

## 2023-07-20

**Add URL Scanner endpoints**
* Added [URL Scanner endpoints](https://developers.cloudflare.com/api/resources/url%5Fscanner/). For more information, refer to [URL Scanner](https://developers.cloudflare.com/radar/investigate/url-scanner/).

## 2023-06-20

**Add Internet quality endpoints**
* Added [Internet quality endpoints](https://developers.cloudflare.com/api/resources/radar/subresources/quality/).

## 2023-06-07

**Add BGP stats, pfx2as and moas endpoints**
* Added BGP [stats](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/routes/methods/stats/),[pfx2as](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/routes/methods/pfx2as/)and [moas](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/routes/methods/moas/) endpoints.

## 2023-05-10

**Added \`IOS\` as an option for the OS parameter in all HTTP**
* Added `IOS` as an option for the OS parameter in all HTTP endpoints ([example](https://developers.cloudflare.com/api/resources/radar/subresources/http/subresources/summary/methods/bot%5Fclass/)).

## 2023-03-20

**Add AS112 and email endpoints**
* Added [AS112 endpoints](https://developers.cloudflare.com/api/resources/radar/subresources/as112/).
* Added [email endpoints](https://developers.cloudflare.com/api/resources/radar/subresources/email/).

## 2023-01-23

**Updated IPv6 calculation method**
* IPv6 percentage started to be calculated as (IPv6 requests / requests for dual-stacked content), where as before it was calculated as (IPv6 requests / IPv4+IPv6 requests).

## 2023-01-11

**Add new layer 3 dataset**
* Added new layer 3 data source and related endpoints.
* Updated layer 3[timeseries](https://developers.cloudflare.com/api/resources/radar/subresources/attacks/subresources/layer3/methods/timeseries/) endpoint to support fetching both current and new data sources. For retro-compatibility reasons, fetching the new data source requires sending the parameter `metric=bytes` else the current data source will be returned.
* Deprecated old layer 3 endpoints timeseries\_groups and summary. Users should upgrade to newer endpoints.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/radar/","name":"Radar"}},{"@type":"ListItem","position":3,"item":{"@id":"/radar/release-notes/","name":"Release notes"}}]}
```
