---
title: Reuse sessions
description: The best way to improve the performance of your browser rendering Worker is to reuse sessions. One way to do that is via Durable Objects, which allows you to keep a long running connection from a Worker to a browser. Another way is to keep the browser open after you've finished with it, and connect to that session each time you have a new request.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/browser-rendering/workers-bindings/reuse-sessions.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Reuse sessions

The best way to improve the performance of your browser rendering Worker is to reuse sessions. One way to do that is via [Durable Objects](https://developers.cloudflare.com/browser-rendering/workers-bindings/browser-rendering-with-do/), which allows you to keep a long running connection from a Worker to a browser. Another way is to keep the browser open after you've finished with it, and connect to that session each time you have a new request.

In short, this entails using `browser.disconnect()` instead of `browser.close()`, and, if there are available sessions, using `puppeteer.connect(env.MY_BROWSER, sessionID)` instead of launching a new browser session.

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

For setup, select the following options:

* For _What would you like to start with?_, choose `Hello World example`.
* For _Which template would you like to use?_, choose `Worker only`.
* For _Which language do you want to use?_, choose `TypeScript`.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

## 2\. Install Puppeteer

In your `browser-worker` directory, install Cloudflare's [fork of Puppeteer](https://developers.cloudflare.com/browser-rendering/puppeteer/):

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

## 3\. Configure the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/)

Note

Your Worker configuration must include the `nodejs_compat` compatibility flag and a `compatibility_date` of 2025-09-15 or later.

* [  wrangler.jsonc ](#tab-panel-3264)
* [  wrangler.toml ](#tab-panel-3265)

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "browser-worker",

  "main": "src/index.ts",

  // Set this to today's date

  "compatibility_date": "2026-04-02",

  "compatibility_flags": [

    "nodejs_compat"

  ],

  "browser": {

    "binding": "MYBROWSER"

  }

}


```

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "browser-worker"

main = "src/index.ts"

# Set this to today's date

compatibility_date = "2026-04-02"

compatibility_flags = [ "nodejs_compat" ]


[browser]

binding = "MYBROWSER"


```

## 4\. Code

The script below starts by fetching the current running sessions. If there are any that do not already have a worker connection, it picks a random session ID and attempts to connect (`puppeteer.connect(..)`) to it. If that fails or there were no running sessions to start with, it launches a new browser session (`puppeteer.launch(..)`). Then, it goes to the website and fetches the dom. Once that is done, it disconnects (`browser.disconnect()`), making the connection available to other workers.

Take into account that if the browser is idle, i.e. does not get any command, for more than the current [limit](https://developers.cloudflare.com/browser-rendering/limits/), it will close automatically, so you must have enough requests per minute to keep it alive.

* [  JavaScript ](#tab-panel-3266)
* [  TypeScript ](#tab-panel-3267)

JavaScript

```

import puppeteer from "@cloudflare/puppeteer";


export default {

  async fetch(request, env) {

    const url = new URL(request.url);

    let reqUrl = url.searchParams.get("url") || "https://example.com";

    reqUrl = new URL(reqUrl).toString(); // normalize


    // Pick random session from open sessions

    let sessionId = await this.getRandomSession(env.MYBROWSER);

    let browser, launched;

    if (sessionId) {

      try {

        browser = await puppeteer.connect(env.MYBROWSER, sessionId);

      } catch (e) {

        // another worker may have connected first

        console.log(`Failed to connect to ${sessionId}. Error ${e}`);

      }

    }

    if (!browser) {

      // No open sessions, launch new session

      browser = await puppeteer.launch(env.MYBROWSER);

      launched = true;

    }


    sessionId = browser.sessionId(); // get current session id


    // Do your work here

    const page = await browser.newPage();

    const response = await page.goto(reqUrl);

    const html = await response.text();


    // All work done, so free connection (IMPORTANT!)

    browser.disconnect();


    return new Response(

      `${launched ? "Launched" : "Connected to"} ${sessionId} \n-----\n` + html,

      {

        headers: {

          "content-type": "text/plain",

        },

      },

    );

  },


  // Pick random free session

  // Other custom logic could be used instead

  async getRandomSession(endpoint) {

    const sessions = await puppeteer.sessions(endpoint);

    console.log(`Sessions: ${JSON.stringify(sessions)}`);

    const sessionsIds = sessions

      .filter((v) => {

        return !v.connectionId; // remove sessions with workers connected to them

      })

      .map((v) => {

        return v.sessionId;

      });

    if (sessionsIds.length === 0) {

      return;

    }


    const sessionId =

      sessionsIds[Math.floor(Math.random() * sessionsIds.length)];


    return sessionId;

  },

};


```

TypeScript

```

import puppeteer from "@cloudflare/puppeteer";


interface Env {

  MYBROWSER: Fetcher;

}


export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    const url = new URL(request.url);

    let reqUrl = url.searchParams.get("url") || "https://example.com";

    reqUrl = new URL(reqUrl).toString(); // normalize


    // Pick random session from open sessions

    let sessionId = await this.getRandomSession(env.MYBROWSER);

    let browser, launched;

    if (sessionId) {

      try {

        browser = await puppeteer.connect(env.MYBROWSER, sessionId);

      } catch (e) {

        // another worker may have connected first

        console.log(`Failed to connect to ${sessionId}. Error ${e}`);

      }

    }

    if (!browser) {

      // No open sessions, launch new session

      browser = await puppeteer.launch(env.MYBROWSER);

      launched = true;

    }


    sessionId = browser.sessionId(); // get current session id


    // Do your work here

    const page = await browser.newPage();

    const response = await page.goto(reqUrl);

    const html = await response!.text();


    // All work done, so free connection (IMPORTANT!)

    browser.disconnect();


    return new Response(

      `${launched ? "Launched" : "Connected to"} ${sessionId} \n-----\n` + html,

      {

        headers: {

          "content-type": "text/plain",

        },

      },

    );

  },


  // Pick random free session

  // Other custom logic could be used instead

  async getRandomSession(endpoint: puppeteer.BrowserWorker): Promise<string> {

    const sessions: puppeteer.ActiveSession[] =

      await puppeteer.sessions(endpoint);

    console.log(`Sessions: ${JSON.stringify(sessions)}`);

    const sessionsIds = sessions

      .filter((v) => {

        return !v.connectionId; // remove sessions with workers connected to them

      })

      .map((v) => {

        return v.sessionId;

      });

    if (sessionsIds.length === 0) {

      return;

    }


    const sessionId =

      sessionsIds[Math.floor(Math.random() * sessionsIds.length)];


    return sessionId!;

  },

};


```

Besides `puppeteer.sessions()`, we have added other methods to facilitate [Session Management](https://developers.cloudflare.com/browser-rendering/puppeteer/#session-management).

## 5\. Test

Run `npx wrangler dev` to test your Worker locally.

Use real headless browser during local development

To interact with a real headless browser during local development, set `"remote" : true` in the Browser binding configuration. Learn more in our [remote bindings documentation](https://developers.cloudflare.com/workers/development-testing/#remote-bindings).

To test go to the following URL:

`<LOCAL_HOST_URL>/?url=https://example.com`

## 6\. Deploy

Run `npx wrangler deploy` to deploy your Worker to the Cloudflare global network and then to go to the following URL:

`<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/?url=https://example.com`

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-rendering/","name":"Browser Rendering"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-rendering/workers-bindings/","name":"Workers Bindings"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-rendering/workers-bindings/reuse-sessions/","name":"Reuse sessions"}}]}
```
