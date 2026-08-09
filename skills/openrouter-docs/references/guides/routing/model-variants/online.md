> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Online Variant

> Real-time web search with :online

<Warning>
  **Deprecated**

  The `:online` variant is deprecated. Use the [`openrouter:web_search` server tool](/docs/guides/features/server-tools/web-search) instead, which gives the model control over when and how often to search.

  If your application already provides the `web_search` tool (e.g. OpenAI's built-in web search tool type), OpenRouter automatically recognizes it and hoists it to the `openrouter:web_search` server tool. This means you can safely remove the `:online` suffix from any model slug. As long as your application exposes the `web_search` tool, web search still works as a server tool with any model on OpenRouter.
</Warning>

The `:online` variant enables real-time web search capabilities for any model on OpenRouter.

## Usage

Append `:online` to any model ID:

```json lines theme={null}
{
  "model": "openai/gpt-5.2:online"
}
```

This is a shortcut for using the `web` plugin, and is exactly equivalent to:

```json lines theme={null}
{
  "model": "openrouter/auto",
  "plugins": [{ "id": "web" }]
}
```

## Details

The Online variant incorporates relevant web search results into model responses, providing access to real-time information and current events. This is particularly useful for queries that require up-to-date information beyond the model's training data.

For the recommended approach, see [Web Search Server Tool](/docs/guides/features/server-tools/web-search). For legacy plugin details, see [Web Search Plugin](/docs/guides/features/plugins/web-search).
