> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# WebSearchCallCompletedEvent - TypeScript SDK

> WebSearchCallCompletedEvent type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Web search call completed

## Example Usage

```typescript lines theme={null}
import { WebSearchCallCompletedEvent } from "@openrouter/sdk/models";

let value: WebSearchCallCompletedEvent = {
  itemId: "<id>",
  outputIndex: 871568,
  sequenceNumber: 0,
  type: "response.web_search_call.completed",
};
```

## Fields

| Field            | Type                                     | Required             | Description |
| ---------------- | ---------------------------------------- | -------------------- | ----------- |
| `itemId`         | *string*                                 | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                                 | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                                 | :heavy\_check\_mark: | N/A         |
| `type`           | *"response.web\_search\_call.completed"* | :heavy\_check\_mark: | N/A         |
