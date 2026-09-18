---
description: Fail synchronous inference requests when capacity is unavailable.
title: Reject busy requests
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Reject busy requests

Last updated Sep 17, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers-ai/features/reject-if-busy/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Set `rejectIfBusy` when your application should not wait in a capacity queue. Workers AI rejects the synchronous inference request if capacity is unavailable.

## Send a REST request

For the native REST API, add `rejectIfBusy` to the request `options` object:

```bash
curl --request POST \
  --url "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/run/@cf/google/gemma-4-26b-a4b-it" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "messages": [
      {
        "role": "user",
        "content": "Explain what a capacity queue is."
      }
    ],
    "options": {
      "rejectIfBusy": true
    }
  }'
```

## Use the Workers binding

For the Workers AI binding, pass `rejectIfBusy` in the third argument to `env.AI.run()`:

```js
const response = await env.AI.run(
	"@cf/google/gemma-4-26b-a4b-it",
	{
		messages: [
			{
				role: "user",
				content: "Explain what a capacity queue is.",
			},
		],
	},
	{ rejectIfBusy: true },
);
```

```ts
const response = await env.AI.run(
	"@cf/google/gemma-4-26b-a4b-it",
	{
		messages: [
			{
				role: "user",
				content: "Explain what a capacity queue is.",
			},
		],
	},
	{ rejectIfBusy: true },
);
```

Do not add `rejectIfBusy` to the model input object. The binding only applies this option from the third argument.

## Call Chat Completions

For OpenAI-compatible Chat Completions, add `options` at the top level of the request body:

```bash
curl --request POST \
  --url "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/v1/chat/completions" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "@cf/google/gemma-4-26b-a4b-it",
    "messages": [
      {
        "role": "user",
        "content": "Explain what a capacity queue is."
      }
    ],
    "options": {
      "rejectIfBusy": true
    }
  }'
```

OpenAI clients that preserve custom fields can send this option. Clients that remove unknown fields do not apply it, so requests proceed normally.

## Handle capacity errors

Rejected requests return HTTP status `429` and internal error code `3040`. The error message is `Capacity temporarily exceeded, please try again.`

Refer to [Workers AI errors](https://developers.cloudflare.com/workers-ai/platform/errors/) for error details.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/features/reject-if-busy/#page","headline":"Reject busy requests · Cloudflare Workers AI docs","description":"Fail synchronous inference requests when capacity is unavailable.","url":"https://developers.cloudflare.com/workers-ai/features/reject-if-busy/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
