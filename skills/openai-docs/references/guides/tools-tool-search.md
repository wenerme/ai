# Tool search

import {
  hostedToolSearchExample,
  hostedToolSearchResponse,
  clientToolSearchExample,
  clientToolSearchFirstResponse,
  clientToolSearchFollowUp,
  clientToolSearchLoadedFunctionCall,
} from "./tool-search-examples";

Tool search allows the model to dynamically search for and load tools into the model's context as needed. This allows you to avoid loading all tool definitions into the model's context up front and **may help reduce overall token usage and cost**. For optimal cost and latency, tool search is designed to **preserve the model’s cache**. When new tools are discovered by the model, they are injected at the end of the context window.

Only `gpt-5.4` and later models support `tool_search`.

To activate tool search, you must do two things:

1. Add `tool_search` as a tool in your `tools` array.
2. If you are using [functions](https://developers.openai.com/api/docs/guides/function-calling#defining-functions), mark the ones you want to defer with `defer_loading: true`. If you are using [MCP servers](https://developers.openai.com/api/docs/guides/tools-connectors-mcp), set `defer_loading: true` on the MCP server tool definition.

### Use namespaces where possible

You can use tool search with deferred [functions](https://developers.openai.com/api/docs/guides/function-calling#defining-functions), [namespaces](https://developers.openai.com/api/docs/guides/function-calling#defining-namespaces), or [MCP servers](https://developers.openai.com/api/docs/guides/tools-connectors-mcp), but we recommend using namespaces or MCP servers when possible. Our models have primarily been trained to search those surfaces, and token savings are usually more material there.

For namespaces, `defer_loading` applies to the functions inside the namespace, not to the namespace object itself.

At the start of a request, the model still sees the name and description of whatever is searchable. For a namespace or MCP server, that means the model sees only the namespace or server name and description at the beginning, without showing details of the individual functions contained within it until the tool search tool loads them. For an individual deferred function, the model still sees the function name and description, so in practice tool search is mostly deferring the parameter schema.

For maximum token savings, we recommend grouping deferred functions into namespaces or MCP servers with clear, high-level descriptions that give the model a strong overview of what is contained within them, so it can effectively search and load only the relevant functions. As a best practice, aim to keep each namespace to fewer than 10 functions for better token efficiency and model performance.

Namespaces can have a mix of tools that are deferred and not deferred. Tools without `defer_loading: true` are callable immediately, while deferred tools in the same namespace are loaded through tool search.

### Tool search types

There are two ways to use tool search:

- **Hosted tool search:** OpenAI searches across the deferred tools you declared in the request and returns the loaded subset in the same response.
- **Client-executed tool search:** The model emits a `tool_search_call`, your application performs the lookup, and you return a matching `tool_search_output`.

Start with hosted tool search if the candidate tools are already known when
  you create the request. Use client-executed tool search when tool discovery
  depends on project state, tenant state, or another system your application
  controls.

## Hosted tool search

Hosted tool search is the simplest path when you already know the full inventory of [functions](https://developers.openai.com/api/docs/guides/function-calling#defining-functions), [namespaces](https://developers.openai.com/api/docs/guides/function-calling#defining-namespaces), or [MCP servers](https://developers.openai.com/api/docs/guides/tools-connectors-mcp) you want the model to search. You declare them up front, add `{"type": "tool_search"}`, and let the API decide what to load.

If the model decides it needs a deferred tool, the response includes two additional output items before the eventual function call:

- `tool_search_call`, which records the hosted search step.
- `tool_search_output`, which contains the loaded subset that becomes callable.

In hosted mode, `execution` is set to `server` and `call_id` is set to `null`.

For more complex tasks, the model can also load multiple namespaces or MCP servers in the same `tool_search_call`. For example, if it needs functions from different namespaces to complete one task, it may choose to search and load those surfaces together before making the subsequent function calls.

## Client-executed tool search

Client-executed tool search gives your application full control over how tool discovery works. This is useful when the available tools depend on information that is not practical to declare in the initial `tools` list.

Configure the `tool_search` tool with `execution: "client"` and a schema for the search arguments your application expects:

On the first turn, the model emits a `tool_search_call` and stops there:

Your application then performs the search and returns a `tool_search_output` with the tools it wants to load:

On the next turn, the loaded tool is callable like a normal function:

In client mode, `execution` is set to `client` and `call_id` is defined. Echo the same `call_id` from the `tool_search_call` in your `tool_search_output`.

## Advanced usage

### Keep namespace descriptions clear

Make namespace descriptions clear and descriptive of the use case, because the model relies on this description to decide when to load a subset of functions in that namespace. Avoid overly long descriptions. Instead, put richer detail in the deferred function descriptions that are loaded only when needed.

### Understand what gets loaded

`tool_search_output.tools` contains the list of tools that were dynamically loaded by the model. The model will be able to call any of these tools in future turns, so in client mode you do not need to load the same tool again across turns. Tools that were not listed as part of this array will not be available to the model. If you want to disable a loaded tool, you can remove it from the `tool_search_output` item where you define the loaded tool set, but note that changing the loaded tool set will break the model's cache from that point forward.

### Advanced injection patterns

Most integrations declare tools in the request's `tools` parameter. Client-executed tool search also supports more advanced patterns where your application returns tools that were not present in the original request. Treat this as an advanced workflow: validate the returned schemas carefully and only expose trusted tool definitions.

### Tool search and caching

All tools are loaded at the end of the model's context window. This holds true for both hosted tool search and client-executed tool search. This allows the model's cache to be preserved from one request to another, lowering overall costs and boosting speed.

## Related guides

- Use [function calling](https://developers.openai.com/api/docs/guides/function-calling) to define callable functions and custom tools.
- Use [Using tools](https://developers.openai.com/api/docs/guides/tools) for the broader tool landscape across Responses.