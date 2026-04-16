---
title: Bot Management skips
description: Understand why Bot Management does not score certain requests.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/bots/troubleshooting/bot-management-skips.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Bot Management skips

There are instances in which Bot Management does not run and certain fields, such as the [JA3/JA4 field](https://developers.cloudflare.com/bots/additional-configurations/ja3-ja4-fingerprint/), are not populated because it has been determined that running Bot Management would not be necessary.

Refer to [bot scores](https://developers.cloudflare.com/bots/concepts/bot-score/#not-computed) for more information about why a request is not scored.

## Common reasons for Bot Management to not score a request

### Requests to internal endpoints

Requests such as `/cdn-cgi/` are handled individually and will never receive a Bot Management score. Email Obfuscation, Web Analytics, Trace Requests, Challenge Pages, and JavaScript Detections do not receive bot scores. Refer to the table below for some examples of internal endpoints.

| Route                                                           |
| --------------------------------------------------------------- |
| /cdn-cgi/rum                                                    |
| /cdn-cgi/script\_monitor/report                                 |
| /cdn-cgi/trace                                                  |
| /cdn-cgi/challenge-platform/…                                   |
| /cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js |

### Purge requests

All HTTP purge requests will not receive a bot score.

### Early hints cache requests

Early hints cache requests will not receive a bot score.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/bots/troubleshooting/bot-management-skips/","name":"Bot Management skips"}}]}
```
