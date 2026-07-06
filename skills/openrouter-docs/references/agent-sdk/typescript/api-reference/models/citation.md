> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Citation - TypeScript SDK

> Citation type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `models.AnthropicCitationCharLocationParam`

```typescript lines theme={null}
const value: models.AnthropicCitationCharLocationParam = {
  citedText: "Example cited text",
  documentIndex: 0,
  documentTitle: null,
  endCharIndex: 18,
  startCharIndex: 0,
  type: "char_location",
};
```

### `models.AnthropicCitationContentBlockLocationParam`

```typescript lines theme={null}
const value: models.AnthropicCitationContentBlockLocationParam = {
  citedText: "Example cited text",
  documentIndex: 0,
  documentTitle: null,
  endBlockIndex: 1,
  startBlockIndex: 0,
  type: "content_block_location",
};
```

### `models.AnthropicCitationPageLocationParam`

```typescript lines theme={null}
const value: models.AnthropicCitationPageLocationParam = {
  citedText: "Example cited text",
  documentIndex: 0,
  documentTitle: null,
  endPageNumber: 2,
  startPageNumber: 1,
  type: "page_location",
};
```

### `models.AnthropicCitationSearchResultLocation`

```typescript lines theme={null}
const value: models.AnthropicCitationSearchResultLocation = {
  citedText: "Example cited text",
  endBlockIndex: 1,
  searchResultIndex: 0,
  source: "example_source",
  startBlockIndex: 0,
  title: "Example Result",
  type: "search_result_location",
};
```

### `models.AnthropicCitationWebSearchResultLocation`

```typescript lines theme={null}
const value: models.AnthropicCitationWebSearchResultLocation = {
  citedText: "Example cited text",
  encryptedIndex: "enc_idx_0",
  title: "Example Page",
  type: "web_search_result_location",
  url: "https://example.com",
};
```
