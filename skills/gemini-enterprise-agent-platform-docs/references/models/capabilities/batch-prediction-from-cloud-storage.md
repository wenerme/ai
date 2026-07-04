This page describes how to get batch inferences using Cloud Storage.

## 1. Prepare your inputs

Batch inference for Gemini models accepts one JSON Lines (JSONL) file stored in
Cloud Storage as input data. Each line in the batch input data is a request
to the model.

For example:

    {"request":{"contents": [{"role": "user", "parts": [{"text": "What is the relation between the following video and image samples?"}, {"fileData": {"fileUri": "gs://cloud-samples-data/generative-ai/video/animals.mp4", "mimeType": "video/mp4"}}, {"fileData": {"fileUri": "gs://cloud-samples-data/generative-ai/image/cricket.jpeg", "mimeType": "image/jpeg"}}]}], "generationConfig": {"temperature": 0.9, "topP": 1, "maxOutputTokens": 256}}}

Download the [sample batch request file](https://storage.googleapis.com/cloud-samples-data/generative-ai/batch/batch_requests_for_multimodal_input_2.jsonl)

After you prepare your input data and upload it to Cloud Storage, make sure
the [AI Platform Service
Agent](https://docs.cloud.google.com/iam/docs/service-agents#ai-platform-service-agent) has permission to read the
Cloud Storage file.

## 2. Submit a batch job

You can create a batch job by using the Google Cloud console, the REST API,
or the Google Gen AI SDK.

> [!NOTE]
> To see an example of using batch inference,
> run the "Intro to Batch Predictions with the Gemini API" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/batch-prediction/intro_batch_prediction.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fbatch-prediction%2Fintro_batch_prediction.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/batch-prediction/intro_batch_prediction.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/batch-prediction/intro_batch_prediction.ipynb)

### Console

1. In the Agent Platform section of the Google Cloud console, go to the **Batch Inference** page.

   [Go to Batch Inference](https://console.cloud.google.com/agent-platform/batch-predictions)
2. Click **Create**.

### REST

To create a batch inference job, use the
[`projects.locations.batchPredictionJobs.create`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.batchPredictionJobs/create) method.

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="ENDPOINT_PREFIX" translate="no">ENDPOINT_PREFIX</var>: The region of the model resource followed by `-`. For example, `us-central1-`. If using the global endpoint, leave blank. **Note:** The global endpoint isn't supported for batch inference using tuned models.
- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: A region that supports Gemini models. If using the global endpoint, enter `global`.
- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your project ID.
- <var class="edit" scope="MODEL_PATH" translate="no">MODEL_PATH</var>: the publisher model name, for example, `publishers/google/models/gemini-2.5-flash`; or the tuned endpoint name, for example, `projects/PROJECT_ID/locations/LOCATION/models/MODEL_ID`, where <var translate="no">MODEL_ID</var> is the model ID of the tuned model.
- <var class="edit" scope="INPUT_URI" translate="no">INPUT_URI</var>: The Cloud Storage location of your JSONL batch inference input such as `gs://bucketname/path/to/file.jsonl`.
- <var class="edit" scope="OUTPUT_FORMAT" translate="no">OUTPUT_FORMAT</var>: To output to a Cloud Storage bucket, specify `jsonl`.
- <var class="edit" scope="DESTINATION" translate="no">DESTINATION</var>: For BigQuery, specify `bigqueryDestination`. For Cloud Storage, specify `gcsDestination`.
- <var class="edit" scope="OUTPUT_URI_FIELD_NAME" translate="no">OUTPUT_URI_FIELD_NAME</var>: For BigQuery, specify `outputUri`. For Cloud Storage, specify `outputUriPrefix`.
- <var class="edit" scope="OUTPUT_URI" translate="no">OUTPUT_URI</var>: For BigQuery, specify the table location such as `bq://myproject.mydataset.output_result`. The region of the output BigQuery dataset must be the same as the Agent Platform batch inference job. For Cloud Storage, specify the bucket and directory location such as `gs://mybucket/path/to/output`.

HTTP method and URL:

```
POST https://ENDPOINT_PREFIXaiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs
```

Request JSON body:

```
{
  "displayName": "my-cloud-storage-batch-inference-job",
  "model": "MODEL_PATH",
  "inputConfig": {
    "instancesFormat": "jsonl",
    "gcsSource": {
      "uris" : "INPUT_URI"
    }
  },
  "outputConfig": {
    "predictionsFormat": "OUTPUT_FORMAT",
    "DESTINATION": {
      "OUTPUT_URI_FIELD_NAME": "OUTPUT_URI"
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
     "https://ENDPOINT_PREFIXaiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs"
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
    -Uri "https://ENDPOINT_PREFIXaiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```
{
  "name": "projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs/BATCH_JOB_ID",
  "displayName": "my-cloud-storage-batch-inference-job",
  "model": "publishers/google/models/gemini-2.5-flash",
  "inputConfig": {
    "instancesFormat": "jsonl",
    "gcsSource": {
      "uris": [
        "INPUT_URI"
      ]
    }
  },
  "outputConfig": {
    "predictionsFormat": "OUTPUT_FORMAT",
    "DESTINATION": {
      "OUTPUT_URI_FIELD_NAME": "OUTPUT_URI"
    }
  },
  "state": "JOB_STATE_PENDING",
  "createTime": "2024-10-16T19:33:59.153782Z",
  "updateTime": "2024-10-16T19:33:59.153782Z",
  "modelVersionId": "1"
}
```
The response includes a unique identifier for the batch job. You can poll for the status of the batch job using the <var translate="no">BATCH_JOB_ID</var>. For more information, see [Monitor the job status](https://docs.cloud.google.com/gemini-enterprise-agent-platform#monitor). Note: Custom service accounts and CMEK aren't supported.

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
export GOOGLE_GENAI_USE_VERTEXAI=True
```

    import time

    from google import genai
    from google.genai.types import CreateBatchJobConfig, JobState, HttpOptions

    client = genai.Client(http_options=HttpOptions(api_version="v1"))
    # TODO(developer): Update and un-comment below line
    # output_uri = "gs://your-bucket/your-prefix"

    # See the documentation: https://googleapis.github.io/python-genai/genai.html#genai.batches.Batches.create
    job = client.batches.create(
        # To use a tuned model, set the model param to your tuned model using the following format:
        # model="projects/{PROJECT_ID}/locations/{LOCATION}/models/{MODEL_ID}
        model="gemini-2.5-flash",
        # Source link: https://storage.cloud.google.com/cloud-samples-data/batch/prompt_for_batch_gemini_predict.jsonl
        src="gs://cloud-samples-data/batch/prompt_for_batch_gemini_predict.jsonl",
        config=CreateBatchJobConfig(dest=output_uri),
    )
    print(f"Job name: {job.name}")
    print(f"Job state: {job.state}")
    # Example response:
    # Job name: projects/.../locations/.../batchPredictionJobs/9876453210000000000
    # Job state: JOB_STATE_PENDING

    # See the documentation: https://googleapis.github.io/python-genai/genai.html#genai.types.BatchJob
    completed_states = {
        JobState.JOB_STATE_SUCCEEDED,
        JobState.JOB_STATE_FAILED,
        JobState.JOB_STATE_CANCELLED,
        JobState.JOB_STATE_PAUSED,
    }

    while job.state not in completed_states:
        time.sleep(30)
        job = client.batches.get(name=job.name)
        print(f"Job state: {job.state}")
    # Example response:
    # Job state: JOB_STATE_PENDING
    # Job state: JOB_STATE_RUNNING
    # Job state: JOB_STATE_RUNNING
    # ...
    # Job state: JOB_STATE_SUCCEEDED

## 3. Monitor the job status and progress

After the job is submitted, you can check the status of your batch job
by using the Google Cloud console, the REST API, or the Google Gen AI SDK.

### Console

1. Go to the **Batch Inference** page.

   [Go to Batch Inference](https://console.cloud.google.com/agent-platform/batch-predictions)
2. Select your batch job to monitor its progress.

### REST

To monitor a batch inference job, use the
[`projects.locations.batchPredictionJobs.get`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.batchPredictionJobs/get) method and view the [`CompletionStats`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.batchPredictionJobs#CompletionStats) field in the response.

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="ENDPOINT_PREFIX" translate="no">ENDPOINT_PREFIX</var>: The region of the model resource followed by `-`. For example, `us-central1-`. If using the global endpoint, leave blank.
- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: A region that supports Gemini models. If using the global endpoint, enter `global`.
- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your project ID.
- <var class="edit" scope="BATCH_JOB_ID" translate="no">BATCH_JOB_ID</var>: Your batch job ID.

HTTP method and URL:

```
GET https://ENDPOINT_PREFIXaiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs/BATCH_JOB_ID
```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://ENDPOINT_PREFIXaiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs/BATCH_JOB_ID"
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
    -Uri "https://ENDPOINT_PREFIXaiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs/BATCH_JOB_ID" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```
{
  "name": "projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs/BATCH_JOB_ID",
  "displayName": "my-cloud-storage-batch-prediction-job",
  "model": "publishers/google/models/gemini-2.5-flash",
  ...
  "state": "JOB_STATE_PENDING",
  "completionStats": {
    "successfulCount": "10",
    "failedCount": "1"
  },
  "createTime": "2024-10-16T19:33:59.153782Z",
  "updateTime": "2024-10-16T19:33:59.153782Z",
  "modelVersionId": "1"
}
```

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
export GOOGLE_GENAI_USE_VERTEXAI=True
```

        from google import genai
        from google.genai.types import HttpOptions

        client = genai.Client(http_options=HttpOptions(api_version="v1"))

        # Get the batch job
    # Eg. batch_job_name = "projects/123456789012/locations/.../batchPredictionJobs/1234567890123456789"
        batch_job = client.batches.get(name=batch_job_name)

        print(f"Job state: {batch_job.state}")
        # Example response:
        # Job state: JOB_STATE_PENDING
        # Job state: JOB_STATE_RUNNING
        # Job state: JOB_STATE_SUCCEEDED

For descriptions of job state statuses,
see [JobState](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/JobState).

## 4. Retrieve batch output

When a batch inference job completes, the output is stored in the
Cloud Storage bucket that you specified when you created the job. For
successful rows, model responses are stored in the `response` field. Otherwise,
error details are stored in the `status` field for further inspection.

During long-running jobs, completed inferences are continuously exported to the
specified output destination. If the batch inference job is terminated, all
completed rows are exported. You are only charged for completed inferences.

> [!CAUTION]
> **Caution:** [Soft delete](https://docs.cloud.google.com/storage/docs/soft-delete) is enabled on Cloud Storage buckets, which retain content in a deleted state, potentially resulting in significant storage costs. We highly recommend you [Disable soft delete](https://docs.cloud.google.com/storage/docs/disable-soft-delete) to prevent unexpected charges.

### Output examples

> [!NOTE]
> **Note:** The following examples represent one line in the output JSONL file. They have been formatted for readability.

**Successful example**

    {
      "status": "",
      "processed_time": "2024-11-01T18:13:16.826+00:00",
      "request": {
        "contents": [
          {
            "parts": [
              {
                "fileData": null,
                "text": "What is the relation between the following video and image samples?"
              },
              {
                "fileData": {
                  "fileUri": "gs://cloud-samples-data/generative-ai/video/animals.mp4",
                  "mimeType": "video/mp4"
                },
                "text": null
              },
              {
                "fileData": {
                  "fileUri": "gs://cloud-samples-data/generative-ai/image/cricket.jpeg",
                  "mimeType": "image/jpeg"
                },
                "text": null
              }
            ],
            "role": "user"
          }
        ]
      },
      "response": {
        "candidates": [
          {
            "avgLogprobs": -0.5782725546095107,
            "content": {
              "parts": [
                {
                  "text": "This video shows a Google Photos marketing campaign where animals at the Los Angeles Zoo take self-portraits using a modified Google phone housed in a protective case. The image is unrelated."
                }
              ],
              "role": "model"
            },
            "finishReason": "STOP"
          }
        ],
        "modelVersion": "gemini-2.0-flash-001@default",
        "usageMetadata": {
          "candidatesTokenCount": 36,
          "promptTokenCount": 29180,
          "totalTokenCount": 29216
        }
      }
    }

**Failed example**

    {
      "status": "Bad Request: {\"error\": {\"code\": 400, \"message\": \"Please use a valid role: user, model.\", \"status\": \"INVALID_ARGUMENT\"}}",
      "processed_time": "2025-07-09T19:57:43.558+00:00",
      "request": {
        "contents": [
          {
            "parts": [
              {
                "text": "Explain how AI works in a few words"
              }
            ],
            "role": "tester"
          }
        ]
      },
      "response": {}
    }
