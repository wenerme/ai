---
description: Draw a watermark from KV on an image from R2
title: Watermarks
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt
> Use this file to discover all available pages before exploring further.

# Watermarks

Draw a watermark from KV on an image from R2

Last updated Jul 8, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/images/examples/watermark-from-kv/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Enable [Workers Cache](https://developers.cloudflare.com/workers/cache/) so repeat requests for the same watermarked image are served from cache without re-running the Worker or re-transforming the image:

```jsonc
{
	"cache": {
		"enabled": true,
	},
}
```

```toml
[cache]
enabled = true
```

Then set `Cache-Control` headers on your response to control the cache lifetime:

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

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/examples/watermark-from-kv/#page","headline":"Watermarks · Cloudflare Images docs","description":"Draw a watermark from KV on an image from R2","url":"https://developers.cloudflare.com/images/examples/watermark-from-kv/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-08","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
