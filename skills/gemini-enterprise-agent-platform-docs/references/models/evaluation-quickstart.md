# Tutorial: Perform evaluation using the Python SDK

> [!NOTE]
> To see an example of Getting started with the Agent Platform Python SDK for Gen AI evaluation service,
> run the "Getting Started with the Agent Platform Python SDK for Gen AI evaluation service" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/evaltask_approach/intro_to_gen_ai_evaluation_service_sdk.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fevaluation%2Fevaltask_approach%2Fintro_to_gen_ai_evaluation_service_sdk.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/evaluation/evaltask_approach/intro_to_gen_ai_evaluation_service_sdk.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/evaltask_approach/intro_to_gen_ai_evaluation_service_sdk.ipynb)

This page shows you how to perform a model-based evaluation with Gen AI evaluation service using the Agent Platform SDK for Python.

## Before you begin

1.
2. Install the Agent Platform SDK for Python with Gen AI evaluation service dependency:

       !pip install google-cloud-aiplatform[evaluation]

3. Set up your credentials. If you are running this quickstart in Colaboratory, run the following:

       from google.colab import auth
       auth.authenticate_user()

   For other environments, refer to [Authenticate to Agent
   Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/authentication#client-libraries).

## Import libraries

Import your libraries and set up your project and location.

```python
import pandas as pd

import vertexai
from vertexai.evaluation import EvalTask, PointwiseMetric, PointwiseMetricPromptTemplate
from google.cloud import aiplatform

PROJECT_ID = "PROJECT_ID"
LOCATION = "LOCATION"
EXPERIMENT_NAME = "EXPERIMENT_NAME"

vertexai.init(
    project=PROJECT_ID,
    location=LOCATION,
)
```

Note that `EXPERIMENT_NAME` can only contain lowercase alphanumeric characters and hyphens, up to a maximum of 127 characters.

## Set up evaluation metrics based on your criteria

The following metric definition evaluates the text quality generated from a large language model based on two criteria: `Fluency` and `Entertaining`. The code defines a metric called `custom_text_quality` using those two criteria:

    custom_text_quality = PointwiseMetric(
        metric="custom_text_quality",
        metric_prompt_template=PointwiseMetricPromptTemplate(
            criteria={
                "fluency": (
                    "Sentences flow smoothly and are easy to read, avoiding awkward"
                    " phrasing or run-on sentences. Ideas and sentences connect"
                    " logically, using transitions effectively where needed."
                ),
                "entertaining": (
                    "Short, amusing text that incorporates emojis, exclamations and"
                    " questions to convey quick and spontaneous communication and"
                    " diversion."
                ),
            },
            rating_rubric={
                "1": "The response performs well on both criteria.",
                "0": "The response is somewhat aligned with both criteria",
                "-1": "The response falls short on both criteria",
            },
        ),
    )

## Prepare your dataset

Add the following code to prepare your dataset:

    responses = [
        # An example of good custom_text_quality
        "Life is a rollercoaster, full of ups and downs, but it's the thrill that keeps us coming back for more!",
        # An example of medium custom_text_quality
        "The weather is nice today, not too hot, not too cold.",
        # An example of poor custom_text_quality
        "The weather is, you know, whatever.",
    ]

    eval_dataset = pd.DataFrame({
        "response" : responses,
    })

## Run evaluation with your dataset

Run the evaluation:

    eval_task = EvalTask(
        dataset=eval_dataset,
        metrics=[custom_text_quality],
        experiment=EXPERIMENT_NAME
    )

    pointwise_result = eval_task.evaluate()

View the evaluation results for each response in the `metrics_table` Pandas DataFrame:

    pointwise_result.metrics_table

## Clean up

To avoid incurring charges to your Google Cloud account for
the resources used on this page, follow these steps.

Delete the `ExperimentRun` created by the evaluation:

    aiplatform.ExperimentRun(
        run_name=pointwise_result.metadata["experiment_run"],
        experiment=pointwise_result.metadata["experiment"],
    ).delete()

## What's next

- [Define your evaluation metrics](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/determine-eval).

- [Prepare your evaluation dataset](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/evaluation-dataset).
