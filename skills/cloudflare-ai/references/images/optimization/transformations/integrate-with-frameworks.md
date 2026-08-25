---
description: Use Cloudflare Images transformations with Next.js and Nuxt image components.
title: Integrate with frameworks
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt
> Use this file to discover all available pages before exploring further.

# Integrate with frameworks

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/images/optimization/transformations/integrate-with-frameworks/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Next.js

Image transformations can be used automatically with the Next.js [<Image /> component ↗](https://nextjs.org/docs/api-reference/next/image).

To use image transformations, define a global image loader or multiple custom loaders for each `<Image />` component.

Next.js will request the image with the correct parameters for width and quality.

Image transformations will be responsible for caching and serving an optimal format to the client.

### Global Loader

To use Images with **all** your app's images, define a global [loaderFile ↗](https://nextjs.org/docs/pages/api-reference/components/image#loaderfile) for your app.

Add the following settings to the **next.config.js** file located at the root of your Next.js application.

```ts
module.exports = {
	images: {
		loader: "custom",
		loaderFile: "./imageLoader.ts",
	},
};
```

Next, create the `imageLoader.ts` file in the specified path (relative to the root of your Next.js application).

```ts
import type { ImageLoaderProps } from "next/image";

const normalizeSrc = (src: string) => {
	return src.startsWith("/") ? src.slice(1) : src;
};

export default function cloudflareLoader({
	src,
	width,
	quality,
}: ImageLoaderProps) {
	const params = [`width=${width}`];
	if (quality) {
		params.push(`quality=${quality}`);
	}
	if (process.env.NODE_ENV === "development") {
		return `${src}?${params.join("&")}`;
	}
	return `/cdn-cgi/image/${params.join(",")}/${normalizeSrc(src)}`;
}
```

### Custom Loaders

Alternatively, define a loader for each `<Image />` component.

```js
import Image from "next/image";

const normalizeSrc = (src) => {
	return src.startsWith("/") ? src.slice(1) : src;
};

const cloudflareLoader = ({ src, width, quality }) => {
	const params = [`width=${width}`];
	if (quality) {
		params.push(`quality=${quality}`);
	}
	if (process.env.NODE_ENV === "development") {
		return `${src}?${params.join("&")}`;
	}
	return `/cdn-cgi/image/${params.join(",")}/${normalizeSrc(src)}`;
};

const MyImage = (props) => {
	return (
		<Image
			loader={cloudflareLoader}
			src="/me.png"
			alt="Picture of the author"
			width={500}
			height={500}
			{...props}
		/>
	);
};
```

Note

For local development, you can enable [Resize images from any origin checkbox](https://developers.cloudflare.com/images/optimization/transformations/sources/) for your zone. Then, replace `/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}` with an absolute URL path:

`https://<YOUR_DOMAIN.COM>/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/optimization/transformations/integrate-with-frameworks/#page","headline":"Integrate with frameworks · Cloudflare Images docs","description":"Use Cloudflare Images transformations with Next.js and Nuxt image components.","url":"https://developers.cloudflare.com/images/optimization/transformations/integrate-with-frameworks/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
