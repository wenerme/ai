

Priority pay-as-you-go (Priority PayGo) is a consumption option
that provides more consistent performance than
Standard PayGo without the upfront commitment of
Provisioned Throughput.

When using Priority PayGo, you're charged per token usage at a higher
rate than Standard PayGo. For information about pricing, see the
[Gemini Enterprise Agent Platform pricing page](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing).

## When to use Priority PayGo

Priority PayGo is ideal for business critical workloads with
fluctuating or unpredictable traffic patterns. The following are example use
cases:

- Customer-facing virtual assistants
- Agentic workflows and cross-agent interactions
- Research simulations

## Supported models and locations

The following models support Priority PayGo in the `global`
endpoint only. Priority PayGo doesn't support regional or
multi-regional endpoints.

- [`gemini-3.5-flash`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-5-flash)
- [`gemini-3.1-flash-lite`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite)
- [`gemini-3.1-pro-preview`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-pro)
- [`gemini-3-flash-preview`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-flash)
- [`gemini-2.5-pro`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro)
- [`gemini-2.5-flash`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash)
- [`gemini-2.5-flash-lite`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite)

## Use Priority PayGo

To send requests to the Gemini API in Gemini Enterprise Agent Platform using Priority PayGo,
you must include the `X-Vertex-AI-LLM-Shared-Request-Type` header in your
request. You can use Priority PayGo in two ways:

- Use Provisioned Throughput quota (if available) and spill over to Priority PayGo.

- Use only Priority PayGo.

### Use Priority PayGo while using Provisioned Throughput as default

To utilize any available Provisioned Throughput quota before using
Priority PayGo, include the header
`X-Vertex-AI-LLM-Shared-Request-Type: priority` in your requests, as shown in the
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

Initialize your GenAI client to use Priority PayGo. After performing
this step, you won't need to make further adjustments to your code to interact
with the Gemini API using Priority PayGo on the same
client.

```python
from google import genai
from google.genai.types import HttpOptions
client = genai.Client(
  vertexai=True, project='your_project_id', location='global',
  http_options=HttpOptions(
    api_version="v1",
      headers={
        "X-Vertex-AI-LLM-Shared-Request-Type": "priority"
      },
  )
)
```

### REST

After you set up your environment, you can use REST to test a text prompt. The
following sample sends a request to the publisher model endpoint.

Before using any of the request data, make the following replacements:

- `PROJECT_ID`: Your \[project ID\](/resource-manager/docs/creating-managing-projects#identifiers). .
- `MODEL_ID`: The model ID of the model for which you want to initialize Priority PayGo. For a list of models that support Priority PayGo, see [Model versions](https://docs.cloud.google.com/vertex-ai/docs/priority-paygo#supported-models).
- `PROMPT_TEXT`: The text instructions to include in the prompt. JSON.

    curl -X POST \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json; charset=utf-8" \
      -H "X-Vertex-AI-LLM-Shared-Request-Type: priority" \
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
        "trafficType": "ON_DEMAND_PRIORITY",
        "thoughtsTokenCount": 1054
      }
    }

- Use the [`generateContent`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.publishers.models/generateContent) method to request that the response is returned after it's fully generated. To reduce the perception of latency to a human audience, stream the response as it's being generated by using the [`streamGenerateContent`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.publishers.models/streamGenerateContent) method.
- The multimodal model ID is located at the end of the URL before the method (for example, `gemini-2.0-flash`). This sample might support other models as well.

### Use only Priority PayGo

To use only Priority PayGo, include the headers
`X-Vertex-AI-LLM-Request-Type: shared` and
`X-Vertex-AI-LLM-Shared-Request-Type: priority` in your requests, as shown in the
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

Initialize your GenAI client to use Priority PayGo. After performing
this step, you won't need to make further adjustments to your code to interact
with the Gemini API using Priority PayGo on the same
client.

```python
from google import genai
from google.genai.types import HttpOptions
client = genai.Client(
  vertexai=True, project='your_project_id', location='global',
  http_options=HttpOptions(
    api_version="v1",
      headers={
        "X-Vertex-AI-LLM-Request-Type": "shared",
        "X-Vertex-AI-LLM-Shared-Request-Type": "priority"
      },
  )
)
```

### REST

Before using any of the request data, make the following replacements:

- `PROJECT_ID`: Your \[project ID\](/resource-manager/docs/creating-managing-projects#identifiers). .
- `MODEL_ID`: The model ID of the model for which you want to initialize Priority PayGo. For a list of models that support Priority PayGo, see [Model versions](https://docs.cloud.google.com/vertex-ai/docs/priority-paygo#supported-models).
- `PROMPT_TEXT`: The text instructions to include in the prompt. JSON.

    curl -X POST \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json; charset=utf-8" \
      -H "X-Vertex-AI-LLM-Request-Type: shared" \
      -H "X-Vertex-AI-LLM-Shared-Request-Type: priority" \
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
        "trafficType": "ON_DEMAND_PRIORITY",
        "thoughtsTokenCount": 1054
      }
    }

- Use the [`generateContent`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.publishers.models/generateContent) method to request that the response is returned after it's fully generated. To reduce the perception of latency to a human audience, stream the response as it's being generated by using the [`streamGenerateContent`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.publishers.models/streamGenerateContent) method.
- The multimodal model ID is located at the end of the URL before the method (for example, `gemini-2.0-flash`). This sample might support other models as well.

## Verify Priority PayGo usage

You can verify whether a request utilized Priority PayGo from the
traffic type in the response, as shown in the following examples.

### Python

You can verify whether
Priority PayGo was utilized for a request from the `traffic_type`
field in the response. If your request was processed using
Priority PayGo, the `traffic_type` field is set to
`ON_DEMAND_PRIORITY`.

```python
sdk_http_response=HttpResponse(
  headers=<dict len=9>
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
  traffic_type=<TrafficType.ON_DEMAND_PRIORITY: 'ON_DEMAND_PRIORITY'>
) automatic_function_calling_history=[] parsed=None
```

### REST

You can verify whether
Priority PayGo was utilized for a request from the `trafficType`
field in the response. If your request was processed using
Priority PayGo, the `trafficType` field is set to
`ON_DEMAND_PRIORITY`.

```json
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
    "trafficType": "ON_DEMAND_PRIORITY",
    "thoughtsTokenCount": 1054
  }
}
```

## Ramp limits

Priority PayGo sets ramp limits at the organization
level. Ramp limits help provide a predictable and consistent performance. The
starting limit depends on the model, as follows:

- **Gemini Flash and Flash-Lite models:** 4M tokens/min.
- **Gemini Pro models:** 1M tokens/min.

The ramp limit increases by 50% for every 10 minutes of sustained usage.

If a request exceeds the ramp limit or the system is temporarily over capacity owing to
high loads of traffic, the request may be downgraded to
Standard PayGo and is charged at Standard PayGo
rates.

To minimize downgrades, scale usage incrementally to stay within the limit. If
you still require better performance, consider
[purchasing additional Provisioned Throughput quota](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/purchase-provisioned-throughput).

You can verify whether a request was downgraded from the response. For
requests downgraded to Standard PayGo, the traffic type is set
to `ON_DEMAND`. For more information, see
[Verify Priority PayGo usage](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/priority-paygo#verify-usage).

## What's next

- To learn more about Provisioned Throughput, see [Provisioned Throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput).
- To learn about quotas and limits for Agent Platform, see [Gemini Enterprise Agent Platform quotas and limits](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/quotas).
- To learn more about Google Cloud quotas and system limits, see the [Cloud Quotas documentation](https://docs.cloud.google.com/docs/quotas/overview).
