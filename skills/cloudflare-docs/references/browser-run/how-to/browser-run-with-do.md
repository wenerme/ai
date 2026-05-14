---
title: Deploy a Browser Run Worker with Durable Objects
description: Use the Browser Run API along with Durable Objects to take screenshots from web pages and store them in R2.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ JavaScript ](https://developers.cloudflare.com/search/?tags=JavaScript) 

# Deploy a Browser Run Worker with Durable Objects

**Last reviewed:**  over 2 years ago 

By following this guide, you will create a Worker that uses the Browser Run API along with [Durable Objects](https://developers.cloudflare.com/durable-objects/) to take screenshots from web pages and store them in [R2](https://developers.cloudflare.com/r2/).

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

In your `browser-worker` directory, install Cloudflare’s [fork of Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/):

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

Update your Wrangler configuration file with the Browser Run API binding, the R2 bucket you created and a Durable Object:

Note

Your Worker configuration must include the `nodejs_compat` compatibility flag and a `compatibility_date` of 2025-09-15 or later.

* [  wrangler.jsonc ](#tab-panel-4802)
* [  wrangler.toml ](#tab-panel-4803)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "rendering-api-demo",

  "main": "src/index.js",

  // Set this to today's date

  "compatibility_date": "2026-05-14",

  "compatibility_flags": ["nodejs_compat"],

  "account_id": "<ACCOUNT_ID>",

  // Browser Run API binding

  "browser": {

    "binding": "MYBROWSER",

  },

  // Bind an R2 Bucket

  "r2_buckets": [

    {

      "binding": "BUCKET",

      "bucket_name": "screenshots",

      "preview_bucket_name": "screenshots-test",

    },

  ],

  // Binding to a Durable Object

  "durable_objects": {

    "bindings": [

      {

        "name": "BROWSER",

        "class_name": "Browser",

      },

    ],

  },

  "migrations": [

    {

      "tag": "v1", // Should be unique for each entry

      "new_sqlite_classes": [

        // Array of new classes

        "Browser",

      ],

    },

  ],

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "rendering-api-demo"

main = "src/index.js"

# Set this to today's date

compatibility_date = "2026-05-14"

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

* [  JavaScript ](#tab-panel-4804)
* [  TypeScript ](#tab-panel-4805)

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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwBOAKwAWAIwBmABwB2aQCZJogFwsWbYBzhcafASIkyFy1QFgAUAGF0VCAFMH2ACJQAzjHQeo0e2ok2ngExCRUcMCODABEUDSOAB4AdABWHjGkqFBgzpHRcQkp6THWdg7OENgAKnQwjoFwMDBgfARQ9sipcABucB68CLAQANTA6LjgjtbWUMDeSCQA3iSuIAhwZLkA8mSpjrwQJAC+QQjowCQxvGCUuKhgiA0A7pgA1o4IGURWcwtHACoSP0SDAQM1HE5PmcLlcAAI3O4PJ7IMEQqEITJWKxJf4kXCOVBwcBHJZWEjAjx0Ki8IKQ3gACwAFAhHABHECODwQAA0JGcPQAlMtyRSSLx7NySOg9iQGPyqD1kgAhABK2wA6gBlACiquSAHNIcq6AA5fJMmJkc7PDyfGKCn6iinIZAkLXOXDAkisjlco4QdAkCAMxyrdabXIkXb7Q58kPOYHPOB+Eh+Dw+rneKh253iyVHVleOVJlNHGWpZKoenM32c7mO7FizMQdZUTNeH4U448qzHJ0SnNHADSOp1AAUAPpqzW61WTgCCABkAJIANR1k5Xpsnups21Nri1JYAbIInbjMEcbv0M8qbXaEPzEk4aBm1hsto4YwdSaLregtqfF2JAfDAEALq0PSOCuVAeoOuAZvK56itymBwEaToUoO3IICAhyYEy3IEI4fICsKZLNh44KfERhBOGRiqNs2IaeMkaEbEaJbEU47GBpxjggccTaUtStLVhAjIsuy9YQBReauu6gyOImRboGAID+DmwZBk4UqUBAeY4UczxQLgIYlgA2pIwhKIIfIyCeJ4OaI0jOSQbn2SQUjiAAuiB2EFiQoZQAaDJHPK1mCLIXnyCesh8rIJ7iHyyVebIwgnv5Ikum6ACqdrBqG4rrKyDj4iRwI0MGcxhoG4qspVcBBOpBJPrh+GtqyLVPqqShGUFVCAa4lXylQjjPKsJFMsxYrGfmhKoCWkiCKtJBAme60kKIAX5kOPqUAkuAjU4JbjZNJ2OEyeYUgAsgQDLJOc3BMkNzyXYakLVLVM0kG6EqLcKQIA6gqC9s2grJIGWoQEMVAGjNu3zRgYBtSWz1HR9XitBAlokAA4rd1QOpZgjZQpborktCbdZ43oAUB7Vcr49jSvUVB8qyXCFX4eZQEtTIAISsR4yQM4+JAAD6SyQwsMmx4ufMknjlONhyOLgM3yc2gU5upjjJLcCMAAb3oBEuuNsgQw4g0Dw+EE1pkOcA0o4xuzSx9AijrYoi2LD7QvKcDJqmaL1BihvEjSzJ+wKyS3QAmjO2p6h7YqnLwBCMiQTKONrPt7R4+uG+gCM3TrpsB0+luBHY4BekNRzEYsitPvExGu8kJA6gg5wIIEAAkSyOMcxvgwXafdnmwkUyQqpcpCoGOOBkFQNBwKoE4T6OHA2eZ2AYA6UVYaW3mftgRBUEwXBBz2IhJYobPNihrwbxpktrfPp4EAZmQhKYGGdA7N4gGlBBhRwfMBZywVlXQU5dWRdXbOdOeWZJRXRiGbRmJBHjUGzkSHIGsYh8hWDxEAHhAiiDWscRsA19rwC4kHEOAZ5ai1bskc645wGIxyn9N01Q4AfBIAMVkzgPAMnQD-aUS0d7Z2ESpdsvgABeEDmxsBzrkI4UAH6kC0QAHhIKZcyj1cjwxDDokYIx87NmDmWMBRp2KQjXFACa-wmQrEMSGQIHiGSWSgL5PkIUwoQECIE8KvjfInEnqWUO4DDQSPQJacKEAYDkNdK8BAHwvjJERCAe4jxWTZIuMgB0u1dZSmyLkc0UQSzGzkaI8REBJxD28eE44iQh6hIgK042pTC5N1pIw2x9CDZ1JzA07h5cbGpljoqFUeUbCjmqMkMEuNjZDxRm1Y4yB1kEKqSPNIMADRjyEbwNOM9myKRsLcQqhAyAGNDO2GmYY6ZDRIOMbq6S371T-viewgDHnFWGXmKZRxhnZOuVdGhFy3TzztEcC+q915wE3tCeoCBtAgODP0N4GZ6oJlWNsM+LDkgIqvrBeCd8kIkEftC90i98XZC+EcOA+TLj1Q+MvAlwIr60KlLwUqlRIKIEuIM6ZxKOKxKNJfYV3Dmz8xzvy3ugrWVyjGuAMAVi5qSmLkbJkldzbQhrkIyEdtQEsuFe7Xp81qg6h3HuA8R5lqCC2itVavSQVFTYhK+xcKhVYCZB9N6v0RgkBtXanU+5DxajOTwhBbYHaTVhdmO0lpqK8F4MzEpopzmiRpNymVmrz7L0vmva+FK3wkBGPKFaWExSKR1C+T05Aq5ctaNWSBOci0rzJTfBCGZ9GjgnNOdUKd5zLnXJubcu4I0Oujd7HWOEdWl2ugXEg+qsFGoZCCP+iYL7ctLT1EgQ8u0luguS2+b5Th2j7V3Btr4eD2zbVmF2yQx7lyiR6v23qRmQj9cAANJF2GAWDSQFaLrVqCCiYpBOlBxQuwVNRbq+LbR7TVlpNMGY90soPWQOgmY-TckxUXKIrF4bl0UpgEgqQyFHA0Wma8ELgSaQuO0feYA8PPAecfWmGZXmfKPj83AfzyNujUUkSILRSJrs-cSth0EvgdCoDNY209+RgEKpRBd2rcglzLqu9dFsrbPgzRrDW2D+aAKWkPQdU5k5zkXKuDcW5w2RqPMcUWb6fZRPlUyP2rdNXNkXTp3Vxsrk+ExWwy15cKQyZgQahA4KfCQt6cJZsqWTh9msJoZg2hdD6B4PwIQYgpByEUCoUQZR7CviqO4Lw4WtKBGCLoUgEQoixBI3AXQmQggENawULYMpSi2Cq5UGodQGjAmaK0TOWkuhFyoDMKwSwYjABTFQSc4xJi5BiGoQoBJigZGOFl7LuXQj5cMEVkwpXzCiGYNYIAA)

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

Run [npx wrangler deploy](https://developers.cloudflare.com/workers/wrangler/commands/workers/#deploy) to deploy your Worker to the Cloudflare global network.

## Related resources

* Other [Puppeteer examples ↗](https://github.com/cloudflare/puppeteer/tree/main/examples)
* Get started with [Durable Objects](https://developers.cloudflare.com/durable-objects/get-started/)
* [Using R2 from Workers](https://developers.cloudflare.com/r2/api/workers/workers-api-usage/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-run/","name":"Browser Run"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-run/how-to/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-run/how-to/browser-run-with-do/","name":"Deploy a Browser Run Worker with Durable Objects"}}]}
```
