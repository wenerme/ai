> [!NOTE]
> **Note:** xAI models are not a Google product, and its availability in Gemini Enterprise Agent Platform is subject to the terms for "Separate Offerings" in the AI/ML Services section of the [Service Specific
> Terms](https://cloud.google.com/terms/service-terms), and separate terms found in the relevant model card.

xAI Grok models are available for use as managed APIs on Gemini Enterprise Agent Platform. You can stream your responses to reduce the
end-user latency perception. A streamed response uses *server-sent events* (SSE)
to incrementally stream the response.

## Managed xAI models

The following models are available from xAI to use in
Gemini Enterprise Agent Platform. To access a xAI model, go to its
Model Garden model card.

### Grok 4.3

Grok 4.3 is xAI's flagship model.

[Go to the Grok 4.3 model card](https://console.cloud.google.com/agent-platform/publishers/xai/model-garden/grok-4.3)

### Grok 4.20 (Reasoning)

Grok 4.20 (Reasoning) is xAI's flagship model, featuring an industry-leading low hallucination rate. Excels at document understanding tasks and long-horizon agentic tool calling.

[Go to the Grok 4.20 (Reasoning) model card](https://console.cloud.google.com/agent-platform/publishers/xai/model-garden/grok-4.20-reasoning)

### Grok 4.20 (Non-reasoning)

Grok 4.20 (Non-reasoning) is xAI's flagship non-thinking model, featuring an industry-leading low hallucination rate. Excels in latency-sensitive use cases like customer support and categorization.

[Go to the Grok 4.20 (Non-reasoning) model card](https://console.cloud.google.com/agent-platform/publishers/xai/model-garden/grok-4.20-non-reasoning)

### Grok 4.1 Fast (Reasoning)

Grok 4.1 Fast (Reasoning) is xAI's most cost-effective model, featuring strong tool-calling capabilities and efficient knowledge base synthesis. Excels at search tasks involving web data and internal knowledge base tools.

[Go to the Grok 4.1 Fast (Reasoning) model card](https://console.cloud.google.com/agent-platform/publishers/xai/model-garden/grok-4.1-fast-reasoning)

### Grok 4.1 Fast (Non-reasoning)

Grok 4.1 Fast (Non-reasoning) is xAI's most cost-effective non-thinking model, optimized for low-latency performance. Excels at high-volume tasks like summarization and categorization.

[Go to the Grok 4.1 Fast (Non-reasoning) model card](https://console.cloud.google.com/agent-platform/publishers/xai/model-garden/grok-4.1-fast-non-reasoning)

## Use xAI models

For managed models, you can use curl commands to send requests to the
Gemini Enterprise Agent Platform endpoint using the following model names. To learn how to make
streaming and non-streaming calls to xAI
models, see [Call open model
APIs](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/call-open-model-apis).

For managed models, you can use curl commands to send requests to the
Gemini Enterprise Agent Platform endpoint using the following model names:

- For Grok 4.3, use `grok-4.3`
- For Grok 4.20 (Reasoning), use `grok-4.20-reasoning`
- For Grok 4.20 (Non-reasoning), use `grok-4.20-non-reasoning`
- For Grok 4.1 Fast (Reasoning), use `grok-4.1-fast-reasoning`
- For Grok 4.1 Fast (Non-reasoning), use `grok-4.1-fast-non-reasoning`

## Grok quotas

Grok models have a global quota. The quota is specified in queries per minute (QPM) and
tokens per minute (TPM). TPM includes both input and output tokens.

To maintain overall service performance and acceptable use, the maximum quotas
might vary by account and, in some cases, access might be restricted. View your
project's quotas on the [Quotas \& Systems
Limits](https://console.cloud.google.com/quotas) page in the Google Cloud console.
You must also have the following quotas available:

- `global_generate_content_requests_per_minute_per_project_per_base_model` defines your QPM quota.

- For TPM, there are two quota values that apply to particular models:
  `global_generate_content_input_tokens_per_minute_per_base_model` defines the input TPM quota and
  `global_generate_content_output_tokens_per_minute_per_base_model`defines the output TPM quota.

To see which models count input and output tokens separately, see the specific model pages.

## What's next

- Learn how to [Call open model
  APIs](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/call-open-model-apis).
- Learn how to [Call Responses API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/grok/responses).
