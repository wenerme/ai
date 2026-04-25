---
title: Plans
description: Compare Waiting Room features available on each Cloudflare plan.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Plans

The features available for a waiting room depend on your plan type. You can only have **one plan** per zone.

One basic waiting room is included in all Business and Enterprise plans. On an Enterprise plan, you can purchase advanced waiting room(s) to unlock all of the additional advanced features.

| Free                                   | Pro | Business | Enterprise                |                                                                                       |
| -------------------------------------- | --- | -------- | ------------------------- | ------------------------------------------------------------------------------------- |
| Availability                           | No  | No       | Yes                       | Yes                                                                                   |
| Number of rooms                        | 0   | 0        | 1                         | 1 (default) _With advanced:_Custom (can purchase more)                                |
| Customized templates                   | No  | No       | No                        | Advanced add-on                                                                       |
| Queueing methods                       | No  | No       | First In First Out (FIFO) | First In First Out (FIFO) (default) _With advanced:_FIFO, Random, Reject, Passthrough |
| Configure multiple hostnames and paths | No  | No       | No                        | Advanced add-on                                                                       |
| Disable session renewal                | No  | No       | No                        | Advanced add-on                                                                       |
| JSON-friendly response                 | No  | No       | No                        | Advanced add-on                                                                       |
| Customize queuing status code          | No  | No       | Yes                       | Yes                                                                                   |
| Scheduled events                       | No  | No       | No                        | Advanced add-on                                                                       |
| Waiting Room rules                     | No  | No       | No                        | Advanced add-on                                                                       |
| Session Revocation                     | No  | No       | No                        | Advanced add-on                                                                       |
| SEO Crawler Bypassing                  | No  | No       | Yes                       | Yes                                                                                   |
| Turnstile Widget Mode                  | No  | No       | Invisible only            | Invisible (default) _With advanced:_Invisible, Managed, Non Interactive               |
| Turnstile Fail Action                  | No  | No       | Log only                  | Log only (default) _With advanced:_Log only & Infinite queue                          |

Note

Enterprise customers can preview this product as a [non-contract service](https://developers.cloudflare.com/billing/understand/preview-services/), which provides full access, free of metered usage fees, limits, and certain other restrictions.

## How do I get started?

To get started with Waiting Room, review our [setup guide](https://developers.cloudflare.com/waiting-room/get-started/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waiting-room/","name":"Waiting Room"}},{"@type":"ListItem","position":3,"item":{"@id":"/waiting-room/plans/","name":"Plans"}}]}
```
