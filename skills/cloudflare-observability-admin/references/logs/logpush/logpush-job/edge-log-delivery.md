---
description: Send logs directly from edge with low latency.
title: Edge Log Delivery
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

# Edge Log Delivery

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/logs/logpush/logpush-job/edge-log-delivery/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Edge Log Delivery allows customers to send logs directly from Cloudflare’s edge to their destination of choice. You can configure the maximum interval for your log batches between 30 seconds and five minutes. However, you cannot specify a minimum interval for log batches, meaning that log files may be sent in shorter intervals than the maximum specified. Compared to Logpush, Edge Log Delivery sends logs with lower latency, more frequently, and in smaller batches.

Edge Log Delivery is only available for HTTP request logs. Refer to the [API configuration](https://developers.cloudflare.com/logs/logpush/logpush-job/api-configuration/#kind) page for steps on how to configure a job to use Edge Log Delivery.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/edge-log-delivery/#page","headline":"Edge Log Delivery · Cloudflare Logs docs","description":"Send logs directly from edge with low latency.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/edge-log-delivery/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
