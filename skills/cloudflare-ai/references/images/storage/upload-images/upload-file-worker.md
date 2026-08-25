---
description: Learn how to upload images to Cloudflare using Workers. This guide provides code examples for uploading both standard and AI-generated images efficiently.
title: Upload via a Worker
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt
> Use this file to discover all available pages before exploring further.

# Upload via a Worker

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/images/storage/upload-images/upload-file-worker/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can use a Worker to upload your image to Cloudflare Images.

Refer to the example below or refer to the [Workers documentation](https://developers.cloudflare.com/workers/) for more information.

```js
const API_URL =
	"https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1";
const TOKEN = "<YOUR_TOKEN_HERE>";

const image = await fetch("https://example.com/image.png");
const bytes = await image.bytes();

const formData = new FormData();
formData.append("file", new File([bytes], "image.png"));

const response = await fetch(API_URL, {
	method: "POST",
	headers: {
		Authorization: `Bearer ${TOKEN}`,
	},
	body: formData,
});
```

```ts
const API_URL =
	"https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1";
const TOKEN = "<YOUR_TOKEN_HERE>";

const image = await fetch("https://example.com/image.png");
const bytes = await image.bytes();

const formData = new FormData();
formData.append("file", new File([bytes], "image.png"));

const response = await fetch(API_URL, {
	method: "POST",
	headers: {
		Authorization: `Bearer ${TOKEN}`,
	},
	body: formData,
});
```

## Upload from AI generated images

You can use an AI Worker to generate an image and then upload that image to store it in Cloudflare Images. For more information about using Workers AI to generate an image, refer to the [SDXL-Lightning Model](https://developers.cloudflare.com/workers-ai/models/stable-diffusion-xl-lightning).

```js
const API_URL =
	"https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1";
const TOKEN = "YOUR_TOKEN_HERE";

const stream = await env.AI.run("@cf/bytedance/stable-diffusion-xl-lightning", {
	prompt: YOUR_PROMPT_HERE,
});
const bytes = await new Response(stream).bytes();

const formData = new FormData();
formData.append("file", new File([bytes], "image.jpg"));

const response = await fetch(API_URL, {
	method: "POST",
	headers: {
		Authorization: `Bearer ${TOKEN}`,
	},
	body: formData,
});
```

```ts
const API_URL =
	"https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1";
const TOKEN = "YOUR_TOKEN_HERE";

const stream = await env.AI.run("@cf/bytedance/stable-diffusion-xl-lightning", {
	prompt: YOUR_PROMPT_HERE,
});
const bytes = await new Response(stream).bytes();

const formData = new FormData();
formData.append("file", new File([bytes], "image.jpg"));

const response = await fetch(API_URL, {
	method: "POST",
	headers: {
		Authorization: `Bearer ${TOKEN}`,
	},
	body: formData,
});
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/storage/upload-images/upload-file-worker/#page","headline":"Upload via a Worker · Cloudflare Images docs","description":"Learn how to upload images to Cloudflare using Workers. This guide provides code examples for uploading both standard and AI-generated images efficiently.","url":"https://developers.cloudflare.com/images/storage/upload-images/upload-file-worker/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
