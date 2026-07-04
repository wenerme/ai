This document describes how to tune a Gemini model by using supervised
fine-tuning.

## Before you begin

Before you begin, you must prepare a supervised fine-tuning dataset. Depending
on your use case, there are different requirements for preparing a dataset:

- [Text tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tune_gemini/text_tune)
- [Image tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tune_gemini/image_tune)
- [Document tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tune_gemini/doc_tune)
- [Audio tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tune_gemini/audio_tune)
- [Video tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tune_gemini/video_tune)
- [Tune function calling](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tune-function-calling)

> [!NOTE]
> To see an example of using the Google Gen AI SDK for Python to tune the text generation foundation model,
> run the "Supervised fine-tuning with Gemini for article summarization" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/tuning/sft_gemini_summarization.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Ftuning%2Fsft_gemini_summarization.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/tuning/sft_gemini_summarization.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/tuning/sft_gemini_summarization.ipynb)

> [!NOTE]
> To see an example of Supervised Fine-Tuning with integrated Gen AI evaluation service,
> run the "Supervised Fine-Tuning with integrated Gen AI Evaluation" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/tuning/sft_gemini_automatic_evaluation.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Ftuning%2Fsft_gemini_automatic_evaluation.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/tuning/sft_gemini_automatic_evaluation.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/tuning/sft_gemini_automatic_evaluation.ipynb)

## Supported models

The following Gemini models support supervised tuning:

#### Click to expand supported models

- [Gemini 3.1 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite)
- [Gemini 2.5 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro)
- [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash)
- [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite)

## Create a tuning job

You can create a supervised fine-tuning job by using the Google Cloud console, the
Google Gen AI SDK, the Agent Platform SDK for Python, the REST API, or
Colab Enterprise.

Optional: (Preview) Include the `evaluationConfig` to automatically [run an
evaluation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/run-evaluation) using the Gen AI evaluation service
after the tuning job completes. This evaluation configuration is available in
the `us-central1` region.

### Console

To tune a text model with supervised fine-tuning by using the
Google Cloud console, perform the following steps:

