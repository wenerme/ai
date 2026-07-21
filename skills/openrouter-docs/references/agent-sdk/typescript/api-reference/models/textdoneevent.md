> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# TextDoneEvent - TypeScript SDK

> TextDoneEvent type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when text streaming is complete

## Example Usage

```typescript lines theme={null}
import { TextDoneEvent } from "@openrouter/sdk/models";

let value: TextDoneEvent = {
  contentIndex: 541485,
  itemId: "<id>",
  logprobs: [
    {
      logprob: -0.5,
      token: "Hello",
    },
  ],
  outputIndex: 497734,
  sequenceNumber: 0,
  text: "<value>",
  type: "response.output_text.done",
};
```

## Fields

| Field            | Type                                                                                | Required             | Description |
| ---------------- | ----------------------------------------------------------------------------------- | -------------------- | ----------- |
| `contentIndex`   | *number*                                                                            | :heavy\_check\_mark: | N/A         |
| `itemId`         | *string*                                                                            | :heavy\_check\_mark: | N/A         |
| `logprobs`       | [models.StreamLogprob](/docs/agent-sdk/typescript/api-reference/models/streamlogprob)\[] | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                                                                            | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                                                                            | :heavy\_check\_mark: | N/A         |
| `text`           | *string*                                                                            | :heavy\_check\_mark: | N/A         |
| `type`           | *"response.output\_text.done"*                                                      | :heavy\_check\_mark: | N/A         |
