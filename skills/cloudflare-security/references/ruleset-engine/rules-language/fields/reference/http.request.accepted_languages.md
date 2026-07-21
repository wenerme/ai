---
description: List of language tags provided in the [`Accept-Language`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Accept-Language) HTTP request header.
title: http.request.accepted_languages
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

#  http.request.accepted\_languages

`http.request.accepted_languages` ` Array<String> `

List of language tags provided in the [Accept-Language](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Accept-Language) HTTP request header.

Language tags are sorted by weight (`;q=<weight>`, with a default weight of `1`) in descending order.

If the HTTP header is not present in the request or is empty, `http.request.accepted_languages[0]` will return a "[missing value](https://developers.cloudflare.com/ruleset-engine/rules-language/values/#notes)", which the [concat()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#concat) function will handle as an empty string.

If the HTTP header includes the language tag `*` it will not be stored in the array.

**Note**: This field is only available in [Transform Rules](https://developers.cloudflare.com/rules/transform/).

Example usage:

```txt
# Example 1: Request with header "Accept-Language: fr-CH, fr;q=0.8, en;q=0.9, de;q=0.7, *;q=0.5".
# In this case:
http.request.accepted_languages[0] ==> "fr-CH"
http.request.accepted_languages    ==> ["fr-CH", "en", "fr", "de"]

# Example 2: Request without an `Accept-Language` HTTP header and a URI of "https://www.example.com/my-path".
# In this case:
concat("/", http.request.accepted_languages[0], http.request.uri.path) ==> "//my-path"
```

Categories:
* Request
* Headers

Was this helpful?

YesNo

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.accepted_languages/#page","headline":"http.request.accepted_languages · Cloudflare Ruleset Engine docs","description":"List of language tags provided in the Accept-Language HTTP request header.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.accepted_languages/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
