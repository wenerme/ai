This page provides a list of quotas by region and model, and shows you how to
view and edit your quotas in the Google Cloud console.

## Tuned model quotas

Tuned model inference shares the same quota as the base model.
There is no separate quota for tuned model inference.

## Embedding limits

Requests for `gemini-embedding-001` are subject to regional quotas, while requests for `gemini-embedding-2` are subject to global quotas.

| Base model | Quota | Metric |
|---|---|---|
| base_model: gemini-embedding | 5,000,000 | `aiplatform.googleapis.com/embed_content_input_tokens_per_minute_per_base_model` |
| base_model: gemini-embedding-2 | 10,000,000 | `aiplatform.googleapis.com/global_embed_content_input_tokens_per_minute_per_base_model` |
| base_model: gemini-embedding-2 | 40,000 | `aiplatform.googleapis.com/global_embed_content_requests_per_minute_per_base_model` |

Requests for `gemini-embedding-001` using the `predict` API are also subject to the following quotas:

| Base model | Quota | Metric |
|---|---|---|
| base_model: gemini-embedding | 100,000 | `aiplatform.googleapis.com/online_prediction_requests_per_base_model` |
| base_model: N/A | 30,000 | `aiplatform.googleapis.com/online_prediction_requests` |

## Agent Runtime quotas

