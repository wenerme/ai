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

* [  wrangler.jsonc ](#tab-panel-3282)
* [  wrangler.toml ](#tab-panel-3283)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "rendering-api-demo",

  "main": "src/index.js",

  // Set this to today's date

  "compatibility_date": "2026-04-09",

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

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "rendering-api-demo"

main = "src/index.js"

# Set this to today's date

compatibility_date = "2026-04-09"

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

* [  JavaScript ](#tab-panel-3284)
* [  TypeScript ](#tab-panel-3285)

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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwBGAGwBmYSMmCALKIBcLFm2Ac4XGnwEiJU4TPkBYAFABhdFQgBTK9gAiUAM4x0TqNEsKSqvAWIkVHDA1gwARFA01gAeAHQAVk5hpKhQYLbBoRFRcYlhphZWthDYACp0MNbecDAwYHwEUJbI8XAAbnBOvAiwEADUwOi44NamplDArkgkAN4k9iAIcGTpAPJk8da8ECQAvj4I6MAkYbxglLioYIhVAO6YANbWCElEJhNTOwBUJJ0kMCBatYbM8DkcTgABM4XK43ZAAoEghDJEwmGKfEi4ayoODgHYzEwkX5OOhUXg+YG8AAWAAoENYAI4gaxOCAAGhItjaAEpZoSiSReJZWSR0BsSAxOVQ2rEAEIAJVWAHUAMoAUXlsQA5sDZXQAHKZGlhMiHW5OZ5hblvflE5DIEgq2y4X4kelMlk7CDoEgQKnWeaLZbpEjrTbbDl+2y-W5wDwkDxON0s1xUC22wXCnb0lwSmNxnZi+KxVCU2nu5ms62ogXJiCLKjJlxvIm7NkmXY2oVpnYAaTVaoACgB9BXK9Xy4cAQQAMgBJABqauHc-1w-VZlW+vsKrzokENvRmB2Z06SdlZotCE50RsNCTCyWK2sYa2+P5pvQ5ueLZITxgEBTvUbTWHOVBOt2uBJpKB78qymBwDqNpEt2rIICA2yYDSrIENYHJcryBK1k4gLPNhhA2Ph0rVrWfrOLE8FLDqeY4TYDHekx1i-rsNbEqS5KlhA1J0oylYQIRGb2o63TWNGOboGAICeGmvo+jYIqUBAGaoTstxQLgfp5gA2sIACcABMggcgYoiiNZACs4h2SQTlWSQsjCLIAC6v4oVmJD+lAWpUjskomYIAAcbkAOyiBFHIRaIsgcklbkRaZog+bxdoOgAqhavr+oKiz0lYmK4b8NC+hMAbeoK9IVXAPgKVi15oRh9b0s117yuZ2n+VQX72BVkpUNYtzzLhNI0QKOmZtiqB5lIgiCCQPz7mtJD2b5mY9m6lBRLgw02HmY0Tcd1g0hmRIALIEFSsSHNwNKDbcF3asCpQ1dNJAOkKC28j8-2oKg7a1tysTeiqEA9FQWrTTtc0YGArV5k9h3vS49QQMaJAAOI3aUVpGYIWWSQ6c6LVGXXOK6n7fm1LLuJYoqVFQHL0lwBUeBmUCLTSACEdFOLE9NXiQAA+EskELVL0WLzyxM4hRjds1i4NNEm1n5aYKdYsTnPDAAGF5fuL9irN40OINAcOBONCY9nAZLWEbM20fQfLawKwui5eoKSnAsbxgilRIgbuJkrSvtcrEN0AJpjqqGruwK+y8AQ1IkDS1ha97u1OHrBvoPD13ayb-vXhb3gWOALqDTsOHTAr16RDhLuxCQaoIIcCDeAAJDM1i7EbYP56nrYZjx5MkPKLLAn+1gAUBUAgb8qA2Ne1hwFnGdgGAqmFQGFsZr7-6AcBoHgVslhQXmsEz2Y-q8A8CaLS3N7OBASZkNimABugNmkQtT-EQtYXm-NZby0rtyMu9JOqNjOrPFMwpLphFNgzEg1xqBZxxGkdWYQORzFYiAJw3h7IrT2NWfqe14DMUDsHL0csRYt1iGdQcYCEbZV+g6UocAngkC6PSWwTgqToG-qKRa28s5CNko2dwAAvcBtY2DZ3SDsKA99SCaIADwkD0gZB66Q4Z+m0X0PoedaxBwLKAnUDFgQLigONT4NI5gGL9N4dxVIjJQC8hyQKwUIDeACSFHxXkqE7SJNYkOYDtTiPQMaEKEAYBkPtPcBATwXixGhCAS41x6TZKOMgK0kSC47FSOkQ0IQ8xG1kSIsREBhyDy8WE3Y0RB4hIgK0o2pS5pdDzNEnYdD9Z1LTA0rhZdBmFXorHWUuUzD9lKLEAEOMjaD2Rq1XYyB1n4KqcPBIMAtSj0EbwVO09axSTMOcAqhAyD6P9I2amAZaaDRIIMLq6TX51V-piSwADHlFWGRmKZwzsnXMutQi5Do54Wh2OfFea84Ab1BJUBAqhgG+k6A8JMdUozzFWKfZhsR4WXzAhBW+0ESAPyhY6BeeLUgvB2HAfJxw6pPCXvi34l8aEil4CVYoQFEDHAYTY32jFYk6gvkKrhtY+bZz5T3AVLKJSjXAGASxs1hRF0NjSCuZtQTV0EcCW2IDmVCrdr0-ypQ1Rrg3FuHcS1Vo-GWrBb2UyxUcVibCwVWAaTvVej9PoJBrW2rVJubcKozncPgQ2e2E0YWpgtMaEivBeBMxKfyc5fEyRculRqs+S8L6ryvuS+8JA+iSikMhAUUk1S3mdOQSunL6ilggdnAty9SXX0gkmPR-YhyjkVMnScs5FzLlXOuMN9rI1e21qhbVJcrr5xIHqzBhqqR-F-tGc+XLi3dRIIPDtRaQJkpvvefYFoe2dzrXeHgdsW0pmdrEUeZcJ75njB6hCdjvUsr9bhNhX5A0kCkJtF1b6pLx0oIKZ2UoSJdTxeaXaqtlIJiTDu5le6yB0GTB6VkGLC4hDonDMuUlMAkHiKQnY6iEwnnBb8JSRxGh7zANh24Dyj40yTK8z5h8fm4D+SRh0qiYjBDqHhFd7qiWsJAi8JoVBppGynpyMABUiJzq1ekYupdl2rvNpbG8ab1bqywXzABi1B79pHEnCc055xLhXKG8NO5dgixfd7N9cqaS+xbhq2s87NM6qNlctwGLWEWrLlExh0yWGVzBW4CFpSeK1iS3sDsphlDMFUOoTQPB+BCDEDIAwUhjDmEsHeEojgXAheUt4Xw6hSBBBCOEQjcB1DJB8PgxrWQVhinyKVoodhyiVGqLUeoGdlItELlQMYJgZhhGAHGKgw5BjDHSGEBQ2QsS5CSLsdLGWsv+By9ofLehpDFdEMwUwQA)

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
