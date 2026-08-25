---
description: Steer traffic between origins within a pool.
title: Local traffic steering
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt
> Use this file to discover all available pages before exploring further.

# Local traffic steering

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Endpoint steering customizes how each [pool](https://developers.cloudflare.com/load-balancing/pools/) distributes requests to its associated endpoints.

These distributions are a combination of two properties:

* The endpoint steering [policy](#policies) chosen for your pool.
* The [weights](#weights) assigned to each endpoint.

Note

If an endpoint [becomes unhealthy](https://developers.cloudflare.com/load-balancing/understand-basics/health-details/), your pool will also re-balance traffic according to its endpoint steering policy.

## Policies

When you [create a pool](https://developers.cloudflare.com/load-balancing/pools/create-pool/), you have to choose an option for **Endpoint Steering**.


* [Random](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/random-origin-steering/)
* [Hash](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/hash-origin-steering/)
* [Least Outstanding Requests](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/least-outstanding-requests-pools/)

## Weights

The weight assigned to an endpoint controls the percentage of pool traffic sent to that endpoint. By default, all endpoints within a pool have a weight of **1**.

If you leave each endpoint with the default setting and choose a **Random** endpoint steering policy, each endpoint will receive the same percentage of traffic. If you use a **Hash** policy, that percentage will vary based on the IP distribution of your requests.

### Customize weights

To customize weights when you [create or edit a pool](https://developers.cloudflare.com/load-balancing/pools/create-pool/), set the **Weight** to a number between 0 and 1 (expressed in increments of .01). Cloudflare will then send traffic to that pool based on a combination of your endpoint steering policy and the following formula.

```txt
% of traffic to endpoint = endpoint weight ÷ sum of all weights in the pool
```

Endpoint weight example

Here’s an example applying weights to three endpoints with a **Random** endpoint steering policy:

* **Weights:** Endpoint A = 0.25; Endpoint B = 0.25; Endpoint C = 0.50
* **When all endpoints are healthy**, each endpoint will receive the following proportion of total traffic: A = 25%; B = 25%; C = 50%.
* **When one endpoint is unhealthy** (such as endpoint C), each healthy endpoint will receive the following proportion of total traffic: A = 50%; B=50%.

A significant amount of traffic is required for the distribution to converge on the expected values.

An endpoint with a weight of **0** should not receive any traffic sent to that pool (though the endpoint will still receive health monitor requests).

You can also see this value in the **Percent** field when creating or editing a pool in the dashboard.

Note:

If an endpoint is used in multiple pools and has multiple weights assigned, the total traffic sent to that pool will differ from the percentage specified in each individual pool.

### Limitations

If you choose **Hash** for your **Endpoint Steering** or enable [session affinity](https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/), these options can affect traffic distribution.

Additionally, session affinity takes precedence over any selected weight or endpoint steering policy.

When using [DNS-only load balancing](https://developers.cloudflare.com/load-balancing/understand-basics/proxy-modes/#dns-only-load-balancing), DNS resolvers may cache resolved IPs for clients and affect traffic distribution.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/#page","headline":"Local traffic steering · Cloudflare Load Balancing docs","description":"Steer traffic between origins within a pool.","url":"https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
