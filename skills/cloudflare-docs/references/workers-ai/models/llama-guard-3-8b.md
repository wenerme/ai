---
title: llama-guard-3-8b
description: Llama Guard 3 is a Llama-3.1-8B pretrained model, fine-tuned for content safety classification. Similar to previous versions, it can be used to classify content in both LLM inputs (prompt classification) and in LLM responses (response classification). It acts as an LLM – it generates text in its output that indicates whether a given prompt or response is safe or unsafe, and if unsafe, it also lists the content categories violated.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Meta logo](https://developers.cloudflare.com/_astro/meta.BR4nfp35.svg) 

#  llama-guard-3-8b 

Text Generation • Meta • Hosted 

`@cf/meta/llama-guard-3-8b` 

Llama Guard 3 is a Llama-3.1-8B pretrained model, fine-tuned for content safety classification. Similar to previous versions, it can be used to classify content in both LLM inputs (prompt classification) and in LLM responses (response classification). It acts as an LLM – it generates text in its output that indicates whether a given prompt or response is safe or unsafe, and if unsafe, it also lists the content categories violated.

| Model Info                                                                 |                                                     |
| -------------------------------------------------------------------------- | --------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 131,072 tokens                                      |
| LoRA                                                                       | Yes                                                 |
| Unit Pricing                                                               | $0.48 per M input tokens, $0.03 per M output tokens |

## Playground

Try out this model with Workers AI LLM Playground. It does not require any setup or authentication and an instant way to preview and test a model directly in the browser.

[Launch the LLM Playground](https://playground.ai.cloudflare.com/?model=@cf/meta/llama-guard-3-8b) 

## Usage

* [  TypeScript ](#tab-panel-2711)
* [  Python ](#tab-panel-2712)
* [  curl ](#tab-panel-2713)

```

export interface Env {

  AI: Ai;

}


export default {

  async fetch(request, env): Promise<Response> {

    const messages = [

      {

        role: 'user',

        content: 'I wanna bully someone online',

      },

      {

        role: 'assistant',

        content: 'That sounds interesting, how can I help?',

      },

    ];

    const response = await env.AI.run("@cf/meta/llama-guard-3-8b", { messages });


    return Response.json(response);

  },

} satisfies ExportedHandler<Env>;


```

Explain Code

```

import os

import requests


ACCOUNT_ID = "your-account-id"

AUTH_TOKEN = os.environ.get("CLOUDFLARE_AUTH_TOKEN")


response = requests.post(

  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/meta/llama-guard-3-8b",

    headers={"Authorization": f"Bearer {AUTH_TOKEN}"},

    json={

      "messages": [

        {"role": "user", "content": "I want to bully somebody online"},

        {"role": "assistant", "content": "Interesting. Let me know how I can be of assistance?"},

      ]

    }

)

result = response.json()

print(result)


```

Explain Code

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/meta/llama-guard-3-8b \

  -X POST \

  -H "Authorization: Bearer $CLOUDFLARE_AUTH_TOKEN" \

  -d '{ "messages": [{ "role": "user", "content": "I want to bully someone online" }, {"role": "assistant", "content": "Interesting. How can I assist you?"}]}'


```

## Parameters

* [ Input ](#tab-panel-2714)
* [ Output ](#tab-panel-2715)

▶messages\[\]

`array`requiredAn array of message objects representing the conversation history.

max\_tokens

`integer`default: 256The maximum number of tokens to generate in the response.

temperature

`number`default: 0.6minimum: 0maximum: 5Controls the randomness of the output; higher values produce more random results.

▶response\_format{}

`object`Dictate the output format of the generated response.

▶response

`one of`

▶usage{}

`object`Usage statistics for the inference request

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
