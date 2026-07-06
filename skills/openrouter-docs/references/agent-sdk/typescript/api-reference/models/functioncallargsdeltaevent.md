> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# FunctionCallArgsDeltaEvent - TypeScript SDK

> FunctionCallArgsDeltaEvent type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when function call arguments are being streamed

## Example Usage

```typescript lines theme={null}
import { FunctionCallArgsDeltaEvent } from "@openrouter/sdk/models";

let value: FunctionCallArgsDeltaEvent = {
  delta: "<value>",
  itemId: "<id>",
  outputIndex: 986115,
  sequenceNumber: 0,
  type: "response.function_call_arguments.delta",
};
```

## Fields

| Field            | Type                                         | Required             | Description |
| ---------------- | -------------------------------------------- | -------------------- | ----------- |
| `delta`          | *string*                                     | :heavy\_check\_mark: | N/A         |
| `itemId`         | *string*                                     | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                                     | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                                     | :heavy\_check\_mark: | N/A         |
| `type`           | *"response.function\_call\_arguments.delta"* | :heavy\_check\_mark: | N/A         |
