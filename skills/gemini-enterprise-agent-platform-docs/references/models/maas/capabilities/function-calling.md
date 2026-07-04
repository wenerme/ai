Function calling lets you define custom functions and provide LLMs with the
capability to call them to retrieve real-time information or interact with
external systems like SQL databases or customer service tools.

For more conceptual information about function calling, see
[Introduction to function calling](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/function-calling).

## Use function calling

The following samples show how to use function calling.

### Python

Before trying this sample, follow the Python setup instructions in the
[Agent Platform quickstart using
client libraries](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/client-libraries).

To authenticate to Agent Platform, set up Application Default Credentials.
For more information, see

[Set up authentication for a local development environment](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

Before running this sample, make sure to set the `OPENAI_BASE_URL` environment variable.
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

- <var class="edit" scope="MODEL" translate="no">MODEL</var>: The model name you want to use, for example `qwen/qwen3-next-80b-a3b-instruct-maas`.
- <var class="edit" scope="CONTENT" translate="no">CONTENT</var>: The user prompt to send to the model.
- <var class="edit" scope="FUNCTION_NAME" translate="no">FUNCTION_NAME</var>: The name of the function to call.
- <var class="edit" scope="FUNCTION_DESCRIPTION" translate="no">FUNCTION_DESCRIPTION</var>: A description of the function.
- <var class="edit" scope="PARAMETERS_OBJECT" translate="no">PARAMETERS_OBJECT</var>: A dictionary that defines the function parameters, for example:
  `{"type": "object", "properties": {"location": {"type": "string", "description": "The city and state"}}, "required": ["location"]}`

### REST

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your Google Cloud project ID.
- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: A region that supports open models.
- <var class="edit" scope="MODEL" translate="no">MODEL</var>: The model name you want to use, for example `qwen/qwen3-next-80b-a3b-instruct-maas`.
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
  model="qwen/qwen3-next-80b-a3b-instruct-maas",
  messages=[
    {
      "role": "user",
      "content": "Which city has a higher temperature, Boston or new Delhi and by how much in F?"
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
  "model": "qwen/qwen3-next-80b-a3b-instruct-maas",
  "messages": [
    {
      "role": "user",
      "content": "Which city has a higher temperature, Boston or new Delhi and by how much in F?"
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
 "model": "qwen/qwen3-next-80b-a3b-instruct-maas",
 "object": "chat.completion",
 "system_fingerprint": "",
 "usage": {
  "completion_tokens": 66,
  "prompt_tokens": 217,
  "total_tokens": 283
 }
}
```

## Model-specific guidance

The following sections provide model-specific guidance for function
calling.

### DeepSeek

DeepSeek models don't perform as well on function calling if you use a system
prompt. For optimal performance, omit the system prompt when using function
calling with DeepSeek models.

### Llama

`meta/llama3-405b-instruct-maas` doesn't support `tool_choice = 'required'`.

### OpenAI

When using `openai/gpt-oss-120b-instruct-maas` and
`openai/gpt-oss-20b-instruct-maas`, place your tool definitions in the
system prompt for optimal performance. For example:

```json
{"messages": [
    {"role": "system", "content": "You are a helpful assistant with access to the following functions. Use them if required:\n..."},
    {"role": "user", "content": "What's the weather like in Boston?"},
    ...
]}
```

These models don't support `tool_choice = 'required'` or named tool calling.

### Qwen

Qwen models perform best when `tool_choice` is explicitly set to `auto` or
`none`. If `tool_choice` is unset, the model might not perform as
well.

## What's next

- Learn about [Structured output](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/capabilities/structured-output).
- Learn about [Thinking](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/capabilities/thinking).
- Learn about [Batch predictions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/capabilities/batch-prediction).
