> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesRequestToolUnion - TypeScript SDK

> OpenResponsesRequestToolUnion method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `models.OpenResponsesRequestToolFunction`

```typescript expandable lines theme={null}
const value: models.OpenResponsesRequestToolFunction = {
  type: "function",
  name: "get_weather",
  parameters: {
    "type": "object",
    "properties": {
      "location": {
        "type": "string",
        "description": "The city and state",
      },
      "unit": {
        "type": "string",
        "enum": [
          "celsius",
          "fahrenheit",
        ],
        "x-speakeasy-unknown-values": "allow",
      },
    },
    "required": [
      "location",
    ],
  },
};
```

### `models.OpenResponsesWebSearchPreviewTool`

```typescript lines theme={null}
const value: models.OpenResponsesWebSearchPreviewTool = {
  type: "web_search_preview",
};
```

### `models.OpenResponsesWebSearchPreview20250311Tool`

```typescript lines theme={null}
const value: models.OpenResponsesWebSearchPreview20250311Tool = {
  type: "web_search_preview_2025_03_11",
};
```

### `models.OpenResponsesWebSearchTool`

```typescript lines theme={null}
const value: models.OpenResponsesWebSearchTool = {
  type: "web_search",
};
```

### `models.OpenResponsesWebSearch20250826Tool`

```typescript lines theme={null}
const value: models.OpenResponsesWebSearch20250826Tool = {
  type: "web_search_2025_08_26",
};
```
