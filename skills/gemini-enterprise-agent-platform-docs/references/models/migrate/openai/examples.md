> [!NOTE]
> To see an example of using the Chat Completions API,
> run the "Call Gemini with the OpenAI Library" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/chat-completions/intro_chat_completions_api.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fchat-completions%2Fintro_chat_completions_api.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/chat-completions/intro_chat_completions_api.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/chat-completions/intro_chat_completions_api.ipynb)

## Call Gemini with the Chat Completions API

The following sample shows you how to send non-streaming requests:

### REST

```bash
  curl -X POST \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
  https://${LOCATION}-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/${LOCATION}/endpoints/openapi/chat/completions \
  -d '{
    "model": "google/${MODEL_ID}",
    "messages": [{
      "role": "user",
      "content": "Write a story about a magic backpack."
    }]
  }'

```

### Python

Before trying this sample, follow the Python setup instructions in the
[Agent Platform quickstart using
client libraries](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/client-libraries).

To authenticate to Agent Platform, set up Application Default Credentials.
For more information, see

[Set up authentication for a local development environment](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

    from google.auth import default
    import google.auth.transport.requests

    import openai

    # TODO(developer): Update and un-comment below lines
    # project_id = "PROJECT_ID"
    # location = "us-central1"

    # Programmatically get an access token
    credentials, _ = default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
    credentials.refresh(google.auth.transport.requests.Request())

    # OpenAI Client
    client = openai.OpenAI(
        base_url=f"https://{location}-aiplatform.googleapis.com/v1/projects/{project_id}/locations/{location}/endpoints/openapi",
        api_key=credentials.token,
    )

    response = client.chat.completions.create(
        model="google/gemini-2.0-flash-001",
        messages=[{"role": "user", "content": "Why is the sky blue?"}],
    )

    print(response)

The following sample shows you how to send streaming requests to a
Gemini model by using the Chat Completions API:

### REST

```bash
  curl -X POST \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
  https://${LOCATION}-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/${LOCATION}/endpoints/openapi/chat/completions \
  -d '{
    "model": "google/${MODEL_ID}",
    "stream": true,
    "messages": [{
      "role": "user",
      "content": "Write a story about a magic backpack."
    }]
  }'

```

### Python

Before trying this sample, follow the Python setup instructions in the
[Agent Platform quickstart using
client libraries](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/client-libraries).

To authenticate to Agent Platform, set up Application Default Credentials.
For more information, see

[Set up authentication for a local development environment](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

    from google.auth import default
    import google.auth.transport.requests

    import openai

    # TODO(developer): Update and un-comment below lines
    # project_id = "PROJECT_ID"
    # location = "us-central1"

    # Programmatically get an access token
    credentials, _ = default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
    credentials.refresh(google.auth.transport.requests.Request())

    # OpenAI Client
    client = openai.OpenAI(
        base_url=f"https://{location}-aiplatform.googleapis.com/v1/projects/{project_id}/locations/{location}/endpoints/openapi",
        api_key=credentials.token,
    )

    response = client.chat.completions.create(
        model="google/gemini-2.0-flash-001",
        messages=[{"role": "user", "content": "Why is the sky blue?"}],
        stream=True,
    )
    for chunk in response:
        print(chunk)

### Send a prompt and an image to the Gemini API

### Python

Before trying this sample, follow the Python setup instructions in the
[Agent Platform quickstart using
client libraries](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/client-libraries).

To authenticate to Agent Platform, set up Application Default Credentials.
For more information, see

[Set up authentication for a local development environment](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

    from google.auth import default
    import google.auth.transport.requests

    import openai

    # TODO(developer): Update and un-comment below lines
    # project_id = "PROJECT_ID"
    # location = "us-central1"

    # Programmatically get an access token
    credentials, _ = default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
    credentials.refresh(google.auth.transport.requests.Request())

    # OpenAI Client
    client = openai.OpenAI(
        base_url=f"https://{location}-aiplatform.googleapis.com/v1/projects/{project_id}/locations/{location}/endpoints/openapi",
        api_key=credentials.token,
    )

    response = client.chat.completions.create(
        model="google/gemini-2.0-flash-001",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "Describe the following image:"},
                    {
                        "type": "image_url",
                        "image_url": "gs://cloud-samples-data/generative-ai/image/scones.jpg",
                    },
                ],
            }
        ],
    )

    print(response)

## Call a self-deployed model with the Chat Completions API

The following sample shows you how to send non-streaming requests:

### REST

