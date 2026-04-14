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

  "compatibility_date": "2026-04-14",

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

compatibility_date = "2026-04-14"

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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwAOYQGZxANkkBGEQFYAXCxZtgHOFxp8BI8VNkKAsACgAwuioQAplewARKAGcY6J1GiXFJNXgLESKjhgawYAIigaawAPADoAKycw0lQoMFtg0IiouMSw0wsrWwhsABU6GGtvOBgYMD4CKEtkeLgANzgnXgRYCABqYHRccGtTUyhgVyQSAG8SexAEODJ0gHkyeOteCBIAXx8EdGASMN4wSlxUMEQqgHdMAGtrBCSiEwmpnYAqEk6SGBAtWsNmeByOJwAAmcLlcbsgAUCQQhkiYTDFPiRcNZUHBwDsZiYSL8nHQqLwfMDeAALAAUCGsAEcQNYnBAADQkWxtACUs0JRJIvEsrJI6A2JAYnKobViACEAEqrADqAGUAKLy2IAc2BsroADlMjSwmRDrcnM8wty3vyichkCQVbZcL8SPSmSydhB0CQIFTrPNFst0iR1ptthy-bZfrc4B4SB4nG6Wa4qBbbYLhTt6S4JTG4zsxfFYqhKbT3czWdbUQLkxBFlRky43kTdmyTLsbUK0zsANJqtUABQA+grler5cOAIIAGQAkgA1NXDuf64fqsyrfX2FV5ySCG3ozA7M6dJOys0WhCc6I2GhJhZLFbWMNbfH803oc3PFskJ4wCAp3qNprDnKgnW7XAk0lA9+VZTA4B1G0iW7VkEBAbZMBpVkCGsDkuV5AlaycQFnmwwgbHw6Vq1rP1nFieClh1PMcJsBjvSY6xf12GtiVJclSwgak6UZSsIEIjN7UdbprGjHN0DAEBPDTX0fRsEVKAgDNUJ2W4oFwP08wAbRkABOAAmQQORkMRpGs+RbI5WyrJIAAWGRXIAXV-FCsxIf0oC1KkdklEyRBcgB2SRhA5YRJFcjl4pc4RTMkbzeLtB0AFULV9f1BUWekrExXDfhoX0JgDb1BXpUq4B8BSsWvNCMPrekGuveVzO0vyqC-exSslKhrFueZcJpGiBR0zNsVQPM5EEQQSB+fdlpIeQfMzHs3UoKJcAGmw82G0aDusGkMyJABZAgqViQ5uBpPrblO7VgVKSqJpIB0hVm3kfh+1BUHbWtuVib0VQgHoqC1CbNumjAwCavN7r2l6XHqCBjRIABxS7SitIzBHSySHTnOao3a5xXU-b9mpZdxLFFSoqA5ekuFyjwMygOaaQAQjopxYhpq8SAAH1Fkh+apejheeWJnEKYbtmsXAJok2tfLTBTrFic4YYAAwvL8RfsVZvAhxBoGhwIRoTHs4DJax9cm2j6D5DWBQFoXL1BSU4FjeMEUqJFddxMlaS9rlYkugBNMdVQ1F2BX2XgCGpEgaWsdWPa2pxtd19AYYujXDZ969Te8CxwBdPqdhw6ZZevSIcMd2ISDVBBDgQbwABIZmsXZ9eBnOk9bDMeJJkh5RZYE-2sACgKgEDflQGxr2sOB09TsAwFUvKA1NjMvf-QDgNA8CtksKC81gyezH9XgHgTObG5vZwICTMhsUwAN0GZyItT-EQtYLmPMpYyzLtyYu9I2qNmOlPFMwozphCNrTEg1xqDpxxGkFWYQORzFYiAJw3h5CLT2NWHq214DMT9gHL00tBaN1iMdQcwDYYZS+g6UocAngkC6PSWwTgqToA-qKOaG9078Nko2dwAAvEBtY2AZ3SDsKAN9SBqIADwkD0gZW66RoZ+g0X0Po2daz+wLEAnUDFgQLigCNT4NI5i6L9N4FxVIjJQE8hyAKQUIDeF8cFTxnlyGbSJBYwOwDtQiPQMaYKEAYDEPtPcBATwXixGhCAS41x6QZKOMgK0YTc47FSOkQ0IQ8z6ykYI4REBhx93ccE3Y0Q+6BIgE0-WRTppdDzBEnY1CdbVLTLU9hxc+l5XolHWUWUzD9lKLEAEmN9Z9wRk1XYyAVk4PKQPBIMAtRDz4bwJOE9axSTMOcXKhAyA6P9I2CmAYqZ9RIIMdqKSn7VS-piSwv87n5QGRmcZAyMkXLOhQ05Dpp4Wh2CfRey84Cr1BJUBAagAG+k6A8JM1UozzFWEfBhsQYVnzAhBK+0ESC33BY6We2LUgvB2HAHJxxqpPHnji34Z9KEil4IVYoQFEDHFoZYr2jEok6lPvy9htZuYZ25Z3XljKJRDXAGAMxU1hT5z1jSUuxtQQVz4cCK2gCGX8udl0vypQ1Rrg3FuHc80lo-AWrBD24zhUcSiVCvlWAaQvSep9PoJALVWrVJubcKpjkcJgQ2G2o1IWpgtMaEivBeD00KfyE5fEyTsolaq4+89T5L3PiS+8JA+iSjkMhAUUk1S3mdOQMubL6illARnXNC8iUX0gkmbR-YhyjkVAnScs5FzLlXOuYNNqw3uw1qhDVhdzo5xINqtBeqqR-C-tGE+7KC0dRIH3Vt+aQLEsvvefYFpO1t2rXeHg1tG0pgdrEIexdR75njK6hC1iPWMu9bhZhX4-UkDkGtR1z6pIx0oIKB2UoSLtWxeaLaStlIJiTJuhl26yB0GTB6VkqK84hDotDYuUlMAkHiEQnYKiEwnhBb8JSRxGjbzABh24tz96UyTE8t5e9Pm4G+YRh0SiYjBDqHhRdLr8VMJAi8JoVAJr63HpyMAuUiLTvVekAuRcF1LpNmbG8yaVYq3QdzX+c0+49pHPHCc055xLhXEGkNO5diC0fR7Z90qaRe0bqq2sM61Oav1uctwqKmGmuLuEuhEzGFl2BW4UFRSeK1ni3sDspgVDMDUBoLQPB+BCFEBIWyhhhDyAKJYO8JRHAuEC8pbwvgNCkCCCEcIeG4AaGSD4HB9WsgrDFPkcwJXihlAqFUX4tR6ip2Ui0POVAxgmBmGEYAcYqDDkGMMdIYRFDZCxLkJIuwUupfS-4TLOgcv6Hy3IQrzBTBAA)

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
