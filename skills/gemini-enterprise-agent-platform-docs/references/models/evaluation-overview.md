> [!NOTE]
> **Note:** Gemini Enterprise Agent Platform provides evaluation for agents, predictive AI models, and generative AI models. This document provides an overview of the evaluation service for generative AI models. To learn about agent evaluation, see [Agent evaluation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/agent-evaluation). To learn about evaluating predictive AI models, see [Model
> evaluation in Gemini Enterprise Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/evaluation/introduction).

The Gen AI evaluation service provides enterprise-grade tools for objective, data-driven assessment of generative AI models. It supports and informs a number of development tasks like model migrations, prompt editing, and fine-tuning.

## Gen AI evaluation service features

The defining feature of the Gen AI evaluation service is the ability to use *adaptive rubrics*, a set of tailored pass or fail tests for each individual prompt. Evaluation rubrics are similar to unit tests in software development and aim to improve model performance across a variety of tasks.

![Gen AI evaluation service features](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/eval-results.png)

The Gen AI evaluation service supports the following common evaluation methods:

- **Adaptive rubrics (Recommended)** : Generates a unique set of pass or fail *rubrics* for each individual prompt in your dataset.

- **Static rubrics**: Apply a fixed set of scoring criteria across all prompts.

- **Computation-based metrics** : Use deterministic algorithms like `ROUGE` or `BLEU` when a ground truth is available.

- **Custom functions**: Define your own evaluation logic in Python for specialized requirements.

> [!NOTE]
> To see an example of Getting Started: Quick Gen AI Evaluation,
> run the "Getting Started: Quick Gen AI Evaluation" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/quick_start_gen_ai_eval.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fevaluation%2Fquick_start_gen_ai_eval.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/evaluation/quick_start_gen_ai_eval.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/quick_start_gen_ai_eval.ipynb)

## Evaluation dataset generation

You can create an evaluation dataset through the following methods:

- **Upload a file** containing complete prompt instances, or provide a prompt template alongside a corresponding file of variable values to populate the completed prompts.

- **Sample directly from production logs** to evaluate the real-world usage of your model.

- **Use synthetic data generation** to generate a large number of consistent examples for any prompt template.

## Supported interfaces

You can define and run your evaluations using the following interfaces:

- **Google Cloud console** : A [web user interface](https://console.cloud.google.com/agent-platform/evaluation) that provides a guided, end-to-end workflow. Manage your datasets, run evaluations, and dive deep into interactive reports and visualizations. See [Perform evaluation using the console](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/evaluation-genai-console).

- **Python SDK** : Programmatically run evaluations and render side-by-side model comparisons directly in your Colab or Jupyter environment. See [Perform evaluation using the GenAI Client in Agent Platform SDK](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/evaluation-genai-sdk)

## Use cases

The Gen AI evaluation service lets you see how a model performs on your specific tasks and against your unique criteria providing valuable insights which cannot be derived from public leaderboards and general benchmarks. This supports critical development tasks, including:

- **Model migrations**: Compare model versions to understand behavioral differences and fine-tune your prompts and settings accordingly.

- **Finding the best model**: Run head-to-head comparisons of Google and third-party models on your data to establish a performance baseline and identify the best fit for your use case.

- **Prompt improvement**: Use evaluation results to guide your customization efforts. Re-running an evaluation creates a tight feedback loop, providing immediate, quantifiable feedback on your changes.

- **Model fine-tuning**: Evaluate the quality of a fine-tuned model by applying consistent evaluation criteria to every run.

- **Agent evaluation**: Evaluate the performance of an agent using
  agent-specific metrics, such as agent traces and response quality.

> [!NOTE]
> To see an example of Evaluating third-party models,
> run the "Evaluating third-party models with the Gen AI evaluation service" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/evaluating_third_party_llms_vertex_ai_gen_ai_eval_sdk.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fevaluation%2Fevaluating_third_party_llms_vertex_ai_gen_ai_eval_sdk.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/evaluation/evaluating_third_party_llms_vertex_ai_gen_ai_eval_sdk.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/evaluating_third_party_llms_vertex_ai_gen_ai_eval_sdk.ipynb)

## Evaluation workflow

Completing an evaluation typically requires going through the following steps:

- **Create an evaluation dataset**: Assemble a dataset of prompt instances that reflect your specific use case. You can include reference answers (ground truth) if you plan to use computation-based metrics.

