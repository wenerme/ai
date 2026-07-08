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

* [  wrangler.jsonc ](#tab-panel-7257)
* [  wrangler.toml ](#tab-panel-7258)

**JSONC**

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "rendering-api-demo",
  "main": "src/index.js",
  // Set this to today's date
  "compatibility_date": "2026-07-08",
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
compatibility_date = "2026-07-08"
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

* [  JavaScript ](#tab-panel-7259)
* [  TypeScript ](#tab-panel-7260)

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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAyCAjADZBAVgAcwgCzS5ALhYs2wDnC40+A4eKmzBCuQFgAUAGF0VCAFNb2ACJQAzjHSuo0G0pLq8AmISKjhgOwYAIigaOwAPADoAK1dI0lQoMAcwiOjYxJTIi2tbBwhsABU6GDs-OBgYMD4CKBtkJLgANzhXXgRYCABqYHRccDsLCyhgDyQSAG8SJxAEODIsgHkyJLteCBIAX38EdGASSN4wSlxUMERagHdMAGs7BFSic2nZ-YAqEh6JBgIAadnsb2Op3OAAFLtdbvdkMDQeCEGlzOZ4j8SLg7Kg4OB9vNzCQAa46FReP4wbwABYACgQdgAjiA7K4IAAaEgOToASgWJNJJF4Ng5JHQ2xIDB5VE6CQAQgAlDYAdQAygBRJUJADmYIVdAAcjl6ZEyCcHq43pE+Z8haTkMgSOqHLgASQmaz2fsIOgSBBaXYlis1lkSFsdntuYGHACHnBvCRvK5PeyPFRrQ6RWL9kz3NL44n9pKkglUDSGV62Ry7RjhWmICsqGn3J9SQdOeYDvbRZn9gBpTWagAKAH1lWqtUqxwBBAAyAEkAGqaseLo1jrWWDZGpzqwsSe1YzD7S49VMKy3WhA8uL2Gip5ardZ2SO7IlCi3oK1vdskV4YAgWcmk6OxFyoV0+1wVMZUEf8OUwOB9XtUk+w5BAQD2TB6Q5Ag7G5XkBWJBtXBBN5cMIexCLlOsG0DNwEkQ1Z9ULPD7CYv0WLsf8DnrMkKSpCsIDpRkWRrCBiOzJ0XT6Ow43zdAwBAHxMwDf17HFSgIGzdD9geKBcEDQsAG0RAATgAJkEbkRAAZjEMRbMkBzuQcmySDkEQ5AAXX-NDcxIIMoF1Wl9hlMzBFkbkAHYxGkblpDEORuWSjzpHMsQ-P4x1nQAVWtAMgxFFYmVsHF8IBGgA2mYM-RFJlKrgfwlNxW8MKwpsmRa28lUs3TAqoH8nEqmUqDsB4lnw+k6OFPSczxVBCxEYRBBIf4JHWkhJH8nN+09ShYlwEb7ELcbJpOux6WzUkAFkCFpBITm4ekhoeS69TBCpapmkhnVFRaBX+AHUFQLsGz5BI-XVCB+ioXUZt2+aMDANrC2eo6PvcJoIDNEgAHFboqW0TMEbLpOdRcltjbq3A9b9f3a9kvBsCUaiobkmS4QrvGzKAlvpABCBjXASBmbxIAAfSWSGF2lGPFt4EjcEpxr2OxcBmqSGwCzMlLsBIrgRgADK8fwlpwNj8GHEGgeGQgm5N+zgSk7GN2b6PoQUdeFEWxevCEZTgBMk2RGpUUNglKQZP3eQSW6AE1Jw1bUPeFI5eAIOkSHpOxtZ9vbXH1w30ARm6ddNgPb0tvxrHAd0hv2PC5kV28Yjw12EhITUEBOBA-AAEnmOwDmN8GC7Tjtsz4imSCVdkwQAuwgJAqAwIBVB7FvOw4GzzOwDAdSiuDS3sz9wDgNA8DIN2GwYMLeCcr+51LCDXhnmTJbW7vNwIFTMg8SYGDOgdmMRdRAmQnYPmAs5YKyrnycuTIuotnOnPdMYorqRDNozEgdxqDZ3xJkDWkRuSLHYiAVwfhJDCEOHWAa+14CsSDiHX08tRatwSOdEckDEZPxkhUOArwSC9CZA4VwtJ0B-wlEtHe2cRHyRbF4AAXlAhsbAc5ZH2FAB+pBtEAB4SAGSMo9LI8NAy6MGIMfODZg7FggfqJiYJlxQAmj8ekiwjGBj8J42kJkoA+W5MFUKEA-BBLCn4nytDdqklsaHSBepJHoDNGFCAMBKFOieAgV47wEhwhADcO4TJcmnGQLaaJhd9gZCyCacIhZjbyLERIiAY4h4+IiQcOIQ8wkQHacbcp81eiFlifsRhBsGmZiabw8uwyiqMTjgqPKlghwVASMCXGxsh4ozagcZAmyiE1JHskGAuox7CN4GnGeDYZKWCuIVQgZBDFBhbDTYMdMhokBGN1TJH96oAJxDYYBzziqjOzDM0ZuTblXToVc5089rT7AvqvdecBN4QhqAgdQYCAw9GeKmeqsYlgbDPmwhIiKr4QSgnfWCJBH6z1dKw4MGR3j7DgIUs49VXjL0JQCK+9DxS8FKmUECiAzjMLsX7Zi8T9SXxFbwhs-Mc4Ct7kKtl0oxrgDANYuaYpi5G3pJXc2EIa7CLBHbcBrKRXu36YFCompNzbl3PuZaa1-grWEOUmZEquLxPhcKrA9IPpvV+oMEgtr7Wah3HudUFyn5IObA7SacKMzWjNGRXgvBmZlKFJcgSlIeWyq1efZel817X0pY+EggwZQrVQsKGSmp7xunIFXblTQKzQJzkWle5Kb7QVTAYoco4JwqhTjOBcK41wbi3BGx10bvY63Qrq0u10C4kANTg41tJAQALjBfHlpaeokCHl2ktYEKW30fEca0fau4NofDwe2bb0wuwSGPcuk8ixJi9UhBxvq2UBvwpwn8waSArS2m6wQH6ZIJ0oCKF2soyLdQJVaPaatVLJlTHu1lB6yB0DTN6DkWKi7hAYvDcuMlMAkCSBQ-YmjkxnkhQCFSpwWj7zAHhh4Tzj601TO875R8-m4ABeR506j4hhEaARNdnqSUcLAu8VoVAZrG2njyMAhUSILp1VkEuZdV3rotlbO8GaNYa1wfzYBS0h6DvHMnacc4lyrnXOGyN+4DiizfT7D9Cr6R+1blqhsi6dN6uNjczwWKOFWvLjElhsz2FVwhZ4KF5S+INlS4cbsFhVDMHUJobQPB+BCFEBIGQ8hFDFBsA+coLh3DhdUn4AImhSChHCFEEjcBNBpH8EQlruR1iSiKFYSrZRKjVFqACBoTRM6qXaEXKgkxzDzEiMARMVAxwjDGFkSISg8i4gKKkA4WXsu5aCPl3QRWDCleMIoZgFggA)

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
