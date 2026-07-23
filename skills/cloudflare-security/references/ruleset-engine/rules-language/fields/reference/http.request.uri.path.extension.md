---
description: The lowercased file extension in the URI path without the dot (`.`) character.
title: http.request.uri.path.extension
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# http.request.uri.path.extension

`http.request.uri.path.extension` `String`

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

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.uri.path.extension/#page","headline":"http.request.uri.path.extension · Cloudflare Ruleset Engine docs","description":"The lowercased file extension in the URI path without the dot (.) character.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.uri.path.extension/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
