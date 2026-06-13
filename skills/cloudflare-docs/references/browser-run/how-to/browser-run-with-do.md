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

* [  wrangler.jsonc ](#tab-panel-6732)
* [  wrangler.toml ](#tab-panel-6733)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "rendering-api-demo",

  "main": "src/index.js",

  // Set this to today's date

  "compatibility_date": "2026-06-12",

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

compatibility_date = "2026-06-12"

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

* [  JavaScript ](#tab-panel-6734)
* [  TypeScript ](#tab-panel-6735)

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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAyCArADZBAFgAc0sbMEAuFizbAOcLjT4Dh4qbPnTBAWABQAYXRUIAUxvYAIlADOMdC6jRrikmrwExCRUcMC2DABEUDS2AB4AdABWLhGkqFBg9qHhUTEJyRHmVjb2ENgAKnQwtr5wMDBgfARQ1siJcABucC68CLAQANTA6LjgtubmUMDuSCQA3iSOIAhwZJkA8mSJtrwQJAC+fgjowCQRvGCUuKhgiDUA7pgA1rYIKURmUzN7AFQk3SQYCB6rY7K8jiczgABC5XG53ZBAkFghCpMxmOLfEi4WyoODgPZzMwkf4uOhUXh+UG8AAWAAoELYAI4gWwuCAAGhI9g6AEp5sSSSReNZ2SR0FsSAxuVQOvEAEIAJXWAHUAMoAUUV8QA5qD5XQAHLZOkRMjHe4uV4RXkfQUk5DIEhq+y4f4kRkstl7CDoEgQGm2RbLVaZEibba7LkB+z-e5wLwkLwuD1s9xUK324WivaMtxSuMJvYSxLxVDU+me1ns23ooWpiDLKiptwfEn7DlmfZ2kUZvYAaQ1GoACgB9JWqzWK0cAQQAMgBJABqGtHC8No81FnWhscaoLEjtmMwewu3RT8otVoQ3NidhoKaWKzWtgjO0JgvN6EtrzbJBeMAQDOjQdLYC5UC6va4Cm0qCH+7KYHAep2iSvbsggIC7JgdLsgQthcjy-JEvWLjAq8OGEHYBGyrW9YBq48QISseoFrhdiMb6zG2H++x1qS5KUuWEC0gyzLVhARFZo6zq9LYsZ5ugYAgN4Gb+n6dhipQEBZmhez3FAuABgWADaACMACcABMghcqZADMYhiLZIgOVyDk2SQkimZIAC6f6oTmJCBlAOo0ns0pmYIxhcgA7PIXJyJIXJiJIHnSOZYh+XxDpOgAqla-qBsKyyMjY2J4f8ND+lMQa+sKjIVXAfiKTiN7oZhjaMs1N6KpZOmBVQ36OBV0pULY9yLHhdK0UKunZriqAFqZwiCCQfwSGtJAiP52Z9h6lAxLgw12AWY0Tcdth0lmJIALIEDS8THNwdKDfcF26qC5Q1dNJBOiKC38n8-2oKgnb1ry8S+mqEB9FQOrTTtc0YGArUFk9h3vW4jQQKaJAAOI3eUNrGYIWVSU6C6LTGXWuO6X4-m1bKeNY4rVFQXKMlwBVeFmUCLXSACE9EuPE9PXiQAA+EskELNIMWLrzxK4xRjbsti4NNkn1gFGaKbY8SXPDAAGl7fuLjjrL40OINAcPBONSZ9nAFK2EbM10fQAra0Kwui1e4LSnA8aJki1Qogb+IUvSvs8vEN0AJoTuqWru0Khy8AQtIkHStha97u0uHrBvoPD13ayb-s3hbvhWOAbqDXsuGzArN7RLhLvxCQGoIMcCC+AAJHMtj7EbYP56n7ZZrx5MkIqbKgv+tiAcBUCgf8qB2DethwFnGdgGAamFUGFtZr7AFASBYEQTs1jQQWcHZb9ToWIGvBPEmi0t7ergQCmZC4pgIM6A2bRB1ICJCtheb81lvLSuvIy6Mk6s2M6s80yikuhEU2DMSC3GoFnPEGR1YRC5AsNiIAXC+BEMIA4tZ+p7XgCxQOwcfRyxFi3eIZ1hwQIRo-aS5Q4AvBID0Rk9gXA0nQL-cUi1t5Z2EXJZsngABekD6xsGzpkPYUB76kC0QAHhIPpQyD1MhwwDDogYAw871iDkWcBepGKgiXFAca3w6QLEMQGXwHiaTGSgD5LkwVQoQF8IEsKvifI0J2iSGxIcIG6gkegU0YUIAwAoY6R4CAXhvHiLCEA1xbiMhyScZANookFz2OkTIxowgFiNnI0R4iICjkHt48J+xYiD1CRANpRsylzR6AWGJewGH63qRmRpPCy5DMKgxWO8pcoWEHOUeIQIcZG0HsjVq+xkAbMIdU4eSQYA6lHkI3gqdp71mkhYS4BVCBkAMYGZs1Mgy00GiQYYXUMnvzqv-bE1ggFPKKiMrM0yRk5JuZdWhlynRzytHsc+K815wA3uCaoCA1CgP9N0J4KY6oxkWOsU+rD4gIsvuBSCt8YIkAfjPF0LCgzpDeHsOABTTh1ReEvAl-xL50LFLwEqpRgKIFOEw2xvsmJxL1BfYVPD6x82zvynugrWVSlGuAMAVjZqiiLobOkFczbgmrkI0EtswEsuFW7PpgVygag3FuHce4lqrT+MtYQZTpnis4nEuFQqsB0neq9H6AwSA2rtRqbcu41TnMfogps9sJqwvTFaU0pFeC8CZqUwUFz+IUm5TKzVZ8l4X1XlfClD4SADGlMtFCQppIajvK6cglcuWNHLFA7Ohbl5kuvlBFM+jBwjnHMqZO055zLlXOuTc4aHVRq9trNCOqS5XXziQfV2CjU0gBP-WM59uUlu6iQQenbi2gXJTfB8hwrS9s7vW+8PA7atrTM7eIo8y4T0LImT1iF7E+tZf6vCHDvxBpIMtTarrBDvukvHSgwpnYylIl1fFlpdqqxUkmFMu6WX7rIHQVMXp2SYsLmEeicMy7SUwCQRI5C9gaKTKeCF-xlInGaHvMAuH7iPKPjTFMbyvmH1+bgf5ZGnRqLiKEBo+FV0euJew0CbwWhUGmkbKe3IwAFWIvO7VmRi6lxXWu82ltbzpvVurHBfMgGLUHgOscScpyzkXCuNcYaI17n2CLV93t33yrpL7Fumr6wLu07qo21yPCYvYZasu0TmEzLYZXcFHhIVlN4vWFLBwuzmBUMwNQGgtA8H4EIUQEgZByAUEUaw94yjODcGFlSvh-AaFICEMIkRiNwA0KkPwhDms5DWBKQolgKulAqFUGo-x6iNAzipNohcqATDMHMCIwAExUFHMMUYmQIiKFyDifIKR9iZayzlwIeWdCFf0CVowghmDmCAA)

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
