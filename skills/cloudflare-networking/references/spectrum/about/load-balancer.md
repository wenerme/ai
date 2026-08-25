---
description: Add TCP health checks, failover, and traffic steering to Spectrum applications.
title: Cloudflare Load Balancing
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/spectrum/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare Load Balancing

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/spectrum/about/load-balancer/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can configure Spectrum with Cloudflare [Load Balancing](https://developers.cloudflare.com/load-balancing/) to provide TCP healthchecks, failover, and traffic steering, bringing resiliency to your Spectrum applications.

For an overview of how Cloudflare Load Balancing works refer to [Load Balancing components](https://developers.cloudflare.com/load-balancing/understand-basics/load-balancing-components/). For setup guidance refer to [Add load balancing to Spectrum applications](https://developers.cloudflare.com/load-balancing/additional-options/spectrum/).

## TCP health checks

You can configure a Cloudflare load balancer to probe any TCP port for an accepted connection, which is in addition to HTTP and HTTPS probing capabilities.

Health checks are optional within a load balancer. However, without a health check, the load balancer will distribute traffic to all endpoints in the first pool. With the health checks enabled, hosts that have gone into an error state will not receive traffic, maintaining uptime. This allows you to enable intelligent failover within a pool of hosts or amongst multiple pools.

The example below shows a TCP health check configuration for an application running on port 2408 with a refresh rate every 30 seconds. You can configure TCP health checks through the dashboard or through Cloudflare's API.

TCP health check - Dashboard example

| Field | Value |
| ----- | ----- |
| Type  | TCP   |
| Port  | 2408  |

Under **Advanced health check settings**:

| Field    | Value     |
| -------- | --------- |
| Interval | 30        |
| Timeout  | 5 seconds |
| Retries  | 2         |

TCP health check - API example

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Load Balancing: Monitors and Pools Write`

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitors" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"description": "Spectrum Health Check",
		"type": "tcp",
		"port": 2048,
		"interval": 30,
		"retries": 2,
		"timeout": 5,
		"method": "connection_established"
	}'
```

```json
{
    "result": {
        "description": "TCP Monitor for Spectrum",
        "created_on": "2025-07-17T14:55:04.830009Z",
        "modified_on": "2025-07-17T14:55:04.830009Z",
        "id": "1d404721c660a8a7aaa28d68ed6d48d9",
        "type": "tcp",
        "port": 2048,
        "interval": 60,
        "retries": 2,
        "timeout": 5,
        "expected_body": "",
        "expected_codes": "",
        "follow_redirects": false,
        "allow_insecure": false,
        "probe_zone": "",
        "path": "",
        "method": "connection_established"
    },
    "success": true,
    "errors": [],
    "messages": []
}
```

## Traffic steering

All traffic steering policies are available for transport load balancing through Spectrum. Refer to the Load Balancing documentation to learn more about the available [global traffic steering](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/) and [endpoint steering](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/) options.

## Weights

[Endpoint weights](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/#weights) allow you to have endpoints with different capacity or to split traffic amongst hosts for any other reason.

Weight configured within a load balancer pool will be honored with load balancing through Spectrum.

## Requirements and limitations

* Load Balancing [session affinity](https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/), [failover across pools](https://developers.cloudflare.com/load-balancing/understand-basics/adaptive-routing/#failover-across-pools), and [custom rules](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/) are not supported by Spectrum.
* UDP health checks are only available with public monitoring. TCP can be used with both public and private monitoring.
* This feature requires an Enterprise plan. If you would like to upgrade, contact your account team.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/spectrum/about/load-balancer/#page","headline":"Cloudflare Load Balancing · Cloudflare Spectrum docs","description":"Add TCP health checks, failover, and traffic steering to Spectrum applications.","url":"https://developers.cloudflare.com/spectrum/about/load-balancer/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
