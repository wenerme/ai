---
description: Understand what data Cloudflare sees, stores, and shares when operating the Privacy Gateway relay service.
title: Legal
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/privacy-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Legal

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/privacy-gateway/reference/legal/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Privacy Gateway is a managed gateway service deployed on Cloudflare’s global network that implements the Oblivious HTTP IETF standard to improve client privacy when connecting to an application backend.

OHTTP introduces a trusted third party (Cloudflare in this case), called a relay, between client and server. The relay’s purpose is to forward requests from client to server, and likewise to forward responses from server to client. These messages are encrypted between client and server such that the relay learns nothing of the application data, beyond the server the client is interacting with.

The Privacy Gateway service follows [Cloudflare’s privacy policy ↗](https://www.cloudflare.com/privacypolicy/).

## What Cloudflare sees

While Cloudflare will never see the contents of the encrypted application HTTP request proxied through the Privacy Gateway service – because the client will first connect to the OHTTP relay server operated in Cloudflare’s global network– Cloudflare will see the following information: the connecting device’s IP address, the application service they are using, including its DNS name and IP address, and metadata associated with the request, including the type of browser, device operating system, hardware configuration, and timestamp of the request ("Privacy Gateway Logs").

## What Cloudflare stores

Cloudflare retains the Privacy Gateway Logs information for the most recent quarter plus one month (approximately 124 days).

## What Privacy Gateway customers see

* The application content of requests.
* The IP address and associated metadata of the Cloudflare Privacy Gateway server the request came from.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/privacy-gateway/reference/legal/#page","headline":"Legal · Cloudflare Privacy Gateway docs","description":"Understand what data Cloudflare sees, stores, and shares when operating the Privacy Gateway relay service.","url":"https://developers.cloudflare.com/privacy-gateway/reference/legal/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
