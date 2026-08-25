---
description: Monitor server health with periodic health checks.
title: Monitors and health checks
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Monitors and health checks

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/load-balancing/concepts/health-checks/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

There's more to a load balancer than just distributing traffic, however.

After all, what good would it be if your load balancer and pools send a request to a server that's offline? Or one that's already overloaded with traffic? Ideally, your load balancer should only forward requests that a server can take care of.

That's where another part of the load balancing equation comes in: monitors and health checks.

    flowchart RL
      accTitle: Load balancing monitor flow
      accDescr: Monitors issue health monitor requests, which validate the current status of servers within each pool.
      Monitor -- Health Monitor ----> Endpoint2
      Endpoint2 -- Response ----> Monitor
      subgraph Pool
      Endpoint1((Endpoint 1))
      Endpoint2((Endpoint 2))
      end

## How it works

A monitor issues health checks periodically to evaluate the health of each server within a pool.

Requests issued by a monitor at regular interval and — depending on the monitor settings — return a **pass** or **fail** value to make sure an endpoint is still able to receive traffic.

Each health monitor request is trying to answer two questions:

1. **Is the endpoint offline?**: Does the endpoint respond to the health monitor request at all? If so, does it respond quickly enough (as specified in the monitor's **Timeout** field)?
2. **Is the endpoint working as expected?**: Does the endpoint respond with the expected HTTP response codes? Does it include specific information in the response body?

If the answer to either of these questions is "No", then the endpoint fails the health monitor request.

This system of request and response ensures that a load balancer knows which servers can handle incoming requests.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/load-balancing/concepts/health-checks/#page","headline":"Monitors and health checks · Cloudflare Learning Paths","description":"Monitor server health with periodic health checks.","url":"https://developers.cloudflare.com/learning-paths/load-balancing/concepts/health-checks/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
