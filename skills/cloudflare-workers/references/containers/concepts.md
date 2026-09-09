---
description: Understand what a Cloudflare Container is, how requests reach it, how it starts and stops, where it runs, and how it holds state.
title: Container Fundamentals
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt
> Use this file to discover all available pages before exploring further.

# Container Fundamentals

Last updated Sep 9, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/containers/concepts/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A Cloudflare Container runs your container image in a full Linux environment on Cloudflare's network, alongside a Worker. The Worker handles incoming HTTP requests, while the Container provides the runtime, binaries, and languages your application needs. Together, they let you run Linux workloads without managing the underlying infrastructure.

## The Container runtime

_Run Linux workloads alongside your Worker._

A Worker runs code in an isolated JavaScript environment. A Container runs your image in a full Linux environment, so you can bring custom runtimes and binaries when your application needs them. Each Container instance runs inside its own virtual machine, which isolates it from other workloads. The Worker receives inbound HTTP requests and routes them to the Container, so the Container is not exposed directly to end users.

PlayReset

RequestWORKER

A request reaches the Worker, which routes it to a Container running inside its own virtual machine. The Worker remains in front of the Container while the Container serves the request.

For more information, refer to [Lifecycle of a Container](https://developers.cloudflare.com/containers/concepts/architecture/).

## How requests reach a Container

_Route every request through your Worker._

The request begins at your Worker, which uses the [Durable Object](https://developers.cloudflare.com/durable-objects/) layer to identify and reach a Container. This layer coordinates routing and lifecycle behavior, allowing the Container to continue serving requests while it runs. A Container can start when it receives its first request, so the first request may take longer to complete.

Choose an instance identity to send a request

ABReset

RequestWORKERRequestWORKERDURABLE OBJECTAROUTEHOOKSSLEEPDURABLE OBJECTBROUTEHOOKSSLEEPDURABLE OBJECTROUTEHOOKSSLEEPDURABLE OBJECTROUTEHOOKSSLEEP

A request flows from the client to the Worker and then to a Container. The Worker and Durable Object layer coordinate routing and lifecycle behavior before the Container serves the request. If the Container is not already running, it starts as part of that process.

For more information, refer to [Lifecycle of a Container](https://developers.cloudflare.com/containers/concepts/architecture/).

## Container lifecycle

_Start on demand, then stop when idle._

A Container starts when your application needs it, so the first request can take longer while its environment starts. Once running, it serves requests until it becomes inactive; after an inactivity period, it can stop and release its running resources. When another request arrives, the Container can start again.

PlayReset

RequestAwaiting requestnothing runs untila request arrives

The lifecycle begins with a stopped Container and a request that starts it. The Container then serves requests, becomes inactive, and stops again until another request arrives.

For more information, refer to [Lifecycle of a Container](https://developers.cloudflare.com/containers/concepts/architecture/) and [Pricing](https://developers.cloudflare.com/containers/platform/pricing/).

## Sizing

_Choose resources for your workload._

Container instance sizes let you match resources to your workload. You can choose a predefined size or configure a custom one, with larger sizes providing more CPU, memory, and disk. When choosing a size, consider the resources your application needs and refer to [Limits and instance types](https://developers.cloudflare.com/containers/platform/limits/) for the available options and constraints.

For more information, refer to [Pricing](https://developers.cloudflare.com/containers/platform/pricing/).

## Placement

_Place instances near users or within constraints._

Cloudflare places Container instances across its network, helping applications serve users from suitable locations. You can constrain placement by region or jurisdiction when your workload has location or data residency requirements. You can also run multiple instances when your application needs more capacity.

Choose a location
 to send a request

Reset

Location ALocation BLocation CContainerContainerContainerSchedulerSend requestSend requestSend request

Instances can run in different Cloudflare locations, and requests can be routed to an available instance. Placement constraints can keep instances within a region or jurisdiction when location matters to your application.

For more information, refer to [Placement](https://developers.cloudflare.com/containers/concepts/placement/).

## Storage and connectivity

_Keep durable data outside the local disk._

Treat a Container's local disk as temporary working space, because data on it can be lost when the Container stops or restarts. For data that must persist, use Durable Object storage or Cloudflare storage bindings such as KV, R2, and D1\. Configured outbound handlers let the Container access these bindings and external services without requiring an SDK inside the Container.

ResetPlay

ClientWorkerContainer instancerunningimagemy-app:latestlocal diskPersistent storageKVR2D1Durable Objects

Idle — click Next to step through the request

A Container can reach Cloudflare storage and external services through configured connections. Its local disk is temporary, while data in durable storage persists beyond the Container's lifecycle.

For more information, refer to [Connect to Workers and bindings](https://developers.cloudflare.com/containers/configuration/workers-connections/) and [Outbound traffic](https://developers.cloudflare.com/containers/guides/outbound-traffic/).

## Start building

When you are ready to build, start with a deployed Container or explore the available guides.

### [Get started](https://developers.cloudflare.com/containers/get-started/)

Deploy your first container.

### [Guides](https://developers.cloudflare.com/containers/guides/)

Task-focused walkthroughs for common container workloads.

## Related resources

* [Lifecycle of a Container](https://developers.cloudflare.com/containers/concepts/architecture/): the deep dive on deployment, routing, and shutdown.
* [Placement](https://developers.cloudflare.com/containers/concepts/placement/): where instances run and how to constrain them.
* [Connect to Workers and bindings](https://developers.cloudflare.com/containers/configuration/workers-connections/): reaching Cloudflare resources from a container.
* [Limits and instance types](https://developers.cloudflare.com/containers/platform/limits/) and [Pricing](https://developers.cloudflare.com/containers/platform/pricing/): sizes, account limits, and billing.
* [Rollouts](https://developers.cloudflare.com/containers/configuration/rollouts/): how new versions roll out across instances.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/containers/concepts/#page","headline":"Container Fundamentals · Cloudflare Containers docs","description":"Understand what a Cloudflare Container is, how requests reach it, how it starts and stops, where it runs, and how it holds state.","url":"https://developers.cloudflare.com/containers/concepts/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-09","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
