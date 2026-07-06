> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesStreamEventResponseFunctionCallArgumentsDone - TypeScript SDK

> OpenResponsesStreamEventResponseFunctionCallArgumentsDone method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when function call arguments streaming is complete

## Example Usage

```typescript lines theme={null}
import { OpenResponsesStreamEventResponseFunctionCallArgumentsDone } from "@openrouter/sdk/models";

let value: OpenResponsesStreamEventResponseFunctionCallArgumentsDone = {
  type: "response.function_call_arguments.done",
  itemId: "item-1",
  outputIndex: 0,
  name: "get_weather",
  arguments: "{\"city\": \"San Francisco\", \"units\": \"celsius\"}",
  sequenceNumber: 6,
};
```

## Fields

| Field            | Type                                        | Required             | Description |
| ---------------- | ------------------------------------------- | -------------------- | ----------- |
| `type`           | *"response.function\_call\_arguments.done"* | :heavy\_check\_mark: | N/A         |
| `itemId`         | *string*                                    | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                                    | :heavy\_check\_mark: | N/A         |
| `name`           | *string*                                    | :heavy\_check\_mark: | N/A         |
| `arguments`      | *string*                                    | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                                    | :heavy\_check\_mark: | N/A         |
