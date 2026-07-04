You can use curl commands to send requests to the Gemini Enterprise Agent Platform endpoint
using the following model names:

- For Llama 4 Maverick 17B-128E, use `llama-4-maverick-17b-128e-instruct-maas`
- For Llama 4 Scout 17B-16E, use `llama-4-scout-17b-16e-instruct-maas`
- For Llama 3.3 70B, use `llama-3.3-70b-instruct-maas`

To learn how to make streaming and non-streaming calls to Llama models,
see [Call MaaS APIs for open models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/call-open-model-apis).

> [!NOTE]
> To see an example of evaluating Llama 3.1 models by using Automatic side-by-side
> (AutoSxS) evaluation,
> run the "Evaluate Llama 3.1 models using Agent Platform AutoSxS" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_openai_api_llama3_1.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fvertex-ai-samples%2Fmain%2Fnotebooks%2Fcommunity%2Fmodel_garden%2Fmodel_garden_openai_api_llama3_1.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/vertex-ai-samples/main/notebooks/community/model_garden/model_garden_openai_api_llama3_1.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_openai_api_llama3_1.ipynb)

### Before you begin

To use Llama models with Gemini Enterprise Agent Platform, you must perform the
following steps. The Agent Platform API
(`aiplatform.googleapis.com`) must be enabled to use
Gemini Enterprise Agent Platform. If you already have an existing project with the
Agent Platform API enabled, you can use that project instead of creating a
new project.

> [!NOTE]
> **Note:** To use the Llama 4 Model-as-a-Service endpoints, you must accept the end-user license agreement (EULA) on the model card.

