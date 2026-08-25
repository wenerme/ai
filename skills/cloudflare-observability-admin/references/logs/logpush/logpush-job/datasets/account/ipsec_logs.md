---
description: The descriptions below detail the fields available for ipsec_logs.
title: IPSec Logs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

# IPSec Logs

Last updated Feb 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/ipsec%5Flogs/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The descriptions below detail the fields available for `ipsec_logs`.

## Level

Type: `string`

The level of the log.

## LocalIP

Type: `string`

The local IP address associated with the log.

## LocalPort

Type: `int`

The local port associated with the log.

## Message

Type: `string`

The log message. IKEv2 ciphersuite is logged here for handshake messages.

## RemoteIP

Type: `string`

The remote IP address associated with the log.

## RemotePort

Type: `int`

The remote port associated with the log.

## Timestamp

Type: `int or string`

Timestamp at which the log occurred.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/ipsec_logs/#page","headline":"IPSec Logs · Cloudflare Logs docs","description":"The descriptions below detail the fields available for ipsec_logs.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/ipsec_logs/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-02-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