```bash
  curl -X POST \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
  https://aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/global/endpoints/${ENDPOINT}/chat/completions \
  -d '{
    "messages": [{
      "role": "user",
      "content": "Write a story about a magic backpack."
    }]
  }'
```

### Python

Before trying this sample, follow the Python setup instructions in the
[Agent Platform quickstart using
client libraries](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/client-libraries).

To authenticate to Agent Platform, set up Application Default Credentials.
For more information, see

[Set up authentication for a local development environment](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

    from google.auth import default
    import google.auth.transport.requests

    import openai

    # TODO(developer): Update and un-comment below lines
    # project_id = "PROJECT_ID"
    # location = "us-central1"
    # model_id = "gemma-2-9b-it"
    # endpoint_id = "YOUR_ENDPOINT_ID"

    # Programmatically get an access token
    credentials, _ = default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
    credentials.refresh(google.auth.transport.requests.Request())

    # OpenAI Client
    client = openai.OpenAI(
        base_url=f"https://{location}-aiplatform.googleapis.com/v1/projects/{project_id}/locations/{location}/endpoints/{endpoint_id}",
        api_key=credentials.token,
    )

    response = client.chat.completions.create(
        model=model_id,
        messages=[{"role": "user", "content": "Why is the sky blue?"}],
    )
    print(response)

The following sample shows you how to send streaming requests to a
self-deployed model by using the Chat Completions API:

### REST

```bash
    curl -X POST \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json" \
    https://aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/global/endpoints/${ENDPOINT}/chat/completions \
    -d '{
      "stream": true,
      "messages": [{
        "role": "user",
        "content": "Write a story about a magic backpack."
      }]
    }'

```

### Python

Before trying this sample, follow the Python setup instructions in the
[Agent Platform quickstart using
client libraries](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/client-libraries).

To authenticate to Agent Platform, set up Application Default Credentials.
For more information, see

[Set up authentication for a local development environment](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

    from google.auth import default
    import google.auth.transport.requests

    import openai

    # TODO(developer): Update and un-comment below lines
    # project_id = "PROJECT_ID"
    # location = "us-central1"
    # model_id = "gemma-2-9b-it"
    # endpoint_id = "YOUR_ENDPOINT_ID"

    # Programmatically get an access token
    credentials, _ = default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
    credentials.refresh(google.auth.transport.requests.Request())

    # OpenAI Client
    client = openai.OpenAI(
        base_url=f"https://{location}-aiplatform.googleapis.com/v1/projects/{project_id}/locations/{location}/endpoints/{endpoint_id}",
        api_key=credentials.token,
    )

    response = client.chat.completions.create(
        model=model_id,
        messages=[{"role": "user", "content": "Why is the sky blue?"}],
        stream=True,
    )
    for chunk in response:
        print(chunk)

## `extra_body` examples

You can use either the SDK or the REST API to pass in `extra_body`.

### Add `thought_tag_marker`

    {
      ...,
      "extra_body": {
         "google": {
           ...,
           "thought_tag_marker": "..."
         }
       }
    }

### Add `extra_body` using the SDK

    client.chat.completions.create(
      ...,
      extra_body = {
        'extra_body': { 'google': { ... } }
      },
    )

## `extra_content` examples

You can populate this field by using the REST API directly.

### `extra_content` with string `content`

    {
      "messages": [
        { "role": "...", "content": "...", "extra_content": { "google": { ... } } }
      ]
    }

### Per-message `extra_content`

    {
      "messages": [
        {
          "role": "...",
          "content": [
            { "type": "...", ..., "extra_content": { "google": { ... } } }
          ]
        }
    }

### Per-tool call `extra_content`

    {
      "messages": [
        {
          "role": "...",
          "tool_calls": [
            {
              ...,
              "extra_content": { "google": { ... } }
            }
          ]
        }
      ]
    }

## Sample `curl` requests

You can use these `curl` requests directly, rather than going through the SDK.

#### Use `thinking_config` with `extra_body`

    curl -X POST \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json" \
      https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/us-central1/endpoints/openapi/chat/completions \
      -d '{ \
        "model": "google/gemini-2.5-flash-preview-04-17", \
        "messages": [ \
          { "role": "user", \
          "content": [ \
            { "type": "text", \
              "text": "Are there any primes number of the form n*ceil(log(n))" \
            }] }], \
        "extra_body": { \
          "google": { \
              "thinking_config": { \
              "include_thoughts": true, "thinking_budget": 10000 \
            }, \
            "thought_tag_marker": "think" } }, \
        "stream": true }'

#### Use `stream_function_call_arguments`

Example request:

    curl -X POST \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json" \
      https://aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/global/endpoints/openapi/chat/completions \
      -d '{
      "model": "google/gemini-3.1-pro-preview", \
      "messages": [ \
        { "role": "user", "content": "What is the weather like in Boston and New Delhi today?" } ], \
      "tools": [ \
        { \
          "type": "function", \
          "function": { \
            "name": "get_current_weather", \
            "description": "Get the current weather in a given location", \
            "parameters": { \
              "type": "object", \
              "properties": { \
                "location": { \
                  "type": "string", \
                  "description": "The city and state, e.g. San Francisco, CA" \
                }, \
                "unit": { \
                  "type": "string", \
                  "enum": [ \
                    "celsius", \
                    "fahrenheit" \
                  ] \
                } \
              }, \
              "required": [ \
                "location", \
                "unit" \
              ] \
            } \
          } \
        } \
      ], \
      "extra_body": { \
        "google": { \
          "stream_function_call_arguments": true \
        } \
      }, \
      "stream": true \
    }'

Example responses:

    data: {"choices":[{"delta":{"role":"assistant","tool_calls":[{"extra_content":{"google":{"thought_signature":"..."}},"function":{"arguments":"","name":"get_current_weather"},"id":"function-call-c855348a-459a-46a4-a8ad-aa0a4e7c3563","index":1,"type":"function"}]},"index":0,"logprobs":null}],"created":1770850461,"id":"nQiNafGyF5rw998PstqooAY","model":"google/gemini-3.1-pro-preview","object":"chat.completion.chunk","system_fingerprint":""}

    data: {"choices":[{"delta":{"role":"assistant","tool_calls":[{"function":{"arguments":"{\"location\":\"Boston, MA","name":"get_current_weather"},"id":"function-call-c855348a-459a-46a4-a8ad-aa0a4e7c3563","index":0,"type":"function"}]},"index":0,"logprobs":null}],"created":1770850461,"id":"nQiNafGyF5rw998PstqooAY","model":"google/gemini-3.1-pro-preview","object":"chat.completion.chunk","system_fingerprint":""}

    data: {"choices":[{"delta":{"role":"assistant","tool_calls":[{"function":{"arguments":"\"","name":"get_current_weather"},"id":"function-call-c855348a-459a-46a4-a8ad-aa0a4e7c3563","index":0,"type":"function"}]},"index":0,"logprobs":null}],"created":1770850461,"id":"nQiNafGyF5rw998PstqooAY","model":"google/gemini-3.1-pro-preview","object":"chat.completion.chunk","system_fingerprint":""}

    data: {"choices":[{"delta":{"role":"assistant","tool_calls":[{"function":{"arguments":",\"unit\":\"celsius","name":"get_current_weather"},"id":"function-call-c855348a-459a-46a4-a8ad-aa0a4e7c3563","index":0,"type":"function"}]},"index":0,"logprobs":null}],"created":1770850461,"id":"nQiNafGyF5rw998PstqooAY","model":"google/gemini-3.1-pro-preview","object":"chat.completion.chunk","system_fingerprint":""}

    data: {"choices":[{"delta":{"role":"assistant","tool_calls":[{"function":{"arguments":"\"","name":"get_current_weather"},"id":"function-call-c855348a-459a-46a4-a8ad-aa0a4e7c3563","index":0,"type":"function"}]},"index":0,"logprobs":null}],"created":1770850461,"id":"nQiNafGyF5rw998PstqooAY","model":"google/gemini-3.1-pro-preview","object":"chat.completion.chunk","system_fingerprint":""}

    data: {"choices":[{"delta":{"role":"assistant","tool_calls":[{"function":{"arguments":"}","name":"get_current_weather"},"id":"function-call-c855348a-459a-46a4-a8ad-aa0a4e7c3563","index":0,"type":"function"}]},"index":0,"logprobs":null}],"created":1770850461,"id":"nQiNafGyF5rw998PstqooAY","model":"google/gemini-3.1-pro-preview","object":"chat.completion.chunk","system_fingerprint":""}

    data: {"choices":[{"delta":{"role":"assistant","tool_calls":[{"function":{"arguments":"","name":"get_current_weather"},"id":"function-call-df0d087c-ad74-46f1-ba4a-9353cbf288a8","index":0,"type":"function"}]},"index":0,"logprobs":null}],"created":1770850461,"id":"nQiNafGyF5rw998PstqooAY","model":"google/gemini-3.1-pro-preview","object":"chat.completion.chunk","system_fingerprint":""}

    data: {"choices":[{"delta":{"role":"assistant","tool_calls":[{"function":{"arguments":"{\"location\":\"New Delhi, India","name":"get_current_weather"},"id":"function-call-df0d087c-ad74-46f1-ba4a-9353cbf288a8","index":1,"type":"function"}]},"index":0,"logprobs":null}],"created":1770850461,"id":"nQiNafGyF5rw998PstqooAY","model":"google/gemini-3.1-pro-preview","object":"chat.completion.chunk","system_fingerprint":""}

    data: {"choices":[{"delta":{"role":"assistant","tool_calls":[{"function":{"arguments":"\"","name":"get_current_weather"},"id":"function-call-df0d087c-ad74-46f1-ba4a-9353cbf288a8","index":1,"type":"function"}]},"index":0,"logprobs":null}],"created":1770850461,"id":"nQiNafGyF5rw998PstqooAY","model":"google/gemini-3.1-pro-preview","object":"chat.completion.chunk","system_fingerprint":""}

    data: {"choices":[{"delta":{"role":"assistant","tool_calls":[{"function":{"arguments":",\"unit\":\"celsius","name":"get_current_weather"},"id":"function-call-df0d087c-ad74-46f1-ba4a-9353cbf288a8","index":1,"type":"function"}]},"index":0,"logprobs":null}],"created":1770850461,"id":"nQiNafGyF5rw998PstqooAY","model":"google/gemini-3.1-pro-preview","object":"chat.completion.chunk","system_fingerprint":""}

    data: {"choices":[{"delta":{"role":"assistant","tool_calls":[{"function":{"arguments":"\"","name":"get_current_weather"},"id":"function-call-df0d087c-ad74-46f1-ba4a-9353cbf288a8","index":1,"type":"function"}]},"index":0,"logprobs":null}],"created":1770850461,"id":"nQiNafGyF5rw998PstqooAY","model":"google/gemini-3.1-pro-preview","object":"chat.completion.chunk","system_fingerprint":""}

    data: {"choices":[{"delta":{"role":"assistant","tool_calls":[{"function":{"arguments":"}","name":"get_current_weather"},"id":"function-call-df0d087c-ad74-46f1-ba4a-9353cbf288a8","index":1,"type":"function"}]},"finish_reason":"tool_calls","index":0,"logprobs":null}],"created":1770850461,"id":"nQiNafGyF5rw998PstqooAY","model":"google/gemini-3.1-pro-preview","object":"chat.completion.chunk","system_fingerprint":"","usage":{"completion_tokens":45,"completion_tokens_details":{"reasoning_tokens":504},"extra_properties":{"google":{"traffic_type":"PROVISIONED_THROUGHPUT"}},"prompt_tokens":27,"total_tokens":576}}

    data: [DONE]

#### Image generation

To remain compatible with the OpenAI response format, the `audio` field of the response is explicitly populated with an `extra_content.google.mime_type` indicating the mime type of the result.

Example request:

    curl -X POST \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json" \
      https://aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/global/endpoints/openapi/chat/completions \
      -d '{"model":"google/gemini-3-pro-image-preview", "messages":[{ "role": "user", "content": "Generate an image of a cat." }], "modalities": ["image"] }'

Example response:

    {
      "choices": [
        {
          "finish_reason": "stop",
          "index": 0,
          "logprobs": null,
          "message": {
            "audio": {
              "data": "<BASE64_BYTES>",
              "extra_content": {
                "google": {
                  "mime_type": "image/png"
                }
              }
            },
            "content": null,
            "extra_content": {
              "google": {
                "thought_signature": "..."
              }
            },
            "role": "assistant"
          }
        }
      ],
      "created": 1770850692,
      "id": "hAmNaZb8BZOX4_UPlNXoEA",
      "model": "google/gemini-3-pro-image-preview",
      "object": "chat.completion",
      "system_fingerprint": "",
      "usage": {
        "completion_tokens": 1120,
        "completion_tokens_details": {
          "reasoning_tokens": 251
        },
        "extra_properties": {
          "google": {
            "traffic_type": "PROVISIONED_THROUGHPUT"
          }
        },
        "prompt_tokens": 7,
        "total_tokens": 1378
      }
    }

### Multimodal requests

The Chat Completions API supports a variety of multimodal input, including both
audio and video.

#### Use `image_url` to pass in image data

    curl -X POST \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json" \
      https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/us-central1/endpoints/openapi/chat/completions \
      -d '{ \
        "model": "google/gemini-2.0-flash-001", \
        "messages": [{ "role": "user", "content": [ \
          { "type": "text", "text": "Describe this image" }, \
          { "type": "image_url", "image_url": "gs://cloud-samples-data/generative-ai/image/scones.jpg" }] }] }'

#### Use `input_audio` to pass in audio data

    curl -X POST \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json" \
      https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/us-central1/endpoints/openapi/chat/completions \
      -d '{ \
        "model": "google/gemini-2.0-flash-001", \
        "messages": [ \
          { "role": "user", \
            "content": [ \
              { "type": "text", "text": "Describe this: " }, \
              { "type": "input_audio", "input_audio": { \
                "format": "audio/mp3", \
                "data": "gs://cloud-samples-data/generative-ai/audio/pixel.mp3" } }] }] }'

#### Multi-modal function responses

Example request:

    curl -X POST \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json" \
      https://aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/global/endpoints/openapi/chat/completions \
      -d '{ \
        "model": "google/gemini-3.1-pro-preview", \
        "messages": [ \
          { "role": "user", "content": "Show me the green shirt I ordered last month." }, \
          { \
            "role": "assistant", \
            "tool_calls": [ \
              { \
                "extra_content": { \
                  "google": { \
                    "thought_signature": "<THOUGHT_SIGNATURE>" \
                  } \
                }, \
                "function": { \
                  "arguments": "{\"item_name\":\"green shirt\"}", \
                  "name": "get_image" \
                }, \
                "id": "function-call-a350228d-0283-4792-8bfa-40da064fb959", \
                "type": "function" \
              } \
            ] \
          }, \
          { \
            "role": "tool", \
            "tool_call_id": "function-call-a350228d-0283-4792-8bfa-40da064fb959", \
            "content": "{\"image_ref\":{\"$ref\":\"dress.jpg\"}}", \
            "extra_content": { \
              "google": { \
                "parts": [ \
                  { \
                    "file_data": { \
                      "mime_type": "image/jpg", \
                      "display_name": "dress.jpg", \
                      "file_uri": "gs://cloud-samples-data/generative-ai/image/dress.jpg" \
                    } \
                  } \
                ] \
              } \
            } \
          } \
        ], \
        "tools": [ \
          { \
            "type": "function", \
            "function": { \
              "name": "get_image", \
              "description": "Retrieves the image file reference for a specific order item.", \
              "parameters": { \
                "type": "object", \
                "properties": { \
                  "item_name": { \
                    "type": "string", \
                    "description": "The name or description of the item ordered (e.g., 'green shirt')." \
                  } \
                }, \
                "required": [ \
                  "item_name" \
                ] \
              } \
            } \
          } \
        ] \
      }'

