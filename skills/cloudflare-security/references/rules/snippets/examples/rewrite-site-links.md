---
description: Dynamically rewrite links in HTML responses. This is useful for site migrations and branding updates.
title: Rewrite links on HTML pages
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

#  Rewrite links on HTML pages

Dynamically rewrite links in HTML responses.

Last updated Oct 13, 2025 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/rules/snippets/examples/rewrite-site-links/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

```js
export default {
	async fetch(request) {
		// Define the old hostname here.
		const OLD_URL = "oldsite.com";
		// Then add your new hostname that should replace the old one.
		const NEW_URL = "newsite.com";

		class AttributeRewriter {
			constructor(attributeName) {
				this.attributeName = attributeName;
			}
			element(element) {
				const attribute = element.getAttribute(this.attributeName);
				if (attribute) {
					element.setAttribute(
						this.attributeName,
						attribute.replace(OLD_URL, NEW_URL),
					);
				}
			}
		}

		const rewriter = new HTMLRewriter()
			.on("a", new AttributeRewriter("href"))
			.on("img", new AttributeRewriter("src"));

		const res = await fetch(request);
		if (!res.headers.has("Content-Type")) {
			return res;
		}
		const contentType = res.headers.get("Content-Type");
		if (typeof contentType !== "string") {
			return res;
		}

		// If the response is HTML, it can be transformed with
		// HTMLRewriter -- otherwise, it should pass through
		if (contentType.startsWith("text/html")) {
			return rewriter.transform(res);
		} else {
			return res;
		}
	},
};
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/snippets/examples/rewrite-site-links/#page","headline":"Rewrite links on HTML pages · Cloudflare Rules docs","description":"Dynamically rewrite links in HTML responses. This is useful for site migrations and branding updates.","url":"https://developers.cloudflare.com/rules/snippets/examples/rewrite-site-links/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Response modification"]}
```
