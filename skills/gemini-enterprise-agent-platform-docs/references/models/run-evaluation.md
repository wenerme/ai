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

This page shows you how to run evaluations for your generative language models and applications with the Gen AI evaluation service.

## Before you begin

### Install the Vertex AI SDK

To install the Gen AI Evaluation module from the Agent Platform SDK for Python, run the following command:

    !pip install -q google-cloud-aiplatform[evaluation]

For more information, see
[Install the Agent Platform SDK for Python](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/install-sdk).

### Authenticate the Vertex AI SDK

After you install the Agent Platform SDK for Python, you need to authenticate. The following
topics explain how to authenticate with the Vertex AI SDK if you're
working locally and if you're working in Colaboratory:

- If you're developing locally, set up
  [Application Default Credentials (ADC)](https://docs.cloud.google.com/docs/authentication/application-default-credentials)
  in your local environment:

  1. [Install](https://docs.cloud.google.com/sdk/docs/install) the Google Cloud CLI, then
     [initialize](https://docs.cloud.google.com/sdk/docs/initialize) it by running the following command:

         gcloud init

  2. Create local authentication credentials for your Google Account:

         gcloud auth application-default login

     A login screen is displayed. After you sign in, your credentials are stored
     in the local credential file used by ADC. For more information, see
     [Set up ADC for a local development environment](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).
- If you're working in Colaboratory, run the following command in a
  Colab cell to authenticate:

      from google.colab import auth
      auth.authenticate_user()

  This command opens a window where you can complete the authentication.

### Understanding service accounts

The [service account](https://docs.cloud.google.com/iam/docs/principals-overview#service-account) is used by the Gen AI evaluation service to get
predictions from the [Gemini API in Gemini Enterprise Agent Platform](https://docs.cloud.google.com/vertex-ai/docs/start/quickstarts/quickstart-multimodal) for model-based evaluation
metrics. This service account is automatically provisioned on the first request
to the Gen AI evaluation service.

| Name | Description | Email address | Role |
|---|---|---|---|
| Agent Platform Rapid Eval Service Agent | The service account used to get predictions for model based evaluation. | `service-PROJECT_NUMBER@gcp-sa-vertex-eval.iam.gserviceaccount.com` | `roles/aiplatform.rapidevalServiceAgent` |

The permissions associated to the rapid evaluation service agent are:

| Role | Permissions |
|---|---|
| Agent Platform Rapid Eval Service Agent (roles/aiplatform.rapidevalServiceAgent) | `aiplatform.endpoints.predict` |

## Run your evaluation

The Gen AI evaluation service uses the following client-based process for running evaluations:

1. `run_inference()`: Generate responses from your model for a given set of prompts.

2. `evaluate()`: Compute metrics on the generated responses.

    eval_dataset = client.evals.run_inference(
        model="gemini-2.5-flash",
    src="gs://vertex-evaluation-llm-dataset-us-central1/genai_eval_sdk/test_prompts.jsonl",
    )
    eval_dataset.show()

    eval_result = client.evals.evaluate(
        dataset=eval_dataset,
        metrics=[
            types.RubricMetric.TEXT_QUALITY,
            types.RubricMetric.QUESTION_ANSWERING_QUALITY,
            types.Metric(name='bleu'),
            types.Metric(name='rouge_1'),
        ]
    )
    eval_result.show()

To analyze the performance of multiple AI models or systems in a single evaluation, generate a response for each candidate and pass them in a list to the `evaluate()` method:

    inference_result_1 = client.evals.run_inference(
        model="gemini-2.0-flash",
        src=prompts_df,
    )
    inference_result_2 = client.evals.run_inference(
        model="gemini-2.5-flash",
        src=prompts_df,
    )

    # Compare the responses against each other
    comparison_result = client.evals.evaluate(
        dataset=[inference_result_1, inference_result_2],
        metrics=[
            types.RubricMetric.TEXT_QUALITY,
            types.RubricMetric.INSTRUCTION_FOLLOWING,
        ]
    )

    comparison_result.show()

### Review or re-use generated rubrics for evaluation

To pre-generate adaptive rubrics and review them before evaluation, or re-use previously generated rubrics, use the following code:

    # Step 1. Generate rubrics
    # Rubrics would be saved in a group named "general_quality_rubrics".
    data_with_rubrics = client.evals.generate_rubrics(
        src=prompts_df,
        rubric_group_name="general_quality_rubrics",
        predefined_spec_name=types.RubricMetric.GENERAL_QUALITY,
    )

    # Step 2. Run Inference
    eval_dataset = client.evals.run_inference(
        model=inference_model,
        src=data_with_rubrics,
    )

    # Step 3. Evaluate with provided rubrics
    # The group of rubric named "general_quality_rubrics" will be used for evaluation.
    eval_result = client.evals.evaluate(
        dataset=eval_dataset,
        metrics=[types.RubricMetric.GENERAL_QUALITY(
          rubric_group_name="general_quality_rubrics",
        )],
    )

- `generate_rubrics()`: Generate rubrics with a predefined workflow paired with the metric.

- `run_inference()`: Generate responses from your model for a given set of prompts.

- `evaluate()`: Validate responses based on provided rubrics.

### Asynchronous and large-scale evaluation

For large datasets, the Gen AI evaluation service provides an asynchronous, long-running batch evaluation method. This is ideal for scenarios where you don't need immediate results and want to offload the computation.

The `batch_evaluate()` method returns an operation object that you can poll to track its progress. The parameters are compatible with the `evaluate()` method.

    GCS_DEST_BUCKET = "gs://your-gcs-bucket/batch_eval_results/"

    inference_result_saved = client.evals.run_inference(
        model="gemini-2.5-flash",
        src=prompts_df,
        config={'dest': GCS_DEST_BUCKET}
    )
    print(f"Eval dataset uploaded to: {inference_result_saved.gcs_source}")

    batch_eval_job  = client.evals.batch_evaluate(
       dataset = inference_result_saved,
       metrics = [
            types.RubricMetric.FLUENCY,
            types.RubricMetric.COHERENCE,
            types.Metric(name='rouge_1'),
            types.Metric(name='bleu'),
        ],
       dest=GCS_DEST_BUCKET
    )

### Evaluating third-party models

You can use the Gen AI evaluation service to evaluate and compare models from providers such as OpenAI by passing the model name string to the `run_inference` method. The Gen AI evaluation service uses the `litellm` library to call the model API.

Make sure to set the required API key as an environment variable (such as `OPENAI_API_KEY`):

    import os

    # Set your third-party model API key
    os.environ['OPENAI_API_KEY'] = 'YOUR_OPENAI_API_KEY'

    # Run inference on an OpenAI model
    gpt_response = client.evals.run_inference(
        model='gpt-4o',
        src=prompt_df
    )

    # You can now evaluate the responses
    eval_result = client.evals.evaluate(
        dataset=gpt_response,
        metrics=[types.RubricMetric.TEXT_QUALITY]
    )

    eval_result.show()

## What's next

- [View your evaluation results](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/view-evaluation).