- **Define evaluation metrics** : Choose the [metrics](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/evaluation-overview#metrics) you want to use to measure model performance.

- **Generate model responses** : Select one or more models to generate responses for your dataset. The **Agent Platform SDK** supports any model callable through `LiteLLM`, while the console supports Google Gemini models.

- **Run the evaluation**: Run the evaluation job, which assesses each model's responses against your selected metrics.

- **Interpret the results**: Review the aggregated scores and individual responses to analyze model performance.

## Evaluation metrics

The following are core concepts related to evaluation metrics:

- **Rubrics**: The criteria for how to rate the response of an LLM model or application.

- **Metrics**: A score that measures the model output against the rating rubrics.

The Gen AI evaluation service offers the following categories of metrics:

- **Rubric-based metrics**: Incorporate LLMs into evaluation workflows to assess
  the quality of model responses. Rubric-based evaluations are suited for a
  variety of tasks, especially writing quality, safety, and instruction following,
  which are often difficult to evaluate with deterministic algorithms.

  - **Adaptive rubrics (recommended)**: Rubrics are dynamically generated for
    each prompt, like unit tests. Responses are evaluated with a unique set of
    pass or fail tests for each individual prompt in your dataset. The rubrics
    keep the evaluation relevant to the requested task and aim to provide
    objective, explainable, and consistent results.

    Adaptive rubrics are typically the fastest way to get started with
    evaluations, ensuring that every evaluation is relevant to the specific
    task being evaluated.
  - **Static rubrics**: Rubrics are defined explicitly and the same rubric
    applies to all prompts. Responses are evaluated with the same set of numerical
    scoring-based evaluators. A single numerical score (such as 1-5) per prompt.
    Use static rubrics when an evaluation is required on a very specific dimension
    or when the exact same rubric is required across all prompts.

- **Computation-based metrics**: Evaluate responses with deterministic
  algorithms, usually using ground truth. A numerical score (such as 0.0-1.0) per
  prompt. When ground truth is available and can be matched with a deterministic
  method.

- **Custom function metrics** (**Agent Platform SDK** only): Define your own metric through a
  Python function.

### Adaptive rubrics example

The evaluation process for each prompt uses a two-step system:

1. **Rubric generation**: The service first analyzes your prompt and generates
   a list of specific, verifiable tests---the rubrics---that a good response should
   meet.

2. **Rubric validation** : After your model generates a response, the service
   assesses the response against each rubric, delivering a clear `Pass` or `Fail`
   verdict and a rationale.

The final result is an aggregated pass rate and a detailed breakdown of which
rubrics the model passed, giving you actionable insights to diagnose issues and
measure improvements.

By moving from high-level, subjective scores to granular, objective test
results, you can adopt an evaluation-driven development cycle and bring the
software engineering best practices to the process of building generative AI
applications.

The following example shows sample adaptive rubrics that were generated for a
set of prompts:

**User prompt** : `Write a four-sentence summary of the provided article about renewable energy, maintaining an optimistic tone.`

For this prompt, the *rubric generation* step might produce the following rubrics:

- **Rubric 1**: The response is a summary of the provided article.

- **Rubric 2**: The response contains exactly four sentences.

- **Rubric 3**: The response maintains an optimistic tone.

Your model may produce the following response: `The article highlights significant growth in solar and wind power. These advancements are making clean energy more affordable. The future looks bright for renewables. However, the report also notes challenges with grid infrastructure.`

During *rubric validation*, the Gen AI evaluation service assesses the response against each rubric:

- **Rubric 1**: The response is a summary of the provided article.

  - **Verdict** : `Pass`

  - **Reason**: The response accurately summarizes the main points.

- **Rubric 2**: The response contains exactly four sentences.

  - **Verdict** : `Pass`

  - **Reason**: The response is composed of four distinct sentences

- **Rubric 3**: The response maintains an optimistic tone.

  - **Verdict** : `Fail`

  - **Reason**: The final sentence introduces a negative point, which detracts from the optimistic tone.

The final pass rate for this response is 66.7%. To compare two models, you can evaluate their responses against this same set of generated tests and compare their overall pass rates.

## Getting started with evaluations

You can get started with evaluations [using the console](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/evaluation-genai-console).

Alternatively, the following code shows how to complete an evaluation with the GenAI Client in Agent Platform SDK:

    from vertexai import Client
    from vertexai import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.types.html
    import pandas as pd

    client = Client(project=PROJECT_ID, location=LOCATION)

    # Create an evaluation dataset
    prompts_df = pd.DataFrame({
        "prompt": [
            "Write a simple story about a dinosaur",
            "Generate a poem about Agent Platform",
        ],
    })

    # Get responses from one or multiple models
    eval_dataset = client.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.evals.html.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.evals.Evals.html#vertexai__genai_evals_Evals_run_inference(model="gemini-2.5-flash", src=prompts_df)

    # Define the evaluation metrics and run the evaluation job
    eval_result = client.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.evals.html.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.evals.Evals.html#vertexai__genai_evals_Evals_evaluate(
        dataset=eval_dataset,
        metrics=[https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.types.html.RubricMetric.GENERAL_QUALITY]
    )

    # View the evaluation results
    eval_result.show()

