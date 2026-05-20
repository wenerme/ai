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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwA2ACwBOUcOGCAzHPEAuFizbAOcLjT4CREqTPmzxAWABQAYXRUIAUxvYAIlADOMdC6jRrikmrwExCRUcMC2DABEUDS2AB4AdABWLhGkqFBg9qHhUTEJyRHmVjb2ENgAKnQwtr5wMDBgfARQ1siJcABucC68CLAQANTA6LjgtubmUMDuSCQA3iSOIAhwZJkA8mSJtrwQJAC+fgjowCQRvGCUuKhgiDUA7pgA1rYIKURmUzN7AFQk3SQYCB6rY7K8jiczgABC5XG53ZBAkFghCpMxmOLfEi4WyoODgPZzMwkf4uOhUXh+UG8AAWAAoELYAI4gWwuCAAGhI9g6AEp5sSSSReNZ2SR0FsSAxuVQOvEAEIAJXWAHUAMoAUUV8QA5qD5XQAHLZOkRMjHe4uV4RXkfQUk5DIEhq+y4f4kRkstl7CDoEgQGm2RbLVaZEibba7LkB+z-e5wLwkLwuD1s9xUK324WivaMtxSuMJvYSxLxVDU+me1ns23ooWpiDLKiptwfEn7DlmfZ2kUZvYAaQ1GoACgB9JWqzWK0cAQQAMgBJABqGtHC8No81FnWhscaoLMjtmMwewu3RT8otVoQ3NidhoKaWKzWtgjO0JgvN6EtrzbJBeMAQDOjQdLYC5UC6va4Cm0qCH+7KYHAep2iSvbsggIC7JgdLsgQthcjy-JEvWLjAq8OGEHYBGyrW9YBq48QISseoFrhdiMb6zG2H++x1qS5KUuWEC0gyzLVhARFZo6zq9LYsZ5ugYAgN4Gb+n6dhipQEBZmhez3FAuABgWADaACM4gAEyCFypmyNINkAKx2VydnWSQoimaIAC6f6oTmJCBlAOo0ns0pmYIAAcbkAOzCBFXIRWIXJiG5EXiMIPl8Q6ToAKpWv6gbCssjI2NieH-DQ-pTEGvrCoy5VwH4ik4je6GYY2jJNTeioWTp-lUN+jjldKVC2Pcix4XStFCrp2a4qgBamYIy0kH8MirSQDm+dmfYepQMS4ENdgFqN41HbYdJZiSACyBA0vExzcHSA33OduqguU1VTSQToivN-J-H9qCoJ29a8vEvpqhAfRUDqU3bbNGBgC1BaPQdb1uI0ECmiQADi13lDaxmCJlUlOguC0xp1rjul+P6tWynjWOK1RUFyjJcPlXhZlAC10gAhPRLjxHT14kAAPuLJCCzSDGi688SuMUo27LYuBTZJ9Z+Rmim2PElxwwABpe35i446y+FDiDQLDwRjUmfZwBStiG9NdH0AKWtCkLItXuC0pwPGiZItUKL6-iFL0j7PLxNdACaE7qlqbtCocvAELSJB0rYmteztLi6-r6Bw1dWvG37N7m74VjgG6A17Lhszyze0S4c78QkBqCDHAgvgACRzLY+yG6Decp+2Wa8WTJCKmyoL-rYgHAVAoH-Kgdg3rYcCZ+nYBgGpBVBubWY+wBQEgWBEE7NY0EFnBWU-U6FiBrwTxJgtze3q4EApmQuKYEGdArNog6kBEhWwPM+YyzlhXXkpdGQdWbKdGeaZRQXQiCbemJBbjUEzniDIasIhcgWGxEALhfAORWvsWsfVdrwBYgHIOPpZbC2bvEU6w5wHwwftJcocAXgkB6IyewLgaToB-uKBaW9M5CLks2TwAAvCB9Y2BZ0yHsKAd9SCaIADwkH0oZe6mRYYBm0QMAYud6yByLGAvUjFQRLigGNb4dIFgGIDL4dxNJjJQC8lyQKwUIC+ACSFHxXkDjj0LMHcBupxHoFNCFCAMByGOkeAgF4bx4iwhANcW4jIsknGQDaba2sxTpEyMaMIBZDayJEWIiAo4B5eLCfsWIA8QkQBaYbEp+cG6UkYTY+hetakZnqdw0u1jEzR1lAqHKFhBzlHiECbGhsB5IxavsZAayCGVKHkkGAOoR6CN4CnKe9ZpIWEuPlQgZB9GBmbFTIMNMBokGGJ1NJb9ap-2xNYQBDzCpDKzJMvYQyslXIujQ85TpZ5Wj2GfZeq84Dr3BNUBAagQH+m6E8FMtUYyLHWCfFh8R4UX3ApBG+MESD32ni6ZhQZ0hvD2HAPJpxaovEXvi-4F9aFil4MVUowFECnAGVMolTEYl6nPkK7h9ZeZZz5d3AVLKpQjXAGASxM1RSFwNnScuptwRV0EaCG2oDmVCtdj02a5QNQbi3DuPci1BAbSWstHpwKCoMXFXY2FgqsB0jei9b6AwSDWttRqbcu41SnIfggpsdtxowvTFaU0pFeC8EZsUwUZz+IUi5dKjVp9F7nxXpfclD4SADGlEtFCQppIajvK6cgFdOWNHLJArOhal6kqvlBFMejBwjnHMqJO055zLlXOuTc4b7VRs9lrNC2ri6XTziQPVWDDU0gBH-WMZ8uUlq6iQAenbi2gTJdfB8hwrS9o7vW+8PBbatrTE7eII9S6RPdT7L1wzQS+uAP6vC7DvxBpIEtZ1y1BCROknHSgwonYylIp1PFlodoqxUkmFMu7mX7rIHQVMXp2QYoLmEeisNS7SUwCQRIZC9jqKTKecF-xlInGaLvMAuH7j3MPtTFMLyPkH2+bgX5ZGnSqLiKEBo+FV0fqJWw0CbwWhUCmobSe3IwD5WIvOrVmQi4lxXWus2FtbzprVmrbBvNAELQHgOscicpyzkXCuNcYaI17n2MLV9XtIlyrpD7ZuGr6wLu0zqw2lyPAYrYRa0uJJpMwP1QgMFHgIU9N4vWFLBwuzmBUMwNQGgtA8H4EIMQkhpByAUEUaw94yjODcGFlSvh-AaFICEMIkRiNwA0KkPwBDms5DWBKQolgKulAqFUGo-x6iNHTipNoBcqATDMHMCIwAExUFHMMUYmQIiKFyDifIKR9iZayzlwIeWdCFf0CVow4hmDmCAA)

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
