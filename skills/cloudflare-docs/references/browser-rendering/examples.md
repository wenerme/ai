---
title: Examples
description: Use these REST API examples to perform quick, common tasks.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/browser-rendering/examples.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Examples

## REST API examples

Use these [REST API](https://developers.cloudflare.com/browser-rendering/rest-api/) examples to perform quick, common tasks.

[ Fetch rendered HTML from a URL ](https://developers.cloudflare.com/browser-rendering/rest-api/content-endpoint/#fetch-rendered-html-from-a-url) Capture fully rendered HTML from a webpage after JavaScript execution. 

[ Take a screenshot of the visible viewport ](https://developers.cloudflare.com/browser-rendering/rest-api/screenshot-endpoint/#basic-usage) Capture a screenshot of a fully rendered webpage from a URL or custom HTML. 

[ Take a screenshot of the full page ](https://developers.cloudflare.com/browser-rendering/rest-api/screenshot-endpoint/#navigate-and-capture-a-full-page-screenshot) Capture a screenshot of an entire scrollable webpage, not just the visible viewport. 

[ Take a screenshot of an authenticated page ](https://developers.cloudflare.com/browser-rendering/rest-api/screenshot-endpoint/#capture-a-screenshot-of-an-authenticated-page) Capture a screenshot of a webpage that requires login using cookies, HTTP Basic Auth, or custom headers. 

[ Generate a PDF ](https://developers.cloudflare.com/browser-rendering/rest-api/pdf-endpoint/#basic-usage) Generate a PDF from a URL or custom HTML and CSS. 

[ Extract Markdown from a URL ](https://developers.cloudflare.com/browser-rendering/rest-api/markdown-endpoint/#convert-a-url-to-markdown) Convert a webpage's content into Markdown format. 

[ Capture a snapshot from a URL ](https://developers.cloudflare.com/browser-rendering/rest-api/snapshot/#capture-a-snapshot-from-a-url) Capture both the rendered HTML and a screenshot from a webpage in a single request. 

[ Scrape headings and links from a URL ](https://developers.cloudflare.com/browser-rendering/rest-api/scrape-endpoint/#extract-headings-and-links-from-a-url) Extract structured data from specific elements on a webpage using CSS selectors. 

[ Capture structured data with an AI prompt and JSON schema ](https://developers.cloudflare.com/browser-rendering/rest-api/json-endpoint/#with-a-prompt-and-json-schema) Extract structured data from a webpage using AI using a prompt or JSON schema. 

[ Retrieve links from a URL ](https://developers.cloudflare.com/browser-rendering/rest-api/links-endpoint/#get-all-links-on-a-page) Retrieve all links from a webpage, including hidden ones. 

## Workers Bindings examples

Use [Workers Bindings](https://developers.cloudflare.com/browser-rendering/workers-bindings/) for dynamic, multi-step browser automation with [Puppeteer](https://developers.cloudflare.com/browser-rendering/puppeteer/), [Playwright](https://developers.cloudflare.com/browser-rendering/playwright/), or [Stagehand](https://developers.cloudflare.com/browser-rendering/stagehand/).

[ Get page metrics with Puppeteer ](https://developers.cloudflare.com/browser-rendering/puppeteer/#use-puppeteer-in-a-worker) Use Puppeteer to navigate to a page and retrieve performance metrics in a Worker. 

[ Take a screenshot with Playwright ](https://developers.cloudflare.com/browser-rendering/playwright/#take-a-screenshot) Use Playwright to navigate to a page, interact with elements, and capture a screenshot. 

[ Run test assertions with Playwright ](https://developers.cloudflare.com/browser-rendering/playwright/#assertions) Use Playwright assertions to test web applications in a Worker. 

[ Generate a trace with Playwright ](https://developers.cloudflare.com/browser-rendering/playwright/#trace) Capture detailed execution logs for debugging with Playwright tracing. 

[ Reuse browser sessions ](https://developers.cloudflare.com/browser-rendering/workers-bindings/reuse-sessions/) Improve performance by reusing browser sessions across requests. 

[ Persist sessions with Durable Objects ](https://developers.cloudflare.com/browser-rendering/workers-bindings/browser-rendering-with-do/) Use Durable Objects to maintain long-running browser sessions. 

[ AI-powered browser automation with Stagehand ](https://developers.cloudflare.com/browser-rendering/stagehand/#use-stagehand-in-a-worker-with-workers-ai) Use natural language instructions to automate browser tasks with AI. 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-rendering/","name":"Browser Rendering"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-rendering/examples/","name":"Examples"}}]}
```
