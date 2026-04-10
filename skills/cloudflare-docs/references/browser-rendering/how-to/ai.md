---
title: Use browser rendering with AI
description: The ability to browse websites can be crucial when building workflows with AI. Here, we provide an example where we use Browser Rendering to visit
https://labs.apnic.net/ and then, using a machine learning model available in Workers AI, extract the first post as JSON with a specified schema.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ AI ](https://developers.cloudflare.com/search/?tags=AI)[ LLM ](https://developers.cloudflare.com/search/?tags=LLM) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/browser-rendering/how-to/ai.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Use browser rendering with AI

The ability to browse websites can be crucial when building workflows with AI. Here, we provide an example where we use Browser Rendering to visit`https://labs.apnic.net/` and then, using a machine learning model available in [Workers AI](https://developers.cloudflare.com/workers-ai/), extract the first post as JSON with a specified schema.

## Prerequisites

1. Use the `create-cloudflare` CLI to generate a new Hello World Cloudflare Worker script:

Terminal window

```

npm create cloudflare@latest -- browser-worker


```

1. Install `@cloudflare/puppeteer`, which allows you to control the Browser Rendering instance:

Terminal window

```

npm i @cloudflare/puppeteer


```

1. Install `zod` so we can define our output format and `zod-to-json-schema` so we can convert it into a JSON schema format:

Terminal window

```

npm i zod

npm i zod-to-json-schema


```

1. Activate the nodejs compatibility flag and add your Browser Rendering binding to your new Wrangler configuration:

* [  wrangler.jsonc ](#tab-panel-3246)
* [  wrangler.toml ](#tab-panel-3247)

JSONC

```

{

  "compatibility_flags": [

    "nodejs_compat"

  ]

}


```

TOML

```

compatibility_flags = [ "nodejs_compat" ]


```

* [  wrangler.jsonc ](#tab-panel-3248)
* [  wrangler.toml ](#tab-panel-3249)

JSONC

```

{

  "browser": {

    "binding": "MY_BROWSER"

  }

}


```

TOML

```

[browser]

binding = "MY_BROWSER"


```

1. In order to use [Workers AI](https://developers.cloudflare.com/workers-ai/), you need to get your [Account ID and API token](https://developers.cloudflare.com/workers-ai/get-started/rest-api/#1-get-api-token-and-account-id). Once you have those, create a [.dev.vars](https://developers.cloudflare.com/workers/configuration/environment-variables/#add-environment-variables-via-wrangler) file and set them there:

```

ACCOUNT_ID=

API_TOKEN=


```

We use `.dev.vars` here since it's only for local development, otherwise you'd use [Secrets](https://developers.cloudflare.com/workers/configuration/secrets/).

## Load the page using Browser Rendering

In the code below, we launch a browser using `await puppeteer.launch(env.MY_BROWSER)`, extract the rendered text and close the browser. Then, with the user prompt, the desired output schema and the rendered text, prepare a prompt to send to the LLM.

Replace the contents of `src/index.ts` with the following skeleton script:

TypeScript

```

import { z } from "zod";

import puppeteer from "@cloudflare/puppeteer";

import zodToJsonSchema from "zod-to-json-schema";


export default {

  async fetch(request, env) {

    const url = new URL(request.url);

    if (url.pathname != "/") {

      return new Response("Not found");

    }


    // Your prompt and site to scrape

    const userPrompt = "Extract the first post only.";

    const targetUrl = "https://labs.apnic.net/";


    // Launch browser

    const browser = await puppeteer.launch(env.MY_BROWSER);

    const page = await browser.newPage();

    await page.goto(targetUrl);


    // Get website text

    const renderedText = await page.evaluate(() => {

      // @ts-ignore js code to run in the browser context

      const body = document.querySelector("body");

      return body ? body.innerText : "";

    });

    // Close browser since we no longer need it

    await browser.close();


    // define your desired json schema

    const outputSchema = zodToJsonSchema(

      z.object({ title: z.string(), url: z.string(), date: z.string() })

    );


    // Example prompt

    const prompt = `

    You are a sophisticated web scraper. You are given the user data extraction goal and the JSON schema for the output data format.

    Your task is to extract the requested information from the text and output it in the specified JSON schema format:


        ${JSON.stringify(outputSchema)}


    DO NOT include anything else besides the JSON output, no markdown, no plaintext, just JSON.


    User Data Extraction Goal: ${userPrompt}


    Text extracted from the webpage: ${renderedText}`;


    // TODO call llm

    //const result = await getLLMResult(env, prompt, outputSchema);

    //return Response.json(result);

  }


} satisfies ExportedHandler<Env>;


```

Explain Code

## Call an LLM

Having the webpage text, the user's goal and output schema, we can now use an LLM to transform it to JSON according to the user's request. The example below uses `@hf/thebloke/deepseek-coder-6.7b-instruct-awq` but other [models](https://developers.cloudflare.com/workers-ai/models/) or services like OpenAI, could be used with minimal changes:

TypeScript

```

async function getLLMResult(env, prompt: string, schema?: any) {

  const model = "@hf/thebloke/deepseek-coder-6.7b-instruct-awq"

  const requestBody = {

    messages: [{

      role: "user",

      content: prompt

    }],

  };

  const aiUrl = `https://api.cloudflare.com/client/v4/accounts/${env.ACCOUNT_ID}/ai/run/${model}`


  const response = await fetch(aiUrl, {

    method: "POST",

    headers: {

      "Content-Type": "application/json",

      Authorization: `Bearer ${env.API_TOKEN}`,

    },

    body: JSON.stringify(requestBody),

  });

  if (!response.ok) {

    console.log(JSON.stringify(await response.text(), null, 2));

    throw new Error(`LLM call failed ${aiUrl} ${response.status}`);

  }


  // process response

  const data = await response.json();

  const text = data.result.response || '';

  const value = (text.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, text])[1];

  try {

    return JSON.parse(value);

  } catch(e) {

    console.error(`${e} . Response: ${value}`)

  }

}


```

Explain Code

If you want to use Browser Rendering with OpenAI instead you'd just need to change the `aiUrl` endpoint and `requestBody` (or check out the [llm-scraper-worker ↗](https://www.npmjs.com/package/llm-scraper-worker) package).

## Conclusion

The full Worker script now looks as follows:

TypeScript

```

import { z } from "zod";

import puppeteer from "@cloudflare/puppeteer";

import zodToJsonSchema from "zod-to-json-schema";


export default {

  async fetch(request, env) {

    const url = new URL(request.url);

    if (url.pathname != "/") {

      return new Response("Not found");

    }


    // Your prompt and site to scrape

    const userPrompt = "Extract the first post only.";

    const targetUrl = "https://labs.apnic.net/";


    // Launch browser

    const browser = await puppeteer.launch(env.MY_BROWSER);

    const page = await browser.newPage();

    await page.goto(targetUrl);


    // Get website text

    const renderedText = await page.evaluate(() => {

      // @ts-ignore js code to run in the browser context

      const body = document.querySelector("body");

      return body ? body.innerText : "";

    });

    // Close browser since we no longer need it

    await browser.close();


    // define your desired json schema

    const outputSchema = zodToJsonSchema(

      z.object({ title: z.string(), url: z.string(), date: z.string() })

    );


    // Example prompt

    const prompt = `

    You are a sophisticated web scraper. You are given the user data extraction goal and the JSON schema for the output data format.

    Your task is to extract the requested information from the text and output it in the specified JSON schema format:


        ${JSON.stringify(outputSchema)}


    DO NOT include anything else besides the JSON output, no markdown, no plaintext, just JSON.


    User Data Extraction Goal: ${userPrompt}


    Text extracted from the webpage: ${renderedText}`;


    // call llm

    const result = await getLLMResult(env, prompt, outputSchema);

    return Response.json(result);

  }


} satisfies ExportedHandler<Env>;


async function getLLMResult(env, prompt: string, schema?: any) {

  const model = "@hf/thebloke/deepseek-coder-6.7b-instruct-awq"

  const requestBody = {

    messages: [{

      role: "user",

      content: prompt

    }],

  };

  const aiUrl = `https://api.cloudflare.com/client/v4/accounts/${env.ACCOUNT_ID}/ai/run/${model}`


  const response = await fetch(aiUrl, {

    method: "POST",

    headers: {

      "Content-Type": "application/json",

      Authorization: `Bearer ${env.API_TOKEN}`,

    },

    body: JSON.stringify(requestBody),

  });

  if (!response.ok) {

    console.log(JSON.stringify(await response.text(), null, 2));

    throw new Error(`LLM call failed ${aiUrl} ${response.status}`);

  }


  // process response

  const data = await response.json() as { result: { response: string }};

  const text = data.result.response || '';

  const value = (text.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, text])[1];

  try {

    return JSON.parse(value);

  } catch(e) {

    console.error(`${e} . Response: ${value}`)

  }

}


```

Explain Code

You can run this script to test it via:

Terminal window

```

npx wrangler dev


```

With your script now running, you can go to `http://localhost:8787/` and should see something like the following:

```

{

  "title": "IP Addresses in 2024",

  "url": "http://example.com/ip-addresses-in-2024",

  "date": "11 Jan 2025"

}


```

For more complex websites or prompts, you might need a better model. Check out the latest models in [Workers AI](https://developers.cloudflare.com/workers-ai/models/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-rendering/","name":"Browser Rendering"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-rendering/how-to/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-rendering/how-to/ai/","name":"Use browser rendering with AI"}}]}
```
