---
description: How to configure a HTML handling and trailing slashes for the static assets of your Worker.
title: HTML handling
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# HTML handling

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Forcing or dropping trailing slashes on request paths (for example, `example.com/page/` vs. `example.com/page`) is often something that developers wish to control for cosmetic reasons. Additionally, it can impact SEO because search engines often treat URLs with and without trailing slashes as different, separate pages. This distinction can lead to duplicate content issues, indexing problems, and overall confusion about the correct canonical version of a page.

The [assets.html\_handling configuration](https://developers.cloudflare.com/workers/wrangler/configuration/#assets) determines the redirects and rewrites of requests for HTML content. It is used to specify the pattern for canonical URLs, thus where Cloudflare serves HTML content from, and additionally, where Cloudflare redirects non-canonical URLs to.

Take the following directory structure:

* dist
  * file.html
  * folder
    * index.html

## Automatic trailing slashes (default)

This will usually give you the desired behavior automatically: individual files (e.g. `foo.html`) will be served _without_ a trailing slash and folder index files (e.g. `foo/index.html`) will be served _with_ a trailing slash.

```jsonc
{
	"name": "my-worker",
	// Set this to today's date
	"compatibility_date": "2026-07-22",
	"assets": {
		"directory": "./dist/",
		"html_handling": "auto-trailing-slash"
	}
}
```

```toml
name = "my-worker"
# Set this to today's date
compatibility_date = "2026-07-22"

[assets]
directory = "./dist/"
html_handling = "auto-trailing-slash"
```

Based on the incoming requests, the following assets would be served:

| Incoming Request   | Response        | Asset Served            |
| ------------------ | --------------- | ----------------------- |
| /file              | 200             | /dist/file.html         |
| /file.html         | 307 to /file    | \-                      |
| /file/             | 307 to /file    | \-                      |
| /file/index        | 307 to /file    | \-                      |
| /file/index.html   | 307 to /file    | \-                      |
| /folder            | 307 to /folder/ | \-                      |
| /folder.html       | 307 to /folder  | \-                      |
| /folder/           | 200             | /dist/folder/index.html |
| /folder/index      | 307 to /folder  | \-                      |
| /folder/index.html | 307 to /folder  | \-                      |

## Force trailing slashes

Alternatively, you can force trailing slashes (`force-trailing-slash`).

```jsonc
{
	"name": "my-worker",
	// Set this to today's date
	"compatibility_date": "2026-07-22",
	"assets": {
		"directory": "./dist/",
		"html_handling": "force-trailing-slash"
	}
}
```

```toml
name = "my-worker"
# Set this to today's date
compatibility_date = "2026-07-22"

[assets]
directory = "./dist/"
html_handling = "force-trailing-slash"
```

Based on the incoming requests, the following assets would be served:

| Incoming Request   | Response        | Asset Served            |
| ------------------ | --------------- | ----------------------- |
| /file              | 307 to /file/   | \-                      |
| /file.html         | 307 to /file/   | \-                      |
| /file/             | 200             | /dist/file.html         |
| /file/index        | 307 to /file/   | \-                      |
| /file/index.html   | 307 to /file/   | \-                      |
| /folder            | 307 to /folder/ | \-                      |
| /folder.html       | 307 to /folder/ | \-                      |
| /folder/           | 200             | /dist/folder/index.html |
| /folder/index      | 307 to /folder/ | \-                      |
| /folder/index.html | 307 to /folder/ | \-                      |

## Drop trailing slashes

Or you can drop trailing slashes (`drop-trailing-slash`).

```jsonc
{
	"name": "my-worker",
	// Set this to today's date
	"compatibility_date": "2026-07-22",
	"assets": {
		"directory": "./dist/",
		"html_handling": "drop-trailing-slash"
	}
}
```

```toml
name = "my-worker"
# Set this to today's date
compatibility_date = "2026-07-22"

[assets]
directory = "./dist/"
html_handling = "drop-trailing-slash"
```

Based on the incoming requests, the following assets would be served:

| Incoming Request   | Response       | Asset Served            |
| ------------------ | -------------- | ----------------------- |
| /file              | 200            | /dist/file.html         |
| /file.html         | 307 to /file   | \-                      |
| /file/             | 307 to /file   | \-                      |
| /file/index        | 307 to /file   | \-                      |
| /file/index.html   | 307 to /file   | \-                      |
| /folder            | 200            | /dist/folder/index.html |
| /folder.html       | 307 to /folder | \-                      |
| /folder/           | 307 to /folder | \-                      |
| /folder/index      | 307 to /folder | \-                      |
| /folder/index.html | 307 to /folder | \-                      |

## Disable HTML handling

Alternatively, if you have bespoke needs, you can disable the built-in HTML handling entirely (`none`).

```jsonc
{
	"name": "my-worker",
	// Set this to today's date
	"compatibility_date": "2026-07-22",
	"assets": {
		"directory": "./dist/",
		"html_handling": "none"
	}
}
```

```toml
name = "my-worker"
# Set this to today's date
compatibility_date = "2026-07-22"

[assets]
directory = "./dist/"
html_handling = "none"
```

Based on the incoming requests, the following assets would be served:

| Incoming Request   | Response                        | Asset Served                    |
| ------------------ | ------------------------------- | ------------------------------- |
| /file              | Depends on not\_found\_handling | Depends on not\_found\_handling |
| /file.html         | 200                             | /dist/file.html                 |
| /file/             | Depends on not\_found\_handling | Depends on not\_found\_handling |
| /file/index        | Depends on not\_found\_handling | Depends on not\_found\_handling |
| /file/index.html   | Depends on not\_found\_handling | Depends on not\_found\_handling |
| /folder            | Depends on not\_found\_handling | Depends on not\_found\_handling |
| /folder.html       | Depends on not\_found\_handling | Depends on not\_found\_handling |
| /folder/           | Depends on not\_found\_handling | Depends on not\_found\_handling |
| /folder/index      | Depends on not\_found\_handling | Depends on not\_found\_handling |
| /folder/index.html | 200                             | /dist/folder/index.html         |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/#page","headline":"HTML handling · Cloudflare Workers docs","description":"How to configure a HTML handling and trailing slashes for the static assets of your Worker.","url":"https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
