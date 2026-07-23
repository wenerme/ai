---
description: The descriptions below detail the fields available for dlp_forensic_copies.
title: DLP Forensic Copies
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

# DLP Forensic Copies

Last updated Mar 12, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/dlp%5Fforensic%5Fcopies/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The descriptions below detail the fields available for `dlp_forensic_copies`.

## AccountID

Type: `string`

Cloudflare account ID.

## Datetime

Type: `int or string`

The date and time the corresponding HTTP request was made.

## ForensicCopyID

Type: `string`

The unique ID for this particular forensic copy.

## GatewayRequestID

Type: `string`

Cloudflare request ID, as found in Gateway logs.

## Headers

Type: `object`

String key-value pairs for a selection of HTTP headers on the associated request/response.

## Payload

Type: `string`

Captured request/response data, base64-encoded.

## Phase

Type: `string`

Phase of the HTTP request this forensic copy was captured from (that is, "request" or "response").

## TriggeredRuleID

Type: `string`

The ID of the Gateway firewall rule that triggered this forensic copy.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/dlp_forensic_copies/#page","headline":"DLP Forensic Copies · Cloudflare Logs docs","description":"The descriptions below detail the fields available for dlp_forensic_copies.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/dlp_forensic_copies/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-03-12","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
