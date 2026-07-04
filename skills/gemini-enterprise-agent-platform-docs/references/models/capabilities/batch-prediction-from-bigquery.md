This page describes how to get batch inferences using BigQuery.

## 1. Prepare your inputs

### BigQuery storage input

Your service account must have have appropriate BigQuery
permissions. To grant the service account the **BigQuery User** role,
use the [`gcloud iam service-accounts add-iam-policy-binding`](https://cloud.google.com/sdk/gcloud/reference/iam/service-accounts/add-iam-policy-binding)
command as follows:

        gcloud projects add-iam-policy-binding PROJECT_ID \
            --member="serviceAccount:SERVICE_ACCOUNT_ID@PROJECT_ID.iam.gserviceaccount.com" \
            --role="roles/bigquery.user"

Replace the following values:

- <var translate="no">PROJECT_ID</var>: The ID for the project that your service account was created in.
- <var translate="no">SERVICE_ACCOUNT_ID</var>: The ID for the service account.

A `request` column is required, and must be [valid JSON](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#json_type). This
JSON data represents your input for the model.

The content in the `request` column must match the structure of a
[`GenerateContentRequest`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.publishers.models/generateContent#request-body).

Your input table can have column data types other than
`request`. These columns can have [BigQuery data types](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types) except
for the following: array, struct, range, datetime, and
geography. These columns are ignored for content generation but
included in the output table.

> [!IMPORTANT]
> **Important:** Don't use `response` or `status` as column names. These keywords are reserved by the system to provide information about the outcome of the batch inference job.

| Example input (JSON) |
|---|
| { "contents": [ { "role": "user", "parts": [ { "text": "Give me a recipe for banana bread." } ] } ], "system_instruction": { "parts": [ { "text": "You are a chef." } ] } } |

## 2. Submit a batch job

You can create a batch job through the Google Cloud console, the Google Gen AI SDK,
or the REST API.

The job and your table must be in the same region.

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
- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- <var class="edit" scope="MODEL_PATH" translate="no">MODEL_PATH</var>: The publisher model name, for example, `publishers/google/models/gemini-2.0-flash-001`; or the tuned endpoint name, for example, `projects/PROJECT_ID/locations/LOCATION/models/MODEL_ID`, where <var translate="no">MODEL_ID</var> is the model ID of the tuned model.
- <var class="edit" scope="INPUT_URI" translate="no">INPUT_URI</var>: The BigQuery table where your batch inference input is located such as `bq://myproject.mydataset.input_table`. The dataset must be located in the same region as the batch inference job. Multi-region datasets are not supported.
- <var class="edit" scope="OUTPUT_FORMAT" translate="no">OUTPUT_FORMAT</var>: To output to a BigQuery table, specify `bigquery`. To output to a Cloud Storage bucket, specify `jsonl`.
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
  "displayName": "my-bigquery-batch-inference-job",
  "model": "MODEL_PATH",
  "inputConfig": {
    "instancesFormat": "bigquery",
    "bigquerySource":{
      "inputUri" : "INPUT_URI"
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
  "displayName": "my-bigquery-batch-inference-job",
  "model": "publishers/google/models/gemini-2.5-flash",
  "inputConfig": {
    "instancesFormat": "bigquery",
    "bigquerySource": {
      "inputUri" : "INPUT_URI"
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
The response includes a unique identifier for the batch job. You can poll for the status of the batch job using the <var translate="no">BATCH_JOB_ID</var>. For more information, see [Monitor the job status](https://docs.cloud.google.com/gemini-enterprise-agent-platform#monitor). Note: Custom Service account, live progress, CMEK, and VPCSC reports are not supported.

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
    # output_uri = f"bq://your-project.your_dataset.your_table"

    job = client.batches.create(
        # To use a tuned model, set the model param to your tuned model using the following format:
        # model="projects/{PROJECT_ID}/locations/{LOCATION}/models/{MODEL_ID}
        model="gemini-2.5-flash",
        src="bq://storage-samples.generative_ai.batch_requests_for_multimodal_input",
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

After the job is submitted, you can check the status of your batch job using
API, SDK and Google Cloud console.

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

The status of the a given batch job can be any of the following:

- `JOB_STATE_PENDING`: Queue for capacity. The job can be in `queue` state up to 72-hour before entering `running` state.
- `JOB_STATE_RUNNING`: The input file was successfully validated and the batch is being run.
- `JOB_STATE_SUCCEEDED`: The batch has been completed and the results are ready
- `JOB_STATE_FAILED`: the input file has failed the validation process, or couldn't be completed within the 24-hour time window after entering `RUNNING` state.
- `JOB_STATE_CANCELLING`: The batch is being cancelled.
- `JOB_STATE_CANCELLED`: The batch was cancelled.

## 4. Retrieve batch output

When a batch inference task completes, the output is stored in the
BigQuery table that you specified in your request.

For succeeded rows, model responses are stored in the `response` column.
Otherwise, error details are stored in the `status` column for further
inspection.

### Output example

**Successful example**

    {
      "candidates": [
        {
          "content": {
            "role": "model",
            "parts": [
              {
                "text": "In a medium bowl, whisk together the flour, baking soda, baking powder."
              }
            ]
          },
          "finishReason": "STOP",
          "safetyRatings": [
            {
              "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              "probability": "NEGLIGIBLE",
              "probabilityScore": 0.14057204,
              "severity": "HARM_SEVERITY_NEGLIGIBLE",
              "severityScore": 0.14270912
            }
          ]
        }
      ],
      "usageMetadata": {
        "promptTokenCount": 8,
        "candidatesTokenCount": 396,
        "totalTokenCount": 404
      }
    }

**Failed example**

- Request

      {"contents":[{"parts":{"text":"Explain how AI works in a few words."},"role":"tester"}]}

- Response

      Bad Request: {"error": {"code": 400, "message": "Please use a valid role: user, model.", "status": "INVALID_ARGUMENT"}}
