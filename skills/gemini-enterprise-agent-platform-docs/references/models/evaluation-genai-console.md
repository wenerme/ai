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

Learn how to get started with Gen AI evaluation service using the Google Google Cloud console.

## Before you begin

## Evaluate your model

To evaluate your model:

1. In the Google Cloud console, go to the Gen AI Evaluation page.

   [Go to Evaluation](https://console.cloud.google.com/agent-platform/evaluation)
2. Click **New evaluation** to open the evaluation page.

3. Select a source to load a dataset for evaluation:

   - To upload a local CSV or JSONL file, select **Upload file**. The
     dataset must contain either prompts or records to use in a prompt template
     and, optionally, model responses. The maximum is 200 rows.

   - To generate prompts from a prompt template, select **Generate data** .
     The Gen AI evaluation service generates and populates the variables that you
     defined in your prompt template when creating your dataset. For more
     information about authoring prompt templates, see [Use prompt
     templates](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/prompts/prompt-templates).

     1. Enter your prompt template with your variables in the **Prompt template** field.

     2. To add a description for each of your variables or to specify the
        number of samples to generate, expand **Define variables and sample size**.

     3. Click **Generate dataset** to generate prompts.

4. Generate and evaluate responses based on your prompts:

   1. In the **Evaluation candidates** section, click **Add evaluation
      candidate** , or if a candidate already exists, click
      **Edit** to define the prompts and
      responses to evaluate. For example, you can specify prompts or responses from
      your uploaded file or from generated data.

   2. To compare multiple candidates, click **Add comparison candidate**.

   3. In the **Metrics** section, add at least one metric to score the quality of
      your candidate's responses. For more information about the metric types, see the
      [Evaluation metrics](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/evaluation-overview#metrics)
      section on the Gen AI evaluation service overview page.

   For some adaptive rubrics, you can steer the rubrics that are generated from
   each prompt by expanding **Advanced** and providing custom instructions,
   such as
   `Evaluate the dataset on cultural sensitivity`.
   1. In the **Name and storage configuration** section, specify a name for your evaluation and a Cloud Storage bucket where your evaluations results are stored.
5. Click **Evaluate**.

## View your evaluation results

To view an evaluation result:

1. In the Google Cloud console, go to the **GenAI Evaluation** page.

   [Go to Evaluation](https://console.cloud.google.com/agent-platform/evaluation)
2. Click the evaluation name.

   For each prompt in your evaluation dataset, the response is shown
   along with the evaluation results.

## Evaluate partner models

You can use Gen AI evaluation service to evaluate the following partner models:

- **Anthropic**
- **Llama**

Partner models are supported through Gemini Enterprise Agent Platform Model Garden. You must enable a partner model in [Model Garden](https://console.cloud.google.com/vertex-ai/model-garden) before selecting it for evaluation. To evaluate a partner model, select it in the model selection menu during evaluation setup.

### Pricing

Pricing for evaluating third-party models is based on any charges incurred for model inference in Gemini Enterprise Agent Platform Model Garden. See the [Pricing page for Generative AI on Agent Platform](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing).

## What's next

- [Define your evaluation metrics](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/determine-eval).
