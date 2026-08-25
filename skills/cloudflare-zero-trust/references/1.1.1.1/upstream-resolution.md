---
description: How 1.1.1.1 selects authoritative nameservers, retries failed queries, and determines which response to return.
title: Upstream resolution
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/1.1.1.1/llms.txt
> Use this file to discover all available pages before exploring further.

# Upstream resolution

Last updated Apr 30, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/1.1.1.1/upstream-resolution/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When 1.1.1.1 does not have an answer in its cache, it contacts authoritative nameservers on your behalf. Authoritative nameservers are the DNS servers that hold the actual records for a domain. This page describes how 1.1.1.1 selects which nameserver to query, what happens when a nameserver is unreachable, and how the final response is determined.

## Query name minimization

When resolving a multi-level domain name like `foo.bar.example.com`, 1.1.1.1 does not reveal the full name to every server in the chain. Instead, it sends only the minimum information each server needs. For example, when asking the `.com` TLD server, 1.1.1.1 only discloses that it needs to find `example.com` — the subdomain parts (`foo.bar`) are not included. This limits the amount of information exposed to intermediary servers and reduces privacy leakage.

## Root zone

1.1.1.1 uses [locally hosted copies of the root zone file ↗](https://blog.cloudflare.com/f-root/) instead of querying remote root servers for every lookup. The root zone file contains the addresses of all top-level domain (TLD) servers. By hosting it locally, 1.1.1.1 avoids a network round trip to root servers, which reduces latency, improves privacy, and decreases load on the global DNS root server system.

## Nameserver selection

Most domains have multiple authoritative nameservers for redundancy. When 1.1.1.1 needs to query one, it chooses based on measured performance. The resolver tracks metrics for each nameserver — including round-trip time (how long a query takes to travel to the server and back) and response quality — then picks the nameserver that has historically been fastest and most reliable from the data center handling your request.

If the selected nameserver does not respond in time or returns an error, 1.1.1.1 retries against a different nameserver for the same zone. Refer to [Retry behavior](#retry-behavior) for details.

A small percentage of queries are also sent to alternative nameservers so that performance measurements stay current. This allows a previously slow server to be re-evaluated if its performance improves. For more background on the system that powers this selection, refer to the [BigPineapple architecture blog post ↗](https://blog.cloudflare.com/big-pineapple-intro/).

## Retry behavior

If a nameserver does not respond in time or returns a temporary error, 1.1.1.1 retries the query against a different authoritative nameserver for the same zone. The unresponsive server is deprioritized so that subsequent queries prefer healthier alternatives. 1.1.1.1 periodically re-checks deprioritized servers to detect recovery.

When multiple clients request the same domain at the same time, 1.1.1.1 deduplicates the upstream queries so that a single in-flight request serves all waiting clients. The exact retry timing and ranking logic are tuned over time and may change.

## Response selection

For a given query, 1.1.1.1 returns only one answer to the client. When authoritative nameservers disagree, which response 1.1.1.1 selects depends on the type of responses received.

The following DNS response codes are relevant:

* **`NOERROR`** — The query succeeded. The response contains the requested records, or indicates that the name exists but has no records of the requested type (sometimes called `NODATA`).
* **`NXDOMAIN`** — The domain name does not exist.
* **`SERVFAIL`** — The nameserver encountered an internal error and could not answer.
* **`REFUSED`** — The nameserver refused to answer the query.

How 1.1.1.1 handles disagreements between nameservers:

* **`NOERROR` versus `NXDOMAIN`:** Both are valid authoritative answers. 1.1.1.1 returns whichever response it receives first and does not query remaining nameservers to compare. Authoritative nameservers for the same zone are expected to be consistent. If one returns `NXDOMAIN` and another returns `NOERROR` for the same name, that indicates a misconfiguration on the authoritative side.
* **Timeout versus a valid response:** A timeout is not an answer. 1.1.1.1 retries against another nameserver and returns the first valid response it receives.
* **`SERVFAIL` or `REFUSED` versus a valid response:** Temporary failures are treated as upstream errors, not authoritative answers. 1.1.1.1 retries against another nameserver and returns the first valid response. Only if all nameservers return errors does 1.1.1.1 return a failure to the client — typically `SERVFAIL`, or `REFUSED` if that is what the nameservers consistently returned.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/1.1.1.1/upstream-resolution/#page","headline":"Upstream resolution · Cloudflare 1.1.1.1 docs","description":"How 1.1.1.1 selects authoritative nameservers, retries failed queries, and determines which response to return.","url":"https://developers.cloudflare.com/1.1.1.1/upstream-resolution/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
