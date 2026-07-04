Mistral AI models on Gemini Enterprise Agent Platform offer fully managed and serverless
models as APIs. To use a Mistral AI model on Agent Platform, send
a request directly to the Agent Platform API endpoint. Because
Mistral AI models use a managed API, there's no need to provision or
manage infrastructure.

You can stream your responses to reduce the end-user latency perception. A
streamed response uses server-sent events (SSE) to incrementally stream the
response.

You pay for Mistral AI models as you use them (pay as you go). For
pay-as-you-go pricing, see Mistral AI model pricing on the
Gemini Enterprise Agent Platform [pricing](https://docs.cloud.google.com/gemini-enterprise-agent-platform/pricing#partner-models)

[page](https://docs.cloud.google.com/gemini-enterprise-agent-platform/pricing#partner-models).

> [!NOTE]
> To see an example of getting started with Mistral AI models on Agent Platform,
> run the "Getting Started with Mistral AI Models" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/official/generative_ai/mistralai_intro.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fvertex-ai-samples%2Fmain%2Fnotebooks%2Fofficial%2Fgenerative_ai%2Fmistralai_intro.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/vertex-ai-samples/main/notebooks/official/generative_ai/mistralai_intro.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/official/generative_ai/mistralai_intro.ipynb)

## Available Mistral AI models

The following models are available from Mistral AI to use in
Gemini Enterprise Agent Platform. To access a Mistral AI model, go to its
Model Garden model card.

### Mistral Medium 3

Mistral Medium 3 is a versatile model designed for a wide range of
tasks, including programming, mathematical reasoning, understanding long
documents, summarization, and dialogue. It excels at complex tasks requiring
advanced reasoning abilities, visual understanding or a high level of
specialization (e.g. creative writing, agentic workflows, code generation).

It boasts multi-modal capabilities, enabling it to process visual inputs, and
supports dozens of languages, including over 80 coding languages. Additionally,
it features function calling and agentic workflows.

Mistral Medium 3 is optimized for single-node inference, particularly
for long-context applications. Its size allows it to achieve high throughput on
a single node.

[Go to the Mistral Medium 3 model card](https://console.cloud.google.com/agent-platform/publishers/mistralai/model-garden/mistral-medium-3)

### Mistral OCR (25.05)

Mistral OCR (25.05) is an Optical Character Recognition API for document
understanding. Mistral OCR (25.05) excels in understanding complex
document elements, including interleaved imagery, mathematical expressions,
tables, and advanced layouts such as LaTeX formatting. The model enables deeper
understanding of rich documents such as scientific papers with charts, graphs,
equations and figures.

Mistral OCR (25.05) is an ideal model to use in combination with a RAG
system that takes multimodal documents (such as slides or complex PDFs) as
input.

You can couple Mistral OCR (25.05) with other Mistral models to reformat
the results. This combination ensures that the extracted content is not only
accurate but also presented in a structured and coherent manner, making it
suitable for various downstream applications and analyses.

[Go to the Mistral OCR (25.05) model card](https://console.cloud.google.com/agent-platform/publishers/mistralai/model-garden/mistral-ocr-2505)

### Mistral Small 3.1 (25.03)

Mistral Small 3.1 (25.03) features multimodal capabilities and a context of up
to 128,000. The model can process and understand visual inputs and long
documents, further expanding its range of applications compared to the previous
Mistral AI Small model. Mistral Small 3.1 (25.03) is a versatile model
designed for various tasks such as programming, mathematical reasoning, document
understanding, and dialogue. Mistral Small 3.1 (25.03) is designed for
low-latency applications to deliver best-in-class efficiency compared to models
of the same quality.

Mistral Small 3.1 (25.03) has undergone a full post-training process to align
the model with human preferences and needs, making it usable out-of-the-box for
applications that require chat or precise instruction following.

[Go to the Mistral Small 3.1 (25.03) model card](https://console.cloud.google.com/agent-platform/publishers/mistralai/model-garden/mistral-small-2503)

### Codestral 2

Codestral 2 is Mistral's code generation specialized model built
specifically for high-precision fill-in-the-middle (FIM) completion. It helps
developers write and interact with code through a shared instruction and
completion API endpoint. As it masters code and can also converse in a variety
of languages, it can be used to design advanced AI applications for software
developers.

The latest release of Codestral 2 delivers measurable upgrades over prior
version Codestral (25.01):

- 30% increase in accepted completions.
- 10% more retained code after suggestion.
- 50% fewer runaway generations, improving confidence in longer edits.

Improved performance on academic benchmarks for short and long-context FIM
completion.

- Code generation: code completion, suggestions, translation.
- Code understanding and documentation: code summarization and explanation.
- Code quality: code review, refactoring, bug fixing and test case generation.
- Code fill-in-the-middle: users can define the starting point of the code using a prompt, and the ending point of the code using an optional suffix and an optional stop. The Codestral model will then generate the code that fits in between, making it ideal for tasks that require a specific piece of code to be generated.

[Go to the Codestral 2 model card](https://console.cloud.google.com/agent-platform/publishers/mistralai/model-garden/codestral-2)

## Use Mistral AI models

You can use curl commands to send requests to the Gemini Enterprise Agent Platform endpoint
using the following model names:

- For Mistral Medium 3, use `mistral-medium-3`
- For Mistral OCR (25.05), use `mistral-ocr-2505`
- For Mistral Small 3.1 (25.03), use `mistral-small-2503`
- For Codestral 2, use `codestral-2`

For more information about using the Mistral AI SDK, see the [Mistral AI Gemini Enterprise Agent Platform documentation](https://docs.mistral.ai/deployment/cloud/vertex/).

### Before you begin

To use Mistral AI models with Gemini Enterprise Agent Platform, you must perform the
following steps. The Agent Platform API
(`aiplatform.googleapis.com`) must be enabled to use
Gemini Enterprise Agent Platform. If you already have an existing project with the
Agent Platform API enabled, you can use that project instead of creating a
new project.

1. Go to one of the following Model Garden model cards, then click **Enable** :
   - [Go to the Mistral Medium 3 model card](https://console.cloud.google.com/agent-platform/publishers/mistralai/model-garden/mistral-medium-3)
   - [Go to the Mistral OCR (25.05) model card](https://console.cloud.google.com/agent-platform/publishers/mistralai/model-garden/mistral-ocr-2505)
   - [Go to the Mistral Small 3.1 (25.03) model card](https://console.cloud.google.com/agent-platform/publishers/mistralai/model-garden/mistral-small-2503)
   - [Go to the Codestral 2 model card](https://console.cloud.google.com/agent-platform/publishers/mistralai/model-garden/codestral-2)

#### Make a streaming call to a Mistral AI model

The following sample makes a streaming call to a Mistral AI model.

### REST

After you set up your environment, you can use REST to test a text prompt. The
following sample sends a request to the publisher model endpoint.

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: A region that supports Mistral AI models.
- <var class="edit" scope="MODEL" translate="no">MODEL</var>: The [model name](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/mistral#model-list) you want to use. In the request body, exclude the `@` model version number.
- <var class="edit" scope="ROLE" translate="no">ROLE</var>: The role associated with a message. You can specify a `user` or an `assistant`. The first message must use the `user` role. The models operate with alternating `user` and `assistant` turns. If the final message uses the `assistant` role, then the response content continues immediately from the content in that message. You can use this to constrain part of the model's response.
- <var class="edit" scope="STREAM" translate="no">STREAM</var>: A boolean that specifies whether the response is streamed or not. Stream your response to reduce the end-use latency perception. Set to `true` to stream the response and `false` to return the response all at once.
- <var class="edit" scope="CONTENT" translate="no">CONTENT</var>: The content, such as text, of the `user` or `assistant` message.
- <var class="edit" scope="MAX_OUTPUT_TOKENS" translate="no">MAX_OUTPUT_TOKENS</var>: Maximum number of tokens that can be generated in the response. A token is approximately 3.5 characters. 100 tokens correspond to roughly 60-80 words.

  Specify a lower value for shorter responses and a higher value for potentially longer
  responses.

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/mistralai/models/MODEL:streamRawPredict
```

Request JSON body:

```
{
"model": MODEL,
  "messages": [
   {
    "role": "ROLE",
    "content": "CONTENT"
   }],
  "max_tokens": MAX_TOKENS,
  "stream": true
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
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/mistralai/models/MODEL:streamRawPredict"
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
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/mistralai/models/MODEL:streamRawPredict" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```
data: {
    "id": "0e9c8e69e5924f729b39bc60bac9e0be",
    "object": "chat.completion.chunk",
    "created": 1720807292,
    "model": "MODEL",
    "choices": [
        {
            "index": 0,
            "delta": {
              "content": "OUTPUT"
            },
            "finish_reason": null,
            "logprobs": null
        }
    ]
}

data: {
    "id": "0e9c8e69e5924f729b39bc60bac9e0be",
    "object": "chat.completion.chunk",
    "created": 1720807292,
    "model": "MODEL",
    "choices": [
        {
            "index": 0,
            "delta": {
              "content": "OUTPUT"
            },
            "finish_reason": null,
            "logprobs": null
        }
    ]
}
...
```

#### Make a unary call to a Mistral AI model

The following sample makes a unary call to a Mistral AI model.

### REST

After you set up your environment, you can use REST to test a text prompt. The
following sample sends a request to the publisher model endpoint.

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: A region that supports Mistral AI models.
- <var class="edit" scope="MODEL" translate="no">MODEL</var>: The [model name](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/mistral#model-list) you want to use. In the request body, exclude the `@` model version number.
- <var class="edit" scope="ROLE" translate="no">ROLE</var>: The role associated with a message. You can specify a `user` or an `assistant`. The first message must use the `user` role. The models operate with alternating `user` and `assistant` turns. If the final message uses the `assistant` role, then the response content continues immediately from the content in that message. You can use this to constrain part of the model's response.
- <var class="edit" scope="STREAM" translate="no">STREAM</var>: A boolean that specifies whether the response is streamed or not. Stream your response to reduce the end-use latency perception. Set to `true` to stream the response and `false` to return the response all at once.
- <var class="edit" scope="CONTENT" translate="no">CONTENT</var>: The content, such as text, of the `user` or `assistant` message.
- <var class="edit" scope="MAX_OUTPUT_TOKENS" translate="no">MAX_OUTPUT_TOKENS</var>: Maximum number of tokens that can be generated in the response. A token is approximately 3.5 characters. 100 tokens correspond to roughly 60-80 words.

  Specify a lower value for shorter responses and a higher value for potentially longer
  responses.

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/mistralai/models/MODEL:rawPredict
```

Request JSON body:

```
{
"model": MODEL,
  "messages": [
   {
    "role": "ROLE",
    "content": "CONTENT"
   }],
  "max_tokens": MAX_TOKENS,
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
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/mistralai/models/MODEL:rawPredict"
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
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/mistralai/models/MODEL:rawPredict" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```
{
    "id": "e71d13ffb77344a08e34e0a22ea84458",
    "object": "chat.completion",
    "created": 1720806624,
    "model": "MODEL",
    "choices": [
        {
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "OUTPUT",
                "tool_calls": null
            },
            "finish_reason": "stop",
            "logprobs": null
        }
    ],
    "usage": {
        "prompt_tokens": 17,
        "total_tokens": 295,
        "completion_tokens": 278
    }
}
```

## Mistral AI model region availability and quotas

For Mistral AI models, a quota applies for each region where the model is
available. The quota is specified in queries per minute (QPM) and tokens per
minute (TPM). TPM includes both input and output tokens.

> [!IMPORTANT]
> **Important:** Machine learning (ML) processing for all available Mistral AI models occurs within the US when requests are made to regionally-available APIs in the US, or within the EU when requests are made to regionally-available APIs in Europe.

| Model | Region | Quotas | Context length |
|---|---|---|---|
| Mistral Medium 3 |
| `us-central1` | - QPM: 90 - TPM: 315,000 | 128,000 |
| `europe-west4` | - QPM: 90 - TPM: 315,000 | 128,000 |
| Mistral OCR (25.05) |
| `us-central1` | - QPM: 30 - Pages per request: 30 (1 page = 1 million input tokens and 1 million output tokens) | 30 pages |
| `europe-west4` | - QPM: 30 - Pages per request: 30 (1 page = 1 million input tokens and 1 million output tokens) | 30 pages |
| Mistral Small 3.1 (25.03) |
| `us-central1` | - QPM: 60 - TPM: 200,000 | 128,000 |
| `europe-west4` | - QPM: 60 - TPM: 200,000 | 128,000 |
| Codestral 2 |
| `us-central1` | - QPM: 1,100 - Input TPM: 1,100,000 - Output TPM: 110,000 | 128,000 tokens |
| `europe-west4` | - QPM: 1,100 - Input TPM: 1,100,000 - Output TPM: 110,000 | 128,000 tokens |

If you want to increase any of your quotas for Generative AI on Gemini Enterprise Agent Platform, you can
use the Google Cloud console to request a quota increase. To learn more about
quotas, see the [Cloud Quotas overview](https://docs.cloud.google.com/docs/quotas/overview).
