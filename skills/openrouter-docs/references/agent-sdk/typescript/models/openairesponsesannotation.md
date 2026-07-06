> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenAIResponsesAnnotation - TypeScript SDK

> OpenAIResponsesAnnotation method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `models.FileCitation`

```typescript lines theme={null}
const value: models.FileCitation = {
  type: "file_citation",
  fileId: "file-abc123",
  filename: "research_paper.pdf",
  index: 0,
};
```

### `models.URLCitation`

```typescript lines theme={null}
const value: models.URLCitation = {
  type: "url_citation",
  url: "https://openrouter.ai/docs",
  title: "OpenRouter Documentation",
  startIndex: 0,
  endIndex: 42,
};
```

### `models.FilePath`

```typescript lines theme={null}
const value: models.FilePath = {
  type: "file_path",
  fileId: "file-xyz789",
  index: 0,
};
```
