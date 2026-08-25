---
description: Provide human feedback on AI Gateway evaluations programmatically using Worker bindings.
title: Add human feedback using Worker Bindings
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Add human feedback using Worker Bindings

Last updated Jun 12, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-gateway/evaluations/add-human-feedback-bindings/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide explains how to provide human feedback for AI Gateway evaluations using Worker bindings.

## 1\. Run an AI Evaluation

Start by sending a prompt to the AI model through your AI Gateway.

```javascript
const resp = await env.AI.run(
	"@cf/meta/llama-3.1-8b-instruct",
	{
		prompt: "tell me a joke",
	},
	{
		gateway: {
			id: "my-gateway",
		},
	},
);

const myLogId = env.AI.aiGatewayLogId;
```

Let the user interact with or evaluate the AI response. This interaction will inform the feedback you send back to the AI Gateway.

## 2\. Send Human Feedback

Use the [patchLog()](https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/#patchlog) method to provide feedback for the AI evaluation.

```javascript
await env.AI.gateway("my-gateway").patchLog(myLogId, {
	feedback: 1, // all fields are optional; set values that fit your use case
	score: 100,
	metadata: {
		user: "123", // Optional metadata to provide additional context
	},
});
```

## Feedback parameters explanation

* `feedback`: is either `-1` for negative or `1` to positive, `0` is considered not evaluated.
* `score`: A number between 0 and 100.
* `metadata`: An object containing additional contextual information.

### patchLog: Send Feedback

The `patchLog` method allows you to send feedback, score, and metadata for a specific log ID. All object properties are optional, so you can include any combination of the parameters:

```javascript
gateway.patchLog("my-log-id", {
	feedback: 1,
	score: 100,
	metadata: {
		user: "123",
	},
});
```

Returns: `Promise<void>` (Make sure to `await` the request.)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/evaluations/add-human-feedback-bindings/#page","headline":"Add human feedback using Worker Bindings · Cloudflare AI Gateway docs","description":"Provide human feedback on AI Gateway evaluations programmatically using Worker bindings.","url":"https://developers.cloudflare.com/ai-gateway/evaluations/add-human-feedback-bindings/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-12","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
