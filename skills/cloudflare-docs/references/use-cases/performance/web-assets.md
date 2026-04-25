---
title: Optimize web assets
description: Speed up page rendering by minifying HTML, CSS, and JavaScript and loading third-party scripts server-side.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

# Optimize web assets

Unoptimized HTML, CSS, and JavaScript increase page weight and slow down rendering. Cloudflare Speed automatically minifies and compresses these assets, while Zaraz loads third-party analytics and marketing tags server-side to avoid blocking page rendering.

## Solutions

### Speed

Improve the performance of your website or web application. [Learn more about Speed](https://developers.cloudflare.com/speed/).

* **Minification** \- Remove whitespace and unnecessary characters from HTML, CSS, and JavaScript automatically
* **Compression** \- Brotli and Gzip compression applied to all text-based assets at the edge
* **Core Web Vitals** \- Improve Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS) scores by deferring non-critical scripts and optimizing asset delivery

### Zaraz

Server-side loading of third-party tools to improve performance and privacy. [Learn more about Zaraz](https://developers.cloudflare.com/zaraz/).

* **Third-party optimization** \- Load analytics, marketing tags, and other third-party tools through Cloudflare without blocking page rendering

## Get started

1. [Enable Speed optimizations](https://developers.cloudflare.com/speed/optimization/)
2. [Zaraz get started](https://developers.cloudflare.com/zaraz/get-started/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/performance/","name":"Performance"}},{"@type":"ListItem","position":4,"item":{"@id":"/use-cases/performance/web-assets/","name":"Optimize web assets"}}]}
```
