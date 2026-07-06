> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ReasoningSummaryTextDoneEvent - TypeScript SDK

> ReasoningSummaryTextDoneEvent type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when reasoning summary text streaming is complete

## Example Usage

```typescript lines theme={null}
import { ReasoningSummaryTextDoneEvent } from "@openrouter/sdk/models";

let value: ReasoningSummaryTextDoneEvent = {
  itemId: "<id>",
  outputIndex: 239944,
  sequenceNumber: 0,
  summaryIndex: 543197,
  text: "<value>",
  type: "response.reasoning_summary_text.done",
};
```

## Fields

| Field            | Type                                       | Required             | Description |
| ---------------- | ------------------------------------------ | -------------------- | ----------- |
| `itemId`         | *string*                                   | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                                   | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                                   | :heavy\_check\_mark: | N/A         |
| `summaryIndex`   | *number*                                   | :heavy\_check\_mark: | N/A         |
| `text`           | *string*                                   | :heavy\_check\_mark: | N/A         |
| `type`           | *"response.reasoning\_summary\_text.done"* | :heavy\_check\_mark: | N/A         |
