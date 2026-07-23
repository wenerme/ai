---
description: Define a delay to be used when incoming requests match a rule you consider suspicious based on the bot score.
title: Slow down suspicious requests
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Slow down suspicious requests

Define a delay to be used when incoming requests match a rule you consider suspicious based on the bot score.

Last updated Oct 13, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/snippets/examples/slow-suspicious-requests/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Snippet code

```js
export default {
	async fetch(request) {
		// Define delay
		const delay_in_seconds = 5;
		// Introduce a delay
		await new Promise((resolve) =>
			setTimeout(resolve, delay_in_seconds * 1000),
		); // Set delay in milliseconds

		// Pass the request to the origin
		const response = await fetch(request);
		return response;
	},
};
```

## Snippet rule

Configure a custom filter expression:

| Field     | Operator  | Value |
| --------- | --------- | ----- |
| Bot Score | less than | 10    |

If you are using the Expression Editor, enter the following expression:

```txt
(cf.bot_management.score lt 10)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/snippets/examples/slow-suspicious-requests/#page","headline":"Slow down suspicious requests · Cloudflare Rules docs","description":"Define a delay to be used when incoming requests match a rule you consider suspicious based on the bot score.","url":"https://developers.cloudflare.com/rules/snippets/examples/slow-suspicious-requests/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Request modification"]}
```
