---
title: detr-resnet-50
description: DEtection TRansformer (DETR) model trained end-to-end on COCO 2017 object detection (118k annotated images).
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

 f 

#  detr-resnet-50 Beta 

Object Detection • facebook 

@cf/facebook/detr-resnet-50 

DEtection TRansformer (DETR) model trained end-to-end on COCO 2017 object detection (118k annotated images).

| Model Info   |                                  |
| ------------ | -------------------------------- |
| Beta         | Yes                              |
| Unit Pricing | $0.0000075 per inference request |

## Usage

* [  TypeScript ](#tab-panel-1681)
* [  curl ](#tab-panel-1682)

```

export interface Env {

  AI: Ai;

}


export default {

  async fetch(request, env): Promise<Response> {

    const res = await fetch("https://cataas.com/cat");

    const blob = await res.arrayBuffer();


    const inputs = {

      image: [...new Uint8Array(blob)],

    };


    const response = await env.AI.run(

      "@cf/facebook/detr-resnet-50",

      inputs

    );


    return new Response(JSON.stringify({ inputs: { image: [] }, response }));

  },

} satisfies ExportedHandler<Env>;


```

Explain Code

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/facebook/detr-resnet-50  \

    -X POST  \

    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \

    --data-binary "@pedestrian-boulevard-manhattan-crossing.jpg"


```

## Parameters

\* indicates a required field

### Input

* `0` ` string `  
The image to use for detection
* `1` ` object `  
   * `image` ` array `  
   An array of integers that represent the image data constrained to 8-bit unsigned integer values  
         * `items` ` number `  
         A value between 0 and 255 (unsigned 8bit)

### Output

* `items` ` object `  
   * `score` ` number `  
   Confidence score indicating the likelihood that the detection is correct  
   * `label` ` string `  
   The class label or name of the detected object  
   * `box` ` object `  
   Coordinates defining the bounding box around the detected object  
         * `xmin` ` number `  
         The x-coordinate of the top-left corner of the bounding box  
         * `ymin` ` number `  
         The y-coordinate of the top-left corner of the bounding box  
         * `xmax` ` number `  
         The x-coordinate of the bottom-right corner of the bounding box  
         * `ymax` ` number `  
         The y-coordinate of the bottom-right corner of the bounding box

## API Schemas

The following schemas are based on JSON Schema

* [ Input ](#tab-panel-1683)
* [ Output ](#tab-panel-1684)

```

{

    "oneOf": [

        {

            "type": "string",

            "format": "binary",

            "description": "The image to use for detection"

        },

        {

            "type": "object",

            "properties": {

                "image": {

                    "type": "array",

                    "description": "An array of integers that represent the image data constrained to 8-bit unsigned integer values",

                    "items": {

                        "type": "number",

                        "description": "A value between 0 and 255 (unsigned 8bit)"

                    }

                }

            }

        }

    ]

}


```

Explain Code

```

{

    "type": "array",

    "contentType": "application/json",

    "description": "An array of detected objects within the input image",

    "items": {

        "type": "object",

        "properties": {

            "score": {

                "type": "number",

                "description": "Confidence score indicating the likelihood that the detection is correct"

            },

            "label": {

                "type": "string",

                "description": "The class label or name of the detected object"

            },

            "box": {

                "type": "object",

                "description": "Coordinates defining the bounding box around the detected object",

                "properties": {

                    "xmin": {

                        "type": "number",

                        "description": "The x-coordinate of the top-left corner of the bounding box"

                    },

                    "ymin": {

                        "type": "number",

                        "description": "The y-coordinate of the top-left corner of the bounding box"

                    },

                    "xmax": {

                        "type": "number",

                        "description": "The x-coordinate of the bottom-right corner of the bounding box"

                    },

                    "ymax": {

                        "type": "number",

                        "description": "The y-coordinate of the bottom-right corner of the bounding box"

                    }

                }

            }

        }

    }

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
