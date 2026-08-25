---
description: Send traces from Pages Functions to Honeycomb for observability using this Plugin.
title: Honeycomb
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt
> Use this file to discover all available pages before exploring further.

# Honeycomb

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/pages/functions/plugins/honeycomb/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The Honeycomb Pages Plugin automatically sends traces to Honeycomb for analysis and observability.

## Installation

npmyarnpnpmbun

```
npm i @cloudflare/pages-plugin-honeycomb
```

```
yarn add @cloudflare/pages-plugin-honeycomb
```

```
pnpm add @cloudflare/pages-plugin-honeycomb
```

```
bun add @cloudflare/pages-plugin-honeycomb
```

## Usage

The following usage example uses environment variables you will need to set in your Pages project settings.

```typescript
import honeycombPlugin from "@cloudflare/pages-plugin-honeycomb";

export const onRequest: PagesFunction<{
	HONEYCOMB_API_KEY: string;
	HONEYCOMB_DATASET: string;
}> = (context) => {
	return honeycombPlugin({
		apiKey: context.env.HONEYCOMB_API_KEY,
		dataset: context.env.HONEYCOMB_DATASET,
	})(context);
};
```

Alternatively, you can hard-code (not advisable for API key) your settings the following way:

```typescript
import honeycombPlugin from "@cloudflare/pages-plugin-honeycomb";

export const onRequest = honeycombPlugin({
	apiKey: "YOUR_HONEYCOMB_API_KEY",
	dataset: "YOUR_HONEYCOMB_DATASET_NAME",
});
```

This Plugin is based on the `@cloudflare/workers-honeycomb-logger` and accepts the same [configuration options ↗](https://github.com/cloudflare/workers-honeycomb-logger#config).

Ensure that you enable the option to **Automatically unpack nested JSON** and set the **Maximum unpacking depth** to **5** in your Honeycomb dataset settings.

![Follow the instructions above to toggle on Automatically unpack nested JSON and set the Maximum unpacking depth option to 5 in the Honeycomb dashboard](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=481,height=221,format=webp/_astro/honeycomb.MQ2Vf1tC.png)

### Additional context

`data.honeycomb.tracer` has two methods for attaching additional information about a given trace:

* `data.honeycomb.tracer.log` which takes a single argument, a `String`.
* `data.honeycomb.tracer.addData` which takes a single argument, an object of arbitrary data.

More information about these methods can be seen on [@cloudflare/workers-honeycomb-logger's documentation ↗](https://github.com/cloudflare/workers-honeycomb-logger#adding-logs-and-other-data).

For example, if you wanted to use the `addData` method to attach user information:

```typescript
import type { PluginData } from "@cloudflare/pages-plugin-honeycomb";

export const onRequest: PagesFunction<unknown, any, PluginData> = async ({
	data,
	next,
	request,
}) => {
	// Authenticate the user from the request and extract user's email address
	const email = await getEmailFromRequest(request);

	data.honeycomb.tracer.addData({ email });

	return next();
};
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/functions/plugins/honeycomb/#page","headline":"Honeycomb · Cloudflare Pages docs","description":"Send traces from Pages Functions to Honeycomb for observability using this Plugin.","url":"https://developers.cloudflare.com/pages/functions/plugins/honeycomb/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
