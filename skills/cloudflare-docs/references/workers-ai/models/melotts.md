---
title: melotts
description: MeloTTS is a high-quality multi-lingual text-to-speech library by MyShell.ai.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

 m 

#  melotts 

Text-to-Speech • myshell-ai 

@cf/myshell-ai/melotts 

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

\* indicates a required field

### Input

* `prompt` ` string ` required min 1  
A text description of the audio you want to generate
* `lang` ` string ` default en  
The speech language (e.g., 'en' for English, 'fr' for French). Defaults to 'en' if not specified

### Output

* `0` ` object `  
   * `audio` ` string `  
   The generated audio in MP3 format, base64-encoded
* `1` ` string `  
The generated audio in MP3 format

## API Schemas

The following schemas are based on JSON Schema

* [ Input ](#tab-panel-1923)
* [ Output ](#tab-panel-1924)

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
