---
title: Watermarks
description: Draw a watermark from KV on an image from R2
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt  
> Use this file to discover all available pages before exploring further. 

[Skip to content](#%5Ftop) 

# Watermarks

**Last reviewed:**  about 1 year ago 

Draw a watermark from KV on an image from R2

* [  JavaScript ](#tab-panel-8914)
* [  TypeScript ](#tab-panel-8915)

JavaScript

```
export default {  async fetch(request, env, ctx) {    const watermarkKey = "my-watermark";    const sourceKey = "my-source-image";
    const cache = await caches.open("transformed-images");    const cacheKey = new URL(sourceKey + "/" + watermarkKey, request.url);    const cacheResponse = await cache.match(cacheKey);
    if (cacheResponse) {      return cacheResponse;    }
    let watermark = await env.NAMESPACE.get(watermarkKey, "stream");    let source = await env.BUCKET.get(sourceKey);
    if (!watermark || !source) {      return new Response("Not found", { status: 404 });    }
    const result = await env.IMAGES.input(source.body)      .draw(watermark)      .output({ format: "image/jpeg" });
    const response = result.response();
    ctx.waitUntil(cache.put(cacheKey, response.clone()));
    return response;  },};
```

TypeScript

```
interface Env {  BUCKET: R2Bucket;  NAMESPACE: KVNamespace;  IMAGES: ImagesBinding;}export default {  async fetch(request, env, ctx): Promise<Response> {    const watermarkKey = "my-watermark";    const sourceKey = "my-source-image";
    const cache = await caches.open("transformed-images");    const cacheKey = new URL(sourceKey + "/" + watermarkKey, request.url);    const cacheResponse = await cache.match(cacheKey);
    if (cacheResponse) {      return cacheResponse;    }
    let watermark = await env.NAMESPACE.get(watermarkKey, "stream");    let source = await env.BUCKET.get(sourceKey);
    if (!watermark || !source) {      return new Response("Not found", { status: 404 });    }
    const result = await env.IMAGES.input(source.body)      .draw(watermark)      .output({ format: "image/jpeg" });
    const response = result.response();
    ctx.waitUntil(cache.put(cacheKey, response.clone()));
    return response;  },} satisfies ExportedHandler<Env>;
```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/examples/watermark-from-kv/#page","headline":"Watermarks · Cloudflare Images docs","description":"Draw a watermark from KV on an image from R2","url":"https://developers.cloudflare.com/images/examples/watermark-from-kv/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/images/","name":"Cloudflare Images"}},{"@type":"ListItem","position":3,"item":{"@id":"/images/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/images/examples/watermark-from-kv/","name":"Watermarks"}}]}
```
