

This guide explains how to update your application to the latest Gemini
version. This guide assumes your application already uses an older Gemini
version. To learn how to start using Gemini in Gemini Enterprise Agent Platform, see
the [Gemini API quickstart](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/quickstart).

This guide doesn't cover how to switch your application from the
Agent Platform SDK to the current Google Gen AI SDK. For that information,
see our [Agent Platform SDK migration guide](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deprecations/genai-vertexai-sdk).

## What changes should I expect?

Updating most generative AI applications to the latest Gemini version
requires few code or prompt changes. However, some applications may require
prompt adjustments. It's hard to predict these changes without first testing
your prompts with the new version. Thorough testing is recommended before fully
migrating. For tips on creating effective prompts, see our [prompt strategy
guidance](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/prompts/prompt-design-strategies).
Use our [prompt health checklist](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/prompts/prompt-design-strategies#prompt-health-checklist)
to help find and fix prompt issues.

### Token count reporting update

You may observe an expected increase in reported token counts as our upgraded
infrastructure now accurately captures all request components - including
complex metadata like Response Schemas and Function Calling - that were
previously undercounted by the legacy system.

You only need to make major code changes for certain [breaking
changes](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/migrate#breaking-changes) or to use new Gemini capabilities.

## Which Gemini model should I migrate to?

The Gemini model you use depends on your application's needs:

| Feature | [2.5 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro) | [2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash) | [2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite) | [3 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-flash) | [3.1 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-pro) | [3.1 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite) | [3.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-5-flash) |
|---|---|---|---|---|---|---|---|
| Launch stage | GA | GA | GA | Preview | Preview | GA | GA |
| Input modalities | Text, Image, Audio, Video | Text, Image, Audio, Video | Text, Image, Audio, Video | Text, Image, Audio, Video | Text, Image, Audio, Video | Text, Image, Audio, Video | Text, Image, Audio, Video |
| Output modalities | Text | Text | Text | Text | Text | Text | Text |
| Context window, total token limit | 1,048,576 | 1,048,576 | 1,048,576 | 1,048,576 | 1,048,576 | 1,048,576 | 1,048,576 |
| Output context length | 65,535 (default) | 65,535 (default) | 65,535 (default) | 65,536 | 65,536 | 65,535 (default) | 65,535 (default) |
| [Grounding with Google Search](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-google-search) |   |   |   |   |   |   |   |
| [Function calling](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/function-calling) |   |   |   |   |   |   |   |
| [Code execution](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/code-execution) |   |   |   |   |   |   |   |
| [Implicit context caching](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-overview) |   |   |   |   |   |   |   |
| [Explicit context caching](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-overview) |   |   |   |   |   |   |   |
| [Batch prediction](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/batch-inference) |   |   |   |   |   |   |   |
| [Gemini Live API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api) |   |   |   |   |   |   |   |
| [Fine-tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tune-models) |   |   |   |   |   |   |   |
| Latency |   |   |   |   |   |   |   |
| [Retirement date](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions) | October 16, 2026 | October 16, 2026 | October 16, 2026 |   |   | Not before May 7, 2027 | Not before May 19, 2027 |

## Before you begin migrating

Before you start the migration process, you should consider the following:

- [Information security (InfoSec), governance, and regulatory approvals](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/migrate#infosec-and-governance)
- [Location availability](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/migrate#location-availability)
- [Modality and tokenization-based pricing differences](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/migrate#pricing-differences)
- [Purchase or change Provisioned Throughput orders](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/migrate#provisioned-throughput)
- [Supervised fine-tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/migrate#supervised-fine-tuning)
- [Regression testing](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/migrate#regression-testing)

### InfoSec, governance, and regulatory approvals

Obtain approvals from your information security (InfoSec), risk, and
compliance teams early. Cover any specific risk and compliance
rules, especially in regulated industries like healthcare and finance.

> [!CAUTION]
> **Caution:** Security control support varies by model. For details on each Gemini model's support level, see the [security controls guide](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/security-controls).

### Location availability

Google and Partner models and generative AI features on Gemini Enterprise Agent Platform
are available through specific [regional
endpoints](https://cloud.google.com/about/locations) and a [global
endpoint](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations#global-endpoint). Global endpoints cover the entire world and offer improved
availability and reliability compared to single regions.

Regional endpoint availability varies by model. For details on each model, see
our [locations guide](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations).

### Modality and tokenization-based pricing differences

Pricing varies between each Gemini model. Our
[pricing page](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing) lists costs
for all modalities (text, code, images, speech, etc.) per model.

> [!NOTE]
> **Note:** Gemini 2 and later models are priced per token for inputs and outputs. Gemini 1.5 models are priced per character.

### Purchase or change Provisioned Throughput orders

If needed, [purchase
more Provisioned Throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/purchase-provisioned-throughput#place-an-order) or [change
existing Provisioned Throughput orders](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/purchase-provisioned-throughput#change-order).

### Supervised fine-tuning

The latest Gemini models offer better output quality. This can
mean your application no longer needs a fine-tuned model. If your
application uses [supervised
fine-tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-supervised-tuning) with an older Gemini model, first test your
application with the latest model without fine-tuning and evaluate the
results.

If you choose to use supervised fine-tuning, you cannot move your existing
tuned model from older Gemini versions. You need to run a new
tuning job for the new Gemini version.

When tuning a new Gemini model, start with the default tuning
settings. Don't reuse hyperparameter values from previous Gemini
versions, because the tuning service is optimized for the latest versions.
Reusing old settings is unlikely to give optimal results.

### Regression testing

When upgrading to the latest Gemini version, you'll need three
main types of regression tests:

1. **Code regression tests:** Regression testing from a software engineering and developer operations (DevOps) perspective. This type of regression testing is **always required**.
2.
   **Model performance regression tests:** Regression testing from a
   data science or machine learning perspective. This means ensuring that
   the new Gemini model version provides outputs that at least
   maintain the same level of quality as the previous version.

   Model performance regression tests are model evaluations done when a
   system or its underlying model changes. They include:
   - **Offline performance testing:** Tests that assert the quality of model outputs in a dedicated experimentation environment based on various model output quality metrics.
   - **Online model performance testing:** Tests that assert the quality of model outputs in a live, online deployment based on implicit or explicit user feedback.
3. **Load testing:** These tests check how well the application handles many requests at once. Load testing is **required for applications
   that use [Provisioned Throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput)**.

## How to migrate to the latest version

The following sections outline the steps to migrate to the latest Gemini
version. For optimal results, complete these steps in order.

### 1. Document model evaluation and testing requirements

1. Prepare to repeat any relevant evaluations you performed when you first built your application, plus any evaluations performed since then.
2. If your current evaluations don't fully cover or measure all tasks your application performs, design and prepare more evaluations. You can use our [evaluation playbook](https://github.com/GoogleCloudPlatform/applied-ai-engineering-samples/tree/main/genai-on-vertex-ai/gemini/evals_playbook) and our [evaluation
   recipes](https://github.com/GoogleCloudPlatform/applied-ai-engineering-samples/tree/main/genai-on-vertex-ai/gemini/model_upgrades) to help you get started.
3. If your application involves RAG, tool use, complex agentic workflows, or prompt chains, make sure that your existing evaluation data allows for assessing each component independently. If not, gather input-output examples for each component.
4. If your application is critical or part of a larger user-facing real-time system, include online evaluation.

### 2. Make code upgrades and run tests

Upgrading your code requires three main changes:

- [Upgrade to the Google Gen AI SDK](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/migrate#upgrade-sdk)
- [Change your Gemini calls](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/migrate#change-calls)
- [Fix breaking code changes](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/migrate#breaking-changes)

The following sections goes over these changes in further detail.

#### Upgrade to the Google Gen AI SDK

If your Gemini 1.x application uses the Vertex AI SDK, switch to
the Gen AI SDK. See our [Vertex AI SDK migration
guide](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deprecations/genai-vertexai-sdk) for
details, including code examples for making similar calls with the
Gen AI SDK. Vertex AI SDK releases after June 2026 won't
support Gemini, and new Gemini features are only available
in the Gen AI SDK.

We strongly recommend updating to the `google-genai` SDK version `2.0.0` or
later to take advantage of all new features in Gemini 3.5 Flash and
later models.

If you're new to the Gen AI SDK, see the [Getting started with
Google Generative AI using the Gen AI SDK](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/sdk/intro_genai_sdk.ipynb)
notebook.

#### Change your Gemini calls

Update your prediction code to use one of the latest Gemini models. At
a minimum, this means changing the model endpoint name.

The exact code changes will vary based on how you built your application,
especially whether you used the Gen AI SDK or the
Vertex AI SDK.

After making code changes, run code regression tests and other software tests
to ensure your code functions as expected. This step checks whether the code
functions, but not the quality of model responses.

#### Fix breaking code changes

- **Dynamic retrieval** : Switch to using [Grounding with Google Search](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-google-search#dynamic-retrieval). This feature requires the [Gen AI SDK](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/sdks/overview) and isn't supported by the Vertex AI SDK.
- Content filters: Note the [default content filter settings](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/configure-safety-filters#how_to_configure_content_filters). Change your code if it relies on a default that has changed.
- [**`Top-K` token sampling parameter**](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/content-generation-parameters#top-k): Models after `gemini-1.0-pro-vision` don't support changing the `Top-K` parameter.
- **Thinking** : Gemini 3 Pro and later models use the `thinking_level` parameter instead of `thinking_budget`. For more information, see [Control model thinking](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/thinking#budget).
- **Thought signatures** : For Gemini 3 Pro and later models, if a thought signature is expected in a turn but not provided, the model returns an error instead of a warning. See [Thought signatures](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/thought-signatures).
- **Media resolution and tokenization** : Gemini 3 Pro and later models use a variable sequence length for media tokenization instead of Pan and Scan, and have new default resolutions and token costs for images, PDFs, and video. See [Image understanding](https://docs.cloud.google.com/vertex-ai/docs/multimodal/image-understanding#image-tokenization) and [Video understanding](https://docs.cloud.google.com/vertex-ai/docs/multimodal/video-understanding#video-tokenization).
- **Usage metadata** : For Gemini 3 Pro and later models, PDF token counts in `usage_metadata` are reported under the `IMAGE` modality instead of `DOCUMENT`.
- **Image segmentation**: Image segmentation is not supported by Gemini 3 Pro and later models.
- **Multimodal function responses** : For Gemini 3 Pro and later models, you can include image and PDF data in function responses. See [Multimodal function responses](https://docs.cloud.google.com/vertex-ai/docs/multimodal/function-calling#mm-fr).
- **PDF processing**: For Gemini 3 Pro and later models, OCR is not used by default when processing scanned PDFs.

For this step, focus only on code changes. You may need to make other changes
later, but wait until you start your evaluation. After your evaluations, consider
these adjustments based on the evaluation results:

- If you're switching from dynamic retrieval, you may need to adjust your system instructions to control when Google Search is used (for example, `"Only generate queries for the Google Search tool if the
  user asks about sports. Don't generate queries for any other topic."`). However, wait until you evaluate before changing prompts.
- If you used the `Top-K` parameter, adjust other token sampling parameters, like [`Top-P`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/content-generation-parameters#top-p), to get similar results.

### 3. Run offline evaluations

Repeat the evaluations you performed when you first developed and launched your
application, any offline evaluations done since then, and any additional
evaluations you identified in [step 1](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/migrate#document-requirements). If you still feel your evaluation doesn't
fully cover your application's scope, conduct further evaluations.

If you don't have an automated way to run offline evaluations, consider using the
[Gen AI evaluation service](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/evaluation-overview).

If your application uses fine-tuning, perform offline evaluation before
re-tuning your model with the latest version of Gemini. The latest
models offer improved output quality, which can mean your application no longer
needs a fine-tuned model.

### 4. Assess evaluation results and tune your prompts and hyperparameters

If your offline evaluation shows your application performing less effectively, improve
your application until its performance matches the older model. Do this by:

- Iteratively refining your prompts to boost performance ("Hill Climbing"). If you're new to hill climbing, see the [Vertex Gemini hill
  climbing online training](https://cloudonair.withgoogle.com/events/vertex-gemini-hill-climbing-your-way-to-optimal-prompts). The [Gemini Enterprise Agent Platform prompt optimizer](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/prompts/prompt-optimizer) ([example notebook](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/prompts/prompt_optimizer/vertex_ai_prompt_optimizer_sdk_custom_metric.ipynb)) can also help.
- If your application is affected by Dynamic Retrieval and Top-K [breaking
  changes](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/migrate#breaking-changes), experiment with adjusting your prompt and token sampling parameters.

### 5. Run load tests

If your application needs a certain minimum throughput, perform load testing to
ensure the latest version of your application meets your throughput
requirements.

Load testing must occur before online evaluation, because online evaluation
involves exposing the model to live traffic. Use your existing load testing
tools and instrumentation for this step.

If your application already meets throughput needs, consider using
[Provisioned Throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput).
You'll need extra short-term Provisioned Throughput to cover load testing
while your current Provisioned Throughput order handles production traffic.

### 6. (Optional) Run online evaluations

Move to online evaluation only if your offline evaluation shows high
Gemini output quality *and* your application requires online
evaluation.

Online evaluation is a specific type of online testing. Try to use your
organization's existing tools and methods for online evaluation. For example:

- If your organization regularly performs [A/B
  tests](https://en.wikipedia.org/wiki/A%2FB_testing), perform one to compare your application's current version with the latest Gemini version.
- If your organization regularly uses [canary
  deployments](https://en.wikipedia.org/wiki/Feature_toggle#Canary_release), use them with the latest models and measure changes in user behavior.

You can also do online evaluation by adding new feedback and measurement
features to your application. Different applications need different feedback
methods. For example:

- Adding thumbs-up and thumbs-down buttons next to model outputs and comparing the rates between an older model and the latest Gemini models.
- Showing users outputs from both the older model and the latest models side-by-side and asking them to pick their favorite.
- Tracking how often users override or manually adjust outputs from the older model versus the latest models.

These feedback methods often require running the latest Gemini version
alongside your existing version. This parallel deployment is sometimes called
"shadow mode" or "blue-green deployment."

If online evaluation results differ greatly from offline evaluation results,
your offline evaluation isn't capturing key aspects of the live environment or
user experience. Apply the online evaluation findings to create a new offline
evaluation that covers the gap, then return to step 3.

If you use Provisioned Throughput, you may need to [purchase additional
short-term Provisioned Throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/purchase-provisioned-throughput#pt-weekly-term)
to continue to meet your throughput requirements for users in online evaluation.

### 7. Deploy to production

Once your evaluation shows that the latest Gemini model performs as
well as or better than an older model, replace the existing
application version with the new version. Follow your organization's standard
procedures for production rollout.

If you're using [Provisioned Throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/migrate#provisioned-throughput), change
your Provisioned Throughput order to your chosen Gemini model. If
you're rolling out your application incrementally, use short-term
Provisioned Throughput to meet throughput needs for two different
Gemini models.

## Parameter updates and best practices in Gemini 3.x

The following apply to all Gemini 3.x models, including Gemini 3.5 Flash. They
were introduced with Gemini 3 and are listed here as a reminder.

### Sampling parameters (deprecated)

`temperature`, `top_p`, and `top_k` are no longer recommended for all Gemini 3.x
models. The model manages its own sampling for optimal results. **Remove these
parameters from all requests.**

To maximize determinism, we recommend defining a system instruction with
explicit rules for your specific use case.

### `thinking_budget` (deprecated)

The raw numeric `thinking_budget` parameter is no longer recommended across all
Gemini 3.x models. Use the `thinking_level` string enum instead.

### Function calling: strict response matching

The API does not yet error, but mismatched responses cause the model to return
empty responses with `finish_reason: STOP` in most cases. Always follow these
conventions:

- **Include `id`** : Every `FunctionResponse` must include the `id` from the corresponding `FunctionCall`.
- **Match `name`** : The `name` in the response must match the `name` in the call.
- **Match counts** : Return exactly one `FunctionResponse` for each `FunctionCall` received.

### Multimodal function responses

When providing multimodal content (like images) in response to a function call,
include the content *inside* the function response parts, not outside them. This
prevents unexpected model behavior like thought leakage.

### Inline instructions with function response

If you need to provide platform instructions along with function responses,
append them to the end of the function response text separated by two newlines,
rather than as separate parts.

### Reducing unnecessary tool calls

If you experience an overuse of tool calls:
1. **Reduce the thinking level** (`medium`, `low`, or `minimal`).
2. **Add a system instruction** to constrain tool usage (e.g., `"You have a
limited action budget of <n> tool calls. Use them efficiently."`).

## Migration Checklist

### From Gemini 3 Flash Preview

- Update model name: `gemini-3-flash-preview` → `gemini-3.5-flash`.
- Review pricing. Gemini 3.5 Flash is more expensive than Gemini 3 Flash Preview.
- Remove `temperature`, `top_p`, `top_k` from your config.
- Replace `thinking_budget` with `thinking_level`.
- Test your prompts. Default effort changed from `high` → `medium`.
- Thought preservation is now on by default. Reasoning context carries forward across turns.
- Reduce unnecessary tool calls by adjusting thinking level or adding system instructions.
- Computer Use is not supported in Gemini 3.5 Flash at this moment.
- **Mitigate sycophancy** : If `gemini-3.5-flash` starts exhibiting signs of sycophancy, you can experiment with mitigating this behaviour via its system instructions by adding the following: `- Keep your responses concise.
  - Provide a summary of your work when you end your turn. Ground your response in the work you did. Keep your tone professional and avoid overconfident language, bragging, or overclaiming success.
  - AVOID using superlatives such as "perfectly", "flawlessly", "100% correct", "Summary of Accomplishments" etc. to summarize your work for the user. Be humble.
  - AVOID over-the-top politeness or complimenting the user excessively.
  - Format your responses in github-style markdown.`

### From Gemini 2.5

- Test PDF and document workloads. Token consumption for PDFs may increase.
- Simplify prompts. Try `thinking_level: "medium"` or `"high"` with simpler prompts instead of complex chain-of-thought prompts.
- Leverage combined tool use (Search, URL context, code execution, functions).
- Move multimodal content inside function response parts.
- Append inline instructions to the function response text.

## Improving model performance

As you migrate, apply these tips to achieve optimal performance from your
chosen Gemini model:

- For all `Gemini 3` models, sampling parameters (`temperature`, `top_p`, and `top_k`) are deprecated. The model manages its own sampling for optimal results. Google recommends removing these parameters from all requests.
- Check your [system
  instructions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/prompts/system-instructions), [prompts](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/prompts/prompt-design-strategies), and [few-shot learning
  examples](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/prompts/few-shot-examples) for any inconsistencies, contradictions, or irrelevant instructions and examples.
- Test a more powerful model. For example, if you evaluated a Flash-Lite model, try a Flash or Pro model instead.
- Review automated evaluation results to ensure they match human judgment, especially results using a [judge
  model](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/evaluate-judge-model). Ensure your judge model instructions are clear, consistent, and unambiguous.
- To improve judge model instructions, test the instructions with multiple humans working in isolation. If humans interpret the instructions differently and provide different judgments, your judge model instructions are unclear.
- [Fine-tune the model](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tune-models).
- Examine evaluation outputs for patterns that show specific types of failures. Grouping failures by model, type, or category provides more targeted evaluation data, making it easier to adjust prompts to fix these errors.
- Ensure you are evaluating different generative AI components independently.
- Experiment with adjusting [token sampling
  parameters](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/content-generation-parameters#token-sampling-parameters).

## Getting help

If you require assistance, Google Cloud offers support packages to meet your needs, such
as 24/7 coverage, phone support, and access to a technical support manager. For
more information, see [Google Cloud Support](https://docs.cloud.google.com/support).

## What's next

Guide

### [Get started with Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/quickstart)

Learn the basics of using the Google Gen AI SDK to send queries to Gemini models with Agent Platform.

Overview

### [Google models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models)

List of Google models available in Agent Platform, such as Gemini, Gemma, and Veo.

Overview

### [Partner models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/use-partner-models)

List of models developed by Google partners available in Agent Platform, such as Claude and Mistral.

Overview

### [Open models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/open-models/choose-serving-option)

Overview of how to use open models such as Gemma, Llama, DeepSeek, and more in Agent Platform.

Resource

### [Frequently asked questions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/faq)

Frequently asked questions about using Gemini with Agent Platform.