The following quotas apply to [Agent Runtime](https://docs.cloud.google.com/vertex-ai/docs/agent-engine/overview) for a given project in each region:

| Description | Quota | Metric |
|---|---|---|
| Create, delete, or update Agent Runtime resources per minute | 10 | `aiplatform.googleapis.com/reasoning_engine_service_write_requests` |
| Create, delete, or update Agent Runtime sessions per minute | 100 | `aiplatform.googleapis.com/session_write_requests` |
| Get, list, or retrieve Agent Runtime sessions per minute | 10000 | `aiplatform.googleapis.com/session_read_requests` |
| `Query` or `StreamQuery` Agent Runtime per minute | 90 | `aiplatform.googleapis.com/reasoning_engine_service_query_requests` |
| Append event to Agent Runtime sessions per minute | 300 | `aiplatform.googleapis.com/session_event_append_requests` |
| Maximum number of Agent Runtime resources | 100 | `aiplatform.googleapis.com/reasoning_engine_service_entities` |
| Create, delete, or update Agent Runtime memory resources per minute | 100 | `aiplatform.googleapis.com/memory_bank_write_requests` |
| Get, list, or retrieve from Agent Runtime Memory Bank per minute | 300 | `aiplatform.googleapis.com/memory_bank_read_requests` |
| Sandbox environment (Code Execution) execute requests per minute | 1000 | `aiplatform.googleapis.com/sandbox_environment_execute_requests` |
| Sandbox environment (Code Execution) entities per region | 1000 | `aiplatform.googleapis.com/sandbox_environment_entities` |
| Sandbox environment (Code Execution) write requests per minute | 500 | `aiplatform.googleapis.com/sandbox_environment_write_requests` |
| A2A Agent post requests like `sendMessage` and `cancelTask` per minute | 60 | `aiplatform.googleapis.com/a2a_agent_post_requests` |
| A2A Agent get requests like `getTask` and `getCard` per minute | 600 | `aiplatform.googleapis.com/a2a_agent_get_requests` |
| Concurrent live bidirectional connections using the `BidiStreamQuery` API per minute | 10 | `aiplatform.googleapis.com/reasoning_engine_service_concurrent_query_requests` |

## Batch inference

The quotas and limits for batch inference jobs are the same across all regions.

### Concurrent batch inference job limits for Gemini models

There are no predefined quota limits on batch inference for Gemini models. Instead, the batch service provides access to a large, shared pool of resources, dynamically allocated based on the model's real-time availability and demand across all customers for that model. When more customers are active and saturated the model's capacity, your batch requests might be queued for capacity.

### Concurrent batch inference job quotas non-Gemini models

The following table lists the quotas for the number of concurrent batch inference jobs, which don't apply to Gemini models:

| **Quota** | **Value** |
|---|---|
| `aiplatform.googleapis.com/textembedding_gecko_concurrent_batch_prediction_jobs` | 4 |

If the number of tasks submitted exceeds the allocated quota, the tasks are placed in a queue and processed when the quota capacity becomes available.

### View and edit the quotas in the Google Cloud console

> [!CAUTION]
> **Caution:** Before you begin, make sure that you have [enabled
> the Agent Platform API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/cloud-environment) for your project. If the API isn't enabled, the Agent Platform quotas won't display.

To view and edit the quotas in the Google Cloud console, do the following:

1. Go to the **Quotas and System Limits** page.
2. [Go to Quotas and System Limits](https://console.cloud.google.com/iam-admin/quotas)
3. To adjust the quota, copy and paste the property `aiplatform.googleapis.com/textembedding_gecko_concurrent_batch_prediction_jobs` in the **Filter** . Press **Enter**.
4. Click the three dots at the end of the row, and select **Edit quota**.
5. Enter a new quota value in the pane, and click **Submit request**.

## Semantic Governance Policy quotas

The following quotas apply to [Semantic Governance Policy](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/semantic-governance-overview) for a given project in each region:

| Description | Quota | Metric |
|---|---|---|
| Get or list Semantic Governance Policy (SGP) policy resources per minute | 600 | `aiplatform.googleapis.com/semantic_governance/policy_read_requests` |
| Create, update, or delete Semantic Governance Policy (SGP) policy resources per minute | 60 | `aiplatform.googleapis.com/semantic_governance/policy_write_requests` |
| Get Semantic Governance Policy engine resources per minute | 600 | `aiplatform.googleapis.com/semantic_governance/engine_read_requests` |
| Update or deprovision Semantic Governance Policy engine resources per minute | 60 | `aiplatform.googleapis.com/semantic_governance/engine_write_requests` |
| Number of Semantic Governance Policy resources per project per location. | 1,000 | `aiplatform.googleapis.com/semantic_governance/policy_count` |

### View and edit the quotas in the Google Cloud console

> [!CAUTION]
> **Caution:** Before you begin, make sure that you have [enabled
> the Agent Platform API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/cloud-environment) for your project. If the API isn't enabled, the Agent Platform quotas won't display.

To view and edit the quotas in the Google Cloud console, do the following:

1. Go to the **Quotas and System Limits** page.
2. [Go to Quotas and System Limits](https://console.cloud.google.com/iam-admin/quotas)
3. To adjust the quota, copy and paste the property `aiplatform.googleapis.com/semantic_governance/policy_write_requests` in the **Filter** . Press **Enter**.
4. Click the three dots at the end of the row, and select **Edit quota**.
5. Enter a new quota value in the pane, and click **Submit request**.

## RAG Engine on Gemini Enterprise Agent Platform

The [VPC-SC security controls](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/security-controls) and
CMEK are supported by Agent Platform RAG Engine. Data residency and AXT security controls aren't
supported.
For each service to perform retrieval-augmented generation (RAG) using RAG Engine, the following quotas apply, with the quota measured as requests per minute (RPM).

| Service | Quota | Metric |
|---|---|---|
| RAG Engine data management APIs | 60 RPM | `VertexRagDataService requests per minute per region` |
| `RetrievalContexts` API | 600 RPM | `VertexRagService retrieve requests per minute per region` |
| `base_model: textembedding-gecko` | 1,500 RPM | `Online prediction requests per base model per minute per region per base_model` An additional filter for you to specify is `base_model: textembedding-gecko` |

The following limits apply:

| Service | Limit | Metric |
|---|---|---|
| Concurrent `ImportRagFiles` requests | 3 RPM | `VertexRagService concurrent import requests per region` |
| Maximum number of files per `ImportRagFiles` request | 10,000 | `VertexRagService import rag files requests per region` |

For more rate limits and quotas, see [Generative AI on Gemini Enterprise Agent Platform
rate limits](https://docs.cloud.google.com/vertex-ai/docs/quotas).

## Gen AI evaluation service

The Gen AI evaluation service uses Gemini 2.5 Flash as a default judge model for model-based metrics. A single evaluation request for a model-based metric might result in multiple underlying requests to the Gen AI evaluation service. Each model's consumption is calculated at the organization level, which means that any requests directed to judge model for model inference and model-based evaluation contribute to the model's consumption. Quotas for the Gen AI evaluation service and the underlying judge model are shown in the following table:

| **Request quota** | **Default quota** |
|---|---|
| Gen AI evaluation service requests per minute | 1,000 requests per project per region |
| Gemini throughput | Depends on model and [consumption option](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/standard-paygo) |
| Concurrent evaluation runs | 20 concurrent evaluation runs per project per region |

If you receive an error related to quotas while using the Gen AI evaluation service, you might
need to file a quota increase request. See [View and manage
quotas](https://docs.cloud.google.com/docs/quotas/view-manage) for more information.

| **Limit** | **Value** |
|---|---|
| Gen AI evaluation service request timeout | 60 seconds |

When you use the Gen AI evaluation service for the first time in a new project, you might
experience an initial setup delay up to two minutes. If your first request fails, wait a few minutes
and then retry. Subsequent evaluation requests typically complete within 60 seconds.

The maximum input and output tokens for model-based metrics depend on the model used
as the judge model. See [Google models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models) for a
list of models.

### Gemini Enterprise Agent Platform Pipelines quotas

Each tuning job uses Gemini Enterprise Agent Platform Pipelines. For more information,
see [Agent Platform Pipelines quotas and limits](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/quotas#vertex-ai-pipelines).

## What's next

Overview

### [Standard PayGo](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/standard-paygo)

Learn about Standard PayGo, a Agent Platform consumption option lets you pay only for the resources that you consume, without requiring upfront financial commitments.

Resource

### [Agent Platform quotas and system limits](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/models/quotas)

Quotas and system limits related to Agent Platform, excluding product-specific quotas and system limits.

Overview

### [Google Cloud quotas](https://docs.cloud.google.com/docs/quotas/overview)

Learn about how Google Cloud restricts how much of a resource your Google Cloud project can use, and how quotas apply to a range of resource types, including hardware, software, and network components.