Example response:

    {
      "choices": [
        {
          "finish_reason": "stop",
          "index": 0,
          "logprobs": null,
          "message": {
            "content": "Here is the image of the green shirt you ordered.",
            "role": "assistant"
          }
        }
      ],
      "created": 1770852204,
      "id": "bA-NacCPKoae_9MPsNCn6Qc",
      "model": "google/gemini-3.1-pro-preview",
      "object": "chat.completion",
      "system_fingerprint": "",
      "usage": {
        "completion_tokens": 16,
        "extra_properties": {
          "google": {
            "traffic_type": "ON_DEMAND"
          }
        },
        "prompt_tokens": 1139,
        "total_tokens": 1155
      }
    }

## Structured output

You can use the `response_format` parameter to get structured output.

### Example using SDK

    from pydantic import BaseModel
    from openai import OpenAI

    client = OpenAI()

    class CalendarEvent(BaseModel):
        name: str
        date: str
        participants: list[str]

    completion = client.beta.chat.completions.parse(
        model="google/gemini-2.5-flash-preview-04-17",
        messages=[
            {"role": "system", "content": "Extract the event information."},
            {"role": "user", "content": "Alice and Bob are going to a science fair on Friday."},
        ],
        response_format=CalendarEvent,
    )

    print(completion.choices[0].message.parsed)

## Using the global endpoint in OpenAI compatible mode

The following sample shows how to use the global endpoint in OpenAI compatible mode:

### REST

```bash
  curl -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  https://aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/global/endpoints/openapi/chat/completions\
  -d '{ \
    "model": "google/gemini-2.0-flash-001", \
    "messages": [ \
    {"role": "user", \
      "content": "Hello World" \
      }] \
      }'

```

## What's next

- See examples of calling the [Inference API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.endpoints/generateContent) with the OpenAI-compatible syntax.
- See examples of calling the [Function Calling API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/models/function-calling#examples) with OpenAI-compatible syntax.
- Learn more about the [Gemini API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models).
- Learn more about [migrating from Azure OpenAI to the Gemini API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/migrate/migrate-from-azure-to-gemini).
