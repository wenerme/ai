Getting batch responses is a way to efficiently send large numbers of
non-latency-sensitive embedding requests. Unlike online responses, where you are
limited to one input request at a time, you can send many embedding requests in
a single batch request. Similar to how batch inference is done for [tabular data
in
Gemini Enterprise Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/tabular-data/classification-regression/get-batch-predictions),
you determine your output location, add your input, and your responses are
asynchronously populated into your output location.

## Text embeddings models that support batch inferences

All stable versions of text embedding models support batch inferences with the
exception of Gemini embeddings (gemini-embedding-001). Stable versions
are fully supported for production environments. To view the full list of
embedding models, see [Embedding model and versions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions#embedding_models_and_versions).

## Prepare your inputs

The input for batch requests are a list of prompts that can either be stored in
a BigQuery table or as a
[JSON Lines (JSONL)](https://jsonlines.org/) file in
Cloud Storage. Each request can include up to 30,000 prompts.

### JSONL example

This section shows examples of how to format JSONL input and output.

#### JSONL input example

    {"content":"Give a short description of a machine learning model:"}
    {"content":"Best recipe for banana bread:"}

#### JSONL output example

    {"instance":{"content":"Give..."},"predictions": [{"embeddings":{"statistics":{"token_count":8,"truncated":false},"values":[0.2,....]}}],"status":""}
    {"instance":{"content":"Best..."},"predictions": [{"embeddings":{"statistics":{"token_count":3,"truncated":false},"values":[0.1,....]}}],"status":""}

### BigQuery example

This section shows examples of how to format BigQuery input and output.

#### BigQuery input example

This example shows a single column BigQuery table.

| content |
|---|
| "Give a short description of a machine learning model:" |
| "Best recipe for banana bread:" |

#### BigQuery output example

| content | predictions | status |
|---|---|---|
| "Give a short description of a machine learning model:" | ```json '[{"embeddings": { "statistics":{"token_count":8,"truncated":false}, "Values":[0.1,....] } } ]' ``` |   |
| "Best recipe for banana bread:" | ```json '[{"embeddings": { "statistics":{"token_count":3,"truncated":false}, "Values":[0.2,....] } } ]' ``` |   |

## Request a batch response

Depending on the number of input items that you've submitted, a
batch generation task can take some time to complete.

### REST

To test a text prompt by using the Agent Platform API, send a POST request to the
publisher model endpoint.

Before using any of the request data,
make the following replacements:

- <var translate="no">PROJECT_ID</var>: The ID of your Google Cloud project.
- <var translate="no">BP_JOB_NAME</var>: The job name.
- <var translate="no">INPUT_URI</var>: The input source URI. This is either a BigQuery table URI or a JSONL file URI in Cloud Storage.
- <var translate="no">OUTPUT_URI</var>: Output target URI.

HTTP method and URL:

```
POST https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/batchPredictionJobs
```

Request JSON body:

```
{
    "name": "BP_JOB_NAME",
    "displayName": "BP_JOB_NAME",
    "model": "publishers/google/models/textembedding-gecko",
    "inputConfig": {
      "instancesFormat":"bigquery",
      "bigquerySource":{
        "inputUri" : "INPUT_URI"
      }
    },
    "outputConfig": {
      "predictionsFormat":"bigquery",
      "bigqueryDestination":{
        "outputUri": "OUTPUT_URI"
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
     "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/batchPredictionJobs"
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
    -Uri "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/batchPredictionJobs" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

```
{
  "name": "projects/123456789012/locations/us-central1/batchPredictionJobs/1234567890123456789",
  "displayName": "BP_sample_publisher_BQ_20230712_134650",
  "model": "projects/{PROJECT_ID}/locations/us-central1/models/textembedding-gecko",
  "inputConfig": {
    "instancesFormat": "bigquery",
    "bigquerySource": {
      "inputUri": "bq://project_name.dataset_name.text_input"
    }
  },
  "modelParameters": {},
  "outputConfig": {
    "predictionsFormat": "bigquery",
    "bigqueryDestination": {
      "outputUri": "bq://project_name.llm_dataset.embedding_out_BP_sample_publisher_BQ_20230712_134650"
    }
  },
  "state": "JOB_STATE_PENDING",
  "createTime": "2023-07-12T20:46:52.148717Z",
  "updateTime": "2023-07-12T20:46:52.148717Z",
  "labels": {
    "owner": "sample_owner",
    "product": "llm"
  },
  "modelVersionId": "1",
  "modelMonitoringStatus": {}
}
```

The response includes a unique identifier for the batch job.
You can poll for the status of the batch job using
the <var translate="no">BATCH_JOB_ID</var> until the job `state` is
`JOB_STATE_SUCCEEDED`. For example:

```bash
curl \
  -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/batchPredictionJobs/BATCH_JOB_ID
```

> [!NOTE]
> **Note:** You can run only one batch response job at a time. Custom Service accounts, live progress, CMEK, and VPC-SC reports aren't supported at this time.

### Python

#### Install

```
pip install --upgrade google-genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/python-genai/).

Set environment variables to use the Google Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=us-central1
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    import time

    from google import genai
    from google.genai.types import CreateBatchJobConfig, JobState, HttpOptions

    client = genai.Client(http_options=HttpOptions(api_version="v1"))
    # TODO(developer): Update and un-comment below line
    # output_uri = "gs://your-bucket/your-prefix"

    # See the documentation: https://googleapis.github.io/python-genai/genai.html#genai.batches.Batches.create
    job = client.batches.create(
        model="text-embedding-005",
        # Source link: https://storage.cloud.google.com/cloud-samples-data/generative-ai/embeddings/embeddings_input.jsonl
        src="gs://cloud-samples-data/generative-ai/embeddings/embeddings_input.jsonl",
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
        if job.state == JobState.JOB_STATE_FAILED:
            print(f"Error: {job.error}")
            break

    # Example response:
    # Job state: JOB_STATE_PENDING
    # Job state: JOB_STATE_RUNNING
    # Job state: JOB_STATE_RUNNING
    # ...
    # Job state: JOB_STATE_SUCCEEDED

### Go

Learn how to install or update the [Go](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview).

To learn more, see the
[SDK reference documentation](https://pkg.go.dev/google.golang.org/genai).

Set environment variables to use the Google Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=us-central1
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    import (
        "context"
        "fmt"
        "io"
        "time"

        "google.golang.org/genai"
    )

    // generateBatchEmbeddings shows how to run a batch embeddings prediction job.
    func generateBatchEmbeddings(w io.Writer, outputURI string) error {
        // outputURI = "gs://your-bucket/your-prefix"
        ctx := context.Background()

        client, err := genai.NewClient(ctx, &genai.ClientConfig{
            HTTPOptions: genai.HTTPOptions{APIVersion: "v1"},
        })
        if err != nil {
            return fmt.Errorf("failed to create genai client: %w", err)
        }
        modelName := "text-embedding-005"
        // See the documentation: https://pkg.go.dev/google.golang.org/genai#Batches.Create
        job, err := client.Batches.Create(ctx,
            modelName,
            &genai.BatchJobSource{
                Format: "jsonl",
                // Source link: https://storage.cloud.google.com/cloud-samples-data/generative-ai/embeddings/embeddings_input.jsonl
                GCSURI: []string{"gs://cloud-samples-data/generative-ai/embeddings/embeddings_input.jsonl"},
            },
            &genai.CreateBatchJobConfig{
                Dest: &genai.BatchJobDestination{
                    Format: "jsonl",
                    GCSURI: outputURI,
                },
            },
        )
        if err != nil {
            return fmt.Errorf("failed to create batch job: %w", err)
        }

        fmt.Fprintf(w, "Job name: %s\n", job.Name)
        fmt.Fprintf(w, "Job state: %s\n", job.State)
        // Example response:
        //  Job name: projects/{PROJECT_ID}/locations/us-central1/batchPredictionJobs/9876453210000000000
        //  Job state: JOB_STATE_PENDING

        // See the documentation: https://pkg.go.dev/google.golang.org/genai#BatchJob
        completedStates := map[genai.JobState]bool{
            genai.JobStateSucceeded: true,
            genai.JobStateFailed:    true,
            genai.JobStateCancelled: true,
            genai.JobStatePaused:    true,
        }

        // Poll until job finishes
        for !completedStates[job.State] {
            time.Sleep(30 * time.Second)
            job, err = client.Batches.Get(ctx, job.Name, nil)
            if err != nil {
                return fmt.Errorf("failed to get batch job: %w", err)
            }
            fmt.Fprintf(w, "Job state: %s\n", job.State)

            if job.State == genai.JobStateFailed {
                fmt.Fprintf(w, "Error: %+v\n", job.Error)
                break
            }
        }

        //  Example response:
        //    Job state: JOB_STATE_PENDING
        //    Job state: JOB_STATE_RUNNING
        //    Job state: JOB_STATE_RUNNING
        //    ...
        //    Job state: JOB_STATE_SUCCEEDED

        return nil
    }

### Node.js

#### Install

```
npm install @google/genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/js-genai/).

Set environment variables to use the Google Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=us-central1
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    const {GoogleGenAI} = require('@google/genai');

    const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT;
    const GOOGLE_CLOUD_LOCATION =
      process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';
    const OUTPUT_URI = 'gs://your-bucket/your-prefix';

    async function runBatchPredictionJob(
      outputUri = OUTPUT_URI,
      projectId = GOOGLE_CLOUD_PROJECT,
      location = GOOGLE_CLOUD_LOCATION
    ) {
      const client = new GoogleGenAI({
        vertexai: true,
        project: projectId,
        location: location,
        httpOptions: {
          apiVersion: 'v1',
        },
      });

      // See the documentation: https://googleapis.github.io/js-genai/release_docs/classes/batches.Batches.html
      let job = await client.batches.create({
        model: 'text-embedding-005',
        // Source link: https://storage.cloud.google.com/cloud-samples-data/batch/prompt_for_batch_gemini_predict.jsonl
        src: 'gs://cloud-samples-data/generative-ai/embeddings/embeddings_input.jsonl',
        config: {
          dest: outputUri,
        },
      });

      console.log(`Job name: ${job.name}`);
      console.log(`Job state: ${job.state}`);

      // Example response:
      //  Job name: projects/%PROJECT_ID%/locations/us-central1/batchPredictionJobs/9876453210000000000
      //  Job state: JOB_STATE_PENDING

      const completedStates = new Set([
        'JOB_STATE_SUCCEEDED',
        'JOB_STATE_FAILED',
        'JOB_STATE_CANCELLED',
        'JOB_STATE_PAUSED',
      ]);

      while (!completedStates.has(job.state)) {
        await new Promise(resolve => setTimeout(resolve, 30000));
        job = await client.batches.get({name: job.name});
        console.log(`Job state: ${job.state}`);
      }

      // Example response:
      //  Job state: JOB_STATE_PENDING
      //  Job state: JOB_STATE_RUNNING
      //  Job state: JOB_STATE_RUNNING
      //  ...
      //  Job state: JOB_STATE_SUCCEEDED

      return job.state;
    }

### Java

Learn how to install or update the [Java](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview).

To learn more, see the
[SDK reference documentation](https://central.sonatype.com/artifact/com.google.genai/google-genai).

Set environment variables to use the Google Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=us-central1
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    import static com.google.genai.types.JobState.Known.JOB_STATE_CANCELLED;
    import static com.google.genai.types.JobState.Known.JOB_STATE_FAILED;
    import static com.google.genai.types.JobState.Known.JOB_STATE_PAUSED;
    import static com.google.genai.types.JobState.Known.JOB_STATE_SUCCEEDED;

    import com.google.genai.Client;
    import com.google.genai.types.BatchJob;
    import com.google.genai.types.BatchJobDestination;
    import com.google.genai.types.BatchJobSource;
    import com.google.genai.types.CreateBatchJobConfig;
    import com.google.genai.types.GetBatchJobConfig;
    import com.google.genai.types.HttpOptions;
    import com.google.genai.types.JobState;
    import java.util.EnumSet;
    import java.util.Set;
    import java.util.concurrent.TimeUnit;

    public class BatchPredictionEmbeddingsWithGcs {

      public static void main(String[] args) throws InterruptedException {
        // TODO(developer): Replace these variables before running the sample.
        String modelId = "text-embedding-005";
        String outputGcsUri = "gs://your-bucket/your-prefix";
        createBatchJob(modelId, outputGcsUri);
      }

      // Creates a batch prediction job with embedding model and Google Cloud Storage.
      public static JobState createBatchJob(String modelId, String outputGcsUri)
          throws InterruptedException {
        // Client Initialization. Once created, it can be reused for multiple requests.
        try (Client client =
            Client.builder()
                .location("us-central1")
                .vertexAI(true)
                .httpOptions(HttpOptions.builder().apiVersion("v1").build())
                .build()) {

          // See the documentation:
          // https://googleapis.github.io/java-genai/javadoc/com/google/genai/Batches.html
          BatchJobSource batchJobSource =
              BatchJobSource.builder()
                  // Source link:
                  // https://storage.cloud.google.com/cloud-samples-data/generative-ai/embeddings/embeddings_input.jsonl
                  .gcsUri("gs://cloud-samples-data/generative-ai/embeddings/embeddings_input.jsonl")
                  .format("jsonl")
                  .build();

          CreateBatchJobConfig batchJobConfig =
              CreateBatchJobConfig.builder()
                  .displayName("your-display-name")
                  .dest(BatchJobDestination.builder().gcsUri(outputGcsUri).format("jsonl").build())
                  .build();

          BatchJob batchJob = client.batches.create(modelId, batchJobSource, batchJobConfig);

          String jobName =
              batchJob.name().orElseThrow(() -> new IllegalStateException("Missing job name"));
          JobState jobState =
              batchJob.state().orElseThrow(() -> new IllegalStateException("Missing job state"));
          System.out.println("Job name: " + jobName);
          System.out.println("Job state: " + jobState);
          // Job name: projects/.../locations/.../batchPredictionJobs/6205497615459549184
          // Job state: JOB_STATE_PENDING

          // See the documentation:
          // https://googleapis.github.io/java-genai/javadoc/com/google/genai/types/BatchJob.html
          Set<JobState.Known> completedStates =
              EnumSet.of(JOB_STATE_SUCCEEDED, JOB_STATE_FAILED, JOB_STATE_CANCELLED, JOB_STATE_PAUSED);

          while (!completedStates.contains(jobState.knownEnum())) {
            TimeUnit.SECONDS.sleep(30);
            batchJob = client.batches.get(jobName, GetBatchJobConfig.builder().build());
            jobState =
                batchJob
                    .state()
                    .orElseThrow(() -> new IllegalStateException("Missing job state during polling"));
            System.out.println("Job state: " + jobState);
          }
          // Example response:
          // Job state: JOB_STATE_QUEUED
          // Job state: JOB_STATE_RUNNING
          // ...
          // Job state: JOB_STATE_SUCCEEDED
          return jobState;
        }
      }
    }

## Retrieve batch output

When a batch inference task is complete, the output is stored
in the Cloud Storage bucket or BigQuery table that you specified
in your request.

## What's next

- Learn how to [get text embeddings](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/embeddings/get-text-embeddings).
