---
description: How to configure a Worker with static assets on a subpath.
title: Serving a subdirectory
image: https://developers.cloudflare.com/workers/static-assets/routing/advanced/serving-a-subdirectory/og.png?v=185eca9d7984ce9a
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Serving a subdirectory

Last updated Oct 28, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/static-assets/routing/advanced/serving-a-subdirectory/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Set `assets.base_path` to serve static assets from a URL subpath. The files remain at the root of `assets.directory`.

Note

This option requires Wrangler 4.148.0 or later. With [`cloudflare.config.ts`](https://developers.cloudflare.com/cf/projects/cloudflare-config/), use `worker.assets.basePath` and `cf` 1.0.0-beta.13 or later. Your build configuration supplies the asset directory.

For example, use this asset directory to serve a blog:

- dist
  - index.html
  - posts
    - post1.html
    - post2.html

Set `assets.base_path` to `/blog` in your Wrangler configuration file:

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "assets-on-a-path-example",
	"main": "src/index.js",
	"upload_source_maps": true,
	"route": "example.com/blog/*",
	"assets": {
		"directory": "dist",
		"base_path": "/blog"
	}
}
```

```toml
"$schema" = "./node_modules/wrangler/config-schema.json"
name = "assets-on-a-path-example"
main = "src/index.js"
upload_source_maps = true
route = "example.com/blog/*"

[assets]
directory = "dist"
base_path = "/blog"
```

Requests to `example.com/blog/` serve `dist/index.html`. Requests to `example.com/blog/posts/post1` serve `dist/posts/post1.html`.

Requests outside `/blog` do not resolve static assets. Requests made through the [assets binding](https://developers.cloudflare.com/workers/static-assets/binding/#binding) also use the mounted public path. Forwarding the original request works unchanged. When constructing a request, include `/blog` in its pathname, for example, `env.ASSETS.fetch("https://assets.local/blog/posts/post1")`.

Paths in `_headers`, `_redirects`, and `assets.run_worker_first` use the public URL path. Include `/blog` in those paths when they apply to this example.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/static-assets/routing/advanced/serving-a-subdirectory/#page","headline":"Serving a subdirectory","description":"How to configure a Worker with static assets on a subpath.","url":"https://developers.cloudflare.com/workers/static-assets/routing/advanced/serving-a-subdirectory/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/static-assets/routing/advanced/serving-a-subdirectory/og.png?v=185eca9d7984ce9a","dateModified":"2026-10-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
