> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesStreamEventResponseRefusalDelta - TypeScript SDK

> OpenResponsesStreamEventResponseRefusalDelta method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when a refusal delta is streamed

## Example Usage

```typescript lines theme={null}
import { OpenResponsesStreamEventResponseRefusalDelta } from "@openrouter/sdk/models";

let value: OpenResponsesStreamEventResponseRefusalDelta = {
  type: "response.refusal.delta",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  delta: "I'm sorry",
  sequenceNumber: 4,
};
```

## Fields

| Field            | Type                       | Required             | Description |
| ---------------- | -------------------------- | -------------------- | ----------- |
| `type`           | *"response.refusal.delta"* | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                   | :heavy\_check\_mark: | N/A         |
| `itemId`         | *string*                   | :heavy\_check\_mark: | N/A         |
| `contentIndex`   | *number*                   | :heavy\_check\_mark: | N/A         |
| `delta`          | *string*                   | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                   | :heavy\_check\_mark: | N/A         |
