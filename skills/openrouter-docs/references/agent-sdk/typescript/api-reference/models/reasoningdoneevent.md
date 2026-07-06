> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ReasoningDoneEvent - TypeScript SDK

> ReasoningDoneEvent type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when reasoning text streaming is complete

## Example Usage

```typescript lines theme={null}
import { ReasoningDoneEvent } from "@openrouter/sdk/models";

let value: ReasoningDoneEvent = {
  contentIndex: 789397,
  itemId: "<id>",
  outputIndex: 602802,
  sequenceNumber: 0,
  text: "<value>",
  type: "response.reasoning_text.done",
};
```

## Fields

| Field            | Type                              | Required             | Description |
| ---------------- | --------------------------------- | -------------------- | ----------- |
| `contentIndex`   | *number*                          | :heavy\_check\_mark: | N/A         |
| `itemId`         | *string*                          | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                          | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                          | :heavy\_check\_mark: | N/A         |
| `text`           | *string*                          | :heavy\_check\_mark: | N/A         |
| `type`           | *"response.reasoning\_text.done"* | :heavy\_check\_mark: | N/A         |
