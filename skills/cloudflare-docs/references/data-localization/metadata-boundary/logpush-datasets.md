---
title: Logpush datasets
description: The table below lists the Logpush datasets that support zones or accounts with Customer Metadata Boundary (CMB) enabled. The column Respects CMB indicates whether enabling CMB impacts the dataset (yes/no). The last two columns inform you if CMB is available with US and EU.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/data-localization/metadata-boundary/logpush-datasets.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Logpush datasets

The table below lists the [Logpush datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/) that support zones or accounts with Customer Metadata Boundary (CMB) enabled. The column **Respects CMB** indicates whether enabling CMB impacts the dataset (yes/no). The last two columns inform you if CMB is available with US and EU.

Be aware that if you enable CMB for a dataset that does not support your region, no data will be pushed to your destination.

| Dataset name                                | Level   | Respects CMB               | Available with US CMB region | Available with EU CMB region |
| ------------------------------------------- | ------- | -------------------------- | ---------------------------- | ---------------------------- |
| Access Requests                             | Account | ✅                          | ✅                            | ✅                            |
| AI Gateway Events                           | Account | ✅                          | ✅                            | ✅                            |
| Audit Logs                                  | Account | ✘                          | ✅                            | ✘                            |
| Browser Isolation User Actions              | Account | ✅                          | ✅                            | ✅                            |
| CASB Findings                               | Account | ✘                          | ✅                            | ✘                            |
| Client-side security (formerly Page Shield) | Zone    | ✅                          | ✅                            | ✅                            |
| DEX Application Tests                       | Account | ✅                          | ✘                            | ✅                            |
| DEX Device State Events                     | Account | ✅                          | ✘                            | ✅                            |
| Device Posture Results                      | Account | ✘                          | ✅                            | ✘                            |
| DLP Forensic Copies                         | Account | N/A[1](#user-content-fn-1) | ✘                            | ✘                            |
| DNS Firewall logs                           | Account | ✅                          | ✅                            | ✅                            |
| DNS logs                                    | Zone    | ✅                          | ✅                            | ✅                            |
| Email security Alerts                       | Account | ✅                          | ✅                            | ✅                            |
| Firewall events                             | Zone    | ✅                          | ✅                            | ✅                            |
| Gateway DNS                                 | Account | ✅                          | ✅                            | ✅                            |
| Gateway HTTP                                | Account | ✅                          | ✅                            | ✅                            |
| Gateway Network                             | Account | ✅                          | ✅                            | ✅                            |
| HTTP requests                               | Zone    | ✅                          | ✅                            | ✅                            |
| IPSec Logs                                  | Account | ✅                          | ✅                            | ✅                            |
| Magic IDS Detections                        | Account | ✅                          | ✅                            | ✅                            |
| NEL reports                                 | Zone    | ✘                          | ✅                            | ✘                            |
| Network Analytics Logs                      | Account | ✅                          | ✅                            | ✅                            |
| Sinkhole Events                             | Account | ✅                          | ✅                            | ✅                            |
| Spectrum events                             | Zone    | ✅                          | ✅                            | ✅                            |
| WARP Config Changes                         | Account | ✅                          | ✘                            | ✅                            |
| WARP Toggle Changes                         | Account | ✅                          | ✘                            | ✅                            |
| Workers Trace Events                        | Account | ✅                          | ✅                            | ✅                            |
| Zaraz Events                                | Zone    | ✅                          | ✅                            | ✅                            |
| Zero Trust Sessions                         | Account | ✅                          | ✅                            | ✅                            |

## Footnotes

1. Customer Metadata Boundary does not apply in this case, as these logs are sent directly from the processing location to your configured destination. [↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/data-localization/","name":"Data Localization Suite"}},{"@type":"ListItem","position":3,"item":{"@id":"/data-localization/metadata-boundary/","name":"Customer Metadata Boundary"}},{"@type":"ListItem","position":4,"item":{"@id":"/data-localization/metadata-boundary/logpush-datasets/","name":"Logpush datasets"}}]}
```
