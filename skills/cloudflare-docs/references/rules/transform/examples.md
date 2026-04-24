---
title: Transform Rules examples
description: Example Transform Rules for URL rewrites and header modifications.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/transform/examples/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Transform Rules examples

Filter resources...

[Add a wildcard CORS response headerCreate a CORS response header transform rule to add an Access-Control-Allow-Origin HTTP header to the response with wildcard as static value. (cookiename=value).](https://developers.cloudflare.com/rules/transform/examples/add-cors-header/)[Add a request header with the current bot scoreCreate a request header transform rule to add a X-Bot-Score HTTP header to the request with the current bot score.](https://developers.cloudflare.com/rules/transform/examples/add-request-header-bot-score/)[Add request header with a static valueCreate a request header transform rule to add an X-Source HTTP header to the request with a static value (Cloudflare).](https://developers.cloudflare.com/rules/transform/examples/add-request-header-static-value/)[Add a request header for subrequests from other zonesCreate a request header transform rule to add an HTTP header when the Workers subrequest comes from a different zone.](https://developers.cloudflare.com/rules/transform/examples/add-request-header-subrequest-other-zone/)[Add a response header with a static valueCreate a response header transform rule to add a set-cookie HTTP header to the response with a static value (cookiename=value).](https://developers.cloudflare.com/rules/transform/examples/add-response-header-static-value/)[Normalize encoded slashes in URL pathCreate a URL rewrite rule (part of Transform Rules) to normalize encoded forward slashes (%2F) in the request path to standard slashes (/).](https://developers.cloudflare.com/rules/transform/examples/normalize-encoded-slash/)[Remove a request headerCreate a request header transform rule (part of Transform Rules) to remove the cf-connecting-ip HTTP header from the request.](https://developers.cloudflare.com/rules/transform/examples/remove-request-header/)[Remove a response headerCreate a response header transform rule (part of Transform Rules) to remove the cf-connecting-ip HTTP header from the response.](https://developers.cloudflare.com/rules/transform/examples/remove-response-header/)[Rewrite blog archive URLsCreate a transform rule to rewrite the URL format /posts/<YYYY>-<MM>-<DD>-<TITLE> to the new format /posts/<YYYY>/<MM>/<DD>/<TITLE>.](https://developers.cloudflare.com/rules/transform/examples/rewrite-archive-urls-new-format/)[Rewrite path of moved section of a websiteCreate a URL rewrite rule (part of Transform Rules) to rewrite everything under /blog/<PATH> to /marketing/<PATH>.](https://developers.cloudflare.com/rules/transform/examples/rewrite-moved-section/)[Rewrite path of archived blog postsCreate a URL rewrite rule (part of Transform Rules) to rewrite any requests for /news/2012/... URI paths to /archive/news/2012/....](https://developers.cloudflare.com/rules/transform/examples/rewrite-path-archived-posts/)[Rewrite path for object storage bucketCreate a URL rewrite rule (part of Transform Rules) to rewrite any requests for /files/... URI paths to /....](https://developers.cloudflare.com/rules/transform/examples/rewrite-path-object-storage/)[Rewrite image paths with several URL segmentsCreate a URL rewrite rule (part of Transform Rules) to rewrite any requests for /images/<FOLDER1>/<FOLDER2>/<FILENAME> to /img/<FILENAME>.](https://developers.cloudflare.com/rules/transform/examples/rewrite-several-url-different-url/)[Rewrite URL query stringCreate a transform rule to rewrite the request path from /blog to /blog?sort-by=date.](https://developers.cloudflare.com/rules/transform/examples/rewrite-url-string-visitors/)[Rewrite page path for visitors in specific countriesCreate two URL rewrite rules (part of Transform Rules) to rewrite the path of the welcome page for visitors in specific countries.](https://developers.cloudflare.com/rules/transform/examples/rewrite-welcome-for-countries/)[Set a response header with the current bot scoreCreate a response header transform rule (part of Transform Rules) to set an X-Bot-Score HTTP header in the response with the current bot score.](https://developers.cloudflare.com/rules/transform/examples/set-response-header-bot-score/)[Set response header with a static valueCreate a response header transform rule (part of Transform Rules) to set an X-Bot-Score HTTP header in the response to a static value (Cloudflare).](https://developers.cloudflare.com/rules/transform/examples/set-response-header-static-value/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/examples/","name":"Transform Rules examples"}}]}
```
