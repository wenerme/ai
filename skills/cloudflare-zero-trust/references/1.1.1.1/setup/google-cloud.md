---
description: Configure 1.1.1.1 on Google Cloud instances.
title: Google Cloud
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/1.1.1.1/llms.txt
> Use this file to discover all available pages before exploring further.

# Google Cloud

Last updated May 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/1.1.1.1/setup/google-cloud/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Google Cloud lets you configure custom DNS servers at the Virtual Private Cloud (VPC) network level using [outbound server policies ↗](https://cloud.google.com/dns/docs/server-policies-overview#dns-server-policy-out) in Cloud DNS. When you create an outbound server policy, all resources in that VPC network — including existing virtual machines — use the specified DNS servers.

Note

If you are using [Cloudflare Zero Trust](https://developers.cloudflare.com/cloudflare-one/), you can assign [locations](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/) to apply custom [DNS policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/) via Gateway.

To configure 1.1.1.1 for your Google Cloud VPC network:

1. Open the [Google Cloud Console ↗](https://console.cloud.google.com).
2. Go to **Network Services** \> **Cloud DNS** and select [**DNS Server Policies** ↗](https://console.cloud.google.com/net-services/dns/policies).
3. Select **Create Policy**.
4. Enter a name for your policy (for example, `cloudflare-1-1-1-1`) and select the VPC networks to apply it to.
5. Under **Alternate DNS servers**, select **Add Item** and enter:
```txt
1.1.1.1
1.0.0.1
```
6. Select **Create**.

DNS requests within the configured VPC networks will now use 1.1.1.1.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/1.1.1.1/setup/google-cloud/#page","headline":"Set up 1.1.1.1 on Google Cloud · Cloudflare 1.1.1.1 docs","description":"Configure 1.1.1.1 on Google Cloud instances.","url":"https://developers.cloudflare.com/1.1.1.1/setup/google-cloud/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["GCP"]}
```
