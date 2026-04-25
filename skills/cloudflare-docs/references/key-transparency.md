---
title: Key Transparency Auditor
description: Secure public key distribution in end-to-end encrypted messaging systems.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Key Transparency Auditor

Secure the distribution of public keys in your end-to-end encrypted (E2EE) messaging systems

Cloudflare's Key Transparency Auditor aims to secure the distribution of public keys for end-to-end encrypted (E2EE) messaging systems like [WhatsApp ↗](https://engineering.fb.com/2023/04/13/security/whatsapp-key-transparency/). It achieves this by building a verifiable append-only data structure called a Log, similar to [Certificate Transparency ↗](https://developer.mozilla.org/en-US/docs/Web/Security/Certificate%5FTransparency).

Cloudflare acts as an auditor of Key Transparency Logs to ensure the transparency of end-to-end encrypted messaging public keys. Cloudflare provides an API for anyone to monitor the verification work we perform, and verify the state of its associated Logs locally.

## Related products

**[Certificate Transparency Monitoring](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/certificate-transparency-monitoring/)** 

Certificate Transparency (CT) Monitoring is an opt-in feature in public beta that aims to improve security by allowing you to double-check any SSL/TLS certificates issued for your domain.

**[Privacy Gateway](https://developers.cloudflare.com/privacy-gateway/)** 

Privacy Gateway is a managed service deployed on Cloudflare's global network that implements part of the [Oblivious HTTP (OHTTP) IETF ↗](https://www.ietf.org/archive/id/draft-thomson-http-oblivious-01.html) standard. The goal of Privacy Gateway and Oblivious HTTP is to hide the client's IP address when interacting with an application backend.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/key-transparency/","name":"Key Transparency Auditor"}}]}
```
