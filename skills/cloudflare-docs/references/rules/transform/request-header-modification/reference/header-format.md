---
title: Format of HTTP request header names and values
description: Supported header name and value formats for request header modifications.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ Headers ](https://developers.cloudflare.com/search/?tags=Headers) 

# Format of HTTP request header names and values

The **name** of the HTTP request header you want to set or remove can only contain:

* Alphanumeric characters: `a`\-`z`, `A`\-`Z`, and `0`\-`9`
* The following special characters: `-` and `_`

The **value** of the HTTP request header you want to set can only contain:

* Alphanumeric characters: `a`\-`z`, `A`\-`Z`, and `0`\-`9`
* The following special characters: `` _ :;.,\/"'?!(){}[]@<>=-+*#$&`|~^% ``

The maximum length of the HTTP request header value is 4 KB (\~4,096 characters).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/request-header-modification/","name":"Request Header Transform Rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/transform/request-header-modification/reference/","name":"Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/rules/transform/request-header-modification/reference/header-format/","name":"Format of HTTP request header names and values"}}]}
```
