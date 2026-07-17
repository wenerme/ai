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

```sh
wrangler r2 bucket create screenshots
wrangler r2 bucket create screenshots-test
```

To check that your buckets were created, run:

```sh
wrangler r2 bucket list
```

After running the `list` command, you will see all bucket names, including the ones you have just created.

## 4\. Configure your Wrangler configuration file

Configure your `browser-worker` project's [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) by adding a browser [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) and a [Node.js compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag). Browser bindings allow for communication between a Worker and a headless browser which allows you to do actions such as taking a screenshot, generating a PDF and more.

Update your Wrangler configuration file with the Browser Run API binding, the R2 bucket you created and a Durable Object:

Note

Your Worker configuration must include the `nodejs_compat` compatibility flag and a `compatibility_date` of 2025-09-15 or later.

* [  wrangler.jsonc ](#tab-panel-7531)
* [  wrangler.toml ](#tab-panel-7532)

**JSONC**

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "rendering-api-demo",
  "main": "src/index.js",
  // Set this to today's date
  "compatibility_date": "2026-07-17",
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

**TOML**

```toml
"$schema" = "./node_modules/wrangler/config-schema.json"
name = "rendering-api-demo"
main = "src/index.js"
# Set this to today's date
compatibility_date = "2026-07-17"
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

* [  JavaScript ](#tab-panel-7533)
* [  TypeScript ](#tab-panel-7534)

**JavaScript**

```js
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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwBGAEwAWUQE4AHAGZBAVgUAuFizbAOcLjT4CRE6fKUKAsACgAwuioQApnewARKAGcY6N1Gi2VJTTwCYhIqOGB7BgAiKBp7AA8AOgArNyjSVCgwR3DImLik1KjLGztHCGwAFToYe384GBgwPgIoW2RkuAA3ODdeBFgIAGpgdFxwe0tLKGBPJBIAbxJnEAQ4MmyAeTJk+14IEgBfAIR0YBIo3jBKXFQwRDqAd0wAa3sENKILGbmDgCoSL0SDAQI17A53iczhcAAJXG53B7IEFgiEIdIWCwJX4kXD2VBwcAHBYWEiAtx0Ki8ALg3gACwAFAh7ABHED2NwQAA0JEcXQAlItSWSSLxbJySOgdiQGLyqF1EgAhABKmwA6gBlACiysSAHNwYq6AA5XIMqJkU6PNzvKL8r7CsnIZAkDWOXCAkjMtkcg4QdAkCB0+zLVbrbIkba7fY8oOOQGPOA+Eg+NxejmeKg2x2i8UHZkeGUJpMHKXJRKoWmM73szn2zEi9MQVZUdMeL5kw5ciyHB1irMHADSWq1AAUAPoq9Xa5XjgCCABkAJIANS146XxvH2qsm2Nzg1RYAbIIHdjMAcrr004qrTaELz4g4aGmVmsNvYo3ticLLehre8HYkG8MAQHOzRdPYS5UG6-a4GmsqnsKnKYHABoOmS-acggID7JgDKcgQ9g8nygoko2bigu8BGEA4JHyvWjZBu4iQoWsBpFoRDisf67H2EBhwNuSlLUpWED0kyrK1hAZE5s6rr9PY8YFugYAgL4WaBgGDgSpQEA5lhByPFAuBBkWADawhSKIgg8sIchHkednKE5JAObZJDiMI4gALpAZheYkMGUB6nSByypZggyB5ADsR4yDyMhHuIPLJR5MhSEeflCU6LoAKo2oGwaiqszJ2LiRGAjQgYzCG-qisylVwAEql4g+2G4c2zItQ+yqiAZgVUP+ziVbKVD2I8yxEQyjEioZub4qgRbCIIq0kACJ7rSQij+bmA5epQcS4CNDhFuNk0nfYDI5mSACyBB0okpzcAyQ2PJd+rgpUtUzSQLpiotgoAgDqCoN2jb8ok-oahAAxUHqM27fNGBgG1RbPUdH0eM0EDmiQADit2VHa5mCNlckukuS1xt17ien+AHtRy3i2JKtRUDyzJcIVPg5lAS0MgAhMxbiJAz94kAAPpLJDC3SLHi+8iTuKU437PYuAzbJjYBVmqn2Ik1wIwABre-4S84mz+DDiDQPDoQTSmA5wFS9jG7NTH0EKOsiiLYt3pCspwImyYorUaKG4SVKMn7fKJLdACaU6ajqHsiscvAEPSJAMvY2s+3tbj64b6AIzdOumwHD6W-4NjgB6Q0HIR8yKw+sSEa7iQkFqCCnAg-gACQLPYhzG+DBdp52OaCRTJDKhy4LAfYoHgVAkGAqgDgPvYcDZ5nYBgFpRUhpbOZ+yBYEQVBMF7LY8FFkhs9WMGvAvCmS2t4+7gQGmZD4pgIZ0Ds1iHqYEaF7B8wFnLBWVd+Tl2ZF1Vs5054ZnFFdKIZtGYkHuNQbOBIsgayiDyJYXEQBuH8IoNahx6wDX2vADiQcQ5+nlqLVuiRzqjnAYjHKf0XSVDgG8EgfRmSODcHSdAP9JRLR3tnYRSlWzeAAF4QMbGwHO2QDhQAfqQLRAAeEgxlTKPWyPDIMOihhDHzo2YOJYwEGlYuCFcUAJq-AZEsQxQZ-AeLpOZKAPkeTBVChAfwgSwq+J8kcSexZQ7gP1BI9A5owoQBgOQ50zwEBvA+IkeEIBbj3GZNks4yA7S7V1hKTI2RTQRCLMbORojxEQHHEPbx4TDjxCHqEiArTjalMLk3akjDbH0INnUrMDTuHlxscmWO8olR5SsMOSoiQQS42NkPFGbVDjIHWQQqpI8UgwD1GPIRvA04z0bPJKw1xCqEDIAY4MrYaYhjpkNEgoxurpLfvVP+uJbCAMecVYZOYpkHGGdk65V0aEXJdPPG0BwL6r3XnATekJagIE0CAwMvQXhpnqnGZYmwz4sMSAiq+0FYJ3wQiQR+0LXSL3xZkD4Bw4D5POPVN4y8CWAivrQiUvBSrlHAogc4gzpnErYrEg0l9hXcMbPzHO-Le6CtZTKMa4AwBWLmuKYuRsGSV3NpCGuQjwR21ASy4V7tenzUqFqLcO49wHmWoILaK1Vq9JBUVFiEr7FwqFVgBkH03q-SGCQG1dqtS7n3BqM5PCEEtgdpNWFmYbTmkorwXgzMSnCnOcJKk3KZWavPsvS+a9r4UpfCQIYsoVoYRFPJLUT53TkCrly5olZIE5yLSvMlN84Jpn0cOMck5VQp1nIuVc65NzbgjQ66N3sdZYR1aXa6BcSD6qwUaukQI-7xgvty0tPUSBDy7SWyC5Lb4vmODaPtXcG3Ph4PbNtGYXaJDHuXKJHq-bepGeCP1wAA1EXYf+YNJAVoutWoIKJ8kE6UFFC7OUlFur4utHtNWGkUxpj3Syg9ZA6Dph9JyTFRcIjMXhuXeSmASDJDIQcDRKZLwQsBOpM4rR95gDw48B5x9aZpleZ8o+PzcB-PIy6NRCRwhNGImuz9xK2GQQ+G0KgM1jbT15GAQq5EF3auyCXMuq710Wyto+DNGsNbYP5oApaQ9B0TmTjOecy41wbnDZGg8hxRZvp9lE+VDI-at01Y2RdOndXGyuV4TFbDLXlzJDJmBBqEDgq8JC3pglGypaOD2Sw6hmCaG0LoHg-AhBiEkLIBQyhBAlFsM+CorgPDhY0v4QI2hSBhAiNEEjcBtDpACAQ1reQNhSmKNYKr5Qqg1DqICRozRM4aQ6EXKgUwLALCiMAJMVBxyjHGNkKIKh8h4kKGkQ4WXsu5eCPl-QRWjCldMIIZglggA)

**TypeScript**

```ts
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

To interact with a real headless browser during local development, set `"remote" : true` in the Browser binding configuration. Learn more in our [remote bindings documentation](https://developers.cloudflare.com/workers/local-development/#remote-bindings).

## 7\. Deploy

Run [npx wrangler deploy](https://developers.cloudflare.com/workers/wrangler/commands/workers/#deploy) to deploy your Worker to the Cloudflare global network.

## Related resources

* Other [Puppeteer examples ↗](https://github.com/cloudflare/puppeteer/tree/main/examples)
* Get started with [Durable Objects](https://developers.cloudflare.com/durable-objects/get-started/)
* [Using R2 from Workers](https://developers.cloudflare.com/r2/api/workers/workers-api-usage/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/how-to/browser-run-with-do/#page","headline":"Deploy a Browser Run Worker with Durable Objects · Cloudflare Browser Run docs","description":"Use the Browser Run API along with Durable Objects to take screenshots from web pages and store them in R2.","url":"https://developers.cloudflare.com/browser-run/how-to/browser-run-with-do/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-run/","name":"Browser Run"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-run/how-to/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-run/how-to/browser-run-with-do/","name":"Deploy a Browser Run Worker with Durable Objects"}}]}
```
