---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Migrate a static site or single-page application from Firebase Hosting to Cloudflare Workers with Static Assets.
title: Migrate from Firebase Hosting to Workers
image: https://developers.cloudflare.com/workers/static-assets/migration-guides/firebase-to-workers/og.png?v=f445c12bfa4c9a05
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Migrate from Firebase Hosting to Workers

This guide walks you through migrating an existing static site or single-page application (SPA) from Firebase Hosting to Cloudflare Workers with [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/).

## Frameworks

If your Firebase Hosting project uses a supported web framework, review the [Workers framework guides](https://developers.cloudflare.com/workers/framework-guides/) or run [`wrangler deploy`](https://developers.cloudflare.com/workers/framework-guides/automatic-configuration/) to automatically detect your framework and generate a Workers configuration. Otherwise, continue with the steps below.

## 1. Find your build command and output directory

Check your `firebase.json` file for the `hosting.public` field, which specifies the build output directory Firebase deploys:

*firebase.jsonjson*

```json
{
	"hosting": {
		"public": "dist",
		"rewrites": [
			{
				"source": "**",
				"destination": "/index.html"
			}
		]
	}
}
```

Identify your project's build command in `package.json` (typically `npm run build` or a framework-specific command such as `ng build`). If `firebase.json` includes a catch-all rewrite to `/index.html`, your app is configured as a Single Page Application (SPA).

## 2. Create a Wrangler configuration file

In the root of your project, create a `wrangler.jsonc` file. Replace `<your-project-name>` with your Worker name and `<your-build-directory>` with the `public` directory from `firebase.json`.

For a static site ([Static Site Generation](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/)):

```jsonc
{
	"name": "<your-project-name>",
	// Set this to today's date
	"compatibility_date": "2026-11-28",
	"assets": {
		"directory": "<your-build-directory>"
	}
}
```

```toml
name = "<your-project-name>"
# Set this to today's date
compatibility_date = "2026-11-28"

[assets]
directory = "<your-build-directory>"
```

For a [Single Page Application](https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/) (matching a Firebase `**` → `/index.html` rewrite):

```jsonc
{
	"name": "<your-project-name>",
	// Set this to today's date
	"compatibility_date": "2026-11-28",
	"assets": {
		"directory": "<your-build-directory>",
		"not_found_handling": "single-page-application"
	}
}
```

```toml
name = "<your-project-name>"
# Set this to today's date
compatibility_date = "2026-11-28"

[assets]
directory = "<your-build-directory>"
not_found_handling = "single-page-application"
```

If your `firebase.json` defines custom HTTP headers or URL redirects, move them into [`_headers`](https://developers.cloudflare.com/workers/static-assets/headers/) and [`_redirects`](https://developers.cloudflare.com/workers/static-assets/redirects/) files inside your static asset output directory.

## 3. Connect and deploy with Workers Builds

1. Push your updated repository (including `wrangler.jsonc`) to GitHub or GitLab.
2. Follow [Connect a new Worker](https://developers.cloudflare.com/workers/ci-cd/builds/#connect-a-new-worker) to link your repository to Workers Builds.
3. Set your **Build command** (for example, `npm run build`) and keep the default **Deploy command** ( `npx wrangler deploy`).

Alternatively, deploy directly from your terminal with `npx wrangler deploy`.

## 4. Switch your custom domain

Workers [Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/) support domains whose DNS is managed by Cloudflare.

1. Verify your deployed Worker on its `*.workers.dev` subdomain.
2. In your domain's **DNS** > **Records** page, remove any Firebase Hosting `A`, `AAAA`, or `CNAME` records for the hostname you are migrating.
3. Follow [Add a Custom Domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/#add-a-custom-domain) to attach the domain to your Worker.
4. Once traffic is serving from Workers, remove the old site from Firebase Hosting.

## Related resources

- [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)
- [Migrate from Pages to Workers](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/static-assets/migration-guides/firebase-to-workers/#page","headline":"Migrate from Firebase Hosting to Workers","description":"Migrate a static site or single-page application from Firebase Hosting to Cloudflare Workers with Static Assets.","url":"https://developers.cloudflare.com/workers/static-assets/migration-guides/firebase-to-workers/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/static-assets/migration-guides/firebase-to-workers/og.png?v=f445c12bfa4c9a05","dateModified":"2026-11-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
