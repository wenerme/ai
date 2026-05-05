> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Web Search

<Note title="Beta">
  Server tools are currently in beta. The API and behavior may change.
</Note>

The `openrouter:web_search` server tool gives any model on OpenRouter access to real-time web information. When the model determines it needs current information, it calls the tool with a search query. OpenRouter executes the search and returns results that the model uses to formulate a grounded, cited response.

## How It Works

1. You include `{ "type": "openrouter:web_search" }` in your `tools` array.
2. Based on the user's prompt, the model decides whether a web search is needed and generates a search query.
3. OpenRouter executes the search using the configured engine (defaults to `auto`, which uses native provider search when available or falls back to [Exa](https://exa.ai)).
4. The search results (URLs, titles, and content snippets) are returned to the model.
5. The model synthesizes the results into its response. It may search multiple times in a single request if needed.

## Quick Start

<Template
  data={{
  API_KEY_REF,
  MODEL: 'openai/gpt-5.2'
}}
>
  <CodeGroup>
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
            content: 'What were the major AI announcements this week?'
          }
        ],
        tools: [
          { type: 'openrouter:web_search' }
        ]
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
            "content": "What were the major AI announcements this week?"
          }
        ],
        "tools": [
          {"type": "openrouter:web_search"}
        ]
      }
    )

    data = response.json()
    print(data["choices"][0]["message"]["content"])
    ```

    ```bash title="cURL"
    curl https://openrouter.ai/api/v1/chat/completions \
      -H "Authorization: Bearer {{API_KEY_REF}}" \
      -H "Content-Type: application/json" \
      -d '{
        "model": "{{MODEL}}",
        "messages": [
          {
            "role": "user",
            "content": "What were the major AI announcements this week?"
          }
        ],
        "tools": [
          {"type": "openrouter:web_search"}
        ]
      }'
    ```
  </CodeGroup>
</Template>

## Configuration

The web search tool accepts optional `parameters` to customize search behavior:

```json
{
  "type": "openrouter:web_search",
  "parameters": {
    "engine": "exa",
    "max_results": 5,
    "max_total_results": 20,
    "search_context_size": "medium",
    "allowed_domains": ["example.com"],
    "excluded_domains": ["reddit.com"]
  }
}
```

| Parameter             | Type      | Default  | Description                                                                                                                                                                                                      |
| --------------------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `engine`              | string    | `auto`   | Search engine to use: `auto`, `native`, `exa`, `firecrawl`, or `parallel`                                                                                                                                        |
| `max_results`         | integer   | 5        | Maximum results per search call (1–25). Applies to Exa, Firecrawl, and Parallel engines; ignored with native provider search                                                                                     |
| `max_total_results`   | integer   | —        | Maximum total results across all search calls in a single request. Useful for controlling cost and context size in agentic loops                                                                                 |
| `search_context_size` | string    | `medium` | How much context to retrieve: `low`, `medium`, or `high`. For Exa, controls characters per result; for Parallel, controls total characters across all results. Ignored with native provider search and Firecrawl |
| `user_location`       | object    | —        | Approximate user location for location-biased results. Currently only supported by native provider search; ignored with Exa, Firecrawl, and Parallel (see below)                                                 |
| `allowed_domains`     | string\[] | —        | Limit results to these domains. Supported by Exa, Parallel, and most native providers (see [domain filtering](#domain-filtering))                                                                                |
| `excluded_domains`    | string\[] | —        | Exclude results from these domains. Supported by Exa, Parallel, and some native providers (see [domain filtering](#domain-filtering))                                                                            |

### User Location

Pass an approximate user location to bias search results geographically:

```json
{
  "type": "openrouter:web_search",
  "parameters": {
    "user_location": {
      "type": "approximate",
      "city": "San Francisco",
      "region": "California",
      "country": "US",
      "timezone": "America/Los_Angeles"
    }
  }
}
```

All fields within `user_location` are optional.

## Engine Selection

The web search server tool supports multiple search engines:

* **`auto`** (default): Uses native search if the provider supports it, otherwise falls back to Exa
* **`native`**: Forces the provider's built-in web search (falls back to Exa with a warning if the provider doesn't support it)
* **`exa`**: Uses [Exa](https://exa.ai)'s search API, which combines keyword and embeddings-based search
* **`firecrawl`**: Uses [Firecrawl](https://firecrawl.dev)'s search API (BYOK — bring your own key)
* **`parallel`**: Uses [Parallel](https://parallel.ai)'s search API

### Engine Capabilities

| Feature                  | Exa         | Firecrawl       | Parallel    | Native             |
| ------------------------ | ----------- | --------------- | ----------- | ------------------ |
| **Domain filtering**     | Yes         | No              | Yes         | Varies by provider |
| **Context size control** | Yes\*       | No              | Yes\*\*     | No                 |
| **API key**              | Server-side | BYOK (your key) | Server-side | Provider-handled   |

<small>
  *\* Exa: limit applies **per result***

  *\*\* Parallel: limit applies as a **total across all results***
</small>

### Firecrawl (BYOK)

Firecrawl uses your own API key. To set it up:

1. Go to your [OpenRouter plugin settings](https://openrouter.ai/settings/plugins) and select Firecrawl as the web search engine
2. Accept the [Firecrawl Terms of Service](https://www.firecrawl.dev/terms-of-service) — this creates a Firecrawl account linked to your email
3. Your account starts with **10,000 free credits** (credits expire after 3 months)

Firecrawl searches use your Firecrawl credits directly — no additional charge from OpenRouter. Domain filtering is not supported with Firecrawl.

### Parallel

[Parallel](https://parallel.ai) supports domain filtering and context size control (`search_context_size`), and uses OpenRouter credits at the same rate as Exa (\$4 per 1,000 results).

## Domain Filtering

Restrict which domains appear in search results using `allowed_domains` and `excluded_domains`:

```json
{
  "type": "openrouter:web_search",
  "parameters": {
    "allowed_domains": ["arxiv.org", "nature.com"],
    "excluded_domains": ["reddit.com"]
  }
}
```

| Engine                  | `allowed_domains` | `excluded_domains` | Notes                                                                  |
| ----------------------- | :---------------: | :----------------: | ---------------------------------------------------------------------- |
| **Exa**                 |        Yes        |         Yes        | Both can be used simultaneously                                        |
| **Parallel**            |        Yes        |         Yes        | Mutually exclusive                                                     |
| **Firecrawl**           |         No        |         No         | Returns an error if domain filters are set                             |
| **Native (Anthropic)**  |        Yes        |         Yes        | Mutually exclusive (`allowed_domains` or `excluded_domains`, not both) |
| **Native (OpenAI)**     |        Yes        |         No         | `excluded_domains` silently ignored                                    |
| **Native (xAI)**        |        Yes        |         Yes        | Mutually exclusive                                                     |
| **Native (Perplexity)** |         No        |         No         | Not supported via server tool path                                     |

## Controlling Total Results

When the model searches multiple times in a single request, use `max_total_results` to cap the cumulative number of results:

```json
{
  "type": "openrouter:web_search",
  "parameters": {
    "max_results": 5,
    "max_total_results": 15
  }
}
```

Once the limit is reached, subsequent search calls return a message telling the model the limit was hit instead of performing another search. This is useful for controlling cost and context window usage in agentic loops.

## Works with the Responses API

The web search server tool also works with the Responses API:

<Template
  data={{
  API_KEY_REF,
  MODEL: 'openai/gpt-5.2'
}}
>
  <CodeGroup>
    ```typescript title="TypeScript"
    const response = await fetch('https://openrouter.ai/api/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer {{API_KEY_REF}}',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: '{{MODEL}}',
        input: 'What is the current price of Bitcoin?',
        tools: [
          { type: 'openrouter:web_search', parameters: { max_results: 3 } }
        ]
      }),
    });

    const data = await response.json();
    console.log(data);
    ```

    ```python title="Python"
    import requests

    response = requests.post(
      "https://openrouter.ai/api/v1/responses",
      headers={
        "Authorization": f"Bearer {{API_KEY_REF}}",
        "Content-Type": "application/json",
      },
      json={
        "model": "{{MODEL}}",
        "input": "What is the current price of Bitcoin?",
        "tools": [
          {"type": "openrouter:web_search", "parameters": {"max_results": 3}}
        ]
      }
    )

    data = response.json()
    print(data)
    ```
  </CodeGroup>
</Template>

## Usage Tracking

Web search usage is reported in the response `usage` object:

```json
{
  "usage": {
    "input_tokens": 105,
    "output_tokens": 250,
    "server_tool_use": {
      "web_search_requests": 2
    }
  }
}
```

The `web_search_requests` field counts the total number of search queries the model made during the request.

## Pricing

| Engine        | Pricing                                                                                                                                                                                                                                                                                                                                      |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Exa**       | \$4 per 1,000 results using OpenRouter credits (default 5 results = max \$0.02 per search)                                                                                                                                                                                                                                                   |
| **Parallel**  | \$4 per 1,000 results using OpenRouter credits (same as Exa)                                                                                                                                                                                                                                                                                 |
| **Firecrawl** | Uses your Firecrawl credits directly — no OpenRouter charge                                                                                                                                                                                                                                                                                  |
| **Native**    | Passed through from the provider ([OpenAI](https://platform.openai.com/docs/pricing#built-in-tools), [Anthropic](https://docs.claude.com/en/docs/agents-and-tools/tool-use/web-search-tool#usage-and-pricing), [Perplexity](https://docs.perplexity.ai/getting-started/pricing), [xAI](https://docs.x.ai/docs/models#tool-invocation-costs)) |

All pricing is in addition to standard LLM token costs for processing the search result content.

## Migrating from the Web Search Plugin

<Note>
  The [web search plugin](/docs/guides/features/plugins/web-search) (`plugins: [{ id: "web" }]`) and the [`:online` variant](/docs/guides/routing/model-variants/online) are deprecated. Use the `openrouter:web_search` server tool instead.
</Note>

The key differences:

|                           | Web Search Plugin (deprecated)   | Web Search Server Tool                       |
| ------------------------- | -------------------------------- | -------------------------------------------- |
| **How to enable**         | `plugins: [{ id: "web" }]`       | `tools: [{ type: "openrouter:web_search" }]` |
| **Who decides to search** | Always searches once             | Model decides when/whether to search         |
| **Call frequency**        | Once per request                 | 0 to N times per request                     |
| **Engine options**        | Native, Exa, Firecrawl, Parallel | Auto, Native, Exa, Firecrawl, Parallel       |
| **Domain filtering**      | Yes (Exa, Parallel, some native) | Yes (Exa, Parallel, most native)             |
| **Context size control**  | Via `web_search_options`         | Via `search_context_size` parameter          |
| **Total results cap**     | No                               | Yes (`max_total_results`)                    |
| **Pricing**               | Varies by engine                 | Varies by engine (same rates)                |

### Migration example

```json
// Before (deprecated)
{
  "model": "openai/gpt-5.2",
  "messages": [...],
  "plugins": [{ "id": "web", "max_results": 3 }]
}

// After
{
  "model": "openai/gpt-5.2",
  "messages": [...],
  "tools": [
    { "type": "openrouter:web_search", "parameters": { "max_results": 3 } }
  ]
}
```

```json
// Before (deprecated) — engine and domain filtering
{
  "model": "openai/gpt-5.2",
  "messages": [...],
  "plugins": [{
    "id": "web",
    "engine": "exa",
    "max_results": 5,
    "include_domains": ["arxiv.org"]
  }]
}

// After
{
  "model": "openai/gpt-5.2",
  "messages": [...],
  "tools": [{
    "type": "openrouter:web_search",
    "parameters": {
      "engine": "exa",
      "max_results": 5,
      "allowed_domains": ["arxiv.org"]
    }
  }]
}
```

```json
// Before (deprecated) — :online variant
{
  "model": "openai/gpt-5.2:online"
}

// After
{
  "model": "openai/gpt-5.2",
  "tools": [{ "type": "openrouter:web_search" }]
}
```

## Next Steps

* [Server Tools Overview](/docs/guides/features/server-tools) — Learn about server tools
* [Datetime](/docs/guides/features/server-tools/datetime) — Get the current date and time
* [Tool Calling](/docs/guides/features/tool-calling) — Learn about user-defined tool calling