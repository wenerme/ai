> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# WebSearchCallInProgressEvent - TypeScript SDK

> WebSearchCallInProgressEvent type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Web search call in progress

## Example Usage

```typescript lines theme={null}
import { WebSearchCallInProgressEvent } from "@openrouter/sdk/models";

let value: WebSearchCallInProgressEvent = {
  itemId: "<id>",
  outputIndex: 549158,
  sequenceNumber: 0,
  type: "response.web_search_call.in_progress",
};
```

## Fields

| Field            | Type                                        | Required             | Description |
| ---------------- | ------------------------------------------- | -------------------- | ----------- |
| `itemId`         | *string*                                    | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                                    | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                                    | :heavy\_check\_mark: | N/A         |
| `type`           | *"response.web\_search\_call.in\_progress"* | :heavy\_check\_mark: | N/A         |
