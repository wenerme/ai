---
description: Run Cloudflare Workers on HTTP traffic permitted by Gateway to transform requests and responses or run background tasks.
title: Integrate Workers
image: https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/og.png?v=17e8795f9cbfd5c6
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Integrate Workers

Last updated Oct 15, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Public beta

The Gateway Forward action is available in public beta on all Zero Trust plans. Workers usage is subject to [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/).

Use Cloudflare Workers to add your own logic to HTTP traffic that passes through Gateway. A Gateway HTTP policy with the **Forward** action sends matching, permitted traffic to a Worker in your account. The Worker can modify a request, transform a response, return its own response, or start background work such as a notification or an R2 write. You can write your own Worker for your use case or adapt a [Worker template](https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/worker-templates/).

Gateway handles the proxy connection, TLS decryption, and upstream routing. Your Worker receives standard `Request` and `Response` objects and [Gateway context](https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/available-context/) about the connection, policy, and user.

Gateway evaluates HTTP request policies before Forward policies. Body policies and inspection run after Worker invocation and can interrupt the Worker if they block the request.

A Forward policy does not override a Block policy or replace Gateway inspection. Refer to [How Forward works](https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/forward-traffic/#how-it-works) for the request and response inspection order.

WebSocket traffic connects directly to the original upstream service and bypasses the Worker. Refer to [Known limitations](https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/forward-traffic/#known-limitations) for protocol restrictions and other constraints.

- [Forward traffic](https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/forward-traffic/): Deploy a Worker and select it in a Gateway HTTP policy.
- [Available context](https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/available-context/): Read connection metadata, user identity, and device posture.
- [Worker templates](https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/worker-templates/): Start with a small script for notifications, capture, or content transformation.

The [gateway-workers skill ↗︎](https://github.com/cloudflare/skills/blob/main/skills/gateway-workers/SKILL.md) provides guidance for coding agents building or reviewing Workers used in Forward policies.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/#page","headline":"Integrate Workers","description":"Run Cloudflare Workers on HTTP traffic permitted by Gateway to transform requests and responses or run background tasks.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/og.png?v=17e8795f9cbfd5c6","dateModified":"2026-10-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
