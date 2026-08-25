---
description: Supported origin rule features and their availability by plan.
title: Origin Rules settings
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Origin Rules settings

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/origin-rules/features/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The following sections describe the available settings in Origin Rules.

## Host header

Allows you to rewrite the HTTP `Host` header of incoming requests. The `Host` header tells the destination server which website or application the request is intended for.

A common use case for this functionality is when your content is hosted on a third-party server that only accepts `Host` headers with their own server names. In this situation, you must update the `Host` HTTP header in incoming requests from `Host: example.com` to `Host: thirdpartyserver.example.net`.

Notes

* In most situations, when you rewrite the HTTP `Host` header you also need to configure a [DNS record override](#dns-record). The `Host` header override only updates the header value; the DNS record override will handle the rerouting of the request.
* An origin rule performing a `Host` header override will also update the Server Name Indication (SNI) value of the original request to the same value. To set an SNI value different from the `Host` header value, add an [SNI override](#server-name-indication-sni) in the same origin rule or create a separate origin rule for this purpose.
* If you have configured load balancing through Cloudflare and you wish to override the HTTP `Host` header per origin or for a given monitor, refer to [Override HTTP Host headers](https://developers.cloudflare.com/load-balancing/additional-options/override-http-host-headers/) in the Load Balancing documentation for more information.
* When an origin rule is configured to override the `Host` header for a request handled by a [Worker](https://developers.cloudflare.com/workers/), this override is not taken into account when evaluating [Workers routes](https://developers.cloudflare.com/workers/configuration/routing/routes/).

## Server Name Indication (SNI)

Allows you to override the Server Name Indication (SNI) [1](#user-content-fn-1) value of a request. For more information, refer to [What is SNI (Server Name Indication)? ↗](https://www.cloudflare.com/learning/ssl/what-is-sni/) in the Learning Center.

Notes

* The new SNI value must be a valid hostname on the same Cloudflare account (possibly on a different zone).
* Currently, you can only use a static value when overriding SNI.
* An SNI override will take precedence over [SNI rewrites of custom origins](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/custom-origin/#sni-rewrites) when using Cloudflare for SaaS.

## DNS record

Allows you to override the resolved hostname of incoming requests, which controls which origin server Cloudflare sends the request to. This functionality is also known as resolve override.

A common use case is when you are serving an application from a specific path (for example, `mydomain.com/app`). In this case, the `app` may be hosted on a different server or by a third party. A DNS record override allows you to redirect requests to this endpoint to the server for that third-party application.

Note

* You must specify a valid hostname in a DNS record override that is a hostname on the same Cloudflare account (possibly on a different zone). You can [configure a DNS record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records#create-dns-records) (a `CNAME`, `A`, or `AAAA` record) with a hostname pointing to a third-party hostname/IP address, either proxied by Cloudflare or not.
* In most situations, when you configure a DNS record override you also need to configure a [Host header override](#host-header). The DNS record override handles the rerouting of the request; the `Host` header override updates the `Host` HTTP header value in the request. Defining a `Host` header override will also update the Server Name Indication (SNI) value of the original request to the same value. To set an SNI value different from the `Host` header value, add an [SNI override](#server-name-indication-sni) in the same origin rule or create a separate origin rule for this purpose.

The following example DNS records configure a `resolve.example.com` hostname pointing to an external hostname and IP address using a `CNAME` record and an `A` record, respectively:

**Example `CNAME` record**

* **Type:** _CNAME_
* **Name:** `resolve.example.com`
* **Target:** `domain.s3.amazonaws.com`
* **TTL:** `Auto`
* **Proxy status:** _Proxied_ (orange cloud icon)

**Example `A` record**

* **Type:** _A_
* **Name:** `resolve.example.com`
* **IPv4 address:** `203.0.113.1`
* **TTL:** `Auto`
* **Proxy status:** _Proxied_ (orange cloud icon)

## Destination port

Allows you to override the destination port of a request.

When you configure a destination port override, you can redirect incoming requests to a different port. For example, you could override the destination port for requests received for `mydomain.com` so that they are served by the application running on port 9000 (`mydomain.com:9000`).

The destination port must be between 1 and 65,535.

## Footnotes

1. SNI allows a server to host multiple TLS Certificates for multiple websites using a single IP address. SNI adds the website hostname in the TLS handshake to inform the server which website to present when using shared IPs. [↩](#user-content-fnref-1)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/origin-rules/features/#page","headline":"Origin Rules settings · Cloudflare Rules docs","description":"Supported origin rule features and their availability by plan.","url":"https://developers.cloudflare.com/rules/origin-rules/features/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Headers","TLS"]}
```
