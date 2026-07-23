---
description: Fix stale DNS responses from upstream resolvers.
title: Stale response for upstream DNS resolution
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# Stale response for upstream DNS resolution

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dns/manage-dns-records/troubleshooting/stale-response/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

In one of the scenarios below, you notice that stale DNS responses are used. Depending on the scenario and other aspects of your configuration, this can cause wrong content or no content to be returned.

* A proxied CNAME record ([flattened by default](https://developers.cloudflare.com/dns/cname-flattening/)).
* A DNS-only CNAME record that has flattening turned on. This can happen either via the specific record configuration or as a consequence of the [zone settings](https://developers.cloudflare.com/dns/cname-flattening/set-up-cname-flattening/).
* A [Workers](https://developers.cloudflare.com/workers/) script making a subrequest to an external hostname[1](#user-content-fn-1).

## Cause

In the event that an upstream DNS server takes too long to respond, or the upstream returns a SERVFAIL, Cloudflare will use the expired DNS response from the cache and then attempt to update that cache asynchronously.

## Solutions

* If possible, temporarily replace the proxied CNAME with a proxied A record. This may not always be possible, especially if the upstream target is a load balancer or if it returns dynamic responses.
* Report the issues to the zone owner or DNS provider for the upstream target that is unresponsive.
* You can also raise the issue through the DNS Operations Analysis and Research Center (DNS OARC). Consider its [chat platform ↗](https://www.dns-oarc.net/oarc/services/chat) or [email lists ↗](https://www.dns-oarc.net/oarc/lists).

## Footnotes

1. A hostname that is not using Cloudflare as its [authoritative DNS provider](https://developers.cloudflare.com/dns/concepts/#authoritative-dns). [↩](#user-content-fnref-1)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/manage-dns-records/troubleshooting/stale-response/#page","headline":"Stale response for upstream DNS resolution · Cloudflare DNS docs","description":"Fix stale DNS responses from upstream resolvers.","url":"https://developers.cloudflare.com/dns/manage-dns-records/troubleshooting/stale-response/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
