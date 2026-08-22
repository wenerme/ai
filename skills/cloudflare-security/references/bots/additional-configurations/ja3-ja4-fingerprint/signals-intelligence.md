---
description: View aggregate intelligence data for JA4 fingerprints across Cloudflare traffic.
title: Signals Intelligence
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt
> Use this file to discover all available pages before exploring further.

# Signals Intelligence

Last updated May 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/bots/additional-configurations/ja3-ja4-fingerprint/signals-intelligence/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Bot Management customers can view aggregate intelligence data for each [JA4 fingerprint](https://developers.cloudflare.com/bots/additional-configurations/ja3-ja4-fingerprint/) based on traffic across the Cloudflare network. Use this data to understand why a request received a specific bot score or to feed into your own machine learning models running in [Cloudflare Workers](https://developers.cloudflare.com/workers/) or at your origin.

Specifically, for each JA4 fingerprint, you will be able to access the following information:

* The percentage of traffic associated with browsers that Cloudflare sees.
* The percentage of traffic associated with known bots that Cloudflare sees.
* The number of networks Cloudflare sees actively using this fingerprint.
* The number of Cloudflare sites that see traffic from this fingerprint.
* The frequency that fingerprint requests caches content and generates errors.

You can also use these fields with [Workers AI](https://developers.cloudflare.com/workers-ai/) to build custom machine learning models.

## Signals Intelligence fields

Signals Intelligence fields show observations about a particular JA4 that Cloudflare has seen globally over the last hour.

| Field name           | Description                                                                                                                                                                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| h2h3\_ratio\_1h      | The ratio of HTTP/2 and HTTP/3 requests combined with the total number of requests for the JA4 fingerprint in the last hour. Higher values indicate a higher proportion of HTTP/2 and HTTP/3 requests compared to other protocol versions.        |
| heuristic\_ratio\_1h | The ratio of requests with a scoreSrc value of "heuristics" for the JA4 fingerprint in the last hour. Higher values suggest a larger proportion of requests being flagged by heuristic-based scoring.                                             |
| reqs\_quantile\_1h   | The quantile position of the JA4 fingerprint based on the number of requests across all fingerprints in the last hour. Higher values indicate a relatively higher number of requests compared to other fingerprints.                              |
| uas\_rank\_1h        | The rank of the JA4 fingerprint based on the number of distinct user agents across all fingerprints in the last hour. Lower values indicate a higher diversity of user agents associated with the fingerprint.                                    |
| browser\_ratio\_1h   | The ratio of requests originating from browser-based user agents for the JA4 fingerprint in the last hour. Higher values suggest a higher proportion of browser-based requests.                                                                   |
| paths\_rank\_1h      | The rank of the JA4 fingerprint based on the number of unique request paths across all fingerprints in the last hour. Lower values indicate a higher diversity of request paths associated with the fingerprint.                                  |
| reqs\_rank\_1h       | The rank of the JA4 fingerprint based on the number of requests across all fingerprints in the last hour. Lower values indicate a higher number of requests associated with the fingerprint.                                                      |
| cache\_ratio\_1h     | The ratio of cacheable responses for the JA4 fingerprint in the last hour. Higher values suggest a higher proportion of responses that can be cached.                                                                                             |
| ips\_rank\_1h        | The rank of the JA4 fingerprint based on the number of unique client IP addresses across all fingerprints in the last hour. Lower values indicate a higher number of distinct client IPs associated with the fingerprint.                         |
| ips\_quantile\_1h    | The quantile position of the JA4 fingerprint based on the number of unique client IP addresses across all fingerprints in the last hour. Higher values indicate a relatively higher number of distinct client IPs compared to other fingerprints. |

If you want to use JA4 fingerprints and Signals Intelligence, your Workers script should be able to handle missing fields when Bot Management isn't able to calculate or populate JA4 Signals (for example, non-TLS traffic or when Bot Management is skipped). For Orange-to-Orange (O2O) scenarios where Bot Management is in effect, JA4 Signals correspond to the eyeball (end-user) connection and are preserved through the O2O chain, including O2O zone requests and any corresponding subrequests.

* The possibility that the JA4 fingerprint could be missing.
* The possibility that the `ja4Signals` array could be missing (for example, if JA4 isn't available for the request).
* Results with `NaN` or `Infinity` values will be excluded from the array.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/additional-configurations/ja3-ja4-fingerprint/signals-intelligence/#page","headline":"Signals Intelligence · Cloudflare bot solutions docs","description":"View aggregate intelligence data for JA4 fingerprints across Cloudflare traffic.","url":"https://developers.cloudflare.com/bots/additional-configurations/ja3-ja4-fingerprint/signals-intelligence/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
