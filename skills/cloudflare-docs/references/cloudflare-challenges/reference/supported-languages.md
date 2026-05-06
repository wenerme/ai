---
title: Supported languages
description: Languages supported by Cloudflare challenge pages, detected via navigator.language.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-challenges/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ Localization ](https://developers.cloudflare.com/search/?tags=Localization) 

# Supported languages

## Multi-language support

Cloudflare Challenges can detect multiple languages and display the localized challenge experience, which is determined by `navigator.language` value. The [Navigator.language read-only property ↗](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language) returns a string representing the preferred language of the user, usually the language of the browser user interface.

For language support specific to Challenge Pages, refer to the table below.

| Language                      | Language code(4 letters) | Language code(2 letters) |
| ----------------------------- | ------------------------ | ------------------------ |
| Arabic (Egypt)                | ar-eg                    | ar                       |
| Chinese (Simplified, China)   | zh-cn                    | zh                       |
| Chinese (Traditional, Taiwan) | zh-tw                    | \--                      |
| Dutch (Netherlands)           | nl-nl                    | nl                       |
| English (United States)       | en-us                    | en                       |
| French (France)               | fr-fr                    | fr                       |
| German (Germany)              | de-de                    | de                       |
| Indonesian (Indonesia)        | id-id                    | id                       |
| Italian (Italy)               | it-it                    | it                       |
| Japanese (Japan)              | ja-jp                    | ja                       |
| Korean (Korea)                | ko-kr                    | ko                       |
| Persian                       | \--                      | fa                       |
| Polish (Poland)               | pl-pl                    | pl                       |
| Portuguese (Brazil)           | pt-br                    | pt                       |
| Russian (Russia)              | ru-ru                    | ru                       |
| Spanish (Spain)               | es-es                    | es                       |
| Turkish (Turkey)              | tr-tr                    | tr                       |

### Turnstile language support

For language support specific to Turnstile, refer to the [Turnstile documentation](https://developers.cloudflare.com/turnstile/reference/supported-languages/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-challenges/","name":"Challenges"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-challenges/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-challenges/reference/supported-languages/","name":"Supported languages"}}]}
```
