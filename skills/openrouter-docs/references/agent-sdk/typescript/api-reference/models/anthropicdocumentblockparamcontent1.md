> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# AnthropicDocumentBlockParamContent1 - TypeScript SDK

> AnthropicDocumentBlockParamContent1 type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

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

### `models.AnthropicTextBlockParam`

```typescript lines theme={null}
const value: models.AnthropicTextBlockParam = {
  text: "Hello, world!",
  type: "text",
};
```
