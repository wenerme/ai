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

* [  wrangler.jsonc ](#tab-panel-4586)
* [  wrangler.toml ](#tab-panel-4587)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "rendering-api-demo",

  "main": "src/index.js",

  // Set this to today's date

  "compatibility_date": "2026-05-06",

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

compatibility_date = "2026-05-06"

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

* [  JavaScript ](#tab-panel-4588)
* [  TypeScript ](#tab-panel-4589)

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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwB2AMwBOAGzjRAVlkAOAIwKAXCxZtgHOFxp8BIidLmKVAWABQAYXRUIAU3vYAIlADOMdO6jQ7qki08AmISKjhgBwYAIigaBwAPADoAK3do0lQoMCcIqNj45LToq1t7JwhsABU6GAcAuBgYMD4CKDtkFLgANzh3XgRYCABqYHRccAcrKyhgLyQSAG8SFxAEODIcgHkyFIdeCBIAX0CEdGASaN4wSlxUMER6gHdMAGsHBHSiS1n5w4AqEh9EgwEBNByOD6nc6XAAC11u90eyFB4MhCAylksiT+JFwDlQcHAh0WlhIQPcdCovECEN4AAsABQIBwARxADncEAANCQnN0AJRLMnkki8OxckjoXYkBh8qjdJIAIQASlsAOoAZQAoiqkgBzCFKugAOTyjOiZDOT3cH2iAu+IvJyGQJE1TlwQJILPZnMOEHQJAg9IcKzWGxyJB2ewOvODTiBTzgvhIvnc3s5XiotqdYolhxZnllieTh2lKSSqDpTJ9HK5DqxoozEDWVAznm+5KO3MsR0d4uzhwA0trtQAFAD6qo1OpVE4AggAZACSADVtRPlyaJzrrFsTS5NcXJIJHTjMIdrn100rrbaEHyEo4aOnVutNg5o-sSSKregbR8nYkO8MAQPOLTdA4y5UO6A64OmcqniKXKYHAhqOuSA5cggIAHJgjJcgQDi8vyQqkk27hgh8BGEI4JEKg2TbBh4SQoeshrFoRjisQG7EOEBRyNhSVI0lWEAMsybJ1hAZG5i6boDA4CaFugYAgH42ZBoGjiSpQEC5lhhxPFAuDBsWADaSjiAATIIvJKKIkiSPZsiObyjl2SQAAsSheQAukBmH5iQIZQPq9KHHKlmCAonnCJICi8gokhebyKWeQoUgBUJzqugAqraQYhmKawsvYeJEUCNBBrMoYBmKLKVXAgSqfiD7YbhLYsi1D4qtZBnBVQ-4uJVcpUA4TwrERjKMaKhl5gSqDFkogirSQgInutJCyIFeaDt6lDxLgI2OMW42TSdDiMrm5IALIEPSSRnNwjJDU8l0GhCVS1TNJCuuKi1CoCAOoKgPZNgKSQBpqECDFQ+ozbt80YGAbXFs9R0fZ4LQQBaJAAOK3VU9rmYI2Vya6y5LfG3UeF6f4Ae1nI+HYUp1FQvIslwhW+LmUBLYyACEzHuEkDP3iQAA+kskML9IseLHxJB4ZTjQcDi4DNslNkF2aqQ4SQ3AjAAGt7-hLLhbAEMOINA8NhBNqaDnA1IOMbs1MfQwo66KIti3eUJynASYpqidToobRLUkyfv8kkt0AJrTlquoe6KJy8AQDIkIyDjaz7e3uPrhvoAjN066bAcPpbAS2OAnpDYchELIrD5xIRrtJCQ2oIGcCABAAJIsDhHMb4MF2nXa5oJFMkCqnIQsBDigeBUCQUCqCOA+DhwNnmdgGAWlFaGlu5n7IFgRBUEwfsdjwcWSGz9YIa8K8qZLa3j4eBA6ZkASmChnQOzOI+oQRoQcHzAWcsFZVwFOXFkXU2znTnpmCUV1ohm0ZiQB41Bs6EmyBraIvJlhcRAO4AIsg1pHAbANfa8AOJBxDv6eWotW5JHOmOcBiMcp-VdFUOA7wSD9BZE4dw9J0A-ylEtHe2dhFKTbD4AAXhApsbAc45EOFAB+pAtEAB4SDGVMo9HI8Ngw6OGMMfOTZg6ljAYaViEJVxQAmn8RkyxDHBgCB4+k5koB+V5KFcKEAAiBIir4vyxxJ4llDuAg0Ej0AWgihAGA5CXQvAQO8T4SQEQgDuA8Fk2TzjIHtLtXWkosg5DNJEYsxs5GiPERACcQ9vHhKOAkIeoSICtONqUwuTcaSMNsfQg2dTswNO4eXGxKZY4KmVHlawI4qhJFBLjY2Q8UZtSOMgdZBCqkj1SDAfUY8hG8DTjPJs8lrA3EKoQMgBiQxthpqGOmQ0SBjG6ukt+9U-54jsIAx5xVhm5imYcYZ2TrlXRoRc1089bSHAvqvdecBN5QjqAgLQICgx9FeOmeq8YVhbDPiwpICKr7QVgnfBCJBH7QrdIvfFWRPiHDgPki49V3jLwJUCK+tDJS8FKhUcCiALiDOmcStisTDSX2Fdwps-Mc78t7oK1lsoxrgDAFYuaEpi5G0ZJXc2UIa5CIhHbUBLLhXu16fNKo2pty7n3IeZaggtorVWr0kFRUWISvsXCoVWBGQfTer9YYJAbV2u1HuA8mozk8IQa2B2k1YVZltBaSivBeDMxKSKc5wlqTcplZq8+y9L5r2vhSl8JBhhyhWhhUU8ltRPg9OQKuXKWhVkgTnItK8yU3zgumfRI5xxTjVCnOcS41wbi3DuCNDro3ex1lhHVpdroFxIPqrBRr6TAj-gmC+3LS09RIEPLtJbILktvi+E4to+1dwbc+Hg9s22ZhdkkMe5coker9t6kZEI-XAADURdh-5g0kBWi61aggonyQTpQMULt5SUW6vim0e01YaVTOmPdLKD1kDoBmX0XJMVF0iMxeG5d5KYBICkMhhwNGpkvBCoE6lzhtH3mAPDTwHnH1pumV5nyj4-NwH88jro1GJAiM0Yia7P3ErYZBT47QqAzWNtPPkYBCrkQXdqnIJcy6rvXRbK2j4M0aw1tg-mgClpD0HZOZOs4FwrnXJucNkbDxHFFm+n2UT5WMj9q3TVTZF06d1cbK53hMVsMteXckMmYEGoQOC7wkLemCSbKl44vYrAaGYFoHQegeD8CEGIKQMh5DKAUKUOwz5KhuE8OFjSAQgg6FIOESIMQSNwB0BkQIBDWv5E2NKEoNgqsVGqLUeoQImgtEzhpToRcqDTEsIsaIwBkxUAnGMCYORoiqAKPiIo6QjhZey7lkI+WDBFeMKVswChmBWCAA)

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
