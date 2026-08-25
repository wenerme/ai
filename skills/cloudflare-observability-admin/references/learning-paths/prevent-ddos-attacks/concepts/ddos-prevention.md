---
description: Learn about how to prevent ddos attacks in this guide.
title: How to prevent DDoS attacks
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# How to prevent DDoS attacks

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/concepts/ddos-prevention/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Since DDoS attacks target your web servers, the way to prevent them is to reduce requests reaching those servers.

flowchart TD;
    A[Malicious device]-->|Request to application|CDN;
    CDN -->|Sends remaining requests|Origin;
    subgraph CDN
        WAF
        Cache
    end
    A --Prevent external connections---x Origin


Requests can come to your origin server in two ways, from your web application and from direct connections to the server itself.

---

## Reduce application requests to the origin

### Caching

A cache stores copies of frequently accessed resources (images, CSS files).

When a resource is cached - either on a user's browser or Content Delivery Network (CDN) server - requests for that resource do not have to go to your origin server. Instead, these resources are served directly by the cache.

flowchart TD;
    User-->|Sends Request|Cloudflare;
    Cloudflare-->B>Has cached content?];
    B-->|Yes - Requested content|User;
    B-->|No|Origin;
    Origin-->|Requested content|User;


In the context of DDoS attacks, caching reduces the number of requests going to your origin server, which makes it harder for your server to get overwhelmed by traffic.

### Web Application Firewall (WAF)

A Web Application Firewall (WAF) creates a shield between a web app and the Internet. This shield checks incoming web requests and filters undesired traffic to help mitigate many common attacks.

flowchart TD;
    User-->|Sends Request|WAF;
    WAF-->|Filters Request|Application;
    Application-->|Sends Request|OriginServer;
    OriginServer-->|Serves Content|Application;
    Application-->|Serves Content|User;

## Prevent external connections

Generally, your origin server should only accept requests coming from your web application.

This is a general best practice for security, but especially important in the context of DDoS attacks. Any traffic that bypasses your web application will also bypass any WAF or caching and has a stronger chance of overwhelming your origin.

sequenceDiagram
  participant Client
  participant DDoS_Protection_Service
  participant Origin_Server

  Client->>+DDoS_Protection_Service: Request
  Note right of DDoS_Protection_Service: Filtered traffic
  DDoS_Protection_Service->>+Origin_Server: Request
  Origin_Server-->>-DDoS_Protection_Service: Response
  DDoS_Protection_Service-->>Client: Response

  Client->>+Origin_Server: Direct connection
  Note over Origin_Server: Potential DDoS Attack
  Origin_Server-->>-Client: Error response

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/concepts/ddos-prevention/#page","headline":"How to prevent DDoS attacks · Cloudflare Learning Paths","description":"Learn about how to prevent ddos attacks in this guide.","url":"https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/concepts/ddos-prevention/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
