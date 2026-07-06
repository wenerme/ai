> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CustomToolCallInputDeltaEvent - TypeScript SDK

> CustomToolCallInputDeltaEvent type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when a custom tool call's freeform input is being streamed. Mirrors `response.function_call_arguments.delta` but for `custom` tools whose input is opaque text rather than JSON arguments.

## Example Usage

```typescript lines theme={null}
import { CustomToolCallInputDeltaEvent } from "@openrouter/sdk/models";

let value: CustomToolCallInputDeltaEvent = {
  delta: "<value>",
  itemId: "<id>",
  outputIndex: 992628,
  sequenceNumber: 0,
  type: "response.custom_tool_call_input.delta",
};
```

## Fields

| Field            | Type                                         | Required             | Description |
| ---------------- | -------------------------------------------- | -------------------- | ----------- |
| `delta`          | *string*                                     | :heavy\_check\_mark: | N/A         |
| `itemId`         | *string*                                     | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                                     | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                                     | :heavy\_check\_mark: | N/A         |
| `type`           | *"response.custom\_tool\_call\_input.delta"* | :heavy\_check\_mark: | N/A         |
