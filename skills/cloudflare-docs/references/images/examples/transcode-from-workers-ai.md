---
title: Transcode images
description: Transcode an image from Workers AI before uploading to R2
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Transcode images

**Last reviewed:**  about 1 year ago 

Transcode an image from Workers AI before uploading to R2

JavaScript

```

const stream = await env.AI.run("@cf/bytedance/stable-diffusion-xl-lightning", {

  prompt: YOUR_PROMPT_HERE,

});


// Convert to AVIF

const image = (

  await env.IMAGES.input(stream).output({ format: "image/avif" })

).response();


const fileName = "image.avif";


// Upload to R2

await env.R2.put(fileName, image.body);


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/images/","name":"Cloudflare Images"}},{"@type":"ListItem","position":3,"item":{"@id":"/images/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/images/examples/transcode-from-workers-ai/","name":"Transcode images"}}]}
```
