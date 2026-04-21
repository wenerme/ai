---
title: DeepSeek
description: Route DeepSeek API requests through AI Gateway for observability and control.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-gateway/usage/providers/deepseek.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# DeepSeek

[DeepSeek ↗](https://www.deepseek.com/) helps you build quickly with DeepSeek's advanced AI models.

## Endpoint

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/deepseek


```

## Prerequisites

When making requests to DeepSeek, ensure you have the following:

* Your AI Gateway Account ID.
* Your AI Gateway gateway name.
* An active DeepSeek AI API token.
* The name of the DeepSeek AI model you want to use.

## URL structure

Your new base URL will use the data above in this structure:

`https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/deepseek/`.

You can then append the endpoint you want to hit, for example: `chat/completions`.

So your final URL will come together as:

`https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/deepseek/chat/completions`.

## Examples

### cURL

Example fetch request

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/deepseek/chat/completions \

 --header 'content-type: application/json' \

 --header 'Authorization: Bearer DEEPSEEK_TOKEN' \

 --data '{

    "model": "deepseek-chat",

    "messages": [

        {

            "role": "user",

            "content": "What is Cloudflare?"

        }

    ]

}'


```

Explain Code

### Use DeepSeek with JavaScript

If you are using the OpenAI SDK, you can set your endpoint like this:

JavaScript

```

import OpenAI from "openai";


const openai = new OpenAI({

  apiKey: env.DEEPSEEK_TOKEN,

  baseURL:

    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/deepseek",

});


try {

  const chatCompletion = await openai.chat.completions.create({

    model: "deepseek-chat",

    messages: [{ role: "user", content: "What is Cloudflare?" }],

  });


  const response = chatCompletion.choices[0].message;


  return new Response(JSON.stringify(response));

} catch (e) {

  return new Response(e);

}


```

Explain Code

## OpenAI-Compatible Endpoint

You can also use the [OpenAI-compatible endpoint](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/) (`/ai-gateway/usage/chat-completion/`) to access DeepSeek models using the OpenAI API schema. To do so, send your requests to:

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions


```

Specify:

```

{

"model": "deepseek/{model}"

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/usage/","name":"Using AI Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/usage/providers/","name":"Provider Native"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/usage/providers/deepseek/","name":"DeepSeek"}}]}
```
