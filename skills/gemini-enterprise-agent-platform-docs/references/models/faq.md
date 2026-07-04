## Gemini 2 general FAQ

### Help! The model I'm using isn't available anymore!

If your application recently started showing errors related to an unavailable
Palm2, Gemini 1.0, or Gemini 1.5-001 models, this document
covers how you can transition to a supported model.

Google regularly releases new and improved AI models. To make way for these
advancements, older models are retired (or deprecated). We provide
notice when deprecating a model and a transition window before access to the
model is terminated, but we understand it can still cause interruptions.

Here are two options for updating your model:

1. The quickest way to resolve the error is usually to switch your application code to one of the supported models. Test all critical features to make sure everything works as expected, then launch the change like you normally would.
2. If you have a bit more time, consider our step-by-step migration process. This walks you through upgrading to the latest Gemini SDK and includes best practices to help minimize any risks during the switch. You can use this approach to minimize any potential risks of model migration and make sure that you are using the new model in an optimal way.

### How do the Gemini 2 models compare to the 1.5 generation?

The Gemini 2 models feature the following upgrades over our 1.5 models:

- Improved multilingual capabilities: Gemini 2 models show strong advancements in multilingual understanding, with increased scores in the Global MMLU (Lite) benchmark.
- Significant gains in reasoning and knowledge factuality: Gemini 2.5 Pro shows substantial improvements in GPQA (domain expert reasoning) and SimpleQA (world knowledge factuality) indicating enhanced ability to understand and provide accurate information.
- Enhanced mathematical problem-solving: Both Gemini 2.0 Flash and Gemini 2.5 Pro demonstrate notable progress in handling complex mathematical problems, as evidenced by the MATH and HiddenMath benchmarks.

The following table shows the comparison between our Gemini 2 models:

| Model name | Description | Upgrade path for |
| --- | --- | --- |
| Gemini 2.5 Pro | Strongest model quality (especially for code and world knowledge), with a 1M token-long context window | Gemini 1.5 Pro users who want better quality, or who are particularly invested in long context and code |
| Gemini 2.0 Flash | Workhorse model for all daily tasks and features enhanced performance and supports real-time Live API | - Gemini 1.5 Flash users who want a model with significantly better quality that's slightly slower - Gemini 1.5 Pro users who want slightly better quality and real-time latency |
| Gemini 2.0 Flash-Lite | Our most cost effective offering to support high throughput | - Gemini 1.5 Flash users who want better quality for the same price and speed - Customers looking for the fastest model in the Gemini 2 family |

To see all benchmark capabilities for Gemini 2, visit the
Google DeepMind
documentation.

### How do I migrate Gemini on Google AI Studio to Vertex AI Studio?

Migrating to Google Cloud's Gemini Enterprise Agent Platform platform offers a suite of
MLOps tools that streamline the usage, deployment, and monitoring of AI
models for efficiency and reliability. To migrate your work to
Gemini Enterprise Agent Platform, import and upload your existing data to Vertex AI Studio and use the Gemini API with Gemini Enterprise Agent Platform.

For more information, see Migrate from
Gemini on Google AI to Gemini Enterprise Agent Platform.

### How does Gemini 2 image generation compare to Imagen 3?

While the experimental version of Gemini 2.0 Flash
supports image generation, Gemini 2 does not currently support
image generation in our generally available models. The experimental version
of Gemini 2.0 Flash shouldn't be used in production-level
code.

If you need image generation in production code, use
Imagen 3. This powerful model offers
high-quality images, low-latency generation, and flexible editing options.

### Does Gemini 2 in Gemini Enterprise Agent Platform support compositional function calling?

Compositional function calling
is only available in Google AI Studio.

### What locations are supported for Gemini 2?

For the full list of locations that are supported for Gemini 2
models, see Locations.

### What are the default quotas for Gemini 2?

Gemini 2.0 Flash and Gemini 2.0 Flash-Lite
use Standard pay-as-you-go and
have no default quota.

Gemini 2.5 Pro has a 10 queries per minute (QPM) limit.

## Monitoring

### Why does my quota usage show as 0% percent on API dashboard when I'm sending requests?

For Gemini models on Vertex, we use a Standard pay-as-you-go.
This innovative approach automatically manages
capacity across all users in a region, ensuring optimal performance without
the need for manual quota adjustments or requests. As a result, you won't
see traditional quota usage displayed in the Quotas & System Limits
tab. Your project will automatically receive the necessary resources based
on real-time availability.

Use the Agent Platform Model Garden (Monitoring)
dashboard to monitor usage.

## Provisioned Throughput

### When should I use Provisioned Throughput?

For generative AI applications in production requiring consistent
throughput, we recommend using Provisioned Throughput (PT). PT ensures a
predictable and consistent user experience, critical for time-sensitive
workloads. Additionally, it provides deterministic monthly or weekly cost
structures, enabling accurate budget planning.

For more information, see Provisioned Throughput overview.

### What models are supported for Provisioned Throughput?

The list of models supported for Provisioned Throughput, including
throughput, purchase increment, and burndown rate is listed on our
Supported
models page.

