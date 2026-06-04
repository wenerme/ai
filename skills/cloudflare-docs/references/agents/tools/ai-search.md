---
title: AI Search
description: Give agents retrieval capabilities with Cloudflare AI Search.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# AI Search

Agents can use [AI Search](https://developers.cloudflare.com/ai-search/) to retrieve relevant information from indexed content and use it to augment [calls to AI models](https://developers.cloudflare.com/agents/runtime/operations/using-ai-models/). AI Search manages the retrieval pipeline for you, including indexing, search, and optional chat completions over your content.

Use AI Search when you want an agent to:

* Search product docs, support content, user files, or internal knowledge bases.
* Retrieve relevant chunks before calling a model.
* Use managed indexing instead of building retrieval infrastructure yourself.
* Query content from an R2 bucket, website, or uploaded files.

## Basic pattern

Bind AI Search to your Worker, then query an instance from an agent method.

* [  JavaScript ](#tab-panel-5890)
* [  TypeScript ](#tab-panel-5891)

JavaScript

```

import { Agent, callable } from "agents";


export class SearchAgent extends Agent {

  @callable()

  async searchKnowledge(query) {

    const instance = this.env.AI_SEARCH.get("my-instance");


    const results = await instance.search({

      messages: [{ role: "user", content: query }],

    });


    return results;

  }

}


```

TypeScript

```

import { Agent, callable } from "agents";


type Env = {

  AI_SEARCH: AiSearchNamespace;

};


export class SearchAgent extends Agent<Env> {

  @callable()

  async searchKnowledge(query: string) {

    const instance = this.env.AI_SEARCH.get("my-instance");


    const results = await instance.search({

      messages: [{ role: "user", content: query }],

    });


    return results;

  }

}


```

For answer generation, use `chatCompletions()` to retrieve relevant content and generate a response in one call.

* [  JavaScript ](#tab-panel-5888)
* [  TypeScript ](#tab-panel-5889)

JavaScript

```

const instance = this.env.AI_SEARCH.get("my-instance");


const response = await instance.chatCompletions({

  messages: [{ role: "user", content: "How do I deploy an Agent?" }],

  model: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",

  ai_search_options: {

    retrieval: {

      max_num_results: 5,

    },

  },

});


```

TypeScript

```

const instance = this.env.AI_SEARCH.get("my-instance");


const response = await instance.chatCompletions({

  messages: [{ role: "user", content: "How do I deploy an Agent?" }],

  model: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",

  ai_search_options: {

    retrieval: {

      max_num_results: 5,

    },

  },

});


```

## Configuration

Use an `ai_search_namespaces` binding when the agent needs to access AI Search instances by name.

* [  wrangler.jsonc ](#tab-panel-5886)
* [  wrangler.toml ](#tab-panel-5887)

JSONC

```

{

  "ai_search_namespaces": [

    {

      "binding": "AI_SEARCH",

      "namespace": "default",

      "remote": true

    }

  ]

}


```

TOML

```

[[ai_search_namespaces]]

binding = "AI_SEARCH"

namespace = "default"

remote = true


```

Use `remote: true` to query deployed AI Search instances during local development with `wrangler dev`.

## Related resources

[ AI Search ](https://developers.cloudflare.com/ai-search/) Create managed retrieval pipelines over websites, R2 buckets, and uploaded files. 

[ Workers binding ](https://developers.cloudflare.com/ai-search/api/search/workers-binding/) Query AI Search directly from Workers code. 

[ Create an AI Search instance ](https://developers.cloudflare.com/ai-search/get-started/) Create your first AI Search instance and run your first query. 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/tools/","name":"Tools"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/tools/ai-search/","name":"AI Search"}}]}
```
