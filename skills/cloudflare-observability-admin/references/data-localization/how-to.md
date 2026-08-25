---
description: Configure Cloudflare products with Regional Services and Customer Metadata Boundary.
title: Configuration guides
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/data-localization/llms.txt
> Use this file to discover all available pages before exploring further.

# Configuration guides

Last updated Apr 30, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/data-localization/how-to/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Learn how to configure Cloudflare products with the Data Localization Suite, including Regional Services (which controls where traffic is decrypted and processed) and Customer Metadata Boundary (which controls where logs are stored).

* [Zero Trust](https://developers.cloudflare.com/data-localization/how-to/zero-trust/)
* [Pages](https://developers.cloudflare.com/data-localization/how-to/pages/)
* [Cache](https://developers.cloudflare.com/data-localization/how-to/cache/)
* [Load Balancing](https://developers.cloudflare.com/data-localization/how-to/load-balancing/)
* [Cloudflare for SaaS](https://developers.cloudflare.com/data-localization/how-to/cloudflare-for-saas/)
* [R2 Object Storage](https://developers.cloudflare.com/data-localization/how-to/r2/)
* [Durable Objects](https://developers.cloudflare.com/data-localization/how-to/durable-objects/)
* [Workers](https://developers.cloudflare.com/data-localization/how-to/workers/)

## Verify Regional Services behavior

In order to verify that Regional Services is working, customers can confirm the behavior by executing one of the following `curl` commands on a regionalized hostname:

```bash
curl -X GET -I https://<HOSTNAME>/ 2>&1 | grep cf-ray
```

```bash
curl -s https://<HOSTNAME>/cdn-cgi/trace | grep "colo="
```

The first command will return a three-letter IATA code (an airport identifier that corresponds to the nearest Cloudflare data center) in the [Cf-Ray](https://developers.cloudflare.com/fundamentals/reference/http-headers/#cf-ray) header, indicating the Cloudflare data center location of processing and/or TLS termination (traffic decryption). The second command will directly return the three-letter IATA code.

For example, when a hostname is configured to use the region European Union (EU), the three-letter IATA code will always return a data center inside of the EU.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/data-localization/how-to/#page","headline":"Configuration guides · Cloudflare Data Localization Suite docs","description":"Configure Cloudflare products with Regional Services and Customer Metadata Boundary.","url":"https://developers.cloudflare.com/data-localization/how-to/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