To purchase Provisioned Throughput for partner models (such as
Anthropic's Claude models), you must contact Google; you can't order through
the Google Cloud console. For more information, see
Partner models.

### How can I monitor my Provisioned Throughput usage?

There are three ways to measure your Provisioned Throughput usage:

- Use the Model Garden monitoring dashboard
- Use the built-in monitoring metrics
- Use the HTTP response headers

When using the built-in monitoring metrics or HTTP response headers, you
can create a chart in the
Metrics Explorer to monitor usage.

### What permissions are required to purchase and use Provisioned Throughput?

To buy and manage Provisioned Throughput, follow the instructions in the Permissions section of Purchase Provisioned Throughput. The same permissions for pay-as-you-go apply for Provisioned Throughput usage.

If you still run into issues placing an order, you likely need to add one of
the following roles:

- Agent Platform Administrator
- Agent Platform Publisher Provisioned Throughput Admin

### What is a GSU?

A generative AI scale unit (GSU) is an abstract measure of capacity for throughput provisioning
that is fixed and standard across all Google models that support Provisioned
Throughput. A GSU's price and capacity is fixed, but throughput may vary
between models because different models may require different amounts of
capacity to deliver the same throughput.

### How can I estimate my GSU needs for Provisioned Throughput?

You can estimate your Provisioned Throughput needs by:

- Gather your requirements
- Calculate your throughput:
- Calculate your GSUs: Use the estimation tool provided in the purchasing console to calculate the corresponding number of GSUs needed to cover that usage for the given model and details.

> [!IMPORTANT]
> Important: Review the detailed steps in our example of estimating your Provisioned Throughput needs.

### How often am I billed for Provisioned Throughput?

You're invoiced for any charges you incur for Provisioned Throughput usage
over the course of the month at the end of that month.

### How long does it take to activate my Provisioned Throughput order?

- For small orders or small incremental increases, the order will be auto-approved and ready within minutes if capacity is available.
- Larger increases or orders may take longer and may require us to communicate with you directly in order to prepare capacity for your order. We aim to have a decision on each request (either approved or denied) within 1 week of order submission.

### Can I test Provisioned Throughput before placing an order?

While a direct test environment is not available, a 1-week order with a
limited number of GSUs provides a cost-effective way to experience its
benefits and assess its suitability for your requirements.

For more information, see
Purchase Provisioned Throughput.

## Repetitive token issues

### How do I reduce repeated output token issues?

If you see repeated output tokens, try the following suggestions to help
reduce or eliminate them.

| Description | Cause | Suggested workaround |
| Repeated hyphens in Markdown tables | This can occur when the contents of the table are long as the model tries to create a visually aligned Markdown table. However, the alignment in Markdown is not necessary for correct rendering. | Add instructions in your prompt to give the model specific guidelines for generating Markdown tables. Provide examples that follow those guidelines. You can also try adjusting the temperature. For generating code or very structured output like Markdown tables, high temperature have shown to work better (>= 0.8). The following is an example set of guidelines you can add to your prompt to prevent this issue: `# Markdown Table Format * Separator line: Markdown tables must include a separator line below the header row. The separator line must use only 3 hyphens per column, for example: |---|---|---|. Using more hypens like ---, ---, --- can result in errors. Always use |:---|, |---:|, or |---| in these separator strings. For example: | Date | Description | Attendees | |---|---|---| | 2024-10-26 | Annual Conference | 500 | | 2025-01-15 | Q1 Planning Session | 25 | * Alignment: Do not align columns. Always use |---|. For three columns, use |---|---|---| as the separator line. For four columns use |---|---|---|---| and so on. * Conciseness: Keep cell content brief and to the point. * Never pad column headers or other cells with lots of spaces to match with width of other content. Only a single space on each side is needed. For example, always do "| column name |" instead of "| column name |". Extra spaces are wasteful. A markdown renderer will automatically take care displaying the content in a visually appealing form.` |
| Repeated tokens in Markdown tables | Similar to the repeated hyphens, this occurs when the model tries to visually align the contents of the table. The alignment in Markdown is not required for correct rendering. | - Try adding instructions like the following to your system prompt: `FOR TABLE HEADINGS, IMMEDIATELY ADD ' |' AFTER THE TABLE HEADING.` - Try adjusting the temperature. Higher temperatures (>= 0.8) generally helps to eliminate repetitions or duplication in the output. |
| Repeated newlines (`\n`) in structured output | When the model input contains unicode or escape sequences like `\u` or `\t`, it can lead to repeated newlines. | - Check for and replace forbidden escape sequences with UTF-8 characters in your prompt. For example, `\u` escape sequence in your JSON examples can cause the model to use them in its output too. - Instruct the model on allowed escapes. Add a system instruction like this: `In quoted strings, the only allowed escape sequences are \\, \n, and \". Instead of \u escapes, use UTF-8.` |
| Repeated text in using structured output | When the model output has a different order for the fields than the defined structured schema, this can lead to repeating text. | - Don't specify the order of fields in your prompt. - Make all output fields required. |
| Repetitive tool calling | This can occur if the model loses the context of previous thoughts and/or call an unavailable endpoint that it's forced to. | Instruct the model to maintain state within its thought process. Add this to the end of your system instructions: `When thinking silently: ALWAYS start the thought with a brief (one sentence) recap of the current progress on the task. In particular, consider whether the task is already done.` |

| Repetitive text that's not part of structured output | This can occur if the model gets stuck on a request that it can't resolve. | - If thinking is turned on, avoid giving explicit orders for how to think through a problem in the instructions. Just ask for the final output. - Try a higher temperature >= 0.8. - Add instructions like "Be concise", "Don't repeat yourself", or "Provide the answer once". |
