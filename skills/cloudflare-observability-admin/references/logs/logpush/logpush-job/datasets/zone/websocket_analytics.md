---
description: The descriptions below detail the fields available for websocket_analytics.
title: WebSocket Analytics
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

# WebSocket Analytics

Last updated Jun 29, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/websocket%5Fanalytics/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The descriptions below detail the fields available for `websocket_analytics`.

## BytesReceivedClient

Type: `int`

Number of bytes received from the client.

## BytesReceivedOrigin

Type: `int`

Number of bytes received from the origin.

## BytesSentClient

Type: `int`

Number of bytes sent to the client.

## BytesSentOrigin

Type: `int`

Number of bytes sent to the origin.

## ClientASN

Type: `int`

The client's autonomous system number (ASN).

## ClientIP

Type: `string`

The client IP address.

## ClientRequestHost

Type: `string`

The host requested by the client in the WebSocket upgrade request.

## ClientRequestPath

Type: `string`

The path requested by the client in the WebSocket upgrade request.

## ClientRequestUserAgent

Type: `string`

The user agent reported by the client.

## ColoCode

Type: `string`

IATA airport code of the data center that handled the connection.

## ConnectionCloseReason

Type: `string`

The reason the WebSocket connection ended.
Possible values are _none_ | _unspecifiedError_ | _timedOut_ | _peerReset_ | _upstreamReset_ | _protocolViolation_ | _peerNoError_.

## ConnectionCloseSource

Type: `string`

Which side initiated the connection close.
Possible values are _upstream_ | _downstream_ | _me_ | _both_, or the raw internal value if unrecognized.

## ConnectionID

Type: `string`

Unique identifier of the WebSocket connection, hex-encoded.

## ConnectionTransportCloseCode

Type: `int`

The first transport-level close code observed. For TLS connections this is the TLS alert code; for plain TCP connections (no TLS) it is always 0\. The most significant bit indicates the source: 0 = proxy-initiated, 1 = eyeball-initiated.

## EdgeEndTimestamp

Type: `int or string`

Timestamp at which the WebSocket connection closed. To specify the timestamp format, refer to [Output types](https://developers.cloudflare.com/logs/logpush/logpush-job/log-output-options/#output-types).

## EdgeStartTimestamp

Type: `int or string`

Timestamp at which the WebSocket connection was established. To specify the timestamp format, refer to [Output types](https://developers.cloudflare.com/logs/logpush/logpush-job/log-output-options/#output-types).

## RayID

Type: `string`

The Ray ID of the WebSocket upgrade request.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/websocket_analytics/#page","headline":"WebSocket Analytics · Cloudflare Logs docs","description":"The descriptions below detail the fields available for websocket_analytics.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/websocket_analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
