---
title: FAQs
description: Answers to common questions about the Data Localization Suite and GDPR compliance.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/data-localization/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ Compliance ](https://developers.cloudflare.com/search/?tags=Compliance) 

# FAQs

## Are DLP and DLS the same?

No, they are not. DLP stands for [Data Loss Prevention](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/), and it is part of Cloudflare's Zero Trust offering (requiring Gateway, Cloudflare's secure web gateway for filtering outbound internet traffic). DLP allows you to scan web traffic and SaaS applications for sensitive data like secret keys, financial information (credit card numbers), and other keywords.

[Data Localization Suite](https://developers.cloudflare.com/data-localization/) (DLS) is a separate suite of features that allows you to control where your data is processed and stored to meet data residency requirements.

## Are Cloudflare's services GDPR compliant?

Yes, even without DLS, Cloudflare services are designed to satisfy the requirements of the GDPR (General Data Protection Regulation). Cloudflare services are also verified compliant with the EU Cloud Code of Conduct (EU Cloud CoC), Verification-ID: 2023LVL02SCOPE4316\. For further information, visit EU Cloud CoC [public register ↗](https://eucoc.cloud/en/public-register).

## How can I use DLS?

Once you have purchased DLS, your account team will enable DLS on your account, and you will be able to configure all features via the dashboard or API. You can find more specific information under the [Configuration guides](https://developers.cloudflare.com/data-localization/how-to/) section.

## Does Regional Services work with HTTP/3 / QUIC?

Not yet. HTTP/3 uses the QUIC transport protocol, which is not currently compatible with Regional Services.

## Are there other options if I prefer not to have Cloudflare handle TLS termination (decryption)?

Yes, you have these options available:

* [Spectrum TCP/UDP Apps](https://developers.cloudflare.com/spectrum/) (without TLS termination)
* [Magic Transit](https://developers.cloudflare.com/magic-transit/)
* [Privacy Gateway](https://developers.cloudflare.com/privacy-gateway/)

These options only offer L3/L4 DDoS protection (network-layer and transport-layer protections). Using them means that no application-layer (L7) security or performance services can be applied, because Cloudflare does not decrypt the traffic.

## I have configured [Customer Metadata Boundary](https://developers.cloudflare.com/data-localization/metadata-boundary/) for EU region, I am accessing the Cloudflare Dashboard from Europe, why am I getting an error `Data not available due to your account's Customer Metadata Boundary configuration`?

This is typically caused by dynamic network routing. Based on Internet conditions that vary over time, your connection may be routed to a data center that is physically outside your configured region. This can be based on a variety of factors, including latency and network congestion. Enabling [Out of region access](https://developers.cloudflare.com/data-localization/metadata-boundary/out-of-region-access/) allows requests arriving in the United States to pull Customer Logs from the European Union and vice-versa. The analytics are still exclusively stored in the CMB configured region.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/data-localization/","name":"Data Localization Suite"}},{"@type":"ListItem","position":3,"item":{"@id":"/data-localization/faq/","name":"FAQs"}}]}
```
