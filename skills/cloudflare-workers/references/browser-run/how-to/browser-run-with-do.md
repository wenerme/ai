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

* [  wrangler.jsonc ](#tab-panel-7271)
* [  wrangler.toml ](#tab-panel-7272)

**JSONC**

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "rendering-api-demo",
  "main": "src/index.js",
  // Set this to today's date
  "compatibility_date": "2026-07-09",
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
compatibility_date = "2026-07-09"
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

* [  JavaScript ](#tab-panel-7273)
* [  TypeScript ](#tab-panel-7274)

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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwBOEQA4A7GIBMUgIxiAXCxZtgHOFxp8BI8VNliFAWABQAYXRUIAU2vYAIlADOMdM6jQrikmrwFiEio4YBsGACIoGhsADwA6ACtncNJUKDA7ELDI6Pik8LNLazsIbAAVOhgbHzgYGDA+AigrZAS4ADc4Z14EWAgAamB0XHAbMzMoYDckEgBvEgcQBDgyDIB5MgSbXggSAF9fBHRgEnDeMEpcVDBEaoB3TABrGwRkolNJ6d2AKhIukhgIDqNlsL0Ox1OAAFzpdrrdkIDgaCEClTKZYl8SLgbKg4OBdrNTCQ-s46FReL4QbwABYACgQNgAjiAbM4IAAaEh2doASjmROJJF4VjZJHQmxIDC5VHacQAQgAlNYAdQAygBRBVxADmILldAAcllaeEyEc7s4XuEee8BcTkMgSKq7Lg-iQGczWbsIOgSBBqTYFksVhkSBstjtOf67H87nBPCRPM53ay3FRLXahSLdgzXJLY-HduKEnFUFS6R6WWybWjBSmIEsqCnXO9iXt2aY9rbhendgBpdXqgAKAH1FSqNQqRwBBAAyAEkAGrqkfzg0jjXmNYGhyq-MANkEtoxmF25y6ybl5stCC5MVsNGTi2Wqxs4e2BIFZvQFperZIzwwBA04NO0NjzlQzo9rgyZSkeApspgcC6raxI9myCAgDsmC0myBA2Jy3J8oSdbOECLy4YQtiETKNZ1v6LhxIhyy6vmeG2ExPosTY-57LWJJkhSZYQDS9JMlWEDEZmDpOj0Ngxrm6BgCAXjpn6vq2KKlAQJm6G7HcUC4P6+YANpyMI0iCJycgAMz7vu1kAKx2ZydlWSQAAscgeQAuv+aHZiQAZQNq1K7FKZmCGI7kSPuYicmI+4eZySXuWIwj7n5-H2o6ACqlp+gGQpLAy1hYvhfw0H6kyBj6QoMhVcC+Ep2K3hhWENgyzW3gq0i6YFVA-g4FVSlQNh3As+G0nRgp6VmOKoPmciCCtJC-Iea0kI5-lZr27qUNEuDDbY+ZjRNx02LSmbEgAsgQ1JxEc3C0oNdwXTqIJlDV00kI6woLXyvz-agqAdnWPJxD6qoQL0VDatNO1zRgYCtfmT2He9rgNBAJokAA4jdZTWiZghZdJjrzot0ZdS4brfr+bWsh4VhilUVCcgyXAFZ4mZQIttIAIQMc4cT0zeJAAD4SyQQvUoxYsvHELhFGNOw2Lg01SXWAXpkpNhxBc8MAAZXj+4sOGsPjQ4g0Bw0E42Jr2cDkjYRszfR9D8trgrC6L15glKcBxgmiJVMiBt4uSdK+9ycQ3QAmuOaqau7goHLwBA0iQtI2Fr3u7c4esG+g8PXdrJv+7eFs+JY4CuoNux4TMCu3lEeEu3EJDqggRwID4AAksw2HsRtg-nqdtpmfHkyQCqsiCAE2EBIFQGBfyoLYt42HAWcZ2AYDqYVgYW5mvuAcBoHgZB2xWDB+bwTP5gBrwjyJotLd3i4EDJmQOKYIG6A2ZRG1ACZCNheb81lvLSuPIy4Mk6k2M6s9UwikuuEU2DMSA3GoFnXE6R1bhE5PMdiIBnA+EcqtPYNZ+p7XgKxQOwdvRyxFi3OIZ0hxgIRtlX6joyhwGeCQboDI7DOGpOgb+YpFrbyzkI+STYPAAC9wF1jYNnDIuwoD31IJogAPCQAyRkHoZDhv6bR-R+h5zrEHQsoDdRMRBIuKA40vi0nmAY-0Ph3HUhMlAHynJgqhQgD4AJYUfE+X2BPAsIcwE6nEegE0YUIAwDIQ6B4CBnivDiDCEAVwbgMiyccZA1odo61FGkDIRpQj5iNrIkRYiIAjkHl4sJewYiDxCRAFpRsSkF0bhSBhNi6H61qemepXCy7WITDHGU8pcrmAHGUOIgIcZG0HsjVqexkBrPwZU4eiQYDalHoI3gqdp51hkuYC4BVCBkH0QGJs1NAy00GiQIYXU0mvzqr-LEVgAEPKKkMzMkzdhDKyVcy61DzmOjnpaXY58V5rzgBvMEVQEBqGAX6Lojxkx1WjAsNYp9mFxHhZfCCUFb6wRIA-KFToF54rSK8XYcA8knDqs8Je+K-iXxoaKXgJUSggUQCcAZUyiXMRibqC+QquF1j5tnPlPcBUsslKNcAYBLGzRFEXQ2tIK5mzBNXQRIJbYgOZUKt2PS5plHVOuTc25dxLUEJtZaK0enAsKoxcVdjYWCqwLSd6r0fr9BINa216otw7lVKc7h8DGz2wmjCtMloTRkV4LwJmxSBRnIEuSLl0qNVnyXhfVeV9yWPhIP0KUy1UKChkuqe8LpyCV05Q0MsEDs6FuXqS6+0Fkx6IHMOMcSpk5TjnEuFca4NzhvtVGr22t0LapLldfOJA9WYMNdSf4v8Yzny5SW7qJBB6duLWBMlN9HwHEtL2zu9aHw8Dtq21Mzs4ijzLpE91vsvXDJBL64A-r8JsJ-EGkgy1nUrUEJEmS8dKBCmdtKMiXU8UWl2qrVSiZky7uZfusgdAUyejZBiwuoQGJwzLjJTAJAEikN2OoxMZ5wV-BUscJoe8wC4buPco+NNkwvI+Yfb5uBflkcdKo2IIR6gEVXR+olrCwKvGaFQaaRsp5cjAAVEi86tUZGLqXFda7zaWzvOm9W6ssF8wAYtQeA7RxJ0nDOBcy5VxhojbuPYItX3e0iXK2kvsW4arrAu7TOqjaXPcBi1hFqy7Emk9A-VCAwXuAhT0vidYUv7E7GYFQzA1AaC0DwfgQhRDCEkDIeQYhChWAfKUJwrgwuqR8H4DQpBgihAiMRuAGgUi+HwS17IqxxQFAsJVko5RKjVD+HUBoGdVKtELlQcYphZjhGAPGKgI4hgjAyOERQORsR5GSHsTLWWcsBDyzoQr+hStGDEMwMwQA)

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
