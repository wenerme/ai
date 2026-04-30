---
title: Custom metadata
description: Tag AI Gateway requests with custom metadata such as user IDs to improve log filtering and analysis.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Custom metadata

Custom metadata in AI Gateway allows you to tag requests with user IDs or other identifiers, enabling better tracking and analysis of your requests. Metadata values can be strings, numbers, or booleans, and will appear in your logs, making it easy to search and filter through your data.

## Key Features

* **Custom Tagging**: Add user IDs, team names, test indicators, and other relevant information to your requests.
* **Enhanced Logging**: Metadata appears in your logs, allowing for detailed inspection and troubleshooting.
* **Search and Filter**: Use metadata to efficiently search and filter through logged requests.

Note

AI Gateway allows you to pass up to five custom metadata entries per request. If more than five entries are provided, only the first five will be saved; additional entries will be ignored. Ensure your custom metadata is limited to five entries to avoid unprocessed or lost data.

## Supported Metadata Types

* String
* Number
* Boolean

Note

Objects are not supported as metadata values.

## Implementations

### Using cURL

To include custom metadata in your request using cURL:

Terminal window

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/chat/completions \

  --header 'Authorization: Bearer {api_token}' \

  --header 'Content-Type: application/json' \

  --header 'cf-aig-metadata: {"team": "AI", "user": 12345, "test":true}' \

  --data '{"model": "gpt-4o", "messages": [{"role": "user", "content": "What should I eat for lunch?"}]}'


```

### Using SDK

To include custom metadata in your request using the OpenAI SDK:

JavaScript

```

import OpenAI from "openai";


export default {

 async fetch(request, env, ctx) {

   const openai = new OpenAI({

     apiKey: env.OPENAI_API_KEY,

     baseURL: "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai",

   });


   try {

     const chatCompletion = await openai.chat.completions.create(

       {

         model: "gpt-4o",

         messages: [{ role: "user", content: "What should I eat for lunch?" }],

         max_tokens: 50,

       },

       {

         headers: {

           "cf-aig-metadata": JSON.stringify({

             user: "JaneDoe",

             team: 12345,

             test: true

           }),

         },

       }

     );


     const response = chatCompletion.choices[0].message;

     return new Response(JSON.stringify(response));

   } catch (e) {

     console.log(e);

     return new Response(e);

   }

 },

};


```

### Using Binding

To include custom metadata in your request using [Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/):

JavaScript

```

export default {

 async fetch(request, env, ctx) {

   const aiResp = await env.AI.run(

       '@cf/mistral/mistral-7b-instruct-v0.1',

       { prompt: 'What should I eat for lunch?' },

       { gateway: { id: 'gateway_id', metadata: { "team": "AI", "user": 12345, "test": true} } }

   );


   return new Response(aiResp);

 },

};


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/observability/","name":"Observability"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/observability/custom-metadata/","name":"Custom metadata"}}]}
```
