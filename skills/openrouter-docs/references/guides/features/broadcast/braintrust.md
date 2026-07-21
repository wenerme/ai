> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Braintrust

> Send traces to Braintrust

[Braintrust](https://www.braintrust.dev) is an end-to-end platform for evaluating, monitoring, and improving LLM applications.

## Step 1: Get your Braintrust API key and Project ID

In Braintrust, go to your [Account Settings](https://www.braintrust.dev/app/settings) to create an API key, and find your Project ID in your project's settings.

<Frame>
  <img src="https://mintcdn.com/openrouter-d02e98a0/PSwwwiCqAD_BNeni/assets/guides/features/broadcast/braintrust/braintrust-project-id-example.png?fit=max&auto=format&n=PSwwwiCqAD_BNeni&q=85&s=3b18fca4cb53dc492c555f2361a169b3" alt="Braintrust Project ID" width="2574" height="742" data-path="assets/guides/features/broadcast/braintrust/braintrust-project-id-example.png" />
</Frame>

## Step 2: Enable Broadcast in OpenRouter

Go to [Settings > Observability](https://openrouter.ai/settings/observability) and toggle **Enable Broadcast**.

<Frame>
  <img src="https://mintcdn.com/openrouter-d02e98a0/PSwwwiCqAD_BNeni/assets/guides/features/broadcast/arize/broadcast-enable.png?fit=max&auto=format&n=PSwwwiCqAD_BNeni&q=85&s=a48ecd5df85b4e6f3982c8402671f631" alt="Enable Broadcast" width="2692" height="1296" data-path="assets/guides/features/broadcast/arize/broadcast-enable.png" />
</Frame>

## Step 3: Configure Braintrust

Click the edit icon next to **Braintrust** and enter:

* **Api Key**: Your Braintrust API key
* **Project Id**: Your Braintrust project ID
* **Base Url** (optional): Default is `https://api.braintrust.dev`

<Frame>
  <img src="https://mintcdn.com/openrouter-d02e98a0/PSwwwiCqAD_BNeni/assets/guides/features/broadcast/braintrust/broadcast-braintrust-config.png?fit=max&auto=format&n=PSwwwiCqAD_BNeni&q=85&s=a81d4af386bbcd1e931d2df214c2d332" alt="Braintrust Configuration" width="956" height="971" data-path="assets/guides/features/broadcast/braintrust/broadcast-braintrust-config.png" />
</Frame>

## Step 4: Test and save

Click **Test Connection** to verify the setup. The configuration only saves if the test passes.

<Frame>
  <img src="https://mintcdn.com/openrouter-d02e98a0/PSwwwiCqAD_BNeni/assets/guides/features/broadcast/braintrust/broadcast-braintrust-configured.png?fit=max&auto=format&n=PSwwwiCqAD_BNeni&q=85&s=da941548285d8cfcfb045ed0743e7b03" alt="Braintrust Configured" width="1265" height="696" data-path="assets/guides/features/broadcast/braintrust/broadcast-braintrust-configured.png" />
</Frame>

## Step 5: Send a test trace

Make an API request through OpenRouter and view the trace in Braintrust.

<Frame>
  <img src="https://mintcdn.com/openrouter-d02e98a0/PSwwwiCqAD_BNeni/assets/guides/features/broadcast/braintrust/broadcast-braintrust-trace.png?fit=max&auto=format&n=PSwwwiCqAD_BNeni&q=85&s=bd78dfd89730174c4f32b62e1d0682e3" alt="Braintrust Trace" width="926" height="922" data-path="assets/guides/features/broadcast/braintrust/broadcast-braintrust-trace.png" />
</Frame>

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

```json lines theme={null}
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
