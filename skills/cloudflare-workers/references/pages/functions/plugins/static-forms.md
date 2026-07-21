---
description: Intercept and process HTML form submissions in Pages Functions with the Static Forms Plugin.
title: Static Forms
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt
> Use this file to discover all available pages before exploring further.

#  Static Forms

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/pages/functions/plugins/static-forms/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

The Static Forms Pages Plugin intercepts all form submissions made which have the `data-static-form-name` attribute set. This allows you to take action on these form submissions by, for example, saving the submission to KV.

## Installation

 npm  yarn  pnpm  bun

```
npm i @cloudflare/pages-plugin-static-forms
```

```
yarn add @cloudflare/pages-plugin-static-forms
```

```
pnpm add @cloudflare/pages-plugin-static-forms
```

```
bun add @cloudflare/pages-plugin-static-forms
```

## Usage

```typescript
import staticFormsPlugin from "@cloudflare/pages-plugin-static-forms";

export const onRequest: PagesFunction = staticFormsPlugin({
	respondWith: ({ formData, name }) => {
		const email = formData.get("email");
		return new Response(
			`Hello, ${email}! Thank you for submitting the ${name} form.`,
		);
	},
});
```

```html
<body>
	<h1>Sales enquiry</h1>
	<form data-static-form-name="sales">
		<label>Email address <input type="email" name="email" /></label>
		<label>Message <textarea name="message"></textarea></label>
		<button type="submit">Submit</button>
	</form>
</body>
```

The Plugin takes a single argument, an object with a `respondWith` property. This function takes an object with a `formData` property (the [FormData ↗](https://developer.mozilla.org/en-US/docs/Web/API/FormData) instance) and `name` property (the name value of your `data-static-form-name` attribute). It should return a `Response` or `Promise` of a `Response`. It is in this `respondWith` function that you can take action such as serializing the `formData` and saving it to a KV namespace.

The `method` and `action` attributes of the HTML form do not need to be set. The Plugin will automatically override them to allow it to intercept the submission.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/functions/plugins/static-forms/#page","headline":"Static Forms · Cloudflare Pages docs","description":"Intercept and process HTML form submissions in Pages Functions with the Static Forms Plugin.","url":"https://developers.cloudflare.com/pages/functions/plugins/static-forms/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
