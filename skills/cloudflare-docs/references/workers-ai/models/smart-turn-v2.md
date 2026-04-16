---
title: smart-turn-v2
description: An open source, community-driven, native audio turn detection model in 2nd version
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![Pipecat logo](https://developers.cloudflare.com/_astro/pipecat.B-PNBdef.svg) 

#  smart-turn-v2 

Voice Activity Detection • Pipecat • Hosted 

`@cf/pipecat-ai/smart-turn-v2` 

An open source, community-driven, native audio turn detection model in 2nd version

| Model Info   |                           |
| ------------ | ------------------------- |
| Batch        | Yes                       |
| Real-time    | Yes                       |
| Unit Pricing | $0.00034 per audio minute |

## Parameters

* [ Input ](#tab-panel-3723)
* [ Output ](#tab-panel-3724)

▶Option 1{}

object

▶Option 2{}

object

is\_complete

`boolean`if true, end-of-turn was detected

probability

`number`probability of the end-of-turn detection

## API Schemas

* [ Input ](#tab-panel-3721)
* [ Output ](#tab-panel-3722)

```

{

  "type": "object",

  "oneOf": [

    {

      "properties": {

        "audio": {

          "type": "object",

          "description": "readable stream with audio data and content-type specified for that data",

          "properties": {

            "body": {

              "type": "object"

            },

            "contentType": {

              "type": "string"

            }

          },

          "required": [

            "body",

            "contentType"

          ]

        },

        "dtype": {

          "type": "string",

          "description": "type of data PCM data that's sent to the inference server as raw array",

          "enum": [

            "uint8",

            "float32",

            "float64"

          ]

        }

      },

      "required": [

        "audio"

      ]

    },

    {

      "properties": {

        "audio": {

          "type": "string",

          "description": "base64 encoded audio data"

        },

        "dtype": {

          "type": "string",

          "description": "type of data PCM data that's sent to the inference server as raw array",

          "enum": [

            "uint8",

            "float32",

            "float64"

          ]

        }

      },

      "required": [

        "audio"

      ]

    }

  ]

}


```

Explain Code

```

{

  "type": "object",

  "contentType": "application/json",

  "properties": {

    "is_complete": {

      "type": "boolean",

      "description": "if true, end-of-turn was detected"

    },

    "probability": {

      "type": "number",

      "description": "probability of the end-of-turn detection"

    }

  }

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
