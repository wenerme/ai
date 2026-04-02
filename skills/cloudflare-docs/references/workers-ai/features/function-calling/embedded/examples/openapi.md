---
title: Tools based on OpenAPI Spec
description: Oftentimes APIs are defined and documented via OpenAPI specification. The Cloudflare ai-utils package's createToolsFromOpenAPISpec function creates tools from the OpenAPI spec, which the LLM can then leverage to fulfill the prompt.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ AI ](https://developers.cloudflare.com/search/?tags=AI) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers-ai/features/function-calling/embedded/examples/openapi.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Tools based on OpenAPI Spec

Oftentimes APIs are defined and documented via [OpenAPI specification ↗](https://swagger.io/specification/). The Cloudflare `ai-utils` package's `createToolsFromOpenAPISpec` function creates tools from the OpenAPI spec, which the LLM can then leverage to fulfill the prompt.

In this example the LLM will describe the a Github user, based Github's API and its OpenAPI spec.

Embedded function calling example from OpenAPI Spec

```

import { createToolsFromOpenAPISpec, runWithTools } from '@cloudflare/ai-utils';


type Env = {

  AI: Ai;

};


const APP_NAME = 'cf-fn-calling-example-app';


export default {

  async fetch(request, env, ctx) {

    const toolsFromOpenAPISpec = [

      // You can pass the OpenAPI spec link or contents directly

      ...(await createToolsFromOpenAPISpec(

        'https://gist.githubusercontent.com/mchenco/fd8f20c8f06d50af40b94b0671273dc1/raw/f9d4b5cd5944cc32d6b34cad0406d96fd3acaca6/partial_api.github.com.json',

        {

          overrides: [

            {

              matcher: ({ url }) => {

                return url.hostname === 'api.github.com';

              },

              // for all requests on *.github.com, we'll need to add a User-Agent.

              values: {

                headers: {

                  'User-Agent': APP_NAME,

                },

              },

            },

          ],

        }

      )),

    ];


    const response = await runWithTools(

      env.AI,

      '@hf/nousresearch/hermes-2-pro-mistral-7b',

      {

        messages: [

          {

            role: 'user',

            content: 'Who is cloudflare on Github and how many repos does the organization have?',

          },

        ],

        tools: toolsFromOpenAPISpec,

      }

    );


    return new Response(JSON.stringify(response));

  },

} satisfies ExportedHandler<Env>;


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-ai/features/function-calling/","name":"Function calling"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers-ai/features/function-calling/embedded/","name":"Embedded"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers-ai/features/function-calling/embedded/examples/","name":"Examples"}},{"@type":"ListItem","position":7,"item":{"@id":"/workers-ai/features/function-calling/embedded/examples/openapi/","name":"Tools based on OpenAPI Spec"}}]}
```
