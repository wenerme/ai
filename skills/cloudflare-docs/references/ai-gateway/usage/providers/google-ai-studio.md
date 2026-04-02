---
title: Google AI Studio
description: Google AI Studio helps you build quickly with Google Gemini models.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-gateway/usage/providers/google-ai-studio.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Google AI Studio

[Google AI Studio ↗](https://ai.google.dev/aistudio) helps you build quickly with Google Gemini models.

## Endpoint

**Base URL:**

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/google-ai-studio


```

Then you can append the endpoint you want to hit, for example: `v1/models/{model}:{generative_ai_rest_resource}`

So your final URL will come together as: `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/google-ai-studio/v1/models/{model}:{generative_ai_rest_resource}`.

## Examples

### cURL

With API Key in Request

* [ With Authenticated Gateway ](#tab-panel-3060)
* [ Unauthenticated Gateway ](#tab-panel-3061)

Terminal window

```

curl "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_name}/google-ai-studio/v1/models/gemini-2.5-flash:generateContent" \

 --header 'content-type: application/json' \

 --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \

 --header 'x-goog-api-key: {google_studio_api_key}' \

 --data '{

      "contents": [

          {

            "role":"user",

            "parts": [

              {"text":"What is Cloudflare?"}

            ]

          }

        ]

      }'


```

Terminal window

```

curl "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_name}/google-ai-studio/v1/models/gemini-2.5-flash:generateContent" \

 --header 'content-type: application/json' \

 --header 'x-goog-api-key: {google_studio_api_key}' \

 --data '{

      "contents": [

          {

            "role":"user",

            "parts": [

              {"text":"What is Cloudflare?"}

            ]

          }

        ]

      }'


```

With Stored Keys (BYOK) / Unified Billing

Terminal window

```

curl "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_name}/google-ai-studio/v1/models/gemini-2.5-flash:generateContent" \

 --header 'content-type: application/json' \

 --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \

 --data '{

      "contents": [

          {

            "role":"user",

            "parts": [

              {"text":"What is Cloudflare?"}

            ]

          }

        ]

      }'


```

### `@google/genai`

If you are using the `@google/genai` package, you can set your endpoint like this:

With Key in Request

* [ With Authenticated Gateway ](#tab-panel-3062)
* [ Unauthenticated Gateway ](#tab-panel-3063)

```

import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({

  apiKey: "{google_studio_api_key}",

  httpOptions: {

    baseUrl: `https://gateway.ai.cloudflare.com/v1/${account_id}/${gateway_name}/google-ai-studio`,

    headers: {

      'cf-aig-authorization': 'Bearer {cf_aig_token}',

    }

  }

});


const response = await ai.models.generateContent({

  model: "gemini-2.5-flash",

  contents: "What is Cloudflare?",

});


console.log(response.text);


```

```

import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({

  apiKey: "{google_studio_api_key}",

  httpOptions: {

    baseUrl: `https://gateway.ai.cloudflare.com/v1/${account_id}/${gateway_name}/google-ai-studio`,

  }

});


const response = await ai.models.generateContent({

  model: "gemini-2.5-flash",

  contents: "What is Cloudflare?",

});


console.log(response.text);


```

With Stored Keys (BYOK) / Unified Billing

```

import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({

  apiKey: "{cf_aig_token}",

  httpOptions: {

    baseUrl: `https://gateway.ai.cloudflare.com/v1/${account_id}/${gateway_name}/google-ai-studio`,

  }

});


const response = await ai.models.generateContent({

  model: "gemini-2.5-flash",

  contents: "What is Cloudflare?",

});


console.log(response.text);


```

## OpenAI-Compatible Endpoint

You can also use the [OpenAI-compatible endpoint](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/) (`/ai-gateway/usage/chat-completion/`) to access Google AI Studio models using the OpenAI API schema. To do so, send your requests to:

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions


```

Specify:

```

{

"model": "google-ai-studio/{model}"

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/usage/","name":"Using AI Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/usage/providers/","name":"Provider Native"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/usage/providers/google-ai-studio/","name":"Google AI Studio"}}]}
```
