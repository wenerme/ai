> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ReasoningSummaryTextDeltaEvent - TypeScript SDK

> ReasoningSummaryTextDeltaEvent type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when reasoning summary text delta is streamed

## Example Usage

```typescript lines theme={null}
import { ReasoningSummaryTextDeltaEvent } from "@openrouter/sdk/models";

let value: ReasoningSummaryTextDeltaEvent = {
  delta: "<value>",
  itemId: "<id>",
  outputIndex: 326373,
  sequenceNumber: 0,
  summaryIndex: 214954,
  type: "response.reasoning_summary_text.delta",
};
```

## Fields

| Field            | Type                                        | Required             | Description |
| ---------------- | ------------------------------------------- | -------------------- | ----------- |
| `delta`          | *string*                                    | :heavy\_check\_mark: | N/A         |
| `itemId`         | *string*                                    | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                                    | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                                    | :heavy\_check\_mark: | N/A         |
| `summaryIndex`   | *number*                                    | :heavy\_check\_mark: | N/A         |
| `type`           | *"response.reasoning\_summary\_text.delta"* | :heavy\_check\_mark: | N/A         |
