---
description: Subscribe to events from Cloudflare services to build custom workflows, integrations, and logic with Workers.
title: Event subscriptions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/queues/llms.txt
> Use this file to discover all available pages before exploring further.

# Event subscriptions

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/queues/event-subscriptions/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Event subscriptions allow you to receive messages when events occur across your Cloudflare account. Cloudflare products (e.g., [KV](https://developers.cloudflare.com/kv/), [Workers AI](https://developers.cloudflare.com/workers-ai), [Workers](https://developers.cloudflare.com/workers)) can publish structured events to a queue, which you can then consume with Workers or [HTTP pull consumers](https://developers.cloudflare.com/queues/configuration/pull-consumers/) to build custom workflows, integrations, or logic.

![Event subscriptions architecture](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=924,height=403,format=webp/_astro/queues-event-subscriptions.3aVidnXJ.png)

## What is an event?

An event is a structured record of something happening in your Cloudflare account – like a Workers AI batch request being queued, a Worker build completing, or an R2 bucket being created. When you subscribe to these events, your queue will automatically start receiving messages when the events occur.

## Learn more

### [Manage event subscriptions](https://developers.cloudflare.com/queues/event-subscriptions/manage-event-subscriptions/)

Learn how to create, configure, and manage event subscriptions for your queues.

### [Events & schemas](https://developers.cloudflare.com/queues/event-subscriptions/events-schemas/)

Explore available event types and their corresponding data schemas.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/queues/event-subscriptions/#page","headline":"Event subscriptions overview · Cloudflare Queues docs","description":"Subscribe to events from Cloudflare services to build custom workflows, integrations, and logic with Workers.","url":"https://developers.cloudflare.com/queues/event-subscriptions/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
