---
description: Enable DNSSEC for your registered domain.
title: Enable DNSSEC
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/registrar/llms.txt
> Use this file to discover all available pages before exploring further.

# Enable DNSSEC

Last updated Apr 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/registrar/get-started/enable-dnssec/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The domain name system (DNS) translates domain names into numeric Internet addresses. However, DNS is a fundamentally insecure protocol. It does not guarantee where DNS records come from and accepts any requests given to it.

[DNSSEC](https://developers.cloudflare.com/dns/dnssec/) creates a secure layer to the domain name system by adding cryptographic signatures to DNS records. By doing so, your request can check the signature to verify that the record you need comes from the authoritative nameserver and was not altered along the way.

## Enable or disable DNSSEC

Cloudflare Registrar offers one-click DNSSEC activation for free to all customers:

1. In Cloudflare dashboard, go to the **Manage Domains** page.
[Go to **Manage domains** ↗](https://dash.cloudflare.com/?to=/:account/registrar/domains)
2. Find the domain that you want to activate DNSSEC and select **Manage**.
3. Select **Configuration** \> **Enable DNSSEC**. If DNSSEC was previously activated, select **Disable DNSSEC** to disable it.

Cloudflare publishes delegation signer (DS) records in the form of [CDS and CDNSKEY records ↗](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/) for a domain delegated to Cloudflare. Cloudflare Registrar scans those records at regular intervals, gathers those details and sends them to your domain's registry.

This process can take one to two days after you first enable DNSSEC.

Note

If your domain is not on Cloudflare Registrar, you can enable DNSSEC in [**DNS**](https://developers.cloudflare.com/dns/dnssec/) on the Cloudflare dashboard.

## Confirming DNSSEC

When DNSSEC has been successfully applied to your domain, Cloudflare shows you a confirmed status. Go to [**DNS** \> **Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings) in the Cloudflare dashboard, and scroll down to **DNSSEC**.

You can also confirm this by reviewing the [WHOIS information ↗](https://lookup.icann.org/) for your domain. Domains with DNSSEC will read `signedDelegation` in the DNSSEC field.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/registrar/get-started/enable-dnssec/#page","headline":"Domain Name System Security Extensions (DNSSEC) · Cloudflare Registrar docs","description":"Enable DNSSEC for your registered domain.","url":"https://developers.cloudflare.com/registrar/get-started/enable-dnssec/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
