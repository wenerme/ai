---
description: Secure public key distribution in end-to-end encrypted messaging systems.
title: Key Transparency Auditor
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/key-transparency/llms.txt
> Use this file to discover all available pages before exploring further.

#  Key Transparency Auditor

Last updated May 5, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/key-transparency/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Secure the distribution of public keys in your end-to-end encrypted (E2EE) messaging systems

Cloudflare's Key Transparency Auditor aims to secure the distribution of public keys for end-to-end encrypted (E2EE) messaging systems like [WhatsApp ↗](https://engineering.fb.com/2023/04/13/security/whatsapp-key-transparency/). It achieves this by building a verifiable append-only data structure called a Log, similar to [Certificate Transparency ↗](https://developer.mozilla.org/en-US/docs/Web/Security/Certificate%5FTransparency).

Cloudflare acts as an auditor of Key Transparency Logs to ensure the transparency of end-to-end encrypted messaging public keys. Cloudflare provides an API for anyone to monitor the verification work we perform, and verify the state of its associated Logs locally.

## Related products

[Certificate Transparency Monitoring](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/certificate-transparency-monitoring/)

Certificate Transparency (CT) Monitoring is an opt-in feature in public beta that aims to improve security by allowing you to double-check any SSL/TLS certificates issued for your domain.

[Privacy Gateway](https://developers.cloudflare.com/privacy-gateway/)

Privacy Gateway is a managed service deployed on Cloudflare's global network that implements part of the [Oblivious HTTP (OHTTP) IETF ↗](https://www.ietf.org/archive/id/draft-thomson-http-oblivious-01.html) standard. The goal of Privacy Gateway and Oblivious HTTP is to hide the client's IP address when interacting with an application backend.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/key-transparency/#page","headline":"Overview · Cloudflare Key Transparency Auditor docs","description":"Secure public key distribution in end-to-end encrypted messaging systems.","url":"https://developers.cloudflare.com/key-transparency/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Privacy"]}
```
