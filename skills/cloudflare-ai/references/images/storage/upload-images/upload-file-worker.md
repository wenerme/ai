---
title: Upload via a Worker
description: Learn how to upload images to Cloudflare using Workers. This guide provides code examples for uploading both standard and AI-generated images efficiently.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Upload via a Worker

You can use a Worker to upload your image to Cloudflare Images.

Refer to the example below or refer to the [Workers documentation](https://developers.cloudflare.com/workers/) for more information.

* [  JavaScript ](#tab-panel-8999)
* [  TypeScript ](#tab-panel-9000)

JavaScript

```
const API_URL =  "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1";const TOKEN = "<YOUR_TOKEN_HERE>";
const image = await fetch("https://example.com/image.png");const bytes = await image.bytes();
const formData = new FormData();formData.append("file", new File([bytes], "image.png"));
const response = await fetch(API_URL, {  method: "POST",  headers: {    Authorization: `Bearer ${TOKEN}`,  },  body: formData,});
```

TypeScript

```
const API_URL =  "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1";const TOKEN = "<YOUR_TOKEN_HERE>";
const image = await fetch("https://example.com/image.png");const bytes = await image.bytes();
const formData = new FormData();formData.append("file", new File([bytes], "image.png"));
const response = await fetch(API_URL, {  method: "POST",  headers: {    Authorization: `Bearer ${TOKEN}`,  },  body: formData,});
```

## Upload from AI generated images

You can use an AI Worker to generate an image and then upload that image to store it in Cloudflare Images. For more information about using Workers AI to generate an image, refer to the [SDXL-Lightning Model](https://developers.cloudflare.com/workers-ai/models/stable-diffusion-xl-lightning).

* [  JavaScript ](#tab-panel-9001)
* [  TypeScript ](#tab-panel-9002)

JavaScript

```
const API_URL =  "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1";const TOKEN = "YOUR_TOKEN_HERE";
const stream = await env.AI.run("@cf/bytedance/stable-diffusion-xl-lightning", {  prompt: YOUR_PROMPT_HERE,});const bytes = await new Response(stream).bytes();
const formData = new FormData();formData.append("file", new File([bytes], "image.jpg"));
const response = await fetch(API_URL, {  method: "POST",  headers: {    Authorization: `Bearer ${TOKEN}`,  },  body: formData,});
```

TypeScript

```
const API_URL =  "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1";const TOKEN = "YOUR_TOKEN_HERE";
const stream = await env.AI.run("@cf/bytedance/stable-diffusion-xl-lightning", {  prompt: YOUR_PROMPT_HERE,});const bytes = await new Response(stream).bytes();
const formData = new FormData();formData.append("file", new File([bytes], "image.jpg"));
const response = await fetch(API_URL, {  method: "POST",  headers: {    Authorization: `Bearer ${TOKEN}`,  },  body: formData,});
```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/storage/upload-images/upload-file-worker/#page","headline":"Upload via a Worker · Cloudflare Images docs","description":"Learn how to upload images to Cloudflare using Workers. This guide provides code examples for uploading both standard and AI-generated images efficiently.","url":"https://developers.cloudflare.com/images/storage/upload-images/upload-file-worker/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/images/","name":"Cloudflare Images"}},{"@type":"ListItem","position":3,"item":{"@id":"/images/storage/","name":"Storage"}},{"@type":"ListItem","position":4,"item":{"@id":"/images/storage/upload-images/","name":"Upload images"}},{"@type":"ListItem","position":5,"item":{"@id":"/images/storage/upload-images/upload-file-worker/","name":"Upload via a Worker"}}]}
```
