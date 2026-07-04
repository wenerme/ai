A *checkpoint* is a snapshot of a model's state at a specific point in the
fine-tuning process. You can use intermediate checkpoints in
Gemini model tuning to do the following:

- Save tuning progress.
- Compare the performance of intermediate checkpoints.
- Select the best performing checkpoint before overfitting to be the default checkpoint.

For tuning jobs with less than 10 epochs, one checkpoint is saved approximately
after each epoch. For tuning jobs with more than 10 epochs, around 10
checkpoints are saved at even distribution, with the exception of the final
checkpoint, which is saved immediately after all epochs are trained.

Intermediate checkpoints are
[deployed to new endpoints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/deployment)
sequentially as tuning progresses. The tuned model endpoint represents the
endpoint of the default checkpoint, and the tuned model checkpoints include all
checkpoints and their corresponding endpoints.

> [!NOTE]
> **Note:** The endpoints listed in the tuned model only include those created by the tuning job, and the deployment status of each checkpoint and the corresponding endpoint only reflects the status during tuning. If you manually [redeploy or undeploy](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/deployment#deploy_a_model_to_an_endpoint) the tuned checkpoints after tuning, see the Model Registry and **Online prediction** console pages for updated information.

## Supported models

The following Gemini models support checkpoints:

#### Click to expand supported models

- [Gemini 3.1 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite)
- [Gemini 2.5 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro)
- [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash)
- [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite)

For detailed information about Gemini model versions, see
[Google models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models) and
[Model versions and lifecycle](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions).

> [!NOTE]
> **Note:** Checkpoints are supported in the Google Gen AI SDK. They aren't supported in the Agent Platform SDK for Python.

## Create a tuning job that exports checkpoints

You can create a tuning job that exports checkpoints by using
the Google Gen AI SDK or the Google Cloud console.

### Console

To create a tuning job that exports checkpoints, go to the **Agent Platform Studio**
page and select the **Tuning** tab. For more information, see
[Tune a model](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tune-models).

### Google Gen AI SDK

(Preview) You can configure the [Gen AI evaluation service](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/evaluation-overview) to run evaluations automatically after each checkpoint. This evaluation configuration is available in the `us-central1` region.

Install the Google Gen AI SDK:

    pip install --upgrade google-genai

To learn more, see the [SDK reference documentation](https://googleapis.github.io/python-genai/).

Set environment variables to use the Gen AI SDK
with Gemini Enterprise Agent Platform:

    # Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
    # with appropriate values for your project.
    export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
    export GOOGLE_CLOUD_LOCATION=us-central1
    export GOOGLE_GENAI_USE_ENTERPRISE=True

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
            # Set to True to disable tuning intermediate checkpoints. Default is False.
            export_last_checkpoint_only=False,
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

## List the checkpoints for a tuning job

You can view the checkpoints for your completed tuning job in the
Google Cloud console or list them by using the Google Gen AI SDK.

If intermediate checkpoints are disabled, only the final checkpoint is displayed
or returned.

### Console

1. To locate your tuned model in the Google Cloud console, go to the
   **Agent Platform Studio** page.

   [Go to **Agent Platform Studio**](https://console.cloud.google.com/agent-platform/generative/language/tuning)
2. In the **Tuning** tab, find your model and click **Monitor**.

   The tuning metrics and checkpoints of your model are shown. In each metrics
   graph, checkpoint numbers are displayed as annotations as follows:
   - For each epoch, you see a step number and an epoch number.
   - The step number is the exact step when a checkpoint is saved.
   - The epoch number is an estimated epoch number that the checkpoint belongs to, except for the final checkpoint for a completed tuning job, which has the exact epoch number.

### Google Gen AI SDK

    from google import genai
    from google.genai.types import HttpOptions

    client = genai.Client(http_options=HttpOptions(api_version="v1"))

    # Get the tuning job and the tuned model.
    # Eg. tuning_job_name = "projects/123456789012/locations/us-central1/tuningJobs/123456789012345"
    tuning_job = client.tunings.get(name=tuning_job_name)

    if tuning_job.tuned_model.checkpoints:
        for i, checkpoint in enumerate(tuning_job.tuned_model.checkpoints):
            print(f"Checkpoint {i + 1}: ", checkpoint)
    # Example response:
    # Checkpoint 1:  checkpoint_id='1' epoch=1 step=10 endpoint='projects/123456789012/locations/us-central1/endpoints/123456789000000'
    # Checkpoint 2:  checkpoint_id='2' epoch=2 step=20 endpoint='projects/123456789012/locations/us-central1/endpoints/123456789012345'

## View model details and checkpoints

You can view the your tuned model in the Google Cloud console or use the
Google Gen AI SDK to get model details, including endpoints and checkpoints.

The `Endpoint` field of the model is updated as follows:

- It's updated based on the default checkpoint, and represents the endpoint that the tuning job created for the updated default checkpoint during tuning.
- If a model isn't present, or if the tuning job fails to get a model, the `Endpoint` value is empty.
- If the default checkpoint isn't deployed (because tuning is still in progress
  or because deployment has failed), the `Endpoint` value is empty.

### Console

You can view your tuned model in the Gemini Enterprise Agent Platform Model Registry in the
Online prediction **Endpoints** page.

1. Go to the **Model Registry** page from the Agent Platform section
   in the Google Cloud console.

   [Go to the Model Registry page](https://console.cloud.google.com/agent-platform/models)
2. Click the name of your model.

   The default version of your model appears.
3. Click the **Version details** tab to see information about your model
   version.

   Note that the **Objective** is `Large model`, the **Model type** is
   `Foundation`, and the **Source** is `Vertex AI Studio tuning`.
4. Click the **Deploy \& test** tab to see the endpoint where the model is
   deployed.

5. Click the endpoint name to go to the **Endpoint** page to see the list of
   checkpoints that are deployed to the endpoint. For each checkpoint, the
   model version ID and checkpoint ID are displayed. The default checkpoint
   is indicated by the word `default` next to the checkpoint ID.

Alternatively, the checkpoints can also be viewed in the
**Tuning Job Details** page. To see this page, go to the **Tuning** page and
click one of the tuning jobs.

[Go to the Tuning page](https://console.cloud.google.com/agent-platform/studio/tuning)

### Google Gen AI SDK

    from google import genai
    from google.genai.types import HttpOptions

    client = genai.Client(http_options=HttpOptions(api_version="v1"))

    # Get the tuning job and the tuned model.
    # Eg. tuning_job_name = "projects/123456789012/locations/us-central1/tuningJobs/123456789012345"
    tuning_job = client.tunings.get(name=tuning_job_name)
    tuned_model = client.models.get(model=tuning_job.tuned_model.model)
    print(tuned_model)
    # Example response:
    # Model(name='projects/123456789012/locations/us-central1/models/1234567890@1', ...)

    print(f"Default checkpoint: {tuned_model.default_checkpoint_id}")
    # Example response:
    # Default checkpoint: 2

    if tuned_model.checkpoints:
        for _, checkpoint in enumerate(tuned_model.checkpoints):
            print(f"Checkpoint {checkpoint.checkpoint_id}: ", checkpoint)
    # Example response:
    # Checkpoint 1:  checkpoint_id='1' epoch=1 step=10
    # Checkpoint 2:  checkpoint_id='2' epoch=2 step=20

If you configured the Gen AI evaluation service to run evaluations after each checkpoint, view the Cloud Storage bucket you configured for evaluation results.

## Test the checkpoints

You can view a list of checkpoints in the Gemini Enterprise Agent Platform Model Registry
and test each one. Or you can use the Google Gen AI SDK to list and test your
checkpoints.

### Console

1. To locate your tuned model in the Google Cloud console, go to the
   **Agent Platform Studio** page.

   [Go to **Agent Platform Studio**](https://console.cloud.google.com/agent-platform/generative/language/tuning)
2. In the **Tuning** tab, find your model and click **Monitor**.

3. In the checkpoint table in the **Monitor** pane, next to the desired
   checkpoint, click the **Test** link.

### Google Gen AI SDK

    from google import genai
    from google.genai.types import HttpOptions

    client = genai.Client(http_options=HttpOptions(api_version="v1"))

    # Get the tuning job and the tuned model.
    # Eg. tuning_job_name = "projects/123456789012/locations/us-central1/tuningJobs/123456789012345"
    tuning_job = client.tunings.get(name=tuning_job_name)

    contents = "Why is the sky blue?"

    # Predicts with the default checkpoint.
    response = client.models.generate_content(
        model=tuning_job.tuned_model.endpoint,
        contents=contents,
    )
    print(response.text)
    # Example response:
    # The sky is blue because ...

    # Predicts with Checkpoint 1.
    checkpoint1_response = client.models.generate_content(
        model=tuning_job.tuned_model.checkpoints[0].endpoint,
        contents=contents,
    )
    print(checkpoint1_response.text)
    # Example response:
    # The sky is blue because ...

    # Predicts with Checkpoint 2.
    checkpoint2_response = client.models.generate_content(
        model=tuning_job.tuned_model.checkpoints[1].endpoint,
        contents=contents,
    )
    print(checkpoint2_response.text)
    # Example response:
    # The sky is blue because ...

## Select a new default checkpoint

You can use the default checkpoint to represent the best performing checkpoint.
By default, the default checkpoint is the final checkpoint of a tuning job.

When deploying a model with checkpoints, the default checkpoint is deployed.

When copying a model with checkpoints, the destination model would have the same
default checkpoint ID as the source model. All checkpoints are copied, so you
can select a new default checkpoint for the destination model.

The tuning job endpoint will be updated if you update a default checkpoint, and
you can use the new endpoint for inference.

### Console

1. To locate your tuned model in the Google Cloud console, go to the
   **Agent Platform Studio** page.

   [Go to **Agent Platform Studio**](https://console.cloud.google.com/agent-platform/generative/language/tuning)
2. In the **Tuning** tab, find your model and click **Monitor**.

3. In the checkpoint table in the **Monitor** pane, next to the desired
   checkpoint, click **Actions**
   and select **Set as default**.

4. Click **Confirm**.

   The metrics graphs and checkpoint table are updated to show the new default
   checkpoint. The endpoint in the TuningJob details page is updated to show
   the Endpoint of the new default checkpoint.

### Google Gen AI SDK

    from google import genai
    from google.genai.types import HttpOptions, UpdateModelConfig

    client = genai.Client(http_options=HttpOptions(api_version="v1"))

    # Get the tuning job and the tuned model.
    # Eg. tuning_job_name = "projects/123456789012/locations/us-central1/tuningJobs/123456789012345"
    tuning_job = client.tunings.get(name=tuning_job_name)
    tuned_model = client.models.get(model=tuning_job.tuned_model.model)

    print(f"Default checkpoint: {tuned_model.default_checkpoint_id}")
    print(f"Tuned model endpoint: {tuning_job.tuned_model.endpoint}")
    # Example response:
    # Default checkpoint: 2
    # projects/123456789012/locations/us-central1/endpoints/123456789012345

    # Set a new default checkpoint.
    # Eg. checkpoint_id = "1"
    tuned_model = client.models.update(
        model=tuned_model.name,
        config=UpdateModelConfig(default_checkpoint_id=checkpoint_id),
    )

    print(f"Default checkpoint: {tuned_model.default_checkpoint_id}")
    print(f"Tuned model endpoint: {tuning_job.tuned_model.endpoint}")
    # Example response:
    # Default checkpoint: 1
    # projects/123456789012/locations/us-central1/endpoints/123456789000000

## What's next

- Learn more about [supervised fine-tuning for Gemini models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-supervised-tuning).
- Learn more about [preference tuning for Gemini models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-preference-tuning).
