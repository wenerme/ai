---
title: Rewrite image paths with several URL segments
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ URL rewrite ](https://developers.cloudflare.com/search/?tags=URL%20rewrite) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/transform/examples/rewrite-several-url-different-url.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

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
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/examples/","name":"Transform Rules examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/transform/examples/rewrite-several-url-different-url/","name":"Rewrite image paths with several URL segments"}}]}
```
