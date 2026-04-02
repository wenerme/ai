---
title: Browse the web
description: Agents can browse the web using the Browser Rendering API or your preferred headless browser service.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/agents/api-reference/browse-the-web.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Browse the web

Agents can browse the web using the [Browser Rendering](https://developers.cloudflare.com/browser-rendering/) API or your preferred headless browser service.

### Browser Rendering API

The [Browser Rendering](https://developers.cloudflare.com/browser-rendering/) allows you to spin up headless browser instances, render web pages, and interact with websites through your Agent.

You can define a method that uses Puppeteer to pull the content of a web page, parse the DOM, and extract relevant information by calling a model via [Workers AI](https://developers.cloudflare.com/workers-ai/):

* [  JavaScript ](#tab-panel-2104)
* [  TypeScript ](#tab-panel-2105)

JavaScript

```

export class MyAgent extends Agent {

  async browse(browserInstance, urls) {

    let responses = [];

    for (const url of urls) {

      const browser = await puppeteer.launch(browserInstance);

      const page = await browser.newPage();

      await page.goto(url);


      await page.waitForSelector("body");

      const bodyContent = await page.$eval(

        "body",

        (element) => element.innerHTML,

      );


      let resp = await this.env.AI.run("@cf/zai-org/glm-4.7-flash", {

        messages: [

          {

            role: "user",

            content: `Return a JSON object with the product names, prices and URLs with the following format: { "name": "Product Name", "price": "Price", "url": "URL" } from the website content below. <content>${bodyContent}</content>`,

          },

        ],

      });


      responses.push(resp);

      await browser.close();

    }


    return responses;

  }

}


```

TypeScript

```

interface Env {

  BROWSER: Fetcher;

  AI: Ai;

}


export class MyAgent extends Agent<Env> {

  async browse(browserInstance: Fetcher, urls: string[]) {

    let responses = [];

    for (const url of urls) {

      const browser = await puppeteer.launch(browserInstance);

      const page = await browser.newPage();

      await page.goto(url);


      await page.waitForSelector("body");

      const bodyContent = await page.$eval(

        "body",

        (element) => element.innerHTML,

      );


      let resp = await this.env.AI.run("@cf/zai-org/glm-4.7-flash", {

        messages: [

          {

            role: "user",

            content: `Return a JSON object with the product names, prices and URLs with the following format: { "name": "Product Name", "price": "Price", "url": "URL" } from the website content below. <content>${bodyContent}</content>`,

          },

        ],

      });


      responses.push(resp);

      await browser.close();

    }


    return responses;

  }

}


```

You'll also need to add install the `@cloudflare/puppeteer` package and add the following to the wrangler configuration of your Agent:

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

* [  wrangler.jsonc ](#tab-panel-2100)
* [  wrangler.toml ](#tab-panel-2101)

```

{

  // ...

  "ai": {

    "binding": "AI",

  },

  "browser": {

    "binding": "MYBROWSER",

  },

  // ...

}


```

```

[ai]

binding = "AI"


[browser]

binding = "MYBROWSER"


```

### Browserbase

You can also use [Browserbase ↗](https://docs.browserbase.com/integrations/cloudflare/typescript) by using the Browserbase API directly from within your Agent.

Once you have your [Browserbase API key ↗](https://docs.browserbase.com/integrations/cloudflare/typescript), you can add it to your Agent by creating a [secret](https://developers.cloudflare.com/workers/configuration/secrets/):

Terminal window

```

cd your-agent-project-folder

npx wrangler@latest secret put BROWSERBASE_API_KEY


```

```

Enter a secret value: ******

Creating the secret for the Worker "agents-example"

Success! Uploaded secret BROWSERBASE_API_KEY


```

Install the `@cloudflare/puppeteer` package and use it from within your Agent to call the Browserbase API:

 npm  yarn  pnpm  bun 

```
npm i @cloudflare/puppeteer
```

```
yarn add @cloudflare/puppeteer
```

```
pnpm add @cloudflare/puppeteer
```

```
bun add @cloudflare/puppeteer
```

* [  JavaScript ](#tab-panel-2102)
* [  TypeScript ](#tab-panel-2103)

JavaScript

```

export class MyAgent extends Agent {

  constructor(env) {

    super(env);

  }

}


```

TypeScript

```

interface Env {

  BROWSERBASE_API_KEY: string;

}


export class MyAgent extends Agent {

  constructor(env: Env) {

    super(env);

  }

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/api-reference/browse-the-web/","name":"Browse the web"}}]}
```
