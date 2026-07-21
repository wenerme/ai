---
description: Learn a few ways to tell if your application is under a DDoS attack.
title: Under a DDoS attack?
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt
> Use this file to discover all available pages before exploring further.

#  Under a DDoS attack?

Last updated Apr 20, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/fundamentals/security/under-ddos-attack/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A distributed denial-of-service (DDoS) attack is where a large number of computers or devices, usually controlled by a single attacker, attempt to access a website or online service all at once. This flood of traffic can overwhelm the website's origin servers, causing the site to slow down or even crash.

sequenceDiagram;
    participant User;
    participant Website;
    participant Server;
    participant Botnet;
    User->>Website: Requests to access site
    Website->>Origin Server: Processes user requests
    Botnet->>Origin Server: Sends a flood of traffic
    Origin Server-->>Website: Slows down due to traffic overload
    Origin Server-->>User: Unable to respond to user requests


## Common signs of an attack

Common signs that you are under DDoS attack include:

* Your site is offline or slow to respond to requests.
* Unexpected spikes appear in the graph of **Requests Through Cloudflare** or **Bandwidth** in your Cloudflare **Analytics** app.
* Strange requests appear in your origin web server logs that do not match normal visitor behavior.

Note

If you are currently under DDoS attack, refer to [Proactive DDoS defense best practices](https://developers.cloudflare.com/ddos-protection/best-practices/proactive-defense/).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/security/under-ddos-attack/#page","headline":"Under a DDoS attack? · Cloudflare Fundamentals docs","description":"Learn a few ways to tell if your application is under a DDoS attack.","url":"https://developers.cloudflare.com/fundamentals/security/under-ddos-attack/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
