> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# MessagesMessageParamContentUnion1 - TypeScript SDK

> MessagesMessageParamContentUnion1 type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `models.AnthropicTextBlockParam`

```typescript lines theme={null}
const value: models.AnthropicTextBlockParam = {
  text: "Hello, world!",
  type: "text",
};
```

### `models.AnthropicImageBlockParam`

```typescript lines theme={null}
const value: models.AnthropicImageBlockParam = {
  source: {
    data: "/9j/4AAQ...",
    mediaType: "image/jpeg",
    type: "base64",
  },
  type: "image",
};
```

### `models.ContentToolReference`

```typescript lines theme={null}
const value: models.ContentToolReference = {
  toolName: "<value>",
  type: "tool_reference",
};
```

### `models.AnthropicSearchResultBlockParam`

```typescript lines theme={null}
const value: models.AnthropicSearchResultBlockParam = {
  content: [
    {
      text: "Result content",
      type: "text",
    },
  ],
  source: "example_source",
  title: "Example Result",
  type: "search_result",
};
```

### `models.AnthropicDocumentBlockParam`

```typescript lines theme={null}
const value: models.AnthropicDocumentBlockParam = {
  source: {
    data: "Hello, world!",
    mediaType: "text/plain",
    type: "text",
  },
  type: "document",
};
```
