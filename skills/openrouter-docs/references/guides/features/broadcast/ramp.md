For clean Markdown of any page, append .md to the page URL. For a complete documentation index, see https://openrouter.ai/docs/guides/features/broadcast/llms.txt. For full documentation content, see https://openrouter.ai/docs/guides/features/broadcast/llms-full.txt.

[Ramp](https://ramp.com) is a finance automation platform that helps businesses manage expenses, track spending, and optimize costs. With Ramp's AI usage tracking, you can monitor and control your organization's LLM spending through OpenRouter.

## Step 1: Get your Ramp API key

In Ramp, navigate to your integration settings and generate an API key:

1. Log in to your Ramp account
2. Go to **Settings > Integrations** and search for "OpenRouter"

![Search for OpenRouter integration](https://files.buildwithfern.com/openrouter.docs.buildwithfern.com/docs/ccdc62c6816e55cb3c301e2f2ebc35b630862086d73731d4359ea39fad6a2c52/content/pages/features/broadcast/ramp-search-integration.png)

3. Click the **OpenRouter** integration to view the details, then click **Connect**

![OpenRouter integration detail](https://files.buildwithfern.com/openrouter.docs.buildwithfern.com/docs/2856fe0d21fbb9636525b0fffbbe78a25ea9c287e7f1d94134cf92f40f7cd874/content/pages/features/broadcast/ramp-integration-detail.png)

4. Click **Generate API Key** and copy the token

![Generate API Key](https://files.buildwithfern.com/openrouter.docs.buildwithfern.com/docs/643f487dd7d098ec75222115dafde9e5db1fd05123cc03fb3cfa4a8ba8d91868/content/pages/features/broadcast/ramp-generate-api-key.png)

## Step 2: Enable Broadcast in OpenRouter

Go to [Settings > Observability](https://openrouter.ai/settings/observability) and toggle **Enable Broadcast**.

![Enable Broadcast](https://files.buildwithfern.com/openrouter.docs.buildwithfern.com/docs/3e095d95758bab05594f468011be81b7d5a2fb19293fa91d5b3923d9f09b81d8/content/pages/features/broadcast/broadcast-enable.png)

## Step 3: Configure Ramp

Click the edit icon next to **Ramp** and enter:

* **API Key**: Your Ramp API key
* **Base URL** (optional): Default is `https://api.ramp.com/developer/v1/ai-usage/openrouter`. Only change if directed by Ramp
* **Headers** (optional): Custom HTTP headers as a JSON object to include in requests to Ramp

![Ramp Configuration](https://files.buildwithfern.com/openrouter.docs.buildwithfern.com/docs/16ee7940ffd833aacb7d95ee09a8a181a2e8cbeff6d8b61336198c47f3020334/content/pages/features/broadcast/broadcast-ramp-config.png)

## Step 4: Test and save

Click **Test Connection** to verify the setup. The configuration only saves if the test passes.

## Step 5: Send a test trace

Make an API request through OpenRouter and verify that the AI usage data appears in your Ramp dashboard.

![Ramp AI Spend Dashboard](https://files.buildwithfern.com/openrouter.docs.buildwithfern.com/docs/281142c61157a8e3494b1e7ed3b4cfa02094ee35045df0268f2f4270c4d58ed6/content/pages/features/broadcast/ramp-ai-spend-dashboard.png)

## Trace Data

Ramp receives traces via the OpenTelemetry Protocol (OTLP). Each trace includes:

* **Token usage**: Prompt tokens, completion tokens, and total tokens consumed
* **Cost information**: The total cost of the request
* **Timing**: Request start time, end time, and latency metrics
* **Model information**: The model slug and provider name used for the request
* **Request and response content**: The input messages and model output (unless [Privacy Mode](#privacy-mode) is enabled)

## Custom Metadata

Custom metadata from the `trace` field is sent as span attributes in the OTLP payload.

### Supported Metadata Keys

| Key               | OTLP Mapping   | Description                                      |
| ----------------- | -------------- | ------------------------------------------------ |
| `trace_id`        | Trace ID       | Group multiple requests into a single trace      |
| `trace_name`      | Span Name      | Custom name for the root span                    |
| `span_name`       | Span Name      | Name for intermediate spans in the hierarchy     |
| `generation_name` | Span Name      | Name for the LLM generation span                 |
| `parent_span_id`  | Parent Span ID | Link to an existing span in your trace hierarchy |

### Example

```json
{
  "model": "openai/gpt-4o",
  "messages": [{ "role": "user", "content": "Analyze this expense report..." }],
  "user": "user_12345",
  "session_id": "session_abc",
  "trace": {
    "trace_id": "expense_analysis_001",
    "trace_name": "Expense Processing Pipeline",
    "generation_name": "Analyze Report",
    "department": "finance",
    "cost_center": "CC-1234"
  }
}
```

### Additional Context

* The `user` field maps to `user.id` in span attributes
* The `session_id` field maps to `session.id` in span attributes
* Custom metadata keys from `trace` are included as span attributes under the `trace.metadata.*` namespace
* Standard GenAI semantic conventions (`gen_ai.*`) are used for model, token usage, and cost attributes

## Privacy Mode

When [Privacy Mode](/docs/guides/features/broadcast#privacy-mode) is enabled for this destination, prompt and completion content is excluded from traces. All other trace data — token usage, costs, timing, model information, and custom metadata — is still sent normally. See [Privacy Mode](/docs/guides/features/broadcast#privacy-mode) for details.