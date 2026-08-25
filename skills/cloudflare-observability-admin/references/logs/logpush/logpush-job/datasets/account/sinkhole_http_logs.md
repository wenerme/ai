---
description: The descriptions below detail the fields available for sinkhole_http_logs.
title: Sinkhole HTTP Logs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

# Sinkhole HTTP Logs

Last updated Jul 25, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/sinkhole%5Fhttp%5Flogs/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The descriptions below detail the fields available for `sinkhole_http_logs`.

## AccountID

Type: `string`

The Account ID.

## Body

Type: `string`

The request body.

## BodyLength

Type: `int`

The length of request body.

## DestAddr

Type: `string`

The destination IP address of the request.

## Headers

Type: `string`

The request headers. If a header has multiple values, the values are comma separated. Each header is separated by the escaped newline character (\\n).

## Host

Type: `string`

The host the request was sent to.

## Method

Type: `string`

The request method.

## Password

Type: `string`

The request password.

## R2Path

Type: `string`

The path to the object within the R2 bucket linked to this sinkhole that stores overflow body and header data. Blank if neither headers nor body was larger than 256 bytes.

## Referrer

Type: `string`

The referrer of the request.

## SinkholeID

Type: `string`

The ID of the Sinkhole that logged the HTTP Request.

## SrcAddr

Type: `string`

The sender's IP address.

## Timestamp

Type: `int or string`

The date and time the sinkhole HTTP request was logged.

## URI

Type: `string`

The request Uniform Resource Identifier.

## URL

Type: `string`

The request Uniform Resource Locator.

## UserAgent

Type: `string`

The request user agent.

## Username

Type: `string`

The request username.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/sinkhole_http_logs/#page","headline":"Sinkhole HTTP Logs · Cloudflare Logs docs","description":"The descriptions below detail the fields available for sinkhole_http_logs.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/sinkhole_http_logs/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-07-25","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
