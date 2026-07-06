> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesStreamEventResponseOutputTextDone - TypeScript SDK

> OpenResponsesStreamEventResponseOutputTextDone method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when text streaming is complete

## Example Usage

```typescript lines theme={null}
import { OpenResponsesStreamEventResponseOutputTextDone } from "@openrouter/sdk/models";

let value: OpenResponsesStreamEventResponseOutputTextDone = {
  type: "response.output_text.done",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  text: "Hello! How can I help you?",
  sequenceNumber: 6,
  logprobs: [],
};
```

## Fields

| Field            | Type                                                                                  | Required             | Description |
| ---------------- | ------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `type`           | *"response.output\_text.done"*                                                        | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                                                                              | :heavy\_check\_mark: | N/A         |
| `itemId`         | *string*                                                                              | :heavy\_check\_mark: | N/A         |
| `contentIndex`   | *number*                                                                              | :heavy\_check\_mark: | N/A         |
| `text`           | *string*                                                                              | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                                                                              | :heavy\_check\_mark: | N/A         |
| `logprobs`       | [models.OpenResponsesLogProbs](/agent-sdk/typescript/models/openresponseslogprobs)\[] | :heavy\_check\_mark: | N/A         |
