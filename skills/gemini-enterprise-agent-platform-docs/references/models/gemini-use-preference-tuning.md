This document describes how to perform preference tuning on a Gemini
model.

## Before you begin

Before you begin, you must prepare a dataset by following the instructions in
[Prepare preference tuning data for Gemini models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-preference-tuning-prepare).

## Create a tuning job

### Console

To configure preference tuning by using the Google Cloud console,
perform the following steps:

1. In the Gemini Enterprise Agent Platform section of the Google Cloud console, go to the
   **Agent Platform Studio** page.

   [Go to **Agent Platform Studio**](https://console.cloud.google.com/agent-platform/generative/language/tuning)
2. Click **Create tuned model**.

3. Select **Preference tuning**.

4. Under **Model details**, configure the following:

   1. In the **Tuned model name** field, enter a name for your new tuned model, up to 128 characters.
   2. In the **Base model** field, select the foundation model to tune.
   3. In the **Region** drop-down field, select the region where the pipeline tuning job runs and where the tuned model is deployed.
5. Under **Tuning setting**, configure the following:

   1. In the **Number of epochs** field, enter the number of steps to run for model tuning.
   2. In the **Adapter Size** field, enter the adapter size to use for model tuning.
   3. Optional: In the **Beta** field, enter the desired beta value. Beta is the coefficient that controls how closely the tuned model aligns with its baseline.
   4. In the **Learning rate multiplier** field, enter the step size at each iteration. The default value is 1. .
6. Optional: To disable intermediate checkpoints and use only the latest
   checkpoint, click the **Export last checkpoint only** toggle.

7. Click **Continue**.

   The **Tuning dataset** page opens.
8. To upload a dataset file, select one of the following:

   1. If you haven't uploaded a dataset yet, select the radio button for **Upload file to Cloud Storage**.
   2. In the **Select JSONL file** field, click **Browse** and select your dataset file.
   3. In the **Dataset location** field, click **Browse** and select the Cloud Storage bucket where you want to store your dataset file.
   4. If your dataset file is already in a Cloud Storage bucket, select the radio button for **Existing file on Cloud Storage**.
   5. In **Cloud Storage file path** field, click **Browse** and select the Cloud Storage bucket where your dataset file is located.
9. (Optional) To get validation metrics during training, click the
   **Enable model validation** toggle.

   1. In the **Validation dataset** file, enter the Cloud Storage path of your validation dataset.
10. Click **Start Tuning**.

    Your new model appears under the **Managed tuning** section on the
    **Tune and Distill page** . When the model is finished tuning, the **Status**
    says **Succeeded**.

### REST

To create a model tuning job, send a POST request by using the
[`tuningJobs.create`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.tuningJobs/create)
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
- <var class="edit" scope="BETA" translate="no">BETA</var>Optional: The coefficient that controls how closely the tuned model aligns with its baseline.
- <var class="edit" scope="ADAPTER_SIZE" translate="no">ADAPTER_SIZE</var>Optional: The [Adapter size](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/models/tuning#adaptersize) to use for the tuning job. The adapter size influences the number of trainable parameters for the tuning job. A larger adapter size implies that the model can learn more complex tasks, but it requires a larger training dataset and longer training times.
- <var class="edit" scope="LEARNING_RATE_MULTIPLIER" translate="no">LEARNING_RATE_MULTIPLIER</var>: Optional: A multiplier to apply to the recommended learning rate. Leave it unset to use the [recommended value.](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/models/tuning#supervisedtuningspec)
- <var class="edit" scope="EXPORT_LAST_CHECKPOINT_ONLY" translate="no">EXPORT_LAST_CHECKPOINT_ONLY</var>Optional: Set to `true` to use only the latest checkpoint.
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
  "preferenceOptimizationSpec" : {
      "trainingDatasetUri": "TRAINING_DATASET_URI",
      "validationDatasetUri": "VALIDATION_DATASET_URI",
      "hyperParameters": {
          "epochCount": "EPOCH_COUNT",
          "beta": "BETA",
          "adapterSize": "ADAPTER_SIZE",
          "learningRateMultiplier": "LEARNING_RATE_MULTIPLIER"
      },
      "exportLastCheckpointOnly": EXPORT_LAST_CHECKPOINT_ONLY,
  },
  "tunedModelDisplayName": "TUNED_MODEL_DISPLAYNAME",
  "encryptionSpec": {
    "kmsKeyName": "KMS_KEY_NAME"
  },
  "serviceAccount": "SERVICE_ACCOUNT"
}
```

To send your request, expand one of these options:

#### curl (Linux, macOS, or Cloud Shell)

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

#### PowerShell (Windows)

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
       "baseModel": "${BASE_MODEL}",
       "preferenceOptimizationSpec" : {
          "trainingDatasetUri": "gs://mybucket/preference_tuning/data/train_data.jsonl",
          "validationDatasetUri": "gs://mybucket/preference_tuning/data/validation_data.jsonl"
       },
       "tunedModelDisplayName": "tuned_gemini"
    }'

### Google Gen AI SDK

    import time

    from google import genai
    from google.genai.types import HttpOptions, CreateTuningJobConfig, TuningDataset

    client = genai.Client(http_options=HttpOptions(api_version="v1"))

    training_dataset = TuningDataset(
        gcs_uri="gs://mybucket/preference_tuning/data/train_data.jsonl",
    )
    validation_dataset = TuningDataset(
        gcs_uri="gs://mybucket/preference_tuning/data/validation_data.jsonl",
    )

    # Refer to https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini-use-continuous-tuning#google-gen-ai-sdk
    # for example to continuous tune from SFT tuned model.
    tuning_job = client.tunings.tune(
        base_model="gemini-2.5-flash",
        training_dataset=training_dataset,
        config=CreateTuningJobConfig(
            tuned_model_display_name="Example tuning job",
            method="PREFERENCE_TUNING",
            validation_dataset=validation_dataset,
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

### Tuning hyperparameters

It's recommended to submit your first tuning job without changing the
hyperparameters. The default value is the recommended value based on our
benchmarking results to yield the best model output quality.

- Epochs: The number of complete passes the model makes over the entire training dataset during training. Gemini Enterprise Agent Platform automatically adjusts the default value to your training dataset size. This value is based on benchmarking results to optimize model output quality.
- Beta: The coefficient that controls how closely the tuned model aligns with its baseline. Lower beta means more aggressive updates toward preferred responses. The recommended range is from 0.01 to 0.5, inclusive. A beta value of 0 stops the model from learning.
- Adapter size: The Adapter size to use for the tuning job. The adapter size influences the number of trainable parameters for the tuning job. A larger adapter size implies that the model can learn more complex tasks, but it requires a larger training dataset and longer training times.
- Learning Rate Multiplier: A multiplier to apply to the recommended learning rate. You can increase the value to converge faster, or decrease the value to avoid overfitting.

## View or cancel a tuning job

To list tuning jobs, view tuning job details, cancel a tuning job, or delete a
tuned model, see the following sections in the supervised fine-tuning
documentation:

- [View a list of tuning jobs](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-use-supervised-tuning#view_a_list_of_tuning_jobs)
- [Get details of a tuning job](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-use-supervised-tuning#get_details_of_a_tuning_job)
- [Cancel a tuning job](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-use-supervised-tuning#cancel_a_tuning_job)
- [Delete a tuned model](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-use-supervised-tuning#delete_a_tuned_model)

## Model tuning metrics

The model tuning job automatically collects the following tuning metrics:

- `/preference_optimization_train_loss`: Preference loss for the tuning dataset at a training step.

## Model validation metrics

When validation data is provided, the model tuning job automatically collects
the following validation metrics:

- `/eval_total_loss`: Preference loss for the validation dataset at a validation step.

The metrics visualizations are available after the tuning job starts running.
They are updated in real time as tuning progresses. If you don't specify a
validation dataset when you create the tuning job, only the visualizations for
the tuning metrics are available.

## What's next

- Learn about [deploying a tuned Gemini model](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/overview#deploy_a_tuned_model).
