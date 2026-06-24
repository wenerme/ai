---
title: Rewrite image paths with several URL segments
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Rewrite image paths with several URL segments

Create a URL rewrite rule (part of Transform Rules) to rewrite any requests for `/images/<FOLDER1>/<FOLDER2>/<FILENAME>` to `/img/<FILENAME>`.

To rewrite paths like `/images/<FOLDER1>/<FOLDER2>/<FILENAME>` — where `<FOLDER1>`, `<FOLDER2>`, and `<FILENAME>` can vary — to `/img/<FILENAME>`, create a URL rewrite rule with a dynamic rewrite of the path component:

Text in **Expression Editor**:

```
http.request.uri.path ~ "^/images/[^/]+/[^/]+/[^/]+$"
```

Text after **Path** \> **Rewrite to** \> _Dynamic_:

```
regex_replace(http.request.uri.path, "^/images/[^/]+/[^/]+/(.+)$", "/img/${1}")
```

For example, this rule would rewrite the `/images/nature/animals/tiger.png` path to `/img/tiger.png`.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/transform/examples/rewrite-several-url-different-url/#page","headline":"Rewrite image paths with several URL segments · Cloudflare Rules docs","description":"Create a URL rewrite rule (part of Transform Rules) to rewrite any requests for /images/\\\u003cFOLDER1>/\\\u003cFOLDER2>/\\\u003cFILENAME> to /img/\\\u003cFILENAME>.","url":"https://developers.cloudflare.com/rules/transform/examples/rewrite-several-url-different-url/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["URL rewrite"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/examples/","name":"Transform Rules examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/transform/examples/rewrite-several-url-different-url/","name":"Rewrite image paths with several URL segments"}}]}
```
