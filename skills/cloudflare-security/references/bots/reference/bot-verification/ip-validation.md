---
description: Verify bot identity by matching request IP addresses against published bot IP lists.
title: IP validation
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt
> Use this file to discover all available pages before exploring further.

# IP validation

Last updated Apr 15, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/bots/reference/bot-verification/ip-validation/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The IP validation method aims to identify all of the IP addresses that a bot may use to send requests. IP validation is only used as a verification method for [verified bots](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/).

Cloudflare can achieve this in two ways:

* **Using IP list provided by the bot owner**: The bot owner can host a public list of IP ranges (for example, [Googlebot's list ↗](https://developers.google.com/static/search/apis/ipranges/googlebot.json)). Cloudflare fetches and uses this list directly for validation.
* **Using Domain-based reverse DNS**: The bot owner can provide a domain (or set of domains) that their bot requests originate from. Cloudflare collects the IP addresses observed in the requests with the bot's user agent, and performs reverse DNS lookups. If the reverse DNS of an IP resolves to one of the provided domains, Cloudflare considers it valid and stores it.

## Public IP List

To verify a bot using a public IP list, you need to provide:

* A fixed and limited set of IP addresses, which can be verified via publicly accessible plain-text, `JSON`, or `CSV`.
* IP addresses used solely by the bot owner.
* A user-agent match pattern.

## Reverse DNS

To verify a bot using reverse DNS, you need to provide:

* A list of domain suffixes to validate DNS records.
* IP addresses should have PTR records set correctly.
* A user-agent match pattern.

## Generic user-agents

User-agent patterns that match generic user-agents will be rejected by the Verified Bots API. When you add a user-agent pattern that is considered very common to the Verified Bot form, you may encounter an error message that will prompt you to correct the user-agent before you can submit again.

Generic user-agents include:

* `Dart`
* `Go-http-client`
* `GuzzleHttp`
* `Google Chrome`
* `Mozilla Firefox`
* `Safari`
* `Nessus`
* `Websocket++`
* `cloudflare-go`
* `fasthttp`
* `got`
* `nginx-ssl early hints`
* `node`
* `node-fetch`
* `okhttp`
* `python-requests`
* `uTorrent`

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/reference/bot-verification/ip-validation/#page","headline":"IP validation · Cloudflare bot solutions docs","description":"Verify bot identity by matching request IP addresses against published bot IP lists.","url":"https://developers.cloudflare.com/bots/reference/bot-verification/ip-validation/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
