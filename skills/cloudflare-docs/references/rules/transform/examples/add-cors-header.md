---
title: Add a wildcard CORS response header
description: Create a CORS response header transform rule to add an `Access-Control-Allow-Origin` HTTP header to the response with wildcard as static value. (`cookiename=value`).
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Response modification ](https://developers.cloudflare.com/search/?tags=Response%20modification) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/transform/examples/add-cors-header.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Add a wildcard CORS response header

Create a response header transform rule to add an `Access-Control-Allow-Origin` CORS HTTP header to the response with a static wildcard value.

The following response header transform rule adds a header named `Access-Control-Allow-Origin` with a static wildcard value (`*`) to the HTTP response:

Text in **Expression Editor**:

```

(http.host eq "<YOUR_HOSTNAME>")


```

Selected operation under **Modify response header**: _Set static_

**Header name**: `Access-Control-Allow-Origin`

**Value**: `*`

You can also use an expression similar to the following to apply the CORS header to several specific hostnames:

```

(http.host in {"<YOUR_HOSTNAME_1>" "<YOUR_HOSTNAME_2>"})


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/examples/","name":"Transform Rules examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/transform/examples/add-cors-header/","name":"Add a wildcard CORS response header"}}]}
```