1. Go to one of the following Model Garden model cards, then click **Enable** :
   - [Go to the Llama 4 Maverick 17B-128E model card](https://console.cloud.google.com/agent-platform/publishers/meta/model-garden/llama-4-maverick-17b-128e-instruct-maas)
   - [Go to the Llama 4 Scout 17B-16E model card](https://console.cloud.google.com/agent-platform/publishers/meta/model-garden/llama-4-maverick-17b-128e-instruct-maas)
   - [Go to the Llama 3.3 70B model card](https://console.cloud.google.com/agent-platform/publishers/meta/model-garden/llama-3.3-70b-instruct-maas)

### Make a streaming call to a Llama model

The following sample makes a streaming call to a Llama model.

### REST

After you set up your environment, you can use REST to test a text prompt. The
following sample sends a request to the publisher model endpoint.

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: A region that supports Llama models.
- <var class="edit" scope="MODEL" translate="no">MODEL</var>: The [model name](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/llama/use-llama#model-list) you want to use.
- <var class="edit" scope="ROLE" translate="no">ROLE</var>: The role associated with a message. You can specify a `user` or an `assistant`. The first message must use the `user` role. The models operate with alternating `user` and `assistant` turns. If the final message uses the `assistant` role, then the response content continues immediately from the content in that message. You can use this to constrain part of the model's response.
- <var class="edit" scope="CONTENT" translate="no">CONTENT</var>: The content, such as text, of the `user` or `assistant` message.
- <var class="edit" scope="MAX_OUTPUT_TOKENS" translate="no">MAX_OUTPUT_TOKENS</var>: Maximum number of tokens that can be generated in the response. A token is approximately four characters. 100 tokens correspond to roughly 60-80 words.

  Specify a lower value for shorter responses and a higher value for potentially longer
  responses.
- <var class="edit" scope="STREAM" translate="no">STREAM</var>: A boolean that specifies whether the response is streamed or not. Stream your response to reduce the end-use latency perception. Set to `true` to stream the response and `false` to return the response all at once.
- <var class="edit" scope="ENABLE_LLAMA_GUARD" translate="no">ENABLE_LLAMA_GUARD</var>: A boolean that specifies whether to enable Llama Guard on your inputs and outputs. By default, Llama Guard is enabled and flags responses if it determines they are unsafe.

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/endpoints/openapi/chat/completions
```

Request JSON body:

```
{
  "model": "meta/MODEL",
  "messages": [
    {
      "role": "ROLE",
      "content": "CONTENT"
    }
  ],
  "max_tokens": MAX_OUTPUT_TOKENS,
  "stream": true,
  "extra_body": {
    "google": {
      "model_safety_settings": {
        "enabled": ENABLE_LLAMA_GUARD,
        "llama_guard_settings": {}
      }
    }
  }
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
     "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/endpoints/openapi/chat/completions"
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
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/endpoints/openapi/chat/completions" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```
data: {
  "choices": [
    {
      "delta": {
        "content": "CONTENT",
        "role": "assistant",
        "refusal: "REFUSAL_REASON" #If using Llama Guard and response was flagged by Llama Guard
      },
      "index": 0
    }
  ],
  "model": "meta/MODEL_NAME",
  "object": "chat.completion.chunk"
}

data: {
  "choices": [
    {
      "delta": {
        "content": "CONTENT",
        "role": "assistant"
      },
      "finish_reason": "stop",
      "index": 0
    }
  ],
  "model": "meta/MODEL_NAME",
  "object": "chat.completion.chunk",
  "usage": {
    "completion_tokens": 131,
    "prompt_tokens": 14,
    "total_tokens": 145
  }
}
```

### Make a unary call to a Llama model

The following sample makes a unary call to a Llama model.

### REST

After you set up your environment, you can use REST to test a text prompt. The
following sample sends a request to the publisher model endpoint.

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: A region that supports Llama models.
- <var class="edit" scope="MODEL" translate="no">MODEL</var>: The [model name](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/llama/use-llama#model-list) you want to use.
- <var class="edit" scope="ROLE" translate="no">ROLE</var>: The role associated with a message. You can specify a `user` or an `assistant`. The first message must use the `user` role. The models operate with alternating `user` and `assistant` turns. If the final message uses the `assistant` role, then the response content continues immediately from the content in that message. You can use this to constrain part of the model's response.
- <var class="edit" scope="CONTENT" translate="no">CONTENT</var>: The content, such as text, of the `user` or `assistant` message.
- <var class="edit" scope="MAX_OUTPUT_TOKENS" translate="no">MAX_OUTPUT_TOKENS</var>: Maximum number of tokens that can be generated in the response. A token is approximately four characters. 100 tokens correspond to roughly 60-80 words.

  Specify a lower value for shorter responses and a higher value for potentially longer
  responses.
- <var class="edit" scope="STREAM" translate="no">STREAM</var>: A boolean that specifies whether the response is streamed or not. Stream your response to reduce the end-use latency perception. Set to `true` to stream the response and `false` to return the response all at once.
- <var class="edit" scope="ENABLE_LLAMA_GUARD" translate="no">ENABLE_LLAMA_GUARD</var>: A boolean that specifies whether to enable Llama Guard on your inputs and outputs. By default, Llama Guard is enabled and flags responses if it determines they are unsafe.

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/endpoints/openapi/chat/completions
```

Request JSON body:

```
{
  "model": "meta/MODEL",
  "messages": [
    {
      "role": "ROLE",
      "content": "CONTENT"
    }
  ],
  "max_tokens": MAX_OUTPUT_TOKENS,
  "stream": false,
  "extra_body": {
    "google": {
      "model_safety_settings": {
        "enabled": ENABLE_LLAMA_GUARD,
        "llama_guard_settings": {}
      }
    }
  }
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
     "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/endpoints/openapi/chat/completions"
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
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/endpoints/openapi/chat/completions" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "CONTENT",
        "role": "assistant",
        "refusal: "REFUSAL_REASON" #If using Llama Guard and response was flagged by Llama Guard
      }
    }
  ],
  "model": "meta/llama3-405b-instruct-maas",
  "object": "chat.completion",
  "usage": {
    "completion_tokens": 367,
    "prompt_tokens": 14,
    "total_tokens": 381
  }
}
```

### Flagged responses

By default, Llama Guard 3 8B is enabled on all predictions that you make with
Llama 3.3 and Llama 3.1 models. By default, Llama Guard 3 11B vision is
enabled on all predictions that you make with for Llama 3.2 models. Llama Guard
helps safeguard responses by checking inputs and outputs. If Llama Guard
determines they are unsafe, it flags the response.

If you want to disable Llama Guard, modify the model safety setting. For more
information, see the `model_safety_settings` field in the
[streaming](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/llama/use-llama#streaming) or [unary](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/llama/use-llama#unary) example.

### Use Vertex AI Studio

For Llama models, you can use Vertex AI Studio to quickly prototype and
test generative AI models in the Google Cloud console. As an example, you can use
Vertex AI Studio to compare Llama model responses with other supported
models such as Google's Gemini.

For more information, see [Quickstart: Send text prompts to Gemini
using Vertex AI Studio](https://docs.cloud.google.com/vertex-ai/docs/start/quickstarts/quickstart).

## Llama model region availability and quotas

For Llama models, a quota applies for each region where the model is
available. The quota is specified in queries per minute (QPM).

| Model | Region | Quotas | Context length |
|---|---|---|---|
| Llama 4 Maverick 17B-128E |
| `us-east5` |   | 524,288 |
| Llama 4 Scout 17B-16E |
| `us-east5` |   | 1,310,720 |
| Llama 3.3 70B |
| `us-central1` |   | 128,000 |

If you want to increase any of your quotas for Generative AI on Gemini Enterprise Agent Platform, you can
use the Google Cloud console to request a quota increase. To learn more about
quotas, see the
[Cloud Quotas overview](https://docs.cloud.google.com/docs/quotas/overview).
