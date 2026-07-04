> [!NOTE]
> To see an example of Getting Started: Perform evaluation using the through GenAI Client,
> run the "Getting Started: Perform evaluation using the through GenAI Client" notebook in one of the following
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

This page shows you how to evaluate your generative AI models and applications across a range of use cases using the GenAI Client in Agent Platform SDK.

## Before you begin

1.
2. Install the Agent Platform SDK:

       !pip install google-cloud-aiplatform[evaluation]

3. Set up your credentials. If you are running this tutorial in Colaboratory, run the following:

       from google.colab import auth
       auth.authenticate_user()

   For other environments, refer to [Authenticate to Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/gcp-auth).

## Initialize the GenAI Client

To initialize the GenAI Client, run the following:

    from vertexai import Client

    client = Client(project="YOUR_PROJECT_ID", location="YOUR_LOCATION")

Where:

- `YOUR_PROJECT_ID`: your Google Cloud project ID.
- `YOUR_LOCATION`: your cloud region, for example, `us-central1`.

## Generate responses

Generate model responses for your dataset using `run_inference()`:

1. [Prepare your dataset](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/evaluation-dataset) as a Pandas DataFrame:

       import pandas as pd

       eval_df = pd.DataFrame({
         "prompt": [
             "Explain software 'technical debt' using a concise analogy of planting a garden.",
             "Write a Python function to find the nth Fibonacci number using recursion with memoization, but without using any imports.",
             "Write a four-line poem about a lonely robot, where every line must be a question and the word 'and' cannot be used.",
             "A drawer has 10 red socks and 10 blue socks. In complete darkness, what is the minimum number of socks you must pull out to guarantee you have a matching pair?",
             "An AI discovers a cure for a major disease, but the cure is based on private data it analyzed without consent. Should the cure be released? Justify your answer."
         ]
       })

2. Generate model responses using `run_inference()`:

       eval_dataset = client.evals.run_inference(
         model="gemini-2.5-flash",
         src=eval_df,
       )

3. [Visualize your inference results](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/view-evaluation) by calling `.show()` on the `EvaluationDataset` object to inspect the model's outputs alongside your original prompts and references:

       eval_dataset.show()

The following image displays the evaluation dataset with prompts and their corresponding generated responses:

![A table showing an evaluation dataset with columns for prompts and responses.](https://docs.cloud.google.com/gemini-enterprise-agent-platform/images/evaluation-dataset.png)

## Run the evaluation

Run `evaluate()` to evaluate the model responses:

1. Evaluate the model responses using the default `GENERAL_QUALITY` [adaptive rubric-based metric](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/determine-eval):

       eval_result = client.evals.evaluate(dataset=eval_dataset)

2. [Visualize your evaluation results](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/view-evaluation) by calling `.show()` on the `EvaluationResult` object to display summary metrics and detailed results:

       eval_result.show()

The following image displays an evaluation report, which shows summary metrics and detailed results for each prompt-response pair.

![An evaluation report displaying summary metrics alongside detailed results for each prompt-response pair.](https://docs.cloud.google.com/gemini-enterprise-agent-platform/images/eval-report2.png)

## Clean up

No Gemini Enterprise Agent Platform resources are created during this tutorial.

## What's next

- [Define your evaluation metrics](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/determine-eval).
