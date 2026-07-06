> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesReasoningSummaryTextDoneEvent - TypeScript SDK

> OpenResponsesReasoningSummaryTextDoneEvent method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when reasoning summary text streaming is complete

## Example Usage

```typescript lines theme={null}
import { OpenResponsesReasoningSummaryTextDoneEvent } from "@openrouter/sdk/models";

let value: OpenResponsesReasoningSummaryTextDoneEvent = {
  type: "response.reasoning_summary_text.done",
  itemId: "item-1",
  outputIndex: 0,
  summaryIndex: 0,
  text: "Analyzing the problem step by step to find the optimal solution.",
  sequenceNumber: 6,
};
```

## Fields

| Field            | Type                                       | Required             | Description |
| ---------------- | ------------------------------------------ | -------------------- | ----------- |
| `type`           | *"response.reasoning\_summary\_text.done"* | :heavy\_check\_mark: | N/A         |
| `itemId`         | *string*                                   | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                                   | :heavy\_check\_mark: | N/A         |
| `summaryIndex`   | *number*                                   | :heavy\_check\_mark: | N/A         |
| `text`           | *string*                                   | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                                   | :heavy\_check\_mark: | N/A         |
