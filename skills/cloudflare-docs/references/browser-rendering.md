---
title: Browser Rendering
description: Control headless browsers with Cloudflare's Workers Browser Rendering API. Automate tasks, take screenshots, convert pages to PDFs, and test web apps.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/browser-rendering/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Browser Rendering

Run headless Chrome on [Cloudflare's global network](https://developers.cloudflare.com/workers/) for browser automation, web scraping, testing, and content generation.

 Available on Free and Paid plans 

Browser Rendering enables developers to programmatically control and interact with headless browser instances running on Cloudflare’s global network.

## Use cases

Programmatically load and fully render dynamic webpages or raw HTML and capture specific outputs such as:

* [Markdown](https://developers.cloudflare.com/browser-rendering/rest-api/markdown-endpoint/)
* [Screenshots](https://developers.cloudflare.com/browser-rendering/rest-api/screenshot-endpoint/)
* [PDFs](https://developers.cloudflare.com/browser-rendering/rest-api/pdf-endpoint/)
* [Snapshots](https://developers.cloudflare.com/browser-rendering/rest-api/snapshot/)
* [Links](https://developers.cloudflare.com/browser-rendering/rest-api/links-endpoint/)
* [HTML elements](https://developers.cloudflare.com/browser-rendering/rest-api/scrape-endpoint/)
* [Structured data](https://developers.cloudflare.com/browser-rendering/rest-api/json-endpoint/)
* [Crawled web content](https://developers.cloudflare.com/browser-rendering/rest-api/crawl-endpoint/)

## Integration methods

Browser Rendering offers multiple integration methods depending on your use case:

* **[REST API](https://developers.cloudflare.com/browser-rendering/rest-api/)**: Simple HTTP endpoints for stateless tasks like screenshots, PDFs, and scraping.
* **[Workers Bindings](https://developers.cloudflare.com/browser-rendering/workers-bindings/)**: Full browser automation within Workers using [Puppeteer](https://developers.cloudflare.com/browser-rendering/puppeteer/), [Playwright](https://developers.cloudflare.com/browser-rendering/playwright/), or [Stagehand](https://developers.cloudflare.com/browser-rendering/stagehand/).

| Use case                          | Recommended                                                                                                                                                  | Why                                               |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------- |
| Simple screenshot, PDF, or scrape | [REST API](https://developers.cloudflare.com/browser-rendering/rest-api/)                                                                                    | No code deployment; single HTTP request           |
| Browser automation                | [Playwright](https://developers.cloudflare.com/browser-rendering/playwright/)                                                                                | Full control with built-in tracing and assertions |
| Porting existing scripts          | [Puppeteer](https://developers.cloudflare.com/browser-rendering/puppeteer/) or [Playwright](https://developers.cloudflare.com/browser-rendering/playwright/) | Minimal code changes from standard libraries      |
| AI-powered data extraction        | [JSON endpoint](https://developers.cloudflare.com/browser-rendering/rest-api/json-endpoint/)                                                                 | Structured data via natural language prompts      |
| Site-wide crawling                | [Crawl endpoint](https://developers.cloudflare.com/browser-rendering/rest-api/crawl-endpoint/)                                                               | Multi-page content extraction with async results  |
| AI agent browsing                 | [Playwright MCP](https://developers.cloudflare.com/browser-rendering/playwright/playwright-mcp/)                                                             | LLMs control browsers via MCP                     |
| Resilient scraping                | [Stagehand](https://developers.cloudflare.com/browser-rendering/stagehand/)                                                                                  | AI finds elements by intent, not selectors        |

## Key features

* **Scale to thousands of browsers**: Instant access to a global pool of browsers with low cold-start time, ideal for high-volume screenshot generation, data extraction, or automation at scale
* **Global by default**: Browser sessions run on Cloudflare's edge network, opening close to your users for better speed and availability worldwide
* **Easy to integrate**: [REST APIs](https://developers.cloudflare.com/browser-rendering/rest-api/) for common actions, while [Puppeteer](https://developers.cloudflare.com/browser-rendering/puppeteer/) and [Playwright](https://developers.cloudflare.com/browser-rendering/playwright/) provide familiar automation libraries for complex workflows
* **Session management**: [Reuse browser sessions](https://developers.cloudflare.com/browser-rendering/workers-bindings/reuse-sessions/) across requests to improve performance and reduce cold-start overhead
* **Flexible pricing**: Pay only for browser time used with generous free tier ([view pricing](https://developers.cloudflare.com/browser-rendering/pricing/))

## Related products

**[Workers](https://developers.cloudflare.com/workers/)** 

Build serverless applications and deploy instantly across the globe for exceptional performance, reliability, and scale.

**[Durable Objects](https://developers.cloudflare.com/durable-objects/)** 

A globally distributed coordination API with strongly consistent storage. Using Durable Objects to [persist browser sessions](https://developers.cloudflare.com/browser-rendering/workers-bindings/browser-rendering-with-do/) improves performance by eliminating the time that it takes to spin up a new browser session.

**[Agents](https://developers.cloudflare.com/agents/)** 

Build AI-powered agents that autonomously navigate websites and perform tasks using [Playwright MCP](https://developers.cloudflare.com/browser-rendering/playwright/playwright-mcp/) or [Stagehand](https://developers.cloudflare.com/browser-rendering/stagehand/).

## More resources

[Get started](https://developers.cloudflare.com/browser-rendering/get-started/) 

Choose between REST API and Workers Bindings, then deploy your first project.

[Limits](https://developers.cloudflare.com/browser-rendering/limits/) 

Learn about Browser Rendering limits.

[Pricing](https://developers.cloudflare.com/browser-rendering/pricing/) 

Learn about Browser Rendering pricing.

[Playwright API](https://developers.cloudflare.com/browser-rendering/playwright/) 

Use Cloudflare's fork of Playwright for testing and automation.

[Developer Discord](https://discord.cloudflare.com) 

Connect with the Workers community on Discord to ask questions, show what you are building, and discuss the platform with other developers.

[@CloudflareDev](https://x.com/cloudflaredev) 

Follow @CloudflareDev on Twitter to learn about product announcements, and what is new in Cloudflare Workers.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-rendering/","name":"Browser Rendering"}}]}
```
