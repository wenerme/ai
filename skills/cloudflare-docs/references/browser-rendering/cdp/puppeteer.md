---
title: Using with Puppeteer (CDP)
description: Connect Puppeteer to Browser Rendering sessions from any Node.js environment to automate browser tasks using the Chrome DevTools Protocol.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/browser-rendering/cdp/puppeteer.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Using with Puppeteer (CDP)

You can use [Puppeteer ↗](https://pptr.dev/) to connect to Browser Rendering sessions from any Node.js environment and automate browser tasks programmatically via CDP. This is useful for scripts running on your local machine, CI/CD pipelines, or external servers.

Before you begin, make sure you [create a custom API Token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with `Browser Rendering - Edit` permission. For more information, refer to [Quick Actions — Before you begin](https://developers.cloudflare.com/browser-rendering/quick-actions/#before-you-begin).

## Prerequisites

* Node.js installed on your machine
* A Cloudflare account with Browser Rendering enabled
* A Browser Rendering API token with `Browser Rendering - Edit` permissions

## Install Puppeteer

Install the `puppeteer-core` package (the version without bundled Chrome):

 npm  yarn  pnpm  bun 

```
npm i puppeteer-core
```

```
yarn add puppeteer-core
```

```
pnpm add puppeteer-core
```

```
bun add puppeteer-core
```

## Connect to Browser Rendering

The following script demonstrates how to connect to a Browser Rendering session, navigate to a page, extract the title, and take a screenshot.

Create a file named `script.js`:

JavaScript

```

const puppeteer = require("puppeteer-core");


const ACCOUNT_ID = process.env.CF_ACCOUNT_ID || "<ACCOUNT_ID>";

const API_TOKEN = process.env.CF_API_TOKEN || "<API_TOKEN>";


const browserWSEndpoint = `wss://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/browser-rendering/devtools/browser?keep_alive=600000`;


async function main() {

  const browser = await puppeteer.connect({

    browserWSEndpoint,

    headers: {

      Authorization: `Bearer ${API_TOKEN}`,

    },

  });


  const page = await browser.newPage();

  await page.goto("https://developers.cloudflare.com");


  const title = await page.title();

  console.log(`Page title: ${title}`);


  await page.screenshot({ path: "screenshot.png" });


  await browser.close();

}


main().catch(console.error);


```

Explain Code

Replace `ACCOUNT_ID` with your Cloudflare account ID and `API_TOKEN` with your Browser Rendering API token, or set them as environment variables:

Terminal window

```

export CF_ACCOUNT_ID="<ACCOUNT_ID>"

export CF_API_TOKEN="<API_TOKEN>"


```

## Run the script

Terminal window

```

node script.js


```

You should see the page title printed to the console and a screenshot saved as `screenshot.png`.

## How it works

The script connects directly to Browser Rendering via WebSocket using the CDP protocol:

1. **WebSocket endpoint** \- The `browserWSEndpoint` URL acquires a new browser session and connects to it via WebSocket
2. **Authentication** \- The `Authorization` header with your API token authenticates the request
3. **Keep-alive** \- The `keep_alive` parameter (in milliseconds) specifies how long the session stays active
4. **Puppeteer API** \- Once connected, you use the standard Puppeteer API to control the browser

## Troubleshooting

If you have questions or encounter an error, see the [Browser Rendering FAQ and troubleshooting guide](https://developers.cloudflare.com/browser-rendering/faq/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-rendering/","name":"Browser Rendering"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-rendering/cdp/","name":"Chrome DevTools Protocol (CDP)"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-rendering/cdp/puppeteer/","name":"Using with Puppeteer (CDP)"}}]}
```
