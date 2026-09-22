---
description: The descriptions below detail the fields available for spectrum_events.
title: Spectrum events
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

# Spectrum events

Last updated Sep 14, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/spectrum_events/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The descriptions below detail the fields available for `spectrum_events`.

## Application

Type: `string`

The unique public ID of the application on which the event occurred.

## ClientAsn

Type: `int`

Client AS number.

## ClientBytes

Type: `int`

The number of bytes read from the client by the Spectrum service.

## ClientCountry

Type: `string`

Country of the client IP address.

## ClientIP

Type: `string`

Client IP address.

## ClientMatchedIpFirewall

Type: `string`

Whether the connection matched any IP Firewall rules. UNKNOWN = No match or Firewall not enabled for Spectrum; *UNKNOWN* | *ALLOW* | *BLOCK\_ERROR* | *BLOCK\_IP* | *BLOCK\_COUNTRY* | *BLOCK\_ASN* | *WHITELIST\_IP* | *WHITELIST\_COUNTRY* | *WHITELIST\_ASN*.

## ClientPort

Type: `int`

Client port.

## ClientProto

Type: `string`

Transport protocol used by client; *tcp* | *udp* | *unix*.

## ClientTcpRtt

Type: `int`

The TCP round-trip time in nanoseconds between the client and Spectrum.

## ClientTlsCipher

Type: `string`

The cipher negotiated between the client and Spectrum. An unknown cipher is returned as "UNK."

## ClientTlsClientHelloServerName

Type: `string`

The server name in the Client Hello message from client to Spectrum.

## ClientTlsProtocol

Type: `string`

The TLS version negotiated between the client and Spectrum; *unknown* | *none* | *SSLv3* | *TLSv1* | *TLSv1.1* | *TLSv1.2* | *TLSv1.3*.

## ClientTlsStatus

Type: `string`

Indicates state of TLS session from the client to Spectrum; *UNKNOWN* | *OK* | *INTERNAL\_ERROR* | *INVALID\_CONFIG* | *INVALID\_SNI* | *HANDSHAKE\_FAILED* | *KEYLESS\_RPC*.

## ColoCode

Type: `string`

IATA airport code of the data center that received the request.

## ConnectTimestamp

Type: `int or string`

Timestamp at which both legs of the connection (client/edge, edge/origin or nexthop) were established.

## DisconnectTimestamp

Type: `int or string`

Timestamp at which the connection was closed.

## Event

Type: `string`

*connect* | *disconnect* | *clientFiltered* | *tlsError* | *resolveOrigin* | *originError*.

## IpFirewall

Type: `bool`

Whether IP Firewall was enabled at time of connection.

## OriginBytes

Type: `int`

The number of bytes read from the origin by Spectrum.

## OriginIP

Type: `string`

Origin IP address.

## OriginPort

Type: `int`

Origin port.

## OriginProto

Type: `string`

Transport protocol used by origin; *tcp* | *udp* | *unix*.

## OriginTcpRtt

Type: `int`

The TCP round-trip time in nanoseconds between Spectrum and the origin.

## OriginTlsCipher

Type: `string`

The cipher negotiated between Spectrum and the origin. An unknown cipher is returned as "UNK."

## OriginTlsFingerprint

Type: `string`

SHA256 hash of origin certificate. An unknown SHA256 hash is returned as an empty string.

## OriginTlsMode

Type: `string`

If and how the upstream connection is encrypted; *unknown* | *off* | *flexible* | *full* | *strict*.

## OriginTlsProtocol

Type: `string`

The TLS version negotiated between Spectrum and the origin; *unknown* | *none* | *SSLv3* | *TLSv1* | *TLSv1.1* | *TLSv1.2* | *TLSv1.3*.

## OriginTlsStatus

Type: `string`

The state of the TLS session from Spectrum to the origin; *UNKNOWN* | *OK* | *INTERNAL\_ERROR* | *INVALID\_CONFIG* | *INVALID\_SNI* | *HANDSHAKE\_FAILED* | *KEYLESS\_RPC*.

## ProxyProtocol

Type: `string`

Which form of proxy protocol is applied to the given connection; *off* | *v1* | *v2* | *simple*.

## Status

Type: `int`

A code indicating reason for connection closure.

## Timestamp

Type: `int or string`

Timestamp at which the event took place.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/spectrum_events/#page","headline":"Spectrum events","description":"The descriptions below detail the fields available for spectrum_events.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/spectrum_events/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-14","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