1. In the Gemini Enterprise Agent Platform section of the Google Cloud console, go to the **Agent Platform Studio** page.

   [Go to **Agent
   Platform Studio**](https://console.cloud.google.com/agent-platform/generative/language/tuning)
2. Click **Create tuned model**.
3. Under **Model details** , configure the following:
   1. In the **Tuned model name** field, enter a name for your new tuned model, up to 128 characters.
   2. In the **Base model** field, select the foundation model to tune.
   3. In the **Region** drop-down field, select the region where the pipeline tuning job runs and where the tuned model is deployed.
4. Under **Tuning setting** , configure the following:
   1. In the **Number of epochs** field, enter the number of steps to run for model tuning.
   2. In the **Adapter Size** field, enter the adapter size to use for model tuning.
   3. In the **Learning rate multiplier** field, enter the step size at each iteration. The default value is 1. .
5. Optional: To disable intermediate checkpoints and use only the latest checkpoint, click the **Export last checkpoint only** toggle.
6. Click **Continue** .

   The **Tuning dataset** page opens.
7. To upload a dataset file, select one of the following:
   1. If you haven't uploaded a dataset yet, select the radio button for **Upload file to Cloud Storage** .
      1. In the **Select JSONL file** field, click **Browse** and select your dataset file.
      2. In the **Dataset location** field, click **Browse** and select the Cloud Storage bucket where you want to store your dataset file.
   2. If your dataset file is already in a Cloud Storage bucket, select the radio button for **Existing file on Cloud Storage** .
      1. In **Cloud Storage file path** field, click **Browse** and select the Cloud Storage bucket where your dataset file is located.
8. (Optional) To get validation metrics during training, click the **Enable model validation** toggle.
   1. In the **Validation dataset** file, enter the Cloud Storage path of your validation dataset.
9. Click **Start Tuning** .

   Your new model appears under the **Tuned Models** section
   on the **Tune and Distill page** . When the model is finished tuning, the
   **Status** says **Succeeded**.

### Gen AI SDK

Install the Google Gen AI SDK:

```
pip install --upgrade google-genai
```

To learn more, see the [SDK reference documentation](https://googleapis.github.io/python-genai/).

Set environment variables to use the Gen AI SDK with
Gemini Enterprise Agent Platform:

```
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=us-central1
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

Create the tuning job:

    import time

    from google import genai
    from google.genai.types import HttpOptions, CreateTuningJobConfig, TuningDataset, EvaluationConfig, OutputConfig, GcsDestination, Metric

    # TODO(developer): Update and un-comment below line
    # output_gcs_uri = "gs://your-bucket/your-prefix"

    client = genai.Client(http_options=HttpOptions(api_version="v1beta1"))

    training_dataset = TuningDataset(
        gcs_uri="gs://cloud-samples-data/ai-platform/generative_ai/gemini/text/sft_train_data.jsonl",
    )
    validation_dataset = TuningDataset(
        gcs_uri="gs://cloud-samples-data/ai-platform/generative_ai/gemini/text/sft_validation_data.jsonl",
    )

    evaluation_config = EvaluationConfig(
        metrics=[
            Metric(
                name="FLUENCY",
                prompt_template="""Evaluate this {prediction}"""
            )
        ],
        output_config=OutputConfig(
            gcs_destination=GcsDestination(
                output_uri_prefix=output_gcs_uri,
            )
        ),
    )

    tuning_job = client.tunings.tune(
        base_model="gemini-2.5-flash",
        training_dataset=training_dataset,
        config=CreateTuningJobConfig(
            tuned_model_display_name="Example tuning job",
            validation_dataset=validation_dataset,
            evaluation_config=evaluation_config,
        ),
    )

    running_states = set([
        "JOB_STATE_PENDING",
        "JOB_STATE_RUNNING",
    ])

    while tuning_job.state in running_states:
        print(tuning_job.state)
        tuning_job = client.tunings.get(name=tuning_job.name)
        time.sleep(60)

    print(tuning_job.tuned_model.model)
    print(tuning_job.tuned_model.endpoint)
    print(tuning_job.experiment)
    # Example response:
    # projects/123456789012/locations/us-central1/models/1234567890@1
    # projects/123456789012/locations/us-central1/endpoints/123456789012345
    # projects/123456789012/locations/us-central1/metadataStores/default/contexts/tuning-experiment-2025010112345678

    if tuning_job.tuned_model.checkpoints:
        for i, checkpoint in enumerate(tuning_job.tuned_model.checkpoints):
            print(f"Checkpoint {i + 1}: ", checkpoint)
        # Example response:
        # Checkpoint 1:  checkpoint_id='1' epoch=1 step=10 endpoint='projects/123456789012/locations/us-central1/endpoints/123456789000000'
        # Checkpoint 2:  checkpoint_id='2' epoch=2 step=20 endpoint='projects/123456789012/locations/us-central1/endpoints/123456789012345'

### Agent Platform SDK

    import time

    import vertexai
    from vertexai.tuning import sft

    # TODO(developer): Update and un-comment below line
    # PROJECT_ID = "your-project-id"
    vertexai.init(project=PROJECT_ID, location="us-central1")

    sft_tuning_job = sft.train(
        source_model="gemini-2.0-flash-001",
        # 1.5 and 2.0 models use the same JSONL format
        train_dataset="gs://cloud-samples-data/ai-platform/generative_ai/gemini-1_5/text/sft_train_data.jsonl",
    )

    # Polling for job completion
    while not sft_tuning_job.has_ended:
        time.sleep(60)
        sft_tuning_job.refresh()

    print(sft_tuning_job.tuned_model_name)
    print(sft_tuning_job.tuned_model_endpoint_name)
    print(sft_tuning_job.experiment)
    # Example response:
    # projects/123456789012/locations/us-central1/models/1234567890@1
    # projects/123456789012/locations/us-central1/endpoints/123456789012345
    # <google.cloud.aiplatform.metadata.experiment_resources.Experiment object at 0x7b5b4ae07af0>

### REST

To create a model tuning job, send a POST request by using the [`tuningJobs.create`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.tuningJobs/create)
method. Some of the parameters are not supported by all of the models. Ensure
that you include only the applicable parameters for the model that you're
tuning.

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your project ID.
- <var class="edit" scope="TUNING_JOB_REGION" translate="no">TUNING_JOB_REGION</var>: The [region](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations) where the tuning job runs. This is also the default region for where the tuned model is uploaded.
- <var class="edit" scope="BASE_MODEL" translate="no">BASE_MODEL</var>: Name of the foundation model to tune.
- <var class="edit" scope="TRAINING_DATASET_URI" translate="no">TRAINING_DATASET_URI</var>: Cloud Storage URI of your training dataset. The dataset must be formatted as a JSONL file. For best results, provide at least 100 to 500 examples. For more information, see [About supervised tuning datasets](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-supervised-tuning-prepare).
- <var class="edit" scope="VALIDATION_DATASET_URI" translate="no">VALIDATION_DATASET_URI</var>Optional: The Cloud Storage URI of your validation dataset file.
- <var class="edit" scope="EPOCH_COUNT" translate="no">EPOCH_COUNT</var>Optional: The number of complete passes the model makes over the entire training dataset during training. Leave it unset to use the [pre-populated recommended value.](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/models/tuning#supervisedtuningspec)
- <var class="edit" scope="ADAPTER_SIZE" translate="no">ADAPTER_SIZE</var>Optional: The [Adapter size](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/models/tuning#adaptersize) to use for the tuning job. The adapter size influences the number of trainable parameters for the tuning job. A larger adapter size implies that the model can learn more complex tasks, but it requires a larger training dataset and longer training times.
- <var class="edit" scope="LEARNING_RATE_MULTIPLIER" translate="no">LEARNING_RATE_MULTIPLIER</var>: Optional: A multiplier to apply to the recommended learning rate. Leave it unset to use the [recommended value.](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/models/tuning#supervisedtuningspec)
- <var class="edit" scope="EXPORT_LAST_CHECKPOINT_ONLY" translate="no">EXPORT_LAST_CHECKPOINT_ONLY</var>Optional: Set to `true` to use only the latest checkpoint.
- <var class="edit" scope="METRIC_SPEC" translate="no">METRIC_SPEC</var>Optional: One or more [metric specs](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/models/evaluation) you are using to run an evaluation using the Gen AI evaluation service. You can use the following metric specs: `"pointwise_metric_spec"`, `"pairwise_metric_spec"`, `"exact_match_spec"`, `"bleu_spec"`, and `"rouge_spec"`.
- <var class="edit" scope="METRIC_SPEC_FIELD_NAME" translate="no">METRIC_SPEC_FIELD_NAME</var>Optional: The required fields for your chosen metric spec. For example, `"metric_prompt_template"`
- <var class="edit" scope="METRIC_SPEC_FIELD_NAME_CONTENT" translate="no">METRIC_SPEC_FIELD_NAME_CONTENT</var>Optional: The field content for your chosen metric spec. For example, you can use the following field content for a pointwise evaluation: `"Evaluate the fluency of this sentence: {response}. Give score from 0 to
  1. 0 - not fluent at all. 1 - very fluent."`
- <var class="edit" scope="CLOUD_STORAGE_BUCKET" translate="no">CLOUD_STORAGE_BUCKET</var>Optional: The Cloud Storage bucket to store the results of an evaluation run by the Gen AI evaluation service.
- <var class="edit" scope="TUNED_MODEL_DISPLAYNAME" translate="no">TUNED_MODEL_DISPLAYNAME</var>Optional: A display name for the tuned model. If not set, a random name is generated.
- <var class="edit" scope="KMS_KEY_NAME" translate="no">KMS_KEY_NAME</var>Optional: The Cloud KMS resource identifier of the customer-managed encryption key used to protect a resource. The key has the format: `projects/my-project/locations/my-region/keyRings/my-kr/cryptoKeys/my-key`. The key needs to be in the same region as where the compute resource is created. For more information, see [Customer-managed encryption keys (CMEK)](https://cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/cmek).
- <var class="edit" scope="SERVICE_ACCOUNT" translate="no">SERVICE_ACCOUNT</var>Optional: The service account that the tuningJob workload runs as. If not specified, the Agent Platform Secure Fine-Tuning Service Agent in the project is used. See [Tuning Service Agent](https://cloud.google.com/iam/docs/service-agents#vertex-ai-secure-fine-tuning-service-account). If you plan to use a customer-managed Service Account, you must grant the `roles/aiplatform.tuningServiceAgent` role to the service account. Also grant the [Tuning Service Agent](https://cloud.google.com/iam/docs/service-agents#vertex-ai-secure-fine-tuning-service-account) `roles/iam.serviceAccountTokenCreator` role to the customer-managed Service Account.

HTTP method and URL:

```
POST https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs
```

Request JSON body:

```
{
  "baseModel": "BASE_MODEL",
  "supervisedTuningSpec" : {
      "trainingDatasetUri": "TRAINING_DATASET_URI",
      "validationDatasetUri": "VALIDATION_DATASET_URI",
      "hyperParameters": {
          "epochCount": "EPOCH_COUNT",
          "adapterSize": "ADAPTER_SIZE",
          "learningRateMultiplier": "LEARNING_RATE_MULTIPLIER"
      },
      "exportLastCheckpointOnly": EXPORT_LAST_CHECKPOINT_ONLY,
      "evaluationConfig": {
          "metrics": [
              {
                  "aggregation_metrics": ["AVERAGE", "STANDARD_DEVIATION"],
                  "METRIC_SPEC": {
                      "METRIC_SPEC_FIELD_NAME":
                          METRIC_SPEC_FIELD_CONTENT
                  }
              },
          ],
          "outputConfig": {
              "gcs_destination": {
                  "output_uri_prefix": "CLOUD_STORAGE_BUCKET"
              }
          },
      },
  },
  "tunedModelDisplayName": "TUNED_MODEL_DISPLAYNAME",
  "encryptionSpec": {
    "kmsKeyName": "KMS_KEY_NAME"
  },
  "serviceAccount": "SERVICE_ACCOUNT"
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
     "https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs"
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
    -Uri "https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```
{
  "name": "projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs/TUNING_JOB_ID",
  "createTime": CREATE_TIME,
  "updateTime": UPDATE_TIME,
  "status": "STATUS",
  "supervisedTuningSpec": {
        "trainingDatasetUri": "TRAINING_DATASET_URI",
        "validationDatasetUri": "VALIDATION_DATASET_URI",
        "hyperParameters": {
            "epochCount": EPOCH_COUNT,
            "adapterSize": "ADAPTER_SIZE",
            "learningRateMultiplier": LEARNING_RATE_MULTIPLIER
        },
    },
  "tunedModelDisplayName": "TUNED_MODEL_DISPLAYNAME",
  "encryptionSpec": {
    "kmsKeyName": "KMS_KEY_NAME"
  },
  "serviceAccount": "SERVICE_ACCOUNT"
}
```

#### Example curl command

```
PROJECT_ID=myproject
LOCATION=global
curl \
-X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json; charset=utf-8" \
"https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/tuningJobs" \
-d \
$'{
   "baseModel": "gemini-2.5-flash",
   "supervisedTuningSpec" : {
      "training_dataset_uri": "gs://cloud-samples-data/ai-platform/generative_ai/gemini/text/sft_train_data.jsonl",
      "validation_dataset_uri": "gs://cloud-samples-data/ai-platform/generative_ai/gemini/text/sft_validation_data.jsonl"
   },
   "tunedModelDisplayName": "tuned_gemini"
}'
```

### Colab Enterprise

You can create a model tuning job in Agent Platform by using the
side panel in Colab Enterprise. The side panel
adds the relevant code snippets to your notebook. Then, you modify
the code snippets and run them to create your tuning job. To learn more
about using the side panel with your Agent Platform tuning jobs,
see [Interact with Agent Platform
to tune a model](https://docs.cloud.google.com/colab/docs/tuning).

1. In the Google Cloud console, go to
   the Colab Enterprise **My notebooks** page.

   [Go to My notebooks](https://console.cloud.google.com/vertex-ai/colab/notebooks)
2. In the **Region** menu, select the region that contains your notebook.

3. Click the notebook that you want to open. If you haven't created a notebook yet,
   [create a notebook](https://docs.cloud.google.com/colab/docs/create-console-quickstart#create).

4.
   To the right of your notebook, in the side panel, click the
   ! **Tuning**
   button.

   The side panel expands the **Tuning** tab.
5. Click the **Tune a Gemini model** button.

   Colab Enterprise adds code cells to your notebook for
   tuning a Gemini model.
6.
   In your notebook, find the code cell that stores parameter values.
   You'll use these parameters to interact with Vertex AI.

7. Update the values for the following parameters:

   - `PROJECT_ID`: The ID of the project that your notebook is in.
   - `REGION`: The region that your notebook is in.
   - `TUNED_MODEL_DISPLAY_NAME`: The name of your tuned model.
8. In the next code cell, update the model tuning parameters:

   - `source_model`: The Gemini model that you want to use, for example, `gemini-2.0-flash-001`.
   - `train_dataset`: The URL of your training dataset.
   - `validation_dataset`: The URL of your validation dataset.
   - Adjust the remaining parameters as needed.
9. Run the code cells that the side panel added to your notebook.

10.
    After the last code cell runs, click the
    ! **View
    tuning job** button that appears.

11. The side panel shows information about your model tuning job.

    - The **Monitor** tab shows tuning metrics when the metrics are ready.
    - The **Dataset** tab shows a summary and metrics about your dataset after the dataset has been processed.
    - The **Details** tab shows information about your tuning job, such as the tuning method and the base model (source model) that you used.
12.
    After the tuning job has completed, you can go directly from
    the **Tuning details** tab to a page where you can test your model.
    Click **Test**.

    The Google Cloud console opens to the Vertex AI
    **Text chat** page, where you can test your model.

### Tuning hyperparameters

It's recommended to submit your first tuning job without changing the
hyperparameters. The default value is the recommended value based on our
benchmarking results to yield the best model output quality.

- Epochs: The number of complete passes the model makes over the entire training dataset during training. Gemini Enterprise Agent Platform automatically adjusts the default value to your training dataset size. This value is based on benchmarking results to optimize model output quality.
- Adapter size: The Adapter size to use for the tuning job. The adapter size influences the number of trainable parameters for the tuning job. A larger adapter size implies that the model can learn more complex tasks, but it requires a larger training dataset and longer training times.
- Learning Rate Multiplier: A multiplier to apply to the recommended learning rate. You can increase the value to converge faster, or decrease the value to avoid overfitting.

For a discussion of best practices for supervised fine-tuning, see the blog post
[Supervised Fine Tuning for Gemini: A best practices
guide](https://cloud.google.com/blog/products/ai-machine-learning/master-gemini-sft).

## View a list of tuning jobs

You can view a list of tuning jobs in your current project by using the
Google Cloud console, the Google Gen AI SDK, the Agent Platform SDK for Python, or by
sending a GET request by using the `tuningJobs` method.

### Console

To view your tuning jobs in the Google Cloud console, go to the
**Agent Platform Studio** page.

[Go to **Agent Platform Studio**](https://console.cloud.google.com/agent-platform/generative/language/tuning)

Your Gemini tuning jobs are listed in the table under the **Tuned
Models** section.

### Google Gen AI SDK

    from google import genai
    from google.genai.types import HttpOptions

    client = genai.Client(http_options=HttpOptions(api_version="v1"))

    responses = client.tunings.list()
    for response in responses:
        print(response.name)
        # Example response:
        # projects/123456789012/locations/us-central1/tuningJobs/123456789012345

### Agent Platform SDK for Python

    import vertexai
    from vertexai.tuning import sft

    # TODO(developer): Update and un-comment below line
    # PROJECT_ID = "your-project-id"
    vertexai.init(project=PROJECT_ID, location="us-central1")

    responses = sft.SupervisedTuningJob.list()

    for response in responses:
        print(response)
    # Example response:
    # <vertexai.tuning._supervised_tuning.SupervisedTuningJob object at 0x7c85287b2680>
    # resource name: projects/12345678/locations/us-central1/tuningJobs/123456789012345

### REST

To view a list of model tuning jobs, send a GET request by using the
[`tuningJobs.list`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.tuningJobs/list)
method.

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: .
- <var class="edit" scope="TUNING_JOB_REGION" translate="no">TUNING_JOB_REGION</var>: The [region](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations) where the tuning job runs. This is also the default region for where the tuned model is uploaded.

HTTP method and URL:

```
GET https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs
```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs"
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
    -Uri "https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```
{
  "tuning_jobs": [
    TUNING_JOB_1, TUNING_JOB_2, ...
  ]
}
```

## Get details of a tuning job

You can get the details of a tuning job in your current project by using the
Google Cloud console, the Google Gen AI SDK, the Agent Platform SDK for Python, or by
sending a GET request by using the `tuningJobs` method.

### Console

1. To view details of a tuned model in the Google Cloud console, go to the
   **Agent Platform Studio** page.

   [Go to **Agent Platform Studio**](https://console.cloud.google.com/agent-platform/generative/language/tuning)
2. In the **Tuned Models** table, find your model and click **Details**.

   The details of your model are shown.

### Google Gen AI SDK

    from google import genai
    from google.genai.types import HttpOptions

    client = genai.Client(http_options=HttpOptions(api_version="v1"))

    # Get the tuning job and the tuned model.
    # Eg. tuning_job_name = "projects/123456789012/locations/us-central1/tuningJobs/123456789012345"
    tuning_job = client.tunings.get(name=tuning_job_name)

    print(tuning_job.tuned_model.model)
    print(tuning_job.tuned_model.endpoint)
    print(tuning_job.experiment)
    # Example response:
    # projects/123456789012/locations/us-central1/models/1234567890@1
    # projects/123456789012/locations/us-central1/endpoints/123456789012345
    # projects/123456789012/locations/us-central1/metadataStores/default/contexts/tuning-experiment-2025010112345678

### Agent Platform SDK for Python

    import vertexai
    from vertexai.tuning import sft

    # TODO(developer): Update and un-comment below lines
    # PROJECT_ID = "your-project-id"
    # LOCATION = "us-central1"
    vertexai.init(project=PROJECT_ID, location=LOCATION)

    tuning_job_id = "4982013113894174720"
    response = sft.SupervisedTuningJob(
        f"projects/{PROJECT_ID}/locations/{LOCATION}/tuningJobs/{tuning_job_id}"
    )

    print(response)
    # Example response:
    # <vertexai.tuning._supervised_tuning.SupervisedTuningJob object at 0x7cc4bb20baf0>
    # resource name: projects/1234567890/locations/us-central1/tuningJobs/4982013113894174720

### REST

To view a list of model tuning jobs, send a GET request by using the
[`tuningJobs.get`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.tuningJobs/get)
method and specify the `TuningJob_ID`.

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: .
- <var class="edit" scope="TUNING_JOB_REGION" translate="no">TUNING_JOB_REGION</var>: The [region](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations) where the tuning job runs. This is also the default region for where the tuned model is uploaded.
- <var class="edit" scope="TUNING_JOB_ID" translate="no">TUNING_JOB_ID</var>: The ID of the tuning job.

HTTP method and URL:

```
GET https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs/TUNING_JOB_ID
```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs/TUNING_JOB_ID"
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
    -Uri "https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs/TUNING_JOB_ID" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```
{
  "name": "projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs/TUNING_JOB_ID",
  "tunedModelDisplayName": "TUNED_MODEL_DISPLAYNAME",
  "createTime": CREATE_TIME,
  "endTime": END_TIME,
  "tunedModel": {
      "model": "projects/PROJECT_ID/locations/TUNING_JOB_REGION/models/MODEL_ID",
      "endpoint": "projects/PROJECT_ID/locations/TUNING_JOB_REGION/endpoints/ENDPOINT_ID"
  },
  "experiment": "projects/PROJECT_ID/locations/TUNING_JOB_REGION/metadataStores/default/contexts/EXPERIMENT_ID",
  "tuning_data_statistics": {
      "supervisedTuningDataStats": {
          "tuninDatasetExampleCount": "TUNING_DATASET_EXAMPLE_COUNT",
          "totalBillableTokenCount": "TOTAL_BILLABLE_TOKEN_COUNT",
          "tuningStepCount": "TUNING_STEP_COUNT"
      }
  },
  "status": "STATUS",
  "supervisedTuningSpec" : {
        "trainingDatasetUri": "TRAINING_DATASET_URI",
        "validationDataset_uri": "VALIDATION_DATASET_URI",
        "hyperParameters": {
            "epochCount": EPOCH_COUNT,
            "learningRateMultiplier": LEARNING_RATE_MULTIPLIER
        }
    }
}
```

## Cancel a tuning job

You can cancel a tuning job in your current project by using the Google Cloud console or
the Agent Platform SDK for Python, or by sending a POST request using the `tuningJobs` method.

### REST

To view a list of model tuning jobs, send a GET request by using the
[`tuningJobs.cancel`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.tuningJobs/cancel)
method and specify the `TuningJob_ID`.

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: .
- <var class="edit" scope="TUNING_JOB_REGION" translate="no">TUNING_JOB_REGION</var>: The [region](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations) where the tuning job runs. This is also the default region for where the tuned model is uploaded.
- <var class="edit" scope="TUNING_JOB_ID" translate="no">TUNING_JOB_ID</var>: The ID of the tuning job.

HTTP method and URL:

```
POST https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs/TUNING_JOB_ID:cancel
```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d "" \
     "https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs/TUNING_JOB_ID:cancel"
```

#### PowerShell

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method POST `
    -Headers $headers `
    -Uri "https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs/TUNING_JOB_ID:cancel" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```
{}
```

### Agent Platform SDK for Python

    import vertexai
    from vertexai.tuning import sft

    # TODO(developer): Update and un-comment below lines
    # PROJECT_ID = "your-project-id"
    # LOCATION = "us-central1"
    vertexai.init(project=PROJECT_ID, location=LOCATION)

    tuning_job_id = "4982013113894174720"
    job = sft.SupervisedTuningJob(
        f"projects/{PROJECT_ID}/locations/{LOCATION}/tuningJobs/{tuning_job_id}"
    )
    job.cancel()

### Console

1. To cancel a tuning job in the Google Cloud console, go to the
   **Agent Platform Studio** page.

   [Go to **Agent Platform Studio**](https://console.cloud.google.com/agent-platform/generative/language/tuning)
2. In the **Tuned Models** table, click **Manage run**.

3. Click **Cancel**.

> [!NOTE]
> **Note:** If you configured the Gen AI evaluation service to run automatically during tuning, any evaluations that are in progress still run to completion even if you cancel the tuning job.

## Evaluate the tuned model

If you didn't [configure the Gen AI evaluation service](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-use-supervised-tuning#create_a_text_model_supervised_tuning_job) to run automatically after the tuning job, you can interact with the tuned model endpoint the same way as base
Gemini by using the Agent Platform SDK for Python or the Google Gen AI SDK,
or by sending a POST request using the `generateContent` method.

For thinking models, we recommend to turn off thinking or set the thinking
budget to the minimum on tuned tasks for optimal performance and cost
efficiency. During supervised fine-tuning, the model learns
to mimic the ground truth in tuning dataset, omitting the thinking process.
Therefore, tuned model is able to handle the task without thinking budget
effectively.

The following example prompts a model with the question "Why is sky blue?".

### Console

1.
   To view details of a tuned model in the Google Cloud console, go to the
   **Agent Platform Studio** page.

   [Go to **Agent Platform Studio**](https://console.cloud.google.com/agent-platform/generative/language/tuning)
2.
   In the **Tuned Models** table, select **Test**.

   A page where you can create a conversation with your tuned model is
   displayed.

### Google Gen AI SDK

    from google import genai
    from google.genai.types import HttpOptions

    client = genai.Client(http_options=HttpOptions(api_version="v1"))

    # Get the tuning job and the tuned model.
    # Eg. tuning_job_name = "projects/123456789012/locations/us-central1/tuningJobs/123456789012345"
    tuning_job = client.tunings.get(name=tuning_job_name)

    contents = "Why is the sky blue?"

    # Predicts with the tuned endpoint.
    response = client.models.generate_content(
        model=tuning_job.tuned_model.endpoint,
        contents=contents,
    )
    print(response.text)
    # Example response:
    # The sky is blue because ...

### Agent Platform SDK for Python

```python
    from vertexai.preview.tuning import sft
    from vertexai.generative_models import GenerativeModel

    sft_tuning_job = sft.SupervisedTuningJob("projects//locations//tuningJobs/")
    tuned_model = GenerativeModel(sft_tuning_job.tuned_model_endpoint_name)
    content = "Why is sky blue?"
    print(tuned_model.generate_content(content))

```

### REST

To test a tuned model with a prompt, send a POST request and specify the \`MREP_LOCATION\` and \`ENDPOINT_ID\`.

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="MREP_LOCATION" translate="no">MREP_LOCATION</var>: The Google Cloud multi-region endpoint location that the tuning job runs in. The following are accepted values:
  - `us`
  - `eu`
- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your \[project ID\](/resource-manager/docs/creating-managing-projects#identifiers).
- <var class="edit" scope="ENDPOINT_ID" translate="no">ENDPOINT_ID</var>: The tuned model endpoint ID from the GET API.
- <var class="edit" scope="TEMPERATURE" translate="no">TEMPERATURE</var>: The temperature is used for sampling during response generation, which occurs when `topP` and `topK` are applied. Temperature controls the degree of randomness in token selection. Lower temperatures are good for prompts that require a less open-ended or creative response, while higher temperatures can lead to more diverse or creative results. A temperature of `0` means that the highest probability tokens are always selected. In this case, responses for a given prompt are mostly deterministic, but a small amount of variation is still possible.

  If the model returns a response that's too generic, too short, or the model gives a fallback
  response, try increasing the temperature. If the model enters infinite generation, increasing the
  temperature to at least `0.1` may lead to improved results.
  `1.0` is the recommended starting value for temperature.
- <var class="edit" scope="TOP_P" translate="no">TOP_P</var>: Top-P changes how the model selects tokens for output. Tokens are selected from the most probable to least probable until the sum of their probabilities equals the top-P value. For example, if tokens A, B, and C have a probability of 0.3, 0.2, and 0.1 and the top-P value is `0.5`, then the model will select either A or B as the next token by using temperature and excludes C as a candidate.

  Specify a lower value for less random responses and a higher value for more
  random responses.
- <var class="edit" scope="TOP_K" translate="no">TOP_K</var>: Top-K changes how the model selects tokens for output. A top-K of `1` means the next selected token is the most probable among all tokens in the model's vocabulary (also called greedy decoding), while a top-K of `3` means that the next token is selected from among the three most probable tokens by using temperature.

  For each token selection step, the top-K tokens with the highest
  probabilities are sampled. Then tokens are further filtered based on top-P with
  the final token selected using temperature sampling.

  Specify a lower value for less random responses and a higher value for more
  random responses.
- <var class="edit" scope="MAX_OUTPUT_TOKENS" translate="no">MAX_OUTPUT_TOKENS</var>: Maximum number of tokens that can be generated in the response. A token is approximately four characters. 100 tokens correspond to roughly 60-80 words.

  Specify a lower value for shorter responses and a higher value for potentially longer
  responses.

HTTP method and URL:

```
POST https://aiplatform.MREP_LOCATION.rep.googleapis.com/v1/projects/PROJECT_ID/locations/MREP_LOCATION/endpoints/ENDPOINT_ID:generateContent
```

Request JSON body:

```
{
    "contents": [
        {
            "role": "USER",
            "parts": {
                "text" : "Why is sky blue?"
            }
        }
    ],
    "generation_config": {
        "temperature":TEMPERATURE,
        "topP": TOP_P,
        "topK": TOP_K,
        "maxOutputTokens": MAX_OUTPUT_TOKENS
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
     "https://aiplatform.MREP_LOCATION.rep.googleapis.com/v1/projects/PROJECT_ID/locations/MREP_LOCATION/endpoints/ENDPOINT_ID:generateContent"
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
    -Uri "https://aiplatform.MREP_LOCATION.rep.googleapis.com/v1/projects/PROJECT_ID/locations/MREP_LOCATION/endpoints/ENDPOINT_ID:generateContent" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "The sky appears blue due to a phenomenon called Rayleigh
            scattering, where shorter blue wavelengths of sunlight are scattered
            more strongly by the Earth's atmosphere than longer red
            wavelengths."
          }
        ]
      },
      "finishReason": "STOP",
      "safetyRatings": [
        {
          "category": "HARM_CATEGORY_HATE_SPEECH",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.06325052,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.03179867
        },
        {
          "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.09334688,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.027742893
        },
        {
          "category": "HARM_CATEGORY_HARASSMENT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.17356819,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.025419652
        },
        {
          "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.07864238,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.020332353
        }
      ]
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 5,
    "candidatesTokenCount": 33,
    "totalTokenCount": 38
  }
}
```

### REST

To test a tuned model with a prompt, send a POST request and specify the \`TUNED_ENDPOINT_ID\`.

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your \[project ID\](/resource-manager/docs/creating-managing-projects#identifiers).
- <var class="edit" scope="TUNING_JOB_REGION" translate="no">TUNING_JOB_REGION</var>: The region where the tuning job runs. This is also the default region for where the tuned model is uploaded.
- <var class="edit" scope="ENDPOINT_ID" translate="no">ENDPOINT_ID</var>: The tuned model endpoint ID from the GET API.
- <var class="edit" scope="TEMPERATURE" translate="no">TEMPERATURE</var>: The temperature is used for sampling during response generation, which occurs when `topP` and `topK` are applied. Temperature controls the degree of randomness in token selection. Lower temperatures are good for prompts that require a less open-ended or creative response, while higher temperatures can lead to more diverse or creative results. A temperature of `0` means that the highest probability tokens are always selected. In this case, responses for a given prompt are mostly deterministic, but a small amount of variation is still possible.

  If the model returns a response that's too generic, too short, or the model gives a fallback
  response, try increasing the temperature. If the model enters infinite generation, increasing the
  temperature to at least `0.1` may lead to improved results.
  `1.0` is the recommended starting value for temperature.
- <var class="edit" scope="TOP_P" translate="no">TOP_P</var>: Top-P changes how the model selects tokens for output. Tokens are selected from the most probable to least probable until the sum of their probabilities equals the top-P value. For example, if tokens A, B, and C have a probability of 0.3, 0.2, and 0.1 and the top-P value is `0.5`, then the model will select either A or B as the next token by using temperature and excludes C as a candidate.

  Specify a lower value for less random responses and a higher value for more
  random responses.
- <var class="edit" scope="TOP_K" translate="no">TOP_K</var>: Top-K changes how the model selects tokens for output. A top-K of `1` means the next selected token is the most probable among all tokens in the model's vocabulary (also called greedy decoding), while a top-K of `3` means that the next token is selected from among the three most probable tokens by using temperature.

  For each token selection step, the top-K tokens with the highest
  probabilities are sampled. Then tokens are further filtered based on top-P with
  the final token selected using temperature sampling.

  Specify a lower value for less random responses and a higher value for more
  random responses.
- <var class="edit" scope="MAX_OUTPUT_TOKENS" translate="no">MAX_OUTPUT_TOKENS</var>: Maximum number of tokens that can be generated in the response. A token is approximately four characters. 100 tokens correspond to roughly 60-80 words.

  Specify a lower value for shorter responses and a higher value for potentially longer
  responses.

HTTP method and URL:

```
POST https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/endpoints/ENDPOINT_ID:generateContent
```

Request JSON body:

```
{
    "contents": [
        {
            "role": "USER",
            "parts": {
                "text" : "Why is sky blue?"
            }
        }
    ],
    "generation_config": {
        "temperature":TEMPERATURE,
        "topP": TOP_P,
        "topK": TOP_K,
        "maxOutputTokens": MAX_OUTPUT_TOKENS
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
     "https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/endpoints/ENDPOINT_ID:generateContent"
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
    -Uri "https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/endpoints/ENDPOINT_ID:generateContent" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [Why is sky blue?
          {
            "text": "The sky appears blue due to a phenomenon called Rayleigh
            scattering, where shorter blue wavelengths of sunlight are scattered
            more strongly by the Earth's atmosphere than longer red
            wavelengths."
          }
        ]
      },
      "finishReason": "STOP",
      "safetyRatings": [
        {
          "category": "HARM_CATEGORY_HATE_SPEECH",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.06325052,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.03179867
        },
        {
          "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.09334688,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.027742893
        },
        {
          "category": "HARM_CATEGORY_HARASSMENT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.17356819,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.025419652
        },
        {
          "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.07864238,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.020332353
        }
      ]
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 5,
    "candidatesTokenCount": 33,
    "totalTokenCount": 38
  }
}
```

## Delete a tuned model

To delete a tuned model:

### REST

Call the [`models.delete`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.models/delete) method.

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: .
- <var class="edit" scope="REGION" translate="no">REGION</var>: The region where the tuned model is located.
- <var class="edit" scope="MODEL_ID" translate="no">MODEL_ID</var>: The model to delete.

HTTP method and URL:

```
DELETE https://REGION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/REGION/models/MODEL_ID
```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
curl -X DELETE \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://REGION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/REGION/models/MODEL_ID"
```

#### PowerShell

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method DELETE `
    -Headers $headers `
    -Uri "https://REGION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/REGION/models/MODEL_ID" | Select-Object -Expand Content
```

You should receive a successful status code (2xx) and an empty response.

### Agent Platform SDK for Python

    from google.cloud import aiplatform

    aiplatform.https://docs.cloud.google.com/python/docs/reference/aiplatform/latest/google.cloud.aiplatform.html(project=PROJECT_ID, location=LOCATION)

    # To find out which models are available in Model Registry
    models = aiplatform.Model.list()

    model = aiplatform.https://docs.cloud.google.com/python/docs/reference/aiplatform/latest/google.cloud.aiplatform_v1.types.Model.html(MODEL_ID)
    model.delete()

## Tuning and validation metrics

You can configure a model tuning job to collect and report model tuning and
model evaluation metrics, which can then be visualized in
**Agent Platform Studio**.

1. To view details of a tuned model in the Google Cloud console, go to the
   **Agent Platform Studio** page.

   [Go to **Agent Platform Studio**](https://console.cloud.google.com/agent-platform/generative/language/tuning)
2. In the **Tune and Distill** table, click the name of the tuned model
   that you want to view metrics for.

   The tuning metrics appear under the **Monitor** tab.

### Model tuning metrics

The model tuning job automatically collects the following tuning metrics
for `Gemini 2.0 Flash`:

- `/train_total_loss`: Loss for the tuning dataset at a training step.
- `/train_fraction_of_correct_next_step_preds`: The token accuracy at a training step. A single inference consists of a sequence of predicted tokens. This metric measures the accuracy of the predicted tokens when compared to the ground truth in the tuning dataset.
- `/train_num_predictions`: Number of predicted tokens at a training step.

### Model validation metrics

You can configure a model tuning job to collect the following validation metrics
for `Gemini 2.0 Flash`:

- `/eval_total_loss`: Loss for the validation dataset at a validation step.
- `/eval_fraction_of_correct_next_step_preds`: The token accuracy at an validation step. A single inference consists of a sequence of predicted tokens. This metric measures the accuracy of the predicted tokens when compared to the ground truth in the validation dataset.
- `/eval_num_predictions`: Number of predicted tokens at a validation step.

The metrics visualizations are available after the tuning job starts running.
It will be updated in real time as tuning progresses.
If you don't specify a validation dataset when you create the tuning job, only
the visualizations for the tuning metrics are available.

## What's next

- Learn about
  [deploying a tuned Gemini model](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/overview#deploy_a_tuned_model).

- To learn how supervised fine-tuning can be used in a solution that builds a
  generative AI knowledge base, see
  [Jump Start Solution: Generative AI knowledge base](https://docs.cloud.google.com/architecture/ai-ml/generative-ai-knowledge-base).
