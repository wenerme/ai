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

Last updated Aug 27, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/magic%5Fbgp%5Flogs/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The descriptions below detail the fields available for `magic_bgp_logs`.

## Direction

Type: `string`

Direction of the event relative to Cloudflare. Possible values are _to\_cloudflare_ | _from\_cloudflare_, or empty for non-message events.

## EventData

Type: `object`

Payload describing the event. Schema depends on `EventKind`.
_open\_message_ carries `peer_asn`, `cloudflare_asn`, `bgp_id`, `hold_time`, and `capabilities`.
_update\_message_ carries `announced`, `as_path`, and `origin`.
_notification\_message_ carries `code`, `subcode`, and `reason`.
_route\_refresh\_message_ carries `afi` and `safi`.
_bgp\_state\_transition_ carries `from_state`, `to_state`, and `event`.
_tcp\_handshake\_failed_ carries `reason`, `message`, `src`, and `dst`.
_stale\_path\_timer\_expired_ carries `purged_route_count`.
_session\_config\_changed_ carries `disabled` and the changed fields.
_filter\_config\_changed_ carries `import` and `export` filter change flags.
_redistribute\_config\_changed_ carries a single boolean.

## EventKind

Type: `string`

BGP event type. Possible values are _open\_message_ | _update\_message_ | _notification\_message_ | _route\_refresh\_message_ | _bgp\_state\_transition_ | _tcp\_handshake\_failed_ | _stale\_path\_timer\_expired_ | _session\_config\_changed_ | _filter\_config\_changed_ | _redistribute\_config\_changed_.

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/magic_bgp_logs/#page","headline":"Magic BGP Logs · Cloudflare Logs docs","description":"The descriptions below detail the fields available for magic_bgp_logs.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/magic_bgp_logs/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
