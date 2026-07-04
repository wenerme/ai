> [!NOTE]
> **Note:** Billing for batch prediction for OpenMaaS embedding models is enabled on October 3, 2025.

Batch predictions lets you efficiently send multiple text-only prompts that
aren't latency sensitive to a model. Compared to online predictions, where you
send one input prompt for each request, you can batch a large number of input
prompts in a single request.

## Supported models

Gemini Enterprise Agent Platform supports batch predictions for the following models.

**Llama:**

- [Llama 4 Maverick 17B-128E](https://console.cloud.google.com/agent-platform/publishers/meta/model-garden/llama-4-maverick-17b-128e-instruct-maas)
- [Llama 4 Scout 17B-16E](https://console.cloud.google.com/agent-platform/publishers/meta/model-garden/llama-4-maverick-17b-128e-instruct-maas)
- [Llama 3.3 70B](https://console.cloud.google.com/agent-platform/publishers/meta/model-garden/llama-3.3-70b-instruct-maas)

**OpenAI gpt-oss:**

- [gpt-oss 120B](https://console.cloud.google.com/agent-platform/publishers/openai/model-garden/gpt-oss-120b-maas)
- [gpt-oss 20B](https://console.cloud.google.com/agent-platform/publishers/openai/model-garden/gpt-oss-20b-maas)

**Qwen:**

- [Qwen3 Coder](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3-coder-480b-a35b-instruct-maas)
- [Qwen3 235B](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3-235b-a22b-instruct-2507-maas)

**DeepSeek:**

- [DeepSeek-V3.2](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-v3.2-maas)
- [DeepSeek-V3.1](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-v3.1-maas)
- [DeepSeek R1 (0528)](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-r1-0528-maas)

**Embedding models:**

- [Multilingual E5 (small)](https://console.cloud.google.com/agent-platform/publishers/intfloat/model-garden/multilingual-e5-large-instruct-maas)
- [Multilingual E5 (large)](https://console.cloud.google.com/agent-platform/publishers/intfloat/model-garden/multilingual-e5-large-instruct-maas)

## Prepare input

Before you begin, prepare your inputs in a BigQuery table or as a
JSONL file in Cloud Storage. The input for both sources must follow the
[OpenAI API schema](https://platform.openai.com/docs/api-reference/fine-tuning/chat-input) JSONL format, as shown in the following examples.

Large language models:

```
{"custom_id": "test-request-0", "method": "POST", "url": "/v1/chat/completions", "body": {"model": "MODEL_ID", "messages": [{"role": "user", "content": "Give me a recipe for banana bread"}], "max_tokens": 1000}}
```

Embedding models:

```
{"custom_id": "test-request-0", "method": "POST", "url": "/v1/embeddings", "body": {"model": "MODEL_ID", "input": "Hello World"}}
```

> [!NOTE]
> **Note:** Gemini Enterprise Agent Platform doesn't use the `custom_id`, `method`, `url`, and `model` fields. You can include them but they are ignored by the batch prediction job.

### BigQuery

Your BigQuery input table must adhere to the following
schema:

| Column name | Description |
|---|---|
| custom_id | An ID for each request to match the input with the output. |
| method | The request method. |
| url | The request endpoint. |
| body(JSON) | Your input prompt. |

- Your input table can have other columns, which are ignored by the batch job and passed directly to the output table.
- Batch prediction jobs reserve two column names for the batch prediction output: **response(JSON)** and **id**. Don't use these columns in the input table.
- The **method** and **url** columns are dropped and not included in the output table.

### Cloud Storage

For Cloud Storage, the input file must be a JSONL file that is
located in a Cloud Storage bucket.

> [!NOTE]
> The global endpoint for open models isn't supported.

## Request a batch prediction

Make a batch prediction against a model by using input from [BigQuery](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/capabilities/batch-prediction#bigquery) or [Cloud Storage](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/capabilities/batch-prediction#cloudstorage).
You can independently choose to output predictions to either a
BigQuery table or a JSONL file in a Cloud Storage
bucket.

### BigQuery

Specify your BigQuery input table, model, and output location.
The batch prediction job and your table must be in the same region.

### REST

After you set up your environment, you can use REST to test a text prompt. The
following sample sends a request to the publisher model endpoint.

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: A region that supports the model.
- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your \[project ID\](/resource-manager/docs/creating-managing-projects#identifiers). .
- <var class="edit" scope="MODEL" translate="no">MODEL</var>: The name of the [model](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/capabilities/batch-prediction#models) to tune.
- <var class="edit" scope="INPUT_URI" translate="no">INPUT_URI</var>: The BigQuery table where your batch prediction input is located such as `myproject.mydataset.input_table`.
- <var class="edit" scope="OUTPUT_FORMAT" translate="no">OUTPUT_FORMAT</var>: To output to a BigQuery table, specify `bigquery`. To output to a Cloud Storage bucket, specify `jsonl`.
- <var class="edit" scope="DESTINATION" translate="no">DESTINATION</var>: For BigQuery, specify `bigqueryDestination`. For Cloud Storage, specify `gcsDestination`.
- <var class="edit" scope="OUTPUT_URI_FIELD_NAME" translate="no">OUTPUT_URI_FIELD_NAME</var>: For BigQuery, specify `outputUri`. For Cloud Storage, specify `outputUriPrefix`.
- <var class="edit" scope="OUTPUT_URI" translate="no">OUTPUT_URI</var>: For BigQuery, specify the table location such as `myproject.mydataset.output_result`. For Cloud Storage, specify the bucket and folder location such as `gs://mybucket/path/to/outputfile`.

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs
```

Request JSON body:

```
'{
  "displayName": "JOB_NAME",
  "model": "publishers/PUBLISHER/models/MODEL_ID",
  "inputConfig": {
    "instancesFormat":"bigquery",
    "bigquerySource":{
      "inputUri" : "INPUT_URI"
    }
  },
  "outputConfig": {
    "predictionsFormat":"OUTPUT_FORMAT",
    "DESTINATION":{
      "OUTPUT_URI_FIELD_NAME": "OUTPUT_URI"
    }
  }
}'
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
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs"
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
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```
{
"name":
  "projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs/BATCH_JOB_ID",
  "displayName": "JOB_NAME",
  "model": "publishers/PUBLISHER/models/MODEL_ID",
  "inputConfig": {
    "instancesFormat":"bigquery",
    "bigquerySource":{
      "inputUri" : "INPUT_URI"
    }
  },
  "outputConfig": {
    "predictionsFormat":"OUTPUT_FORMAT",
    "DESTINATION":{
      "OUTPUT_URI_FIELD_NAME": "OUTPUT_URI"
    }
  },
  "state": "JOB_STATE_PENDING",
  "createTime": "2024-10-16T19:33:59.153782Z",
  "updateTime": "2024-10-16T19:33:59.153782Z",
  "labels": {
    "purpose": "testing"
  },
  "modelVersionId": "1"
}
```

### Cloud Storage

Specify your JSONL file's Cloud Storage location, model, and output
location.

### REST

After you set up your environment, you can use REST to test a text prompt. The
following sample sends a request to the publisher model endpoint.

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: A region that supports the model.
- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your \[project ID\](/resource-manager/docs/creating-managing-projects#identifiers). .
- <var class="edit" scope="MODEL" translate="no">MODEL</var>: The name of the [model](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/capabilities/batch-prediction#models) to tune.
- <var class="edit" scope="INPUT_URI" translate="no">INPUT_URI</var>: The Cloud Storage location of your JSONL batch prediction input such as `gs://bucketname/path/to/jsonl`.
- <var class="edit" scope="OUTPUT_FORMAT" translate="no">OUTPUT_FORMAT</var>: To output to a BigQuery table, specify `bigquery`. To output to a Cloud Storage bucket, specify `jsonl`.
- <var class="edit" scope="DESTINATION" translate="no">DESTINATION</var>: For BigQuery, specify `bigqueryDestination`. For Cloud Storage, specify `gcsDestination`.
- <var class="edit" scope="OUTPUT_URI_FIELD_NAME" translate="no">OUTPUT_URI_FIELD_NAME</var>: For BigQuery, specify `outputUri`. For Cloud Storage, specify `outputUriPrefix`.
- <var class="edit" scope="OUTPUT_URI" translate="no">OUTPUT_URI</var>: For BigQuery, specify the table location such as `myproject.mydataset.output_result`. For Cloud Storage, specify the bucket and folder location such as `gs://mybucket/path/to/outputfile`.

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs
```

Request JSON body:

```
'{
  "displayName": "JOB_NAME",
  "model": "publishers/PUBLISHER/models/MODEL_ID",
  "inputConfig": {
    "instancesFormat":"jsonl",
    "gcsSource":{
      "uris" : "INPUT_URI"
    }
  },
  "outputConfig": {
    "predictionsFormat":"OUTPUT_FORMAT",
    "DESTINATION":{
      "OUTPUT_URI_FIELD_NAME": "OUTPUT_URI"
    }
  }
}'
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
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs"
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
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```
{
"name":
  "projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs/BATCH_JOB_ID",
  "displayName": "JOB_NAME",
  "model": "publishers/PUBLISHER/models/MODEL_ID",
  "inputConfig": {
    "instancesFormat": "jsonl",
    "gcsSource": {
      "uris": [
        "INPUT_URI"
      ]
    }
  },
  "outputConfig": {
    "predictionsFormat":"OUTPUT_FORMAT",
    "DESTINATION":{
      "OUTPUT_URI_FIELD_NAME": "OUTPUT_URI"
    }
  },
  "state": "JOB_STATE_PENDING",
  "createTime": "2024-10-16T19:33:59.153782Z",
  "updateTime": "2024-10-16T19:33:59.153782Z",
  "labels": {
    "purpose": "testing"
  },
  "modelVersionId": "1"
}
```

## Get the status of a batch prediction job

Get the state of your batch prediction job to check whether it has completed
successfully. The job length depends on the number input items that you
submitted.

### REST

After you set up your environment, you can use REST to test a text prompt. The
following sample sends a request to the publisher model endpoint.

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your \[project ID\](/resource-manager/docs/creating-managing-projects#identifiers). .
- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: The region where your batch job is located.
- <var class="edit" scope="JOB_ID" translate="no">JOB_ID</var>: The batch job ID that was returned when you created the job.

HTTP method and URL:

```
GET https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs/JOB_ID
```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs/JOB_ID"
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
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs/JOB_ID" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```
{
"name":
  "projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs/BATCH_JOB_ID",
  "displayName": "JOB_NAME",
  "model": "publishers/PUBLISHER/models/MODEL_ID",
  "inputConfig": {
    "instancesFormat":"bigquery",
    "bigquerySource":{
      "inputUri" : "INPUT_URI"
    }
  },
  "outputConfig": {
    "predictionsFormat":"OUTPUT_FORMAT",
    "DESTINATION":{
      "OUTPUT_URI_FIELD_NAME": "OUTPUT_URI"
    }
  },
  "state": "JOB_STATE_SUCCEEDED",
  "createTime": "2024-10-16T19:33:59.153782Z",
  "updateTime": "2024-10-16T19:33:59.153782Z",
  "labels": {
    "purpose": "testing"
  },
  "modelVersionId": "1"
}
```

## Retrieve output

When a batch prediction job completes, retrieve the output from the location
that you specified. For BigQuery, the output is in the
**response(JSON)** column of your destination BigQuery table. For
Cloud Storage, the output is saved as a JSONL file in the output
Cloud Storage location.

## What's next

- Learn how to [Call MaaS APIs for open models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/call-open-model-apis) for streaming and non-streaming use cases.
