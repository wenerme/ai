---
description: Learn how to minimize downtime while onboarding your domain onto Cloudflare.
title: Minimize downtime
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt
> Use this file to discover all available pages before exploring further.

# Minimize downtime

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/fundamentals/performance/minimize-downtime/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When making any change to the routing of an Internet application, there is always a possibility of downtime due to certificate issuance, misconfigured settings, or limitations at your origin server. To avoid downtime when going live, it is important to review the most common configurations.

## Update and review DNS records

Before activating your domain on Cloudflare (exact steps depend on your [DNS setup](https://developers.cloudflare.com/dns/zone-setups/)), review the DNS records in your Cloudflare account.

### Start with unproxied records

With a new domain, make sure all of your DNS records have a [proxy status](https://developers.cloudflare.com/dns/proxy-status/) of **DNS-only**.

This setting prevents Cloudflare from proxying your traffic before you have an active edge certificate or before you have allowed Cloudflare IP addresses.

### Confirm record accuracy

Take extra time to confirm the accuracy of your DNS records before activating your domain, paying special attention to:

* [Zone apex records (example.com)](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-zone-apex/)
* [Subdomain records (www.example.com or blog.example.com)](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-subdomain/)
* [Email records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/email-records/)

If you add DNS records to your authoritative DNS provider between onboarding your domain and activating your domain, you may need to also add these records within Cloudflare.

## Activate your domain

Finish the [DNS setup](https://developers.cloudflare.com/dns/zone-setups/) for your domain, moving the [domain status](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/) to **Active**:

* [Full setups](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/): Update the authoritative nameservers at your registrar and wait for that change to be authenticated.
* [Partial setups](https://developers.cloudflare.com/dns/zone-setups/partial-setup/setup/): Add the verification TXT record to your authoritative DNS and wait for that change to be authenticated.

## Verify SSL/TLS edge certificates

Before proxying your traffic through Cloudflare, [verify](https://developers.cloudflare.com/ssl/reference/certificate-statuses/#monitor-certificate-statuses) that Cloudflare has an active **Edge Certificate** for your domain.

For more details about timing and certificate recommendations, refer to [Certificate issuance](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/enable-universal-ssl/#full-dns-setup).

## Optional - Test configuration

You may want to test your configuration using your local machine or proxying traffic from a development domain or subdomain.

If you experience issues, you should make sure that you have [allowed Cloudflare IP addresses](https://developers.cloudflare.com/fundamentals/concepts/cloudflare-ip-addresses/) at your origin server.

## Update proxy status

Once you have verified that your SSL/TLS edge certificate is active and you have allowed Cloudflare IP addresses, change the [proxy status](https://developers.cloudflare.com/dns/proxy-status/) of appropriate DNS records to **Proxied**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/performance/minimize-downtime/#page","headline":"Minimize downtime · Cloudflare Fundamentals docs","description":"Learn how to minimize downtime while onboarding your domain onto Cloudflare.","url":"https://developers.cloudflare.com/fundamentals/performance/minimize-downtime/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
