---
title: indictrans2-en-indic-1B
description: IndicTrans2 is the first open-source transformer-based multilingual NMT model that supports high-quality translations across all the 22 scheduled Indic languages
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

 a 

#  indictrans2-en-indic-1B 

Translation • ai4bharat • Hosted 

`@cf/ai4bharat/indictrans2-en-indic-1B` 

IndicTrans2 is the first open-source transformer-based multilingual NMT model that supports high-quality translations across all the 22 scheduled Indic languages

| Model Info   |                                                     |
| ------------ | --------------------------------------------------- |
| Unit Pricing | $0.34 per M input tokens, $0.34 per M output tokens |

## Usage

* [  TypeScript ](#tab-panel-2610)
* [  Python ](#tab-panel-2611)
* [  curl ](#tab-panel-2612)

```

export interface Env {

  AI: Ai;

}


export default {

  async fetch(request, env): Promise<Response> {


    const response = await env.AI.run(

      "@cf/ai4bharat/indictrans2-en-indic-1B",

      {

        text: "I'll have an order of the moule frites",

        source_lang: "english", // defaults to english

        target_lang: "french",

      }

    );


    return new Response(JSON.stringify(response));

  },

} satisfies ExportedHandler<Env>;


```

```

import requests


API_BASE_URL = "https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/"

headers = {"Authorization": "Bearer {API_TOKEN}"}


def run(model, input):

    response = requests.post(f"{API_BASE_URL}{model}", headers=headers, json=input)

    return response.json()


output = run('@cf/ai4bharat/indictrans2-en-indic-1B', {

  "text": "I'll have an order of the moule frites",

  "source_lang": "english",

  "target_lang": "french"

})


print(output)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/ai4bharat/indictrans2-en-indic-1B  \

    -X POST  \

    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \

    -d '{ "text": "Ill have an order of the moule frites", "source_lang": "english", "target_lang": "french" }'


```

## Parameters

* [ Input ](#tab-panel-2613)
* [ Output ](#tab-panel-2614)

▶text

`one of`required

target\_language

`string`requireddefault: hin\_Devaenum: asm\_Beng, awa\_Deva, ben\_Beng, bho\_Deva, brx\_Deva, doi\_Deva, eng\_Latn, gom\_Deva, gon\_Deva, guj\_Gujr, hin\_Deva, hne\_Deva, kan\_Knda, kas\_Arab, kas\_Deva, kha\_Latn, lus\_Latn, mag\_Deva, mai\_Deva, mal\_Mlym, mar\_Deva, mni\_Beng, mni\_Mtei, npi\_Deva, ory\_Orya, pan\_Guru, san\_Deva, sat\_Olck, snd\_Arab, snd\_Deva, tam\_Taml, tel\_Telu, urd\_Arab, unr\_DevaTarget langauge to translate to

▶translations\[\]

`array`Translated texts

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
