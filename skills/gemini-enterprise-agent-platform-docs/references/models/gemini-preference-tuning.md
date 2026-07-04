> [!NOTE]
> To see an example of preference tuning,
> run the "Get Started with Gemini Preference Optimization" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/tuning/dpo_gemini_get_started.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Ftuning%2Fdpo_gemini_get_started.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/tuning/dpo_gemini_get_started.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/tuning/dpo_gemini_get_started.ipynb)

Gemini Enterprise Agent Platform preference tuning lets you tune your Gemini models
with human feedback data.

Preference tuning enables the model to learn from subjective user
preferences that are hard to define by using specific labels or through supervised
fine-tuning alone.

The preference tuning input dataset contains examples consisting of a prompt and
pair of responses indicating which one is preferred and which one is
dispreferred. The model learns to generate preferred responses with higher
probability and dispreferred responses with lower probability.

To learn how to prepare the dataset, see
[Prepare preference tuning data for Gemini models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-preference-tuning-prepare).

## Supported models

The following Gemini models support preference tuning:

#### Click to expand supported models

- [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash)
- [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite)

## Limitations

| Specification | Value |
|---|---|
| Modalities | Text |
| File size of the training dataset | 1GB |
| Maximum input and output tokens per training example | 131,072 |
| Maximum input and output serving tokens | Same as base Gemini model |
| Maximum number of training examples in a training dataset | 10M text-only training examples |
| Maximum validation dataset size | 5000 examples or 30% of the number of training examples if there are more than 1000 validation examples |
| Adapter size | Supported values are 1, 2, 4, 8, and 16 |

## Best practices

Before you apply the preference optimization algorithm
to your model, we strongly recommend that you do the following:

1. Tune the model using [supervised fine-tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-supervised-tuning-prepare) on the preferred response data. This teaches the model to generate preferred responses during inference.
2. [Continue tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-use-continuous-tuning) from the checkpoint produced from step 1 using preference tuning. This teaches the model to increase the likelihood gap between preferred and dispreferred responses.

For creating the supervised fine-tuning dataset, use the prompt and accepted
response pairs in your preference dataset as prompt and target for your
supervised fine-tuning dataset. Typically one or two epochs of supervised
fine-tuning should be sufficient, although this can change based on the dataset
size and how aligned your training dataset is with the Gemini model
initially.

To use supervised fine-tuning to tune the model, follow the steps in
[Tune Gemini models by using supervised fine-tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-use-supervised-tuning).

## Quota

Quota is enforced on the number of concurrent tuning jobs. Every project comes
with a default quota to run at least one tuning job. This is a global quota,
shared across all available regions and supported models. If you want to run
more jobs concurrently, you need to [request additional quota](https://docs.cloud.google.com/docs/quota_detail/view_manage#requesting_higher_quota) for
`Global concurrent tuning jobs`.

## Pricing

Pricing for Gemini preference tuning
can be found here: [Gemini Enterprise Agent Platform pricing](https://docs.cloud.google.com/gemini-enterprise-agent-platform/pricing#model-tuning).

For pricing purposes, the number of tokens for each tuning example is calculated
by multiplying the number of tokens in the prompt by 2, and then adding the
number of completion tokens.

## What's next

- Prepare a [preference tuning dataset](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-preference-tuning-prepare).
- [Learn about deploying a tuned Gemini model](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/overview#deploy_a_tuned_model).
