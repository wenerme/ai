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

Gemini Enterprise Agent Platform can log samples of requests and responses for
Gemini and supported partner models. The logs are saved to a
BigQuery table for viewing and analysis. Additionally,
Agent Platform can share request-response logs for specific Advanced AI
models with certain MaaS Partners to help you fulfill your obligations to those
MaaS partners.

This page describes how to configure request-response logs for base foundation
models and fine-tuned models.

> [!NOTE]
> To see an example of Request-response logging,
> run the "Intro to Request and Response Logging with Gemini" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/logging/intro_request_response_logging.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Flogging%2Fintro_request_response_logging.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/logging/intro_request_response_logging.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/logging/intro_request_response_logging.ipynb)

## Supported API methods for logging

Request-response logs are supported for all Gemini models that
use [`generateContent`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.publishers.models/generateContent) or
[`streamGenerateContent`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.publishers.models/streamGenerateContent).

The following partner models that use
[`rawPredict`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.publishers.models/rawPredict)
or
[`streamrawPredict`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.publishers.models/streamRawPredict)
are also supported:

- Anthropic Claude

## Request-response logs for base foundation models

You can configure request-response logs for base foundation models by using the
REST API or Python SDK. Logging configurations can take a few minutes to take
effect.

### Enable request-response logging

Select one of the following tabs for instructions on enabling
request-response logs for a base foundation model.

For Anthropic models, only REST is supported for logging configuration. Enable
logging configuration through the REST API by setting publisher to `anthropic`
and setting the model name to one of the
[supported Claude models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/claude/use-claude).

To use request-response logging for Anthropic models, use a regional endpoint. The [global endpoint](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/use-partner-models#global) and [multi-regional endpoints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/use-partner-models#multi-region) don't support this feature.

### Python SDK

This method can be used to create or update a `PublisherModelConfig`.

    # Specify the preview version of GenerativeModel
    import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest
    from vertexai.preview.generative_models import(
        https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai.preview.generative_models.GenerativeModel.html,
        )

    PROJECT_ID = "PROJECT_ID"
    LOCATION = "LOCATION"

    https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.init(project=PROJECT_ID, location=LOCATION)

    publisher_model = GenerativeModel("gemini-2.5-flash")

    # Set logging configuration
    publisher_model.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai.preview.generative_models.GenerativeModel.html#vertexai_preview_generative_models_GenerativeModel_set_request_response_logging_config(
        enabled=True,
        sampling_rate=1.0,
        bigquery_destination="bq://PROJECT_ID.DATASET_NAME.TABLE_NAME",
        enable_otel_logging=True
        )

### REST API

Create or update a `PublisherModelConfig` using `setPublisherModelConfig`:

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="ENDPOINT_PREFIX" translate="no">ENDPOINT_PREFIX</var>: The region of the model resource followed by `-`. For example, `us-central1-`. If using the global endpoint, leave blank. Request-response logging is supported for [all regions supported
  by the model](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations).
- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your project ID.
- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: The region of the model resource. If using the global endpoint, enter `global`.
- <var class="edit" scope="PUBLISHER" translate="no">PUBLISHER</var>: The publisher name. For example, `google`.
- <var class="edit" scope="MODEL" translate="no">MODEL</var>: The foundation model name. For example, `gemini-2.0-flash-001`.
- <var class="edit" scope="SAMPLING_RATE" translate="no">SAMPLING_RATE</var>: To reduce storage costs, you can set a number between 0 or 1 to define the fraction of requests to log. For example, a value of 1 logs all requests, and a value of 0.1 logs 10% of requests.
- <var class="edit" scope="BQ_URI" translate="no">BQ_URI</var>: The URI of the BigQuery table to use for logging. For example, `bq://PROJECT_ID.DATASET_NAME.TABLE_NAME`. If you only specify a project name, a new dataset is created with the name `logging_ENDPOINT_DISPLAY_NAME\_ENDPOINT_ID`, where `ENDPOINT_DISPLAY_NAME` follows the [BigQuery naming rules](https://docs.cloud.google.com/bigquery/docs/datasets#dataset-naming). If you don't specify a table name, a new table is created with the name `request_response_logging`.

HTTP method and URL:

```
POST https://ENDPOINT_PREFIXaiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/PUBLISHER/models/MODEL:setPublisherModelConfig
```

Request JSON body:

```
{
  "publisherModelConfig": {
     "loggingConfig": {
       "enabled": true,
       "samplingRate": SAMPLING_RATE,
       "bigqueryDestination": {
         "outputUri": "BQ_URI"
       },
       "enableOtelLogging": true
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
     "https://ENDPOINT_PREFIXaiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/PUBLISHER/models/MODEL:setPublisherModelConfig"
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
    -Uri "https://ENDPOINT_PREFIXaiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/PUBLISHER/models/MODEL:setPublisherModelConfig" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

#### Response

```
{
  "name": "projects/PROJECT_ID/locations/LOCATION/operations/OPERATION_ID",
  "metadata": {
    "@type": "type.googleapis.com/google.cloud.aiplatform.v1beta1.SetPublisherModelConfigOperationMetadata",
    "genericMetadata": {
      "createTime": "2025-03-11T22:42:54.283184Z",
      "updateTime": "2025-03-11T22:42:54.283184Z"
    }
  }
}
```

### Get logging configuration

Get the request-response logging configuration for the foundation model by using
the REST API.

### REST API

Get the request-response logging configuration using
`fetchPublisherModelConfig`:

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your project ID.
- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: The location of the model resource.
- <var class="edit" scope="PUBLISHER" translate="no">PUBLISHER</var>: The publisher name. For example, `google`.
- <var class="edit" scope="MODEL" translate="no">MODEL</var>: The foundation model name. For example, `gemini-2.0-flash-001`.

HTTP method and URL:

```
GET https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/PUBLISHER/models/MODEL:fetchPublisherModelConfig
```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/PUBLISHER/models/MODEL:fetchPublisherModelConfig"
```

#### PowerShell

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method GET `
    -Headers $headers `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/PUBLISHER/models/MODEL:fetchPublisherModelConfig" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

#### Response

```
{
  "loggingConfig": {
    "enabled": true,
    "samplingRate": 1,
    "bigqueryDestination": {
      "outputUri": "bq://output-uri"
    },
    "enableOtelLogging": true
  }
}
```

### Disable logging

Disable request-response logging for the foundation model by using the REST API
or Python SDK.

### Python SDK

    # Specify the preview version of GenerativeModel
    import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest
    from vertexai.preview.generative_models import(
        https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai.preview.generative_models.GenerativeModel.html,
        )

    PROJECT_ID = "PROJECT_ID"
    LOCATION = "LOCATION"

    https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.init(project=PROJECT_ID, location=LOCATION)

    publisher_model = GenerativeModel("gemini-2.5-flash")

    # Disable logging
    publisher_model.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai.preview.generative_models.GenerativeModel.html#vertexai_preview_generative_models_GenerativeModel_set_request_response_logging_config(
        enabled=False,
        sampling_rate=1.0,
        bigquery_destination="bq://PROJECT_ID.DATASET_NAME.TABLE_NAME"
        )

### REST API

