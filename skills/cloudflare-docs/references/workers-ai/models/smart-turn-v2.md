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

 p 

#  smart-turn-v2 

Voice Activity Detection • pipecat-ai 

@cf/pipecat-ai/smart-turn-v2 

An open source, community-driven, native audio turn detection model in 2nd version

| Model Info   |                           |
| ------------ | ------------------------- |
| Batch        | Yes                       |
| Real-time    | Yes                       |
| Unit Pricing | $0.00034 per audio minute |

## Parameters

\* indicates a required field

### Input

* `0` ` object `  
   * `audio` ` object ` required  
   readable stream with audio data and content-type specified for that data  
         * `body` ` object ` required  
         * `contentType` ` string ` required  
   * `dtype` ` string `  
   type of data PCM data that's sent to the inference server as raw array
* `1` ` object `  
   * `audio` ` string ` required  
   base64 encoded audio data  
   * `dtype` ` string `  
   type of data PCM data that's sent to the inference server as raw array

### Output

* `is_complete` ` boolean `  
if true, end-of-turn was detected
* `probability` ` number `  
probability of the end-of-turn detection

## API Schemas

The following schemas are based on JSON Schema

* [ Input ](#tab-panel-2033)
* [ Output ](#tab-panel-2034)

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
