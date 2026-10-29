---
description: The descriptions below detail the fields available for ai_gateway_events.
title: AI Gateway Events
image: https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/ai_gateway_events/og.png?v=a9d9ed73167d3e6b
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

# AI Gateway Events

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/ai_gateway_events/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The descriptions below detail the fields available for `ai_gateway_events`.

## Cached

Type: `bool`

Request cached.

## Endpoint

Type: `string`

Requested endpoint.

## Gateway

Type: `string`

The AI Gateway that generated the log message.

## Metadata

Type: `object`

User defined metadata attached to the request.

## Metrics

Type: `object`

Provider-independent cost and usage metrics for the request, for example {"cost":0.0042,"durationMs":1234}.

## Model

Type: `string`

Model that served the request. For the model the caller asked for, refer to RequestedModel.

## Provider

Type: `string`

Requested provider name.

## RateLimited

Type: `bool`

Request rate limited.

## RequestBody

Type: `object`

Encrypted Request body in the format {"type":"encrypted","data":"base64"}.

## RequestedModel

Type: `string`

Model name the caller requested, for example `cloudflare/auto`. This can differ from Model when AI Gateway routes the request to another model.

## ResponseBody

Type: `object`

Encrypted Response body in the format {"type":"encrypted","data":"base64"}.

## RoutingDecisionID

Type: `string`

Smart routing decision ID, matching the `cf-aig-routing-decision-id` response header. Empty when no routing decision was made.

## RoutingReason

Type: `string`

Reason smart routing selected the model, matching the `cf-aig-routing-reason` response header. Empty when no routing decision was made.

## StatusCode

Type: `int`

Response status code.

## Timestamp

Type: `int or string`

Time the log event was recorded, after the request completed.

## UserAgent

Type: `string`

User-Agent header sent by the client, truncated to 512 characters.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/ai_gateway_events/#page","headline":"AI Gateway Events","description":"The descriptions below detail the fields available for ai_gateway_events.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/ai_gateway_events/","inLanguage":"en","image":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/ai_gateway_events/og.png?v=a9d9ed73167d3e6b","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
