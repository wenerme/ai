---
title: melotts
description: MeloTTS is a high-quality multi-lingual text-to-speech library by MyShell.ai.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

![MyShell logo](https://developers.cloudflare.com/_astro/myshell.BpTDMxd2.svg) 

#  melotts 

Text-to-Speech • MyShell • Hosted 

`@cf/myshell-ai/melotts` 

MeloTTS is a high-quality multi-lingual text-to-speech library by MyShell.ai.

| Model Info   |                          |
| ------------ | ------------------------ |
| Unit Pricing | $0.0002 per audio minute |

## Usage

TypeScript

```

export interface Env {

  AI: Ai;

}


export default {

  async fetch(request, env): Promise<Response> {

    const { audio } = await env.AI.run('@cf/myshell-ai/melotts', {

      prompt: 'Hello world',

      lang: 'en',

    });

    // Returns the base64 encoded MP3 audio

    return Response.json({ audio });

  },

} satisfies ExportedHandler<Env>;


```

Explain Code

## Parameters

* [ Input ](#tab-panel-3679)
* [ Output ](#tab-panel-3680)

prompt

`string`requiredminLength: 1A text description of the audio you want to generate

lang

`string`default: enThe speech language (e.g., 'en' for English, 'fr' for French). Defaults to 'en' if not specified

▶Option 1{}

objectcontentType: application/json

Option 2

stringcontentType: audio/mpegformat: binary

The generated audio in MP3 format

## API Schemas

* [ Input ](#tab-panel-3677)
* [ Output ](#tab-panel-3678)

```

{

  "type": "object",

  "properties": {

    "prompt": {

      "type": "string",

      "minLength": 1,

      "description": "A text description of the audio you want to generate"

    },

    "lang": {

      "type": "string",

      "default": "en",

      "description": "The speech language (e.g., 'en' for English, 'fr' for French). Defaults to 'en' if not specified"

    }

  },

  "required": [

    "prompt"

  ]

}


```

Explain Code

```

{

  "oneOf": [

    {

      "type": "object",

      "contentType": "application/json",

      "properties": {

        "audio": {

          "type": "string",

          "description": "The generated audio in MP3 format, base64-encoded"

        }

      }

    },

    {

      "type": "string",

      "contentType": "audio/mpeg",

      "format": "binary",

      "description": "The generated audio in MP3 format"

    }

  ]

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
