Continuous tuning lets you continue tuning an already tuned model or
[model checkpoint](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tuning-checkpoints)
by adding more epochs or training examples. Using an already tuned model or
checkpoint as a base model allows for more efficient tuning experimentation.

You can use continuous tuning for the following purposes:

- To tune with more data if an existing tuned model is [underfitting](https://developers.google.com/machine-learning/glossary#underfitting).
- To boost performance or keep the model up to date with new data.
- To further customize an existing tuned model.

The following Gemini models support continuous tuning:

#### Click to expand supported models

- [Gemini 3.1 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite)
- [Gemini 2.5 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro)
- [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash)
- [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite)

For detailed information about Gemini model versions, see
[Google models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models) and
[Model versions and lifecycle](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions).

### Configure continuous tuning

When creating a continuous tuning job, note the following:

- Continuous tuning is supported in the Google Gen AI SDK. It isn't supported in the Agent Platform SDK for Python.
- You must provide a model resource name:

  - In the Google Cloud console, the model resource name appears in the **Gemini Enterprise Agent Platform Tuning** page, in the **Tuning details \> Model Name** field.
  - The model resource name uses the following format:

      projects/{project}/locations/{location}/models/{modelId}@{version_id}

  - `{version_id}` is optional and can be either the generated version ID or a user-provided version alias. If it is omitted, the default version is used.
- If you don't specify a model version, the default version is used.

- If you're using a checkpoint as a base model and don't specify a checkpoint
  ID, the default checkpoint is used. For more information, see
  [Use checkpoints in supervised fine-tuning for Gemini models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tuning-checkpoints).
  In the Google Cloud console, the default checkpoint can be found as follows:

  1. Go to the Model Registry page.
  2. Click the **Model Name** for the model.
  3. Click **View all versions**.
  4. Click the desired version to view a list of checkpoints. The default checkpoint is indicated by the word `default` next to the checkpoint ID.
- By default, a new model version is created under the same parent model as the
  pre-tuned model. If you supply a new tuned model display name, a new model is
  created.

- Only supervised tuning base models that are tuned on or after July 11, 2025
  can be used as base models for continuous tuning.

- If you're using
  [customer-managed encryption keys (CMEK)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/cmek),
  your continuous tuning job must use the same CMEK that was used in the tuning
  job for the pre-tuned model.

### Console

To configure continuous tuning for a pre-tuned model by using the
Google Cloud console, perform the following steps:

1. In the Gemini Enterprise Agent Platform section of the Google Cloud console, go to the
   **Agent Platform Studio** page.

   [Go to **Agent Platform Studio**](https://console.cloud.google.com/agent-platform/generative/language/tuning)
2. Click **Create tuned model**.

3. Under **Model details**, configure the following:

   1. Choose **Tune a pre-tuned model**.
   2. In the **Pre-tuned model** field, choose the name of your pre-tuned model.
   3. If the model has at least one checkpoint, the **Checkpoint** drop-down field appears. Choose the desired checkpoint.
4. Click **Continue**.

### REST

To to configure continuous tuning, send a POST request by using the
[`tuningJobs.create`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.tuningJobs/create)
method. Some of the parameters are not supported by all of the models. Ensure
that you include only the applicable parameters for the model that you're
tuning.

Before using any of the request data,
make the following replacements:

- Parameters for continuous tuning:
  - <var class="edit" scope="TUNED_MODEL_NAME" translate="no">TUNED_MODEL_NAME</var>: Name of the tuned model to use.
  - <var class="edit" scope="CHECKPOINT_ID" translate="no">CHECKPOINT_ID</var>Optional: ID of the checkpoint to use.
- The remaining parameters are the same as for [supervised fine tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-use-supervised-tuning#rest) or [preference tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-use-preference-tuning#rest).

HTTP method and URL:

```
POST https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs
```

Request JSON body:

```
{
  "preTunedModel": {
      "tunedModelName": "TUNED_MODEL_NAME",
      "checkpointId": "CHECKPOINT_ID",
  },
  "supervisedTuningSpec" : {
      "trainingDatasetUri": "TRAINING_DATASET_URI",
      "validationDatasetUri": "VALIDATION_DATASET_URI",
      "hyperParameters": {
          "epochCount": EPOCH_COUNT,
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

    PROJECT_ID=myproject
    LOCATION=global
    curl \
    -X POST \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json; charset=utf-8" \
    "https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/tuningJobs" \
    -d \
    $'{
       "preTunedModel": "gemini-2.5-flash",
       "supervisedTuningSpec" : {
          "trainingDatasetUri": "gs://cloud-samples-data/ai-platform/generative_ai/gemini/text/sft_train_data.jsonl",
          "validationDatasetUri": "gs://cloud-samples-data/ai-platform/generative_ai/gemini/text/sft_validation_data.jsonl"
       },
       "tunedModelDisplayName": "tuned_gemini"
    }'

### Google Gen AI SDK

The following example shows how to configure continuous tuning by using the
Google Gen AI SDK.

    import time

    from google import genai
    from google.genai.types import HttpOptions, TuningDataset, CreateTuningJobConfig

    # TODO(developer): Update and un-comment below line
    # tuned_model_name = "projects/123456789012/locations/us-central1/models/1234567890@1"
    # checkpoint_id = "1"

    client = genai.Client(http_options=HttpOptions(api_version="v1beta1"))

    training_dataset = TuningDataset(
        gcs_uri="gs://cloud-samples-data/ai-platform/generative_ai/gemini/text/sft_train_data.jsonl",
    )
    validation_dataset = TuningDataset(
        gcs_uri="gs://cloud-samples-data/ai-platform/generative_ai/gemini/text/sft_validation_data.jsonl",
    )

    tuning_job = client.tunings.tune(
        base_model=tuned_model_name,  # Note: Using a Tuned Model
        training_dataset=training_dataset,
        config=CreateTuningJobConfig(
            tuned_model_display_name="Example tuning job",
            validation_dataset=validation_dataset,
            pre_tuned_model_checkpoint_id=checkpoint_id,
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
    # projects/123456789012/locations/us-central1/models/1234567890@2
    # projects/123456789012/locations/us-central1/endpoints/123456789012345
    # projects/123456789012/locations/us-central1/metadataStores/default/contexts/tuning-experiment-2025010112345678

    if tuning_job.tuned_model.checkpoints:
        for i, checkpoint in enumerate(tuning_job.tuned_model.checkpoints):
            print(f"Checkpoint {i + 1}: ", checkpoint)
        # Example response:
        # Checkpoint 1:  checkpoint_id='1' epoch=1 step=10 endpoint='projects/123456789012/locations/us-central1/endpoints/123456789000000'
        # Checkpoint 2:  checkpoint_id='2' epoch=2 step=20 endpoint='projects/123456789012/locations/us-central1/endpoints/123456789012345'
