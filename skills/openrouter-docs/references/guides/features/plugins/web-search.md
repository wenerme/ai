You can incorporate relevant web search results for *any* model on OpenRouter by activating and customizing the `web` plugin, or by appending `:online` to the model slug:

```json
{
  "model": "openai/gpt-5.2:online"
}
```

You can also append `:online` to `:free` model variants like so:

```json
{
  "model": "openai/gpt-oss-20b:free:online"
}
```

<Note>
  Using web search will incur extra costs, even with free models. See the [pricing section](#pricing) below for details.
</Note>

`:online` is a shortcut for using the `web` plugin, and is exactly equivalent to:

```json
{
  "model": "openrouter/auto",
  "plugins": [{ "id": "web" }]
}
```

The web search plugin is powered by native search for Anthropic, OpenAI, Perplexity, and xAI models.

<Note>
  For xAI models, the web search plugin enables both Web Search and X Search.
</Note>

For other models, the web search plugin is powered by [Exa](https://exa.ai). It uses their ["auto"](https://docs.exa.ai/reference/how-exa-search-works#combining-neural-and-keyword-the-best-of-both-worlds-through-exa-auto-search) method (a combination of keyword search and embeddings-based web search) to find the most relevant results and augment/ground your prompt.

## Parsing web search results

Web search results for all models (including native-only models like Perplexity and OpenAI Online) are available in the API and standardized by OpenRouter to follow the same annotation schema in the [OpenAI Chat Completion Message type](https://platform.openai.com/docs/api-reference/chat/object):

```json
{
  "message": {
    "role": "assistant",
    "content": "Here's the latest news I found: ...",
    "annotations": [
      {
        "type": "url_citation",
        "url_citation": {
          "url": "https://www.example.com/web-search-result",
          "title": "Title of the web search result",
          "content": "Content of the web search result", // Added by OpenRouter if available
          "start_index": 100, // The index of the first character of the URL citation in the message.
          "end_index": 200 // The index of the last character of the URL citation in the message.
        }
      }
    ]
  }
}
```

## Customizing the Web Plugin

The maximum results allowed by the web plugin and the prompt used to attach them to your message stream can be customized:

```json
{
  "model": "openai/gpt-5.2:online",
  "plugins": [
    {
      "id": "web",
      "engine": "exa", // Optional: "native", "exa", "firecrawl", "parallel", or undefined
      "max_results": 1, // Defaults to 5
      "search_prompt": "Some relevant web results:", // See default below
      "include_domains": ["example.com", "*.substack.com"], // Optional
      "exclude_domains": ["reddit.com"] // Optional
    }
  ]
}
```

By default, the web plugin uses the following search prompt, using the current date:

```
A web search was conducted on `date`. Incorporate the following web search results into your response.

IMPORTANT: Cite them using markdown links named using the domain of the source.
Example: [nytimes.com](https://nytimes.com/some-page).
```

## Domain Filtering

You can restrict which domains appear in web search results using `include_domains` and `exclude_domains`:

```json
{
  "model": "openai/gpt-5.2",
  "plugins": [
    {
      "id": "web",
      "include_domains": ["example.com", "*.substack.com"],
      "exclude_domains": ["reddit.com"]
    }
  ]
}
```

Both fields accept an array of domain strings. You can use wildcards (`*.substack.com`) and path filtering (`openai.com/blog`).

### Engine Compatibility

| Engine        | `include_domains` | `exclude_domains` | Notes                                           |
| ------------- | :---------------: | :---------------: | ----------------------------------------------- |
| **Exa**       |        Yes        |        Yes        | Both can be used simultaneously                 |
| **Parallel**  |        Yes        |        Yes        | Either can be used, they are mutually exclusive |
| **Native**    |       Varies      |       Varies      | See provider notes below                        |
| **Firecrawl** |         No        |         No        | Returns 400 if domain filters are set           |

### Native Provider Behavior

When using native search, domain filter support depends on the provider:

* **Anthropic**: Supports both `include_domains` and `exclude_domains`, but they are mutually exclusive — you cannot use both at once
* **OpenAI**: Supports `include_domains` only; `exclude_domains` is silently ignored
* **xAI**: Supports both, but they are mutually exclusive with a maximum of 5 domains each

## X Search Filters (xAI only)

When using xAI models with web search enabled,
OpenRouter automatically adds the `x_search` tool
alongside `web_search`. You can pass filter
parameters to control X/Twitter search results
using the top-level `x_search_filter` parameter:

```json
{
  "model": "x-ai/grok-4.1-fast",
  "messages": [
    {
      "role": "user",
      "content": "What are people saying about OpenRouter?"
    }
  ],
  "plugins": [{ "id": "web" }],
  "x_search_filter": {
    "allowed_x_handles": ["OpenRouterAI"],
    "from_date": "2025-01-01",
    "to_date": "2025-12-31"
  }
}
```

### Filter Parameters

| Parameter                    | Type      | Description                                                 |
| ---------------------------- | --------- | ----------------------------------------------------------- |
| `allowed_x_handles`          | string\[] | Only include posts from these handles (max 10)              |
| `excluded_x_handles`         | string\[] | Exclude posts from these handles (max 10)                   |
| `from_date`                  | string    | Start date for search range (ISO 8601, e.g. `"2025-01-01"`) |
| `to_date`                    | string    | End date for search range (ISO 8601, e.g. `"2025-12-31"`)   |
| `enable_image_understanding` | boolean   | Enable analysis of images within posts                      |
| `enable_video_understanding` | boolean   | Enable analysis of videos within posts                      |

<Warning>
  `allowed_x_handles` and `excluded_x_handles` are
  mutually exclusive — you cannot use both in the
  same request. If validation fails, the filter is
  silently dropped and a basic `x_search` tool is
  used instead.
</Warning>

## Engine Selection

The web search plugin supports the following options for the `engine` parameter:

* **`native`**: Always uses the model provider's built-in web search capabilities
* **`exa`**: Uses Exa's search API for web results
* **`firecrawl`**: Uses [Firecrawl](https://firecrawl.dev)'s search API
* **`parallel`**: Uses [Parallel](https://parallel.ai)'s search API for web results
* **`undefined` (not specified)**: Uses native search if available for the provider, otherwise falls back to Exa

### Default Behavior

When the `engine` parameter is not specified:

* **Native search is used by default** for OpenAI, Anthropic, Perplexity, and xAI models that support it
* **Exa search is used** for all other models or when native search is not supported

When you explicitly specify `"engine": "native"`, it will always attempt to use the provider's native search, even if the model doesn't support it (which may result in an error).

### Forcing Engine Selection

You can explicitly specify which engine to use:

```json
{
  "model": "openai/gpt-5.2",
  "plugins": [
    {
      "id": "web",
      "engine": "native"
    }
  ]
}
```

Or force Exa search even for models that support native search:

```json
{
  "model": "openai/gpt-5.2",
  "plugins": [
    {
      "id": "web",
      "engine": "exa",
      "max_results": 3
    }
  ]
}
```

### Firecrawl

Firecrawl is a BYOK (bring your own key) search engine. To use it:

1. Go to your [OpenRouter plugin settings](https://openrouter.ai/settings/plugins) and select Firecrawl as the web search engine
2. Accept the [Firecrawl Terms of Service](https://www.firecrawl.dev/terms-of-service) — this automatically creates a Firecrawl account linked to your email
3. Your account starts with a **free hobby plan and 100,000 credits**

Once set up, Firecrawl searches use your Firecrawl credits directly — there is no additional charge from OpenRouter.

```json
{
  "model": "openai/gpt-5.2",
  "plugins": [
    {
      "id": "web",
      "engine": "firecrawl",
      "max_results": 5
    }
  ]
}
```

<Note>
  Firecrawl does not support domain filters (`include_domains` / `exclude_domains`). If you need domain filtering, use `exa` or `parallel` instead.
</Note>

### Parallel

[Parallel](https://parallel.ai) is a search engine that supports domain filtering and uses OpenRouter credits at the same rate as Exa (\$4 per 1000 results).

```json
{
  "model": "openai/gpt-5.2",
  "plugins": [
    {
      "id": "web",
      "engine": "parallel",
      "max_results": 5,
      "include_domains": ["arxiv.org"]
    }
  ]
}
```

### Engine-Specific Pricing

* **Native search**: Pricing is passed through directly from the provider (see provider-specific pricing info below)
* **Exa search**: Uses OpenRouter credits at \$4 per 1000 results (default 5 results = \$0.02 per request)
* **Parallel search**: Uses OpenRouter credits at \$4 per 1000 results (same as Exa)
* **Firecrawl search**: Uses your Firecrawl credits directly, refill at [Firecrawl.dev](https://www.firecrawl.dev)

## Pricing

### Exa Search Pricing

When using Exa search (either explicitly via `"engine": "exa"` or as fallback), the web plugin uses your OpenRouter credits and charges *\$4 per 1000 results*. By default, `max_results` set to 5, this comes out to a maximum of \$0.02 per request, in addition to the LLM usage for the search result prompt tokens.

### Native Search Pricing (Provider Passthrough)

Some models have built-in web search. These models charge a fee based on the search context size, which determines how much search data is retrieved and processed for a query.

### Search Context Size Thresholds

Search context can be 'low', 'medium', or 'high' and determines how much search context is retrieved for a query:

* **Low**: Minimal search context, suitable for basic queries
* **Medium**: Moderate search context, good for general queries
* **High**: Extensive search context, ideal for detailed research

### Specifying Search Context Size

You can specify the search context size in your API request using the `web_search_options` parameter:

```json
{
  "model": "openai/gpt-4.1",
  "messages": [
    {
      "role": "user",
      "content": "What are the latest developments in quantum computing?"
    }
  ],
  "web_search_options": {
    "search_context_size": "high"
  }
}
```

<Note title="Native Web Search Pricing">
  Refer to each provider's documentation for their native web search pricing info:

  * [OpenAI Pricing](https://platform.openai.com/docs/pricing#built-in-tools)
  * [Anthropic Pricing](https://docs.claude.com/en/docs/agents-and-tools/tool-use/web-search-tool#usage-and-pricing)
  * [Perplexity Pricing](https://docs.perplexity.ai/getting-started/pricing)
  * [xAI Pricing](https://docs.x.ai/docs/models#tool-invocation-costs)

  Native web search pricing only applies when using `"engine": "native"` or when native search is used by default for supported models. When using `"engine": "exa"`, the Exa search pricing applies instead.
</Note>
