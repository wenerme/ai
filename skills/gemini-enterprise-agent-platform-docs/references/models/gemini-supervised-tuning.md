> [!NOTE]
> To see an example of supervised fine tuning,
> run the "Supervised Fine Tuning with Gemini 2.0 Flash for Article Summarization" notebook in one of the following
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

Supervised fine-tuning is a good option when you have a well-defined task with
available labeled data. It's particularly effective for domain-specific
applications where the language or content significantly differs from the data
the large model was originally trained on. You can tune
[text](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tune_gemini/text_tune),
[image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tune_gemini/image_tune),
[audio](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tune_gemini/audio_tune),
[video](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tune_gemini/video_tune), and [document](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tune_gemini/doc_tune) data types. You can also create
Gemini-based applications and agents that can interact with real-time
information and services like databases, customer relationship management
systems, and document repositories.

Supervised fine-tuning adapts model behavior with a labeled dataset. This process
adjusts the model's weights to minimize the difference between its predictions
and the actual labels. For example, it can improve model performance for the
following types of tasks:

- Classification
- Summarization
- Extractive question answering
- Chat

For a discussion of the top tuning use cases, check out the blog post [Hundreds
of organizations are fine-tuning Gemini models. Here's their favorite
use
cases](https://cloud.google.com/transform/top-five-gen-ai-tuning-use-cases-gemini-hundreds-of-orgs).

To learn more, see [When to use supervised fine-tuning for
Gemini](https://cloud.google.com/blog/products/ai-machine-learning/supervised-fine-tuning-for-gemini-llm?e=48754805).

## Supported models

The following Gemini models support supervised fine-tuning:

#### Click to expand supported models

- [Gemini 3.1 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite)
- [Gemini 2.5 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro)
- [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash)
- [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite)

For models that support [thinking](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/thinking), set the
thinking budget (for Gemini 2.5 models and lower) or the thinking level
(for Gemini 3 and higher) to the minimal allowed value for the setting.
This can improve performance and reduce costs for tuned tasks. During supervised
fine-tuning, the model learns from the training data and omits the thinking
process. Therefore, the resulting tuned model can perform tuned tasks
effectively without a thinking budget.

## Limitations

Supervised fine-tuning is not a Covered Service and is excluded from the SLO of
any Service Level Agreement.

The following table shows the limitations on supervised fine-tuning datasets:

### Gemini 3.1 Flash-Lite

| Specification | Value |
|---|---|
| Maximum input and output tokens per training example | 131,072 |
| Maximum input and output serving tokens | Same as base Gemini model |
| Maximum number of examples in a validation dataset | 5000 examples or 30% of the number of training examples if there are more than 1000 validation examples |
| Maximum training dataset file size | 1GB for JSONL |
| Maximum training dataset size | 10M text-only examples or 300K multimodal examples |
| Adapter size | Supported values are 1, 2, 4, 8, and 16 |
| Supported endpoints for model tuning | `us-central1`, and `europe-west4` |
| Supported endpoint for tuned model serving | `us` and `eu` multi-region endpoints only |
| CMEK support | Not supported |

### Gemini 2.5 Flash
Gemini 2.5 Flash-Lite

| Specification | Value |
|---|---|
| Maximum input and output tokens per training example | 131,072 |
| Maximum input and output serving tokens | Same as base Gemini model |
| Maximum number of examples in a validation dataset | 5000 examples or 30% of the number of training examples if there are more than 1000 validation examples |
| Maximum training dataset file size | 1GB for JSONL |
| Maximum training dataset size | 10M text-only examples or 300K multimodal examples |
| Adapter size | Supported values are 1, 2, 4, 8, and 16 |

### Gemini 2.5 Pro

| Specification | Value |
|---|---|
| Maximum input and output training tokens | 131,072 |
| Maximum input and output serving tokens | Same as base Gemini model |
| Maximum validation dataset size | 5000 examples or 30% of the number of training examples if there are more than 1000 validation examples |
| Maximum training dataset file size | 1GB for JSONL |
| Maximum training dataset size | 10M text-only examples or 300K multimodal examples |
| Adapter size | Supported values are 1, 2, 4, and 8 |

### Gemini 2.0 Flash
Gemini 2.0 Flash-Lite

| Specification | Value |
|---|---|
| Maximum input and output training tokens | 131,072 |
| Maximum input and output serving tokens | Same as base Gemini model |
| Maximum validation dataset size | 5000 examples or 30% of the number of training examples if there are more than 1000 validation examples |
| Maximum training dataset file size | 1GB for JSONL |
| Maximum training dataset size | 10M text-only examples or 300K multimodal examples |
| Adapter size | Supported values are 1, 2, 4, and 8 |

## Known issues

- Applying [controlled generation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/control-generated-output) when submitting inference requests to tuned Gemini models can result in decreased model quality due to data misalignment during tuning and inference time. During tuning, controlled generation isn't applied, so the tuned model isn't able to handle controlled generation well at inference time. Supervised fine-tuning effectively customizes the model to generate structured output. Therefore you don't need to apply controlled generation when making inference requests on tuned models.

## Use cases for using supervised fine-tuning

Foundation models work well when the expected output or task can be clearly
and concisely defined in a prompt and the prompt consistently produces the
expected output. If you want a model to learn something niche or specific that
deviates from general patterns, then you might want to consider
tuning that model. For example, you can use model tuning to teach the model the
following:

- Specific structures or formats for generating output.
- Specific behaviors such as when to provide a terse or verbose output.
- Specific customized outputs for specific types of inputs.

The following examples are use cases that are difficult to capture with only
prompt instructions:

- **Classification**: The expected response is a specific word or phrase.

  |---|
  | **Prompt:** Classify the following text into one of the following classes: \[business, entertainment\]. Text: Diversify your investment portfolio **Response:** business |

  Tuning the model can help prevent the model from generating verbose responses.
- **Summarization**: The summary follows a specific format. For example, you
  might need to remove personally identifiable information (PII) in a chat
  summary.

  |---|
  | **Prompt:** Summarize: Jessica: That sounds great! See you in Times Square! Alexander: See you at 10! **Response:** #Person1 and #Person2 agree to meet at Times Square at 10:00 AM. |

  This formatting of replacing the names of the speakers with `#Person1` and
  `#Person2` is difficult to describe and the foundation model might not naturally
  produce such a response.
- **Extractive question answering**: The question is about a context and the
  answer is a substring of the context.

  |---|
  | **Prompt:** Context: There is evidence that there have been significant changes in Amazon rainforest vegetation over the last 21,000 years through the Last Glacial Maximum (LGM) and subsequent deglaciation. Question: What does LGM stand for? **Response:** Last Glacial Maximum |

  The response "Last Glacial Maximum" is a specific phrase from the context.
- **Chat**: You need to customize model response to follow a persona, role,
  or character.

  |---|
  | **Prompt:** User: What's the weather like today? **Response:** Assistant: As the virtual shopkeeper of Example Organization, I can only help you with the purchases and shipping. |

You can also tune a model in the following situations:

- Prompts are not producing the expected results consistently enough.
- The task is too complicated to define in a prompt. For example, you want the model to do behavior cloning for a behavior that's hard to articulate in a prompt.
- You have complex intuitions about a task that are difficult to formalize in a prompt.
- You want to reduce the context length by removing the few-shot examples.

## Configure a tuning job region

User data, such as the transformed dataset and the tuned model, is stored in the
tuning job region. During tuning, computation could be offloaded to other `US` or
`EU` regions for available accelerators. The offloading is transparent to users.

- If you use the Vertex AI SDK, you can specify the region at
  initialization. For example:

      import https://docs.cloud.google.com/python/docs/reference/vertexai/latest
      https://docs.cloud.google.com/python/docs/reference/vertexai/latest.init(project='myproject', location='us-central1')

- If you create a supervised fine-tuning job by sending a POST request using
  the
  [`tuningJobs.create`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.tuningJobs/create)
  method, then you use the URL to specify the region where the tuning job
  runs. For example, in the following URL, you specify a region by
  replacing both instances of <var translate="no">`TUNING_JOB_REGION`</var> with the region
  where the job runs.

       https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs

- If you use the [Google Cloud console](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-use-supervised-tuning#create_a_text_model_supervised_tuning_job),
  you can select the region name in the **Region**
  drop-down field on the **Model details** page. This is the same page
  where you select the base model and a tuned model name.

## Evaluating tuned models

You can evaluate tuned models in the following ways:

- **Tuning and validation metrics** : [Evaluate the tuned model](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-use-supervised-tuning#evaluate_the_tuned_model) using [tuning and validation metrics](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-use-supervised-tuning#tuning-metrics) after the tuning job completes.

- **Integrated evaluation with Gen AI evaluation service** (Preview): [Configure tuning jobs](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-use-supervised-tuning#create_a_text_model_supervised_tuning_job) to automatically run evaluations using the [Gen AI evaluation service](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/evaluation-overview) during tuning. The following interfaces, models, and regions are supported for the tuning integration with Gen AI evaluation service:

  - **Supported interfaces**: Google Gen AI SDK and REST API.

  - **Supported models** : `gemini-2.5-pro`, `gemini-2.5-flash`, and `gemini-2.5-flash-lite`.

  - **Supported regions** : For a list of supported regions, see [Supported regions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/evaluation-overview#supported-regions).

## Quota

Quota is enforced on the number of concurrent tuning jobs. Every project comes
with a default quota to run at least one tuning job. This is a global quota,
shared across all available regions and supported models. If you want to run more jobs concurrently, you need to [request additional quota](https://docs.cloud.google.com/docs/quota_detail/view_manage#requesting_higher_quota) for `Global concurrent tuning jobs`.

If you configure the [Gen AI evaluation service](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/evaluation-overview) to run evaluations automatically during tuning, see the [Gen AI evaluation service quotas](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/quotas#eval-quotas).

## Pricing

Pricing for Gemini supervised fine-tuning
can be found here: [Gemini Enterprise Agent Platform pricing](https://docs.cloud.google.com/gemini-enterprise-agent-platform/pricing).

The number of training tokens is calculated by multiplying the number of tokens in your training dataset
by the number of epochs. After tuning, inference (prediction request) costs
for the tuned model still apply. Inference pricing is the same for each stable version of Gemini.
For more information, see
[Available Gemini stable model versions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions#stable-versions-available).

If you configure the Gen AI evaluation service to run automatically during tuning, evaluations are charged as batch prediction jobs. For more information, see [Pricing](https://cloud.google.com/products/gemini-enterprise-agent-platform/pricing#prediction-prices).

## What's next

- Learn about [supervised fine-tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-supervised-tuning).
- Learn about [deploying a tuned Gemini model](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/overview#deploy_a_tuned_model).
