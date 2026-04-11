---
title: Automatic request headers
description: Cloudflare automatically attaches headers to every request made through Browser Rendering. These headers make it easy for destination servers to identify that these requests came from Cloudflare.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/browser-rendering/reference/automatic-request-headers.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Automatic request headers

Cloudflare automatically attaches headers to every request made through Browser Rendering. These headers make it easy for destination servers to identify that these requests came from Cloudflare.

## User-Agent

The default User-Agent depends on how you access Browser Rendering:

| Method                                                                                                                                                                                                                       | Default User-Agent                                                                                              | Customizable                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| [Quick Actions](https://developers.cloudflare.com/browser-rendering/quick-actions/)                                                                                                                                          | Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 | Yes, using the userAgent parameter          |
| [Crawl endpoint](https://developers.cloudflare.com/browser-rendering/quick-actions/crawl-endpoint/)                                                                                                                          | CloudflareBrowserRenderingCrawler/1.0                                                                           | No                                          |
| [CDP](https://developers.cloudflare.com/browser-rendering/cdp/) ([Puppeteer](https://developers.cloudflare.com/browser-rendering/puppeteer/), [Playwright](https://developers.cloudflare.com/browser-rendering/playwright/)) | The default User-Agent of the underlying Chrome version                                                         | Yes, via Puppeteer/Playwright configuration |

Note

Because the User-Agent is configurable for most methods and the Chrome version may change as Browser Rendering updates its underlying browser engine, destination servers should use the non-configurable headers below to identify Browser Rendering requests rather than relying on the User-Agent string.

## Non-configurable headers

Note

The following headers are meant to ensure transparency and cannot be removed or overridden (with `setExtraHTTPHeaders`, for example).

| Header                        | Description                                                                                                                                                                                                                                                                                     |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cf-brapi-request-id           | A unique identifier for the Browser Rendering request when using [Quick Actions](https://developers.cloudflare.com/browser-rendering/quick-actions/)                                                                                                                                            |
| cf-brapi-devtools             | A unique identifier for the Browser Rendering request when using [Puppeteer](https://developers.cloudflare.com/browser-rendering/puppeteer/), [Playwright](https://developers.cloudflare.com/browser-rendering/playwright/), or [CDP](https://developers.cloudflare.com/browser-rendering/cdp/) |
| cf-biso-devtools              | A flag indicating the request originated from Cloudflare's rendering infrastructure                                                                                                                                                                                                             |
| Signature-agent               | [The location of the bot public keys ↗](https://web-bot-auth.cloudflare-browser-rendering-085.workers.dev), used to sign the request and verify it came from Cloudflare                                                                                                                         |
| Signature and Signature-input | A digital signature, used to validate requests, as shown in [this architecture document ↗](https://datatracker.ietf.org/doc/html/draft-meunier-web-bot-auth-architecture)                                                                                                                       |

### About Web Bot Auth

The `Signature` headers use an authentication method called [Web Bot Auth](https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/). Web Bot Auth leverages cryptographic signatures in HTTP messages to verify that a request comes from an automated bot. To verify a request originated from Cloudflare Browser Rendering, use the keys found on [this directory ↗](https://web-bot-auth.cloudflare-browser-rendering-085.workers.dev/.well-known/http-message-signatures-directory) to verify the `Signature` and `Signature-Input` found in the headers from the incoming request. A successful verification proves that the request originated from Cloudflare Browser Rendering and has not been tampered with in transit.

### Bot detection

Browser Rendering uses different bot detection IDs depending on the method. [Quick Actions](https://developers.cloudflare.com/browser-rendering/quick-actions/) (excluding the [crawl endpoint](https://developers.cloudflare.com/browser-rendering/quick-actions/crawl-endpoint/)), [Puppeteer](https://developers.cloudflare.com/browser-rendering/puppeteer/), [Playwright](https://developers.cloudflare.com/browser-rendering/playwright/), and [CDP](https://developers.cloudflare.com/browser-rendering/cdp/) share one ID, while the crawl endpoint has its own.

| Method                                                                                                                                                                                                                                                                                                           | Bot detection ID |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| [Quick Actions](https://developers.cloudflare.com/browser-rendering/quick-actions/), [Puppeteer](https://developers.cloudflare.com/browser-rendering/puppeteer/), [Playwright](https://developers.cloudflare.com/browser-rendering/playwright/), [CDP](https://developers.cloudflare.com/browser-rendering/cdp/) | 119853733        |
| [Crawl endpoint](https://developers.cloudflare.com/browser-rendering/quick-actions/crawl-endpoint/)                                                                                                                                                                                                              | 128292352        |

If you are attempting to scan your own zone and want Browser Rendering to access your website freely without your bot protection configuration interfering, you can create a WAF skip rule to [allowlist Browser Rendering](https://developers.cloudflare.com/browser-rendering/faq/#can-i-allowlist-browser-rendering-on-my-own-website).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-rendering/","name":"Browser Rendering"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-rendering/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-rendering/reference/automatic-request-headers/","name":"Automatic request headers"}}]}
```
