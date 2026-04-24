---
title: Pricing
description: Cloudflare Realtime SFU and TURN pricing, free tier details, and billing information.
image: https://developers.cloudflare.com/dev-products-preview.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/sfu/pricing.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Pricing

Cloudflare Realtime billing is based on data sent from Cloudflare edge to your application.

Cloudflare Realtime SFU and TURN services cost $0.05 per GB of data egress.

There is a free tier of 1,000 GB before any charges start. This free tier includes usage from both SFU and TURN services, not two independent free tiers. Cloudflare Realtime billing appears as a single line item on your Cloudflare bill, covering both SFU and TURN.

Traffic between Cloudflare Realtime TURN and Cloudflare Realtime SFU or Cloudflare Stream (WHIP/WHEP) does not get double charged, so if you are using both SFU and TURN at the same time, you will get charged for only one.

### TURN

Please see the [TURN FAQ page](https://developers.cloudflare.com/realtime/turn/faq), where there is additional information on specifically which traffic path from RFC8656 is measured and counts towards billing.

### SFU

Only traffic originating from Cloudflare towards clients incurs charges. Traffic pushed to Cloudflare incurs no charge even if there is no client pulling same traffic from Cloudflare.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/sfu/","name":"Realtime SFU"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/sfu/pricing/","name":"Pricing"}}]}
```
