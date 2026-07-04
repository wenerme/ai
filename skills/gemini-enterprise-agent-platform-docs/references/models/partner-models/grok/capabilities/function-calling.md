Function calling lets you define custom functions and provide LLMs with the
capability to call them to retrieve real-time information or interact with
external systems like SQL databases or customer service tools.

For more conceptual information about function calling, see
[Introduction to function calling](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/function-calling).

## Use function calling with the Responses API

> [!NOTE]
> **Note:** Setting `store` to `true` and the `previous_response_id` parameter for stateful API calls are not supported for Grok models at this time, and `store` defaults to `false`. Support is planned for an upcoming release. When support is added, the default behavior will change to `store: true`, and `previous_response_id` will be enabled. If you want to prevent your responses from being stored after this change, explicitly set `store` to `false` (or `False` in Python) in your requests.

The following templates show how to use function calling with the Responses API:

### Python

Before trying this sample, follow the Python setup instructions in the
[Agent Platform quickstart using
client libraries](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/client-libraries).

To authenticate to Agent Platform, set up Application Default Credentials.
For more information, see

[Set up authentication for a local development environment](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

Before running this sample, make sure to set the `OPENAI_BASE_URL` environment variable or set up oauth credentials.
For more information, see [Authentication and credentials](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/migrate/openai/auth-and-credentials).

```python
from openai import OpenAI
client = OpenAI()

response = client.responses.create(
    model="MODEL",
    input=[
        {"role": "user", "content": "CONTENT"}
    ],
    tools=[
        {
            "type": "function",
            "name": "FUNCTION_NAME",
            "description": "FUNCTION_DESCRIPTION",
            "parameters": PARAMETERS_OBJECT,
        }
    ],
    tool_choice="auto",
)
```

- <var class="edit" scope="MODEL" translate="no">MODEL</var>: The model name you want to use, for example `xai/grok-4.20-reasoning`.
- <var class="edit" scope="CONTENT" translate="no">CONTENT</var>: The user prompt to send to the model.
- <var class="edit" scope="FUNCTION_NAME" translate="no">FUNCTION_NAME</var>: The name of the function to call.
- <var class="edit" scope="FUNCTION_DESCRIPTION" translate="no">FUNCTION_DESCRIPTION</var>: A description of the function.
- <var class="edit" scope="PARAMETERS_OBJECT" translate="no">PARAMETERS_OBJECT</var>: A dictionary that defines the function parameters, for example:
  `{"type": "object", "properties": {"location": {"type": "string", "description": "The city and state"}}, "required": ["location"]}`

### REST

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your Google Cloud project ID.
- <var class="edit" scope="MODEL" translate="no">MODEL</var>: The model name you want to use, for example `xai/grok-4.20-reasoning`.
- <var class="edit" scope="INPUT" translate="no">INPUT</var>: The prompt or input for the model.
- <var class="edit" scope="FUNCTION_NAME" translate="no">FUNCTION_NAME</var>: The name of the function to call.
- <var class="edit" scope="FUNCTION_DESCRIPTION" translate="no">FUNCTION_DESCRIPTION</var>: A description of the function.
- <var class="edit" scope="PARAMETERS_OBJECT" translate="no">PARAMETERS_OBJECT</var>: A JSON object that defines the function parameters.

HTTP method and URL:

```
POST https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/endpoints/openapi/responses
```

Request JSON body:

```
{
  "model": "MODEL",
  "input": [
    {"role": "user", "content": "INPUT"}
  ],
  "tools": [
    {
      "type": "function",
      "name": "FUNCTION_NAME",
      "description": "FUNCTION_DESCRIPTION",
      "parameters": PARAMETERS_OBJECT
    }
  ],
  "tool_choice": "auto"
}
```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/endpoints/openapi/responses"
```

#### PowerShell

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method POST `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/endpoints/openapi/responses" | Select-Object -Expand Content
```

### Example

The following samples show a complete example of using function calling with the Responses API:

### Python

Before trying this sample, follow the Python setup instructions in the
[Agent Platform quickstart using
client libraries](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/client-libraries).

To authenticate to Agent Platform, set up Application Default Credentials.
For more information, see

[Set up authentication for a local development environment](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

Before running this sample, make sure to set the `OPENAI_BASE_URL` environment variable or set up oauth credentials.
For more information, see [Authentication and credentials](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/migrate/openai/auth-and-credentials).

```python
from openai import OpenAI
client = OpenAI()

response = client.responses.create(
    model="xai/grok-4.20-reasoning",
    input=[
        {"role": "user", "content": "What is the temperature in San Francisco?"}
    ],
    tools=[
        {
            "type": "function",
            "name": "get_temperature",
            "description": "Get current temperature for a location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {"type": "string", "description": "City name"},
                    "unit": {"type": "string", "enum": ["celsius", "fahrenheit"], "default": "fahrenheit"}
                },
                "required": ["location"]
            }
        }
    ],
    tool_choice="auto",
)
print(response)
```

### REST

```bash
curl -X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/endpoints/openapi/responses -d \
'{
  "model": "xai/grok-4.20-reasoning",
  "input": [
    {"role": "user", "content": "What is the temperature in San Francisco?"}
  ],
  "tools": [
    {
      "type": "function",
      "name": "get_temperature",
      "description": "Get current temperature for a location",
      "parameters": {
        "type": "object",
        "properties": {
          "location": {"type": "string", "description": "City name"},
          "unit": {"type": "string", "enum": ["celsius", "fahrenheit"], "default": "fahrenheit"}
        },
        "required": ["location"]
      }
    }
  ]
}'
```

- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your Google Cloud project ID.

#### Example Response

The following is an example of what the model output could look like:

    {
      "background": false,
      "completed_at": 1778893466,
      "created_at": 1778893464,
      "error": null,
      "frequency_penalty": 0,
      "id": "mMIHaqfCCIjUmAb_mMIHaqfCCIjUmAb_6LbAAg",
      "incomplete_details": null,
      "instructions": null,
      "max_output_tokens": null,
      "max_tool_calls": null,
      "metadata": {
        "system_fingerprint": "fp_39c5j0a3e9"
      },
      "model": "xai/grok-4.20-reasoning",
      "object": "response",
      "output": [
        {
          "arguments": "{\"location\":\"San Francisco\"}",
          "call_id": "call-81ad585c-9e8d-47bd-85ef-2ced8a8fc898-0",
          "id": "fc_mMIHaqfCCIjUmAb_6LbAAg",
          "name": "get_temperature",
          "status": "completed",
          "type": "function_call"
        }
      ],
      "parallel_tool_calls": true,
      "presence_penalty": 0,
      "previous_response_id": null,
      "prompt_cache_key": null,
      "reasoning": {
        "effort": "medium",
        "summary": "detailed"
      },
      "safety_identifier": null,
      "service_tier": "default",
      "status": "completed",
      "store": true,
      "temperature": 0.7,
      "text": {
        "format": {
          "type": "text"
        }
      },
      "tool_choice": "auto",
      "tools": [
        {
          "description": "Get current temperature for a location",
          "name": "get_temperature",
          "parameters": {
            "properties": {
              "location": {
                "description": "City name",
                "type": "string"
              },
              "unit": {
                "default": "fahrenheit",
                "enum": [
                  "celsius",
                  "fahrenheit"
                ],
                "type": "string"
              }
            },
            "required": [
              "location"
            ],
            "type": "object"
          },
          "strict": false,
          "type": "function"
        }
      ],
      "top_logprobs": 0,
      "top_p": 0.95,
      "truncation": "disabled",
      "usage": {
        "extra_properties": {
          "google": {
            "traffic_type": "ON_DEMAND"
          }
        },
        "input_tokens": 462,
        "input_tokens_details": {
          "cached_tokens": 320
        },
        "num_server_side_tools_used": 0,
        "num_sources_used": 0,
        "output_tokens": 187,
        "output_tokens_details": {
          "reasoning_tokens": 175
        },
        "total_tokens": 649
      },
      "user": null
    }

## Use function calling with Chat Completions API

The following samples show how to use function calling with chat completions.

### Python

Before trying this sample, follow the Python setup instructions in the
[Agent Platform quickstart using
client libraries](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/client-libraries).

To authenticate to Agent Platform, set up Application Default Credentials.
For more information, see

[Set up authentication for a local development environment](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

Before running this sample, make sure to set the `OPENAI_BASE_URL` environment variable or set up oauth credentials.
For more information, see [Authentication and credentials](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/migrate/openai/auth-and-credentials).

```python
from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
  model="MODEL",
  messages=[
    {"role": "user", "content": "CONTENT"}
  ],
  tools=[
    {
      "type": "function",
      "function": {
        "name": "FUNCTION_NAME",
        "description": "FUNCTION_DESCRIPTION",
        "parameters": PARAMETERS_OBJECT,
      }
    }
  ],
  tool_choice="auto",
)
```

- <var class="edit" scope="MODEL" translate="no">MODEL</var>: The model name you want to use, for example `xai/grok-4.1-fast-reasoning`.
- <var class="edit" scope="CONTENT" translate="no">CONTENT</var>: The user prompt to send to the model.
- <var class="edit" scope="FUNCTION_NAME" translate="no">FUNCTION_NAME</var>: The name of the function to call.
- <var class="edit" scope="FUNCTION_DESCRIPTION" translate="no">FUNCTION_DESCRIPTION</var>: A description of the function.
- <var class="edit" scope="PARAMETERS_OBJECT" translate="no">PARAMETERS_OBJECT</var>: A dictionary that defines the function parameters, for example:
  `{"type": "object", "properties": {"location": {"type": "string", "description": "The city and state"}}, "required": ["location"]}`

### REST

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your Google Cloud project ID.
- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: A region that supports Grok models.
- <var class="edit" scope="MODEL" translate="no">MODEL</var>: The model name you want to use, for example `xai/grok-4.1-fast-reasoning`.
- <var class="edit" scope="CONTENT" translate="no">CONTENT</var>: The user prompt to send to the model.
- <var class="edit" scope="FUNCTION_NAME" translate="no">FUNCTION_NAME</var>: The name of the function to call.
- <var class="edit" scope="FUNCTION_DESCRIPTION" translate="no">FUNCTION_DESCRIPTION</var>: A description of the function.
- <var class="edit" scope="PARAMETERS_OBJECT" translate="no">PARAMETERS_OBJECT</var>: A JSON schema object that defines the function parameters, for example:
  `{"type": "object", "properties": {"location": {"type": "string", "description": "The city and state"}}, "required": ["location"]}`

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/endpoints/openapi/chat/completions
```

