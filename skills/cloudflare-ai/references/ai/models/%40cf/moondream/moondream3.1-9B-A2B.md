---
description: Moondream 3 is a fast, efficient 9B mixture-of-experts vision language model (2B active parameters) that delivers frontier-level visual reasoning for tasks like object detection, pointing, OCR, and structured output.
title: moondream3.1-9B-A2B
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

m

# moondream3.1-9B-A2B

Image-to-Text • moondream

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/%40cf/moondream/moondream3.1-9B-A2B/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`@cf/moondream/moondream3.1-9B-A2B`

* Cloudflare-hosted
* Vision

Moondream 3 is a fast, efficient 9B mixture-of-experts vision language model (2B active parameters) that delivers frontier-level visual reasoning for tasks like object detection, pointing, OCR, and structured output.

| Model Info   |                                                     |
| ------------ | --------------------------------------------------- |
| Vision       | Yes                                                 |
| Unit Pricing | $0.30 per M input tokens, $1.00 per M output tokens |

## Parameters

task

`string`default: queryenum: query, caption, point, detectWhich Moondream skill to run.

image

`string`Input image as a public HTTPS URL or base64 data URI. Optional for \`query\`; required for \`caption\`, \`point\`, and \`detect\`.

question

`string`default: What's in this image?Question for the \`query\` task.

caption\_length

`string`default: normalenum: short, normal, longCaption length for the \`caption\` task.

target

`string`default: personObject phrase to locate for \`point\` and \`detect\` tasks (e.g. 'person wearing a red shirt').

reasoning

`boolean`default: trueEnable reasoning trace for the \`query\` task.

temperature

`number`default: 0.2minimum: 0maximum: 2Sampling temperature.

top\_p

`number`default: 0.9minimum: 0maximum: 1Top-p (nucleus) sampling.

max\_tokens

`integer`default: 8192minimum: 1maximum: 28672Max tokens to generate for \`query\` and \`caption\`.

max\_objects

`integer`default: 150minimum: 1maximum: 500Max objects to return for \`point\` and \`detect\`.

stream

`boolean`default: trueReturn incremental tokens for \`query\` and \`caption\`. \`point\` and \`detect\` do not support streaming.

finish\_reason

`string`Reason the generation finished.

▶metrics{}

`object`

answer

`string`Answer text for the \`query\` task. Null for other tasks.

caption

`string`Caption text for the \`caption\` task. Null for other tasks.

▶points\[\]

`array`Located points for the \`point\` task. Null for other tasks.

▶objects\[\]

`array`Detected bounding boxes for the \`detect\` task. Null for other tasks.

▶reasoning{}

`object`Reasoning trace for the \`query\` task when reasoning=true. Null otherwise.

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/%40cf/moondream/moondream3.1-9B-A2B/#page","headline":"moondream3.1-9B-A2B (moondream) · Cloudflare AI docs · Cloudflare AI docs","description":"Moondream 3 is a fast, efficient 9B mixture-of-experts vision language model (2B active parameters) that delivers frontier-level visual reasoning for tasks like object detection, pointing, OCR, and structured output.","url":"https://developers.cloudflare.com/ai/models/%40cf/moondream/moondream3.1-9B-A2B/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
