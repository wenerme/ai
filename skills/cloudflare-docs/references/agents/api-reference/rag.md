---
title: Retrieval Augmented Generation
description: Agents can use Retrieval Augmented Generation (RAG) to retrieve relevant information and use it augment calls to AI models. Store a user's chat history to use as context for future conversations, summarize documents to bootstrap an Agent's knowledge base, and/or use data from your Agent's web browsing tasks to enhance your Agent's capabilities.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/agents/api-reference/rag.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Retrieval Augmented Generation

Agents can use Retrieval Augmented Generation (RAG) to retrieve relevant information and use it augment [calls to AI models](https://developers.cloudflare.com/agents/api-reference/using-ai-models/). Store a user's chat history to use as context for future conversations, summarize documents to bootstrap an Agent's knowledge base, and/or use data from your Agent's [web browsing](https://developers.cloudflare.com/agents/api-reference/browse-the-web/) tasks to enhance your Agent's capabilities.

You can use the Agent's own [SQL database](https://developers.cloudflare.com/agents/api-reference/store-and-sync-state) as the source of truth for your data and store embeddings in [Vectorize](https://developers.cloudflare.com/vectorize/) (or any other vector-enabled database) to allow your Agent to retrieve relevant information.

### Vector search

Note

If you're brand-new to vector databases and Vectorize, visit the [Vectorize tutorial](https://developers.cloudflare.com/vectorize/get-started/intro/) to learn the basics, including how to create an index, insert data, and generate embeddings.

You can query a vector index (or indexes) from any method on your Agent: any Vectorize index you attach is available on `this.env` within your Agent. If you've [associated metadata](https://developers.cloudflare.com/vectorize/best-practices/insert-vectors/#metadata) with your vectors that maps back to data stored in your Agent, you can then look up the data directly within your Agent using `this.sql`.

Here's an example of how to give an Agent retrieval capabilities:

* [  JavaScript ](#tab-panel-2542)
* [  TypeScript ](#tab-panel-2543)

JavaScript

```

import { Agent } from "agents";


export class RAGAgent extends Agent {

  // Other methods on our Agent

  // ...

  //

  async queryKnowledge(userQuery) {

    // Turn a query into an embedding

    const queryVector = await this.env.AI.run("@cf/baai/bge-base-en-v1.5", {

      text: [userQuery],

    });


    // Retrieve results from our vector index

    let searchResults = await this.env.VECTOR_DB.query(queryVector.data[0], {

      topK: 10,

      returnMetadata: "all",

    });


    let knowledge = [];

    for (const match of searchResults.matches) {

      console.log(match.metadata);

      knowledge.push(match.metadata);

    }


    // Use the metadata to re-associate the vector search results

    // with data in our Agent's SQL database

    let results = this

      .sql`SELECT * FROM knowledge WHERE id IN (${knowledge.map((k) => k.id)})`;


    // Return them

    return results;

  }

}


```

TypeScript

```

import { Agent } from "agents";


interface Env {

  AI: Ai;

  VECTOR_DB: Vectorize;

}


export class RAGAgent extends Agent {

  // Other methods on our Agent

  // ...

  //

  async queryKnowledge(userQuery: string) {

    // Turn a query into an embedding

    const queryVector = await this.env.AI.run("@cf/baai/bge-base-en-v1.5", {

      text: [userQuery],

    });


    // Retrieve results from our vector index

    let searchResults = await this.env.VECTOR_DB.query(queryVector.data[0], {

      topK: 10,

      returnMetadata: "all",

    });


    let knowledge = [];

    for (const match of searchResults.matches) {

      console.log(match.metadata);

      knowledge.push(match.metadata);

    }


    // Use the metadata to re-associate the vector search results

    // with data in our Agent's SQL database

    let results = this

      .sql`SELECT * FROM knowledge WHERE id IN (${knowledge.map((k) => k.id)})`;


    // Return them

    return results;

  }

}


```

You'll also need to connect your Agent to your vector indexes:

* [  wrangler.jsonc ](#tab-panel-2540)
* [  wrangler.toml ](#tab-panel-2541)

```

{

  // ...

  "vectorize": [

    {

      "binding": "VECTOR_DB",

      "index_name": "your-vectorize-index-name",

    },

  ],

  // ...

}


```

```

[[vectorize]]

binding = "VECTOR_DB"

index_name = "your-vectorize-index-name"


```

If you have multiple indexes you want to make available, you can provide an array of `vectorize` bindings.

#### Next steps

* Learn more on how to [combine Vectorize and Workers AI](https://developers.cloudflare.com/vectorize/get-started/embeddings/)
* Review the [Vectorize query API](https://developers.cloudflare.com/vectorize/reference/client-api/)
* Use [metadata filtering](https://developers.cloudflare.com/vectorize/reference/metadata-filtering/) to add context to your results

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/api-reference/rag/","name":"Retrieval Augmented Generation"}}]}
```