Request JSON body:

```
{
  "model": "MODEL",
  "messages": [
    {
      "role": "user",
      "content": "CONTENT"
    }
  ],
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "FUNCTION_NAME",
        "description": "FUNCTION_DESCRIPTION",
        "parameters": PARAMETERS_OBJECT
      }
    }
  ],
  "tool_choice": "auto"
}
```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/endpoints/openapi/chat/completions"
```

#### PowerShell

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method POST `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/endpoints/openapi/chat/completions" | Select-Object -Expand Content
```

You should receive a successful status code (2xx) and an empty response.

### Example

The following is the complete output you could expect after using the
`get_current_weather` function to fetch meteorological information.

### Python

```python
from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
  model="xai/grok-4.1-fast-reasoning",
  messages=[
    {
      "role": "user",
      "content": "Which city has a higher temperature, Boston or New Delhi and by how much in F?"
    },
    {
      "role": "assistant",
      "content": "I'll check the current temperatures for Boston and New Delhi in Fahrenheit and compare them. I'll call the weather function for both cities.",
      "tool_calls": [{"function":{"arguments":"{\"location\":\"Boston, MA\",\"unit\":\"fahrenheit\"}","name":"get_current_weather"},"id":"get_current_weather","type":"function"},{"function":{"arguments":"{\"location\":\"New Delhi, India\",\"unit\":\"fahrenheit\"}","name":"get_current_weather"},"id":"get_current_weather","type":"function"}]
    },
    {
      "role": "tool",
      "content": "The temperature in Boston is 75 degrees Fahrenheit.",
      "tool_call_id": "get_current_weather"
    },
    {
      "role": "tool",
      "content": "The temperature in New Delhi is 50 degrees Fahrenheit.",
      "tool_call_id": "get_current_weather"
    }
  ],
  tools=[
    {
      "type": "function",
      "function": {
        "name": "get_current_weather",
        "description": "Get the current weather in a given location",
        "parameters": {
          "type": "object",
          "properties": {
            "location": {
              "type": "string",
              "description": "The city and state, e.g. San Francisco, CA"
            },
            "unit": {
              "type": "string",
              "enum": ["celsius", "fahrenheit"]
            }
          },
          "required": ["location"]
        }
      }
    }
  ],
  tool_choice="auto"
)
```

### curl

```bash
curl -X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
https://us-central1-aiplatform.googleapis.com/v1/projects/sample-project/locations/us-central1/endpoints/openapi/chat/completions -d \
'{
  "model": "xai/grok-4.1-fast-reasoning",
  "messages": [
    {
      "role": "user",
      "content": "Which city has a higher temperature, Boston or New Delhi and by how much in F?"
    },
    {
      "role": "assistant",
      "content": "I'll check the current temperatures for Boston and New Delhi in Fahrenheit and compare them. I'll call the weather function for both cities.",
      "tool_calls": [{"function":{"arguments":"{\"location\":\"Boston, MA\",\"unit\":\"fahrenheit\"}","name":"get_current_weather"},"id":"get_current_weather","type":"function"},{"function":{"arguments":"{\"location\":\"New Delhi, India\",\"unit\":\"fahrenheit\"}","name":"get_current_weather"},"id":"get_current_weather","type":"function"}]
    },
    {
      "role": "tool",
      "content": "The temperature in Boston is 75 degrees Fahrenheit.",
      "tool_call_id": "get_current_weather"
    },
    {
      "role": "tool",
      "content": "The temperature in New Delhi is 50 degrees Fahrenheit.",
      "tool_call_id": "get_current_weather"
    }
  ],
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_current_weather",
        "description": "Get the current weather in a given location",
        "parameters": {
          "type": "object",
          "properties": {
            "location": {
              "type": "string",
              "description": "The city and state, e.g. San Francisco, CA"
            },
            "unit": {
              "type": "string",
              "enum": ["celsius", "fahrenheit"]
            }
          },
          "required": ["location"]
        }
      }
    }
  ],
  "tool_choice": "auto"
}'
```
After receiving the information retrieved through the calling the external \`get_current_weather\` function, the model can synthesize the information from the two \`tool\` responses and answer the user's question. The following is an example of what that model output could look like:

```json
{
 "choices": [
  {
   "finish_reason": "stop",
   "index": 0,
   "logprobs": null,
   "message": {
    "content": "Based on the current weather data:\n\n- **Boston, MA**: 75°F
    \n- **New Delhi, India**: 50°F  \n\n**Comparison**:
    \nBoston is **25°F warmer** than New Delhi.  \n\n**Answer**:
    \nBoston has a higher temperature than New Delhi by 25 degrees Fahrenheit.",
    "role": "assistant"
   }
  }
 ],
 "created": 1750450289,
 "id": "2025-06-20|13:11:29.240295-07|6.230.75.101|-987540014",
 "model": "xai/grok-4.1-fast-reasoning",
 "object": "chat.completion",
 "system_fingerprint": "",
 "usage": {
  "completion_tokens": 66,
  "prompt_tokens": 217,
  "total_tokens": 283
 }
}
```

## What's next

- Learn about [Structured output](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/grok/capabilities/structured-output).
- Learn about [Reasoning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/grok/capabilities/reasoning).
