---
title: Deploy a Browser Run Worker with Durable Objects
description: Use the Browser Run API along with Durable Objects to take screenshots from web pages and store them in R2.
image: https://developers.cloudflare.com/dev-products-preview.png
---

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

* [  wrangler.jsonc ](#tab-panel-4405)
* [  wrangler.toml ](#tab-panel-4406)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "rendering-api-demo",

  "main": "src/index.js",

  // Set this to today's date

  "compatibility_date": "2026-04-27",

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

Explain Code

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "rendering-api-demo"

main = "src/index.js"

# Set this to today's date

compatibility_date = "2026-04-27"

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

* [  JavaScript ](#tab-panel-4407)
* [  TypeScript ](#tab-panel-4408)

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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwAmQQGYA7ADYpY4RLkAuFizbAOcLjT4CR46bPlyAsACgAwuioQAptewARKAGcY6Z1GhXFJNXgLEJFRwwDYMAERQNDYAHgB0AFbO4aSoUGB2IWGR0fFJ4WaW1nYQ2AAqdDA2PnAwMGB8BFBWyAlwAG5wzrwIsBAA1MDouOA2ZmZQwG5IJADeJA4gCHBkGQDyZAk2vBAkAL6+COjAJOG8YJS4qGCI1QDumADWNgjJRKaT07sAVCRdJDAQHUbLYXodjqcAALnS7XW7IQHA0EIFKmUyxL4kXA2VBwcC7WamEh-Zx0Ki8Xwg3gACwAFAgbABHEA2ZwQAA0JDs7QAlHMicSSLwrGySOhNiQGFyqO04gAhABKawA6gBlACiCriAHMQXK6AA5LK08JkI53ZwvcI894C4nIZAkVV2XB-EgM5ms3YQdAkCDUmwLJYrDIkDZbHac-12P53OCeEieZzu1luKiWu1CkW7BmuSWx+O7cUJOKoKl0j0stk2tGClMQJZUFOud7Evbs0x7W3C9O7ADS6vVAAUAPqKlUahUjgCCABkAJIANXVI-nBpHGvMawNDlV+akgltGMwu3OXWTcvNloQXJithoycWy1WNnD2wJArN6AtL1bJGeMAQNODTtDY85UM6Pa4MmUqHgKbKYHAuq2sSPZsggIA7JgtJsgQNictyfKEnWzhAi8OGELYBEyjWdb+i4cQIcsur5rhtiMT6zE2H+ey1iSZIUmWEA0vSTJVhARGZg6To9DYMa5ugYAgF46Z+r6tiipQECZmhux3FAuD+vmADaACMACcoicqZYgyNZACstmcrZgicgALKZbkALp-qh2YkAGUDatSuxSmZggAByuSQ0gRZyEVSG5nKJdFEXmVIPl8fajoAKqWn6AZCksDLWFieF-DQfqTIGPpCgy5VwL4inYje6GYQ2DJNTeCrCDp-lUN+DjlVKVA2HcCx4bStGCrpWY4qg+amYIy0kL8B6rSQ9m+VmvbupQ0S4ENtj5qN41HTYtKZsSACyBDUnERzcLSA13OdOogmU1VTSQjrCvNfK-H9qCoB2dY8nEPqqhAvRUNqU3bbNGBgC1+aPQdb2uA0EAmiQADi11lNaxmCJlUmOvOC3Rp1Lhul+P6tayHhWGKVRUJyDJcPlniZlAC20gAhPRzhxHT14kAAPuLJCC9SDGiy8cQuEUo07DYuBTZJdZ+emik2HEFxwwABpe35iw4aw+FDiDQLDQRjYmvZwOSNiG9NdH0PyWuCkLItXmCUpwHGCaIlUyL63i5J0j73JxNdACa45qpqbuCgcvAEDSJC0jYmteztzi6-r6Bw1dWvG37N7mz4ljgK6A27LhMzyzeUS4c7cQkOqCBHAgPgACSzDYeyG6Decp22ma8WTJAKqyIL-jYgHAVAoF-Kgtg3jYcCZ+nYBgGpBWBubmY+wBQEgWBEHbFY0H5nB0-mAGvCPImC3N7eLgQMmZA4pggboKzKI2oARIRsDzPmMs5YVx5KXBkHUmynRnqmEUF1wgm3piQG41BM64nSGrcInJ5hsRAM4Hw9kVp7BrH1Xa8AWIByDt6WWwtm5xFOkOUB8Mso-UdGUOAzwSDdAZHYZw1J0BfzFAtLemdBFySbB4AAXmAusbAs4ZF2FAO+pANEAB4SD6UMvdDIsN-RaP6P0XOdZA6FhAbqRiIJFxQDGl8Wk8x9H+h8G46kxkoBeU5IFYKEAfD+JCt4ry+xx4FmDqAnUYj0AmhChAGApCHQPAQM8V4cQYQgCuDcBkmTjjIGtNtbWoo0gZCNKEfMhsZHCNERAEcA9PGhL2DEAewSIDNMNsU-ODcKT0OsbQvWNT0x1M4aXKxCZo4ynlDlcwA4yhxEBNjQ2A8kYtT2MgVZeCKlD0SDAbUI8BG8BTlPOs0lzAXHyoQMgeiAxNipoGGmA0SBDE6qkl+tUf5YisP-e5hVBmZgmbsQZmTLkXSoWcx0s9LS7DPsvVecB15giqAgNQQC-RdEeMmWq0YFhrBPkwuIcKL7gUgjfGCJB76QqdPPXFaRXi7DgLkk4tVniLzxX8C+1DRS8GKiUYCiATj9MmYSpi0TdTn0FZwusvMs68u7vy5lkoRrgDABYmaIpC4G1pOXU2YIq4CJBDbYBTLBWu26bNMo6p1ybm3LuRaggNpLWWt0oFBUGJitsTCgVWBaRvRet9foJArU2vVFuHcqoTlcLgY2O241oVpktCaUivBeCMyKQKU5-FyScqleq0+i9z4r0vmSh8JB+hSiWihQU0l1R3hdOQCuHKGhlnAVnAtS8SVXygsmXRA5hxjiVEnKcc4lwrjXBuMNdrI2ey1mhLVxdLp5xILqjBBrqT-B-jGM+nLi1dRIAPDtRbQKkuvg+A4loe0dzrfeHgtsW2pidnEEepcIlup9p6oZIIfXAD9XhVh35A0kCWk65aggInSTjpQIUTtpSkU6rii0O0VYqUTMmHdTK91kDoCmT0bJ0UF1CPRWGpdpKYBIAkEhuw1GJlPGCv4yljhNF3mAHDdw7mH2psmZ57yD5fNwD80jjoVGxBCPUfCK732EpYaBV4zQqBTUNpPLkYB8rETnZqjIRcS7LtXWbC2t401qzVpg3m-8FoD37aOROk4ZwLmXKuUN4bdx7GFi+r2ETZW0h9s3dVdZ51ae1YbC57h0UsPNaXYkUmoF6oQKC9w4Lum8TrMl-YnYzAqGYGoDQWgeD8CEKISQMg5AKGEIUKw95ShOFcKFlSPg-AaFIMEUIEQiNwA0CkXweDmvZFWOKAoFgKslHKJUaofw6gNHTipVoBcqDjFMLMcIwB4xUBHEMEYGRwiKByNiPIyQ9gZcy9lgIuWdAFf0MVowwhmBmCAA)

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

Explain Code

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
