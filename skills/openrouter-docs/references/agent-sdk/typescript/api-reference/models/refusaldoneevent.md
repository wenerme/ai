> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# RefusalDoneEvent - TypeScript SDK

> RefusalDoneEvent type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when refusal streaming is complete

## Example Usage

```typescript lines theme={null}
import { RefusalDoneEvent } from "@openrouter/sdk/models";

let value: RefusalDoneEvent = {
  contentIndex: 882616,
  itemId: "<id>",
  outputIndex: 641081,
  refusal: "<value>",
  sequenceNumber: 0,
  type: "response.refusal.done",
};
```

## Fields

| Field            | Type                      | Required             | Description |
| ---------------- | ------------------------- | -------------------- | ----------- |
| `contentIndex`   | *number*                  | :heavy\_check\_mark: | N/A         |
| `itemId`         | *string*                  | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                  | :heavy\_check\_mark: | N/A         |
| `refusal`        | *string*                  | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                  | :heavy\_check\_mark: | N/A         |
| `type`           | *"response.refusal.done"* | :heavy\_check\_mark: | N/A         |
