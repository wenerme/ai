> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesStreamEventResponseOutputTextDelta - TypeScript SDK

> OpenResponsesStreamEventResponseOutputTextDelta method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when a text delta is streamed

## Example Usage

```typescript lines theme={null}
import { OpenResponsesStreamEventResponseOutputTextDelta } from "@openrouter/sdk/models";

let value: OpenResponsesStreamEventResponseOutputTextDelta = {
  type: "response.output_text.delta",
  logprobs: [],
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  delta: "Hello",
  sequenceNumber: 4,
};
```

## Fields

| Field            | Type                                                                                  | Required             | Description |
| ---------------- | ------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `type`           | *"response.output\_text.delta"*                                                       | :heavy\_check\_mark: | N/A         |
| `logprobs`       | [models.OpenResponsesLogProbs](/docs/agent-sdk/typescript/models/openresponseslogprobs)\[] | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                                                                              | :heavy\_check\_mark: | N/A         |
| `itemId`         | *string*                                                                              | :heavy\_check\_mark: | N/A         |
| `contentIndex`   | *number*                                                                              | :heavy\_check\_mark: | N/A         |
| `delta`          | *string*                                                                              | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                                                                              | :heavy\_check\_mark: | N/A         |
