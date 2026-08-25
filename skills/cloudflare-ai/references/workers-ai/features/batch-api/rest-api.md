---
description: Send and retrieve batch inference requests using the Workers AI REST API.
title: REST API
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt
> Use this file to discover all available pages before exploring further.

# REST API

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers-ai/features/batch-api/rest-api/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If you prefer to work directly with the REST API instead of a [Cloudflare Worker](https://developers.cloudflare.com/workers-ai/features/batch-api/workers-binding/), below are the steps on how to do it:

## 1\. Sending a Batch Request

Make a POST request using the following pattern. You can pass `external_reference` as a unique ID per-request that will be returned in the response.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/run/@cf/baai/bge-m3?queueRequest=true" \
 --header "Authorization: Bearer $API_TOKEN" \
 --header 'Content-Type: application/json' \
 --json '{
    "requests": [
        {
            "query": "This is a story about Cloudflare",
            "contexts": [
                {
                    "text": "This is a story about an orange cloud"
                },
                {
                    "text": "This is a story about a llama"
                },
                {
                    "text": "This is a story about a hugging emoji"
                }
            ],
            "external_reference": "reference-1"
        }
    ]
  }'
```

```json
{
	"result": {
		"status": "queued",
		"request_id": "768f15b7-4fd6-4498-906e-ad94ffc7f8d2",
		"model": "@cf/baai/bge-m3"
	},
	"success": true,
	"errors": [],
	"messages": []
}
```

## 2\. Retrieving the Batch Response

After receiving a `request_id` from your initial POST, you can poll for or retrieve the results with another POST request:

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/run/@cf/baai/bge-m3?queueRequest=true" \
 --header "Authorization: Bearer $API_TOKEN" \
 --header 'Content-Type: application/json' \
 --json '{
    "request_id": "<uuid>"
  }'
```

```json
{
	"result": {
		"responses": [
			{
				"id": 0,
				"result": {
					"response": [
						{ "id": 0, "score": 0.73974609375 },
						{ "id": 1, "score": 0.642578125 },
						{ "id": 2, "score": 0.6220703125 }
					]
				},
				"success": true,
				"external_reference": "reference-1"
			}
		],
		"usage": { "prompt_tokens": 12, "completion_tokens": 0, "total_tokens": 12 }
	},
	"success": true,
	"errors": [],
	"messages": []
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/features/batch-api/rest-api/#page","headline":"REST API · Cloudflare Workers AI docs","description":"Send and retrieve batch inference requests using the Workers AI REST API.","url":"https://developers.cloudflare.com/workers-ai/features/batch-api/rest-api/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
