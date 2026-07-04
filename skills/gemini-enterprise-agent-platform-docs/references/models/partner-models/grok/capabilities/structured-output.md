Structured outputs enable a model to generate output that always adheres to a
specific schema. For example, a model may be provided with a response schema to
ensure that the response produces valid JSON. Grok models available on the
Gemini Enterprise Agent Platform Model as a Service (MaaS) support structured outputs.

For more conceptual information about the structured output capability, see
[Introduction to structured output](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/multimodal/control-generated-output).

## Use structured outputs with the Responses API

> [!NOTE]
> **Note:** Setting `store` to `true` and the `previous_response_id` parameter for stateful API calls are not supported for Grok models at this time, and `store` defaults to `false`. Support is planned for an upcoming release. When support is added, the default behavior will change to `store: true`, and `previous_response_id` will be enabled. If you want to prevent your responses from being stored after this change, explicitly set `store` to `false` (or `False` in Python) in your requests.

The following templates show how to use structured outputs with the Responses API:

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
    input="INPUT",
    text={
        "format": {
            "type": "json_schema",
            "name": "SCHEMA_NAME",
            "strict": True,
            "schema": JSON_SCHEMA
        }
    },
    stream=False,
)
print(response)
```

- <var class="edit" scope="MODEL" translate="no">MODEL</var>: The model name you want to use, for example `xai/grok-4.20-reasoning`.
- <var class="edit" scope="INPUT" translate="no">INPUT</var>: The prompt or input for the model.
- <var class="edit" scope="SCHEMA_NAME" translate="no">SCHEMA_NAME</var>: A name for the response schema.
- <var class="edit" scope="JSON_SCHEMA" translate="no">JSON_SCHEMA</var>: A dictionary that defines the JSON schema, for example:
  `{"type": "object", "properties": {"name": {"type": "string"}, "age": {"type": "integer"}}, "required": ["name", "age"], "additionalProperties": False}`

### REST

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your Google Cloud project ID.
- <var class="edit" scope="MODEL" translate="no">MODEL</var>: The model name you want to use, for example `xai/grok-4.20-reasoning`.
- <var class="edit" scope="INPUT" translate="no">INPUT</var>: The prompt or input for the model.
- <var class="edit" scope="SCHEMA_NAME" translate="no">SCHEMA_NAME</var>: A name for the response schema.
- <var class="edit" scope="JSON_SCHEMA" translate="no">JSON_SCHEMA</var>: A JSON schema object that defines the structure of the output.

HTTP method and URL:

```
POST https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/endpoints/openapi/responses
```

Request JSON body:

```
{
  "model": "MODEL",
  "input": "INPUT",
  "text": {
    "format": {
      "type": "json_schema",
      "name": "SCHEMA_NAME",
      "strict": true,
      "schema": JSON_SCHEMA
    }
  },
  "stream": false
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

The following samples show a complete example of using structured outputs with the Responses API:

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
    input="Extract: John Doe is 30.",
    text={
        "format": {
            "type": "json_schema",
            "name": "person_info",
            "strict": True,
            "schema": {
                "type": "object",
                "properties": {
                    "name": {"type": "string"},
                    "age": {"type": "integer"}
                },
                "required": ["name", "age"],
                "additionalProperties": False
            }
        }
    },
    stream=False,
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
  "input": "Extract: John Doe is 30.",
  "text": {
    "format": {
      "type": "json_schema",
      "name": "person_info",
      "strict": true,
      "schema": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "age": {
            "type": "integer"
          }
        },
        "required": [
          "name",
          "age"
        ],
        "additionalProperties": false
      }
    }
  },
  "stream": false
}'
```

- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your Google Cloud project ID.

#### Example Response

The following is an example of what the model output could look like:

    {
      "background": false,
      "completed_at": 1779159186,
      "created_at": 1779159184,
      "error": null,
      "frequency_penalty": 0,
      "id": "kNALat3NENmDifEP14TQ8Qk",
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
          "content": [
            {
              "annotations": [],
              "logprobs": [],
              "text": "**Extracted Information:**\n\n- **Name:** John Doe\n- **Age:** 30\n\n**Structured output:**\n```json\n{\n  \"name\": \"John Doe\",\n  \"age\": 30\n}\n```",
              "type": "output_text"
            }
          ],
          "id": "msg_kNALat3NENmDifEP14TQ8Qk",
          "role": "assistant",
          "status": "completed",
          "type": "message"
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
      "tools": [],
      "top_logprobs": 0,
      "top_p": 0.95,
      "truncation": "disabled",
      "usage": {
        "extra_properties": {
          "google": {
            "traffic_type": "ON_DEMAND"
          }
        },
        "input_tokens": 343,
        "input_tokens_details": {
          "cached_tokens": 0
        },
        "num_server_side_tools_used": 0,
        "num_sources_used": 0,
        "output_tokens": 369,
        "output_tokens_details": {
          "reasoning_tokens": 325
        },
        "total_tokens": 712
      },
      "user": null
    }

## Use structured outputs with Chat Completions API

