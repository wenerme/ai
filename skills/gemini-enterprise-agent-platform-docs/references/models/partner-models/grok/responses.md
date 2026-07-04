## Make a non-streaming call to the Responses API

The following samples show how to make a non-streaming call to the Responses API:

### Python

Before trying this sample, follow the Python setup instructions in the
Agent Platform quickstart using
client libraries.

To authenticate to Agent Platform, set up Application Default Credentials.
For more information, see

Set up authentication for a local development environment.

Before running this sample, make sure to set the `OPENAI_BASE_URL` environment variable or set up oauth credentials.
For more information, see Authentication and credentials.

from openai import OpenAI
client = OpenAI()
response = client.responses.create(
    model="MODEL",
    input="INPUT",
    max_output_tokens=MAX_OUTPUT_TOKENS,
    stream=False,
)
print(response)

```

- MODEL: The model name you want to use, for example `xai/grok-4.20-reasoning`.
- INPUT: The prompt or input for the model.
- MAX_OUTPUT_TOKENS: Maximum number of tokens that can be generated in the response. A token is approximately four characters. 100 tokens correspond to roughly 60-80 words. Specify a lower value for shorter responses and a higher value for potentially longer
responses.

### REST

After you set up your environment, you can use REST to test a text prompt. The
following sample sends a request to the publisher model endpoint.

Before using any of the request data,
make the following replacements:

- PROJECT_ID: Your Google Cloud project ID.
- MAX_OUTPUT_TOKENS: Maximum number of tokens that can be generated in the response. A token is approximately four characters. 100 tokens correspond to roughly 60-80 words. Specify a lower value for shorter responses and a higher value for potentially longer

HTTP method and URL:

```
POST https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/endpoints/openapi/responses

```

Request JSON body:

```
{
  "model": "MODEL",
  "input": "INPUT",
  "max_output_tokens": MAX_OUTPUT_TOKENS,
  "stream": false
}

```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> Note: The following command assumes that you have logged in to the `gcloud` CLI with your user account by running `gcloud init` or `gcloud auth login` , or by using Cloud Shell, which automatically logs you into the `gcloud` CLI . You can check the currently active account by running `gcloud auth list`.

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

> Note: The following command assumes that you have logged in to the `gcloud` CLI with your user account by running `gcloud init` or `gcloud auth login` . You can check the currently active account by running `gcloud auth list`.

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

The following example shows a complete curl request:

```bash
curl -s -X POST \
  -H "Content-Type: application/json" \
  "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/endpoints/openapi/responses" \
  -d '{
    "model": "xai/grok-4.20-reasoning",
    "input": "Explain black holes in one short sentence.",
    "max_output_tokens": 100,
  }'

```

Based on the Responses API definition, a non-streaming response will contain a unique ID, model metadata, usage statistics, and an output array containing the generated text.

```
  "background": false,
  "completed_at": 1778892918,
  "created_at": 1778892916,
  "error": null,
  "frequency_penalty": 0,
  "id": "c8AHavnIMP6UifEPgIfcgAg",
  "incomplete_details": null,
  "instructions": null,
  "max_output_tokens": null,
  "max_tool_calls": null,
  "metadata": {
    "system_fingerprint": "fp_39c5j0a3e9"
  },
  "object": "response",
  "output": [
      "content": [
          "annotations": [],
          "logprobs": [],
          "text": "OUTPUT_TEXT",
          "type": "output_text"
      ],
      "id": "msg_c8AHavnIMP6UifEPgIfcgAg",
      "role": "assistant",
      "status": "completed",
      "type": "message"
  "parallel_tool_calls": true,
  "presence_penalty": 0,
  "previous_response_id": null,
  "prompt_cache_key": null,
  "reasoning": {
    "effort": "medium",
    "summary": "detailed"
  "safety_identifier": null,
  "service_tier": "default",
  "store": false,
  "temperature": 0.7,
  "text": {
    "format": {
      "type": "text"
  "tool_choice": "auto",
  "tools": [],
  "top_logprobs": 0,
  "top_p": 0.95,
  "truncation": "disabled",
  "usage": {
    "extra_properties": {
      "google": {
        "traffic_type": "ON_DEMAND"
    "input_tokens": 335,
    "input_tokens_details": {
      "cached_tokens": 320
    "num_server_side_tools_used": 0,
    "num_sources_used": 0,
    "output_tokens": 305,
    "output_tokens_details": {
      "reasoning_tokens": 284
    "total_tokens": 640
  "user": null

```

## Make a streaming call to the Responses API

The following samples show how to make a streaming call to the Responses API:

### Python

Before running this sample, make sure to set the `OPENAI_BASE_URL` environment variable or set up oauth credentials.

stream = client.responses.create(
    stream=True,
for event in stream:
    if event.type == "response.output_text.delta":
        print(event.delta, end="")

```

- MAX_OUTPUT_TOKENS: Maximum number of tokens that can be generated in the response. A token is approximately four characters. 100 tokens correspond to roughly 60-80 words. Specify a lower value for shorter responses and a higher value for potentially longer

### REST

- MAX_OUTPUT_TOKENS: Maximum number of tokens that can be generated in the response. A token is approximately four characters. 100 tokens correspond to roughly 60-80 words. Specify a lower value for shorter responses and a higher value for potentially longer

```
POST https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/endpoints/openapi/responses

```

```
  "stream": true

```

> Note: The following command assumes that you have logged in to the `gcloud` CLI with your user account by running `gcloud init` or `gcloud auth login` , or by using Cloud Shell, which automatically logs you into the `gcloud` CLI . You can check the currently active account by running `gcloud auth list`.

```
     "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/endpoints/openapi/responses"

```

> Note: The following command assumes that you have logged in to the `gcloud` CLI with your user account by running `gcloud init` or `gcloud auth login` . You can check the currently active account by running `gcloud auth list`.

```

    -Uri "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/endpoints/openapi/responses" | Select-Object -Expand Content

```

## What's next

- Learn more about Grok models.
- Learn how to use Function calling with the Responses API.
- Learn how to use Structured output with the Responses API.
