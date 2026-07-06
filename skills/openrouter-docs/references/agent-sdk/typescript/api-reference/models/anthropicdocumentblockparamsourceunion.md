> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# AnthropicDocumentBlockParamSourceUnion - TypeScript SDK

> AnthropicDocumentBlockParamSourceUnion type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `models.AnthropicBase64PdfSource`

```typescript lines theme={null}
const value: models.AnthropicBase64PdfSource = {
  data: "JVBERi0x...",
  mediaType: "application/pdf",
  type: "base64",
};
```

### `models.AnthropicPlainTextSource`

```typescript lines theme={null}
const value: models.AnthropicPlainTextSource = {
  data: "Hello, world!",
  mediaType: "text/plain",
  type: "text",
};
```

### `models.SourceContent`

```typescript lines theme={null}
const value: models.SourceContent = {
  content: "<value>",
  type: "content",
};
```

### `models.AnthropicUrlPdfSource`

```typescript lines theme={null}
const value: models.AnthropicUrlPdfSource = {
  type: "url",
  url: "https://example.com/document.pdf",
};
```
