> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Tool Search

> Let the model discover tools on demand instead of loading every definition up front

export const Template = ({children, data}) => {
  const replace = s => s.replace(/\{\{(\w+)\}\}/g, (_, k) => (k in data) ? data[k] : `{{${k}}}`);
  const leafText = node => typeof node === 'string' ? node : node?.$$typeof && typeof node.props?.children === 'string' ? node.props.children : null;
  const collapseTokens = nodes => {
    const out = [];
    let i = 0;
    while (i < nodes.length) {
      const ta = leafText(nodes[i]);
      const tb = leafText(nodes[i + 1]);
      const tc = leafText(nodes[i + 2]);
      if (ta != null && tb != null && tc != null) {
        const m = (ta + tb + tc).match(/^([\s\S]*)\{\{(\w+)\}\}([\s\S]*)$/);
        if (m && (m[2] in data)) {
          out.push(m[1] + data[m[2]] + m[3]);
          i += 3;
          continue;
        }
      }
      out.push(nodes[i]);
      i++;
    }
    return out;
  };
  const process = node => {
    if (typeof node === 'string') return replace(node);
    if (Array.isArray(node)) return collapseTokens(node.map(process));
    if (node && typeof node === 'object') {
      if (node.$$typeof) return {
        ...node,
        props: process(node.props)
      };
      return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, process(v)]));
    }
    return node;
  };
  return <>{process(children)}</>;
};

export const API_KEY_REF = '<OPENROUTER_API_KEY>';

<Badge color="blue">Beta</Badge>

<Note>
  **Beta**

  Server tools are currently in beta. The API and behavior may change.
</Note>

The `openrouter:tool_search` server tool lets a model work with a large tool library without paying for it on every request. You mark the tools that should stay hidden with `defer_loading`, and the model searches for what it needs when it needs it.

This matters at scale for two reasons. Tool definitions are charged as input tokens on every turn, so a large library is a fixed cost on every request whether or not the model uses any of it. Tool selection accuracy also degrades as the list grows — a model choosing between several hundred similar tools picks wrong more often than one choosing between five.

Tool search works on any model and any provider, not only those with native support for it.

## Quick Start

Include the tool alongside your own, and mark the ones to withhold:

```json title="Request" expandable theme={null}
{
  "model": "openai/gpt-5.2",
  "messages": [{ "role": "user", "content": "What's the weather in Tokyo?" }],
  "tools": [
    { "type": "openrouter:tool_search" },
    {
      "type": "function",
      "name": "get_weather",
      "description": "Get the current weather for a city.",
      "parameters": {
        "type": "object",
        "properties": { "city": { "type": "string" } },
        "required": ["city"]
      },
      "defer_loading": true
    }
  ]
}
```

The model searches for `weather`, finds `get_weather`, and calls it on the next turn. You handle that call exactly as you would any other function tool call — deferral changes when a tool becomes available, not how it works once it does.

## Marking Tools as Deferred

Add `defer_loading: true` to any tool you want withheld. Deferred tools are hidden by default: the model cannot see or call one until a search returns it.

One rule applies, and breaking it fails the request with a `400` rather than quietly ignoring the deferral:

* **`openrouter:tool_search` itself can never be deferred.** It is what reveals the rest of the library, so deferring it would leave nothing able to load anything. This also guarantees at least one tool is always callable.

Using `defer_loading` *without* `openrouter:tool_search` remains valid and is unchanged: those requests route to a provider whose gateway expands deferred tools itself, and your own search tool is an ordinary function tool that provider recognizes. This provider-managed path is only available on Anthropic models and Anthropic-compatible endpoints that implement deferral; other models return a `400`. With `openrouter:tool_search` in the request, deferral is managed by OpenRouter and works on any model and any provider.

Keep your three to five most frequently used tools loaded. A tool the model needs on almost every request costs more in search round-trips than it saves in tokens.

## Searching

The model supplies a regular expression, matched case-insensitively against each deferred tool's name, description, argument names, and argument descriptions. A pattern of `weather` finds a tool whose only mention of weather is in a parameter description.

Patterns are capped at 200 characters. A malformed pattern, or one that would take pathologically long to evaluate, returns an error result to the model rather than failing the request — the model can simply search again with a simpler pattern.

Writing tool descriptions in the words your users actually use makes them far easier to find. Consistent name prefixes help too: naming tools `github_issues_list` and `github_pulls_list` lets one search reach the whole group.

## Controlling Tool Choice

Tool search uses `tool_choice` to express which tools the model may call on each turn, widening it as tools are discovered. OpenRouter sets this up for you.

If your request omits `tool_choice`, or sets it to the default `"auto"`, nothing is required of you.

If you set anything else, it must be `{"type": "allowed_tools", ...}` naming the tools that should be callable immediately. Deferred tools are added to that set as the model finds them.

Any other `tool_choice` conflicts with deferral — forcing a specific tool, requiring a call, or forbidding calls entirely all contradict "reveal these tools gradually." Rather than silently overriding what you asked for, the request fails with a `400`:

> `tool_choice` conflicts with `openrouter:tool_search`. Deferred tools are revealed through `tool_choice`, so it must be omitted or set to `{"type": "allowed_tools", ...}`. Remove `tool_choice`, or drop `defer_loading` from your tools to use it as-is.

The alternative would be worse in both directions: honoring `tool_choice` would silently disable deferral, and overriding it would silently ignore an explicit instruction. Neither is something you would want to discover from a bill or a wrong answer.

## Prompt Caching

Discovering a tool does not disturb the tools already in the conversation, so prompt caching is preserved across a search. You can start a conversation with a small loaded set, let the model discover more as it goes, and keep your cache hit across every turn.

## Supported APIs

Tool search is available through the [Responses API](/docs/api_reference/responses/overview) and the [Messages API](/docs/api/api-reference/anthropic-messages/create-a-message). Requesting it on the Chat Completions API returns a `400` error.

Each API's native spelling is accepted as an alias and answered in kind, so an existing integration does not need rewriting:

| API       | Accepted `type`                                                                       |
| --------- | ------------------------------------------------------------------------------------- |
| Responses | `openrouter:tool_search`, `tool_search`                                               |
| Messages  | `openrouter:tool_search`, `tool_search_tool_regex`, `tool_search_tool_regex_20251119` |

Only the regex variant is implemented. Requesting the BM25 variant — `tool_search_tool_bm25` or `tool_search_tool_bm25_20251119` — returns a `400`:

> `tool_search_tool_bm25_20251119` is not supported yet. OpenRouter implements the regex tool-search variant only — use `openrouter:tool_search` (or `tool_search_tool_regex_20251119`) instead.

## Configuration

| Parameter     | Default | Description                                                                           |
| ------------- | ------- | ------------------------------------------------------------------------------------- |
| `max_results` | `5`     | Maximum tools returned by a single search. The model may request fewer. Capped at 50. |

## When to Use It

Reach for tool search when your definitions exceed roughly 10k tokens, when you have more than about 10 tools, or when tool selection accuracy drops as the library grows.

Standard tool calling is the better fit below about 10 tools, when every tool is used on every request, or when your definitions are small enough that the search round-trip costs more than it saves.
