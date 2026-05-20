> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# PostHog

[PostHog](https://posthog.com) is an open-source product analytics platform that helps you understand user behavior. With PostHog's LLM analytics, you can track and analyze your AI application usage.

## Step 1: Get your PostHog project API key

In PostHog, navigate to your project settings:

1. Log in to your PostHog account
2. Go to **Project Settings**
3. Copy your Project API Key (starts with `phc_...`)

## Step 2: Enable Broadcast in OpenRouter

Go to [Settings > Observability](https://openrouter.ai/settings/observability) and toggle **Enable Broadcast**.

![Enable Broadcast](file:32dead6f-003d-492a-b50b-e3dd1fdd3a37)

## Step 3: Configure PostHog

Click the edit icon next to **PostHog** and enter:

* **Api Key**: Your PostHog project API key (starts with `phc_...`)
* **Endpoint** (optional): Default is `https://us.i.posthog.com`. For EU region, use `https://eu.i.posthog.com`

## Step 4: Test and save

Click **Test Connection** to verify the setup. The configuration only saves if the test passes.

## Step 5: Send a test trace

Make an API request through OpenRouter and view the LLM analytics in your
PostHog dashboard.

![PostHog LLM Analytics](file:ab47c0a2-a63b-4be6-b0f0-913d45d99c14)

## Custom Metadata

PostHog receives LLM analytics events with custom metadata included as event properties. Use the `trace` field to attach additional context to your analytics data.

### Supported Metadata Keys

| Key               | PostHog Mapping | Description                                         |
| ----------------- | --------------- | --------------------------------------------------- |
| `trace_id`        | Event property  | Custom trace identifier for grouping related events |
| `trace_name`      | Event property  | Custom name for the trace                           |
| `generation_name` | Event property  | Name for the LLM generation event                   |

### Example

```json
{
  "model": "openai/gpt-4o",
  "messages": [{ "role": "user", "content": "Recommend a product..." }],
  "user": "user_12345",
  "session_id": "session_abc",
  "trace": {
    "trace_name": "Product Recommendations",
    "generation_name": "Generate Recommendation",
    "feature": "shopping-assistant",
    "ab_test_group": "variant_b"
  }
}
```

### Additional Context

* The `user` field maps to PostHog's `$ai_user` property for user-level LLM analytics
* The `session_id` field maps to `$ai_session_id` for session grouping
* Custom metadata keys from `trace` are included as properties on the LLM analytics event
* PostHog's LLM analytics dashboard automatically tracks token usage, costs, and model performance

## Privacy Mode

When [Privacy Mode](/docs/guides/features/broadcast#privacy-mode) is enabled for this destination, the `$ai_input` and `$ai_output_choices` properties are excluded from events. All other analytics data — token usage, costs, model information, and custom metadata — is still sent normally.