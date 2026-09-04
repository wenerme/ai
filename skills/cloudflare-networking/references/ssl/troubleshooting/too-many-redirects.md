---
description: Learn how to troubleshoot ERR_TOO_MANY_REDIRECTS when using Cloudflare SSL/TLS.
title: ERR_TOO_MANY_REDIRECTS
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# ERR\_TOO\_MANY\_REDIRECTS

Last updated Sep 1, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ssl/troubleshooting/too-many-redirects/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

After you [add a new domain](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) to Cloudflare, your visitors' browsers might display `ERR_TOO_MANY_REDIRECTS` or `The page isn’t redirecting properly` errors.

This error occurs when visitors get stuck in a redirect loop.

flowchart LR
accTitle: Redirect loops illustration
A[Request for <code>http://</code><code>example.com</code>] --> B[Redirect to <code>https://</code><code>example.com</code>]
B --> C[Redirect to <code>http://</code><code>example.com</code>]
C --> B
subgraph Redirect Loop
B
C
end


This error is commonly caused by:

* A misconfiguration of your [SSL/TLS Encryption mode](#encryption-mode-misconfigurations).
* Various settings on the [**Edge Certificates**](#edge-certificate-settings) page.
* A misconfigured [redirect rule](#redirect-rules).

Note

For assistance determining if your origin web server is responding with redirects, contact your hosting provider or site administrator.

---

## Encryption mode misconfigurations

Your domain's [SSL/TLS Encryption mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/) controls how Cloudflare connects to your origin server and how SSL certificates presented by your origin will be validated.

This setting can cause redirect loops when the value you set in Cloudflare conflicts with the settings at your origin web server.

### Flexible encryption mode

If your domain's encryption mode is set to [**Flexible**](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/flexible/), Cloudflare sends unencrypted requests to your origin server over HTTP.

Redirect loops will occur if your origin server automatically redirects all HTTP requests to HTTPS.

flowchart TD
accTitle: Redirect loops illustration for Flexible mode
A[Request for <code>https://</code><code>example.com</code>] --> B[Encryption mode redirects to <code>http://</code><code>example.com</code>]
B --> C[Origin server redirects to <code>https://</code><code>example.com</code>]
C --> B
subgraph Cloudflare
B
end
subgraph Origin server
C
end


To solve this issue, either remove HTTPS redirects from your origin server or update your SSL/TLS Encryption Mode to be [**Full**](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full/) or higher (requires an SSL certificate configured at your origin server). To enforce HTTPS at the Cloudflare edge without setting up redirects at your origin, refer to [Enforce HTTPS connections](https://developers.cloudflare.com/ssl/edge-certificates/encrypt-visitor-traffic/).

### Full or Full (strict) encryption mode

If your domain's encryption mode is set to [**Full**](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full/) or [**Full (strict)**](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/), Cloudflare sends encrypted requests to your origin server over HTTPS.

Redirect loops will occur if your origin server automatically redirects all HTTPS requests to HTTP.

flowchart TD
accTitle: Redirect loops illustration for Full or Full (strict) mode
A[Request for <code>http://</code><code>example.com</code>] --> B[Encryption mode redirects to <code>https://</code><code>example.com</code>]
B --> C[Origin server redirects to <code>http://</code><code>example.com</code>]
C --> B
subgraph Cloudflare
B
end
subgraph Origin server
C
end


To solve this issue, remove HTTP redirects from your origin server.

---

## Edge certificate settings

### Always use HTTPS

If you have [**Always Use HTTPS**](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/) enabled for your domain, Cloudflare redirects all `http` requests to `https` for all subdomains and hosts in your application.

Redirect loops will occur if your origin server automatically redirects all HTTPS requests to HTTP.

flowchart TD
accTitle: Redirect loops illustration for Always Use HTTPS
A[Request for <code>http://</code><code>example.com</code>] --> B[Always Use HTTPS redirects to <code>https://</code><code>example.com</code>]
B --> C[Origin server redirects to <code>http://</code><code>example.com</code>]
C --> B
subgraph Cloudflare
B
end
subgraph Origin server
C
end


To solve this issue, remove HTTPS redirects from your origin server or [disable **Always Use HTTPS**](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/).

### HSTS

If you have [**HTTP Strict Transport Security (HSTS)**](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/http-strict-transport-security/) enabled for your domain, Cloudflare directs compliant web browsers to transform `http` links to `https` links.

Redirect loops will occur if your origin server automatically redirects all HTTPS requests to HTTP or if you have your domain's encryption mode set to [**Off**](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/off/).

flowchart TD
accTitle: Redirect loops illustration for HTTP Strict Transport Security
A[Request for <code>https://</code><code>example.com</code>] --> B[Encryption mode redirects to <code>http://</code><code>example.com</code>]
B --> C[HSTS redirects to <code>https://</code><code>example.com</code>]
C --> B
C --> D[Origin server redirects to <code>http://</code><code>example.com</code>]
D --> C
subgraph Cloudflare
B
C
end
subgraph Origin server
D
end


To solve this issue, remove HTTPS redirects from your origin server and make sure your domain's encryption mode is [**Flexible**](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/flexible/) or higher.

Alternatively, [disable **HTTP Strict Transport Security (HSTS)**](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/http-strict-transport-security/).

---

## Redirect rules

Redirect loops can also occur if you have conflicting URL redirects.

flowchart TD
accTitle: Redirect loops illustration for redirect rules
A[Request for <code>https://</code><code>a.example.com</code>] --> B[Redirect to <code>http://</code><code>b.example.com</code>]
B --> C[Redirect to <code>https://</code><code>a.example.com</code>]
C --> B
subgraph Cloudflare
B
C
end


To solve this issue, review your various [redirect rules](https://developers.cloudflare.com/rules/url-forwarding/) and [Page Rules](https://developers.cloudflare.com/rules/page-rules/) to make sure no rules are not in conflict with each other.

Note

To reduce the potential for redirect loops and [mixed content errors](https://developers.cloudflare.com/ssl/troubleshooting/mixed-content-errors/), Cloudflare recommends WordPress users to install the [Cloudflare WordPress plugin ↗](https://wordpress.org/plugins/cloudflare/) at their origin web server and enable the _Automatic HTTPS rewrites_ option within the plugin.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/troubleshooting/too-many-redirects/#page","headline":"ERR_TOO_MANY_REDIRECTS · Cloudflare SSL/TLS docs","description":"Learn how to troubleshoot ERR_TOO_MANY_REDIRECTS when using Cloudflare SSL/TLS.","url":"https://developers.cloudflare.com/ssl/troubleshooting/too-many-redirects/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
