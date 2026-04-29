---
title: xAI
description: Route xAI (Grok) API requests through AI Gateway for observability and control.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# xAI

## Endpoint

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/grok


```

## URL structure

When making requests to [Grok ↗](https://docs.x.ai/docs#getting-started), replace `https://api.x.ai/v1` in the URL you are currently using with `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/grok`.

## Prerequisites

When making requests to Grok, ensure you have the following:

* Your AI Gateway Account ID.
* Your AI Gateway gateway name.
* An active xAI API token.
* The name of the xAI model you want to use.

## Examples

### cURL

Request

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/grok/v1/chat/completions \

  --header 'content-type: application/json' \

  --header 'Authorization: Bearer {xai_api_token}' \

  --data '{

    "model": "grok-4",

    "messages": [

        {

            "role": "user",

            "content": "What is Cloudflare?"

        }

    ]

}'


```

Explain Code

### Use OpenAI SDK with JavaScript

If you are using the OpenAI SDK with JavaScript, you can set your endpoint like this:

JavaScript

```

import OpenAI from "openai";


const openai = new OpenAI({

  apiKey: "<api key>",

  baseURL:

    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/grok",

});


const completion = await openai.chat.completions.create({

  model: "grok-4",

  messages: [

    {

      role: "system",

      content:

        "You are Grok, a chatbot inspired by the Hitchhiker's Guide to the Galaxy.",

    },

    {

      role: "user",

      content: "What is the meaning of life, the universe, and everything?",

    },

  ],

});


console.log(completion.choices[0].message);


```

Explain Code

### Use OpenAI SDK with Python

If you are using the OpenAI SDK with Python, you can set your endpoint like this:

Python

```

import os

from openai import OpenAI


XAI_API_KEY = os.getenv("XAI_API_KEY")

client = OpenAI(

    api_key=XAI_API_KEY,

    base_url="https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/grok",

)


completion = client.chat.completions.create(

    model="grok-4",

    messages=[

        {"role": "system", "content": "You are Grok, a chatbot inspired by the Hitchhiker's Guide to the Galaxy."},

        {"role": "user", "content": "What is the meaning of life, the universe, and everything?"},

    ],

)


print(completion.choices[0].message)


```

Explain Code

### Use Anthropic SDK with JavaScript

If you are using the Anthropic SDK with JavaScript, you can set your endpoint like this:

JavaScript

```

import Anthropic from "@anthropic-ai/sdk";


const anthropic = new Anthropic({

  apiKey: "<api key>",

  baseURL:

    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/grok",

});


const msg = await anthropic.messages.create({

  model: "grok-beta",

  max_tokens: 128,

  system:

    "You are Grok, a chatbot inspired by the Hitchhiker's Guide to the Galaxy.",

  messages: [

    {

      role: "user",

      content: "What is the meaning of life, the universe, and everything?",

    },

  ],

});


console.log(msg);


```

Explain Code

### Use Anthropic SDK with Python

If you are using the Anthropic SDK with Python, you can set your endpoint like this:

Python

```

import os

from anthropic import Anthropic


XAI_API_KEY = os.getenv("XAI_API_KEY")

client = Anthropic(

    api_key=XAI_API_KEY,

    base_url="https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/grok",

)


message = client.messages.create(

    model="grok-beta",

    max_tokens=128,

    system="You are Grok, a chatbot inspired by the Hitchhiker's Guide to the Galaxy.",

    messages=[

        {

            "role": "user",

            "content": "What is the meaning of life, the universe, and everything?",

        },

    ],

)


print(message.content)


```

Explain Code

## OpenAI-Compatible Endpoint

You can also use the [OpenAI-compatible endpoint](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/) (`/ai-gateway/usage/chat-completion/`) to access Grok models using the OpenAI API schema. To do so, send your requests to:

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions


```

Specify:

```

{

"model": "grok/{model}"

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/usage/","name":"Using AI Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/usage/providers/","name":"Provider Native"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/usage/providers/grok/","name":"xAI"}}]}
```
