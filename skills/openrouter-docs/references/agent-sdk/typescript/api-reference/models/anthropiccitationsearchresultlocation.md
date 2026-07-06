> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# AnthropicCitationSearchResultLocation - TypeScript SDK

> AnthropicCitationSearchResultLocation type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { AnthropicCitationSearchResultLocation } from "@openrouter/sdk/models";

let value: AnthropicCitationSearchResultLocation = {
  citedText: "Example cited text",
  endBlockIndex: 1,
  searchResultIndex: 0,
  source: "example_source",
  startBlockIndex: 0,
  title: "Example Result",
  type: "search_result_location",
};
```

## Fields

| Field               | Type                         | Required             | Description |
| ------------------- | ---------------------------- | -------------------- | ----------- |
| `citedText`         | *string*                     | :heavy\_check\_mark: | N/A         |
| `endBlockIndex`     | *number*                     | :heavy\_check\_mark: | N/A         |
| `searchResultIndex` | *number*                     | :heavy\_check\_mark: | N/A         |
| `source`            | *string*                     | :heavy\_check\_mark: | N/A         |
| `startBlockIndex`   | *number*                     | :heavy\_check\_mark: | N/A         |
| `title`             | *string*                     | :heavy\_check\_mark: | N/A         |
| `type`              | *"search\_result\_location"* | :heavy\_check\_mark: | N/A         |
