---
agent:
  instructions: "This site offers a search API that returns relevant content across the entire site. Use the search endpoint to find information instead of crawling individual pages."
  search: "https://developers.cloudflare.com/.well-known/search?q={query}"
description: Access, filter, and export logs from Cloudflare Workers for troubleshooting.
title: Logs
image: https://developers.cloudflare.com/workers/observability/logs/og.png?v=786c8ddd2c46c6a3
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Logs

Logs are an important component of a developer's toolkit to troubleshoot and diagnose application issues and maintaining system health. The Cloudflare Developer Platform offers many tools to help developers manage their application's logs.

## [Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs)

Automatically ingest, filter, and analyze logs emitted from Cloudflare Workers in the Cloudflare dashboard.

To receive notifications for failures or custom log queries, refer to [Alert on application events](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#alert-on-application-events).

## [Real-time logs](https://developers.cloudflare.com/workers/observability/logs/real-time-logs)

Access log events in near real-time. Real-time logs provide immediate feedback and visibility into the health of your Cloudflare Worker.

## [Tail Workers](https://developers.cloudflare.com/workers/observability/logs/tail-workers) Beta

Tail Workers allow developers to apply custom filtering, sampling, and transformation logic to telemetry data.

## [Workers Logpush](https://developers.cloudflare.com/workers/observability/logs/logpush)

Send Workers Trace Event Logs to a supported destination. Workers Logpush includes metadata about requests and responses, unstructured `console.log()` messages and any uncaught exceptions.

## Video Tutorial

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/observability/logs/#page","headline":"Logs","description":"Access, filter, and export logs from Cloudflare Workers for troubleshooting.","url":"https://developers.cloudflare.com/workers/observability/logs/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/observability/logs/og.png?v=786c8ddd2c46c6a3","dateModified":"2026-11-18","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
