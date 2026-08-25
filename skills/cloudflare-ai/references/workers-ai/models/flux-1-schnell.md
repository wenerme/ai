---
description: FLUX.1 [schnell] is a 12 billion parameter rectified flow transformer capable of generating images from text descriptions.
title: flux-1-schnell
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Black Forest Labs logo](https://developers.cloudflare.com/_astro/blackforestlabs.Ccs-Y4-D.svg)

# flux-1-schnell

Text-to-Image • Black Forest Labs

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers-ai/models/flux-1-schnell/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`@cf/black-forest-labs/flux-1-schnell`

* Cloudflare-hosted

FLUX.1 \[schnell\] is a 12 billion parameter rectified flow transformer capable of generating images from text descriptions.

| Model Info        |                                                  |
| ----------------- | ------------------------------------------------ |
| Terms and License | [link ↗](https://bfl.ai/legal/terms-of-service)  |
| Unit Pricing      | $0.000053 per 512 by 512 tile, $0.00011 per step |

## Usage

```ts

export interface Env {
	AI: Ai;
}

export default {
	async fetch(request, env): Promise<Response> {
		const response = await env.AI.run('@cf/black-forest-labs/flux-1-schnell', {
			prompt: 'a cyberpunk lizard',
			seed: Math.floor(Math.random() * 10)
		});
		// response.image is base64 encoded which can be used directly as an <img src=""> data URI
		const dataURI = `data:image/jpeg;charset=utf-8;base64,${response.image}`;
		return Response.json({ dataURI });
	},
} satisfies ExportedHandler<Env>;

```

```ts

export interface Env {
	AI: Ai;
}

export default {
	async fetch(request, env): Promise<Response> {
		const response = await env.AI.run('@cf/black-forest-labs/flux-1-schnell', {
			prompt: 'a cyberpunk lizard',
			seed: Math.floor(Math.random() * 10)
		});
		// Convert from base64 string
		const binaryString = atob(response.image);
		// Create byte representation
		const img = Uint8Array.from(binaryString, (m) => m.codePointAt(0));
		return new Response(img, {
			headers: {
				'Content-Type': 'image/jpeg',
			},
		});
	},
} satisfies ExportedHandler<Env>;
```

```sh

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/black-forest-labs/flux-1-schnell  \
  -X POST  \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \
  -d '{ "prompt": "cyberpunk cat", "seed": "Random positive integer" }'
```

## Parameters

prompt

`string`requiredminLength: 1maxLength: 2048A text description of the image you want to generate.

steps

`integer`default: 4maximum: 8The number of diffusion steps; higher values can improve quality but take longer.

image

`string`The generated image in Base64 format.

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/models/flux-1-schnell/#page","headline":"flux-1-schnell (Black Forest Labs) · Cloudflare AI docs · Cloudflare Workers AI docs","description":"FLUX.1 \\[schnell] is a 12 billion parameter rectified flow transformer capable of generating images from text descriptions.","url":"https://developers.cloudflare.com/workers-ai/models/flux-1-schnell/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