The Gen AI evaluation service offers two **Agent Platform SDK** interfaces:

- **GenAI Client in Agent Platform SDK** (Recommended) (Preview)

  `from vertexai import client`

  The GenAI Client is the newer, recommended interface for evaluation, accessed through the unified Client class. It supports all evaluation methods and is designed for workflows that include model comparison, in-notebook visualization, and insights for model customization.
- **Evaluation module in Agent Platform SDK** (GA)

  `from vertexai.evaluation import EvalTask`

  The evaluation module is the [older interface](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/evaluation-quickstart), maintained for backward compatibility with existing workflows but no longer under active development. It is accessed through the `EvalTask` class. This method supports standard LLM-as-a-judge and computation-based metrics but does not support newer evaluation methods like adaptive rubrics.

> [!NOTE]
> To see an example of Model migration with the Gen AI evaluation service,
> run the "Model migration with the Gen AI evaluation service" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/model_migration_with_gen_ai_eval.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fevaluation%2Fmodel_migration_with_gen_ai_eval.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/evaluation/model_migration_with_gen_ai_eval.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/model_migration_with_gen_ai_eval.ipynb)

## Supported regions

The following regions are supported for the Gen AI evaluation service:

- Iowa (`us-central1`)

- South Carolina (`us-east1`)

- Northern Virginia (`us-east4`)

- Columbus, Ohio (`us-east5`)

- Dallas, Texas (`us-south1`)

- Oregon (`us-west1`)

- Las Vegas, Nevada (`us-west4`)

- Warsaw, Poland (`europe-central2`)

- Finland (`europe-north1`)

- Madrid, Spain (`europe-southwest1`)

- Belgium (`europe-west1`)

- Netherlands (`europe-west4`)

- Milan, Italy (`europe-west8`)

- Paris, France (`europe-west9`)

- Global (`global`)

## Available notebooks

| Notebook links | Description |
|---|---|
| [Getting Started: Quick Gen AI Evaluation](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/quick_start_gen_ai_eval.ipynb) | Provides an introduction to the Gen AI evaluation service. |
| [Evaluating third-party models with the Gen AI evaluation service](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/evaluating_third_party_llms_vertex_ai_gen_ai_eval_sdk.ipynb) | Demonstrates how to use the \*\*Agent Platform SDK\*\* to evaluate various types of third-party models, including models accessed using API (like OpenAI, Anthropic), Model as a Service (MaaS) from Vertex Model Garden, and Bring Your Own Model (BYOM) endpoints. |
| [Model migration with the Gen AI evaluation service](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/model_migration_with_gen_ai_eval.ipynb) | Shows how to use the \*\*Agent Platform SDK\*\* for Gen AI evaluation service to compare two first-party models (such as Gemini 2.0 Flash to Gemini 2.5 Flash). It highlights using predefined adaptive rubric-based metrics and how evaluation results can guide prompt optimization. Key features like multi-candidate evaluation, in-notebook visualization, and asynchronous batch evaluation are also covered. |
| [Evaluating text-to-image quality with the Gen AI evaluation service](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/evaluate_images_with_predefined_gecko.ipynb) | Shows how to use the Vertex AI SDK for Gen AI evaluation service to evaluate the quality of generated images based on text prompts. It demonstrates using the predefined adaptive rubric-based [Gecko](https://arxiv.org/abs/2404.16820) metric. |
| [Evaluating text-to-video quality with the Gen AI evaluation service](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/evaluate_videos_with_predefined_gecko.ipynb) | Shows how to use the \*\*Agent Platform SDK\*\* for Gen AI evaluation service to evaluate the quality of generated videos based on text prompts. It demonstrates using the predefined adaptive rubric-based [Gecko](https://arxiv.org/abs/2404.16820) metric. |

## What's next

- [Perform evaluation using the console](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/evaluation-genai-console)

- [Perform evaluation using the SDK](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/evaluation-genai-sdk)
