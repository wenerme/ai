---
title: nemotron-3-120b-a12b
description: NVIDIA Nemotron 3 Super is a hybrid MoE model with leading accuracy for multi-agent applications and specialized agentic AI systems.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![NVIDIA logo](https://developers.cloudflare.com/_astro/nvidia.y1O6VlZA.svg) 

#  nemotron-3-120b-a12b 

Text Generation • NVIDIA • Hosted 

`@cf/nvidia/nemotron-3-120b-a12b` 

NVIDIA Nemotron 3 Super is a hybrid MoE model with leading accuracy for multi-agent applications and specialized agentic AI systems.

| Model Info                                                                           |                                                                                                           |
| ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/)           | 256,000 tokens                                                                                            |
| Terms and License                                                                    | [link ↗](https://www.nvidia.com/en-us/agreements/enterprise-software/nvidia-nemotron-open-model-license/) |
| Function calling [ ↗](https://developers.cloudflare.com/workers-ai/function-calling) | Yes                                                                                                       |
| Reasoning                                                                            | Yes                                                                                                       |
| Unit Pricing                                                                         | $0.50 per M input tokens, $1.50 per M output tokens                                                       |

## Playground

Try out this model with Workers AI LLM Playground. It does not require any setup or authentication and an instant way to preview and test a model directly in the browser.

[Launch the LLM Playground](https://playground.ai.cloudflare.com/?model=@cf/nvidia/nemotron-3-120b-a12b) 

## Usage

* [  Worker (Streaming) ](#tab-panel-3545)
* [  TypeScript ](#tab-panel-3546)
* [  Python ](#tab-panel-3547)
* [  curl ](#tab-panel-3548)

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


    const stream = await env.AI.run("@cf/nvidia/nemotron-3-120b-a12b", {

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

    const response = await env.AI.run("@cf/nvidia/nemotron-3-120b-a12b", { messages });


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

  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/nvidia/nemotron-3-120b-a12b",

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

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/nvidia/nemotron-3-120b-a12b \

  -X POST \

  -H "Authorization: Bearer $CLOUDFLARE_AUTH_TOKEN" \

  -d '{ "messages": [{ "role": "system", "content": "You are a friendly assistant" }, { "role": "user", "content": "Why is pizza so good" }]}'


```

OpenAI compatible endpoints 

Workers AI also supports OpenAI compatible API endpoints for `/v1/chat/completions` and `/v1/embeddings`. For more details, refer to [Configurations](https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/).

## Parameters

Synchronous — Send a request and receive a complete response 

* [ Input ](#tab-panel-3553)
* [ Output ](#tab-panel-3554)

prompt

`string`requiredminLength: 1The input text prompt for the model to generate a response.

model

`string`ID of the model to use (e.g. '@cf/zai-org/glm-4.7-flash, etc').

▶audio{}

`object`Parameters for audio output. Required when modalities includes 'audio'.

frequency\_penalty

`number | null`Penalizes new tokens based on their existing frequency in the text so far.

logit\_bias

`object | null`Modify the likelihood of specified tokens appearing in the completion. Maps token IDs to bias values from -100 to 100.

logprobs

`boolean | null`Whether to return log probabilities of the output tokens.

top\_logprobs

`integer | null`How many top log probabilities to return at each token position (0-20). Requires logprobs=true.

max\_tokens

`integer | null`Deprecated in favor of max\_completion\_tokens. The maximum number of tokens to generate.

max\_completion\_tokens

`integer | null`An upper bound for the number of tokens that can be generated for a completion.

metadata

`object | null`Set of 16 key-value pairs that can be attached to the object.

modalities

`array | null`Output types requested from the model (e.g. \['text'\] or \['text', 'audio'\]).

n

`integer | null`How many chat completion choices to generate for each input message.

parallel\_tool\_calls

`boolean`default: trueWhether to enable parallel function calling during tool use.

▶prediction{}

`object`

presence\_penalty

`number | null`Penalizes new tokens based on whether they appear in the text so far.

reasoning\_effort

`string | null`Constrains effort on reasoning for reasoning models (o1, o3-mini, etc.).

▶chat\_template\_kwargs{}

`object`

▶response\_format

`one of`Specifies the format the model must output.

seed

`integer | null`If specified, the system will make a best effort to sample deterministically.

service\_tier

`string | null`Specifies the processing type used for serving the request.

▶stop

`one of`

store

`boolean | null`Whether to store the output for model distillation / evals.

stream

`boolean | null`If true, partial message deltas will be sent as server-sent events.

▶stream\_options{}

`object`

temperature

`number | null`Sampling temperature between 0 and 2.

▶tool\_choice

`one of`Controls which (if any) tool is called by the model. 'none' = no tools, 'auto' = model decides, 'required' = must call a tool.

▶tools\[\]

`array`A list of tools the model may call.

top\_p

`number | null`Nucleus sampling: considers the results of the tokens with top\_p probability mass.

user

`string`A unique identifier representing your end-user, for abuse monitoring.

▶web\_search\_options{}

`object`Options for the web search tool (when using built-in web search).

▶function\_call

`one of`

▶functions\[\]

`array`minItems: 1maxItems: 128

id

`string`A unique identifier for the chat completion.

object

`string`

created

`integer`Unix timestamp (seconds) of when the completion was created.

model

`string`The model used for the chat completion.

▶choices\[\]

`array`minItems: 1

▶usage{}

`object`

system\_fingerprint

`string | null`

service\_tier

`string | null`

Streaming — Send a request with \`stream: true\` and receive server-sent events 

* [ Input ](#tab-panel-3555)
* [ Output ](#tab-panel-3556)

prompt

`string`requiredminLength: 1The input text prompt for the model to generate a response.

model

`string`ID of the model to use (e.g. '@cf/zai-org/glm-4.7-flash, etc').

▶audio{}

`object`Parameters for audio output. Required when modalities includes 'audio'.

frequency\_penalty

`number | null`Penalizes new tokens based on their existing frequency in the text so far.

logit\_bias

`object | null`Modify the likelihood of specified tokens appearing in the completion. Maps token IDs to bias values from -100 to 100.

logprobs

`boolean | null`Whether to return log probabilities of the output tokens.

top\_logprobs

`integer | null`How many top log probabilities to return at each token position (0-20). Requires logprobs=true.

max\_tokens

`integer | null`Deprecated in favor of max\_completion\_tokens. The maximum number of tokens to generate.

max\_completion\_tokens

`integer | null`An upper bound for the number of tokens that can be generated for a completion.

metadata

`object | null`Set of 16 key-value pairs that can be attached to the object.

modalities

`array | null`Output types requested from the model (e.g. \['text'\] or \['text', 'audio'\]).

n

`integer | null`How many chat completion choices to generate for each input message.

parallel\_tool\_calls

`boolean`default: trueWhether to enable parallel function calling during tool use.

▶prediction{}

`object`

presence\_penalty

`number | null`Penalizes new tokens based on whether they appear in the text so far.

reasoning\_effort

`string | null`Constrains effort on reasoning for reasoning models (o1, o3-mini, etc.).

▶chat\_template\_kwargs{}

`object`

▶response\_format

`one of`Specifies the format the model must output.

seed

`integer | null`If specified, the system will make a best effort to sample deterministically.

service\_tier

`string | null`Specifies the processing type used for serving the request.

▶stop

`one of`

store

`boolean | null`Whether to store the output for model distillation / evals.

stream

`boolean | null`If true, partial message deltas will be sent as server-sent events.

▶stream\_options{}

`object`

temperature

`number | null`Sampling temperature between 0 and 2.

▶tool\_choice

`one of`Controls which (if any) tool is called by the model. 'none' = no tools, 'auto' = model decides, 'required' = must call a tool.

▶tools\[\]

`array`A list of tools the model may call.

top\_p

`number | null`Nucleus sampling: considers the results of the tokens with top\_p probability mass.

user

`string`A unique identifier representing your end-user, for abuse monitoring.

▶web\_search\_options{}

`object`Options for the web search tool (when using built-in web search).

▶function\_call

`one of`

▶functions\[\]

`array`minItems: 1maxItems: 128

type

`string`

contentType

`text/event-stream`

format

`binary`

## API Schemas (Raw)

Synchronous — Send a request and receive a complete response 

* [ Input ](#tab-panel-3549)
* [ Output ](#tab-panel-3550)

```

{

  "title": "Prompt",

  "properties": {

    "prompt": {

      "type": "string",

      "minLength": 1,

      "description": "The input text prompt for the model to generate a response."

    },

    "model": {

      "type": "string",

      "description": "ID of the model to use (e.g. '@cf/zai-org/glm-4.7-flash, etc')."

    },

    "audio": {

      "anyOf": [

        {

          "type": "object",

          "description": "Parameters for audio output. Required when modalities includes 'audio'.",

          "properties": {

            "voice": {

              "oneOf": [

                {

                  "type": "string"

                },

                {

                  "type": "object",

                  "properties": {

                    "id": {

                      "type": "string"

                    }

                  },

                  "required": [

                    "id"

                  ]

                }

              ]

            },

            "format": {

              "type": "string",

              "enum": [

                "wav",

                "aac",

                "mp3",

                "flac",

                "opus",

                "pcm16"

              ]

            }

          },

          "required": [

            "voice",

            "format"

          ]

        }

      ]

    },

    "frequency_penalty": {

      "anyOf": [

        {

          "type": "number",

          "minimum": -2,

          "maximum": 2

        },

        {

          "type": "null"

        }

      ],

      "default": 0,

      "description": "Penalizes new tokens based on their existing frequency in the text so far."

    },

    "logit_bias": {

      "anyOf": [

        {

          "type": "object"

        },

        {

          "type": "null"

        }

      ],

      "description": "Modify the likelihood of specified tokens appearing in the completion. Maps token IDs to bias values from -100 to 100."

    },

    "logprobs": {

      "anyOf": [

        {

          "type": "boolean"

        },

        {

          "type": "null"

        }

      ],

      "default": false,

      "description": "Whether to return log probabilities of the output tokens."

    },

    "top_logprobs": {

      "anyOf": [

        {

          "type": "integer",

          "minimum": 0,

          "maximum": 20

        },

        {

          "type": "null"

        }

      ],

      "description": "How many top log probabilities to return at each token position (0-20). Requires logprobs=true."

    },

    "max_tokens": {

      "anyOf": [

        {

          "type": "integer"

        },

        {

          "type": "null"

        }

      ],

      "description": "Deprecated in favor of max_completion_tokens. The maximum number of tokens to generate."

    },

    "max_completion_tokens": {

      "anyOf": [

        {

          "type": "integer"

        },

        {

          "type": "null"

        }

      ],

      "description": "An upper bound for the number of tokens that can be generated for a completion."

    },

    "metadata": {

      "anyOf": [

        {

          "type": "object"

        },

        {

          "type": "null"

        }

      ],

      "description": "Set of 16 key-value pairs that can be attached to the object."

    },

    "modalities": {

      "anyOf": [

        {

          "type": "array",

          "items": {

            "type": "string",

            "enum": [

              "text",

              "audio"

            ]

          }

        },

        {

          "type": "null"

        }

      ],

      "description": "Output types requested from the model (e.g. ['text'] or ['text', 'audio'])."

    },

    "n": {

      "anyOf": [

        {

          "type": "integer",

          "minimum": 1,

          "maximum": 128

        },

        {

          "type": "null"

        }

      ],

      "default": 1,

      "description": "How many chat completion choices to generate for each input message."

    },

    "parallel_tool_calls": {

      "type": "boolean",

      "default": true,

      "description": "Whether to enable parallel function calling during tool use."

    },

    "prediction": {

      "anyOf": [

        {

          "type": "object",

          "properties": {

            "type": {

              "type": "string",

              "enum": [

                "content"

              ]

            },

            "content": {

              "anyOf": [

                {

                  "type": "string"

                },

                {

                  "type": "array",

                  "items": {

                    "type": "object",

                    "properties": {

                      "type": {

                        "type": "string",

                        "enum": [

                          "text"

                        ]

                      },

                      "text": {

                        "type": "string"

                      }

                    },

                    "required": [

                      "type",

                      "text"

                    ]

                  }

                }

              ]

            }

          },

          "required": [

            "type",

            "content"

          ]

        }

      ]

    },

    "presence_penalty": {

      "anyOf": [

        {

          "type": "number",

          "minimum": -2,

          "maximum": 2

        },

        {

          "type": "null"

        }

      ],

      "default": 0,

      "description": "Penalizes new tokens based on whether they appear in the text so far."

    },

    "reasoning_effort": {

      "anyOf": [

        {

          "type": "string",

          "enum": [

            "low",

            "medium",

            "high"

          ]

        },

        {

          "type": "null"

        }

      ],

      "description": "Constrains effort on reasoning for reasoning models (o1, o3-mini, etc.)."

    },

    "chat_template_kwargs": {

      "type": "object",

      "properties": {

        "enable_thinking": {

          "type": "boolean",

          "default": true,

          "description": "Whether to enable reasoning, enabled by default."

        },

        "clear_thinking": {

          "type": "boolean",

          "default": false,

          "description": "If false, preserves reasoning context between turns."

        }

      }

    },

    "response_format": {

      "anyOf": [

        {

          "description": "Specifies the format the model must output.",

          "oneOf": [

            {

              "type": "object",

              "properties": {

                "type": {

                  "type": "string",

                  "enum": [

                    "text"

                  ]

                }

              },

              "required": [

                "type"

              ]

            },

            {

              "type": "object",

              "properties": {

                "type": {

                  "type": "string",

                  "enum": [

                    "json_object"

                  ]

                }

              },

              "required": [

                "type"

              ]

            },

            {

              "type": "object",

              "properties": {

                "type": {

                  "type": "string",

                  "enum": [

                    "json_schema"

                  ]

                },

                "json_schema": {

                  "type": "object",

                  "properties": {

                    "name": {

                      "type": "string"

                    },

                    "description": {

                      "type": "string"

                    },

                    "schema": {

                      "type": "object"

                    },

                    "strict": {

                      "anyOf": [

                        {

                          "type": "boolean"

                        },

                        {

                          "type": "null"

                        }

                      ]

                    }

                  },

                  "required": [

                    "name"

                  ]

                }

              },

              "required": [

                "type",

                "json_schema"

              ]

            }

          ]

        }

      ]

    },

    "seed": {

      "anyOf": [

        {

          "type": "integer"

        },

        {

          "type": "null"

        }

      ],

      "description": "If specified, the system will make a best effort to sample deterministically."

    },

    "service_tier": {

      "anyOf": [

        {

          "type": "string",

          "enum": [

            "auto",

            "default",

            "flex",

            "scale",

            "priority"

          ]

        },

        {

          "type": "null"

        }

      ],

      "default": "auto",

      "description": "Specifies the processing type used for serving the request."

    },

    "stop": {

      "description": "Up to 4 sequences where the API will stop generating further tokens.",

      "anyOf": [

        {

          "type": "null"

        },

        {

          "type": "string"

        },

        {

          "type": "array",

          "items": {

            "type": "string"

          },

          "minItems": 1,

          "maxItems": 4

        }

      ]

    },

    "store": {

      "anyOf": [

        {

          "type": "boolean"

        },

        {

          "type": "null"

        }

      ],

      "default": false,

      "description": "Whether to store the output for model distillation / evals."

    },

    "stream": {

      "anyOf": [

        {

          "type": "boolean"

        },

        {

          "type": "null"

        }

      ],

      "default": false,

      "description": "If true, partial message deltas will be sent as server-sent events."

    },

    "stream_options": {

      "anyOf": [

        {

          "type": "object",

          "properties": {

            "include_usage": {

              "type": "boolean"

            },

            "include_obfuscation": {

              "type": "boolean"

            }

          }

        }

      ]

    },

    "temperature": {

      "anyOf": [

        {

          "type": "number",

          "minimum": 0,

          "maximum": 2

        },

        {

          "type": "null"

        }

      ],

      "default": 1,

      "description": "Sampling temperature between 0 and 2."

    },

    "tool_choice": {

      "anyOf": [

        {

          "description": "Controls which (if any) tool is called by the model. 'none' = no tools, 'auto' = model decides, 'required' = must call a tool.",

          "oneOf": [

            {

              "type": "string",

              "enum": [

                "none",

                "auto",

                "required"

              ]

            },

            {

              "type": "object",

              "description": "Force a specific function tool.",

              "properties": {

                "type": {

                  "type": "string",

                  "enum": [

                    "function"

                  ]

                },

                "function": {

                  "type": "object",

                  "properties": {

                    "name": {

                      "type": "string"

                    }

                  },

                  "required": [

                    "name"

                  ]

                }

              },

              "required": [

                "type",

                "function"

              ]

            },

            {

              "type": "object",

              "description": "Force a specific custom tool.",

              "properties": {

                "type": {

                  "type": "string",

                  "enum": [

                    "custom"

                  ]

                },

                "custom": {

                  "type": "object",

                  "properties": {

                    "name": {

                      "type": "string"

                    }

                  },

                  "required": [

                    "name"

                  ]

                }

              },

              "required": [

                "type",

                "custom"

              ]

            },

            {

              "type": "object",

              "description": "Constrain to an allowed subset of tools.",

              "properties": {

                "type": {

                  "type": "string",

                  "enum": [

                    "allowed_tools"

                  ]

                },

                "allowed_tools": {

                  "type": "object",

                  "properties": {

                    "mode": {

                      "type": "string",

                      "enum": [

                        "auto",

                        "required"

                      ]

                    },

                    "tools": {

                      "type": "array",

                      "items": {

                        "type": "object"

                      }

                    }

                  },

                  "required": [

                    "mode",

                    "tools"

                  ]

                }

              },

              "required": [

                "type",

                "allowed_tools"

              ]

            }

          ]

        }

      ]

    },

    "tools": {

      "type": "array",

      "description": "A list of tools the model may call.",

      "items": {

        "oneOf": [

          {

            "type": "object",

            "properties": {

              "type": {

                "type": "string",

                "enum": [

                  "function"

                ]

              },

              "function": {

                "type": "object",

                "properties": {

                  "name": {

                    "type": "string",

                    "description": "The name of the function to be called."

                  },

                  "description": {

                    "type": "string",

                    "description": "A description of what the function does."

                  },

                  "parameters": {

                    "type": "object",

                    "description": "The parameters the function accepts, described as a JSON Schema object."

                  },

                  "strict": {

                    "anyOf": [

                      {

                        "type": "boolean"

                      },

                      {

                        "type": "null"

                      }

                    ],

                    "default": false,

                    "description": "Whether to enable strict schema adherence."

                  }

                },

                "required": [

                  "name"

                ]

              }

            },

            "required": [

              "type",

              "function"

            ]

          },

          {

            "type": "object",

            "properties": {

              "type": {

                "type": "string",

                "enum": [

                  "custom"

                ]

              },

              "custom": {

                "type": "object",

                "properties": {

                  "name": {

                    "type": "string"

                  },

                  "description": {

                    "type": "string"

                  },

                  "format": {

                    "oneOf": [

                      {

                        "type": "object",

                        "properties": {

                          "type": {

                            "type": "string",

                            "enum": [

                              "text"

                            ]

                          }

                        },

                        "required": [

                          "type"

                        ]

                      },

                      {

                        "type": "object",

                        "properties": {

                          "type": {

                            "type": "string",

                            "enum": [

                              "grammar"

                            ]

                          },

                          "grammar": {

                            "type": "object",

                            "properties": {

                              "definition": {

                                "type": "string"

                              },

                              "syntax": {

                                "type": "string",

                                "enum": [

                                  "lark",

                                  "regex"

                                ]

                              }

                            },

                            "required": [

                              "definition",

                              "syntax"

                            ]

                          }

                        },

                        "required": [

                          "type",

                          "grammar"

                        ]

                      }

                    ]

                  }

                },

                "required": [

                  "name"

                ]

              }

            },

            "required": [

              "type",

              "custom"

            ]

          }

        ]

      }

    },

    "top_p": {

      "anyOf": [

        {

          "type": "number",

          "minimum": 0,

          "maximum": 1

        },

        {

          "type": "null"

        }

      ],

      "default": 1,

      "description": "Nucleus sampling: considers the results of the tokens with top_p probability mass."

    },

    "user": {

      "type": "string",

      "description": "A unique identifier representing your end-user, for abuse monitoring."

    },

    "web_search_options": {

      "anyOf": [

        {

          "type": "object",

          "description": "Options for the web search tool (when using built-in web search).",

          "properties": {

            "search_context_size": {

              "type": "string",

              "enum": [

                "low",

                "medium",

                "high"

              ],

              "default": "medium"

            },

            "user_location": {

              "type": "object",

              "properties": {

                "type": {

                  "type": "string",

                  "enum": [

                    "approximate"

                  ]

                },

                "approximate": {

                  "type": "object",

                  "properties": {

                    "city": {

                      "type": "string"

                    },

                    "country": {

                      "type": "string"

                    },

                    "region": {

                      "type": "string"

                    },

                    "timezone": {

                      "type": "string"

                    }

                  }

                }

              },

              "required": [

                "type",

                "approximate"

              ]

            }

          }

        }

      ]

    },

    "function_call": {

      "anyOf": [

        {

          "type": "string",

          "enum": [

            "none",

            "auto"

          ]

        },

        {

          "type": "object",

          "properties": {

            "name": {

              "type": "string"

            }

          },

          "required": [

            "name"

          ]

        }

      ]

    },

    "functions": {

      "type": "array",

      "items": {

        "type": "object",

        "properties": {

          "name": {

            "type": "string",

            "description": "The name of the function to be called."

          },

          "description": {

            "type": "string",

            "description": "A description of what the function does."

          },

          "parameters": {

            "type": "object",

            "description": "The parameters the function accepts, described as a JSON Schema object."

          },

          "strict": {

            "anyOf": [

              {

                "type": "boolean"

              },

              {

                "type": "null"

              }

            ],

            "default": false,

            "description": "Whether to enable strict schema adherence."

          }

        },

        "required": [

          "name"

        ]

      },

      "minItems": 1,

      "maxItems": 128

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

  "properties": {

    "id": {

      "type": "string",

      "description": "A unique identifier for the chat completion."

    },

    "object": {

      "type": "string"

    },

    "created": {

      "type": "integer",

      "description": "Unix timestamp (seconds) of when the completion was created."

    },

    "model": {

      "type": "string",

      "description": "The model used for the chat completion."

    },

    "choices": {

      "type": "array",

      "items": {

        "anyOf": [

          {

            "type": "object",

            "properties": {

              "index": {

                "type": "integer"

              },

              "message": {

                "anyOf": [

                  {

                    "type": "object",

                    "properties": {

                      "role": {

                        "type": "string",

                        "enum": [

                          "assistant"

                        ]

                      },

                      "content": {

                        "anyOf": [

                          {

                            "type": "string"

                          },

                          {

                            "type": "null"

                          }

                        ]

                      },

                      "refusal": {

                        "anyOf": [

                          {

                            "type": "string"

                          },

                          {

                            "type": "null"

                          }

                        ]

                      },

                      "annotations": {

                        "type": "array",

                        "items": {

                          "type": "object",

                          "properties": {

                            "type": {

                              "type": "string",

                              "enum": [

                                "url_citation"

                              ]

                            },

                            "url_citation": {

                              "type": "object",

                              "properties": {

                                "url": {

                                  "type": "string"

                                },

                                "title": {

                                  "type": "string"

                                },

                                "start_index": {

                                  "type": "integer"

                                },

                                "end_index": {

                                  "type": "integer"

                                }

                              },

                              "required": [

                                "url",

                                "title",

                                "start_index",

                                "end_index"

                              ]

                            }

                          },

                          "required": [

                            "type",

                            "url_citation"

                          ]

                        }

                      },

                      "audio": {

                        "anyOf": [

                          {

                            "type": "object",

                            "properties": {

                              "id": {

                                "type": "string"

                              },

                              "data": {

                                "type": "string",

                                "description": "Base64 encoded audio bytes."

                              },

                              "expires_at": {

                                "type": "integer"

                              },

                              "transcript": {

                                "type": "string"

                              }

                            },

                            "required": [

                              "id",

                              "data",

                              "expires_at",

                              "transcript"

                            ]

                          }

                        ]

                      },

                      "tool_calls": {

                        "type": "array",

                        "items": {

                          "oneOf": [

                            {

                              "type": "object",

                              "properties": {

                                "id": {

                                  "type": "string"

                                },

                                "type": {

                                  "type": "string",

                                  "enum": [

                                    "function"

                                  ]

                                },

                                "function": {

                                  "type": "object",

                                  "properties": {

                                    "name": {

                                      "type": "string"

                                    },

                                    "arguments": {

                                      "type": "string",

                                      "description": "JSON-encoded arguments string."

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

                            },

                            {

                              "type": "object",

                              "properties": {

                                "id": {

                                  "type": "string"

                                },

                                "type": {

                                  "type": "string",

                                  "enum": [

                                    "custom"

                                  ]

                                },

                                "custom": {

                                  "type": "object",

                                  "properties": {

                                    "name": {

                                      "type": "string"

                                    },

                                    "input": {

                                      "type": "string"

                                    }

                                  },

                                  "required": [

                                    "name",

                                    "input"

                                  ]

                                }

                              },

                              "required": [

                                "id",

                                "type",

                                "custom"

                              ]

                            }

                          ]

                        }

                      },

                      "function_call": {

                        "anyOf": [

                          {

                            "type": "object",

                            "properties": {

                              "name": {

                                "type": "string"

                              },

                              "arguments": {

                                "type": "string"

                              }

                            },

                            "required": [

                              "name",

                              "arguments"

                            ]

                          },

                          {

                            "type": "null"

                          }

                        ]

                      }

                    },

                    "required": [

                      "role",

                      "content",

                      "refusal"

                    ]

                  }

                ]

              },

              "finish_reason": {

                "type": "string",

                "enum": [

                  "stop",

                  "length",

                  "tool_calls",

                  "content_filter",

                  "function_call"

                ]

              },

              "logprobs": {

                "anyOf": [

                  {

                    "type": "object",

                    "properties": {

                      "content": {

                        "anyOf": [

                          {

                            "type": "array",

                            "items": {

                              "type": "object",

                              "properties": {

                                "token": {

                                  "type": "string"

                                },

                                "logprob": {

                                  "type": "number"

                                },

                                "bytes": {

                                  "anyOf": [

                                    {

                                      "type": "array",

                                      "items": {

                                        "type": "integer"

                                      }

                                    },

                                    {

                                      "type": "null"

                                    }

                                  ]

                                },

                                "top_logprobs": {

                                  "type": "array",

                                  "items": {

                                    "type": "object",

                                    "properties": {

                                      "token": {

                                        "type": "string"

                                      },

                                      "logprob": {

                                        "type": "number"

                                      },

                                      "bytes": {

                                        "anyOf": [

                                          {

                                            "type": "array",

                                            "items": {

                                              "type": "integer"

                                            }

                                          },

                                          {

                                            "type": "null"

                                          }

                                        ]

                                      }

                                    },

                                    "required": [

                                      "token",

                                      "logprob",

                                      "bytes"

                                    ]

                                  }

                                }

                              },

                              "required": [

                                "token",

                                "logprob",

                                "bytes",

                                "top_logprobs"

                              ]

                            }

                          },

                          {

                            "type": "null"

                          }

                        ]

                      },

                      "refusal": {

                        "anyOf": [

                          {

                            "type": "array",

                            "items": {

                              "type": "object",

                              "properties": {

                                "token": {

                                  "type": "string"

                                },

                                "logprob": {

                                  "type": "number"

                                },

                                "bytes": {

                                  "anyOf": [

                                    {

                                      "type": "array",

                                      "items": {

                                        "type": "integer"

                                      }

                                    },

                                    {

                                      "type": "null"

                                    }

                                  ]

                                },

                                "top_logprobs": {

                                  "type": "array",

                                  "items": {

                                    "type": "object",

                                    "properties": {

                                      "token": {

                                        "type": "string"

                                      },

                                      "logprob": {

                                        "type": "number"

                                      },

                                      "bytes": {

                                        "anyOf": [

                                          {

                                            "type": "array",

                                            "items": {

                                              "type": "integer"

                                            }

                                          },

                                          {

                                            "type": "null"

                                          }

                                        ]

                                      }

                                    },

                                    "required": [

                                      "token",

                                      "logprob",

                                      "bytes"

                                    ]

                                  }

                                }

                              },

                              "required": [

                                "token",

                                "logprob",

                                "bytes",

                                "top_logprobs"

                              ]

                            }

                          },

                          {

                            "type": "null"

                          }

                        ]

                      }

                    }

                  },

                  {

                    "type": "null"

                  }

                ]

              }

            },

            "required": [

              "index",

              "message",

              "finish_reason",

              "logprobs"

            ]

          }

        ]

      },

      "minItems": 1

    },

    "usage": {

      "anyOf": [

        {

          "type": "object",

          "properties": {

            "prompt_tokens": {

              "type": "integer"

            },

            "completion_tokens": {

              "type": "integer"

            },

            "total_tokens": {

              "type": "integer"

            },

            "prompt_tokens_details": {

              "type": "object",

              "properties": {

                "cached_tokens": {

                  "type": "integer"

                },

                "audio_tokens": {

                  "type": "integer"

                }

              }

            },

            "completion_tokens_details": {

              "type": "object",

              "properties": {

                "reasoning_tokens": {

                  "type": "integer"

                },

                "audio_tokens": {

                  "type": "integer"

                },

                "accepted_prediction_tokens": {

                  "type": "integer"

                },

                "rejected_prediction_tokens": {

                  "type": "integer"

                }

              }

            }

          },

          "required": [

            "prompt_tokens",

            "completion_tokens",

            "total_tokens"

          ]

        }

      ]

    },

    "system_fingerprint": {

      "anyOf": [

        {

          "type": "string"

        },

        {

          "type": "null"

        }

      ]

    },

    "service_tier": {

      "anyOf": [

        {

          "type": "string",

          "enum": [

            "auto",

            "default",

            "flex",

            "scale",

            "priority"

          ]

        },

        {

          "type": "null"

        }

      ]

    }

  },

  "required": [

    "id",

    "object",

    "created",

    "model",

    "choices"

  ]

}


```

Explain Code

Streaming — Send a request with \`stream: true\` and receive server-sent events 

* [ Input ](#tab-panel-3551)
* [ Output ](#tab-panel-3552)

```

{

  "title": "Prompt",

  "properties": {

    "prompt": {

      "type": "string",

      "minLength": 1,

      "description": "The input text prompt for the model to generate a response."

    },

    "model": {

      "type": "string",

      "description": "ID of the model to use (e.g. '@cf/zai-org/glm-4.7-flash, etc')."

    },

    "audio": {

      "anyOf": [

        {

          "type": "object",

          "description": "Parameters for audio output. Required when modalities includes 'audio'.",

          "properties": {

            "voice": {

              "oneOf": [

                {

                  "type": "string"

                },

                {

                  "type": "object",

                  "properties": {

                    "id": {

                      "type": "string"

                    }

                  },

                  "required": [

                    "id"

                  ]

                }

              ]

            },

            "format": {

              "type": "string",

              "enum": [

                "wav",

                "aac",

                "mp3",

                "flac",

                "opus",

                "pcm16"

              ]

            }

          },

          "required": [

            "voice",

            "format"

          ]

        }

      ]

    },

    "frequency_penalty": {

      "anyOf": [

        {

          "type": "number",

          "minimum": -2,

          "maximum": 2

        },

        {

          "type": "null"

        }

      ],

      "default": 0,

      "description": "Penalizes new tokens based on their existing frequency in the text so far."

    },

    "logit_bias": {

      "anyOf": [

        {

          "type": "object"

        },

        {

          "type": "null"

        }

      ],

      "description": "Modify the likelihood of specified tokens appearing in the completion. Maps token IDs to bias values from -100 to 100."

    },

    "logprobs": {

      "anyOf": [

        {

          "type": "boolean"

        },

        {

          "type": "null"

        }

      ],

      "default": false,

      "description": "Whether to return log probabilities of the output tokens."

    },

    "top_logprobs": {

      "anyOf": [

        {

          "type": "integer",

          "minimum": 0,

          "maximum": 20

        },

        {

          "type": "null"

        }

      ],

      "description": "How many top log probabilities to return at each token position (0-20). Requires logprobs=true."

    },

    "max_tokens": {

      "anyOf": [

        {

          "type": "integer"

        },

        {

          "type": "null"

        }

      ],

      "description": "Deprecated in favor of max_completion_tokens. The maximum number of tokens to generate."

    },

    "max_completion_tokens": {

      "anyOf": [

        {

          "type": "integer"

        },

        {

          "type": "null"

        }

      ],

      "description": "An upper bound for the number of tokens that can be generated for a completion."

    },

    "metadata": {

      "anyOf": [

        {

          "type": "object"

        },

        {

          "type": "null"

        }

      ],

      "description": "Set of 16 key-value pairs that can be attached to the object."

    },

    "modalities": {

      "anyOf": [

        {

          "type": "array",

          "items": {

            "type": "string",

            "enum": [

              "text",

              "audio"

            ]

          }

        },

        {

          "type": "null"

        }

      ],

      "description": "Output types requested from the model (e.g. ['text'] or ['text', 'audio'])."

    },

    "n": {

      "anyOf": [

        {

          "type": "integer",

          "minimum": 1,

          "maximum": 128

        },

        {

          "type": "null"

        }

      ],

      "default": 1,

      "description": "How many chat completion choices to generate for each input message."

    },

    "parallel_tool_calls": {

      "type": "boolean",

      "default": true,

      "description": "Whether to enable parallel function calling during tool use."

    },

    "prediction": {

      "anyOf": [

        {

          "type": "object",

          "properties": {

            "type": {

              "type": "string",

              "enum": [

                "content"

              ]

            },

            "content": {

              "anyOf": [

                {

                  "type": "string"

                },

                {

                  "type": "array",

                  "items": {

                    "type": "object",

                    "properties": {

                      "type": {

                        "type": "string",

                        "enum": [

                          "text"

                        ]

                      },

                      "text": {

                        "type": "string"

                      }

                    },

                    "required": [

                      "type",

                      "text"

                    ]

                  }

                }

              ]

            }

          },

          "required": [

            "type",

            "content"

          ]

        }

      ]

    },

    "presence_penalty": {

      "anyOf": [

        {

          "type": "number",

          "minimum": -2,

          "maximum": 2

        },

        {

          "type": "null"

        }

      ],

      "default": 0,

      "description": "Penalizes new tokens based on whether they appear in the text so far."

    },

    "reasoning_effort": {

      "anyOf": [

        {

          "type": "string",

          "enum": [

            "low",

            "medium",

            "high"

          ]

        },

        {

          "type": "null"

        }

      ],

      "description": "Constrains effort on reasoning for reasoning models (o1, o3-mini, etc.)."

    },

    "chat_template_kwargs": {

      "type": "object",

      "properties": {

        "enable_thinking": {

          "type": "boolean",

          "default": true,

          "description": "Whether to enable reasoning, enabled by default."

        },

        "clear_thinking": {

          "type": "boolean",

          "default": false,

          "description": "If false, preserves reasoning context between turns."

        }

      }

    },

    "response_format": {

      "anyOf": [

        {

          "description": "Specifies the format the model must output.",

          "oneOf": [

            {

              "type": "object",

              "properties": {

                "type": {

                  "type": "string",

                  "enum": [

                    "text"

                  ]

                }

              },

              "required": [

                "type"

              ]

            },

            {

              "type": "object",

              "properties": {

                "type": {

                  "type": "string",

                  "enum": [

                    "json_object"

                  ]

                }

              },

              "required": [

                "type"

              ]

            },

            {

              "type": "object",

              "properties": {

                "type": {

                  "type": "string",

                  "enum": [

                    "json_schema"

                  ]

                },

                "json_schema": {

                  "type": "object",

                  "properties": {

                    "name": {

                      "type": "string"

                    },

                    "description": {

                      "type": "string"

                    },

                    "schema": {

                      "type": "object"

                    },

                    "strict": {

                      "anyOf": [

                        {

                          "type": "boolean"

                        },

                        {

                          "type": "null"

                        }

                      ]

                    }

                  },

                  "required": [

                    "name"

                  ]

                }

              },

              "required": [

                "type",

                "json_schema"

              ]

            }

          ]

        }

      ]

    },

    "seed": {

      "anyOf": [

        {

          "type": "integer"

        },

        {

          "type": "null"

        }

      ],

      "description": "If specified, the system will make a best effort to sample deterministically."

    },

    "service_tier": {

      "anyOf": [

        {

          "type": "string",

          "enum": [

            "auto",

            "default",

            "flex",

            "scale",

            "priority"

          ]

        },

        {

          "type": "null"

        }

      ],

      "default": "auto",

      "description": "Specifies the processing type used for serving the request."

    },

    "stop": {

      "description": "Up to 4 sequences where the API will stop generating further tokens.",

      "anyOf": [

        {

          "type": "null"

        },

        {

          "type": "string"

        },

        {

          "type": "array",

          "items": {

            "type": "string"

          },

          "minItems": 1,

          "maxItems": 4

        }

      ]

    },

    "store": {

      "anyOf": [

        {

          "type": "boolean"

        },

        {

          "type": "null"

        }

      ],

      "default": false,

      "description": "Whether to store the output for model distillation / evals."

    },

    "stream": {

      "anyOf": [

        {

          "type": "boolean"

        },

        {

          "type": "null"

        }

      ],

      "default": false,

      "description": "If true, partial message deltas will be sent as server-sent events."

    },

    "stream_options": {

      "anyOf": [

        {

          "type": "object",

          "properties": {

            "include_usage": {

              "type": "boolean"

            },

            "include_obfuscation": {

              "type": "boolean"

            }

          }

        }

      ]

    },

    "temperature": {

      "anyOf": [

        {

          "type": "number",

          "minimum": 0,

          "maximum": 2

        },

        {

          "type": "null"

        }

      ],

      "default": 1,

      "description": "Sampling temperature between 0 and 2."

    },

    "tool_choice": {

      "anyOf": [

        {

          "description": "Controls which (if any) tool is called by the model. 'none' = no tools, 'auto' = model decides, 'required' = must call a tool.",

          "oneOf": [

            {

              "type": "string",

              "enum": [

                "none",

                "auto",

                "required"

              ]

            },

            {

              "type": "object",

              "description": "Force a specific function tool.",

              "properties": {

                "type": {

                  "type": "string",

                  "enum": [

                    "function"

                  ]

                },

                "function": {

                  "type": "object",

                  "properties": {

                    "name": {

                      "type": "string"

                    }

                  },

                  "required": [

                    "name"

                  ]

                }

              },

              "required": [

                "type",

                "function"

              ]

            },

            {

              "type": "object",

              "description": "Force a specific custom tool.",

              "properties": {

                "type": {

                  "type": "string",

                  "enum": [

                    "custom"

                  ]

                },

                "custom": {

                  "type": "object",

                  "properties": {

                    "name": {

                      "type": "string"

                    }

                  },

                  "required": [

                    "name"

                  ]

                }

              },

              "required": [

                "type",

                "custom"

              ]

            },

            {

              "type": "object",

              "description": "Constrain to an allowed subset of tools.",

              "properties": {

                "type": {

                  "type": "string",

                  "enum": [

                    "allowed_tools"

                  ]

                },

                "allowed_tools": {

                  "type": "object",

                  "properties": {

                    "mode": {

                      "type": "string",

                      "enum": [

                        "auto",

                        "required"

                      ]

                    },

                    "tools": {

                      "type": "array",

                      "items": {

                        "type": "object"

                      }

                    }

                  },

                  "required": [

                    "mode",

                    "tools"

                  ]

                }

              },

              "required": [

                "type",

                "allowed_tools"

              ]

            }

          ]

        }

      ]

    },

    "tools": {

      "type": "array",

      "description": "A list of tools the model may call.",

      "items": {

        "oneOf": [

          {

            "type": "object",

            "properties": {

              "type": {

                "type": "string",

                "enum": [

                  "function"

                ]

              },

              "function": {

                "type": "object",

                "properties": {

                  "name": {

                    "type": "string",

                    "description": "The name of the function to be called."

                  },

                  "description": {

                    "type": "string",

                    "description": "A description of what the function does."

                  },

                  "parameters": {

                    "type": "object",

                    "description": "The parameters the function accepts, described as a JSON Schema object."

                  },

                  "strict": {

                    "anyOf": [

                      {

                        "type": "boolean"

                      },

                      {

                        "type": "null"

                      }

                    ],

                    "default": false,

                    "description": "Whether to enable strict schema adherence."

                  }

                },

                "required": [

                  "name"

                ]

              }

            },

            "required": [

              "type",

              "function"

            ]

          },

          {

            "type": "object",

            "properties": {

              "type": {

                "type": "string",

                "enum": [

                  "custom"

                ]

              },

              "custom": {

                "type": "object",

                "properties": {

                  "name": {

                    "type": "string"

                  },

                  "description": {

                    "type": "string"

                  },

                  "format": {

                    "oneOf": [

                      {

                        "type": "object",

                        "properties": {

                          "type": {

                            "type": "string",

                            "enum": [

                              "text"

                            ]

                          }

                        },

                        "required": [

                          "type"

                        ]

                      },

                      {

                        "type": "object",

                        "properties": {

                          "type": {

                            "type": "string",

                            "enum": [

                              "grammar"

                            ]

                          },

                          "grammar": {

                            "type": "object",

                            "properties": {

                              "definition": {

                                "type": "string"

                              },

                              "syntax": {

                                "type": "string",

                                "enum": [

                                  "lark",

                                  "regex"

                                ]

                              }

                            },

                            "required": [

                              "definition",

                              "syntax"

                            ]

                          }

                        },

                        "required": [

                          "type",

                          "grammar"

                        ]

                      }

                    ]

                  }

                },

                "required": [

                  "name"

                ]

              }

            },

            "required": [

              "type",

              "custom"

            ]

          }

        ]

      }

    },

    "top_p": {

      "anyOf": [

        {

          "type": "number",

          "minimum": 0,

          "maximum": 1

        },

        {

          "type": "null"

        }

      ],

      "default": 1,

      "description": "Nucleus sampling: considers the results of the tokens with top_p probability mass."

    },

    "user": {

      "type": "string",

      "description": "A unique identifier representing your end-user, for abuse monitoring."

    },

    "web_search_options": {

      "anyOf": [

        {

          "type": "object",

          "description": "Options for the web search tool (when using built-in web search).",

          "properties": {

            "search_context_size": {

              "type": "string",

              "enum": [

                "low",

                "medium",

                "high"

              ],

              "default": "medium"

            },

            "user_location": {

              "type": "object",

              "properties": {

                "type": {

                  "type": "string",

                  "enum": [

                    "approximate"

                  ]

                },

                "approximate": {

                  "type": "object",

                  "properties": {

                    "city": {

                      "type": "string"

                    },

                    "country": {

                      "type": "string"

                    },

                    "region": {

                      "type": "string"

                    },

                    "timezone": {

                      "type": "string"

                    }

                  }

                }

              },

              "required": [

                "type",

                "approximate"

              ]

            }

          }

        }

      ]

    },

    "function_call": {

      "anyOf": [

        {

          "type": "string",

          "enum": [

            "none",

            "auto"

          ]

        },

        {

          "type": "object",

          "properties": {

            "name": {

              "type": "string"

            }

          },

          "required": [

            "name"

          ]

        }

      ]

    },

    "functions": {

      "type": "array",

      "items": {

        "type": "object",

        "properties": {

          "name": {

            "type": "string",

            "description": "The name of the function to be called."

          },

          "description": {

            "type": "string",

            "description": "A description of what the function does."

          },

          "parameters": {

            "type": "object",

            "description": "The parameters the function accepts, described as a JSON Schema object."

          },

          "strict": {

            "anyOf": [

              {

                "type": "boolean"

              },

              {

                "type": "null"

              }

            ],

            "default": false,

            "description": "Whether to enable strict schema adherence."

          }

        },

        "required": [

          "name"

        ]

      },

      "minItems": 1,

      "maxItems": 128

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
