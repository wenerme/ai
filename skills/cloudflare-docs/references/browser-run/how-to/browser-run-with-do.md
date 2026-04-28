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

  "compatibility_date": "2026-04-28",

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

compatibility_date = "2026-04-28"

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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwBOACzCA7AA5BggIxSArAGYAXCxZtgHOFxp8BI8dNkKVAWABQAYXRUIAU3vYAIlADOMdO6jQ7qki08AmISKjhgBwYAIigaBwAPADoAK3do0lQoMCcIqNj45LToq1t7JwhsABU6GAcAuBgYMD4CKDtkFLgANzh3XgRYCABqYHRccAcrKyhgLyQSAG8SFxAEODIcgHkyFIdeCBIAX0CEdGASaN4wSlxUMER6gHdMAGsHBHSiS1n5w4AqEh9EgwEBNByOD6nc6XAAC11u90eyFB4MhCAylksiT+JFwDlQcHAh0WlhIQPcdCovECEN4AAsABQIBwARxADncEAANCQnN0AJRLMnkki8OxckjoXYkBh8qjdJIAIQASlsAOoAZQAoiqkgBzCFKugAOTyjOiZDOT3cH2iAu+IvJyGQJE1TlwQJILPZnMOEHQJAg9IcKzWGxyJB2ewOvODTiBTzgvhIvnc3s5XiotqdYolhxZnllieTh2lKSSqDpTJ9HK5DqxoozEDWVAznm+5KO3MsR0d4uzhwA0trtQAFAD6qo1OpVE4AggAZACSADVtRPlyaJzrrFsTS5NcWAGyCR04zCHa59dNK622hB8hKOGjp1brTYOaP7Ekiq3oG0Pk7Eh3hgCB5xaboHGXKh3QHXB0zlM8RS5TA4ENR1yQHLkEBAA5MEZLkCAcXl+SFUkm3cMEPkIwhHFIhUGybYMPCSVD1kNYsiMcNiAw4hxgKORsKSpGkqwgBlmTZOsIHI3MXTdAYHATQt0DAEA-GzINA0cSVKAgXNsMOJ4oFwYNiwAbTkYQACZBF5ORlGPY8HJUFySCc+ySFEORRAAXWArD8xIEMoH1elDjlKzBBkXkJGPKReSkY9RF5FKvKkYRjwC4TnVdABVW0gxDMU1hZew8WIoEaCDWZQwDMUWSquBAjU-FHxwvCWxZVrHxVGzDOCqgAJcKq5SoBwnhWYjGSY0UjLzAlUGLORZEEEhAVPDaSEUQK80Hb1KHiXBRscYsJqm06HEZXNyQAWQIekkjObhGWGp4roNCEqjq2aSFdcUlqFQFAdQVAeybAUkgDTUIEGKh9VmvaFowMB2uLF7js+zwWggC0SAAcTuqp7QswQcvk11l2W+Meo8L1-0AjrOR8OwpTqKheRZLgit8XMoGWxkAEIWPcJJGYfEgAB8pZIEX6VYiWPiSDwygmg4HFwWa5KbILszUhwkhuRGAAM7wAyWXC2AJYcQaAEbCSbU0HOBqQcE25uY+hhV10VRfF+8oTlOAkxTVE6nRI2iWpJl-f5JI7oATWnLVdU90UTl4AgGRIRkHB1339vcA2jfQRHbt1s3A8fK2AlscBPWGw4iIWJXHziIi3aSEhtQQM4EACAASRYHCOE2IcL9Ou1zITKZIFVOQhECHDAiCoCgoFUEcR8HDgHOs7AMBtOK0Mrdzf3QPAyDoNg-Y7AQ4tkLn6wQ14V5U2Wtunw8CB0zIAlMChnQBzOI+oQToQcPzQW8tFbVwFBXFk3U2wXXnpmCU11ojmyZiQB41Ac6EmyJraIvJljcRAO4AIihZDHAbINA68BOLB1Dv6BWYs25JAumOCBSNcr-VdFUOA7wSD9BZE4dw9J0C-ylMtXeOcRHKTbD4AAXpApsbBc45EOFAR+pBtEAB4SAmTMk9HICNgy6OGMMAuTYQ6lnAYaNiEJVxQEmn8RkywjHBgCJ4+kFkoB+V5KFcKEAAhBIin4vyNC9rklsWHCBBpJHoAtBFCAMAKEuheAgd4nwkgIhAHcB4LJcnnGQPaaJRdDhZByGaSIxYTbyLERIiAE5h4+IiUcBIw8wkQHaSbcpC1+jFliYcBhhsGnZiaTwiuwziqsXjkqfK1gRxVCSKCPGJth6o3akcZAmzCE1NHqkGA+px7CN4OnWeTYFLWBuEVQgZBDEhjbLTUM9NhokDGD1TJ78Gr-zxHYIBzySqjNzDM0ZuTbnXVoVc10C9bSHEvmvDecAt5QjqAgLQoCgx9FeOmBq8YVhbHPqwpIiLr4wTgvfRCJAn4wrdEvAlWRPiHDgIUi4DV3gr0JUCa+dDJS8DKhUCCiALhMLsf7di8TDRXxFTwpsAtc4Cr7kKtlspxrgDANY+aEoS7G0ZFXC2UJa7CIhPbMBrKRUe36cFKo2pty7n3IeFa61ASrVkOUmZEq+LxPhcKrAjJPrvT+sMEgtr7Xaj3AeTUFzeGINbI7KacKsy2gtFRXgvAWZlJFJckS1IeWyq1RfFeV91430pa+Egww5SrUwqKBS2pnwenINXblLQqxQNzkW1e5Lb7wXTAYkc44pxqlTnOJca4Nxbh3BGx10afa62wrqsuN1C4kANdg419JgT-wTJfHlpbeokGHl2ktUEKV31fCcW0fbu4NpfDwB2bbMyuySOPCuU8Swpi9WhBxvq2UBuIhwgCwaSCrW2m6wQH6FKJ0oGKV28oqI9QJTafa6tNKpnTHu1lB6yB0AzL6LkWLi6RBYgjCuClMAkBSOQw4mjUxXkhUCDS5w2gHzAHhp4TyT503TO875x8-m4ABeR106jEgRGaCRNdnqSXsKgp8doVBZomxnnyMARUKILp1TkUu5dV3rsttbJ8GbNaaxwQLIBy1h6DsnCnWcC4Vzrk3OGyNh4jhizfb7D9CrGT+zblqpsi6dN6pNjc7wWL2FWorjE5hsy2HVwhd4KF5ShJNlS8cXsVgNDMC0DoPQPB+BCDEJIGQ8glDKFKHYF8lQ3CeHC5pAIQQdCkHCJEGIJG4A6AyIEQhrX8ibGlCUGwVWKjVFqPUIETQWhZ00p0YuVBpiWEWNEYAyYqATjGBMHI0RVAFHxEUdIRwsvZdyyEfLBgivGFK2YZQzArBAA)

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
