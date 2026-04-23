> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/guides/features/server-tools/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/guides/features/server-tools/llms-full.txt.

# Datetime

<Note title="Beta">
  Server tools are currently in beta. The API and behavior may change.
</Note>

The `openrouter:datetime` server tool gives any model access to the current date and time. This is useful for prompts that require temporal awareness — scheduling, time-sensitive questions, or any task where the model needs to know "right now."

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
            content: 'What day of the week is it today?'
          }
        ],
        tools: [
          { type: 'openrouter:datetime' }
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
            "content": "What day of the week is it today?"
          }
        ],
        "tools": [
          {"type": "openrouter:datetime"}
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
            "content": "What day of the week is it today?"
          }
        ],
        "tools": [
          {"type": "openrouter:datetime"}
        ]
      }'
    ```
  </CodeGroup>
</Template>

## Configuration

The datetime tool accepts an optional `timezone` parameter:

```json
{
  "type": "openrouter:datetime",
  "parameters": {
    "timezone": "America/New_York"
  }
}
```

| Parameter  | Type   | Default | Description                                                                       |
| ---------- | ------ | ------- | --------------------------------------------------------------------------------- |
| `timezone` | string | `UTC`   | IANA timezone name (e.g. `"America/New_York"`, `"Europe/London"`, `"Asia/Tokyo"`) |

## Response

When the model calls the datetime tool, it receives a response like:

```json
{
  "datetime": "2025-07-15T14:30:00.000-04:00",
  "timezone": "America/New_York"
}
```

## Pricing

The datetime tool has no additional cost beyond standard token usage.

## Next Steps

* [Server Tools Overview](/docs/guides/features/server-tools) — Learn about server tools
* [Web Search](/docs/guides/features/server-tools/web-search) — Search the web for real-time information
* [Tool Calling](/docs/guides/features/tool-calling) — Learn about user-defined tool calling