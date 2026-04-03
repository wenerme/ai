---
title: Deploy a Browser Rendering Worker with Durable Objects
description: Use the Browser Rendering API along with Durable Objects to take screenshots from web pages and store them in R2.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ JavaScript ](https://developers.cloudflare.com/search/?tags=JavaScript) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/browser-rendering/workers-bindings/browser-rendering-with-DO.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Deploy a Browser Rendering Worker with Durable Objects

**Last reviewed:**  over 2 years ago 

By following this guide, you will create a Worker that uses the Browser Rendering API along with [Durable Objects](https://developers.cloudflare.com/durable-objects/) to take screenshots from web pages and store them in [R2](https://developers.cloudflare.com/r2/).

Using Durable Objects to persist browser sessions improves performance by eliminating the time that it takes to spin up a new browser session. Since Durable Objects re-uses sessions, it reduces the number of concurrent sessions needed.

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

## 1\. Create a Worker project

[Cloudflare Workers](https://developers.cloudflare.com/workers/) provides a serverless execution environment that allows you to create new applications or augment existing ones without configuring or maintaining infrastructure. Your Worker application is a container to interact with a headless browser to do actions, such as taking screenshots.

Create a new Worker project named `browser-worker` by running:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- browser-worker
```

```
yarn create cloudflare browser-worker
```

```
pnpm create cloudflare@latest browser-worker
```

## 2\. Install Puppeteer

In your `browser-worker` directory, install Cloudflare’s [fork of Puppeteer](https://developers.cloudflare.com/browser-rendering/puppeteer/):

 npm  yarn  pnpm  bun 

```
npm i -D @cloudflare/puppeteer
```

```
yarn add -D @cloudflare/puppeteer
```

```
pnpm add -D @cloudflare/puppeteer
```

```
bun add -d @cloudflare/puppeteer
```

## 3\. Create a R2 bucket

Create two R2 buckets, one for production, and one for development.

Note that bucket names must be lowercase and can only contain dashes.

Terminal window

```

wrangler r2 bucket create screenshots

wrangler r2 bucket create screenshots-test


```

To check that your buckets were created, run:

Terminal window

```

wrangler r2 bucket list


```

After running the `list` command, you will see all bucket names, including the ones you have just created.

## 4\. Configure your Wrangler configuration file

Configure your `browser-worker` project's [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) by adding a browser [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) and a [Node.js compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag). Browser bindings allow for communication between a Worker and a headless browser which allows you to do actions such as taking a screenshot, generating a PDF and more.

Update your Wrangler configuration file with the Browser Rendering API binding, the R2 bucket you created and a Durable Object:

Note

Your Worker configuration must include the `nodejs_compat` compatibility flag and a `compatibility_date` of 2025-09-15 or later.

* [  wrangler.jsonc ](#tab-panel-3276)
* [  wrangler.toml ](#tab-panel-3277)

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "rendering-api-demo",

  "main": "src/index.js",

  // Set this to today's date

  "compatibility_date": "2026-04-03",

  "compatibility_flags": [

    "nodejs_compat"

  ],

  "account_id": "<ACCOUNT_ID>",

  // Browser Rendering API binding

  "browser": {

    "binding": "MYBROWSER"

  },

  // Bind an R2 Bucket

  "r2_buckets": [

    {

      "binding": "BUCKET",

      "bucket_name": "screenshots",

      "preview_bucket_name": "screenshots-test"

    }

  ],

  // Binding to a Durable Object

  "durable_objects": {

    "bindings": [

      {

        "name": "BROWSER",

        "class_name": "Browser"

      }

    ]

  },

  "migrations": [

    {

      "tag": "v1", // Should be unique for each entry

      "new_sqlite_classes": [ // Array of new classes

        "Browser"

      ]

    }

  ]

}


```

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "rendering-api-demo"

main = "src/index.js"

# Set this to today's date

compatibility_date = "2026-04-03"

compatibility_flags = [ "nodejs_compat" ]

account_id = "<ACCOUNT_ID>"


[browser]

binding = "MYBROWSER"


[[r2_buckets]]

binding = "BUCKET"

bucket_name = "screenshots"

preview_bucket_name = "screenshots-test"


[[durable_objects.bindings]]

name = "BROWSER"

class_name = "Browser"


[[migrations]]

tag = "v1"

new_sqlite_classes = [ "Browser" ]


```

## 5\. Code

The code below uses Durable Object to instantiate a browser using Puppeteer. It then opens a series of web pages with different resolutions, takes a screenshot of each, and uploads it to R2.

The Durable Object keeps a browser session open for 60 seconds after last use. If a browser session is open, any requests will re-use the existing session rather than creating a new one. Update your Worker code by copy and pasting the following:

* [  JavaScript ](#tab-panel-3278)
* [  TypeScript ](#tab-panel-3279)

JavaScript

```

import { DurableObject } from "cloudflare:workers";

import * as puppeteer from "@cloudflare/puppeteer";


export default {

  async fetch(request, env) {

    const obj = env.BROWSER.getByName("browser");


    // Send a request to the Durable Object, then await its response

    const resp = await obj.fetch(request);


    return resp;

  },

};


const KEEP_BROWSER_ALIVE_IN_SECONDS = 60;


export class Browser extends DurableObject {

  browser;

  keptAliveInSeconds = 0;

  storage;


  constructor(state, env) {

    super(state, env);

    this.storage = state.storage;

  }


  async fetch(request) {

    // Screen resolutions to test out

    const width = [1920, 1366, 1536, 360, 414];

    const height = [1080, 768, 864, 640, 896];


    // Use the current date and time to create a folder structure for R2

    const nowDate = new Date();

    const coeff = 1000 * 60 * 5;

    const roundedDate = new Date(

      Math.round(nowDate.getTime() / coeff) * coeff,

    ).toString();

    const folder = roundedDate.split(" GMT")[0];


    // If there is a browser session open, re-use it

    if (!this.browser || !this.browser.isConnected()) {

      console.log(`Browser DO: Starting new instance`);

      try {

        this.browser = await puppeteer.launch(this.env.MYBROWSER);

      } catch (e) {

        console.log(

          `Browser DO: Could not start browser instance. Error: ${e}`,

        );

      }

    }


    // Reset keptAlive after each call to the DO

    this.keptAliveInSeconds = 0;


    // Check if browser exists before opening page

    if (!this.browser)

      return new Response("Browser launch failed", { status: 500 });


    const page = await this.browser.newPage();


    // Take screenshots of each screen size

    for (let i = 0; i < width.length; i++) {

      await page.setViewport({ width: width[i], height: height[i] });

      await page.goto("https://workers.cloudflare.com/");

      const fileName = `screenshot_${width[i]}x${height[i]}`;

      const sc = await page.screenshot();


      await this.env.BUCKET.put(`${folder}/${fileName}.jpg`, sc);

    }


    // Close tab when there is no more work to be done on the page

    await page.close();


    // Reset keptAlive after performing tasks to the DO

    this.keptAliveInSeconds = 0;


    // Set the first alarm to keep DO alive

    const currentAlarm = await this.storage.getAlarm();

    if (currentAlarm == null) {

      console.log(`Browser DO: setting alarm`);

      const TEN_SECONDS = 10 * 1000;

      await this.storage.setAlarm(Date.now() + TEN_SECONDS);

    }


    return new Response("success");

  }


  async alarm() {

    this.keptAliveInSeconds += 10;


    // Extend browser DO life

    if (this.keptAliveInSeconds < KEEP_BROWSER_ALIVE_IN_SECONDS) {

      console.log(

        `Browser DO: has been kept alive for ${this.keptAliveInSeconds} seconds. Extending lifespan.`,

      );

      await this.storage.setAlarm(Date.now() + 10 * 1000);

      // You can ensure the ws connection is kept alive by requesting something

      // or just let it close automatically when there is no work to be done

      // for example, `await this.browser.version()`

    } else {

      console.log(

        `Browser DO: exceeded life of ${KEEP_BROWSER_ALIVE_IN_SECONDS}s.`,

      );

      if (this.browser) {

        console.log(`Closing browser.`);

        await this.browser.close();

      }

    }

  }

}


```

[Run Worker in Playground](https://workers.cloudflare.com/playground#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-2PrRngn9cAQNREOH-hDSQVarq1qCGifJROlBRSuzlJRHqBLrT7XVhpFMaZ92ssPWQOg6YfScixcXCIzEEYV3kpgEgyRyEHE0SmS8kLATqTOK0A+YB8OPEeSfOmaY3lfOPr83A-yKMunUQkcITRiLrq-SS9hkEPhtCoLNE2M9eRgCKuRRdOrsil3LmujdltraPkzZrTWOCBZAOWsPIdE4U4znnMuNcG4I1RoPIcMW77fbRIVQyf2bctWNiXbpvVJtrleCxewq1FcySydgYahAEKvBQr6YJRsaWjg9ksOoZgmhtC6B4PwIQYgJAyAUEoWQJRbDPgqK4DwEWNL+ECNoUgYQIjRFI3AbQ6QAiELa3kDYUpijWGq+UKoNQ6iAkaM0LOGkOjFyoFMCwCwojACTFQccoxxjZCiCofIeJChpEONlnLeXggFf0MVowZXTCyGYJYIAA)

TypeScript

```

import { DurableObject } from "cloudflare:workers";

import * as puppeteer from "@cloudflare/puppeteer";


interface Env {

  MYBROWSER: Fetcher;

  BUCKET: R2Bucket;

  BROWSER: DurableObjectNamespace;

}


export default {

  async fetch(request, env): Promise<Response> {

    const obj = env.BROWSER.getByName("browser");


    // Send a request to the Durable Object, then await its response

    const resp = await obj.fetch(request);


    return resp;

  },

} satisfies ExportedHandler<Env>;


const KEEP_BROWSER_ALIVE_IN_SECONDS = 60;


export class Browser extends DurableObject<Env> {

  private browser?: puppeteer.Browser;

  private keptAliveInSeconds: number = 0;

  private storage: DurableObjectStorage;


  constructor(state: DurableObjectState, env: Env) {

    super(state, env);

    this.storage = state.storage;

  }


  async fetch(request: Request): Promise<Response> {

    // Screen resolutions to test out

    const width: number[] = [1920, 1366, 1536, 360, 414];

    const height: number[] = [1080, 768, 864, 640, 896];


    // Use the current date and time to create a folder structure for R2

    const nowDate = new Date();

    const coeff = 1000 * 60 * 5;

    const roundedDate = new Date(

      Math.round(nowDate.getTime() / coeff) * coeff,

    ).toString();

    const folder = roundedDate.split(" GMT")[0];


    // If there is a browser session open, re-use it

    if (!this.browser || !this.browser.isConnected()) {

      console.log(`Browser DO: Starting new instance`);

      try {

        this.browser = await puppeteer.launch(this.env.MYBROWSER);

      } catch (e) {

        console.log(

          `Browser DO: Could not start browser instance. Error: ${e}`,

        );

      }

    }


    // Reset keptAlive after each call to the DO

    this.keptAliveInSeconds = 0;


    // Check if browser exists before opening page

    if (!this.browser) return new Response("Browser launch failed", { status: 500 });


    const page = await this.browser.newPage();


    // Take screenshots of each screen size

    for (let i = 0; i < width.length; i++) {

      await page.setViewport({ width: width[i], height: height[i] });

      await page.goto("https://workers.cloudflare.com/");

      const fileName = `screenshot_${width[i]}x${height[i]}`;

      const sc = await page.screenshot();


      await this.env.BUCKET.put(`${folder}/${fileName}.jpg`, sc);

    }


    // Close tab when there is no more work to be done on the page

    await page.close();


    // Reset keptAlive after performing tasks to the DO

    this.keptAliveInSeconds = 0;


    // Set the first alarm to keep DO alive

    const currentAlarm = await this.storage.getAlarm();

    if (currentAlarm == null) {

      console.log(`Browser DO: setting alarm`);

      const TEN_SECONDS = 10 * 1000;

      await this.storage.setAlarm(Date.now() + TEN_SECONDS);

    }


    return new Response("success");

  }


  async alarm(): Promise<void> {

    this.keptAliveInSeconds += 10;


    // Extend browser DO life

    if (this.keptAliveInSeconds < KEEP_BROWSER_ALIVE_IN_SECONDS) {

      console.log(

        `Browser DO: has been kept alive for ${this.keptAliveInSeconds} seconds. Extending lifespan.`,

      );

      await this.storage.setAlarm(Date.now() + 10 * 1000);

      // You can ensure the ws connection is kept alive by requesting something

      // or just let it close automatically when there is no work to be done

      // for example, `await this.browser.version()`

    } else {

      console.log(

        `Browser DO: exceeded life of ${KEEP_BROWSER_ALIVE_IN_SECONDS}s.`,

      );

      if (this.browser) {

        console.log(`Closing browser.`);

        await this.browser.close();

      }

    }

  }

}


```

## 6\. Test

Run `npx wrangler dev` to test your Worker locally.

Use real headless browser during local development

To interact with a real headless browser during local development, set `"remote" : true` in the Browser binding configuration. Learn more in our [remote bindings documentation](https://developers.cloudflare.com/workers/development-testing/#remote-bindings).

## 7\. Deploy

Run [npx wrangler deploy](https://developers.cloudflare.com/workers/wrangler/commands/general/#deploy) to deploy your Worker to the Cloudflare global network.

## Related resources

* Other [Puppeteer examples ↗](https://github.com/cloudflare/puppeteer/tree/main/examples)
* Get started with [Durable Objects](https://developers.cloudflare.com/durable-objects/get-started/)
* [Using R2 from Workers](https://developers.cloudflare.com/r2/api/workers/workers-api-usage/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-rendering/","name":"Browser Rendering"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-rendering/workers-bindings/","name":"Workers Bindings"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-rendering/workers-bindings/browser-rendering-with-do/","name":"Deploy a Browser Rendering Worker with Durable Objects"}}]}
```
