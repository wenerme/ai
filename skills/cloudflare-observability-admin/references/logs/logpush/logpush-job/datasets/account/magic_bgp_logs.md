---
description: The descriptions below detail the fields available for magic_bgp_logs.
title: Magic BGP Logs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

# Magic BGP Logs

Last updated Sep 14, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/magic_bgp_logs/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The descriptions below detail the fields available for `magic_bgp_logs`.

## Direction

Type: `string`

Direction of the event relative to Cloudflare. Possible values are *to\_cloudflare* | *from\_cloudflare*, or empty for non-message events.

## EventData

Type: `object`

Payload describing the event. Schema depends on `EventKind`.
*open\_message* carries `peer_asn`, `cloudflare_asn`, `bgp_id`, `hold_time`, and `capabilities`.
*update\_message* carries `announced`, `as_path`, and `origin`.
*notification\_message* carries `code`, `subcode`, and `reason`.
*route\_refresh\_message* carries `afi` and `safi`.
*bgp\_state\_transition* carries `from_state`, `to_state`, and `event`.
*tcp\_handshake\_failed* carries `reason`, `message`, `src`, and `dst`.
*stale\_path\_timer\_expired* carries `purged_route_count`.
*session\_config\_changed* carries `disabled` and the changed fields.
*filter\_config\_changed* carries `import` and `export` filter change flags.
*redistribute\_config\_changed* carries a single boolean.

## EventKind

Type: `string`

BGP event type. Possible values are *open\_message* | *update\_message* | *notification\_message* | *route\_refresh\_message* | *bgp\_state\_transition* | *tcp\_handshake\_failed* | *stale\_path\_timer\_expired* | *session\_config\_changed* | *filter\_config\_changed* | *redistribute\_config\_changed*.

## EventTimestamp

Type: `int or string`

Timestamp of when the event occurred.

## TunnelID

Type: `string`

UUID (hex, no hyphens) of the IPsec / GRE tunnel the event belongs to.

## TunnelName

Type: `string`

Name of the IPsec / GRE tunnel the event belongs to.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/magic_bgp_logs/#page","headline":"Magic BGP Logs","description":"The descriptions below detail the fields available for magic_bgp_logs.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/magic_bgp_logs/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-14","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
