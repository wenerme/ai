---
title: Email dispositions
description: Email security returns five potential verdicts for every email it scans. Review the detections and consider how you would treat them once an auto-move is enabled. Below is an overview of the disposition and recommendation actions by Cloudflare:
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/learning-paths/secure-your-email/enable-auto-moves/email-dispositions.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Email dispositions

Email security returns five potential verdicts for every email it scans. Review the detections and consider how you would treat them once an auto-move is enabled. Below is an overview of the disposition and recommendation actions by Cloudflare:

| Disposition | Description                                                                                                                                                                                                                                                                                                                                                                                                                                   | Recommendation                                                             |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| MALICIOUS   | Traffic invoked multiple phishing verdict triggers, met thresholds for bad behavior, and is associated with active campaigns.                                                                                                                                                                                                                                                                                                                 | Block                                                                      |
| SUSPICIOUS  | Traffic associated with phishing campaigns (and is under further analysis by our automated systems).                                                                                                                                                                                                                                                                                                                                          | Research these messages internally to evaluate legitimacy.                 |
| SPOOF       | Traffic associated with phishing campaigns that is either non-compliant with your email authentication policies ([SPF ↗](https://www.cloudflare.com/en-gb/learning/dns/dns-records/dns-spf-record/), [DKIM ↗](https://www.cloudflare.com/en-gb/learning/dns/dns-records/dns-dkim-record/), [DMARC ↗](https://www.cloudflare.com/en-gb/learning/dns/dns-records/dns-dmarc-record/)), or have mismatching Envelope From and Header From values. | Block after investigating (can be triggered by third-party mail services). |
| SPAM        | Traffic associated with non-malicious, commercial campaigns.                                                                                                                                                                                                                                                                                                                                                                                  | Route to existing Spam quarantine folder.                                  |
| BULK        | Traffic associated with [Graymail ↗](https://en.wikipedia.org/wiki/Graymail), that falls in between the definitions of SPAM and SUSPICIOUS. For example, a marketing email that intentionally obscures its unsubscribe link.                                                                                                                                                                                                                  | Monitor or tag                                                             |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-your-email/enable-auto-moves/","name":"Enable auto-moves"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-your-email/enable-auto-moves/email-dispositions/","name":"Email dispositions"}}]}
```
