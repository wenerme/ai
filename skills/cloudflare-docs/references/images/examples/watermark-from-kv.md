---
title: Watermarks
description: Draw a watermark from KV on an image from R2
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/images/examples/watermark-from-kv.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Watermarks

**Last reviewed:**  about 1 year ago 

Draw a watermark from KV on an image from R2

* [  JavaScript ](#tab-panel-7348)
* [  TypeScript ](#tab-panel-7349)

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    const watermarkKey = "my-watermark";

    const sourceKey = "my-source-image";


    const cache = await caches.open("transformed-images");

    const cacheKey = new URL(sourceKey + "/" + watermarkKey, request.url);

    const cacheResponse = await cache.match(cacheKey);


    if (cacheResponse) {

      return cacheResponse;

    }


    let watermark = await env.NAMESPACE.get(watermarkKey, "stream");

    let source = await env.BUCKET.get(sourceKey);


    if (!watermark || !source) {

      return new Response("Not found", { status: 404 });

    }


    const result = await env.IMAGES.input(source.body)

      .draw(watermark)

      .output({ format: "image/jpeg" });


    const response = result.response();


    ctx.waitUntil(cache.put(cacheKey, response.clone()));


    return response;

  },

};


```

Explain Code

TypeScript

```

interface Env {

  BUCKET: R2Bucket;

  NAMESPACE: KVNamespace;

  IMAGES: ImagesBinding;

}

export default {

  async fetch(request, env, ctx): Promise<Response> {

    const watermarkKey = "my-watermark";

    const sourceKey = "my-source-image";


    const cache = await caches.open("transformed-images");

    const cacheKey = new URL(sourceKey + "/" + watermarkKey, request.url);

    const cacheResponse = await cache.match(cacheKey);


    if (cacheResponse) {

      return cacheResponse;

    }


    let watermark = await env.NAMESPACE.get(watermarkKey, "stream");

    let source = await env.BUCKET.get(sourceKey);


    if (!watermark || !source) {

      return new Response("Not found", { status: 404 });

    }


    const result = await env.IMAGES.input(source.body)

      .draw(watermark)

      .output({ format: "image/jpeg" });


    const response = result.response();


    ctx.waitUntil(cache.put(cacheKey, response.clone()));


    return response;

  },

} satisfies ExportedHandler<Env>;


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/images/","name":"Cloudflare Images"}},{"@type":"ListItem","position":3,"item":{"@id":"/images/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/images/examples/watermark-from-kv/","name":"Watermarks"}}]}
```
