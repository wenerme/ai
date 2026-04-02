---
title: Bring your own generation model
description: When using AI Search, AI Search leverages a Workers AI model to generate the response. If you want to use a model outside of Workers AI, you can use AI Search for search while leveraging a model outside of Workers AI to generate responses.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ AI ](https://developers.cloudflare.com/search/?tags=AI) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-search/how-to/bring-your-own-generation-model.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Bring your own generation model

When using `AI Search`, AI Search leverages a Workers AI model to generate the response. If you want to use a model outside of Workers AI, you can use AI Search for `search` while leveraging a model outside of Workers AI to generate responses.

Here is an example of how you can use an OpenAI model to generate your responses. This example uses [Workers Binding](https://developers.cloudflare.com/ai-search/usage/workers-binding/).

Note

AI Search now supports [bringing your own models natively](https://developers.cloudflare.com/ai-search/configuration/models/). You can attach provider keys through AI Gateway and select third-party models directly in your AI Search settings. The example below still works, but the recommended way is to configure your external model through AI Gateway.

* [  JavaScript ](#tab-panel-3079)
* [  TypeScript ](#tab-panel-3080)

JavaScript

```

import { openai } from "@ai-sdk/openai";

import { generateText } from "ai";


export default {

  async fetch(request, env) {

    // Parse incoming url

    const url = new URL(request.url);


    // Get the user query or default to a predefined one

    const userQuery =

      url.searchParams.get("query") ??

      "How do I train a llama to deliver coffee?";


    // Search for documents in AI Search

    const searchResult = await env.AI.autorag("my-rag").search({

      query: userQuery,

    });


    if (searchResult.data.length === 0) {

      // No matching documents

      return Response.json({ text: `No data found for query "${userQuery}"` });

    }


    // Join all document chunks into a single string

    const chunks = searchResult.data

      .map((item) => {

        const data = item.content

          .map((content) => {

            return content.text;

          })

          .join("\n\n");


        return `<file name="${item.filename}">${data}</file>`;

      })

      .join("\n\n");


    // Send the user query + matched documents to openai for answer

    const generateResult = await generateText({

      model: openai("gpt-4o-mini"),

      messages: [

        {

          role: "system",

          content:

            "You are a helpful assistant and your task is to answer the user question using the provided files.",

        },

        { role: "user", content: chunks },

        { role: "user", content: userQuery },

      ],

    });


    // Return the generated answer

    return Response.json({ text: generateResult.text });

  },

};


```

TypeScript

```

import { openai } from "@ai-sdk/openai";

import { generateText } from "ai";


export interface Env {

  AI: Ai;

  OPENAI_API_KEY: string;

}


export default {

  async fetch(request, env): Promise<Response> {

    // Parse incoming url

    const url = new URL(request.url);


    // Get the user query or default to a predefined one

    const userQuery =

      url.searchParams.get("query") ??

      "How do I train a llama to deliver coffee?";


    // Search for documents in AI Search

    const searchResult = await env.AI.autorag("my-rag").search({

      query: userQuery,

    });


    if (searchResult.data.length === 0) {

      // No matching documents

      return Response.json({ text: `No data found for query "${userQuery}"` });

    }


    // Join all document chunks into a single string

    const chunks = searchResult.data

      .map((item) => {

        const data = item.content

          .map((content) => {

            return content.text;

          })

          .join("\n\n");


        return `<file name="${item.filename}">${data}</file>`;

      })

      .join("\n\n");


    // Send the user query + matched documents to openai for answer

    const generateResult = await generateText({

      model: openai("gpt-4o-mini"),

      messages: [

        {

          role: "system",

          content:

            "You are a helpful assistant and your task is to answer the user question using the provided files.",

        },

        { role: "user", content: chunks },

        { role: "user", content: userQuery },

      ],

    });


    // Return the generated answer

    return Response.json({ text: generateResult.text });

  },

} satisfies ExportedHandler<Env>;


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/how-to/bring-your-own-generation-model/","name":"Bring your own generation model"}}]}
```