The following use case sets a response schema that ensures that the model output
is a JSON object with the following properties: name, date, and participants.
The Python code uses the OpenAI SDK and Pydantic objects to generate the JSON
schema.

    from pydantic import BaseModel
    from openai import OpenAI

    client = OpenAI()

    class CalendarEvent(BaseModel):
        name: str
        date: str
        participants: list[str]

    completion = client.beta.chat.completions.parse(
        model="MODEL_NAME",
        messages=[
            {"role": "system", "content": "Extract the event information."},
            {"role": "user", "content": "Alice and Bob are going to a science fair on Friday."},
        ],
        response_format=CalendarEvent,
    )

    print(completion.choices[0].message.parsed)

> [!NOTE]
> **Note:** The response has a `CalendarEvent` object, which is populated with the defined fields. The model outputs JSON, which the SDK parses into a Pydantic object.

The model output will adhere to the following JSON schema:

    { "name": STRING, "date": STRING, "participants": [STRING] }

When provided the prompt, "Alice and Bob are going to a science fair on Friday",
the model could produce the following response:

    {
      "name": "science fair",
      "date": "Friday",
      "participants": [
        "Alice",
        "Bob"
      ]
    }

### Detailed example

The following code is an example of a recursive schema. The `UI` class contains
a list of `children`, which can also be of the `UI` class.

    from pydantic import BaseModel
    from openai import OpenAI
    from enum import Enum
    from typing import List

    client = OpenAI()

    class UIType(str, Enum):
      div = "div"
      button = "button"
      header = "header"
      section = "section"
      field = "field"
      form = "form"

    class Attribute(BaseModel):
      name: str
      value: str

    class UI(BaseModel):
      type: UIType
      label: str
      children: List["UI"]
      attributes: List[Attribute]

    UI.model_rebuild() # This is required to enable recursive types

    class Response(BaseModel):
      ui: UI

    completion = client.beta.chat.completions.parse(
      model="MODEL_NAME",
      messages=[
        {"role": "system", "content": "You are a UI generator AI. Convert the user input into a UI."},
        {"role": "user", "content": "Make a User Profile Form"}
      ],
      response_format=Response,
    )

    print(completion.choices[0].message.parsed)

The model output will adhere to the schema of the Pydantic object specified in
the previous snippet. In this example, the model could generate the following UI
form:

    Form
      Input
        Name
        Email
        Age

A response could look like the following:

    ui = UI(
        type=UIType.div,
        label='Form',
        children=[
            UI(
                type=UIType.div,
                label='Input',
                children=[],
                attributes=[
                    Attribute(name='label', value='Name')
                ]
            ),
            UI(
                type=UIType.div,
                label='Input',
                children=[],
                attributes=[
                    Attribute(name='label', value='Email')
                ]
            ),
            UI(
                type=UIType.div,
                label='Input',
                children=[],
                attributes=[
                    Attribute(name='label', value='Age')
                ]
            )
        ],
        attributes=[
            Attribute(name='name', value='John Doe'),
            Attribute(name='email', value='john.doe@example.com'),
            Attribute(name='age', value='30')
        ]
    )

### Get JSON object responses

You can constrain the model to output only syntactically valid JSON objects by
setting the `response_format` field to `{ "type": "json_object" }`. This is
often called *JSON mode*. JSON mode is is useful when generating JSON for use
with function calling or other downstream tasks that require JSON input.

When JSON mode is enabled, the model is constrained to only generate strings
that parse into valid JSON objects. While this mode ensures the output is
syntactically correct JSON, it does not enforce any specific schema. To
ensure the model outputs JSON that follows a specific schema, you must
include instructions in the prompt, as shown in the following example.

The following samples show how to enable JSON mode and instruct the model to
return a JSON object with a specific structure:

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
  response_format={ "type": "json_object" },
  messages=[
    {"role": "user", "content": "List 5 rivers in South America. Your response must be a JSON object with a single key "rivers", which has a list of strings as its value."},
  ]
)
print(response.choices[0].message.content)
```

Replace `MODEL` with the model name you want to use,
for example `xai/grok-4.1-fast-reasoning`.

#### Example output

```
{
  "rivers": [
    "Amazon River",
    "Paraná River",
    "Orinoco River",
    "São Francisco River",
    "Magdalena River"
  ]
}
```

### REST

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your Google Cloud project ID.
- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: A region that supports Grok models.
- <var class="edit" scope="MODEL" translate="no">MODEL</var>: The model name you want to use, for example `xai/grok-4.1-fast-reasoning`.

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/endpoints/openapi/chat/completions
```

Request JSON body:

```
{
  "model": "MODEL",
  "response_format": {
    "type": "json_object"
  },
  "messages": [
    {
      "role": "user",
      "content": "List 5 rivers in South America. Your response must be a JSON object with a single key \"rivers\", which has a list of strings as its value."
    }
  ]
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

You should receive a JSON response similar to the following.

#### Response

```
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "logprobs": null,
      "message": {
        "content": "{\n  \"rivers\": [\n    \"Amazon River\",\n    \"Paraná River\",\n    \"Orinoco River\",\n    \"São Francisco River\",\n    \"Magdalena River\"\n  ]\n}",
        "role": "assistant"
      }
    }
  ],
  "created": 1721860000,
  "id": "123456789",
  "model": "xai/grok-4.1-fast-reasoning",
  "object": "chat.completion",
  "system_fingerprint": "12345",
  "usage": {
    "completion_tokens": 54,
    "prompt_tokens": 46,
    "total_tokens": 100
  }
}
```

## What's next

- Learn about [Function calling](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/grok/capabilities/function-calling).
- Learn about [Reasoning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/grok/capabilities/reasoning).
