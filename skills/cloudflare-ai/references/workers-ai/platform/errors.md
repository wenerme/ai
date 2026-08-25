---
description: Reference table of Workers AI error codes, HTTP statuses, and descriptions.
title: Errors
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Errors

Last updated Jul 29, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers-ai/platform/errors/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Below is a list of Workers AI errors.

| **Name**                              | **Internal Code** | **HTTP Code** | **Description**                                                                                                                                      |
| ------------------------------------- | ----------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| No such model                         | 5007              | 400           | No such model ${model} or task                                                                                                                       |
| Invalid data                          | 5004              | 400           | Invalid data type for base64 input: ${type}                                                                                                          |
| Finetune missing required files       | 3039              | 400           | Finetune is missing required files (model.safetensors and config.json)                                                                               |
| Incomplete request                    | 3003              | 400           | Request is missing headers or body: {what}                                                                                                           |
| Account not allowed for private model | 5018              | 403           | The account is not allowed to access this model                                                                                                      |
| Model agreement                       | 5016              | 403           | User has not agreed to Llama3.2 model terms                                                                                                          |
| Account blocked                       | 3023              | 403           | Service unavailable for account                                                                                                                      |
| Account not allowed for private model | 3041              | 403           | The account is not allowed to access this model                                                                                                      |
| Model requires Workers Paid plan      | 5035              | 403           | This model requires a Workers Paid plan. See [pricing](https://developers.cloudflare.com/workers-ai/platform/pricing/) for details.                  |
| Deprecated SDK version                | 5019              | 405           | Request trying to use deprecated SDK version                                                                                                         |
| LoRa unsupported                      | 5005              | 405           | The model ${this.model} does not support LoRa inference                                                                                              |
| Invalid model ID                      | 3042              | 404           | The model name is invalid                                                                                                                            |
| Request too large                     | 3006              | 413           | Request is too large                                                                                                                                 |
| Timeout                               | 3007              | 408           | Request timeout                                                                                                                                      |
| Aborted                               | 3008              | 408           | Request was aborted                                                                                                                                  |
| Account limited                       | 3036              | 429           | You have used up your daily free allocation of 10,000 neurons. Please upgrade to Cloudflare's Workers Paid plan if you would like to continue usage. |
| Out of capacity                       | 3040              | 429           | No more data centers to forward the request to                                                                                                       |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/platform/errors/#page","headline":"Errors · Cloudflare Workers AI docs","description":"Reference table of Workers AI error codes, HTTP statuses, and descriptions.","url":"https://developers.cloudflare.com/workers-ai/platform/errors/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
