> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesStreamEventResponseFunctionCallArgumentsDelta - TypeScript SDK

> OpenResponsesStreamEventResponseFunctionCallArgumentsDelta method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when function call arguments are being streamed

## Example Usage

```typescript lines theme={null}
import { OpenResponsesStreamEventResponseFunctionCallArgumentsDelta } from "@openrouter/sdk/models";

let value: OpenResponsesStreamEventResponseFunctionCallArgumentsDelta = {
  type: "response.function_call_arguments.delta",
  itemId: "item-1",
  outputIndex: 0,
  delta: "{\"city\": \"San",
  sequenceNumber: 4,
};
```

## Fields

| Field            | Type                                         | Required             | Description |
| ---------------- | -------------------------------------------- | -------------------- | ----------- |
| `type`           | *"response.function\_call\_arguments.delta"* | :heavy\_check\_mark: | N/A         |
| `itemId`         | *string*                                     | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                                     | :heavy\_check\_mark: | N/A         |
| `delta`          | *string*                                     | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                                     | :heavy\_check\_mark: | N/A         |
