> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesReasoningDeltaEvent - TypeScript SDK

> OpenResponsesReasoningDeltaEvent method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when reasoning text delta is streamed

## Example Usage

```typescript lines theme={null}
import { OpenResponsesReasoningDeltaEvent } from "@openrouter/sdk/models";

let value: OpenResponsesReasoningDeltaEvent = {
  type: "response.reasoning_text.delta",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  delta: "First, we need",
  sequenceNumber: 4,
};
```

## Fields

| Field            | Type                               | Required             | Description |
| ---------------- | ---------------------------------- | -------------------- | ----------- |
| `type`           | *"response.reasoning\_text.delta"* | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                           | :heavy\_check\_mark: | N/A         |
| `itemId`         | *string*                           | :heavy\_check\_mark: | N/A         |
| `contentIndex`   | *number*                           | :heavy\_check\_mark: | N/A         |
| `delta`          | *string*                           | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                           | :heavy\_check\_mark: | N/A         |
