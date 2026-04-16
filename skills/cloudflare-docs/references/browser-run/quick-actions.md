---
title: Quick Actions
description: Quick Actions provide simple HTTP endpoints for common browser tasks like capturing screenshots, extracting HTML content, generating PDFs, and more.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/browser-run/quick-actions/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Quick Actions

Quick Actions provide simple HTTP endpoints for common browser tasks like capturing screenshots, extracting HTML content, generating PDFs, and more.

The following are the available options:

* [ /content - Fetch HTML ](https://developers.cloudflare.com/browser-run/quick-actions/content-endpoint/)
* [ /screenshot - Capture screenshot ](https://developers.cloudflare.com/browser-run/quick-actions/screenshot-endpoint/)
* [ /pdf - Render PDF ](https://developers.cloudflare.com/browser-run/quick-actions/pdf-endpoint/)
* [ /markdown - Extract Markdown from a webpage ](https://developers.cloudflare.com/browser-run/quick-actions/markdown-endpoint/)
* [ /snapshot - Take a webpage snapshot ](https://developers.cloudflare.com/browser-run/quick-actions/snapshot/)
* [ /scrape - Scrape HTML elements ](https://developers.cloudflare.com/browser-run/quick-actions/scrape-endpoint/)
* [ /json - Capture structured data using AI ](https://developers.cloudflare.com/browser-run/quick-actions/json-endpoint/)
* [ /links - Retrieve links from a webpage ](https://developers.cloudflare.com/browser-run/quick-actions/links-endpoint/)
* [ /crawl - Crawl web content ](https://developers.cloudflare.com/browser-run/quick-actions/crawl-endpoint/)
* [ Reference ](https://developers.cloudflare.com/api/resources/browser%5Frendering/)

Use Quick Actions when you need a fast, simple way to perform common browser tasks such as capturing screenshots, extracting HTML, or generating PDFs without writing complex scripts. For more advanced automation, custom workflows, or persistent browser sessions, use [Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/), [Playwright](https://developers.cloudflare.com/browser-run/playwright/), or [CDP](https://developers.cloudflare.com/browser-run/cdp/).

## Before you begin

Before you begin, make sure you [create a custom API Token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the following permissions:

* `Browser Rendering - Edit`

Note

You can monitor Browser Run (formerly Browser Rendering) usage in two ways:

* In the Cloudflare dashboard, go to the **Browser Run** page to view aggregate metrics, including total Quick Actions requests and total browser hours used.[ Go to **Browser Run** ](https://dash.cloudflare.com/?to=/:account/workers/browser-run)
* `X-Browser-Ms-Used` header: Returned in every Quick Actions response, reporting browser time used for that request (in milliseconds).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-run/","name":"Browser Run"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-run/quick-actions/","name":"Quick Actions"}}]}
```
