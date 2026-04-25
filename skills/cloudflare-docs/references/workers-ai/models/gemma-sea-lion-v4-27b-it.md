---
title: gemma-sea-lion-v4-27b-it
description: SEA-LION stands for Southeast Asian Languages In One Network, which is a collection of Large Language Models (LLMs) which have been pretrained and instruct-tuned for the Southeast Asia (SEA) region.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

 a 

#  gemma-sea-lion-v4-27b-it 

Text Generation • aisingapore • Hosted 

`@cf/aisingapore/gemma-sea-lion-v4-27b-it` 

SEA-LION stands for Southeast Asian Languages In One Network, which is a collection of Large Language Models (LLMs) which have been pretrained and instruct-tuned for the Southeast Asia (SEA) region.

| Model Info                                                                 |                                                     |
| -------------------------------------------------------------------------- | --------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 128,000 tokens                                      |
| Unit Pricing                                                               | $0.35 per M input tokens, $0.56 per M output tokens |

## Playground

Try out this model with Workers AI LLM Playground. It does not require any setup or authentication and an instant way to preview and test a model directly in the browser.

[Launch the LLM Playground](https://playground.ai.cloudflare.com/?model=@cf/aisingapore/gemma-sea-lion-v4-27b-it) 

## Usage

* [  Worker (Streaming) ](#tab-panel-3326)
* [  TypeScript ](#tab-panel-3327)
* [  Python ](#tab-panel-3328)
* [  curl ](#tab-panel-3329)

TypeScript

```

export interface Env {

  AI: Ai;

}


export default {

  async fetch(request, env): Promise<Response> {


    const messages = [

      { role: "system", content: "You are a friendly assistant" },

      {

        role: "user",

        content: "What is the origin of the phrase Hello, World",

      },

    ];


    const stream = await env.AI.run("@cf/aisingapore/gemma-sea-lion-v4-27b-it", {

      messages,

      stream: true,

    });


    return new Response(stream, {

      headers: { "content-type": "text/event-stream" },

    });

  },

} satisfies ExportedHandler<Env>;


```

Explain Code

```

export interface Env {

  AI: Ai;

}


export default {

  async fetch(request, env): Promise<Response> {


    const messages = [

      { role: "system", content: "You are a friendly assistant" },

      {

        role: "user",

        content: "What is the origin of the phrase Hello, World",

      },

    ];

    const response = await env.AI.run("@cf/aisingapore/gemma-sea-lion-v4-27b-it", { messages });


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


prompt = "Tell me all about PEP-8"

response = requests.post(

  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/aisingapore/gemma-sea-lion-v4-27b-it",

    headers={"Authorization": f"Bearer {AUTH_TOKEN}"},

    json={

      "messages": [

        {"role": "system", "content": "You are a friendly assistant"},

        {"role": "user", "content": prompt}

      ]

    }

)

result = response.json()

print(result)


```

Explain Code

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/aisingapore/gemma-sea-lion-v4-27b-it \

  -X POST \

  -H "Authorization: Bearer $CLOUDFLARE_AUTH_TOKEN" \

  -d '{ "messages": [{ "role": "system", "content": "You are a friendly assistant" }, { "role": "user", "content": "Why is pizza so good" }]}'


```

OpenAI compatible endpoints 

Workers AI also supports OpenAI compatible API endpoints for `/v1/chat/completions` and `/v1/embeddings`. For more details, refer to [Configurations](https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/).

## Parameters

Synchronous — Send a request and receive a complete response 

* [ Input ](#tab-panel-3336)
* [ Output ](#tab-panel-3337)

prompt

`string`requiredminLength: 1The input text prompt for the model to generate a response.

lora

`string`Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model.

▶response\_format{}

`object`

raw

`boolean`default: falseIf true, a chat template is not applied and you must adhere to the specific model's expected formatting.

stream

`boolean`default: falseIf true, the response will be streamed back incrementally using SSE, Server Sent Events.

max\_tokens

`integer`default: 2000The maximum number of tokens to generate in the response.

temperature

`number`default: 0.6minimum: 0maximum: 5Controls the randomness of the output; higher values produce more random results.

top\_p

`number`minimum: 0.001maximum: 1Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.

top\_k

`integer`minimum: 1maximum: 50Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.

seed

`integer`minimum: 1maximum: 9999999999Random seed for reproducibility of the generation.

repetition\_penalty

`number`minimum: 0maximum: 2Penalty for repeated tokens; higher values discourage repetition.

frequency\_penalty

`number`minimum: \-2maximum: 2Decreases the likelihood of the model repeating the same lines verbatim.

presence\_penalty

`number`minimum: \-2maximum: 2Increases the likelihood of the model introducing new topics.

id

`string`Unique identifier for the completion

object

`string`enum: chat.completionObject type identifier

created

`number`Unix timestamp of when the completion was created

model

`string`Model used for the completion

▶choices\[\]

`array`List of completion choices

▶usage{}

`object`Usage statistics for the inference request

prompt\_logprobs{}

`object`Log probabilities for the prompt (if requested)

Streaming — Send a request with \`stream: true\` and receive server-sent events 

* [ Input ](#tab-panel-3338)
* [ Output ](#tab-panel-3339)

prompt

`string`requiredminLength: 1The input text prompt for the model to generate a response.

lora

`string`Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model.

▶response\_format{}

`object`

raw

`boolean`default: falseIf true, a chat template is not applied and you must adhere to the specific model's expected formatting.

stream

`boolean`default: falseIf true, the response will be streamed back incrementally using SSE, Server Sent Events.

max\_tokens

`integer`default: 2000The maximum number of tokens to generate in the response.

temperature

`number`default: 0.6minimum: 0maximum: 5Controls the randomness of the output; higher values produce more random results.

top\_p

`number`minimum: 0.001maximum: 1Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.

top\_k

`integer`minimum: 1maximum: 50Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.

seed

`integer`minimum: 1maximum: 9999999999Random seed for reproducibility of the generation.

repetition\_penalty

`number`minimum: 0maximum: 2Penalty for repeated tokens; higher values discourage repetition.

frequency\_penalty

`number`minimum: \-2maximum: 2Decreases the likelihood of the model repeating the same lines verbatim.

presence\_penalty

`number`minimum: \-2maximum: 2Increases the likelihood of the model introducing new topics.

type

`string`

contentType

`text/event-stream`

format

`binary`

Batch — Send multiple requests in a single API call 

* [ Input ](#tab-panel-3340)
* [ Output ](#tab-panel-3341)

▶requests\[\]

`array`required

id

`string`Unique identifier for the completion

object

`string`enum: chat.completionObject type identifier

created

`number`Unix timestamp of when the completion was created

model

`string`Model used for the completion

▶choices\[\]

`array`List of completion choices

▶usage{}

`object`Usage statistics for the inference request

prompt\_logprobs{}

`object`Log probabilities for the prompt (if requested)

## API Schemas (Raw)

Synchronous — Send a request and receive a complete response 

* [ Input ](#tab-panel-3332)
* [ Output ](#tab-panel-3333)

```

{

  "title": "Prompt",

  "properties": {

    "prompt": {

      "type": "string",

      "minLength": 1,

      "description": "The input text prompt for the model to generate a response."

    },

    "lora": {

      "type": "string",

      "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."

    },

    "response_format": {

      "title": "JSON Mode",

      "type": "object",

      "properties": {

        "type": {

          "type": "string",

          "enum": [

            "json_object",

            "json_schema"

          ]

        },

        "json_schema": {}

      }

    },

    "raw": {

      "type": "boolean",

      "default": false,

      "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."

    },

    "stream": {

      "type": "boolean",

      "default": false,

      "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."

    },

    "max_tokens": {

      "type": "integer",

      "default": 2000,

      "description": "The maximum number of tokens to generate in the response."

    },

    "temperature": {

      "type": "number",

      "default": 0.6,

      "minimum": 0,

      "maximum": 5,

      "description": "Controls the randomness of the output; higher values produce more random results."

    },

    "top_p": {

      "type": "number",

      "minimum": 0.001,

      "maximum": 1,

      "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."

    },

    "top_k": {

      "type": "integer",

      "minimum": 1,

      "maximum": 50,

      "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."

    },

    "seed": {

      "type": "integer",

      "minimum": 1,

      "maximum": 9999999999,

      "description": "Random seed for reproducibility of the generation."

    },

    "repetition_penalty": {

      "type": "number",

      "minimum": 0,

      "maximum": 2,

      "description": "Penalty for repeated tokens; higher values discourage repetition."

    },

    "frequency_penalty": {

      "type": "number",

      "minimum": -2,

      "maximum": 2,

      "description": "Decreases the likelihood of the model repeating the same lines verbatim."

    },

    "presence_penalty": {

      "type": "number",

      "minimum": -2,

      "maximum": 2,

      "description": "Increases the likelihood of the model introducing new topics."

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

  "type": "object",

  "contentType": "application/json",

  "title": "Chat Completion Response",

  "properties": {

    "id": {

      "type": "string",

      "description": "Unique identifier for the completion"

    },

    "object": {

      "type": "string",

      "enum": [

        "chat.completion"

      ],

      "description": "Object type identifier"

    },

    "created": {

      "type": "number",

      "description": "Unix timestamp of when the completion was created"

    },

    "model": {

      "type": "string",

      "description": "Model used for the completion"

    },

    "choices": {

      "type": "array",

      "description": "List of completion choices",

      "items": {

        "type": "object",

        "properties": {

          "index": {

            "type": "number",

            "description": "Index of the choice in the list"

          },

          "message": {

            "type": "object",

            "description": "The message generated by the model",

            "properties": {

              "role": {

                "type": "string",

                "description": "Role of the message author"

              },

              "content": {

                "type": "string",

                "description": "The content of the message"

              },

              "reasoning_content": {

                "type": "string",

                "description": "Internal reasoning content (if available)"

              },

              "tool_calls": {

                "type": "array",

                "description": "Tool calls made by the assistant",

                "items": {

                  "type": "object",

                  "properties": {

                    "id": {

                      "type": "string",

                      "description": "Unique identifier for the tool call"

                    },

                    "type": {

                      "type": "string",

                      "enum": [

                        "function"

                      ],

                      "description": "Type of tool call"

                    },

                    "function": {

                      "type": "object",

                      "properties": {

                        "name": {

                          "type": "string",

                          "description": "Name of the function to call"

                        },

                        "arguments": {

                          "type": "string",

                          "description": "JSON string of arguments for the function"

                        }

                      },

                      "required": [

                        "name",

                        "arguments"

                      ]

                    }

                  },

                  "required": [

                    "id",

                    "type",

                    "function"

                  ]

                }

              }

            },

            "required": [

              "role",

              "content"

            ]

          },

          "finish_reason": {

            "type": "string",

            "description": "Reason why the model stopped generating"

          },

          "stop_reason": {

            "type": [

              "string",

              "null"

            ],

            "description": "Stop reason (may be null)"

          },

          "logprobs": {

            "type": [

              "object",

              "null"

            ],

            "description": "Log probabilities (if requested)"

          }

        }

      }

    },

    "usage": {

      "type": "object",

      "description": "Usage statistics for the inference request",

      "properties": {

        "prompt_tokens": {

          "type": "number",

          "description": "Total number of tokens in input",

          "default": 0

        },

        "completion_tokens": {

          "type": "number",

          "description": "Total number of tokens in output",

          "default": 0

        },

        "total_tokens": {

          "type": "number",

          "description": "Total number of input and output tokens",

          "default": 0

        }

      }

    },

    "prompt_logprobs": {

      "type": [

        "object",

        "null"

      ],

      "description": "Log probabilities for the prompt (if requested)"

    }

  }

}


```

Explain Code

Streaming — Send a request with \`stream: true\` and receive server-sent events 

* [ Input ](#tab-panel-3330)
* [ Output ](#tab-panel-3331)

```

{

  "title": "Prompt",

  "properties": {

    "prompt": {

      "type": "string",

      "minLength": 1,

      "description": "The input text prompt for the model to generate a response."

    },

    "lora": {

      "type": "string",

      "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."

    },

    "response_format": {

      "title": "JSON Mode",

      "type": "object",

      "properties": {

        "type": {

          "type": "string",

          "enum": [

            "json_object",

            "json_schema"

          ]

        },

        "json_schema": {}

      }

    },

    "raw": {

      "type": "boolean",

      "default": false,

      "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."

    },

    "stream": {

      "type": "boolean",

      "default": false,

      "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."

    },

    "max_tokens": {

      "type": "integer",

      "default": 2000,

      "description": "The maximum number of tokens to generate in the response."

    },

    "temperature": {

      "type": "number",

      "default": 0.6,

      "minimum": 0,

      "maximum": 5,

      "description": "Controls the randomness of the output; higher values produce more random results."

    },

    "top_p": {

      "type": "number",

      "minimum": 0.001,

      "maximum": 1,

      "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."

    },

    "top_k": {

      "type": "integer",

      "minimum": 1,

      "maximum": 50,

      "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."

    },

    "seed": {

      "type": "integer",

      "minimum": 1,

      "maximum": 9999999999,

      "description": "Random seed for reproducibility of the generation."

    },

    "repetition_penalty": {

      "type": "number",

      "minimum": 0,

      "maximum": 2,

      "description": "Penalty for repeated tokens; higher values discourage repetition."

    },

    "frequency_penalty": {

      "type": "number",

      "minimum": -2,

      "maximum": 2,

      "description": "Decreases the likelihood of the model repeating the same lines verbatim."

    },

    "presence_penalty": {

      "type": "number",

      "minimum": -2,

      "maximum": 2,

      "description": "Increases the likelihood of the model introducing new topics."

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

  "type": "string",

  "contentType": "text/event-stream",

  "format": "binary"

}


```

Batch — Send multiple requests in a single API call 

* [ Input ](#tab-panel-3334)
* [ Output ](#tab-panel-3335)

```

{

  "title": "Async Batch",

  "type": "object",

  "properties": {

    "requests": {

      "type": "array",

      "items": {

        "type": "object",

        "oneOf": [

          {

            "title": "Prompt",

            "properties": {

              "prompt": {

                "type": "string",

                "minLength": 1,

                "description": "The input text prompt for the model to generate a response."

              },

              "lora": {

                "type": "string",

                "description": "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model."

              },

              "response_format": {

                "title": "JSON Mode",

                "type": "object",

                "properties": {

                  "type": {

                    "type": "string",

                    "enum": [

                      "json_object",

                      "json_schema"

                    ]

                  },

                  "json_schema": {}

                }

              },

              "raw": {

                "type": "boolean",

                "default": false,

                "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."

              },

              "stream": {

                "type": "boolean",

                "default": false,

                "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."

              },

              "max_tokens": {

                "type": "integer",

                "default": 256,

                "description": "The maximum number of tokens to generate in the response."

              },

              "temperature": {

                "type": "number",

                "default": 0.6,

                "minimum": 0,

                "maximum": 5,

                "description": "Controls the randomness of the output; higher values produce more random results."

              },

              "top_p": {

                "type": "number",

                "minimum": 0.001,

                "maximum": 1,

                "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."

              },

              "top_k": {

                "type": "integer",

                "minimum": 1,

                "maximum": 50,

                "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."

              },

              "seed": {

                "type": "integer",

                "minimum": 1,

                "maximum": 9999999999,

                "description": "Random seed for reproducibility of the generation."

              },

              "repetition_penalty": {

                "type": "number",

                "minimum": 0,

                "maximum": 2,

                "description": "Penalty for repeated tokens; higher values discourage repetition."

              },

              "frequency_penalty": {

                "type": "number",

                "minimum": -2,

                "maximum": 2,

                "description": "Decreases the likelihood of the model repeating the same lines verbatim."

              },

              "presence_penalty": {

                "type": "number",

                "minimum": -2,

                "maximum": 2,

                "description": "Increases the likelihood of the model introducing new topics."

              }

            },

            "required": [

              "prompt"

            ]

          },

          {

            "title": "Messages",

            "properties": {

              "messages": {

                "type": "array",

                "description": "An array of message objects representing the conversation history.",

                "items": {

                  "type": "object",

                  "properties": {

                    "role": {

                      "type": "string",

                      "description": "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool')."

                    },

                    "content": {

                      "oneOf": [

                        {

                          "type": "string",

                          "description": "The content of the message as a string."

                        },

                        {

                          "type": "array",

                          "description": "Array of text content parts.",

                          "items": {

                            "type": "object",

                            "properties": {

                              "type": {

                                "type": "string",

                                "description": "Type of the content (text)"

                              },

                              "text": {

                                "type": "string",

                                "description": "Text content"

                              }

                            }

                          }

                        }

                      ]

                    }

                  },

                  "required": [

                    "role",

                    "content"

                  ]

                }

              },

              "functions": {

                "type": "array",

                "items": {

                  "type": "object",

                  "properties": {

                    "name": {

                      "type": "string"

                    },

                    "code": {

                      "type": "string"

                    }

                  },

                  "required": [

                    "name",

                    "code"

                  ]

                }

              },

              "tools": {

                "type": "array",

                "description": "A list of tools available for the assistant to use.",

                "items": {

                  "type": "object",

                  "oneOf": [

                    {

                      "properties": {

                        "name": {

                          "type": "string",

                          "description": "The name of the tool. More descriptive the better."

                        },

                        "description": {

                          "type": "string",

                          "description": "A brief description of what the tool does."

                        },

                        "parameters": {

                          "type": "object",

                          "description": "Schema defining the parameters accepted by the tool.",

                          "properties": {

                            "type": {

                              "type": "string",

                              "description": "The type of the parameters object (usually 'object')."

                            },

                            "required": {

                              "type": "array",

                              "description": "List of required parameter names.",

                              "items": {

                                "type": "string"

                              }

                            },

                            "properties": {

                              "type": "object",

                              "description": "Definitions of each parameter.",

                              "additionalProperties": {

                                "type": "object",

                                "properties": {

                                  "type": {

                                    "type": "string",

                                    "description": "The data type of the parameter."

                                  },

                                  "description": {

                                    "type": "string",

                                    "description": "A description of the expected parameter."

                                  }

                                },

                                "required": [

                                  "type",

                                  "description"

                                ]

                              }

                            }

                          },

                          "required": [

                            "type",

                            "properties"

                          ]

                        }

                      },

                      "required": [

                        "name",

                        "description",

                        "parameters"

                      ]

                    },

                    {

                      "properties": {

                        "type": {

                          "type": "string",

                          "description": "Specifies the type of tool (e.g., 'function')."

                        },

                        "function": {

                          "type": "object",

                          "description": "Details of the function tool.",

                          "properties": {

                            "name": {

                              "type": "string",

                              "description": "The name of the function."

                            },

                            "description": {

                              "type": "string",

                              "description": "A brief description of what the function does."

                            },

                            "parameters": {

                              "type": "object",

                              "description": "Schema defining the parameters accepted by the function.",

                              "properties": {

                                "type": {

                                  "type": "string",

                                  "description": "The type of the parameters object (usually 'object')."

                                },

                                "required": {

                                  "type": "array",

                                  "description": "List of required parameter names.",

                                  "items": {

                                    "type": "string"

                                  }

                                },

                                "properties": {

                                  "type": "object",

                                  "description": "Definitions of each parameter.",

                                  "additionalProperties": {

                                    "type": "object",

                                    "properties": {

                                      "type": {

                                        "type": "string",

                                        "description": "The data type of the parameter."

                                      },

                                      "description": {

                                        "type": "string",

                                        "description": "A description of the expected parameter."

                                      }

                                    },

                                    "required": [

                                      "type",

                                      "description"

                                    ]

                                  }

                                }

                              },

                              "required": [

                                "type",

                                "properties"

                              ]

                            }

                          },

                          "required": [

                            "name",

                            "description",

                            "parameters"

                          ]

                        }

                      },

                      "required": [

                        "type",

                        "function"

                      ]

                    }

                  ]

                }

              },

              "response_format": {

                "title": "JSON Mode",

                "type": "object",

                "properties": {

                  "type": {

                    "type": "string",

                    "enum": [

                      "json_object",

                      "json_schema"

                    ]

                  },

                  "json_schema": {}

                }

              },

              "raw": {

                "type": "boolean",

                "default": false,

                "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."

              },

              "stream": {

                "type": "boolean",

                "default": false,

                "description": "If true, the response will be streamed back incrementally using SSE, Server Sent Events."

              },

              "max_tokens": {

                "type": "integer",

                "default": 256,

                "description": "The maximum number of tokens to generate in the response."

              },

              "temperature": {

                "type": "number",

                "default": 0.6,

                "minimum": 0,

                "maximum": 5,

                "description": "Controls the randomness of the output; higher values produce more random results."

              },

              "top_p": {

                "type": "number",

                "minimum": 0.001,

                "maximum": 1,

                "description": "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."

              },

              "top_k": {

                "type": "integer",

                "minimum": 1,

                "maximum": 50,

                "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."

              },

              "seed": {

                "type": "integer",

                "minimum": 1,

                "maximum": 9999999999,

                "description": "Random seed for reproducibility of the generation."

              },

              "repetition_penalty": {

                "type": "number",

                "minimum": 0,

                "maximum": 2,

                "description": "Penalty for repeated tokens; higher values discourage repetition."

              },

              "frequency_penalty": {

                "type": "number",

                "minimum": -2,

                "maximum": 2,

                "description": "Decreases the likelihood of the model repeating the same lines verbatim."

              },

              "presence_penalty": {

                "type": "number",

                "minimum": -2,

                "maximum": 2,

                "description": "Increases the likelihood of the model introducing new topics."

              }

            },

            "required": [

              "messages"

            ]

          }

        ]

      }

    }

  },

  "required": [

    "requests"

  ]

}


```

Explain Code

```

{

  "type": "object",

  "contentType": "application/json",

  "title": "Chat Completion Response",

  "properties": {

    "id": {

      "type": "string",

      "description": "Unique identifier for the completion"

    },

    "object": {

      "type": "string",

      "enum": [

        "chat.completion"

      ],

      "description": "Object type identifier"

    },

    "created": {

      "type": "number",

      "description": "Unix timestamp of when the completion was created"

    },

    "model": {

      "type": "string",

      "description": "Model used for the completion"

    },

    "choices": {

      "type": "array",

      "description": "List of completion choices",

      "items": {

        "type": "object",

        "properties": {

          "index": {

            "type": "number",

            "description": "Index of the choice in the list"

          },

          "message": {

            "type": "object",

            "description": "The message generated by the model",

            "properties": {

              "role": {

                "type": "string",

                "description": "Role of the message author"

              },

              "content": {

                "type": "string",

                "description": "The content of the message"

              },

              "reasoning_content": {

                "type": "string",

                "description": "Internal reasoning content (if available)"

              },

              "tool_calls": {

                "type": "array",

                "description": "Tool calls made by the assistant",

                "items": {

                  "type": "object",

                  "properties": {

                    "id": {

                      "type": "string",

                      "description": "Unique identifier for the tool call"

                    },

                    "type": {

                      "type": "string",

                      "enum": [

                        "function"

                      ],

                      "description": "Type of tool call"

                    },

                    "function": {

                      "type": "object",

                      "properties": {

                        "name": {

                          "type": "string",

                          "description": "Name of the function to call"

                        },

                        "arguments": {

                          "type": "string",

                          "description": "JSON string of arguments for the function"

                        }

                      },

                      "required": [

                        "name",

                        "arguments"

                      ]

                    }

                  },

                  "required": [

                    "id",

                    "type",

                    "function"

                  ]

                }

              }

            },

            "required": [

              "role",

              "content"

            ]

          },

          "finish_reason": {

            "type": "string",

            "description": "Reason why the model stopped generating"

          },

          "stop_reason": {

            "type": [

              "string",

              "null"

            ],

            "description": "Stop reason (may be null)"

          },

          "logprobs": {

            "type": [

              "object",

              "null"

            ],

            "description": "Log probabilities (if requested)"

          }

        }

      }

    },

    "usage": {

      "type": "object",

      "description": "Usage statistics for the inference request",

      "properties": {

        "prompt_tokens": {

          "type": "number",

          "description": "Total number of tokens in input",

          "default": 0

        },

        "completion_tokens": {

          "type": "number",

          "description": "Total number of tokens in output",

          "default": 0

        },

        "total_tokens": {

          "type": "number",

          "description": "Total number of input and output tokens",

          "default": 0

        }

      }

    },

    "prompt_logprobs": {

      "type": [

        "object",

        "null"

      ],

      "description": "Log probabilities for the prompt (if requested)"

    }

  }

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
