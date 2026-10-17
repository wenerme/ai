---
description: How Cloudflare handles your data, inputs, and outputs when using Workers AI.
title: Data usage
image: https://developers.cloudflare.com/workers-ai/platform/data-usage/og.png?v=6011ae828b9cf78a
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Data usage

Last updated Oct 16, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers-ai/platform/data-usage/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare processes certain customer data to provide Workers AI, subject to our [Privacy Policy ↗︎](https://www.cloudflare.com/privacypolicy/) and, as applicable, our [Self-Serve Subscription Agreement ↗︎](https://www.cloudflare.com/terms/) or [Enterprise Subscription Agreement ↗︎](https://www.cloudflare.com/enterpriseterms/) ("Agreements").

Your inputs (for example, text prompts, images, and audio), outputs (for example, generated text, images, and translations), embeddings, and any training or adaptation data you provide are **Customer Content** as that term is defined in our Agreements.

This page applies to Workers AI. If you use AI Gateway to send Customer Content to another AI provider or connect Workers AI to another third-party service, that provider or service may process and retain the content under its own terms and policies.

## Our commitments for Customer Content

**Zero data retention:** Workers AI processes Customer Content only for as long as needed to provide the service. For standard inference requests that do not invoke a stateful feature, Cloudflare does not retain inputs or outputs after they are no longer needed to process the request and deliver the response, subject to the limited exceptions below.

**No training:** Cloudflare does not use Customer Content processed by Workers AI to train AI models.

**Your content remains yours:** You own, and are responsible for, your Customer Content. Cloudflare does not make it available to other Cloudflare customers.

## When a feature stores Customer Content

Some features require storage to work. Our zero data retention commitment does not prevent storage that you direct or that is necessary to provide a stateful feature you select.

For example, Customer Content may be stored when you:

- use a Cloudflare storage service, such as R2, KV, Durable Objects, or Vectorize, with Workers AI;
- enable logging or caching in AI Gateway or write Customer Content to application logs; or
- where offered, use an asynchronous or batch feature, upload files or adapters, or select another stateful feature that requires content to remain available while the feature operates.

In those cases, the applicable feature documentation, configuration, and retention lifecycle govern the stored content. Cloudflare retains that content only for as long as needed to provide the feature or as directed by you.

## Operational metadata

Cloudflare may retain operational metadata needed to operate, secure, support, and bill for Workers AI. This may include account and model identifiers, timestamps, request and response sizes, token or neuron counts, latency, request source, and normalized status or error codes. Operational metadata retained under this section does not include Customer Content. For more information on the information we may collect, see the Cloudflare Privacy Policy.

## Safety, security, and legal exceptions

To the extent Cloudflare must analyze or retain Customer Content to fulfill our legal obligations or commitments, as described in our Agreements or our Privacy Policy, such Customer Content is not used to train AI models or improve Cloudflare or third-party products or services.

## Models available through Workers AI

Cloudflare does not create or train the third-party AI models made available through Workers AI. Those models may be subject to open source, acceptable use policies, or other license terms between you and the model provider. Review the license terms applicable to each model.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/platform/data-usage/#page","headline":"Data usage","description":"How Cloudflare handles your data, inputs, and outputs when using Workers AI.","url":"https://developers.cloudflare.com/workers-ai/platform/data-usage/","inLanguage":"en","image":"https://developers.cloudflare.com/workers-ai/platform/data-usage/og.png?v=6011ae828b9cf78a","dateModified":"2026-10-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
