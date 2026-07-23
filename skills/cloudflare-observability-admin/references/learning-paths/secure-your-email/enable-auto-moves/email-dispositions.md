---
description: Understand email threat disposition categories.
title: Email dispositions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Email dispositions

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/secure-your-email/enable-auto-moves/email-dispositions/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Email security returns five potential verdicts for every email it scans. Review the detections and consider how you would treat them once an auto-move is enabled. Below is an overview of the disposition and recommendation actions by Cloudflare:

| Disposition | Description                                                                                                                                                                                                                                                                                                                                                                                                                                   | Recommendation                                                             |  |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |  |
| MALICIOUS   | Traffic invoked multiple phishing verdict triggers, met thresholds for bad behavior, and is associated with active campaigns.                                                                                                                                                                                                                                                                                                                 | Block                                                                      |  |
| SUSPICIOUS  | Traffic associated with phishing campaigns (and is under further analysis by our automated systems).                                                                                                                                                                                                                                                                                                                                          | Research these messages internally to evaluate legitimacy.                 |  |
| SPOOF       | Traffic associated with phishing campaigns that is either non-compliant with your email authentication policies ([SPF ↗](https://www.cloudflare.com/en-gb/learning/dns/dns-records/dns-spf-record/), [DKIM ↗](https://www.cloudflare.com/en-gb/learning/dns/dns-records/dns-dkim-record/), [DMARC ↗](https://www.cloudflare.com/en-gb/learning/dns/dns-records/dns-dmarc-record/)), or have mismatching Envelope From and Header From values. | Block after investigating (can be triggered by third-party mail services). |  |
| SPAM        | Traffic associated with non-malicious, commercial campaigns.                                                                                                                                                                                                                                                                                                                                                                                  | Route to existing Spam quarantine folder.                                  |  |
| BULK        | Traffic associated with [Graymail ↗](https://en.wikipedia.org/wiki/Graymail), that falls in between the definitions of SPAM and SUSPICIOUS. For example, a marketing email that intentionally obscures its unsubscribe link.                                                                                                                                                                                                                  | Monitor or tag                                                             |  |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/secure-your-email/enable-auto-moves/email-dispositions/#page","headline":"Email dispositions · Cloudflare Learning Paths","description":"Understand email threat disposition categories.","url":"https://developers.cloudflare.com/learning-paths/secure-your-email/enable-auto-moves/email-dispositions/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
