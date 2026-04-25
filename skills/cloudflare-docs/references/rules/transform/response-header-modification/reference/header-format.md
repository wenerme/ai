---
title: Format of HTTP response header names and values
description: Supported header name and value formats for response header modifications.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Format of HTTP response header names and values

The **name** of the HTTP response header you want to set or remove can only contain:

* Alphanumeric characters: `a`\-`z`, `A`\-`Z`, and `0`\-`9`
* The following special characters: `-` and `_`

The **value** of the HTTP response header you want to set can only contain:

* Alphanumeric characters: `a`\-`z`, `A`\-`Z`, and `0`\-`9`
* The following special characters: `` _ :;.,\/"'?!(){}[]@<>=-+*#$&`|~^% ``

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/response-header-modification/","name":"Response Header Transform Rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/transform/response-header-modification/reference/","name":"Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/rules/transform/response-header-modification/reference/header-format/","name":"Format of HTTP response header names and values"}}]}
```
