---
title: IP validation
description: Verify bot identity by matching request IP addresses against published bot IP lists.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/bots/reference/bot-verification/ip-validation.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# IP validation

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/bots/reference/bot-verification/","name":"Bot verification methods"}},{"@type":"ListItem","position":5,"item":{"@id":"/bots/reference/bot-verification/ip-validation/","name":"IP validation"}}]}
```
