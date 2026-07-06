> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesReasoningDoneEvent - TypeScript SDK

> OpenResponsesReasoningDoneEvent method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when reasoning text streaming is complete

## Example Usage

```typescript lines theme={null}
import { OpenResponsesReasoningDoneEvent } from "@openrouter/sdk/models";

let value: OpenResponsesReasoningDoneEvent = {
  type: "response.reasoning_text.done",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  text:
    "First, we need to identify the key components and then combine them logically.",
  sequenceNumber: 6,
};
```

## Fields

| Field            | Type                              | Required             | Description |
| ---------------- | --------------------------------- | -------------------- | ----------- |
| `type`           | *"response.reasoning\_text.done"* | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                          | :heavy\_check\_mark: | N/A         |
| `itemId`         | *string*                          | :heavy\_check\_mark: | N/A         |
| `contentIndex`   | *number*                          | :heavy\_check\_mark: | N/A         |
| `text`           | *string*                          | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                          | :heavy\_check\_mark: | N/A         |
