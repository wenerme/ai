> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ReasoningSummaryPartDoneEvent - TypeScript SDK

> ReasoningSummaryPartDoneEvent type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when a reasoning summary part is complete

## Example Usage

```typescript lines theme={null}
import { ReasoningSummaryPartDoneEvent } from "@openrouter/sdk/models";

let value: ReasoningSummaryPartDoneEvent = {
  itemId: "<id>",
  outputIndex: 686718,
  part: {
    text: "Analyzed the problem using first principles",
    type: "summary_text",
  },
  sequenceNumber: 0,
  summaryIndex: 477332,
  type: "response.reasoning_summary_part.done",
};
```

## Fields

| Field            | Type                                                                                           | Required             | Description | Example                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------------- | -------------------- | ----------- | -------------------------------------------------------------------------------- |
| `itemId`         | *string*                                                                                       | :heavy\_check\_mark: | N/A         |                                                                                  |
| `outputIndex`    | *number*                                                                                       | :heavy\_check\_mark: | N/A         |                                                                                  |
| `part`           | [models.ReasoningSummaryText](/docs/agent-sdk/typescript/api-reference/models/reasoningsummarytext) | :heavy\_check\_mark: | N/A         | `{"text": "Analyzed the problem using first principles","type": "summary_text"}` |
| `sequenceNumber` | *number*                                                                                       | :heavy\_check\_mark: | N/A         |                                                                                  |
| `summaryIndex`   | *number*                                                                                       | :heavy\_check\_mark: | N/A         |                                                                                  |
| `type`           | *"response.reasoning\_summary\_part.done"*                                                     | :heavy\_check\_mark: | N/A         |                                                                                  |
