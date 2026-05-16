> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Fusion

Server tools are currently in beta. The API and behavior may change.

The `openrouter:fusion` server tool exposes the [Fusion pipeline](/docs/guides/features/plugins/fusion) as a callable tool. When the calling model decides a prompt needs particular thoughtfulness — research, expert critique, or multiple perspectives — it can invoke `openrouter:fusion`, receive structured analysis JSON from a panel of expert models, and use it to write the final answer.

The tool is a strict superset of the [`fusion` plugin](/docs/guides/features/plugins/fusion): the plugin is sugar that automatically attaches this tool to a request.

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

## When the model invokes the tool

The tool description tells the calling model to only invoke it when the task genuinely needs deliberation. Short tactical prompts will not trigger fusion. Long-form research, multi-domain critique, "compare and contrast" prompts, or anything where being wrong is expensive are common triggers.

If you want to force fusion on every request, use the [`openrouter/fusion` model alias](/docs/guides/models/router-models) or set `tool_choice` to require the tool.

## Parameters

The tool accepts an optional `parameters` object on the tool entry:

```json
{
  "tools": [
    {
      "type": "openrouter:fusion",
      "parameters": {
        "analysis_models": [
          "~google/gemini-flash-latest",
          "deepseek/deepseek-v3.2-20251201",
          "~moonshotai/kimi-latest"
        ],
        "model": "~anthropic/claude-opus-latest"
      }
    }
  ]
}
```

| Field             | Default                                                                | Description                                                                                                                                                             |
| ----------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `analysis_models` | Quality preset (`~anthropic/claude-opus-latest`, `~openai/gpt-latest`) | Slugs to run in parallel as the analysis panel. Each call has `openrouter:web_search` and `openrouter:web_fetch` enabled.                                               |
| `model`           | The outer request's `model`                                            | Slug of the judge model that produces the structured analysis JSON. Defaults to the same model that is invoking the tool — so the tool acts as a "second opinion" loop. |

## Tool result schema

The tool returns JSON with the following shape:

```json
{
  "status": "ok",
  "analysis": {
    "consensus": ["..."],
    "contradictions": [
      { "topic": "...", "stances": [{ "model": "...", "stance": "..." }] }
    ],
    "partial_coverage": [
      { "models": ["..."], "point": "..." }
    ],
    "unique_insights": [
      { "model": "...", "insight": "..." }
    ],
    "blind_spots": ["..."]
  },
  "responses": [
    { "model": "...", "content": "..." }
  ]
}
```

When something fails (e.g. all analysis models error), the tool returns `{ "status": "error", "error": "..." }` and the calling model can fall back to writing the answer without the analysis.

## Web search and fetch

`openrouter:web_search` and `openrouter:web_fetch` are enabled on the **analysis** and **judge** calls — never on the outer synthesis. By the time the calling model writes the final answer it already has fresh, structured analysis to ground its response.

## Recursion protection

Inner fusion calls carry an `x-openrouter-fusion-depth` header. Analysis or judge models cannot recursively invoke `openrouter:fusion` or `openrouter/fusion` — the plugin refuses to inject the tool a second time so the deliberation stays bounded.

## Related

* [Fusion plugin](/docs/guides/features/plugins/fusion)
* [Web Search server tool](/docs/guides/features/server-tools/web-search)
* [Web Fetch server tool](/docs/guides/features/server-tools/web-fetch)
* [`/labs/fusion`](/labs/fusion) — interactive playground for the same pipeline