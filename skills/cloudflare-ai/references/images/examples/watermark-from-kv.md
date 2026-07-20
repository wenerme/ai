---
title: Watermarks
description: Draw a watermark from KV on an image from R2
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Watermarks

Draw a watermark from KV on an image from R2

Enable [Workers Cache](https://developers.cloudflare.com/workers/cache/) so repeat requests for the same watermarked image are served from cache without re-running the Worker or re-transforming the image:

* [  wrangler.jsonc ](#tab-panel-9644)
* [  wrangler.toml ](#tab-panel-9645)

**JSONC**

```jsonc
{
  "cache": {
    "enabled": true,
  },
}
```

**TOML**

```toml
[cache]
enabled = true
```

Then set `Cache-Control` headers on your response to control the cache lifetime:

* [  JavaScript ](#tab-panel-9646)
* [  TypeScript ](#tab-panel-9647)

**JavaScript**

```js
export default {
  async fetch(request, env) {
    const watermarkKey = "my-watermark";
    const sourceKey = "my-source-image";


    const watermark = await env.NAMESPACE.get(watermarkKey, "stream");
    const source = await env.BUCKET.get(sourceKey);


    if (!watermark || !source) {
      return new Response("Not found", { status: 404 });
    }


    const result = await env.IMAGES.input(source.body)
      .draw(watermark)
      .output({ format: "image/jpeg" });


    const response = result.response();


    return new Response(response.body, {
      headers: {
        ...Object.fromEntries(response.headers),
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  },
};
```

**TypeScript**

```ts
interface Env {
  BUCKET: R2Bucket;
  NAMESPACE: KVNamespace;
  IMAGES: ImagesBinding;
}
export default {
  async fetch(request, env): Promise<Response> {
    const watermarkKey = "my-watermark";
    const sourceKey = "my-source-image";


    const watermark = await env.NAMESPACE.get(watermarkKey, "stream");
    const source = await env.BUCKET.get(sourceKey);


    if (!watermark || !source) {
      return new Response("Not found", { status: 404 });
    }


    const result = await env.IMAGES.input(source.body)
      .draw(watermark)
      .output({ format: "image/jpeg" });


    const response = result.response();


    return new Response(response.body, {
      headers: {
        ...Object.fromEntries(response.headers),
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  },
} satisfies ExportedHandler<Env>;
```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/examples/watermark-from-kv/#page","headline":"Watermarks · Cloudflare Images docs","description":"Draw a watermark from KV on an image from R2","url":"https://developers.cloudflare.com/images/examples/watermark-from-kv/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/images/","name":"Cloudflare Images"}},{"@type":"ListItem","position":3,"item":{"@id":"/images/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/images/examples/watermark-from-kv/","name":"Watermarks"}}]}
```
