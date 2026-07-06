> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenAIResponsesAnnotation - TypeScript SDK

> OpenAIResponsesAnnotation type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `models.FileCitation`

```typescript lines theme={null}
const value: models.FileCitation = {
  fileId: "file-abc123",
  filename: "research_paper.pdf",
  index: 0,
  type: "file_citation",
};
```

### `models.URLCitation`

```typescript lines theme={null}
const value: models.URLCitation = {
  endIndex: 582752,
  startIndex: 114325,
  title: "<value>",
  type: "url_citation",
  url: "https://dim-jet.biz/",
};
```

### `models.FilePath`

```typescript lines theme={null}
const value: models.FilePath = {
  fileId: "file-abc123",
  index: 0,
  type: "file_path",
};
```
