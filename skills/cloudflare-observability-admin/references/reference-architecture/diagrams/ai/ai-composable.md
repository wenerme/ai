---
description: The architecture diagram illustrates how AI applications can be built end-to-end on Cloudflare, or single services can be integrated with external infrastructure and services.
title: Composable AI architecture
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/reference-architecture/llms.txt
> Use this file to discover all available pages before exploring further.

# Composable AI architecture

Last updated Oct 13, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/reference-architecture/diagrams/ai/ai-composable/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Introduction

The AI market is witnessing a rapid evolution, propelled by the swift pace of technological advancement. With breakthroughs occurring frequently, staying up-to-date with the latest innovations is imperative for organizations aiming to remain competitive. Short iteration cycles and agility have become indispensable in this landscape, allowing businesses to swiftly adopt and leverage the newest advancements in AI technology.

In this dynamic environment, the concept of composability, data portability, and standard APIs emerges as crucial factors in navigating the complexities of the AI ecosystem:

* Composability refers to the ability to assemble various AI components into tailored solutions, enabling organizations to mix and match different technologies to suit their specific needs.
* Data portability plays a pivotal role in facilitating seamless data exchange between different AI systems and platforms, ensuring interoperability and preventing data silos.
* Standard APIs for interoperability serve as the linchpin for integrating diverse AI components, enabling seamless communication and collaboration between disparate systems.

The significance of composability, data portability, and standard APIs becomes particularly pronounced in mitigating vendor lock-in and fostering flexibility. By embracing these principles, organizations can sidestep dependency on single vendors and instead opt for a best-in-class approach, selecting the most suitable solutions for their unique requirements. Overall, these principles pave the way for a more agile, adaptable, and future-proof AI ecosystem.

Cloudflare's AI platform has been designed with these principles in mind. The architecture diagram illustrates how AI applications can be built end-to-end on Cloudflare, or single services can be integrated with external infrastructure and services.

## Composable AI infrastructure

![Figure 1: Composable AI architecture](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1200,height=639,format=svg/_astro/ai-composable.CBIbt7we.svg "Figure 1: Composable AI architecture")

Figure 1: Composable AI architecture

1. **Compute**: The compute layer is the core of the application. All business logic, as well as use of other components, is defined here. The compute layer interacts with other services such as inference services, vector search, databases and data storage. Serverless solutions such as [Cloudflare Workers](https://developers.cloudflare.com/workers/) offer fast iteration and automatic scaling, which allows developers to focus on the use case instead of infrastructure management. Importantly for composability is the support of standard interfaces such as HTTP or TCP, which the Workers' runtime both supports via the [fetch() API](https://developers.cloudflare.com/workers/runtime-apis/fetch/) and [connect() API](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/) respectively.
2. **Inference**: AI inference is responsible for the AI-capabilities of the application. Operational models vary between self-hosting models or consuming Inference-as-a-service providers such as [Workers AI](https://developers.cloudflare.com/workers-ai/). In the latter case, [REST APIs](https://developers.cloudflare.com/api/resources/ai/methods/run/) make interacting with inference services from any service/client easy to implement. Using platform-specific integrations such as [Bindings](https://developers.cloudflare.com/workers-ai/configuration/bindings/) for interaction between Workers and other services enable simplified development as complexity such as authentication is abstracted away.
3. **Vector Search**: Certain use cases such as [RAG](https://developers.cloudflare.com/reference-architecture/diagrams/ai/ai-rag/) leverage vector search for similarity matching. Operational models vary between self-hosting databases or consuming vector-specific database-as-a-service (DBaaS) providers such as [Vectorize](https://developers.cloudflare.com/vectorize/). In the latter case, [REST APIs](https://developers.cloudflare.com/api/resources/vectorize/subresources/indexes/methods/list/) make interacting with it from any service/client easy to implement. Using platform-specific integrations such as [Bindings](https://developers.cloudflare.com/vectorize/get-started/embeddings/#3-bind-your-worker-to-your-index) for interaction between Workers and other services enable simplified development as complexity such as authentication is abstracted away.
4. **Data & Storage**: Databases and data storage add state to AI applications. User management, session storage and persisting data are common requirements for AI applications. Depending on the use case, different solutions are required such as relationship databases or object storage. A variety of solutions for self-hosted or managed services exist. On Cloudflare, this could be for instance [D1](https://developers.cloudflare.com/d1/) and [R2](https://developers.cloudflare.com/r2/). REST APIs make interacting with inference services from any service/client easy to implement. Using platform-specific integrations such as Bindings for interaction between Workers and data and database services enable simplified development as complexity such as authentication is abstracted away.

## Related resources

* [Workers: Serverless compute](https://developers.cloudflare.com/workers/)
* [Workers AI: Serverless AI inference](https://developers.cloudflare.com/workers-ai/)
* [Vectorize: Serverless Vector database](https://developers.cloudflare.com/vectorize/)
* [D1: Serverless SQLite database](https://developers.cloudflare.com/d1/)
* [R2: Object storage](https://developers.cloudflare.com/r2/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/reference-architecture/diagrams/ai/ai-composable/#page","headline":"Composable AI architecture · Cloudflare Reference Architecture docs","description":"The architecture diagram illustrates how AI applications can be built end-to-end on Cloudflare, or single services can be integrated with external infrastructure and services.","url":"https://developers.cloudflare.com/reference-architecture/diagrams/ai/ai-composable/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
