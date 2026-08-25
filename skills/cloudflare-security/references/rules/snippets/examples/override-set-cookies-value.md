---
description: Get a specific `Set-Cookie` header and update it with a certain value.
title: Override a Set-Cookie header with a certain value
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Override a Set-Cookie header with a certain value

Get a specific `Set-Cookie` header and update it with a certain value.

Last updated Nov 3, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/snippets/examples/override-set-cookies-value/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

```js
export default {
	async fetch(request) {
		// Receive response from the origin
		const response = await fetch(request);

		// Create a new Headers object to modify response headers
		const newHeaders = new Headers(response.headers);

		// Get all Set-Cookie headers
		const cookieArray = response.headers.getSetCookie();
		if (cookieArray.length > 0) {
			const updatedCookies = cookieArray.map((cookie) => {
				// For example, replace the currency value with GBP
				if (cookie.trim().startsWith("currency=")) {
					return cookie.replace(/currency=[^;]+/, "currency=GBP");
				}
				return cookie;
			});

			// Delete the existing Set-Cookie headers
			newHeaders.delete("Set-Cookie");

			// Add the updated Set-Cookie headers individually
			updatedCookies.forEach((cookie) => {
				newHeaders.append("Set-Cookie", cookie.trim());
			});
		}

		// Return the modified response with updated headers
		return new Response(response.body, {
			status: response.status,
			headers: newHeaders,
		});
	},
};
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/snippets/examples/override-set-cookies-value/#page","headline":"Override a Set-Cookie header with a certain value · Cloudflare Rules docs","description":"Get a specific Set-Cookie header and update it with a certain value.","url":"https://developers.cloudflare.com/rules/snippets/examples/override-set-cookies-value/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-11-03","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Headers","Cookies","Response modification"]}
```
