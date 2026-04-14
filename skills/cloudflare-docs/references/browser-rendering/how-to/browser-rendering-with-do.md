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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/browser-rendering/how-to/browser-rendering-with-do.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

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

* [  wrangler.jsonc ](#tab-panel-3312)
* [  wrangler.toml ](#tab-panel-3313)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "rendering-api-demo",

  "main": "src/index.js",

  // Set this to today's date

  "compatibility_date": "2026-04-13",

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

Explain Code

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "rendering-api-demo"

main = "src/index.js"

# Set this to today's date

compatibility_date = "2026-04-13"

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

Explain Code

## 5\. Code

The code below uses Durable Object to instantiate a browser using Puppeteer. It then opens a series of web pages with different resolutions, takes a screenshot of each, and uploads it to R2.

The Durable Object keeps a browser session open for 60 seconds after last use. If a browser session is open, any requests will re-use the existing session rather than creating a new one. Update your Worker code by copy and pasting the following:

* [  JavaScript ](#tab-panel-3314)
* [  TypeScript ](#tab-panel-3315)

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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwAmAOwjhARgCcw4YMkAuFizbAOcLjT4CR4uTLkKAsACgAwuioQAptewARKAGcY6Z1GhXFJNXgLEJFRwwDYMAERQNDYAHgB0AFbO4aSoUGB2IWGR0fFJ4WaW1nYQ2AAqdDA2PnAwMGB8BFBWyAlwAG5wzrwIsBAA1MDouOA2ZmZQwG5IJADeJA4gCHBkGQDyZAk2vBAkAL6+COjAJOG8YJS4qGCI1QDumADWNgjJRKaT07sAVCRdJDAQHUbLYXodjqcAALnS7XW7IQHA0EIFKmUyxL4kXA2VBwcC7WamEh-Zx0Ki8Xwg3gACwAFAgbABHEA2ZwQAA0JDs7QAlHMicSSLwrGySOhNiQGFyqO04gAhABKawA6gBlACiCriAHMQXK6AA5LK08JkI53ZwvcI894C4nIZAkVV2XB-EgM5ms3YQdAkCDUmwLJYrDIkDZbHac-12P53OCeEieZzu1luKiWu1CkW7BmuSWx+O7cUJOKoKl0j0stk2tGClMQJZUFOud7Evbs0x7W3C9O7ADS6vVAAUAPqKlUahUjgCCABkAJIANXVI-nBpHGvMawNDlV+YAbIJbRjMLtzl1k3LzZaEFyYrYaMnFstVjZw9sCQKzegLS9WyRnhgCBpwadobHnKhnR7XBkylI8BTZTA4F1W1iR7NkEBAHZMFpNkCBsTluT5Qk62cIEXlwwhbEImUazrf0XDiRDll1fM8NsJifRYmx-z2WsSTJCkywgGl6SZKsIGIzMHSdHobBjXN0DAEAvHTP1fVsUVKAgTN0N2O4oFwf18wAbUMQROUkABmfd90sgBWGzORsiySAAFkkNyAF1-zQ7MSADKBtWpXYpTMwQAA5XNEfcIs5CL9zczlEtciLpH3Hz+PtR0AFVLT9AMhSWBlrCxfC-hoP1JkDH0hQZcq4F8JTsVvDCsIbBkmtvBVhF0-yqB-BxyqlKgbDuBZ8NpOjBT0rMcVQfNJEEZaSF+Q9VpIezfKzXt3UoaJcCG2x81G8ajpsWlM2JABZAhqTiI5uFpAa7nOnUQTKaqppIR1hXmvlfj+1BUA7OseTiH1VQgXoqG1KbttmjAwBa-NHoOt7XAaCATRIABxa6ymtEzBEy6THXnBbo06lw3W-X9WtZDwrDFKoqE5BkuHyzxMygBbaQAQgY5w4jpm8SAAH3FkhBepRjRZeOIXCKUadhsXApqkus-PTJSbDiC44YAAyvH8xYcNYfChxBoFhoIxsTXs4HJGxDem+j6H5LXBSFkXrzBKU4DjBNESqZF9bxck6R97k4mugBNcc1U1N3BQOXgCBpEhaRsTWvZ25xdf19A4aurXjb929zZ8SxwFdAbdjwmZ5dvKI8OduISHVBAjgQHwABJZhsPZDdBvOU7bTM+LJkgFVZEEAJsICQKgMC-lQWxbxsOBM-TsAwHUgrA3NzMfcA4DQPAyDtisGD83g6fzADXhHkTBbm7vFwIGTMgcUwQN0FZlEbUAJkI2B5nzGWcsK48lLgyDqTZToz1TCKC64QTb0xIDcagmdcTpDVuETk8x2IgGcD4eyK09g1j6rteArEA5B29LLYWzc4inSHKA+GWUfqOjKHAZ4JBugMjsM4ak6Av5igWlvTOgj5JNg8AALzAXWNgWcMi7CgHfUgGiAA8JADJGXuhkWG-otH9H6LnOsgdCwgN1ExEEi4oBjS+LSeY+j-Q+DcdSEyUAvKckCsFCAPh-EhW8V5fY48CzB1ATqMR6ATQhQgDAUhDoHgIGeK8OIMIQBXBuAyTJxxkDWm2trUUaQMhGlCPmQ2MjhGiIgCOAenjQl7BiAPYJEBmmG2KfnBuFJ6HWNoXrGp6Y6mcNLlYhM0cZTyhyuYAcZQ4iAmxobAeSMWp7GQKsvBFSh6JBgNqEeAjeApynnWGS5gLj5UIGQPRAYmxU0DDTAaJAhidVSS-WqP8sRWH-vcwqgzMwTN2IMzJlyLpULOY6Welpdhn2XqvOA68wRVAQGoIBfouiPGTLVaMCw1gnyYXEOFF8IJQRvrBEg99IVOnnritIrxdhwFyScWqzxF54r+BfahopeDFRKCBRAJx+mTMJcxaJupz6Cs4XWXmWdeXd35cyyUI1wBgAsTNEUhcDa0nLqbMEVcBEghtsAplgrXbdNmmUdU65Nzbl3ItQQG0lrLW6UCgqjExW2JhQKrAtI3ovW+v0EgVqbXqi3DuVUJyuFwMbHbca0K0yWhNGRXgvBGZFIFKcgS5JOVSvVafRe58V6XzJY+Eg-QpRLVQoKGS6p7wunIBXDlDQyzgKzgWpeJKr7QWTLogcw4xxKiTlOOcS4Vxrg3GGu1kbPZa3Qlq4ul084kF1Rgg11J-g-xjGfTlxauokAHh2otYFSXX0fAcS0PaO51ofDwW2LbUxOziCPUuES3U+09UMkEPrgB+vwqwn8gaSBLSdctQQESZJx0oEKJ20oyKdVxRaHaKtVKJmTDuple6yB0BTJ6Nk6KC6hAYrDUuMlMAkASCQ3YajExnjBX8FSxwmi7zADhu4dzD7U2TM895B8vm4B+aRx0KjYghHqARFd77CUsLAq8ZoVApqG0nlyMA+USJzs1RkIuJdl2rrNhbO8aa1Zq0wbzf+C0B79tHInScM4FzLlXKG8Nu49jCxfV7CJsraQ+2buqus86tPasNhc9w6KWHmtLsSKTUC9UIFBe4cF3S+J1mS-sTsZgVDMDUBoLQPB+BCDEBIQw8hJCFCsA+UoThXChdUj4PwGhSDBFCBEIjcANApF8Hgpr2RVjigKBYcrJRyiVGqH8OoDR06qVaAXKg4xTCzHCMAeMVARxDBGBkcIigcjYjyMkPYGXMvZYCLlnQBX9BSFkCV5gZggA)

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

Explain Code

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
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-rendering/","name":"Browser Rendering"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-rendering/how-to/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-rendering/how-to/browser-rendering-with-do/","name":"Deploy a Browser Rendering Worker with Durable Objects"}}]}
```
