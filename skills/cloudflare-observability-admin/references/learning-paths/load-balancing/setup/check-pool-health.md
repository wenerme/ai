---
description: Verify pool and server health status.
title: Check pool health
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

#  Check pool health

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/learning-paths/load-balancing/setup/check-pool-health/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Before directing any traffic to your pools, make sure that your pools and monitors are set up correctly. The status of your health check will be _unknown_ until the results of the first check are available.

To confirm pool health using the dashboard:

1. Go to **Load Balancing**.
2. Select the **Pools** tab.
3. For pools and individual endpoints, review the values in the **Health** and **Endpoint Health** columns.

For more information on pool and endpoint health statuses, refer to [How a pool becomes unhealthy](https://developers.cloudflare.com/load-balancing/understand-basics/health-details/#how-a-pool-becomes-unhealthy).

To fetch the latest health status of all pools, use the [List Pools](https://developers.cloudflare.com/api/resources/load%5Fbalancers/subresources/pools/methods/list/) command, paying attention to the `healthy` value for pools and origins (endpoints).

For troubleshooting a specific pool's health, use the [Pool Health Details](https://developers.cloudflare.com/api/resources/load%5Fbalancers/subresources/pools/subresources/health/methods/get/) command.

## Unexpected health status

If you notice that healthy pools are being marked unhealthy:

* Review [how endpoints and pools become unhealthy](https://developers.cloudflare.com/load-balancing/understand-basics/health-details/).
* Refer to the [Troubleshooting section](https://developers.cloudflare.com/load-balancing/troubleshooting/).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/load-balancing/setup/check-pool-health/#page","headline":"Check pool health · Cloudflare Learning Paths","description":"Verify pool and server health status.","url":"https://developers.cloudflare.com/learning-paths/load-balancing/setup/check-pool-health/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
