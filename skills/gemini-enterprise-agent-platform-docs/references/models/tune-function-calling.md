[Function calling](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/function-calling)
lets you create Gemini-based applications and agents
that can interact with real-time information and services like databases,
customer relationship management systems, and document repositories. This
enhances your application's ability to provide relevant and contextual
responses.

With supervised fine-tuning, you can use
[your own tuning dataset](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-supervised-tuning-prepare)
to improve the overall accuracy of your application's function calling-based
responses.

## Tuning dataset format

The `fileUri` for your fine-tuning dataset can be the URI for a file in a
Cloud Storage bucket, or it can be a publicly available HTTP or HTTPS URL.

To see the generic format example, see the
[dataset example for Gemini](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-supervised-tuning-prepare#dataset-example).

The following sections present examples of function calling datasets for use
in creating a tuning job for function calling.

### Tuning function calling to generate text

The following is an example of a dataset for tuning
[function calling to generate a single text response](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/function-calling#text-samples).

    {
      "system_instruction": {
        "role": "system",
        "parts": [
          {
            "text": "You are an assistant that helps users find the best product for them."
          }
        ]
      },
      "contents": [
        {
          "role": "user",
          "parts": [
            {
              "text": "Do you have the White Pixel 8 Pro 128GB in stock in the US?"
            }
          ]
        },
        {
          "role": "model",
          "parts": [
            {
              "functionCall": {
                "name": "get_product_sku",
                "args": {
                  "product_name": "Pixel 8 Pro 128GB"
                }
              }
            }
          ]
        }
      ],
      "tools": [
        {
          "functionDeclarations": [
            {
              "name": "get_product_sku",
              "description": "Get the available inventory for a Google products, e.g: Pixel phones, Pixel Watches, Google Home etc",
              "parameters": {
                "type": "OBJECT",
                "properties": {
                  "product_name": {
                    "type": "STRING",
                    "description": "Product name",
                    "enum": [
                      "Pixel 8 Pro 128GB",
                      "Pixel 8 Pro 256GB",
                      "Pixel 8 Pro 512GB",
                      "Pixel 8 Pro 1TB"
                    ]
                  }
                }
              }
            },
            {
              "name": "get_store_location",
              "description": "Get the location of the closest store",
              "parameters": {
                "type": "OBJECT",
                "properties": {
                  "location": {
                    "type": "STRING",
                    "description": "Location"
                  }
                }
              }
            }
          ]
        }
      ]
    }

### Tuning function calling to support a chat session

The following is an example of a dataset for tuning
[function calling to support a chat session](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/function-calling#chat-samples).

    {
      "system_instruction": {
        "role": "system",
        "parts": [
          {
            "text": "You are an assistant that helps users find the best product for them."
          }
        ]
      },
      "contents": [
        {
          "role": "user",
          "parts": [
            {
              "text": "Do you have the Porcelain Pixel 8 Pro 128GB in stock in the US?"
            }
          ]
        },
        {
          "role": "model",
          "parts": [
            {
              "functionCall": {
                "name": "get_product_sku",
                "args": {
                  "product_name": "Pixel 8 Pro 128GB"
                }
              }
            }
          ]
        },
        {
          "parts": [
            {
              "functionResponse": {
                "name": "get_product_sku",
                "response": {
                  "output": "True"
                }
              }
            }
          ]
        },
        {
          "role": "model",
          "parts": [
            {
              "text": "Yes, we have the Porcelain Pixel 8 Pro 128GB in stock in the US."
            }
          ]
        }
      ],
      "tools": [
        {
          "functionDeclarations": [
            {
              "name": "get_product_sku",
              "description": "Get the available inventory for a Google products, e.g: Pixel phones, Pixel Watches, Google Home etc",
              "parameters": {
                "type": "OBJECT",
                "properties": {
                  "product_name": {
                    "type": "STRING",
                    "description": "Product name",
                    "enum": [
                      "Pixel 8 Pro 128GB",
                      "Pixel 8 Pro 256GB",
                      "Pixel 8 Pro 512GB",
                      "Pixel 8 Pro 1TB"
                    ]
                  }
                }
              }
            },
            {
              "name": "get_store_location",
              "description": "Get the location of the closest store",
              "parameters": {
                "type": "OBJECT",
                "properties": {
                  "location": {
                    "type": "STRING",
                    "description": "Location"
                  }
                }
              }
            }
          ]
        }
      ]
    }

### Tuning parallel function calling

The following is an example of a dataset for tuning
[parallel function calling](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/samples/generativeaionvertexai-function-calling-generate-parallel-calls).

    {
      "system_instruction": {
        "role": "system",
        "parts": [
          {
            "text": "You are an assistant that helps users find the best product for them."
          }
        ]
      },
      "contents": [
        {
          "role": "user",
          "parts": [
            {
              "text": "Where is the closest Google Store to Mountain View, CA that has Pixel 8 Pro 128GB in stock?"
            }
          ]
        },
        {
          "role": "model",
          "parts": [
            {
              "functionCall": {
                "name": "get_product_sku",
                "args": {
                  "product_name": "Pixel 8 Pro 128GB"
                }
              }
            },
            {
              "functionCall": {
                "name": "get_store_location",
                "args": {
                  "location": "Mountain View, CA"
                }
              }
            }
          ]
        }
      ],
      "tools": [
        {
          "functionDeclarations": [
            {
              "name": "get_product_sku",
              "description": "Get the available inventory for a Google products, e.g: Pixel phones, Pixel Watches, Google Home etc",
              "parameters": {
                "type": "OBJECT",
                "properties": {
                  "product_name": {
                    "type": "STRING",
                    "description": "Product name",
                    "enum": [
                      "Pixel 8 Pro 128GB",
                      "Pixel 8 Pro 256GB",
                      "Pixel 8 Pro 512GB",
                      "Pixel 8 Pro 1TB"
                    ]
                  }
                }
              }
            },
            {
              "name": "get_store_location",
              "description": "Get the location of the closest store",
              "parameters": {
                "type": "OBJECT",
                "properties": {
                  "location": {
                    "type": "STRING",
                    "description": "Location"
                  }
                }
              }
            }
          ]
        }
      ]
    }

## What's next

- To learn how to create a tuning job and how to test the tuned model, see [Tune Gemini models by using supervised fine-tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-use-supervised-tuning).
- To learn about Gemini model tuning, see [Introduction to tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tune-models).
- To learn about function calling, see [Introduction to function calling](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/function-calling).
