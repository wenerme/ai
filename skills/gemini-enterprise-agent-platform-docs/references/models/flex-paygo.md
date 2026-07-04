> [!WARNING]
>
> **Preview**
>
>
> This feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the
> [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

Flex pay-as-you-go (Flex PayGo), is a
cost-effective option for accessing Gemini models for non-critical
workloads that can tolerate longer response times and higher throttling.
Flex PayGo offers a 50% discount compared to Standard PayGo.

## When to use Flex PayGo

Flex PayGo is ideal for the synchronous, latency-tolerant, and
non-critical tasks that aren't time-sensitive. The following are example use
cases:

- Offline analysis of text, documents, image, audio and video files

- Evaluation of model qualities

- Data annotation and labeling

- Document translation

- Building a product catalog

> [!NOTE]
> **Note:** For large workloads that can tolerate 24-hour turnaround times and process hundreds of billions of tokens daily, we recommend [Batch inference with
> Gemini](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/batch-prediction-gemini) for improved throughput and success rate.

## Supported models and locations

The following [preview](https://cloud.google.com/products#product-launch-stages)
Gemini models support Flex PayGo in the `global`
endpoint only. Flex PayGo doesn't support regional or
multi-regional endpoints.

- [`gemini-3.1-flash-lite-image`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite-image)
- [`gemini-3-pro-image`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image)
- [`gemini-3.1-flash-image`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image)
- [`gemini-3.5-flash`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-5-flash)
- [`gemini-3.1-flash-lite`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite)
- [`gemini-3.1-flash-image-preview`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image)
- [`gemini-3.1-pro-preview`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-pro)
- [`gemini-3-flash-preview`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-flash)
- [`gemini-3-pro-image-preview`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image-preview)

## Request payload limit

Flex PayGo requests have a total payload size limit of 20 MB for requests where the payload is included directly in the request body. To process larger files, provide a Cloud Storage URI in your request.

## Use Flex PayGo

To send requests to the Gemini API using Flex PayGo,
you must include the `X-Vertex-AI-LLM-Shared-Request-Type` header in your
request. You can use Flex PayGo in two ways:

- Use Provisioned Throughput quota (if available) and then use Flex PayGo.

- Use only Flex PayGo.

Note that requests that use Flex PayGo have longer expected latency than
Standard PayGo.

You can set the request timeout to a maximum of 30 minutes.

### Use Flex PayGo while using Provisioned Throughput as default

To utilize any available Provisioned Throughput quota before using
Flex PayGo, include the header
`X-Vertex-AI-LLM-Shared-Request-Type: flex` in your requests, as shown in the
following samples.

### Python

#### Install

```
pip install --upgrade google-genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/python-genai/).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

Initialize your GenAI client to use Flex PayGo. After performing
this step, you won't need to make further adjustments to your code to interact
with the Gemini API using Flex PayGo on the same
client.

> [!NOTE]
> You can override the default timeout by using the `timeout` parameter. The timeout is specified in milliseconds.

```python
from google import genai
from google.genai.types import HttpOptions
client = genai.Client(
  vertexai=True, project='your_project_id', location='global',
  http_options=HttpOptions(
    api_version="v1",
      headers={
        "X-Vertex-AI-LLM-Shared-Request-Type": "flex"
      },
    # timeout = 600000  # Timeout in milliseconds
  )
)
```

### REST

After you set up your environment, you can use REST to test a text prompt. The
following sample sends a request to the publisher model endpoint.

Before using any of the request data, make the following replacements.

- `PROJECT_ID`: Your \[project ID\](/resource-manager/docs/creating-managing-projects#identifiers). .
- `MODEL_ID`: The model ID of the model for which you want to initialize Flex PayGo. For a list of models that support Flex PayGo, see [Model versions](https://docs.cloud.google.com/vertex-ai/docs/flex-paygo#supported-models).
- `PROMPT_TEXT`: The text instructions to include in the prompt. JSON.

> [!NOTE]
> You can override the default timeout by setting the `X-Server-Timeout` header. The timeout is specified in seconds.

    curl -X POST \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json; charset=utf-8" \
      -H "X-Server-Timeout: 600" \
      -H "X-Vertex-AI-LLM-Shared-Request-Type: flex" \
      "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/MODEL_ID:generateContent" -d \
      $'{
          "contents": {
            "role": "model",
            "parts": { "text": "PROMPT_TEXT" }
        }
      }'

You should receive a JSON response similar to the following.

    {
      "candidates": [
        {
          "content": {
            "role": "model",
            "parts": [
              {
                "text": "Response to sample request."
              }
            ]
          },
          "finishReason": "STOP"
        }
      ],
      "usageMetadata": {
        "promptTokenCount": 3,
        "candidatesTokenCount": 900,
        "totalTokenCount": 1957,
        "trafficType": "ON_DEMAND_FLEX",
        "thoughtsTokenCount": 1054
      }
    }

Note the following in the URL for this sample:

- Use the [`generateContent`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.publishers.models/generateContent) method to request that the response is returned after it's fully generated. To reduce the perception of latency to a human audience, stream the response as it's being generated by using the [`streamGenerateContent`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.publishers.models/streamGenerateContent) method.
- The multimodal model ID is located at the end of the URL before the method (for example, `gemini-2.5-flash`). This sample might support other models as well.
- When you use a regional API endpoint (for example, `us-central1`), the region from the endpoint URL determines where the request is processed. Any conflicting location in the resource path is ignored.

### Use only Flex PayGo

To use only Flex PayGo, include the headers
`X-Vertex-AI-LLM-Request-Type: shared` and
`X-Vertex-AI-LLM-Shared-Request-Type: flex` in your requests, as shown in the
following samples.

### Python

#### Install

```
pip install --upgrade google-genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/python-genai/).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

Initialize your GenAI client to use Flex PayGo. After performing
this step, you won't need to make further adjustments to your code to interact
with the Gemini API using Flex PayGo on the same
client.

> [!NOTE]
> You can override the default timeout by using the `timeout` parameter. The timeout is specified in milliseconds.

```python
from google import genai
from google.genai.types import HttpOptions
client = genai.Client(
  vertexai=True, project='your_project_id', location='global',
  http_options=HttpOptions(
    api_version="v1",
      headers={
        "X-Vertex-AI-LLM-Request-Type": "shared",
        "X-Vertex-AI-LLM-Shared-Request-Type": "flex"
      },
    # timeout = 600000  # Timeout in milliseconds
  )
)
```

### REST

Before using any of the request data, make the following replacements:

- `PROJECT_ID`: Your \[project ID\](/resource-manager/docs/creating-managing-projects#identifiers). .
- `MODEL_ID`: The model ID of the model for which you want to initialize Flex PayGo. For a list of models that support Flex PayGo, see [Model versions](https://docs.cloud.google.com/vertex-ai/docs/flex-paygo#supported-models).
- `PROMPT_TEXT`: The text instructions to include in the prompt. JSON.

> [!NOTE]
> You can override the default timeout by setting the `X-Server-Timeout` header. The timeout is specified in seconds.

    curl -X POST \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json; charset=utf-8" \
      -H "X-Server-Timeout: 600" \
      -H "X-Vertex-AI-LLM-Request-Type: shared" \
      -H "X-Vertex-AI-LLM-Shared-Request-Type: flex" \
      "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/MODEL_ID:generateContent" -d \
      $'{
          "contents": {
            "role": "model",
            "parts": { "text": "PROMPT_TEXT" }
        }
      }'

You should receive a JSON response similar to the following.

    {
      "candidates": [
        {
          "content": {
            "role": "model",
            "parts": [
              {
                "text": "Response to sample request."
              }
            ]
          },
          "finishReason": "STOP"
        }
      ],
      "usageMetadata": {
        "promptTokenCount": 3,
        "candidatesTokenCount": 900,
        "totalTokenCount": 1957,
        "trafficType": "ON_DEMAND_FLEX",
        "thoughtsTokenCount": 1054
      }
    }

Note the following in the URL for this sample:

- Use the [`generateContent`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.publishers.models/generateContent) method to request that the response is returned after it's fully generated. To reduce the perception of latency to a human audience, stream the response as it's being generated by using the [`streamGenerateContent`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.publishers.models/streamGenerateContent) method.
- The multimodal model ID is located at the end of the URL before the method (for example, `gemini-2.5-flash`). This sample might support other models as well.
- When you use a regional API endpoint (for example, `us-central1`), the region from the endpoint URL determines where the request is processed. Any conflicting location in the resource path is ignored.

## Verify Flex PayGo usage

You can verify whether a request utilized Flex PayGo from the
traffic type in the response, as shown in the following examples.

### Python

You can verify whether
Flex PayGo was utilized for a request from the `traffic_type`
field in the response. If your request was processed using
Flex PayGo, the `traffic_type` field is set to
`ON_DEMAND_FLEX`.

```python
sdk_http_response=HttpResponse(
  headers=
) candidates=[Candidate(
  avg_logprobs=-0.539712212302468,
  content=Content(
    parts=[
      Part(
        text="""Response to sample request.
        """
      ),
    ],
    role='model'
  ),
  finish_reason=<FinishReason.STOP: 'STOP'>
)] create_time=datetime.datetime(2025, 12, 3, 20, 32, 55, 916498, tzinfo=TzInfo(0)) model_version='gemini-2.5-flash' prompt_feedback=None response_id='response_id' usage_metadata=GenerateContentResponseUsageMetadata(
  candidates_token_count=1408,
  candidates_tokens_details=[
    ModalityTokenCount(
      modality=<MediaModality.TEXT: 'TEXT'>,
      token_count=1408
    ),
  ],
  prompt_token_count=5,
  prompt_tokens_details=[
    ModalityTokenCount(
      modality=<MediaModality.TEXT: 'TEXT'>,
      token_count=5
    ),
  ],
  thoughts_token_count=1356,
  total_token_count=2769,
  traffic_type=\<TrafficType.ON_DEMAND_FLEX: 'ON_DEMAND_FLEX'\>
) automatic_function_calling_history=[] parsed=None
```

### REST

You can verify whether
Flex PayGo was utilized for a request from the `trafficType`
field in the response. If your request was processed using
Flex PayGo, the `trafficType` field is set to
`ON_DEMAND_FLEX`.

```restructuredtext
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "Response to sample request."
          }
        ]
      },
      "finishReason": "STOP"
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 3,
    "candidatesTokenCount": 900,
    "totalTokenCount": 1957,
    "trafficType": "ON_DEMAND_FLEX",
    "thoughtsTokenCount": 1054
  }
}
```

## Additional quota for Flex PayGo

In addition to the available quotas for content generation requests (including
Provisioned Throughput quota for spillover traffic),
requests utilizing Flex PayGo are subject to the following quota:

| Description | QPM for each base model in a project |
|---|---|
| Quota for each base model in a project requests utilizing Flex PayGo | 3000 |

## What's next

Resource

### [Generative AI quotas and limits](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/quotas)

Quotas and limits related specifically to Agent Platform.

Resource

### [Agent Platform quotas and limits](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/quotas)

Quotas and limits related to Agent Platform, excluding product-specific limitations.

Overview

### [Google Cloud quotas](https://docs.cloud.google.com/docs/quotas/overview)

Learn about how Google Cloud restricts how much of a resource your Google Cloud project can use, and how quotas apply to a range of resource types, including hardware, software, and network components.
