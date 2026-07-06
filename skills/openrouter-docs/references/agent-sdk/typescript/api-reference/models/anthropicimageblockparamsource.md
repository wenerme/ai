> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# AnthropicImageBlockParamSource - TypeScript SDK

> AnthropicImageBlockParamSource type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `models.AnthropicBase64ImageSource`

```typescript lines theme={null}
const value: models.AnthropicBase64ImageSource = {
  data: "/9j/4AAQ...",
  mediaType: "image/jpeg",
  type: "base64",
};
```

### `models.AnthropicUrlImageSource`

```typescript lines theme={null}
const value: models.AnthropicUrlImageSource = {
  type: "url",
  url: "https://example.com/image.jpg",
};
```
