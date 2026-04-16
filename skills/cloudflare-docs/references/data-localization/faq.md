---
title: FAQs
description: Answers to common questions about the Data Localization Suite and GDPR compliance.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/data-localization/faq.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# FAQs

## Are DLP and DLS the same?

No, they are not. DLP stands for [Data Loss Prevention](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/), and it is part of Cloudflare’s Zero Trust offering (requiring Gateway). It allows customers to scan web traffic and SaaS apps for sensitive data like secret keys, financial information (credit card numbers), and other keywords.

[Data Localization Suite](https://developers.cloudflare.com/data-localization/) (DLS) is a suite of features that can provide localization and data residency features.

## Are Cloudflare’s services GDPR compliant?

Yes, even without DLS, Cloudflare services are designed to satisfy the GDPR’s requirements. Cloudflare services are also verified compliant with the EU Cloud CoC, Verification-ID: 2023LVL02SCOPE4316\. For further information, visit EU Cloud CoC [public register ↗](https://eucoc.cloud/en/public-register).

## How can I use DLS?

Once you have purchased DLS, the post-sales team will entitle DLS for you, and you will be able to configure all features by yourself via dashboard or API. You can find more specific information under the [Configuration guides](https://developers.cloudflare.com/data-localization/how-to/) section.

## Does Regional Services work with HTTP/3 / QUIC?

Not yet.

## Are there other options if I prefer not to have Cloudflare handle TLS termination (decryption)?

Yes, you have these options available:

* [Spectrum TCP/UDP Apps](https://developers.cloudflare.com/spectrum/) (without TLS Termination)
* [Magic Transit](https://developers.cloudflare.com/magic-transit/)
* [Privacy Gateway](https://developers.cloudflare.com/privacy-gateway/)

These options only offer L3/L4 DDoS protection and using them imply that no application / L7 security or performance services can be applied.

## I have configured [Customer Metadata Boundary](https://developers.cloudflare.com/data-localization/metadata-boundary/) for EU region, I'm accessing the Cloudflare Dashboard from Europe, why am I getting an error `Data not available due to your account's Customer Metadata Boundary configuration`?

Based on Internet conditions that vary over time, users may be dynamically steered to a data center that is physically further away. This can be based on a variety of factors, including latency and network congestion. [Out of region access](https://developers.cloudflare.com/data-localization/metadata-boundary/out-of-region-access/) allows requests arriving in the United States to pull Customer Logs from the European Union and vice-versa. The analytics are still exclusively stored in the CMB configured region.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/data-localization/","name":"Data Localization Suite"}},{"@type":"ListItem","position":3,"item":{"@id":"/data-localization/faq/","name":"FAQs"}}]}
```
