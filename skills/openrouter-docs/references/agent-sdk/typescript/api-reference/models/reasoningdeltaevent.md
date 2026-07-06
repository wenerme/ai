> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ReasoningDeltaEvent - TypeScript SDK

> ReasoningDeltaEvent type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when reasoning text delta is streamed

## Example Usage

```typescript lines theme={null}
import { ReasoningDeltaEvent } from "@openrouter/sdk/models";

let value: ReasoningDeltaEvent = {
  contentIndex: 744455,
  delta: "<value>",
  itemId: "<id>",
  outputIndex: 904446,
  sequenceNumber: 0,
  type: "response.reasoning_text.delta",
};
```

## Fields

| Field            | Type                               | Required             | Description |
| ---------------- | ---------------------------------- | -------------------- | ----------- |
| `contentIndex`   | *number*                           | :heavy\_check\_mark: | N/A         |
| `delta`          | *string*                           | :heavy\_check\_mark: | N/A         |
| `itemId`         | *string*                           | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                           | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                           | :heavy\_check\_mark: | N/A         |
| `type`           | *"response.reasoning\_text.delta"* | :heavy\_check\_mark: | N/A         |
