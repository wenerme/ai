---
title: Scan limits
description: Limits
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/security-center/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Scan limits

URL scans are limited by search history, Public and Unlisted visibility, and requests per second across different Cloudflare plans.

| Cloudflare Plan    | Search history | Public scans (per month) | Unlisted scans (per month) | Rate limit       |
| ------------------ | -------------- | ------------------------ | -------------------------- | ---------------- |
| **Free / Radar**   | last 50 scans  | 5,000                    | none                       | 1 per 10 seconds |
| **Self serve**     | 30 days        | 5,000                    | 500                        | 1 per 10 seconds |
| **Enterprise**     | 12 months      | 10,000                   | 5,000                      | 12 per second    |
| **Cloudforce One** | Unlimited      | 75,000                   | 20,000                     | 12 per second    |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/security-center/","name":"Security Center"}},{"@type":"ListItem","position":3,"item":{"@id":"/security-center/investigate/","name":"Investigate"}},{"@type":"ListItem","position":4,"item":{"@id":"/security-center/investigate/scan-limits/","name":"Scan limits"}}]}
```
