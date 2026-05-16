---
title: Top Level Domains supported
description: View supported top-level domains for registration.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/registrar/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Top Level Domains supported

Cloudflare supports over 400 [top-level domains (TLDs) ↗](https://www.cloudflare.com/learning/dns/top-level-domain/) and is always evaluating adding new TLDs. We have no specific timeframes for TLDs not yet listed. You can find the full list of supported and coming soon TLDs on the [TLD policies page ↗](https://www.cloudflare.com/tld-policies/).

Note

If you want to register a `.us` domain refer to [Additional requirements for .US domains](https://developers.cloudflare.com/registrar/top-level-domains/us-domains/).

## Domain availability

During your [TLD registration process](https://developers.cloudflare.com/registrar/get-started/register-domain/#how-to-register-a-new-domain), Cloudflare Registrar will inform you if the TLD you are looking for is available to register. If it does not appear in your search list, this means that TLD is not available for registration.

Possible causes for the domain not being available include:

* Someone else owns that domain.
* It is an Internationalized Domain Name (IDN) which Cloudflare Registrar does not support. These domains include international characters (such as `á`, `ü`, among others), or their Punycode equivalents, such as domains beginning with 'xn--'.

## Transfer a domain

When transferring a domain to Cloudflare Registrar, refer to [Domain is in a restricted status](https://developers.cloudflare.com/registrar/troubleshooting/#domain-is-in-a-restricted-status) for statuses that can block a transfer.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/registrar/","name":"Registrar"}},{"@type":"ListItem","position":3,"item":{"@id":"/registrar/top-level-domains/","name":"Top Level Domains supported"}}]}
```
