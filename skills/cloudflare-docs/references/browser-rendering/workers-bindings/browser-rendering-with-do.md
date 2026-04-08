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

  "compatibility_date": "2026-04-07",

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

compatibility_date = "2026-04-07"

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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwA2AKwAOYQBZxAJikjRALhYs2wDnC40+AxZJnzFAWABQAYXRUIAU2vYAIlADOMdM6jQrSkurwFiEio4YBsGACIoGhsADwA6ACtncNJUKDA7ELDI6Pik8LNLazsIbAAVOhgbHzgYGDA+AigrZAS4ADc4Z14EWAgAamB0XHAbMzMoYDckEgBvEgcQBDgyDIB5MgSbXggSAF9fBHRgEnDeMEpcVDBEaoB3TABrGwRkolNJ6d2AKhIukhgIDqNlsL0Ox1OAAFzpdrrdkIDgaCEClTKZYl8SLgbKg4OBdrNTCQ-s46FReL4QbwABYACgQNgAjiAbM4IAAaEh2doASjmROJJF4VjZJHQmxIDC5VHacQAQgAlNYAdQAygBRBVxADmILldAAcllaeEyEc7s4XuEee8BcTkMgSKq7Lg-iQGczWbsIOgSBBqTYFksVhkSBstjtOf67H87nBPCRPM53ay3FRLXahSLdgzXJLY-HduKEnFUFS6R6WWybWjBSmIEsqCnXO9iXt2aY9rbhendgBpdXqgAKAH1FSqNQqRwBBAAyAEkAGrqkfzg0jjXmNYGhyq-PCQS2jGYXbnLrJuXmy0ILkxWw0ZOLZarGzh7YEgVm9AWl6tkjPGAIGnBp2hsecqGdHtcGTKVDwFNlMDgXVbWJHs2QQEAdkwWk2QIGxOW5PlCTrZwgReHDCFsAiZRrOt-RcOIEOWXV81w2xGJ9ZibD-PZaxJMkKTLCAaXpJkqwgIjMwdJ0ehsGNc3QMAQC8dM-V9WxRUoCBMzQ3Y7igXB-XzABtABGABOWRBE5UyAGZhGEGzRHszl7OskgpFMqQAF0-1Q7MSADKBtWpXYpTMwRxHcgB2YRxE5AxOWkdzxHM4RfL4+1HQAVUtP0AyFJYGWsLE8L+Gg-UmQMfSFBkyrgXxFOxG90MwhsGUam8FVkHSAqob8HDKqUqBsO4Fjw2laMFXSsxxVB81MwQlpIX4DxWkhRD8rNe3dSholwQbbHzEaxsOmxaUzYkAFkCGpOIjm4Wl+ruM6dRBMoqsmkhHWFOa+V+X7UFQDs6x5OIfVVCBeiobVJq2maMDAZr8we-bXtcBoIBNEgAHErrKa1jMEDKpMded5ujDqXDdL8fxa1kPCsMUqioTkGS4PLPEzKB5tpABCejnDiWnrxIAAfMWSAF6kGJFl44hcIoRp2GxcEmyS6389NFJsOILlhgADS9v1Fhw1h8SHEGgGGglGxNezgckbANqa6PoflNcFQXhavMEpTgOME0RKpkT1vFyTpb3uTiK6AE1xzVTVXcFA5eAIGkSFpGwNc97bnB1vX0Fhy7NaN32bzNnxLHAV1+t2XCZjlm8olwp24hIdUECOBAfAAElmGw9gNkHc+TttM140mSAVVkQX-GxAOAqBQL+VBbBvGw4AztOwDANT8sDM3M29gCgJAsCIO2KxoPzOCp-MANeEeRN5qb28XAgZMyBxTBA3QFmojagBEhGw3NebS1luXHkJcGTtSbCdaeqYRTnXCMbOmJAbjUAzridIqtwicnmGxEAzgfCiGWnsGsvUdrwBYv7QO3oZZCybnEE6Q4QFw0yt9R0ZQ4DPBIN0BkdhnDUnQJ-MU81N4ZwEXJJsHgABeoC6xsEzhkXYUBb6kHUQAHhIPpQyd0Mgw39Jo-o-Qc51gDoWYBupGIgkXFAUaXxaTzD0f6HwrjqTGSgN5TkQUQoQB8H40KXjvL7DHgWIOICdSiPQCaUKEAYAkIdA8BAzxXhxBhCAK4NwGQZOOMga0W0taijSBkI0oR8wG2kUIkREARz9w8SEvYMR+5BIgE0g2RS871wpHQqxNDdbVPTLUjhJdLEJijjKeU2VzADjKHEQEWMDb90Rs1PYyAVm4PKYPRIMBtTD34bwZOk86zSXMBcPKhAyC6IDE2SmgZqb9RIEMDqKTn41W-liKwf87kFQGZmcZuwBkZIuedShpzHQz0tLsU+S8V5wDXmCKoCB1CAL9F0R4yYarRgWGsY+jC4iwvPuBSC18YIkDvhCp0c8cVpFeLsOAOSTg1WeAvXFfxz5UNFLwIqJRgKIBOH0iZBKmJRN1GfAVHC6w80zjyrufKmWSmGuAMA5jpoigLvrWkZcTZgkrvwkE1sgGMoFS7LpM0yjqnXJubcu4FqCHWotJaXTAX5QYqKmx0L+VYFpK9Z6X1+gkEtda9UW4dyqmOZw2BjZbZjShWmS0JpSK8F4AzQpAoTn8XJByyVaqT4LzPsvC+pKHwkH6FKRaKFBTSXVHeF05By7soaGWMBmd82L2JZfKCyYdEDmHGOJUicpxziXCuNcG5Q22ojR7TWaFNVFwurnEgOr0H6upP8b+MZT4cqLZ1Eg-d22FtAiSq+D4DiWm7e3Wt94eA22bamR2cRh4l3Ca672HrBkgm9cAX1eEWHfgDSQRajqlqCHCdJWOlAhSO2lKRDqOKLTbWVipRMyZt2Mt3WQOgKZPRsjRfnUI9EYYl2kpgEgCRiG7FUYmU8oK-jKWOE0HeYBsN3FuQfKmyYnlvP3p83A3ySOOmUbEEI9R8LLrfQS5hoFXjNCoJNA2E8uRgDysRWdGqMiF2Lkuldptza3lTarVWGCeZ-3mv3Pto4E6ThnAuZcq4Q1ht3HsIWz7PbhJlbSb2Tc1V1jnZprVBtznuDRcws1JdiSScgbqhAIL3Bgq6bxOsSX9idjMKoZg6hNDaB4PwIQYgDByAUGIQoVh7ylCcK4ELKkfB+E0KQYIoQIiEbgJoFIvhcGNeyKscUBQLBlZKOUSo1Q-h1AaGnFSrR85UHGKYWY4RgDxioCOIYIwMjhCUDkbEeRkh7HSxlrLAQcu6HyxIaQRXFDMDMEAA)

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
