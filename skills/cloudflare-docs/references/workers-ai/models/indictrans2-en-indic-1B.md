---
title: indictrans2-en-indic-1B
description: IndicTrans2 is the first open-source transformer-based multilingual NMT model that supports high-quality translations across all the 22 scheduled Indic languages
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

 a 

#  indictrans2-en-indic-1B 

Translation • ai4bharat • Hosted 

`@cf/ai4bharat/indictrans2-en-indic-1B` 

IndicTrans2 is the first open-source transformer-based multilingual NMT model that supports high-quality translations across all the 22 scheduled Indic languages

| Model Info   |                                                     |
| ------------ | --------------------------------------------------- |
| Unit Pricing | $0.34 per M input tokens, $0.34 per M output tokens |

## Usage

* [  TypeScript ](#tab-panel-3206)
* [  Python ](#tab-panel-3207)
* [  curl ](#tab-panel-3208)

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

Explain Code

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

Explain Code

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/ai4bharat/indictrans2-en-indic-1B  \

    -X POST  \

    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \

    -d '{ "text": "Ill have an order of the moule frites", "source_lang": "english", "target_lang": "french" }'


```

## Parameters

* [ Input ](#tab-panel-3211)
* [ Output ](#tab-panel-3212)

▶text

`one of`required

target\_language

`string`requireddefault: hin\_Devaenum: asm\_Beng, awa\_Deva, ben\_Beng, bho\_Deva, brx\_Deva, doi\_Deva, eng\_Latn, gom\_Deva, gon\_Deva, guj\_Gujr, hin\_Deva, hne\_Deva, kan\_Knda, kas\_Arab, kas\_Deva, kha\_Latn, lus\_Latn, mag\_Deva, mai\_Deva, mal\_Mlym, mar\_Deva, mni\_Beng, mni\_Mtei, npi\_Deva, ory\_Orya, pan\_Guru, san\_Deva, sat\_Olck, snd\_Arab, snd\_Deva, tam\_Taml, tel\_Telu, urd\_Arab, unr\_DevaTarget langauge to translate to

▶translations\[\]

`array`Translated texts

## API Schemas

* [ Input ](#tab-panel-3209)
* [ Output ](#tab-panel-3210)

```

{

  "type": "object",

  "properties": {

    "text": {

      "oneOf": [

        {

          "type": "string"

        },

        {

          "type": "array",

          "items": {

            "type": "string"

          }

        }

      ],

      "description": "Input text to translate. Can be a single string or a list of strings."

    },

    "target_language": {

      "type": "string",

      "enum": [

        "asm_Beng",

        "awa_Deva",

        "ben_Beng",

        "bho_Deva",

        "brx_Deva",

        "doi_Deva",

        "eng_Latn",

        "gom_Deva",

        "gon_Deva",

        "guj_Gujr",

        "hin_Deva",

        "hne_Deva",

        "kan_Knda",

        "kas_Arab",

        "kas_Deva",

        "kha_Latn",

        "lus_Latn",

        "mag_Deva",

        "mai_Deva",

        "mal_Mlym",

        "mar_Deva",

        "mni_Beng",

        "mni_Mtei",

        "npi_Deva",

        "ory_Orya",

        "pan_Guru",

        "san_Deva",

        "sat_Olck",

        "snd_Arab",

        "snd_Deva",

        "tam_Taml",

        "tel_Telu",

        "urd_Arab",

        "unr_Deva"

      ],

      "default": "hin_Deva",

      "description": "Target langauge to translate to"

    }

  },

  "required": [

    "text",

    "target_language"

  ]

}


```

Explain Code

```

{

  "type": "object",

  "properties": {

    "translations": {

      "type": "array",

      "items": {

        "type": "string"

      },

      "description": "Translated texts"

    }

  },

  "required": [

    "translations"

  ]

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
