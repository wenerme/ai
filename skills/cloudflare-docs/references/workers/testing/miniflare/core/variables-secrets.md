---
title: Variables and Secrets
description: Variables and secrets are bound as follows:
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers/testing/miniflare/core/variables-secrets.md) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Variables and Secrets

## Bindings

Variables and secrets are bound as follows:

JavaScript

```

const mf = new Miniflare({

  bindings: {

    KEY1: "value1",

    KEY2: "value2",

  },

});


```

## Text and Data Blobs

Text and data blobs can be loaded from files. File contents will be read and bound as `string`s and `ArrayBuffer`s respectively.

JavaScript

```

const mf = new Miniflare({

  textBlobBindings: { TEXT: "text.txt" },

  dataBlobBindings: { DATA: "data.bin" },

});


```

## Globals

Injecting arbitrary globals is not supported by [workerd ↗](https://github.com/cloudflare/workerd). If you're using a service Worker, bindings will be injected as globals, but these must be JSON-serializable.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/testing/","name":"Testing"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/testing/miniflare/","name":"Miniflare"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/testing/miniflare/core/","name":"Core"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/testing/miniflare/core/variables-secrets/","name":"Variables and Secrets"}}]}
```
