---
title: Compatibility Dates
description: Configure compatibility dates and flags in Miniflare to match Cloudflare Workers runtime behavior.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# Compatibility Dates

* [Compatibility Dates Reference](https://developers.cloudflare.com/workers/configuration/compatibility-dates)

## Compatibility Dates

Miniflare uses compatibility dates to opt-into backwards-incompatible changes from a specific date. If one isn't set, it will default to some time far in the past.

JavaScript

```

const mf = new Miniflare({

  compatibilityDate: "2021-11-12",

});


```

## Compatibility Flags

Miniflare also lets you opt-in/out of specific changes using compatibility flags:

JavaScript

```

const mf = new Miniflare({

  compatibilityFlags: [

    "formdata_parser_supports_files",

    "durable_object_fetch_allows_relative_url",

  ],

});


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/testing/","name":"Testing"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/testing/miniflare/","name":"Miniflare"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/testing/miniflare/core/","name":"Core"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/testing/miniflare/core/compatibility/","name":"Compatibility Dates"}}]}
```
