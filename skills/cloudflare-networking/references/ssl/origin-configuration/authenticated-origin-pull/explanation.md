---
description: How Authenticated Origin Pulls use mTLS to verify Cloudflare connections.
title: About
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# About

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/explanation/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Simple explanation

When visitors request content from your domain, Cloudflare first attempts to serve content from the cache. If this attempt fails, Cloudflare sends a request — or an `origin pull` — back to your origin web server to get the content.

Authenticated Origin Pulls makes sure that all of these `origin pulls` come from Cloudflare. Put another way, Authenticated Origin Pulls ensures that any HTTPS requests outside of Cloudflare will not receive a response from your origin.

This block also applies for requests to [unproxied DNS records](https://developers.cloudflare.com/dns/proxy-status/#dns-only-records) in Cloudflare.

Caution

The Cloudflare-provided certificate used by [global AOP](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/global/) is not exclusive to your account. It only guarantees that a request is coming from the Cloudflare network.

For stricter security, set up [zone-level](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/zone-level/) or [per-hostname](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/) AOP with your own certificate and consider [other security measures for your origin](https://developers.cloudflare.com/fundamentals/security/protect-your-origin-server/).

## Detailed explanation

Cloudflare enforces authenticated origin pulls by adding an extra layer of TLS client certificate authentication when establishing a connection between Cloudflare and the origin web server.

For more details, refer to the [introductory blog post ↗](https://blog.cloudflare.com/protecting-the-origin-with-tls-authenticated-origin-pulls/).

---

### Types of handshakes

For more details, refer to [What is a TLS handshake? ↗](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/).

**Standard TLS handshake**

![Diagram showing the Standard TLS handshake](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=900,height=1058,format=webp/_astro/client-auth-tls-standard.DZBqll1L.png)

**Client authenticated TLS handshake**

![Diagram showing the client authenticated TLS handshake](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=900,height=1256,format=webp/_astro/client-auth-tls-handshake.B9OeA94c.png)

### Comparison diagrams

Without Authenticated Origin Pulls, Cloudflare performs standard TLS handshakes between a client device and Cloudflare and Cloudflare and your origin. This is true even if you have [**Full**](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full/) or [**Full (strict)**](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/) encryption modes enabled.

    flowchart TD
      accTitle: Connection diagram without Authenticated Origin Pulls
      A[End user query for <code>example.com</code>] --Standard TLS Handshake--> B[Cloudflare network]
      B --Standard TLS Handshake--> C[Origin server]
      D[External device] --Standard TLS Handshake ----> C


This lack of authentication means that - even if your origin is [protected behind Cloudflare](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/) \- attackers with your origin's IP address will still receive a response from your origin for HTTPS requests.

With Authenticated Origin Pulls, Cloudflare performs standard TLS handshakes between a client device and Cloudflare, but a client-authenticated TLS handshake between Cloudflare and your origin.

    flowchart TD
      accTitle: Connection diagram with Authenticated Origin Pulls
      A[End user query for <code>example.com</code>] --Standard TLS Handshake--> B[Cloudflare network]
      B --Client authenticated TLS Handshake--> C[Origin server]
      D[External device] --Standard TLS Handshake -----x C


This additional layer of authentication ensures that any HTTPS requests outside of Cloudflare will not receive a response from your origin.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/explanation/#page","headline":"How Authenticated Origin Pulls works · Cloudflare SSL/TLS docs","description":"How Authenticated Origin Pulls use mTLS to verify Cloudflare connections.","url":"https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/explanation/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["mTLS"]}
```
