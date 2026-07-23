---
description: Format of the Simple Proxy Protocol header prepended to UDP datagrams.
title: Simple Proxy Protocol Header
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/spectrum/llms.txt
> Use this file to discover all available pages before exploring further.

# Simple Proxy Protocol Header

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/spectrum/reference/simple-proxy-protocol-header/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The client source IP and port is encoded in a fixed-length, 38-octet long header and prepended to the payload of each proxied UDP datagram in the format described below.

```txt
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Magic Number         |                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+                               +
|                                                               |
+                                                               +
|                                                               |
+                         Client Address                        +
|                                                               |
+                               +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                               |                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+                               +
|                                                               |
+                                                               +
|                                                               |
+                         Proxy Address                         +
|                                                               |
+                               +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                               |         Client Port           |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|           Proxy Port          |          Payload...           |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

The contents of the header are below.

## Magic Number

16-bit fixed value set to 0x56EC for SPP. This field should be used to identify the SPP protocol and its SPP 38-byte header.

## Client Address

128-bit address of the originator of the proxied UDP datagram, that is, the client. An IPv6 address if the client used IPv6 addressing, or an IPv4-mapped IPv6 address (refer to [RFC 4291 ↗](https://tools.ietf.org/html/rfc4291)) in case of an IPv4 client.

## Proxy address

128-bit address of the recipient of the proxied UDP datagram, that is the proxy. Contents should be interpreted in the same way as the Client Address.

## Client port

16-bit source port number of the proxied UDP datagram. In other words, the UDP port number from which the client sent the datagram.

## Proxy port

16-bit destination port number of the proxied UDP datagram. In other words, the UDP port number on which the proxy received the datagram.

## Payload

Data following the header carried by the datagram. Magic number, addresses, and port numbers are encoded in network byte order.

A corresponding C structure describing the header is:

```c
struct {
    uint16_t magic;
    uint8_t  client_addr[16];
    uint8_t  proxy_addr[16];
    uint16_t client_port;
    uint16_t proxy_port;
};
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/spectrum/reference/simple-proxy-protocol-header/#page","headline":"Simple Proxy Protocol Header · Cloudflare Spectrum docs","description":"Format of the Simple Proxy Protocol header prepended to UDP datagrams.","url":"https://developers.cloudflare.com/spectrum/reference/simple-proxy-protocol-header/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["UDP"]}
```
