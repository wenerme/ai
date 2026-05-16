> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Fusion

Fusion turns any OpenRouter request into a small multi-model deliberation: a configurable panel of expert models analyzes the prompt in parallel with web search and web fetch enabled, then a judge model produces a structured analysis (consensus, contradictions, partial coverage, unique insights, blind spots). The calling model uses that analysis to write the final answer.

The Fusion plugin is the configuration surface for this pipeline. It's a thin sugar layer on top of the [`openrouter:fusion` server tool](/docs/guides/features/server-tools/fusion) and the [`openrouter/fusion` model alias](/docs/guides/models/router-models). Pick whichever entry point fits your workflow.

## When to use Fusion

Reach for Fusion when a single model isn't enough — research, expert critique, or tasks that benefit from multiple perspectives. Fusion is overkill for short tactical prompts; use it when the cost of being wrong is higher than the cost of a few extra completions.

## How it works

```mermaid
flowchart LR
  request[Your request<br />model=fusion-model<br />plugins=[fusion]] --> outer[Judge / fusion model]
  outer -- decides to invoke --> tool[openrouter:fusion]
  tool --> panel[Analysis panel<br />~anthropic/claude-opus-latest<br />~openai/gpt-latest]
  panel --> judge[Judge model<br />web_search + web_fetch]
  judge -- structured analysis --> outer
  outer --> answer[Final answer]
```

1. The plugin injects the `openrouter:fusion` server tool into your request and (if you sent `model: "openrouter/fusion"`) swaps the alias for the configured judge / fusion model.
2. The judge model runs your prompt and decides whether to invoke the fusion tool.
3. When invoked, the tool dispatches your prompt to every analysis model in parallel with `openrouter:web_search` and `openrouter:web_fetch` enabled.
4. The same judge model then receives a synthesis prompt with every panel response and returns structured analysis JSON.
5. The outer judge model receives that analysis and writes the final user-facing answer.

The final synthesis call is **not** given web tools — by that point all the freshness lives in the panel responses, and turning off web tools keeps the answer grounded in the deliberation.

## Configuration

```json
{
  "model": "openrouter/fusion",
  "plugins": [
    {
      "id": "fusion",
      "analysis_models": [
        "~anthropic/claude-opus-latest",
        "~openai/gpt-latest"
      ],
      "model": "~anthropic/claude-opus-latest"
    }
  ]
}
```

| Field             | Default                                                                | Description                                                                                                                                                   |
| ----------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `analysis_models` | Quality preset (`~anthropic/claude-opus-latest`, `~openai/gpt-latest`) | Slugs of the parallel analysis panel. Each receives the prompt with web search + web fetch.                                                                   |
| `model`           | First analysis model                                                   | Slug of the judge / fusion model used to summarize the panel and write the final answer. Only applied when the request uses `openrouter/fusion` as the model. |
| `enabled`         | `true`                                                                 | Set to `false` to bypass the plugin for a single request.                                                                                                     |

When you pass `model: "openrouter/fusion"` without a plugin config, the defaults are equivalent to the **Quality** preset on the [Fusion lab](/labs/fusion).

## Two entry points, one pipeline

`openrouter/fusion` is exactly equivalent to enabling the `openrouter:fusion` server tool on the configured judge model. The model below behaves identically:

```json title="Model alias"
{
  "model": "openrouter/fusion",
  "messages": [
    { "role": "user", "content": "What are the strongest arguments for and against carbon taxes?" }
  ]
}
```

```json title="Server tool"
{
  "model": "~anthropic/claude-opus-latest",
  "messages": [
    { "role": "user", "content": "What are the strongest arguments for and against carbon taxes?" }
  ],
  "tools": [
    { "type": "openrouter:fusion" }
  ]
}
```

The model decides when to call `openrouter:fusion`. For tasks that don't need deliberation, it can answer directly — including invoking any other tools you've defined.

## Complete example

```typescript title="TypeScript"
const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer {{API_KEY_REF}}',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'openrouter/fusion',
    messages: [
      {
        role: 'user',
        content: 'Compare ridge, lasso, and elastic-net regression. Where does each shine?',
      },
    ],
    plugins: [
      {
        id: 'fusion',
        analysis_models: [
          '~anthropic/claude-opus-latest',
          '~openai/gpt-latest',
        ],
      },
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
    "model": "openrouter/fusion",
    "messages": [
      {
        "role": "user",
        "content": "Compare ridge, lasso, and elastic-net regression. Where does each shine?",
      },
    ],
    "plugins": [
      {
        "id": "fusion",
        "analysis_models": [
          "~anthropic/claude-opus-latest",
          "~openai/gpt-latest",
        ],
      },
    ],
  },
)
print(response.json()["choices"][0]["message"]["content"])
```

## Recursion protection

Fusion attaches an `x-openrouter-fusion-depth` header to every inner call (analysis + judge). If an analysis model tries to recursively invoke `openrouter:fusion` or `openrouter/fusion`, the plugin refuses to inject the tool a second time and the call returns an error rather than fanning out unbounded extra inference.

## Related

* [`openrouter:fusion` server tool](/docs/guides/features/server-tools/fusion)
* [Web Search server tool](/docs/guides/features/server-tools/web-search)
* [Web Fetch server tool](/docs/guides/features/server-tools/web-fetch)
* [`/labs/fusion`](/labs/fusion) — interactive playground for the same pipeline