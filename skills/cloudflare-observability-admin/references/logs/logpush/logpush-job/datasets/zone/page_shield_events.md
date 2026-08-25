---
description: The descriptions below detail the fields available for page_shield_events.
title: Page Shield events
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

# Page Shield events

Last updated Jul 25, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/page%5Fshield%5Fevents/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The descriptions below detail the fields available for `page_shield_events`.

## Action

Type: `string`

The action which was taken against the violation.
Possible values are _log_ | _allow_.

## CSPDirective

Type: `string`

The violated directive in the report.

## Host

Type: `string`

The host where the resource was seen on.

## PageURL

Type: `string`

The page URL the violation was seen on.

## PolicyID

Type: `string`

The ID of the policy which was violated.

## ResourceType

Type: `string`

The resource type of the violated directive. Possible values are 'script', 'connection', or 'other' for unmonitored resource types.

## Timestamp

Type: `int or string`

The timestamp of when the report was received.

## URL

Type: `string`

The resource URL.

## URLContainsCDNCGIPath (deprecated)

Type: `bool`

Whether the resource URL contains the '/cdn-cgi/' path.

## URLHost

Type: `string`

The domain host of the URL.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/page_shield_events/#page","headline":"Page Shield events · Cloudflare Logs docs","description":"The descriptions below detail the fields available for page_shield_events.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/page_shield_events/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-07-25","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
