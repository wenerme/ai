---
description: Establish persistent WebSocket connections for AI requests through AI Gateway without real-time streaming.
title: Non-realtime WebSockets API
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Non-realtime WebSockets API

Last updated May 8, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-gateway/usage/websockets-api/non-realtime-api/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The Non-realtime WebSockets API allows you to establish persistent connections for AI requests without requiring repeated handshakes. This approach is ideal for applications that do not require real-time interactions but still benefit from reduced latency and continuous communication.

## Set up WebSockets API

1. Generate an AI Gateway token with appropriate AI Gateway Run and opt in to using an authenticated gateway.
2. Use the `wss://` protocol to initiate a WebSocket connection:
```plaintext
wss://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}
```
3. Open a WebSocket connection authenticated with a Cloudflare token with the AI Gateway Run permission.

Note

Alternatively, we also support authentication via the `sec-websocket-protocol` header if you are using a browser WebSocket.

## Example request

```javascript
import WebSocket from "ws";

const ws = new WebSocket(
	"wss://gateway.ai.cloudflare.com/v1/my-account-id/my-gateway/",
	{
		headers: {
			"cf-aig-authorization": "Bearer AI_GATEWAY_TOKEN",
		},
	},
);

ws.on("open", () => {
	ws.send(
		JSON.stringify({
			type: "universal.create",
			request: {
				eventId: "my-request",
				provider: "workers-ai",
				endpoint: "@cf/meta/llama-3.1-8b-instruct",
				headers: {
					Authorization: "Bearer WORKERS_AI_TOKEN",
					"Content-Type": "application/json",
				},
				query: {
					prompt: "tell me a joke",
				},
			},
		}),
	);
})

ws.on("message", (message) => {
	console.log(message.toString());
});
```

## Example response

```json
{
	"type": "universal.created",
	"metadata": {
		"cacheStatus": "MISS",
		"eventId": "my-request",
		"logId": "01JC3R94FRD97JBCBX3S0ZAXKW",
		"step": "0",
		"contentType": "application/json"
	},
	"response": {
		"result": {
			"response": "Why was the math book sad? Because it had too many problems. Would you like to hear another one?"
		},
		"success": true,
		"errors": [],
		"messages": []
	}
}
```

## Example streaming request

For streaming requests, AI Gateway sends an initial message with request metadata indicating the stream is starting:

```json
{
	"type": "universal.created",
	"metadata": {
		"cacheStatus": "MISS",
		"eventId": "my-request",
		"logId": "01JC40RB3NGBE5XFRZGBN07572",
		"step": "0",
		"contentType": "text/event-stream"
	}
}
```

After this initial message, all streaming chunks are relayed in real-time to the WebSocket connection as they arrive from the inference provider. Only the `eventId` field is included in the metadata for these streaming chunks. The `eventId` allows AI Gateway to include a client-defined ID with each message, even in a streaming WebSocket environment.

```json
{
	"type": "universal.stream",
	"metadata": {
		"eventId": "my-request"
	},
	"response": {
		"response": "would"
	}
}
```

Once all chunks for a request have been streamed, AI Gateway sends a final message to signal the completion of the request. For added flexibility, this message includes all the metadata again, even though it was initially provided at the start of the streaming process.

```json
{
	"type": "universal.done",
	"metadata": {
		"cacheStatus": "MISS",
		"eventId": "my-request",
		"logId": "01JC40RB3NGBE5XFRZGBN07572",
		"step": "0",
		"contentType": "text/event-stream"
	}
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/usage/websockets-api/non-realtime-api/#page","headline":"Non-realtime WebSockets API · Cloudflare AI Gateway docs","description":"Establish persistent WebSocket connections for AI requests through AI Gateway without real-time streaming.","url":"https://developers.cloudflare.com/ai-gateway/usage/websockets-api/non-realtime-api/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-08","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
