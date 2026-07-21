> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# W&B Weave

> Send traces to W&B Weave

[Weights & Biases Weave](https://wandb.ai/site/weave) is an observability platform for tracking and evaluating LLM applications.

## Step 1: Get your W\&B API key

In W\&B, go to your [User Settings](https://wandb.ai/settings) and copy your API key.

## Step 2: Enable Broadcast in OpenRouter

Go to [Settings > Observability](https://openrouter.ai/settings/observability) and toggle **Enable Broadcast**.

<Frame>
  <img src="https://mintcdn.com/openrouter-d02e98a0/PSwwwiCqAD_BNeni/assets/guides/features/broadcast/arize/broadcast-enable.png?fit=max&auto=format&n=PSwwwiCqAD_BNeni&q=85&s=a48ecd5df85b4e6f3982c8402671f631" alt="Enable Broadcast" width="2692" height="1296" data-path="assets/guides/features/broadcast/arize/broadcast-enable.png" />
</Frame>

## Step 3: Configure W\&B Weave

Click the edit icon next to **W\&B Weave** and enter:

* **Api Key**: Your W\&B API key
* **Entity**: Your W\&B username or team name
* **Project**: The project name where traces will be logged
* **Base Url** (optional): Default is `https://trace.wandb.ai`

<Frame>
  <img src="https://mintcdn.com/openrouter-d02e98a0/PSwwwiCqAD_BNeni/assets/guides/features/broadcast/weave/broadcast-weave-config.png?fit=max&auto=format&n=PSwwwiCqAD_BNeni&q=85&s=227008d3e015dd7d20c6078230a3a12a" alt="W&B Weave Configuration" width="1219" height="1109" data-path="assets/guides/features/broadcast/weave/broadcast-weave-config.png" />
</Frame>

## Step 4: Test and save

Click **Test Connection** to verify the setup. The configuration only saves if the test passes.

<Frame>
  <img src="https://mintcdn.com/openrouter-d02e98a0/PSwwwiCqAD_BNeni/assets/guides/features/broadcast/weave/broadcast-weave-configured.png?fit=max&auto=format&n=PSwwwiCqAD_BNeni&q=85&s=7682bbb7d3e5256aff3f3082c84be586" alt="W&B Weave Configured" width="1228" height="709" data-path="assets/guides/features/broadcast/weave/broadcast-weave-configured.png" />
</Frame>

## Step 5: Send a test trace

Make an API request through OpenRouter and view the trace in W\&B Weave.

<Frame>
  <img src="https://mintcdn.com/openrouter-d02e98a0/PSwwwiCqAD_BNeni/assets/guides/features/broadcast/weave/broadcast-weave-trace.png?fit=max&auto=format&n=PSwwwiCqAD_BNeni&q=85&s=95b0964189a2d422d6b2aadd731b6a16" alt="W&B Weave Trace" width="1108" height="1185" data-path="assets/guides/features/broadcast/weave/broadcast-weave-trace.png" />
</Frame>

## Custom Metadata

W\&B Weave supports custom attributes and structured inputs for organizing and analyzing your LLM calls.

### Supported Metadata Keys

| Key               | Weave Mapping                   | Description                                            |
| ----------------- | ------------------------------- | ------------------------------------------------------ |
| `trace_id`        | `openrouter_trace_id` attribute | Custom trace identifier stored in attributes           |
| `trace_name`      | `op_name`                       | Custom operation name displayed in the Weave call list |
| `generation_name` | `op_name`                       | Name for the LLM call                                  |

### Example

```json lines theme={null}
{
  "model": "openai/gpt-4o",
  "messages": [{ "role": "user", "content": "Write a poem about AI..." }],
  "user": "user_12345",
  "session_id": "session_abc",
  "trace": {
    "trace_name": "Creative Writing Agent",
    "prompt_template": "poem_v2",
    "experiment_name": "creative_benchmark",
    "dataset_version": "1.0.0"
  }
}
```

### Attributes and Inputs

Weave organizes trace data into:

* **Attributes**: Metadata about the call (user IDs, organization IDs, trace identifiers, custom metadata)
* **Inputs**: The actual request data including messages, model parameters (temperature, max\_tokens, etc.)
* **Summary**: Token usage, costs, and timing metrics

### Additional Context

* The `user` field maps to `user_id` in attributes
* The `session_id` field maps to `session_id` in attributes
* Custom metadata keys from `trace` are merged into the call's attributes
* Model parameters (temperature, max\_tokens, top\_p) are included in inputs for easy filtering

## Privacy Mode

When [Privacy Mode](/docs/guides/features/broadcast#privacy-mode) is enabled for this destination, prompt and completion content is excluded from traces. All other trace data — token usage, costs, timing, model information, and custom metadata — is still sent normally. See [Privacy Mode](/docs/guides/features/broadcast#privacy-mode) for details.
