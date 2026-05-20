---
title: Deploy a Browser Run Worker with Durable Objects
description: Use the Browser Run API along with Durable Objects to take screenshots from web pages and store them in R2.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

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

* [  wrangler.jsonc ](#tab-panel-4825)
* [  wrangler.toml ](#tab-panel-4826)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "rendering-api-demo",

  "main": "src/index.js",

  // Set this to today's date

  "compatibility_date": "2026-05-20",

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

compatibility_date = "2026-05-20"

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

* [  JavaScript ](#tab-panel-4827)
* [  TypeScript ](#tab-panel-4828)

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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwBWAMyiAbAHZhATlEBGGQC4WLNsA5wuNPgJHjpcxTICwAKADC6KhACmt7ABEoAZxjpXUaDeUkNeATEJFRwwHYMAERQNHYAHgB0AFaukaSoUGAOYRHRsYkpkRbWtg4Q2AAqdDB2fnAwMGB8BFA2yElwAG5wrrwIsBAA1MDouOB2FhZQwB5IJADeJE4gCHBkWQDyZEl2vBAkAL7+COjAJJG8YJS4qGCItQDumADWdgipRObTs-sAVCQ9EgwEANOz2N7HU7nAACl2ut3uyGBoPBCDS5nM8R+JFwdlQcHA+3m5hIANcdCovH8YN4AAsABQIOwARxAdlcEAANCQHJ0AJQLEmkki8GwckjobYkBg8qidBIAIQAShsAOoAZQAokqEgBzMEKugAORy9MiZBOD1cb0ifM+QtJyGQJHVDlwAJITNZ7P2EHQJAgtLsSxWayyJC2Oz23MDDgBDzg3hI3lcnvZHio1odIrF+yZ7ml8cT+0lSQSqBpDK9bI5doxwrTEBWVDT7k+pIOnPMB3tosz+wA0prNQAFAD6yrVWqVY4AggAZACSADVNWPF0ax1rLBsjU51YWJIJ7VjMPtLj1UwrLdaEDy4vYaKnlqt1nZI7siUKLegrW92yQrwwBAs5NJ0diLlQrp9rgqYyseQocpgcD6vapJ9hyCAgHsmD0hyBB2NyvICsSDauCCbx4YQ9hEXKdYNoGbgJEhqz6oW+H2MxfqsXYAEHPWZIUlSFYQHSjIsjWEAkdmToun0dhxvm6BgCAPiZgG-r2OKlAQNmGH7A8UC4IGhYANoKLIABMgjcgokgSLZYgOSQkg2SQAAsCjuQAugB6G5iQQZQLqtL7DK5mCAAHG5UgSJF3KRRI7ncklbmRbIEi+QJjrOgAqtaAZBiKKxMrYOIEQCNABtMwZ+iKTIVXA-jKbid6YdhTZMs1d5KpZekBVQv5OBVMpUHYDxLAR9L0cK+k5niqCFgoggrSQ-xHmtJDCH5Ob9p6lCxLgw32IWY0Tcddj0tmpIALIELSCQnNw9KDQ8F16mCFQ1dNJDOqKC0Cv8-2oKgXYNnyCR+uqED9FQurTTtc0YGArWFk9h3ve4TQQGaJAAOI3RUtqmYIWUyc6i6LbGXVuB6P5-m17JeDYEo1FQ3JMlwBXeNmUCLfSACEjGuAk9O3iQAA+EskELtJMWLbwJG4JRjXsdi4NN0kNv5mbKXYCRXPDAAG16-uLTgbH40OINAcMhONyb9nAlJ2EbM0MfQgra8KwuizeEIynACZJsiNSogbBKUgyvu8gkN0AJqThq2ru8KRy8AQdIkPSdha97u2uHrBvoPD13ayb-t3hbfjWOA7qDfs+FzArd4xPhLsJCQmoICcCB+AAJPMdgHEbYP56nHbZvx5MkEq7JgoBdjAaBUDgQCqD2HedhwFnGdgGAGmFcGFvZr7QEgWBEFQbsNiwYWCEz5YQa8M8yaLS395uBAqZkHimDBugNmMRdRAhQnYXm-NZby0rnyMuTJOotjOrPdMYpLqRFNgzEgdxqBZ3xJkdWkRuSLA4iAVwfhhCrQOHWfqe14BsUDsHX0csRYtwSGdEcYCEbZV+s6CocBXgkF6EyBwrhaToG-hKRa28s5CIUi2LwAAvcBDY2DZyyPsKA99SCaIADwkEMsZB6WQ4aBm0YMQYecGxB2LKA-UzEwTLigONH49JFgGMDH4dxtJTJQG8tyIKIUIB+ACaFHx3lDgTyLCHMBepxHoDNKFCAMAyFOieAgV47wEhwhADcO4TIsmnGQLaHaOtxQZCyCacIhYjayJEWIiAY5B5eLCQcOIg8QkQBaUbEpBdG5UgYTYuh+tamZnqVwsu1ikwxzlIqXKlghwVASMCHGRtB7I1agcZAaz8GVOHskGAupR6CN4KnaeDZZKWCuAVQgZB9FBhbNTYMtNBokBGF1NJr86q-xxDYABDyipDOzJM-YQyslXMutQ85zo57Wn2OfFea84AbwhDUBAGhgEBh6M8VMdVYxLA2KfZhCR4WX0gtBW+cESAPyhS6BeeKMjvH2HAPJZw6qvCXvigEl8aHil4CVMooFEBnAGVMolLEYn6gvkKrhDY+bZz5T3AVLLpSjXAGASxs0xRF0NvSCuZsITV0EWCW2IDmVCrdj0uaFRNSbm3LufcS1BCbWWitHpwLCpMXFXY2FgqsD0neq9H6gwSDWttZqHce51SnO4fA5s9sJowozNaM05FeC8CZsUoUZzBKUi5dKjVZ8l4X1XlfclT4SCDBlMtNCwpZKagfG6cgldOVNArBA7Ohbl6kuvjBVMeihyjgnCqZOM4FwrjXBuLc4b7VRq9trDC2qS5XXziQPVmDDW0kBL-OM58uUlu6iQQenbi3gTJTfJ8RxrS9s7vWx8PA7atvTM7BIo8y6RPdb7L1wywS+uAP6gibDfxBpIMtZ1K1BCRNkvHSgIpnaynIl1PFVpdqqzUsmVMu7mX7rIHQNM3oOQYsLuERicMy6yUwCQJIpD9jqOTOecFAJVKnBaHvMAuGHj3KPjTVMLyPmH2+bgX5ZHnSqPiGERohFV0fqJaw8C7xWhUGmkbKePIwAFVIvOrVWRi6lxXWu82lt7zpvVurLBfMAGLUHgO8cSdpxziXKudcYaI37gOCLV93tIlyvpL7FuGqGwLu0zqo2lzPAYtYRasupJpPQP1QgMFngIU9P4g2FLhxuwWDUMwDQWgdA8H4EIMQkgZDyCUMIYoNhHzlBcO4MLak-ABC0KQUI4QojEbgFoNI-h8EtdyOsSURQrCVbKJUaotQAQNCaBnNS7RC5UEmOYeYkRgCJioGOEYYwsiRGUHkXEBRUgHEy1lnLQQ8t6EK4YErJhhDMAsEAA)

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
