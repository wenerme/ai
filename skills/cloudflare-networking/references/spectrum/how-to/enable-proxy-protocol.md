---
description: Pass client IP information to your origin using Proxy protocol v1 or Simple Proxy Protocol.
title: Enable Proxy protocol
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/spectrum/llms.txt
> Use this file to discover all available pages before exploring further.

# Enable Proxy protocol

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/spectrum/how-to/enable-proxy-protocol/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Because Cloudflare intercepts packets before forwarding them to your server, if you were to look up the client IP, you would see Cloudflare's IP rather than the true client IP.

Some services you run may require knowledge of the true client IP. In those cases, you can use a proxy protocol for Cloudflare to pass on the client IP to your service. Sending proxy information along is dependent on whether TCP or UDP is used. For TCP, Spectrum supports adding [Proxy Protocol v1 ↗](https://www.haproxy.org/download/1.8/doc/proxy-protocol.txt), which is the human readable version supported by Amazon ELB and [NGINX ↗](https://docs.nginx.com/nginx/admin-guide/load-balancer/using-proxy-protocol/). For UDP applications, Cloudflare has developed a custom proxy protocol called Simple Proxy Protocol. Be aware that Proxy Protocol is not supported for Spectrum egresses to Cloudflare WAN (formerly Magic WAN).

Note

This feature requires an Enterprise plan. If you would like to upgrade, contact your account team.

## Enable Proxy Protocol v1 for TCP

1. In the Cloudflare dashboard, go to the **Spectrum** page.
[Go to **Spectrum** ↗](https://dash.cloudflare.com/?to=/:account/:zone/spectrum)
2. Locate the application that will use the PROXY protocol and select **Configure**.
3. From the dropdown, select **PROXY Protocol v1**.

When TCP applications are configured to use **PROXY Protocol v1**, Cloudflare will prepend each inbound TCP connection with the PROXY Protocol plain-text header.

### The Proxy Protocol v1 Header

PROXY Protocol prepends every connection with a header reporting the client IP address and port. A PROXY Protocol plain-text header has the format:

```plaintext
PROXY_STRING + single space + INET_PROTOCOL + single space + CLIENT_IP + single space + PROXY_IP + single space + CLIENT_PORT + single space + PROXY_PORT + "\r\n"
```

An example PROXY Protocol line for an IPv4 address would look like:

```plaintext
PROXY TCP4 192.0.2.0 192.0.2.255 42300 443\r\n
```

An example PROXY Protocol line for an IPv6 address would look like:

```plaintext
PROXY TCP6 2001:db8:: 2001:db8:ffff:ffff:ffff:ffff:ffff:ffff 42300 443\r\n
```

## Enable Proxy Protocol v2 for TCP/UDP

1. In the Cloudflare dashboard, go to the **Spectrum** page.
[Go to **Spectrum** ↗](https://dash.cloudflare.com/?to=/:account/:zone/spectrum)
2. Locate the application that will use the PROXY protocol and select **Configure**.
3. From the dropdown, select **PROXY Protocol v2**.

When TCP applications are configured to use **PROXY Protocol v2**, Cloudflare will prepend each inbound TCP connection with the PROXY Protocol binary header.

When UDP applications are configured to use **PROXY Protocol v2**, Cloudflare will prepend the first UDP datagram on a stream with a PROXY Protocol binary header.

### The Proxy Protocol v2 Header

PROXY Protocol prepends every connection with a header reporting the client IP address and port.

A PROXY Protocol binary header for a IPv4 incoming address has the format:

```txt
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
+                                                               +
|                  Proxy Protocol v2 Signature                  |
+                                                               +
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Version|Command|   AF  | Proto.|         Address Length        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                      IPv4 Source Address                      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    IPv4 Destination Address                   |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |        Destination Port       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

A PROXY Protocol binary header for a IPv6 incoming address has the format:

```txt
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
+                                                               +
|                  Proxy Protocol v2 Signature                  |
+                                                               +
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Version|Command|   AF  | Proto.|         Address Length        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
+                                                               +
|                                                               |
+                      IPv6 Source Address                      +
|                                                               |
+                                                               +
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
+                                                               +
|                                                               |
+                    IPv6 Destination Address                   +
|                                                               |
+                                                               +
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |        Destination Port       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

## Enable Simple Proxy Protocol for UDP

When using Spectrum for UDP, the client source IP and port information can be obtained by using Simple Proxy Protocol, a lightweight protocol developed specifically for UDP.

To enable it, select **Configure** on a Spectrum application and toggle the setting for Simple Proxy Protocol to **On**.

Simple Proxy Protocol dictates that your origin must also prepend packets meant for the client with the same header, including original client source information. This is done to validate that packets coming in are in fact intended for the client.

For more information about Simple Proxy Protocol headers, refer to [Simple Proxy Protocol headers](https://developers.cloudflare.com/spectrum/reference/simple-proxy-protocol-header/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/spectrum/how-to/enable-proxy-protocol/#page","headline":"Enable Proxy protocol · Cloudflare Spectrum docs","description":"Pass client IP information to your origin using Proxy protocol v1 or Simple Proxy Protocol.","url":"https://developers.cloudflare.com/spectrum/how-to/enable-proxy-protocol/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
