> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# TextDeltaEvent - TypeScript SDK

> TextDeltaEvent type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when a text delta is streamed

## Example Usage

```typescript lines theme={null}
import { TextDeltaEvent } from "@openrouter/sdk/models";

let value: TextDeltaEvent = {
  contentIndex: 391056,
  delta: "<value>",
  itemId: "<id>",
  logprobs: [
    {
      logprob: -0.5,
      token: "Hello",
    },
  ],
  outputIndex: 776894,
  sequenceNumber: 0,
  type: "response.output_text.delta",
};
```

## Fields

| Field            | Type                                                                                | Required             | Description |
| ---------------- | ----------------------------------------------------------------------------------- | -------------------- | ----------- |
| `contentIndex`   | *number*                                                                            | :heavy\_check\_mark: | N/A         |
| `delta`          | *string*                                                                            | :heavy\_check\_mark: | N/A         |
| `itemId`         | *string*                                                                            | :heavy\_check\_mark: | N/A         |
| `logprobs`       | [models.StreamLogprob](/docs/agent-sdk/typescript/api-reference/models/streamlogprob)\[] | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                                                                            | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                                                                            | :heavy\_check\_mark: | N/A         |
| `type`           | *"response.output\_text.delta"*                                                     | :heavy\_check\_mark: | N/A         |
