---
title: Custom fonts
description: Learn how to add custom fonts to Browser Rendering for use in screenshots and PDFs.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/browser-rendering/features/custom-fonts.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Custom fonts

Browser Rendering uses a managed Chromium environment that includes a [standard set of pre-installed fonts](https://developers.cloudflare.com/browser-rendering/reference/supported-fonts/). When you generate a screenshot or PDF, text is rendered using the fonts available in this environment. If your page specifies a font that is not pre-installed, Chromium will automatically fall back to a similar supported font.

If you need a specific font that is not pre-installed, you can inject it into the page at render time. You can load fonts from an external URL or embed them directly as a Base64 string.

How you add a custom font depends on how you are using Browser Rendering:

* If you are using [Workers Bindings](https://developers.cloudflare.com/browser-rendering/workers-bindings/) with [Puppeteer](https://developers.cloudflare.com/browser-rendering/puppeteer/) or [Playwright](https://developers.cloudflare.com/browser-rendering/playwright/), refer to the [Workers Bindings](#workers-bindings) section.
* If you are using the [REST API](https://developers.cloudflare.com/browser-rendering/rest-api/), refer to the [REST API](#rest-api) section.

## Workers Bindings

Use `addStyleTag` to inject a `@font-face` rule into the page before capturing your screenshot or PDF. You can load the font file from a CDN URL or embed it as a Base64-encoded string.

### From a CDN URL

* [  JavaScript ](#tab-panel-3216)
* [  TypeScript ](#tab-panel-3217)

Example with [Puppeteer](https://developers.cloudflare.com/browser-rendering/puppeteer/) and a CDN source:

JavaScript

```

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

  `

});


```

Example with [Puppeteer](https://developers.cloudflare.com/browser-rendering/puppeteer/) and a CDN source:

TypeScript

```

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

  `

});


```

### Base64-encoded

The following examples use [Playwright](https://developers.cloudflare.com/browser-rendering/playwright/), but this method works the same way with [Puppeteer](https://developers.cloudflare.com/browser-rendering/puppeteer/).

* [  JavaScript ](#tab-panel-3218)
* [  TypeScript ](#tab-panel-3219)

Example with a Base64-encoded data source:

JavaScript

```

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

  `

});


```

Example with a Base64-encoded data source:

TypeScript

```

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

  `

});


```

## REST API

When using the [REST API](https://developers.cloudflare.com/browser-rendering/rest-api/), you can load custom fonts by including the `addStyleTag` parameter in your request body. This works with both the [screenshot](https://developers.cloudflare.com/browser-rendering/rest-api/screenshot-endpoint/) and [PDF](https://developers.cloudflare.com/browser-rendering/rest-api/pdf-endpoint/) endpoints.

### From a CDN URL

Terminal window

```

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

Terminal window

```

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

For more details on using `addStyleTag` with the REST API, refer to [Customize CSS and embed custom JavaScript](https://developers.cloudflare.com/browser-rendering/rest-api/screenshot-endpoint/#customize-css-and-embed-custom-javascript).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-rendering/","name":"Browser Rendering"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-rendering/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-rendering/features/custom-fonts/","name":"Custom fonts"}}]}
```