Use `setPublisherModelConfig` to disable logging:

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your project ID.
- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: The location of the model resource.
- <var class="edit" scope="PUBLISHER" translate="no">PUBLISHER</var>: The publisher name. For example, `google`.
- <var class="edit" scope="MODEL" translate="no">MODEL</var>: The foundation model name. For example, `gemini-2.0-flash-001`.

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/PUBLISHER/models/MODEL:setPublisherModelConfig
```

Request JSON body:

```
{
  "publisherModelConfig": {
     "loggingConfig": {
       "enabled": false
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
     "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/PUBLISHER/models/MODEL:setPublisherModelConfig"
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
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/PUBLISHER/models/MODEL:setPublisherModelConfig" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

#### Response

```
{
  "name": "projects/PROJECT_ID/locations/LOCATION/operations/OPERATION_ID",
  "metadata": {
    "@type": "type.googleapis.com/google.cloud.aiplatform.v1beta1.SetPublisherModelConfigOperationMetadata",
    "genericMetadata": {
      "createTime": "2025-03-11T22:42:54.283184Z",
      "updateTime": "2025-03-11T22:42:54.283184Z"
    }
  }
}
```

## Request-response logs for fine-tuned models

You can configure request-response logs for fine-tuned models by using the REST
API or Python SDK.

> [!NOTE]
> **Note:** For Preview, you must use the v1beta1 version of the REST API to see the updated BigQuery logging schema.

### Enable request-response logs

Select one of the following tabs for instructions on enabling
request-response logs for a fine-tuned model.

### Python SDK

This method can be used to update the request-response logging configuration
for an endpoint.

    # Specify the preview version of GenerativeModel
    import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest
    from vertexai.preview.generative_models import(
        https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai.preview.generative_models.GenerativeModel.html,
        )

    PROJECT_ID = "PROJECT_ID"
    LOCATION = "LOCATION"

    https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.init(project=PROJECT_ID, location=LOCATION)

    tuned_model = GenerativeModel(f"projects/{PROJECT_ID}/locations/{LOCATION}/endpoints/ENDPOINT_ID")

    # Set logging configuration
    publisher_model.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai.preview.generative_models.GenerativeModel.html#vertexai_preview_generative_models_GenerativeModel_set_request_response_logging_config(
        enabled=True,
        sampling_rate=1.0,
        bigquery_destination=f"bq://{PROJECT_ID}.DATASET_NAME.TABLE_NAME",
        enable_otel_logging=True,
        )

### REST API

You can only enable request-response logging when you create an endpoint using
[`projects.locations.endpoints.create`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.endpoints/create)
or patch an existing endpoint using
[`projects.locations.endpoints.patch`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.endpoints/patch).

Requests and responses are logged at the endpoint level, so requests sent to
any deployed models under the same endpoint are logged.

When you
[create or patch an endpoint](https://cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/deployment#deploy_a_model_to_an_endpoint),
populate the `predictRequestResponseLoggingConfig` field of the
[Endpoint resource](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.endpoints)
with the following entries:

- `enabled`: set to `True` to enable request-response logging.

- `samplingRate`: To reduce storage costs, you can set a number between 0 and 1
  to define the fraction of requests to log. For example, a value of 1 logs
  all requests, and a value of 0.1 logs 10% of requests.

- [`BigQueryDestination`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/BigQueryDestination): the
  BigQuery table to be used for logging. If you only specify a
  project name, a new dataset is created with the name
  `logging_ENDPOINT_DISPLAY_NAME_ENDPOINT_ID`,
  where `ENDPOINT_DISPLAY_NAME` follows the
  [BigQuery naming rules](https://cloud.google.com/bigquery/docs/datasets#dataset-naming).
  If you don't specify a table name, a new table is created with the name
  `request_response_logging`.

- `enableOtelLogging`: set to `true` to enable
  [OpenTelemetry (OTEL)](https://opentelemetry.io/docs/specs/otel/logs/)
  logging in addition to the default request-response logging.

To view the BigQuery table schema, see
[Logging table schema](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/request-response-logging#schema).

The following is an example configuration:

```
{
  "predictRequestResponseLoggingConfig": {
    "enabled": true,
    "samplingRate": 0.5,
    "bigqueryDestination": {
      "outputUri": "bq://PROJECT_ID.DATASET_NAME.TABLE_NAME"
    },
    "enableOtelLogging": true
  }
}
```

### Get logging configuration

Get the request-response logging configuration for the fine-tuned model by using
the REST API.

### REST API

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your project ID.
- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: The location of the endpoint resource.
- <var class="edit" scope="MODEL" translate="no">MODEL</var>: The foundation model name. For example, `gemini-2.0-flash-001`.
- <var class="edit" scope="ENDPOINT_ID" translate="no">ENDPOINT_ID</var>: The ID of the endpoint.

HTTP method and URL:

```
GET https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/endpoints/ENDPOINT_ID
```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/endpoints/ENDPOINT_ID"
```

#### PowerShell

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method GET `
    -Headers $headers `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/endpoints/ENDPOINT_ID" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

#### Response

```
{
  "loggingConfig": {
    "enabled": true,
    "samplingRate": 1,
    "bigqueryDestination": {
      "outputUri": "bq://output-uri"
    },
    "enableOtelLogging": true
  }
}
```

### Disable logging configuration

Disable the request-response logging configuration for the endpoint.

### Python SDK

    # Specify the preview version of GenerativeModel
    import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest
    from vertexai.preview.generative_models import(
        https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai.preview.generative_models.GenerativeModel.html,
        )

    PROJECT_ID = "PROJECT_ID"
    LOCATION = "LOCATION"

    https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.init(project=PROJECT_ID, location=LOCATION)

    tuned_model = GenerativeModel(f"projects/{PROJECT_ID}/locations/{LOCATION}/endpoints/ENDPOINT_ID")

    # Disable logging
    tuned_model.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai.preview.generative_models.GenerativeModel.html#vertexai_preview_generative_models_GenerativeModel_set_request_response_logging_config(
        enabled=False,
        sampling_rate=1.0,
        bigquery_destination="bq://PROJECT_ID.DATASET_NAME.TABLE_NAME"
        )

### REST API

```
{
"predictRequestResponseLoggingConfig": {
  "enabled": false
}
}
```

## Logging table schema

In BigQuery, the logs are recorded using the following schema:

| Field name | Type | Notes |
|---|---|---|
| endpoint | STRING | Resource name of the endpoint to which the tuned model is deployed. |
| deployed_model_id | STRING | Deployed model ID for a tuned model deployed to an endpoint. |
| logging_time | TIMESTAMP | The time that logging is performed. This is roughly the time that the response is returned. |
| request_id | NUMERIC | The auto-generated integer request ID based on the API request. |
| request_payload | STRING | Included for partner model logging and backward compatibility with the Agent Platform endpoint request-response log. |
| response_payload | STRING | Included for partner model logging and backward compatibility with the Agent Platform endpoint request-response log. |
| model | STRING | Model resource name. |
| model_version | STRING | The model version. This is often "default" for Gemini models. |
| api_method | STRING | generateContent, streamGenerateContent, rawPredict, streamRawPredict |
| full_request | JSON | The full `GenerateContentRequest`. |
| full_response | JSON | The full `GenerateContentResponse`. |
| metadata | JSON | Any metadata of the call; contains the request latency. |
| otel_log | JSON | Logs in OpenTelemetry schema format. Only available if `otel_logging` is enabled in the logging configuration. |

Note that request-response pairs larger than the BigQuery [write API
10MB row limit](https://docs.cloud.google.com/bigquery/quotas#write-api-limits) are not recorded.

## Sharing requests and responses with MaaS partners

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

For certain Advanced AI models, some MaaS partners require that a log of prompts
and responses are shared in a tamper-proof manner with their trust and safety
teams, so that they can monitor for potential abuse. For example, use of
Anthropic Advanced AI is governed by Section F of Anthropic's [Service Specific
Terms](https://www.anthropic.com/legal/service-specific-terms). While the
`dataSharingEnabledProvider` feature is active, logged requests and responses
under the [Advanced AI Safety Addendum](https://cloud.google.com/terms/advanced-ai-safety-addendum)
will be shared with the MaaS Partner in real time.

Tamper-proof request-response log sharing can be enabled using the
[`setPublisherModelConfig` API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1beta1/projects.locations.publishers.models/setPublisherModelConfig)
as discussed in the following sections.

### Supported models

The following table lists MaaS partners and models that support sharing requests
and responses:

| Supported MaaS partner | Supported models |
|---|---|
| Anthropic | - Claude Mythos Preview - Claude Mythos 5 - Claude Fable 5 |

The MaaS Partner and model must match. The request-response log can only be
shared with the MaaS Partner who published the model.

### Prerequisites

Google must receive consent for the Advanced AI Safety Addendum in this project
before data sharing can be enabled. For more information about the addendum, see
[Advanced AI safety](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/abuse-monitoring#advanced_ai_safety).

You don't need to enable request-response logging for BigQuery to use
request-response log sharing.

### Limitations

VPC Service Controls protected projects are prevented from sharing data with MaaS
Partners by default. Configuring a VPC Service Controls egress rule isn't
supported. To enable data sharing for a VPC Service Controls protected project,
file a [support case](https://cloud.google.com/support-hub?e=13802955).

### Enable data

Do the following:

### REST API

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="ENDPOINT_PREFIX" translate="no">ENDPOINT_PREFIX</var>: the appropriate prefix for the model endpoint location. Use the following values:
  - For the `global` endpoint, use `aiplatform`.
  - For multi-region endpoints like `us` or `eu`, use `aiplatform.LOCATION.rep`
  - For regional endpoints like `us-central1`, use `LOCATION-aiplatform`.
- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your project ID.
- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: The location of the model endpoint. For example, `global`, `us`, `eu`, or `us-central1`.
- <var class="edit" scope="PUBLISHER" translate="no">PUBLISHER</var>: The model publisher's name, in lowercase. For example, `anthropic`.
- <var class="edit" scope="MODEL" translate="no">MODEL</var>: The foundation model name. For example, `claude-fable-5`.
- <var class="edit" scope="MAAS_PARTNER" translate="no">MAAS_PARTNER</var>: The model publisher's name, in uppercase. The MaaS Partner must be the uppercase version of the `MODEL`, described above. For example, `ANTHROPIC`.

HTTP method and URL:

```
POST https://ENDPOINT_PREFIX.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/PUBLISHER/models/MODEL:setPublisherModelConfig
```

Request JSON body:

```
{
  "publisherModelConfig": {
    "dataSharingEnabledProvider": "ANTHROPIC"
  }
}
```

To send your request, choose one of these options:

#### curl

Save the request body in a file named `request.json`,
and execute the following command:

```
curl -X POST \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://ENDPOINT_PREFIX.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/PUBLISHER/models/MODEL:setPublisherModelConfig"
```

#### PowerShell

Save the request body in a file named `request.json`,
and execute the following command:

```
$headers = @{  }

Invoke-WebRequest `
    -Method POST `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://ENDPOINT_PREFIX.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/PUBLISHER/models/MODEL:setPublisherModelConfig" | Select-Object -Expand Content
```

You should receive a successful status code (2xx) and an empty response.

### Get sharing config

Do the following:

### REST API

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="ENDPOINT_PREFIX" translate="no">ENDPOINT_PREFIX</var>: the appropriate prefix for the model endpoint location. Use the following values:
  - For the `global` endpoint, use `aiplatform`.
  - For multi-region endpoints like `us` or `eu`, use `aiplatform.LOCATION.rep`
  - For regional endpoints like `us-central1`, use `LOCATION-aiplatform`.
- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your project ID.
- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: The location of the model endpoint. For example, `global`, `us`, `eu`, or `us-central1`.
- <var class="edit" scope="PUBLISHER" translate="no">PUBLISHER</var>: The model publisher's name, in lowercase. For example, `anthropic`.
- <var class="edit" scope="MODEL" translate="no">MODEL</var>: The foundation model name. For example, `claude-fable-5`.

HTTP method and URL:

```
 https://ENDPOINT_PREFIX.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/PUBLISHER/models/MODEL:setPublisherModelConfig
```

To send your request, choose one of these options:

#### curl

Execute the following command:

```
curl -X  \
     -H "Authorization: Bearer TOKEN" \
     "https://ENDPOINT_PREFIX.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/PUBLISHER/models/MODEL:setPublisherModelConfig"
```

#### PowerShell

Execute the following command:

```
$headers = @{ "Authorization" = "Bearer TOKEN" }

Invoke-WebRequest `
    -Method  `
    -Headers $headers `
    -Uri "https://ENDPOINT_PREFIX.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/PUBLISHER/models/MODEL:setPublisherModelConfig" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

```
{
  "loggingConfig": {},
  "dataSharingEnabledProvider": "ANTHROPIC"
}
```

### Disable data sharing

Do the following:

### REST API

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="ENDPOINT_PREFIX" translate="no">ENDPOINT_PREFIX</var>: the appropriate prefix for the model endpoint location. Use the following values:
  - For the `global` endpoint, use `aiplatform`.
  - For multi-region endpoints like `us` or `eu`, use `aiplatform.LOCATION.rep`
  - For regional endpoints like `us-central1`, use `LOCATION-aiplatform`.
- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your project ID.
- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: The location of the model endpoint. For example, `global`, `us`, `eu`, or `us-central1`.
- <var class="edit" scope="PUBLISHER" translate="no">PUBLISHER</var>: The model publisher's name, in lowercase. For example, `anthropic`.
- <var class="edit" scope="MODEL" translate="no">MODEL</var>: The foundation model name. For example, `claude-fable-5`.

HTTP method and URL:

```
POST https://ENDPOINT_PREFIX.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/PUBLISHER/models/MODEL:setPublisherModelConfig
```

Request JSON body:

```
{
  "publisherModelConfig": {
    "dataSharingEnabledProvider": "MODEL_PROVIDER_UNSPECIFIED"
  }
}
```

To send your request, choose one of these options:

#### curl

Save the request body in a file named `request.json`,
and execute the following command:

```
curl -X POST \
     -H "Authorization: Bearer TOKEN" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://ENDPOINT_PREFIX.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/PUBLISHER/models/MODEL:setPublisherModelConfig"
```

#### PowerShell

Save the request body in a file named `request.json`,
and execute the following command:

```
$headers = @{ "Authorization" = "Bearer TOKEN" }

Invoke-WebRequest `
    -Method POST `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://ENDPOINT_PREFIX.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/PUBLISHER/models/MODEL:setPublisherModelConfig" | Select-Object -Expand Content
```

You should receive a successful status code (2xx) and an empty response.

### Prevent data sharing requests

To prevent sharing request and response logs with MaaS partners, the project
administrator can do any of the following:

- Create a [VPC Service Controls service
  perimeter](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/vpc-service-controls#service-perimeter-creation)
  that includes the project and `aiplatform.googleapis.com` as a restricted
  service

- [Disable access to Model Garden
  models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/control-model-access) that support data sharing.

- Enforce least privileges on the
  `aiplatform.endpoints.setPublisherModelConfig` permission to prevent logging
  or log sharing from being enabled.

## What's next

- [Estimate pricing](https://docs.cloud.google.com/stackdriver/estimating-bills) for online prediction logging.
- Deploy a model [using the Google Cloud console](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/predictions/deploy-model-console) or [using the Agent Platform API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/predictions/deploy-model-api).
- Learn [how to create a BigQuery table](https://docs.cloud.google.com/bigquery/docs/tables).

- For more information about policies related to request response logging, see the
  following:

  - Learn about [Responsible AI](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/responsible-ai)
  - [Abuse Monitoring](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/abuse-monitoring)
  - [Zero Data Retention](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/zero-data-retention)
