---
description: Protect your site from web cache poisoning attacks.
title: Avoid web cache poisoning
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt
> Use this file to discover all available pages before exploring further.

# Avoid web cache poisoning

Last updated May 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cache/cache-security/avoid-web-poisoning/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A cache poisoning attack uses an HTTP request to trick an origin web server into responding with a harmful resource that has the same cache key as a clean request. As a result, the poisoned resource gets cached and served to other users.

A Content Delivery Network (CDN) like Cloudflare relies on cache keys to compare new requests against cached resources. The CDN then determines whether the resource should be served from the cache or requested directly from the origin web server.

## Learn about Cache Poisoning

To deepen your understanding of the risks and vulnerabilities associated with cache poisoning, consult the following resources:

* [Practical Web Cache Poisoning ↗](https://portswigger.net/blog/practical-web-cache-poisoning)
* [How Cloudflare protects customers from cache poisoning ↗](https://blog.cloudflare.com/cache-poisoning-protection/)

## Only cache files that are truly static

Review the caching configuration for your origin web server and ensure you are caching files that are static and do not depend on user input in any way. To learn more about Cloudflare caching, review:

* [Which file extensions does Cloudflare cache for static content?](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/)
* [How Do I Tell Cloudflare What to Cache?](https://developers.cloudflare.com/cache/how-to/cache-rules/)

## Do not trust data in HTTP headers

Attackers can exploit HTTP headers to inject malicious content into cached responses. For example, if your application reflects an untrusted header value in the response body, an attacker could use this to perform cross-site scripting (XSS) through the cache. To reduce this risk:

* Do not rely on values in HTTP headers if they are not part of your [cache key](https://developers.cloudflare.com/cache/how-to/cache-keys/).
* Do not include untrusted header values in your response body.

## Do not trust GET request bodies

Cloudflare caches contents of GET request bodies, but they are not included in the cache key. GET request bodies should be considered untrusted and should not modify the contents of a response. If a GET body can change the contents of a response, consider bypassing cache or using a POST request.

## Monitor web security advisories

To keep informed about Internet security threats, Cloudflare recommends that you monitor web security advisories on a regular basis. Some of the more popular advisories include:

* [Drupal Security Advisories ↗](https://www.drupal.org/security)
* [Symfony Security Advisories ↗](https://symfony.com/blog/category/security-advisories)
* [Laminas Security Advisories ↗](https://getlaminas.org/security/advisories)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/cache-security/avoid-web-poisoning/#page","headline":"Avoid Web Cache Poisoning · Cloudflare Cache (CDN) docs","description":"Protect your site from web cache poisoning attacks.","url":"https://developers.cloudflare.com/cache/cache-security/avoid-web-poisoning/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Security"]}
```
