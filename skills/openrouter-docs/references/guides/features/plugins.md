> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Plugins

> Extend model capabilities with OpenRouter plugins

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

OpenRouter plugins extend the capabilities of any model by injecting or mutating a request or response to add functionality like PDF processing, automatic JSON repair, and context compression. Unlike [server tools](/guides/features/server-tools) (which the model can call 0-N times), plugins always run once when enabled. Plugins can be enabled per-request via the API or configured as defaults for all your API requests through the [Plugins settings page](https://openrouter.ai/settings/plugins).

## Available Plugins

OpenRouter currently supports the following plugins:

| Plugin                      | Description                                                                                                                                               | Docs                                                          |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| **Web Search** (deprecated) | Augment LLM responses with real-time web search results. Use the [`openrouter:web_search` server tool](/guides/features/server-tools/web-search) instead. | [Web Search](/guides/features/plugins/web-search)             |
| **PDF Inputs**              | Parse and extract content from uploaded PDF files                                                                                                         | [PDF Inputs](/guides/overview/multimodal/pdfs)                |
| **Response Healing**        | Automatically fix malformed JSON responses from LLMs                                                                                                      | [Response Healing](/guides/features/plugins/response-healing) |
| **Pareto Router**           | Set a default coding quality tier for the Pareto code router                                                                                              | [Pareto Router](/guides/routing/routers/pareto-router)        |
| **Context Compression**     | Compress prompts that exceed a model's context window using middle-out truncation                                                                         | [Message Transforms](/guides/features/message-transforms)     |

## Enabling Plugins via API

Plugins are enabled by adding a `plugins` array to your chat completions request. Each plugin is identified by its `id` and can include optional configuration parameters.

<Template
  data={{
API_KEY_REF,
MODEL: 'openai/gpt-5.2'
}}
>
  <CodeGroup>
    ```typescript title="TypeScript" expandable lines theme={null}
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
            content: 'What are the latest developments in AI?'
          }
        ],
        plugins: [
          { id: 'web' }
        ]
      }),
    });

    const data = await response.json();
    console.log(data.choices[0].message.content);
    ```

    ```python title="Python" expandable lines theme={null}
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
            "content": "What are the latest developments in AI?"
          }
        ],
        "plugins": [
          {"id": "web"}
        ]
      }
    )

    data = response.json()
    print(data["choices"][0]["message"]["content"])
    ```

    ```bash title="cURL" lines theme={null}
    curl https://openrouter.ai/api/v1/chat/completions \
      -H "Authorization: Bearer {{API_KEY_REF}}" \
      -H "Content-Type: application/json" \
      -d '{
        "model": "{{MODEL}}",
        "messages": [
          {
            "role": "user",
            "content": "What are the latest developments in AI?"
          }
        ],
        "plugins": [
          {"id": "web"}
        ]
      }'
    ```
  </CodeGroup>
</Template>

## Using Multiple Plugins

You can enable multiple plugins in a single request:

```json lines theme={null}
{
  "model": "openai/gpt-5.2",
  "messages": [...],
  "plugins": [
    { "id": "web", "max_results": 3 },
    { "id": "response-healing" }
  ],
  "response_format": {
    "type": "json_schema",
    "json_schema": { ... }
  }
}
```

## Default Plugin Settings

Organization admins and individual users can configure default plugin settings that apply to all API requests. This is useful for:

* Enabling plugins like web search or response healing by default across all requests
* Setting consistent plugin configurations without modifying application code
* Enforcing plugin settings that cannot be overridden by individual requests

To configure default plugin settings:

1. Navigate to [Settings > Plugins](https://openrouter.ai/settings/plugins)
2. Toggle plugins on/off to enable them by default
3. Click the configure button to customize plugin settings
4. Optionally enable "Prevent overrides" to enforce settings across all requests

<Warning>
  In organizations, the Plugins settings page is only accessible to admins.
</Warning>

<Note>
  When "Prevent overrides" is enabled for a plugin, individual API requests cannot disable or modify that plugin's configuration. This is useful for enforcing organization-wide policies.
</Note>

### Plugin precedence

Plugin settings are applied in the following order of precedence:

1. **Request-level settings**: Plugin configurations in the `plugins` array of individual requests
2. **Account defaults**: Settings configured in the Plugins settings page

If a plugin is enabled in your account defaults but not specified in a request, the default configuration will be applied. If you specify a plugin in your request, those settings will override the defaults.

If you want the account setting to take precedence, toggle on "Prevent overrides" in the config for the plugin. It will then be impossible for generations to override the config.

### Disabling a default plugin

If a plugin is enabled by default in your account settings, you can disable it for a specific request by passing `"enabled": false` in the plugins array:

```json lines theme={null}
{
  "model": "openai/gpt-5.2",
  "messages": [...],
  "plugins": [
    { "id": "web", "enabled": false }
  ]
}
```

This will turn off the web search plugin for that particular request, even if it's enabled in your account defaults.

## Model Variants as Plugin Shortcuts

<Warning>
  **Deprecated**

  The `:online` variant and the web search plugin are deprecated. Use the [`openrouter:web_search` server tool](/guides/features/server-tools/web-search) instead.
</Warning>

Some plugins have convenient model variant shortcuts. For example, appending `:online` to any model ID enables web search:

```json lines theme={null}
{
  "model": "openai/gpt-5.2:online"
}
```

This is equivalent to:

```json lines theme={null}
{
  "model": "openai/gpt-5.2",
  "plugins": [{ "id": "web" }]
}
```

See [Model Variants](/guides/routing/model-variants/online) for more information about available shortcuts.
