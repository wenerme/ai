> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# RefusalDeltaEvent - TypeScript SDK

> RefusalDeltaEvent type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when a refusal delta is streamed

## Example Usage

```typescript lines theme={null}
import { RefusalDeltaEvent } from "@openrouter/sdk/models";

let value: RefusalDeltaEvent = {
  contentIndex: 217319,
  delta: "<value>",
  itemId: "<id>",
  outputIndex: 604749,
  sequenceNumber: 0,
  type: "response.refusal.delta",
};
```

## Fields

| Field            | Type                       | Required             | Description |
| ---------------- | -------------------------- | -------------------- | ----------- |
| `contentIndex`   | *number*                   | :heavy\_check\_mark: | N/A         |
| `delta`          | *string*                   | :heavy\_check\_mark: | N/A         |
| `itemId`         | *string*                   | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                   | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                   | :heavy\_check\_mark: | N/A         |
| `type`           | *"response.refusal.delta"* | :heavy\_check\_mark: | N/A         |
