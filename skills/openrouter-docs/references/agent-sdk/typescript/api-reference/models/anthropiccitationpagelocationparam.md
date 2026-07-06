> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# AnthropicCitationPageLocationParam - TypeScript SDK

> AnthropicCitationPageLocationParam type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { AnthropicCitationPageLocationParam } from "@openrouter/sdk/models";

let value: AnthropicCitationPageLocationParam = {
  citedText: "Example cited text",
  documentIndex: 0,
  documentTitle: null,
  endPageNumber: 2,
  startPageNumber: 1,
  type: "page_location",
};
```

## Fields

| Field             | Type               | Required             | Description |
| ----------------- | ------------------ | -------------------- | ----------- |
| `citedText`       | *string*           | :heavy\_check\_mark: | N/A         |
| `documentIndex`   | *number*           | :heavy\_check\_mark: | N/A         |
| `documentTitle`   | *string*           | :heavy\_check\_mark: | N/A         |
| `endPageNumber`   | *number*           | :heavy\_check\_mark: | N/A         |
| `startPageNumber` | *number*           | :heavy\_check\_mark: | N/A         |
| `type`            | *"page\_location"* | :heavy\_check\_mark: | N/A         |
