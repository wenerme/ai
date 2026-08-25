---
description: Learn how to add custom fonts to Browser Run for use in screenshots and PDFs.
title: Custom fonts
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom fonts

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/browser-run/features/custom-fonts/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Browser Run uses a managed Chromium environment that includes a [standard set of pre-installed fonts](https://developers.cloudflare.com/browser-run/reference/supported-fonts/). When you generate a screenshot or PDF, text is rendered using the fonts available in this environment. If your page specifies a font that is not pre-installed, Chromium will automatically fall back to a similar supported font.

If you need a specific font that is not pre-installed, you can inject it into the page at render time. You can load fonts from an external URL or embed them directly as a Base64 string.

How you add a custom font depends on how you are using Browser Run:

* If you are using [Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/), [Playwright](https://developers.cloudflare.com/browser-run/playwright/), or [CDP](https://developers.cloudflare.com/browser-run/cdp/), refer to the [Browser sessions](#browser-sessions) section.
* If you are using [Quick Actions](https://developers.cloudflare.com/browser-run/quick-actions/), refer to the [Quick Actions](#quick-actions) section.

## Browser sessions

Use `addStyleTag` to inject a `@font-face` rule into the page before capturing your screenshot or PDF. You can load the font file from a CDN URL or embed it as a Base64-encoded string.

The examples below use [Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/) with [Workers Bindings](https://developers.cloudflare.com/browser-run/puppeteer/#use-puppeteer-in-a-worker). If you are connecting via [CDP](https://developers.cloudflare.com/browser-run/cdp/), the only difference is how you connect to the browser. Once connected, `page.addStyleTag()` works the same way. Refer to [CDP connection example](#cdp-connection-example) for details.

### From a CDN URL

Example with [Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/) and a CDN source:

```js
const browser = await puppeteer.launch(env.MYBROWSER);
const page = await browser.newPage();
await page.addStyleTag({
	content: `
    @font-face {
      font-family: 'CustomFont';
      src: url('https://your-cdn.com/fonts/MyFont.woff2') format('woff2');
      font-weight: normal;
      font-style: normal;
    }

    body {
      font-family: 'CustomFont', sans-serif;
    }
  `,
});
```

Example with [Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/) and a CDN source:

```ts
const browser = await puppeteer.launch(env.MYBROWSER);
const page = await browser.newPage();
await page.addStyleTag({
	content: `
    @font-face {
      font-family: 'CustomFont';
      src: url('https://your-cdn.com/fonts/MyFont.woff2') format('woff2');
      font-weight: normal;
      font-style: normal;
    }

    body {
      font-family: 'CustomFont', sans-serif;
    }
  `,
});
```

### Base64-encoded

The following examples use [Playwright](https://developers.cloudflare.com/browser-run/playwright/), but this method works the same way with [Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/).

Example with a Base64-encoded data source:

```js
const browser = await playwright.launch(env.MYBROWSER);
const page = await browser.newPage();
await page.addStyleTag({
	content: `
    @font-face {
      font-family: 'CustomFont';
      src: url('data:font/woff2;base64,<BASE64_STRING>') format('woff2');
      font-weight: normal;
      font-style: normal;
    }

    body {
      font-family: 'CustomFont', sans-serif;
    }
  `,
});
```

Example with a Base64-encoded data source:

```ts
const browser = await playwright.launch(env.MYBROWSER);
const page = await browser.newPage();
await page.addStyleTag({
	content: `
    @font-face {
      font-family: 'CustomFont';
      src: url('data:font/woff2;base64,<BASE64_STRING>') format('woff2');
      font-weight: normal;
      font-style: normal;
    }

    body {
      font-family: 'CustomFont', sans-serif;
    }
  `,
});
```

### CDP connection example

When connecting via [CDP](https://developers.cloudflare.com/browser-run/cdp/), you connect to the browser using a WebSocket endpoint instead of a Workers Binding. Once connected, you use `page.addStyleTag()` the same way as the examples above.

```js
import puppeteer from "puppeteer-core";

const ACCOUNT_ID = "your-account-id";
const API_TOKEN = "your-api-token";

// Create a browser session via CDP
const response = await fetch(
	`https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/browser-rendering/devtools/browser`,
	{
		method: "POST",
		headers: { Authorization: `Bearer ${API_TOKEN}` },
	},
);
const { webSocketDebuggerUrl } = await response.json();

// Connect Puppeteer to the session
const browser = await puppeteer.connect({
	browserWSEndpoint: webSocketDebuggerUrl,
	headers: { Authorization: `Bearer ${API_TOKEN}` },
});

const page = await browser.newPage();

// Add a custom font — same as with Workers Bindings
await page.addStyleTag({
	content: `
    @font-face {
      font-family: 'CustomFont';
      src: url('https://your-cdn.com/fonts/MyFont.woff2') format('woff2');
      font-weight: normal;
      font-style: normal;
    }

    body {
      font-family: 'CustomFont', sans-serif;
    }
  `,
});

// Take a screenshot, generate a PDF, etc.
await page.goto("https://example.com");

browser.disconnect();
```

## Quick Actions

When using [Quick Actions](https://developers.cloudflare.com/browser-run/quick-actions/), you can load custom fonts by including the `addStyleTag` parameter in your request body. This works with both the [screenshot](https://developers.cloudflare.com/browser-run/quick-actions/screenshot-endpoint/) and [PDF](https://developers.cloudflare.com/browser-run/quick-actions/pdf-endpoint/) endpoints.

### From a CDN URL

```bash
curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/screenshot' \
  -H 'Authorization: Bearer <apiToken>' \
  -H 'Content-Type: application/json' \
  -d '{
    "url": "https://example.com/",
    "addStyleTag": [
      {
        "content": "@font-face { font-family: '\''CustomFont'\''; src: url('\''https://your-cdn.com/fonts/MyFont.woff2'\'') format('\''woff2'\''); font-weight: normal; font-style: normal; } body { font-family: '\''CustomFont'\'', sans-serif; }"
      }
    ]
  }' \
  --output "screenshot.png"
```

### Base64-encoded

```bash
curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/screenshot' \
  -H 'Authorization: Bearer <apiToken>' \
  -H 'Content-Type: application/json' \
  -d '{
    "url": "https://example.com/",
    "addStyleTag": [
      {
        "content": "@font-face { font-family: '\''CustomFont'\''; src: url('\''data:font/woff2;base64,<BASE64_STRING>'\'') format('\''woff2'\''); font-weight: normal; font-style: normal; } body { font-family: '\''CustomFont'\'', sans-serif; }"
      }
    ]
  }' \
  --output "screenshot.png"
```

For more details on using `addStyleTag` with Quick Actions, refer to [Customize CSS and embed custom JavaScript](https://developers.cloudflare.com/browser-run/quick-actions/screenshot-endpoint/#customize-css-and-embed-custom-javascript).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/features/custom-fonts/#page","headline":"Custom fonts · Cloudflare Browser Run docs","description":"Learn how to add custom fonts to Browser Run for use in screenshots and PDFs.","url":"https://developers.cloudflare.com/browser-run/features/custom-fonts/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
