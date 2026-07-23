---
description: The descriptions below detail the fields available for turnstile_events.
title: Turnstile Events
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

# Turnstile Events

Last updated Jun 1, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/turnstile%5Fevents/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The descriptions below detail the fields available for `turnstile_events`.

## ASN

Type: `int`

The visitor's autonomous system number (ASN).

## Action

Type: `string`

The Turnstile widget action string configured by the customer.

## BrowserMajor

Type: `int`

The major version of the visitor's browser.

## BrowserName

Type: `string`

The name of the visitor's browser (for example, 'Chrome', 'Firefox').

## ClientIP

Type: `string`

IP address of the visitor.

## CountryCode

Type: `string`

The 2-letter ISO-3166 country code of the visitor.

## EventType

Type: `string`

The type of Turnstile event. Possible values are _challenge\_issued_ | _challenge\_non\_interactive\_solved_ | _challenge\_interactive\_solved_ | _challenge\_non\_interactive\_siteverify\_solved_ | _challenge\_interactive\_siteverify\_solved_ | _challenge\_clearance\_siteverify\_solved_ | _challenge\_siteverify\_failed\_double\_redemption_ | _challenge\_siteverify\_failed\_invalid\_token_ | _challenge\_siteverify\_failed\_other_ | _challenge\_siteverify\_ratelimited_.

## Hostname

Type: `string`

The hostname where the Turnstile widget was loaded.

## OSMajor

Type: `int`

The major version of the visitor's operating system.

## OSName

Type: `string`

The name of the visitor's operating system (for example, 'Windows', 'macOS').

## Sitekey

Type: `string`

The Turnstile sitekey (widget identifier).

## Timestamp

Type: `int or string`

The date and time the event was logged.

## UserAgent

Type: `string`

The visitor's full user agent string.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/turnstile_events/#page","headline":"Turnstile Events · Cloudflare Logs docs","description":"The descriptions below detail the fields available for turnstile_events.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/turnstile_events/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
