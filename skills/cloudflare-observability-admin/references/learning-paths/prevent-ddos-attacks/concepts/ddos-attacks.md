---
description: Learn about what is a ddos attack? in this guide.
title: What is a DDoS attack?
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# What is a DDoS attack?

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/concepts/ddos-attacks/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

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


To understand this, imagine a candy store with only a few employees. Normally, the employees can handle a steady stream of customers coming in to buy candy. However, if a large crowd of kids rush in all at once, it would be chaos. The employees may struggle to keep up with the demand and the store could become disorganized and overwhelmed.

Similarly, a website's origin servers are designed to handle a certain amount of traffic at any given time, but a DDoS attack can cause an abnormally high amount of traffic to flood the servers all at once. This can cause the website to become unresponsive, leaving legitimate users unable to access the site.

DDoS attacks can be devastating for businesses and organizations that rely on their websites or online services to operate. It can lead to lost revenue, damage to reputation, and potential security risks if the attack is used as a cover for more nefarious activity.

## Additional resources

For more resources on DDoS attacks and how they work, refer to our [Learning Center ↗](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/concepts/ddos-attacks/#page","headline":"What is a DDoS attack? · Cloudflare Learning Paths","description":"Learn about what is a ddos attack? in this guide.","url":"https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/concepts/ddos-attacks/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
