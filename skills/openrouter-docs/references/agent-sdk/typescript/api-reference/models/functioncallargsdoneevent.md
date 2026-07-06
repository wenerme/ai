> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# FunctionCallArgsDoneEvent - TypeScript SDK

> FunctionCallArgsDoneEvent type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when function call arguments streaming is complete

## Example Usage

```typescript lines theme={null}
import { FunctionCallArgsDoneEvent } from "@openrouter/sdk/models";

let value: FunctionCallArgsDoneEvent = {
  arguments: "<value>",
  itemId: "<id>",
  name: "<value>",
  outputIndex: 51328,
  sequenceNumber: 0,
  type: "response.function_call_arguments.done",
};
```

## Fields

| Field            | Type                                        | Required             | Description |
| ---------------- | ------------------------------------------- | -------------------- | ----------- |
| `arguments`      | *string*                                    | :heavy\_check\_mark: | N/A         |
| `itemId`         | *string*                                    | :heavy\_check\_mark: | N/A         |
| `name`           | *string*                                    | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                                    | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                                    | :heavy\_check\_mark: | N/A         |
| `type`           | *"response.function\_call\_arguments.done"* | :heavy\_check\_mark: | N/A         |
