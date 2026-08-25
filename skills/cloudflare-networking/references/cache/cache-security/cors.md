---
description: How Cloudflare handles CORS headers and cross-origin resource caching.
title: Cross-Origin Resource Sharing (CORS)
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt
> Use this file to discover all available pages before exploring further.

# Cross-Origin Resource Sharing (CORS)

Last updated May 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cache/cache-security/cors/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A cross-origin request occurs when a webpage on one origin (for example, `a.example.com`) requests a resource from a different origin (for example, `b.secondexample.com`). Cross-Origin Resource Sharing (CORS) is a mechanism that uses HTTP headers to let the server at `b.secondexample.com` indicate whether `a.example.com` is allowed to access its resources. Browsers enforce these headers and block access to responses that are not permitted.

Cloudflare supports CORS by:

* Identifying cached assets based on the `Host` Header, `Origin` Header, URL path, and query. This allows different resources to use the same `Host` header but different `Origin` headers.
* Passing `Access-Control-Allow-Origin` headers from the origin server to the browser.

The `Access-Control-Allow-Origin` header lets a server specify rules for sharing its resources with external origins. A server may respond with different `Access-Control-Allow-Origin` values depending on the `Origin` header in the request. These headers are often present on [cacheable content](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/).

## Add or change CORS headers at the origin server

If you add or change CORS configuration at your origin web server, purging the Cloudflare cache by URL does not update the CORS headers. Force Cloudflare to retrieve the new CORS headers via one of the following options:

* Change the filename or URL to bypass cache to instruct Cloudflare to retrieve the latest CORS headers.
* Use the [single-file purge API](https://developers.cloudflare.com/api/resources/cache/methods/purge/#purge-cached-content-by-url) to specify the appropriate CORS headers along with the purge request.
* Update the resource’s last-modified time at your origin web server. Then, complete a [full purge](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-everything/) to retrieve the latest version of your assets including updated CORS headers.

## Add or change CORS headers on Cloudflare

You can use one of following methods to set CORS headers using Cloudflare products:

* Use a [Worker](https://developers.cloudflare.com/workers/): Refer to [CORS header proxy](https://developers.cloudflare.com/workers/examples/cors-header-proxy/) for an example.
* Configure a [Snippet](https://developers.cloudflare.com/rules/snippets/): Refer to [Define CORS headers](https://developers.cloudflare.com/rules/snippets/examples/define-cors-headers/) for an example.
* Use [Transform Rules](https://developers.cloudflare.com/rules/transform/): Refer to [Add a wildcard CORS response header](https://developers.cloudflare.com/rules/transform/examples/add-cors-header/) for an example.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/cache-security/cors/#page","headline":"Cross-Origin Resource Sharing (CORS) · Cloudflare Cache (CDN) docs","description":"How Cloudflare handles CORS headers and cross-origin resource caching.","url":"https://developers.cloudflare.com/cache/cache-security/cors/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["CORS"]}
```
