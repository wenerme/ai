> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesStreamEventResponseRefusalDone - TypeScript SDK

> OpenResponsesStreamEventResponseRefusalDone method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when refusal streaming is complete

## Example Usage

```typescript lines theme={null}
import { OpenResponsesStreamEventResponseRefusalDone } from "@openrouter/sdk/models";

let value: OpenResponsesStreamEventResponseRefusalDone = {
  type: "response.refusal.done",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  refusal: "I'm sorry, but I can't assist with that request.",
  sequenceNumber: 6,
};
```

## Fields

| Field            | Type                      | Required             | Description |
| ---------------- | ------------------------- | -------------------- | ----------- |
| `type`           | *"response.refusal.done"* | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                  | :heavy\_check\_mark: | N/A         |
| `itemId`         | *string*                  | :heavy\_check\_mark: | N/A         |
| `contentIndex`   | *number*                  | :heavy\_check\_mark: | N/A         |
| `refusal`        | *string*                  | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                  | :heavy\_check\_mark: | N/A         |
