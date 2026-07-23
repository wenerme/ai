---
description: Example Transform Rules for URL rewrites and header modifications.
title: Transform Rules examples
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Transform Rules examples

Last updated May 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/transform/examples/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[**Add a wildcard CORS response header**Create a CORS response header transform rule to add an Access-Control-Allow-Origin HTTP header to the response with wildcard as static value. (cookiename=value).](https://developers.cloudflare.com/rules/transform/examples/add-cors-header/)

[**Add a request header with the current bot score**Create a request header transform rule to add a X-Bot-Score HTTP header to the request with the current bot score.](https://developers.cloudflare.com/rules/transform/examples/add-request-header-bot-score/)

[**Add request header with a static value**Create a request header transform rule to add an X-Source HTTP header to the request with a static value (Cloudflare).](https://developers.cloudflare.com/rules/transform/examples/add-request-header-static-value/)

[**Add a request header for subrequests from other zones**Create a request header transform rule to add an HTTP header when the Workers subrequest comes from a different zone.](https://developers.cloudflare.com/rules/transform/examples/add-request-header-subrequest-other-zone/)

[**Add a response header with a static value**Create a response header transform rule to add a set-cookie HTTP header to the response with a static value (cookiename=value).](https://developers.cloudflare.com/rules/transform/examples/add-response-header-static-value/)

[**Normalize encoded slashes in URL path**Create a URL rewrite rule (part of Transform Rules) to normalize encoded forward slashes (%2F) in the request path to standard slashes (/).](https://developers.cloudflare.com/rules/transform/examples/normalize-encoded-slash/)

[**Remove a request header**Create a request header transform rule (part of Transform Rules) to remove the cf-connecting-ip HTTP header from the request.](https://developers.cloudflare.com/rules/transform/examples/remove-request-header/)

[**Remove a response header**Create a response header transform rule (part of Transform Rules) to remove the cf-connecting-ip HTTP header from the response.](https://developers.cloudflare.com/rules/transform/examples/remove-response-header/)

[**Rewrite blog archive URLs**Create a transform rule to rewrite the URL format /posts/<YYYY>-<MM>-<DD>-<TITLE> to the new format /posts/<YYYY>/<MM>/<DD>/<TITLE>.](https://developers.cloudflare.com/rules/transform/examples/rewrite-archive-urls-new-format/)

[**Rewrite path of moved section of a website**Create a URL rewrite rule (part of Transform Rules) to rewrite everything under /blog/<PATH> to /marketing/<PATH>.](https://developers.cloudflare.com/rules/transform/examples/rewrite-moved-section/)

[**Rewrite path of archived blog posts**Create a URL rewrite rule (part of Transform Rules) to rewrite any requests for /news/2012/... URI paths to /archive/news/2012/....](https://developers.cloudflare.com/rules/transform/examples/rewrite-path-archived-posts/)

[**Rewrite path for object storage bucket**Create a URL rewrite rule (part of Transform Rules) to rewrite any requests for /files/... URI paths to /....](https://developers.cloudflare.com/rules/transform/examples/rewrite-path-object-storage/)

[**Rewrite image paths with several URL segments**Create a URL rewrite rule (part of Transform Rules) to rewrite any requests for /images/<FOLDER1>/<FOLDER2>/<FILENAME> to /img/<FILENAME>.](https://developers.cloudflare.com/rules/transform/examples/rewrite-several-url-different-url/)

[**Rewrite URL query string**Create a transform rule to rewrite the request path from /blog to /blog?sort-by=date.](https://developers.cloudflare.com/rules/transform/examples/rewrite-url-string-visitors/)

[**Rewrite page path for visitors in specific countries**Create two URL rewrite rules (part of Transform Rules) to rewrite the path of the welcome page for visitors in specific countries.](https://developers.cloudflare.com/rules/transform/examples/rewrite-welcome-for-countries/)

[**Set a response header with the current bot score**Create a response header transform rule (part of Transform Rules) to set an X-Bot-Score HTTP header in the response with the current bot score.](https://developers.cloudflare.com/rules/transform/examples/set-response-header-bot-score/)

[**Set response header with a static value**Create a response header transform rule (part of Transform Rules) to set an X-Bot-Score HTTP header in the response to a static value (Cloudflare).](https://developers.cloudflare.com/rules/transform/examples/set-response-header-static-value/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/rules/transform/examples/#page","headline":"Transform Rules examples · Cloudflare Rules docs","description":"Example Transform Rules for URL rewrites and header modifications.","url":"https://developers.cloudflare.com/rules/transform/examples/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
