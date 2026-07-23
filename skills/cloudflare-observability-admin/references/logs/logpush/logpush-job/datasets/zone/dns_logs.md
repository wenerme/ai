---
description: The descriptions below detail the fields available for dns_logs.
title: DNS logs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

# DNS logs

Last updated Jul 25, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/dns%5Flogs/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The descriptions below detail the fields available for `dns_logs`.

## ColoCode

Type: `string`

IATA airport code of the data center that received the request.

## EDNSSubnet

Type: `string`

IPv4 or IPv6 address information corresponding to the [EDNS Client Subnet (ECS)](https://developers.cloudflare.com/glossary/?term=ecs) forwarded by recursive resolvers. Not all resolvers send this information.

## EDNSSubnetLength

Type: `int`

Size of the [EDNS Client Subnet (ECS)](https://developers.cloudflare.com/glossary/?term=ecs) in bits. For example, if the last octet of an IPv4 address is omitted (`192.0.2.x.`), the subnet length will be 24.

## QueryName

Type: `string`

Name of the query that was sent.

## QueryType

Type: `int`

Integer value of query type. For more information refer to [Query type ↗](https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-4).

## ResponseCached

Type: `bool`

Whether the response was cached or not.

## ResponseCode

Type: `int`

Integer value of response code. For more information refer to [Response code ↗](https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-6).

## SourceIP

Type: `string`

IP address of the client (IPv4 or IPv6).

## Timestamp

Type: `int or string`

Timestamp at which the query occurred.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/dns_logs/#page","headline":"DNS logs · Cloudflare Logs docs","description":"The descriptions below detail the fields available for dns_logs.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/dns_logs/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-07-25","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
