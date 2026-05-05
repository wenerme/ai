---
title: Product compatibility
description: Compatibility of Cloudflare products with Data Localization Suite features.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/data-localization/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Product compatibility

The Data Localization Suite (DLS) has three features, each controlling a different aspect of where your data is handled:

* **Geo Key Manager**: Controls where your private TLS keys are stored.
* **Regional Services**: Controls which Cloudflare data centers can decrypt and process your HTTPS traffic.
* **Customer Metadata Boundary (CMB)**: Controls which region stores your logs and analytics data.

The tables below show whether each Cloudflare product is compatible with each DLS feature. If you see 🚧, check the footnote number for specific restrictions.

✅ Fully compatible — no restrictions   
🚧 Compatible with caveats — check the footnote for details   
✘ Not compatible — this product cannot be used with this DLS feature   
⚫️ Not applicable — this product does not interact with this DLS feature

## Application Performance

| Product                                    | Geo Key Manager | Regional Services           | Customer Metadata Boundary  |
| ------------------------------------------ | --------------- | --------------------------- | --------------------------- |
| Caching/CDN                                | ✅               | ✅                           | ✅                           |
| Cache Reserve                              | ⚫️              | 🚧                          | ✅ [1](#user-content-fn-29)  |
| DNS                                        | ⚫️              | 🚧 [2](#user-content-fn-33) | ✅                           |
| HTTP/3 (with QUIC)                         | ⚫️              | ✘                           | ⚫️                          |
| Image Resizing                             | ✅               | ✅ [3](#user-content-fn-6)   | 🚧 [4](#user-content-fn-1)  |
| Load Balancing                             | ✅               | ✅                           | 🚧 [4](#user-content-fn-1)  |
| Network Error Logging (NEL)                | ⚫️              | ⚫️                          | ✘                           |
| Onion Routing                              | ✘               | ✘                           | ✘                           |
| O2O                                        | ✘               | ✘                           | ✘                           |
| Stream Delivery                            | ✅               | ✅                           | ✅                           |
| Tiered Caching                             | ✅               | 🚧 [5](#user-content-fn-2)  | 🚧 [6](#user-content-fn-30) |
| Trace                                      | ✘               | ✘                           | ✘                           |
| Waiting Room                               | ⚫️              | ✅                           | ✅                           |
| Web Analytics / Real User Monitoring (RUM) | ⚫️              | ⚫️                          | ✘ [7](#user-content-fn-43)  |
| Zaraz                                      | ✅               | ✅                           | ✅                           |

---

## Application Security

| Product                                     | Geo Key Manager | Regional Services | Customer Metadata Boundary  |
| ------------------------------------------- | --------------- | ----------------- | --------------------------- |
| Advanced Certificate Manager                | ⚫️              | ⚫️                | ⚫️                          |
| Advanced DDoS Protection                    | ✅               | ✅                 | 🚧 [8](#user-content-fn-3)  |
| API Shield                                  | ✅               | ✅                 | 🚧 [9](#user-content-fn-4)  |
| Bot Management                              | ✅               | ✅                 | ✅                           |
| Client-side security (formerly Page Shield) | ✅               | ✅                 | ✅                           |
| DNS Firewall                                | ⚫️              | ⚫️                | ✅                           |
| Rate Limiting                               | ✅               | ✅                 | ✅ [10](#user-content-fn-37) |
| SSL                                         | ✅               | ✅                 | ✅                           |
| Cloudflare for SaaS                         | ✘               | ✅                 | ✅                           |
| Turnstile                                   | ⚫️              | ✘                 | ✅ [11](#user-content-fn-38) |
| WAF/L7 Firewall                             | ✅               | ✅                 | ✅                           |
| DMARC Management                            | ⚫️              | ⚫️                | ✅                           |

---

## Developer Platform

| Product                        | Geo Key Manager             | Regional Services           | Customer Metadata Boundary   |
| ------------------------------ | --------------------------- | --------------------------- | ---------------------------- |
| Cloudflare Images              | ⚫️                          | ✅ [12](#user-content-fn-36) | 🚧 [13](#user-content-fn-35) |
| AI Gateway                     | ✘                           | ✘                           | 🚧 [14](#user-content-fn-39) |
| AI Search                      | ✘ [15](#user-content-fn-46) | ✘ [16](#user-content-fn-47) | 🚧 [17](#user-content-fn-48) |
| AI Security for Apps           | ✘                           | ✘                           | ✘                            |
| Cloudflare Pages               | ✅ [18](#user-content-fn-11) | ✅ [18](#user-content-fn-11) | 🚧 [4](#user-content-fn-1)   |
| Cloudflare D1                  | ⚫️                          | ⚫️                          | 🚧 [19](#user-content-fn-40) |
| Durable Objects                | ⚫️                          | ✅ [20](#user-content-fn-7)  | 🚧 [4](#user-content-fn-1)   |
| Email Routing                  | ⚫️                          | ⚫️                          | ✅                            |
| Remote MCP Server              | ✅ [21](#user-content-fn-44) | ✅ [22](#user-content-fn-45) | 🚧 [4](#user-content-fn-1)   |
| R2                             | ✅ [23](#user-content-fn-27) | ✅ [24](#user-content-fn-8)  | ✅ [25](#user-content-fn-28)  |
| Smart Placement                | ⚫️                          | ✘                           | ✘                            |
| Stream                         | ⚫️                          | ✘                           | 🚧 [4](#user-content-fn-1)   |
| Vectorize                      | ⚫️                          | ✘                           | ✘                            |
| Workers (deployed on a Zone)   | ✅                           | ✅                           | 🚧 [26](#user-content-fn-41) |
| Workers AI                     | ⚫️                          | ✘                           | ✅                            |
| Workers KV                     | ⚫️                          | ✘                           | ✅ [27](#user-content-fn-34)  |
| Workers.dev                    | ✘                           | ✘                           | ✘                            |
| Workers Analytics Engine (WAE) | ⚫️                          | ⚫️                          | 🚧 [4](#user-content-fn-1)   |

---

## Network Services

| Product                     | Geo Key Manager | Regional Services           | Customer Metadata Boundary  |
| --------------------------- | --------------- | --------------------------- | --------------------------- |
| Argo Smart Routing          | ✅               | ✘ [28](#user-content-fn-9)  | ✘ [29](#user-content-fn-10) |
| Static IP/BYOIP             | ⚫️              | ✅ [30](#user-content-fn-26) | ⚫️                          |
| Cloudflare Network Firewall | ⚫️              | ⚫️                          | ✅                           |
| Network Flow                | ⚫️              | ⚫️                          | 🚧 [4](#user-content-fn-1)  |
| Magic Transit               | ⚫️              | ⚫️                          | ✅ [8](#user-content-fn-3)   |
| Cloudflare WAN              | ⚫️              | ⚫️                          | ✅                           |
| Spectrum                    | ✅               | ✅ [31](#user-content-fn-42) | ✅                           |

---

## Platform

| Product      | Geo Key Manager | Regional Services | Customer Metadata Boundary   |
| ------------ | --------------- | ----------------- | ---------------------------- |
| Logpull      | ⚫️              | ⚫️                | 🚧 [32](#user-content-fn-12) |
| Logpush      | ⚫️              | ✅                 | 🚧 [33](#user-content-fn-13) |
| Log Explorer | ⚫️              | ⚫️                | ✘ [34](#user-content-fn-23)  |

---

## Zero Trust

| Product               | Geo Key Manager              | Regional Services            | Customer Metadata Boundary   |
| --------------------- | ---------------------------- | ---------------------------- | ---------------------------- |
| Access                | 🚧 [35](#user-content-fn-14) | 🚧 [36](#user-content-fn-15) | ✅ [37](#user-content-fn-16)  |
| Browser Isolation     | ⚫️                           | 🚧 [38](#user-content-fn-17) | ✅                            |
| CASB                  | ⚫️                           | ⚫️                           | ✘                            |
| Cloudflare Tunnel     | ⚫️                           | 🚧 [39](#user-content-fn-18) | ⚫️                           |
| Digital Experience    | ⚫️                           | ⚫️                           | 🚧 [40](#user-content-fn-49) |
| DLP                   | ⚫️ [41](#user-content-fn-19) | ⚫️ [41](#user-content-fn-19) | 🚧 [42](#user-content-fn-31) |
| Gateway               | 🚧 [43](#user-content-fn-20) | 🚧 [44](#user-content-fn-21) | 🚧 [45](#user-content-fn-22) |
| Cloudflare One Client | ⚫️                           | ⚫️                           | 🚧 [4](#user-content-fn-1)   |

## Footnotes

1. You cannot yet specify region location for object storage itself. [↩](#user-content-fnref-29)
2. If you use [outgoing zone transfers](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-primary/) (where Cloudflare sends your DNS records to non-Cloudflare nameservers), those transfers will include global Cloudflare IP addresses rather than region-specific ones. This means Regional Services will not function correctly when end users receive DNS answers from non-Cloudflare nameservers. [↩](#user-content-fnref-33)
3. Only when using a Custom Domain set to a region, either through Workers or [Transform Rules](https://developers.cloudflare.com/images/optimization/transformations/rewrite-rules/) within the same zone. [↩](#user-content-fnref-6)
4. Logs / Analytics not available outside US region when using Customer Metadata Boundary. [↩](#user-content-fnref-1) [↩2](#user-content-fnref-1-2) [↩3](#user-content-fnref-1-3) [↩4](#user-content-fnref-1-4) [↩5](#user-content-fnref-1-5) [↩6](#user-content-fnref-1-6) [↩7](#user-content-fnref-1-7) [↩8](#user-content-fnref-1-8) [↩9](#user-content-fnref-1-9)
5. Regular and Custom Tiered Cache (where you define the caching hierarchy) work with Regional Services. Smart Tiered Caching (where Cloudflare automatically selects intermediate cache data centers) is not available with Regional Services. [↩](#user-content-fnref-2)
6. Regular/Generic and Custom Tiered Cache work with Customer Metadata Boundary (CMB). Smart Tiered Caching (where Cloudflare automatically selects intermediate cache data centers) does not work with CMB.  
 With CMB set to EU, the Zone Dashboard **Caching** \> **Tiered Cache** \> **Smart Tiered Caching** option will not populate the Dashboard Analytics. [↩](#user-content-fnref-30)
7. Web Analytics collects the [minimum amount of information](https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/). Alternatively, you can [exclude EU Visitors from RUM](https://developers.cloudflare.com/speed/observatory/rum-beacon/#rum-excluding-eeaeu). [↩](#user-content-fnref-43)
8. [Adaptive DDoS Protection](https://developers.cloudflare.com/ddos-protection/managed-rulesets/adaptive-protection/) (which automatically adjusts DDoS rules based on your traffic patterns) is only supported when Customer Metadata Boundary is set to the US. All other DDoS protection features work with any CMB region. [↩](#user-content-fnref-3) [↩2](#user-content-fnref-3-2)
9. The following API Shield sub-features do not work when CMB is set to EU: API Discovery (automatic detection of your API endpoints), Volumetric Abuse Detection (identifying unusually high API call volumes), and [Sequence Analytics and Mitigation](https://developers.cloudflare.com/api-shield/security/sequence-analytics/) (tracking the order of API calls to detect misuse). All other API Shield features work with any CMB region. [↩](#user-content-fnref-4)
10. Legacy Zone Analytics & Logs section not available outside US region when using CMB. Use [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/) instead. [↩](#user-content-fnref-37)
11. [Turnstile Analytics](https://developers.cloudflare.com/turnstile/turnstile-analytics/) are available. However, there are no regionalization guarantees for the Siteverify API yet. [↩](#user-content-fnref-38)
12. Only when using a [Custom Domain](https://developers.cloudflare.com/images/optimization/hosted-images/serve-from-custom-domains/) set to a region. [↩](#user-content-fnref-36)
13. Logs / Analytics not supported for CMB = EU. Jurisdictional Restrictions ([storage](https://developers.cloudflare.com/images/storage/upload-images/methods/)) options are not supported today. All other features are available to all CMB regions. Note that beta or future features may not be in scope and could be subject to change. [↩](#user-content-fnref-35)
14. Jurisdictional Restrictions (storage) options for [Logs](https://developers.cloudflare.com/ai-gateway/observability/logging/) are not supported today. All other features are available to all CMB regions. [↩](#user-content-fnref-39)
15. Only R2 Custom Domains and Custom Certificate are supported. [↩](#user-content-fnref-46)
16. Only R2 Custom Domains are supported. [↩](#user-content-fnref-47)
17. The following are exceptions and are supported: AI Gateway Analytics (GraphQL Analytics datasets) and Logs (Logpush), R2 Dashboard Metrics & Analytics, Workers AI GraphQL Analytics datasets like aiInferenceAdaptive. [↩](#user-content-fnref-48)
18. Only when using [Custom Domain](https://developers.cloudflare.com/pages/configuration/custom-domains/) set to a region. [↩](#user-content-fnref-11) [↩2](#user-content-fnref-11-2)
19. Jurisdictional Restrictions ([data location](https://developers.cloudflare.com/d1/configuration/data-location/) / storage) options are not supported today. All other features are available to all CMB regions. Note that beta or future features may not be in scope and could be subject to change. [↩](#user-content-fnref-40)
20. [Jurisdiction restrictions for Durable Objects](https://developers.cloudflare.com/durable-objects/reference/data-location/#restrict-durable-objects-to-a-jurisdiction). [↩](#user-content-fnref-7)
21. Only when using Workers Routes & Domains and Custom Certificate. [↩](#user-content-fnref-44)
22. Only when using Workers Routes & Domains. [↩](#user-content-fnref-45)
23. Only when using a Custom Domain and a [Custom Certificate](https://developers.cloudflare.com/r2/reference/data-security/#encryption-in-transit) or [Keyless SSL](https://developers.cloudflare.com/ssl/keyless-ssl/). [↩](#user-content-fnref-27)
24. Only when using a [Custom Domain](https://developers.cloudflare.com/r2/buckets/public-buckets/#connect-a-bucket-to-a-custom-domain) set to a region and using [jurisdictions with the S3 API](https://developers.cloudflare.com/r2/reference/data-location/#using-jurisdictions-with-the-s3-api). [↩](#user-content-fnref-8)
25. R2 Dashboard [Metrics and Analytics](https://developers.cloudflare.com/r2/platform/metrics-analytics/) are populated. [Jurisdictional Restrictions](https://developers.cloudflare.com/r2/reference/data-location/#jurisdictional-restrictions) guarantee objects in a bucket are stored within a specific jurisdiction. [↩](#user-content-fnref-28)
26. Logs / Analytics not available outside US region when using Customer Metadata Boundary. Use Logpush instead. [↩](#user-content-fnref-41)
27. Jurisdictional Restrictions (storage) for Workers KV pairs is not supported today. [↩](#user-content-fnref-34)
28. Argo cannot be used with Regional Services. [↩](#user-content-fnref-9)
29. Argo cannot be used with Customer Metadata Boundary. [↩](#user-content-fnref-10)
30. Static IP/BYOIP can be used with the legacy Spectrum setup. [↩](#user-content-fnref-26)
31. Only applies to HTTP/S Spectrum applications. Spectrum applications use a separate regionalization mechanism from the Regional Hostnames API. Configuring a regional hostname does not regionalize a Spectrum application on the same hostname. Contact your [Account Team](https://developers.cloudflare.com/support/contacting-cloudflare-support/) for Spectrum-specific regionalization. [↩](#user-content-fnref-42)
32. Logpull available when using CMB = US only. Logpull is a legacy feature, consider using [Logpush](https://developers.cloudflare.com/data-localization/metadata-boundary/logpush-datasets/) or [Log Explorer](https://developers.cloudflare.com/log-explorer/) instead. [↩](#user-content-fnref-12)
33. Logpush available with Customer Metadata Boundary for [these datasets](https://developers.cloudflare.com/data-localization/metadata-boundary/logpush-datasets/). Contact your account team if you need another dataset. [↩](#user-content-fnref-13)
34. Currently, customers do not have the ability to choose the location of the Cloudflare-managed R2 bucket for Log Explorer. [↩](#user-content-fnref-23)
35. Access App SSL keys can use Geo Key Manager. [Access JWT](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/) is not yet localized. [↩](#user-content-fnref-14)
36. Can be localized to US FedRAMP Moderate Domestic region only. [↩](#user-content-fnref-15)
37. Customer Metadata Boundary can be used to limit data transfer outside region, but Access User Logs will not be available outside US region. EU customers must use Logpush to retain logs. [↩](#user-content-fnref-16)
38. Currently may only be used with US FedRAMP region. [↩](#user-content-fnref-17)
39. When Cloudflare Tunnel (a secure outbound connection from your network to Cloudflare) connects to Cloudflare, it can use either the Global Region (default, any data center worldwide) or the [US FedRAMP Moderate Domestic region](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/run-parameters/#region) (data centers that meet the US government's FedRAMP security standard). For incoming web requests, Regional Services only applies when you have [published applications](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/) (services exposed to users through the tunnel). In that case, the region associated with the DNS record will apply. [↩](#user-content-fnref-18)
40. Dashboard Analytics are empty when using CMB outside the US region. Use [Logpush](https://developers.cloudflare.com/logs/logpush/) instead. [↩](#user-content-fnref-49)
41. Uses Gateway HTTP and CASB. [↩](#user-content-fnref-19) [↩2](#user-content-fnref-19-2)
42. DLP is part of Gateway HTTP, however, [DLP detection entries](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/) are not available outside US region when using Customer Metadata Boundary. [↩](#user-content-fnref-31)
43. You can [bring your own certificate ↗](https://blog.cloudflare.com/bring-your-certificates-cloudflare-gateway/) to Gateway but these cannot yet be restricted to a specific region. [↩](#user-content-fnref-20)
44. Gateway HTTP (web traffic filtering) supports Regional Services. Gateway DNS (domain name filtering) does not yet support regionalization.  
 ICMP proxy (forwarding network diagnostic traffic like ping) and Mesh proxy are not available to Regional Services users. [File Sandboxing](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/file-sandboxing/) (an add-on that quarantines and scans suspicious files in an isolated environment) is incompatible with DLS. [↩](#user-content-fnref-21)
45. Dashboard Analytics and Logs are empty when using CMB outside the US region. Use Logpush instead. [↩](#user-content-fnref-22)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/data-localization/","name":"Data Localization Suite"}},{"@type":"ListItem","position":3,"item":{"@id":"/data-localization/compatibility/","name":"Product compatibility"}}]}
```
