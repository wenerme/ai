---
description: Run APO on WordPress subdomains and subdirectory installations.
title: Subdomains and subdirectories
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/automatic-platform-optimization/llms.txt
> Use this file to discover all available pages before exploring further.

# Subdomains and subdirectories

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/automatic-platform-optimization/reference/subdomain-subdirectories/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Run APO on a subdomain

After you enable APO, you configure it to run on the subdomain that uses WordPress. For example, if you have a website called `www.mysite.com` which includes a subdomain running WordPress called `shop.mysite.com`, you would configure APO to run on the `shop.mysite.com` subdomain.

1. Install version 4.4.0 or later of the Cloudflare WordPress plugin.
2. Log in using Cloudflare **API token** or **Global key**.
3. Enable APO. The subdomain displays in the list of hostnames in the card.
4. Repeat the process for each subdomain to enable APO.

By default, APO runs on the apex domain (also known as "root domain" or "naked domain"). If you choose to run APO on a subdomain, the apex domain is automatically disabled. To run APO on a subdomain and the apex domain, upgrade the WordPress plugin to version 4.4.0 or later on the apex domain and re-enable APO.

## Run APO on a subdirectory

After you enable APO, you configure it to run on the subdirectory that uses WordPress. For example, if you have a website called `www.mysite.com` which includes a subdirectory running WordPress called `mysite.com/shop`, you would configure APO to run on the `mysite.com` domain.

1. Install the Cloudflare WordPress plugin.
2. Add your Cloudflare API Token.
3. Activate APO.

Repeat steps 1 and 2 for each subdirectory to activate the WordPress plugin for automatic cache purging.

## Run APO only on a subdirectory

If you choose to run APO only on a subdirectory, the rest of the domain should be configured to bypass APO. You can bypass APO in one of two ways.

### Use the `cf-edge-cache` response header

The `cf-edge-cache: no-cache` instructs the APO service to bypass caching for non-WordPress parts of the site. You can implement this option with Cloudflare Workers using the example below.

```js
export default {
	async fetch(request, env, ctx) {
		const originalResponse = await fetch(request);

		// Response properties are immutable. To change them, construct a new Response object.
    const response = new Response(originalResponse.body, originalResponse);

    // Response headers can be modified through the headers `set` method.
    response.headers.set("cf-edge-cache", "no-cache");

		return response;
	},
};
```

### Use Cache Rules

Create a [cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/) to exclude non-WordPress portions of the site from caching using **Cache eligibility: Bypass cache**. This option disables all caching, including static assets for those paths. As a result, we recommend disabling APO via the response header.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/automatic-platform-optimization/reference/subdomain-subdirectories/#page","headline":"Subdomains and subdirectories · Cloudflare Automatic Platform Optimization docs","description":"Run APO on WordPress subdomains and subdirectory installations.","url":"https://developers.cloudflare.com/automatic-platform-optimization/reference/subdomain-subdirectories/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["WordPress","JavaScript"]}
```
