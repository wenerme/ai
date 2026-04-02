---
title: http.request.uri.path.extension
description: The lowercased file extension in the URI path without the dot (`.`) character.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/fields/index.yaml) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

#  http.request.uri.path.extension 

`http.request.uri.path.extension` ` String ` 

The lowercased file extension in the URI path without the dot (`.`) character.

This corresponds to the string after the last dot in the URI path, excluding the query string.

If the first character of the last path segment is a dot and the segment does not contain other dot characters, the field value will be an empty string (`""`). Having a dot as the first character does not represent a file extension and is commonly used in UNIX-like systems to denote a hidden file or directory.

Example values:

* If the URI path is `/articles/index.html`, the field value will be `"html"`.
* If the URI path is `/articles/index.`, the field value will be an empty string (`""`).

Example values:

| URI path     | Field value |
| ------------ | ----------- |
| /foo         | ""          |
| /foo.mp3     | "mp3"       |
| /.mp3        | ""          |
| /.foo.mp3    | "mp3"       |
| /foo.tar.bz2 | "bz2"       |
| /foo.        | ""          |
| /foo.MP3     | "mp3"       |

Categories: 
* Request
* URI

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
