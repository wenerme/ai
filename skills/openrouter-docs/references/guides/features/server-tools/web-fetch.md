> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Web Fetch

<Note title="Beta">
  Server tools are currently in beta. The API and behavior may change.
</Note>

The `openrouter:web_fetch` server tool gives any model the ability to fetch
content from a specific URL. When the model needs to read a web page or PDF
document, it calls the tool with the URL. OpenRouter fetches and extracts the
content, returning text that the model can use in its response.

## How It Works

1. You include `{ "type": "openrouter:web_fetch" }` in your `tools` array.
2. Based on the user's prompt, the model decides whether it needs to fetch a
   URL and generates the request.
3. OpenRouter fetches the URL using the configured engine (defaults to `auto`,
   which uses native provider fetch when available or falls back to
   [Exa](https://exa.ai)).
4. The page content (text, title, and URL) is returned to the model.
5. The model incorporates the fetched content into its response. It may fetch
   multiple URLs in a single request if needed.

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
            content: 'Summarize the content at https://example.com/article'
          }
        ],
        tools: [
          { type: 'openrouter:web_fetch' }
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
            "content": "Summarize the content at https://example.com/article"
          }
        ],
        "tools": [
          {"type": "openrouter:web_fetch"}
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
            "content": "Summarize the content at https://example.com/article"
          }
        ],
        "tools": [
          {"type": "openrouter:web_fetch"}
        ]
      }'
    ```
  </CodeGroup>
</Template>

## Configuration

The web fetch tool accepts optional `parameters` to customize behavior:

```json
{
  "type": "openrouter:web_fetch",
  "parameters": {
    "engine": "exa",
    "max_uses": 10,
    "max_content_tokens": 100000,
    "allowed_domains": ["docs.example.com"],
    "blocked_domains": ["private.example.com"]
  }
}
```

| Parameter            | Type      | Default | Description                                                                       |
| -------------------- | --------- | ------- | --------------------------------------------------------------------------------- |
| `engine`             | string    | `auto`  | Fetch engine to use: `auto`, `native`, `exa`, `openrouter`, or `firecrawl`        |
| `max_uses`           | integer   | —       | Maximum fetches per request. Once exceeded, the tool returns an error             |
| `max_content_tokens` | integer   | —       | Maximum content length in approximate tokens. Content exceeding this is truncated |
| `allowed_domains`    | string\[] | —       | Only fetch from these domains                                                     |
| `blocked_domains`    | string\[] | —       | Never fetch from these domains                                                    |

## Engine Selection

The web fetch server tool supports multiple fetch engines:

* **`auto`** (default): Uses native fetch if the provider supports it,
  otherwise falls back to Exa
* **`native`**: Forces the provider's built-in web fetch
* **`exa`**: Uses [Exa](https://exa.ai)'s Contents API to extract page content
  (supports BYOK)
* **`openrouter`**: Uses direct HTTP fetch with content extraction
* **`firecrawl`**: Uses [Firecrawl](https://firecrawl.dev)'s scrape API
  (BYOK — bring your own key)

### Engine Capabilities

| Feature              | Exa                 | Firecrawl       | OpenRouter  | Native           |
| -------------------- | ------------------- | --------------- | ----------- | ---------------- |
| **Domain filtering** | Yes                 | Yes             | Yes         | Varies           |
| **Token truncation** | Yes                 | Yes             | Yes         | No               |
| **API key**          | Server-side or BYOK | BYOK (your key) | Server-side | Provider-handled |
| **Hard limit**       | None                | None            | 50/request  | 50/request       |

### Firecrawl (BYOK)

Firecrawl uses your own API key. To set it up:

1. Go to your [OpenRouter plugin settings](https://openrouter.ai/settings/plugins)
   and configure your Firecrawl API key
2. Your Firecrawl account is billed separately from OpenRouter

### Hard Limits

To prevent runaway costs:

* **Exa engine**: No hard limit (billed via API credits)
* **Firecrawl engine**: No hard limit (uses your Firecrawl credits)
* **OpenRouter/native engines**: Hard limit of 50 fetches per request

## Domain Filtering

Restrict which domains can be fetched using `allowed_domains` and
`blocked_domains`:

```json
{
  "type": "openrouter:web_fetch",
  "parameters": {
    "allowed_domains": ["docs.example.com", "api.example.com"],
    "blocked_domains": ["internal.example.com"]
  }
}
```

When `allowed_domains` is set, only URLs from those domains will be fetched.
When `blocked_domains` is set, URLs from those domains will be rejected.

## Content Truncation

Use `max_content_tokens` to limit the amount of content returned:

```json
{
  "type": "openrouter:web_fetch",
  "parameters": {
    "max_content_tokens": 50000
  }
}
```

Content exceeding this limit is truncated. This is useful for controlling
context window usage when fetching large pages.

## Works with the Responses API

The web fetch server tool also works with the Responses API:

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
        input: 'What does the documentation at https://example.com/docs say?',
        tools: [
          { type: 'openrouter:web_fetch', parameters: { max_content_tokens: 50000 } }
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
        "input": "What does the documentation at https://example.com/docs say?",
        "tools": [
          {"type": "openrouter:web_fetch", "parameters": {"max_content_tokens": 50000}}
        ]
      }
    )

    data = response.json()
    print(data)
    ```
  </CodeGroup>
</Template>

## Response Format

When the model calls the web fetch tool, it receives a response like:

```json
{
  "url": "https://example.com/article",
  "title": "Article Title",
  "content": "The full text content of the page...",
  "status": "completed",
  "retrieved_at": "2025-07-15T14:30:00.000Z"
}
```

If the fetch fails, the response includes an error:

```json
{
  "url": "https://example.com/404",
  "status": "failed",
  "error": "HTTP 404: Page not found"
}
```

## Pricing

| Engine         | Pricing                                                     |
| -------------- | ----------------------------------------------------------- |
| **Exa**        | \$1 per 1,000 fetches (free with BYOK)                      |
| **Firecrawl**  | Uses your Firecrawl credits directly — no OpenRouter charge |
| **OpenRouter** | Free                                                        |
| **Native**     | Passed through from the provider                            |

All pricing is in addition to standard LLM token costs for processing the
fetched content.

### Exa BYOK

If you configure your own Exa API key in your
[provider settings](https://openrouter.ai/settings/plugins), web fetches using
the Exa engine are free through OpenRouter — you pay Exa directly.

## Next Steps

* [Server Tools Overview](/docs/guides/features/server-tools) — Learn about
  server tools
* [Web Search](/docs/guides/features/server-tools/web-search) — Search the web
  for real-time information
* [Datetime](/docs/guides/features/server-tools/datetime) — Get the current
  date and time
* [Tool Calling](/docs/guides/features/tool-calling) — Learn about user-defined
  tool calling