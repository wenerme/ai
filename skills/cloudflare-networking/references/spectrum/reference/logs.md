---
description: Access Spectrum connection lifecycle logs through Logpush.
title: Event logs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/spectrum/llms.txt
> Use this file to discover all available pages before exploring further.

# Event logs

Last updated Jul 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/spectrum/reference/logs/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Spectrum logs the entire lifecycle of every client that connects through it. These event logs are available through Logpush as a separate category (dataset type `spectrum_events`); they are not part of HTTP log events.

For each connection, Spectrum logs a connect event and either a disconnect or error event. Details on status codes can be found below.

## Configure Logpush

Spectrum [log events](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/) can be configured through the dashboard or API, depending on your preferred [destination](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/).

## Status Codes

Spectrum status codes are not HTTP status codes

The status codes in the Spectrum status code table are Spectrum-specific connection status codes. They describe the outcome of Layer 4 (TCP/UDP) connections, not HTTP transactions. Some codes share numbers with HTTP status codes (for example, `444`, `499`) but have different meanings in the Spectrum context. For guidance on interpreting common status code patterns, refer to [Spectrum Troubleshooting](https://developers.cloudflare.com/spectrum/reference/troubleshooting/#common-spectrum-event-log-status-codes).

| Code | Description                                                                                        |
| ---- | -------------------------------------------------------------------------------------------------- |
| 0    | Connection was opened successfully.                                                                |
| 200  | Normal connection closure.                                                                         |
| 400  | The TLS client hello sent during the client/edge TLS handshake contained an invalid SNI.           |
| 403  | Connection closed because the client IP matched a firewall rule with deny action.                  |
| 443  | The client TLS handshake failed.                                                                   |
| 444  | The origin closed the connection by sending a reset (RST) packet. Not all data may have been sent. |
| 445  | A timeout event (ETIMEDOUT) occurred on an established connection to origin.                       |
| 446  | Origin keepalive expired (EHOSTUNREACH).                                                           |
| 447  | Error while reading from or writing to an established origin connection (ECONNREFUSED).            |
| 448  | Origin connection closed due to a broken pipe (EPIPE).                                             |
| 490  | Client TLS error on established connection.                                                        |
| 495  | Client connection received an error (ECONNREFUSED).                                                |
| 496  | Client host is unreachable (EHOSTUNREACH).                                                         |
| 497  | A timeout event (ETIMEDOUT) occurred on an established connection to client.                       |
| 498  | Established client connection closed due to broken pipe (EPIPE).                                   |
| 499  | The client closed the connection by sending a reset (RST) packet. Not all data may have been sent. |
| 500  | Internal Cloudflare error.                                                                         |
| 503  | Error related to performing the TLS handshake with keyless SSL.                                    |
| 520  | Unknown origin connection error.                                                                   |
| 521  | Origin refused to open the connection (ECONNREFUSED).                                              |
| 522  | Opening a connection to origin failed: ETIMEDOUT                                                   |
| 523  | Opening a connection to origin failed: ENETUNREACH                                                 |
| 524  | Opening a connection to origin failed due to an internal system error.                             |
| 530  | Internal error while resolving origin to an IP.                                                    |
| 531  | Could not resolve origin to an IP.                                                                 |
| 532  | The origin connection was not opened because the origin IP is blocked.                             |
| 533  | Internal error while resolving origin to an IP.                                                    |
| 540  | The client/edge TLS handshake failed due to an invalid configuration.                              |
| 999  | Unknown connection error.                                                                          |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/spectrum/reference/logs/#page","headline":"Event logs · Cloudflare Spectrum docs","description":"Access Spectrum connection lifecycle logs through Logpush.","url":"https://developers.cloudflare.com/spectrum/reference/logs/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Logging"]}
```
