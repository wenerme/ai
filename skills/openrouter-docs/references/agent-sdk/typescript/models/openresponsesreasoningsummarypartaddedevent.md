> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesReasoningSummaryPartAddedEvent - TypeScript SDK

> OpenResponsesReasoningSummaryPartAddedEvent method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when a reasoning summary part is added

## Example Usage

```typescript lines theme={null}
import { OpenResponsesReasoningSummaryPartAddedEvent } from "@openrouter/sdk/models";

let value: OpenResponsesReasoningSummaryPartAddedEvent = {
  type: "response.reasoning_summary_part.added",
  outputIndex: 0,
  itemId: "item-1",
  summaryIndex: 0,
  part: {
    type: "summary_text",
    text: "",
  },
  sequenceNumber: 3,
};
```

## Fields

| Field            | Type                                                                             | Required             | Description | Example                                                                          |
| ---------------- | -------------------------------------------------------------------------------- | -------------------- | ----------- | -------------------------------------------------------------------------------- |
| `type`           | *"response.reasoning\_summary\_part.added"*                                      | :heavy\_check\_mark: | N/A         |                                                                                  |
| `outputIndex`    | *number*                                                                         | :heavy\_check\_mark: | N/A         |                                                                                  |
| `itemId`         | *string*                                                                         | :heavy\_check\_mark: | N/A         |                                                                                  |
| `summaryIndex`   | *number*                                                                         | :heavy\_check\_mark: | N/A         |                                                                                  |
| `part`           | [models.ReasoningSummaryText](/agent-sdk/typescript/models/reasoningsummarytext) | :heavy\_check\_mark: | N/A         | `{"type": "summary_text","text": "Analyzed the problem using first principles"}` |
| `sequenceNumber` | *number*                                                                         | :heavy\_check\_mark: | N/A         |                                                                                  |
