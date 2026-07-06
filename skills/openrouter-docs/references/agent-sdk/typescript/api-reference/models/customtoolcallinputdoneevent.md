> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CustomToolCallInputDoneEvent - TypeScript SDK

> CustomToolCallInputDoneEvent type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when a custom tool call's freeform input streaming is complete. Mirrors `response.function_call_arguments.done` but for `custom` tools.

## Example Usage

```typescript lines theme={null}
import { CustomToolCallInputDoneEvent } from "@openrouter/sdk/models";

let value: CustomToolCallInputDoneEvent = {
  input: "<value>",
  itemId: "<id>",
  outputIndex: 276069,
  sequenceNumber: 0,
  type: "response.custom_tool_call_input.done",
};
```

## Fields

| Field            | Type                                        | Required             | Description |
| ---------------- | ------------------------------------------- | -------------------- | ----------- |
| `input`          | *string*                                    | :heavy\_check\_mark: | N/A         |
| `itemId`         | *string*                                    | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                                    | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                                    | :heavy\_check\_mark: | N/A         |
| `type`           | *"response.custom\_tool\_call\_input.done"* | :heavy\_check\_mark: | N/A         |
