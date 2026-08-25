---
description: Learn about Cloudflare's network and products.
title: Introduction to Cloudflare
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Introduction to Cloudflare

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/workers/concepts/cloudflare-intro/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Cloudflare ↗](https://www.cloudflare.com/learning/what-is-cloudflare/) is a global network of [servers ↗](https://www.cloudflare.com/learning/cdn/glossary/edge-server/). It is one of the largest [networks ↗](https://www.cloudflare.com/network/) on the Internet.

Cloudflare's product offering is composed of [SASE and SSE services ↗](https://www.cloudflare.com/zero-trust/), [application ↗](https://www.cloudflare.com/application-services/) and [infrastructure services ↗](https://www.cloudflare.com/network-services/), and [Developer Platform ↗](https://www.cloudflare.com/developer-platform/solutions/).

Cloudflare's products offer something to developers, private and public organizations, businesses, governments, and individual consumers.

## Cloudflare Developer Platform

The [Cloudflare Developer Platform ↗](https://www.cloudflare.com/developer-platform/products/) includes [Cloudflare Workers](https://developers.cloudflare.com/workers/), which allows you to deploy serverless code instantly across the globe. You will learn more about [the Developer Platform in this module](https://developers.cloudflare.com/learning-paths/workers/devplat/).

## Built on Cloudflare

If your application is built on Cloudflare, then Cloudflare would act as the origin server of your application.

An example tech stack for an application built on Cloudflare would look like:

* [Domain Registrar](https://developers.cloudflare.com/registrar/) to buy a new your domain.
* [Cloudflare Pages](https://developers.cloudflare.com/pages/) to configure and deploy a front-end site.
* [Cloudflare Workers](https://developers.cloudflare.com/workers/) or [Pages Functions](https://developers.cloudflare.com/pages/functions/) (which are Workers under the hood) to add dynamic functionality to your site.
* [Storage resources](https://developers.cloudflare.com/workers/platform/storage-options/) to persist different types of data.
* [Application security (DDoS protection, WAF, and more) ↗](https://www.cloudflare.com/application-services/products/#security-services) to secure your site.
* [Application performance (CDN, Load Balancing, and more) ↗](https://www.cloudflare.com/application-services/products/#performance-services) to customize and enhance your site's performance.
* [AI](https://developers.cloudflare.com/use-cases/ai/) to run machine learning models.

And more depending on your use case.

## Built with Cloudflare

When you add your application to Cloudflare, Cloudflare's global network of servers will sit in between requests to your application and your application's [origin server ↗](https://www.cloudflare.com/learning/cdn/glossary/origin-server/).

![Cloudflare sits in between requests and your origin server.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1366,height=419,format=svg/_astro/website-with-cloudflare.D3VGvGsa.svg)

After you add your application to [Cloudflare](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/), you can:

* Use Workers to augment the application by deploying code.
* Add storage resources available on the Developer Platform.
* Enhance your application's performance by speeding up content delivery and user experience ([CDN ↗](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/)).
* Protect your website from malicious activity ([DDoS ↗](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/) by configuring the [Web Application Firewall ↗](https://www.cloudflare.com/learning/ddos/glossary/web-application-firewall-waf/)).
* Route traffic ([Load balancing](https://developers.cloudflare.com/load-balancing/), [Waiting Room](https://developers.cloudflare.com/waiting-room/)).

And more depending on your use case.

## Summary

By reading this page, you have:

* Learned the scale of Cloudflare's global network.
* Explored the product offering to know what Cloudflare can offer for users like you.
* Reviewed how you can build your applications with Cloudflare and Cloudflare Workers.

In the next section, you will be introduced to the fundamentals of serverless computing, the concept behind Cloudflare Workers.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/workers/concepts/cloudflare-intro/#page","headline":"Introduction to Cloudflare · Cloudflare Learning Paths","description":"Learn about Cloudflare's network and products.","url":"https://developers.cloudflare.com/learning-paths/workers/concepts/cloudflare-intro/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
