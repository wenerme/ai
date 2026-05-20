> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Braintrust

[Braintrust](https://www.braintrust.dev) is an end-to-end platform for evaluating, monitoring, and improving LLM applications.

## Step 1: Get your Braintrust API key and Project ID

In Braintrust, go to your [Account Settings](https://www.braintrust.dev/app/settings) to create an API key, and find your Project ID in your project's settings.

![Braintrust Project ID](file:a327cb90-abd6-4540-8c2f-1ea4069988a6)

## Step 2: Enable Broadcast in OpenRouter

Go to [Settings > Observability](https://openrouter.ai/settings/observability) and toggle **Enable Broadcast**.

![Enable Broadcast](file:32dead6f-003d-492a-b50b-e3dd1fdd3a37)

## Step 3: Configure Braintrust

Click the edit icon next to **Braintrust** and enter:

* **Api Key**: Your Braintrust API key
* **Project Id**: Your Braintrust project ID
* **Base Url** (optional): Default is `https://api.braintrust.dev`

![Braintrust Configuration](file:c4d7819a-5093-4e40-9969-884b0dd9061b)

## Step 4: Test and save

Click **Test Connection** to verify the setup. The configuration only saves if the test passes.

![Braintrust Configured](file:df56d260-0b94-42b8-9496-6fb1ff1643f8)

## Step 5: Send a test trace

Make an API request through OpenRouter and view the trace in Braintrust.

![Braintrust Trace](file:1514c2f6-15a8-4662-a1e1-8718d1577d78)

## Custom Metadata

Braintrust supports custom metadata, tags, and nested span structures for organizing your LLM logs.

### Supported Metadata Keys

| Key               | Braintrust Mapping     | Description                                      |
| ----------------- | ---------------------- | ------------------------------------------------ |
| `trace_id`        | Span ID / Root Span ID | Group multiple logs into a single trace          |
| `trace_name`      | Name                   | Custom name displayed in the Braintrust log view |
| `span_name`       | Name                   | Name for intermediate spans in the hierarchy     |
| `generation_name` | Name                   | Name for the LLM span                            |

### Example

```json
{
  "model": "openai/gpt-4o",
  "messages": [{ "role": "user", "content": "Generate a summary..." }],
  "user": "user_12345",
  "session_id": "session_abc",
  "trace": {
    "trace_id": "eval_run_456",
    "trace_name": "Summarization Eval",
    "generation_name": "GPT-4o Summary",
    "eval_dataset": "news_articles",
    "experiment_id": "exp_789"
  }
}
```

### Metrics and Costs

Braintrust receives detailed metrics for each LLM call:

* Token counts (prompt, completion, total)
* Cached token usage when available
* Reasoning token counts for supported models
* Cost information (input, output, total costs)
* Duration and timing metrics

### Additional Context

* The `user` field maps to Braintrust's `user_id` in metadata
* The `session_id` field maps to `session_id` in metadata
* Custom metadata keys are included in the span's metadata object
* Tags are passed through for filtering in the Braintrust UI

## Privacy Mode

When [Privacy Mode](/docs/guides/features/broadcast#privacy-mode) is enabled for this destination, prompt and completion content is excluded from traces. All other trace data — token usage, costs, timing, model information, and custom metadata — is still sent normally. See [Privacy Mode](/docs/guides/features/broadcast#privacy-mode) for details.