---
description: Definitions for terms used across Cloudflare Cache documentation.
title: Glossary
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt
> Use this file to discover all available pages before exploring further.

# Glossary

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cache/glossary/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Review the definitions for terms used across Cloudflare's Cache documentation.

| Term                                                     | Definition                                                                                                                                                                                                                                                                                                           |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cache                                                    | A temporary storage area where frequently accessed data is stored for quick retrieval.                                                                                                                                                                                                                               |
| cache hit                                                | When a requested piece of content is found in the cache, reducing the need to fetch it from the origin server.                                                                                                                                                                                                       |
| cache lock                                               | Cache lock (or mutex) is a mechanism employed by CDN data centers, comprising numerous servers, to prevent the overloading of origin servers. This mechanism ensures that only one server can request a specific file from the origin at any given time, facilitating efficient coordination among the servers.      |
| cache miss                                               | When a requested piece of content is not found in the cache, requiring the server to fetch it from the origin server.                                                                                                                                                                                                |
| cached bandwidth (cached egress bandwidth)               | The amount of bandwidth served from Cloudflare without hitting the origin server. Cached bandwidth is the sum of all EdgeResponseBytes where CacheCacheStatus equals hit, stale, updating, ignored, or revalidated.                                                                                                  |
| cached requests                                          | The number of requests served from Cloudflare without having to hit the origin server. Cached requests are the sum of all requests where CacheCacheStatus equals hit, stale, updating, ignored. This does not include revalidated since the request had to be sent to the origin server.                             |
| caching                                                  | The process of storing copies of files or data in a cache to accelerate future requests.                                                                                                                                                                                                                             |
| dynamic content                                          | Dynamic content refers to website content that changes based on factors specific to the user such as time of visit, location, and device. News websites or social media are examples of this type of content. For this type of website, content has to be fetched from the origin server every time it is requested. |
| edge server                                              | A server located at the edge of a network, typically within a CDN, that serves content to end-users.                                                                                                                                                                                                                 |
| origin bandwidth (origin egress bandwidth)               | The amount of data transferred from the origin server to Cloudflare within a certain period of time. Origin bandwidth is the sum of all EdgeResponseBytes where OriginResponseStatus does not equal 0.                                                                                                               |
| origin server                                            | The original server where the web content is hosted before it is distributed to edge servers in a CDN.                                                                                                                                                                                                               |
| purge                                                    | The process of removing outdated content from the cache to make room for updated content and ensure the delivery of the latest content.                                                                                                                                                                              |
| saved bandwidth (saved egress bandwidth)                 | The percentage of bandwidth saved by caching on the Cloudflare network.                                                                                                                                                                                                                                              |
| static content                                           | Static content, like images, stylesheets, and JavaScript, remains the same for all users. It can be directly served from the cache without fetching from the origin server because it does not change without manual intervention.                                                                                   |
| time-to-live (TTL)                                       | The duration for which a cached copy of a resource is considered valid before it needs to be refreshed or revalidated.                                                                                                                                                                                               |
| total bandwidth (total egress bandwidth, edge bandwidth) | Total bandwidth is the amount of data transferred from Cloudflare to end users within a certain period of time. Total bandwidth equals the sum of all EdgeResponseBytes for a certain period of time.                                                                                                                |
| uncached bandwidth (uncached egress bandwidth)           | Uncached bandwidth is the amount of bandwidth that is not cached and therefore is served from the origin. Uncached bandwidth is the sum of all EdgeResponseBytes where CacheCacheStatus does not equal hit, stale, updating, ignored, or revalidated.                                                                |
| uncached requests                                        | Uncached requests are requests that are not cached and therefore are served from the origin server. Uncached requests are the sum of all requests where CacheCacheStatus does not equal to hit, stale, updating, or ignored.                                                                                         |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/glossary/#page","headline":"Glossary · Cloudflare Cache (CDN) docs","description":"Definitions for terms used across Cloudflare Cache documentation.","url":"https://developers.cloudflare.com/cache/glossary/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
