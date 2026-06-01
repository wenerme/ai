> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Fusion

Server tools are currently in beta. The API and behavior may change.

The `openrouter:fusion` server tool gives any model access to multi-model deliberation. When your model decides a prompt benefits from multiple perspectives, it invokes this tool — a panel of models answers in parallel, a judge compares their responses, and the structured analysis comes back to your model for the final answer.

This is the same pipeline behind the [`openrouter/fusion` model alias](/docs/guides/routing/routers/fusion-router) and the [`fusion` plugin](/docs/guides/features/plugins/fusion). Using the server tool directly gives you the most control: choose your own outer model, combine it with other tools, and configure the panel and judge independently.

## Quick start

```typescript title="TypeScript"
const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer {{API_KEY_REF}}',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: '{{MODEL}}',
    messages: [
      {
        role: 'user',
        content: 'Survey the strongest arguments for and against a carbon tax. Where do experts disagree?',
      },
    ],
    tools: [
      { type: 'openrouter:fusion' },
    ],
  }),
});

const data = await response.json();
console.log(data.choices[0].message.content);
```

```python title="Python"
import requests

response = requests.post(
  "https://openrouter.ai/api/v1/chat/completions",
  headers={
    "Authorization": f"Bearer {{API_KEY_REF}}",
    "Content-Type": "application/json",
  },
  json={
    "model": "{{MODEL}}",
    "messages": [
      {
        "role": "user",
        "content": "Survey the strongest arguments for and against a carbon tax. Where do experts disagree?",
      },
    ],
    "tools": [
      {"type": "openrouter:fusion"},
    ],
  },
)
print(response.json()["choices"][0]["message"]["content"])
```

## When does the model invoke it?

The tool's description tells the model to call `openrouter:fusion` only when a task genuinely benefits from multiple perspectives — research questions, multi-domain critique, "compare and contrast" prompts, or anything where being wrong is expensive. Simple tactical prompts won't trigger it.

To **force** fusion on every request, set `tool_choice: "required"`. See [Forcing fusion on every request](/docs/guides/routing/routers/fusion-router#forcing-fusion-on-every-request).

## Parameters

Pass an optional `parameters` object on the tool entry to override defaults:

```json
{
  "tools": [
    {
      "type": "openrouter:fusion",
      "parameters": {
        "analysis_models": [
          "~google/gemini-flash-latest",
          "deepseek/deepseek-v3.2",
          "~moonshotai/kimi-latest"
        ],
        "model": "~anthropic/claude-opus-latest"
      }
    }
  ]
}
```

| Field                   | Default                                                                                             | Description                                                                                                                                                             |
| ----------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `analysis_models`       | Quality preset (`~anthropic/claude-opus-latest`, `~openai/gpt-latest`, `~google/gemini-pro-latest`) | Models that form the panel. Each runs in parallel with `openrouter:web_search` and `openrouter:web_fetch` enabled. 1–8 models allowed.                                  |
| `model`                 | Your outer model                                                                                    | The judge that produces the structured analysis JSON. Defaults to the same model handling your request.                                                                 |
| `max_tool_calls`        | `8`                                                                                                 | Max tool-calling steps each panel model and the judge may take in their `openrouter:web_search` / `openrouter:web_fetch` loop before they must return text. Range 1–16. |
| `max_completion_tokens` | Provider default                                                                                    | Max output tokens (including reasoning) per inner panel/judge call. Keeps reasoning-heavy models from exhausting their budget before producing visible text.            |
| `reasoning`             | Provider default                                                                                    | Reasoning config forwarded to the panel and judge calls — an object with optional `effort` and `max_tokens`.                                                            |
| `temperature`           | Provider default                                                                                    | Sampling temperature (`0`–`2`) forwarded to the panel and judge calls.                                                                                                  |

## What the tool returns

On success, the tool result contains the structured analysis and the raw panel responses:

```json
{
  "status": "ok",
  "analysis": {
    "consensus": ["Points all or most panel models agreed on"],
    "contradictions": [
      { "topic": "...", "stances": [{ "model": "...", "stance": "..." }] }
    ],
    "partial_coverage": [
      { "models": ["..."], "point": "Only some models covered this" }
    ],
    "unique_insights": [
      { "model": "...", "insight": "Something only one model raised" }
    ],
    "blind_spots": ["Topics no panel model addressed"]
  },
  "responses": [
    { "model": "anthropic/claude-opus-4.5", "content": "..." },
    { "model": "openai/gpt-4.1", "content": "..." },
    { "model": "google/gemini-2.5-pro", "content": "..." }
  ]
}
```

When some panel models error but at least one succeeds, the result still has `status: "ok"` and adds a `failed_models` array describing which ones failed and why.

### Judge degradation

If the **panel** succeeds but the **judge** fails — an upstream error, an empty completion, or output that isn't valid analysis JSON — the tool does **not** error. It returns `status: "ok"` with the raw panel `responses` and simply **omits** `analysis`. Your model can still write the final answer from the panel responses:

```json
{
  "status": "ok",
  "responses": [
    { "model": "anthropic/claude-opus-4.5", "content": "..." }
  ]
}
```

### Hard failures

The tool only returns `status: "error"` when it can't produce any useful output. In that case it includes a typed `failure_reason`:

```json
{
  "status": "error",
  "error": "all panel models failed",
  "failure_reason": "all_panels_failed"
}
```

| Reason                     | Meaning                                                                         |
| -------------------------- | ------------------------------------------------------------------------------- |
| `all_panels_failed`        | Every panel model returned an error.                                            |
| `insufficient_credits`     | Every panel model failed and at least one was due to insufficient credits.      |
| `rate_limited`             | Every panel model failed and at least one was rate-limited.                     |
| `fusion_invocation_capped` | Fusion was already invoked earlier in the same turn; a second call is rejected. |
| `unexpected_error`         | An unexpected error interrupted the fusion run.                                 |

The calling model can fall back to answering without the analysis whenever fusion fails or degrades.

## Web tools

`openrouter:web_search` and `openrouter:web_fetch` are enabled on both the **panel** and the **judge** calls, so models can pull fresh sources while they answer and analyze. The judge compares the panel responses rather than merging them: it treats what all or most models agree on as higher-confidence consensus, surfaces contradictions, preserves unique insights from individual models, and flags blind spots none of them addressed. The outer model writes the final answer from that analysis — so the result isn't a simple majority vote.

## Recursion protection

Inner fusion calls carry an `x-openrouter-fusion-depth` header. Panel and judge models cannot recursively invoke `openrouter:fusion` — the plugin refuses to inject the tool a second time, keeping deliberation bounded to a single level.

## Related

* [Fusion Router (`openrouter/fusion`)](/docs/guides/routing/routers/fusion-router)
* [Fusion plugin](/docs/guides/features/plugins/fusion)
* [Web Search server tool](/docs/guides/features/server-tools/web-search)
* [Web Fetch server tool](/docs/guides/features/server-tools/web-fetch)
* [`/labs/fusion`](/labs/fusion) — interactive playground