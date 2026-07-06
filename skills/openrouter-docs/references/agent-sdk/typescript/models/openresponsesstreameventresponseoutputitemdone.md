> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesStreamEventResponseOutputItemDone - TypeScript SDK

> OpenResponsesStreamEventResponseOutputItemDone method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when an output item is complete

## Example Usage

```typescript lines theme={null}
import { OpenResponsesStreamEventResponseOutputItemDone } from "@openrouter/sdk/models";

let value: OpenResponsesStreamEventResponseOutputItemDone = {
  type: "response.output_item.done",
  outputIndex: 0,
  item: {
    id: "item-1",
    role: "assistant",
    type: "message",
    content: [
      {
        type: "output_text",
        text: "Hello! How can I help you?",
      },
    ],
  },
  sequenceNumber: 8,
};
```

## Fields

| Field            | Type                           | Required             | Description                      | Example                                                                                                                                                                        |
| ---------------- | ------------------------------ | -------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`           | *"response.output\_item.done"* | :heavy\_check\_mark: | N/A                              |                                                                                                                                                                                |
| `outputIndex`    | *number*                       | :heavy\_check\_mark: | N/A                              |                                                                                                                                                                                |
| `item`           | *models.ResponsesOutputItem*   | :heavy\_check\_mark: | An output item from the response | `{"id": "msg-abc123","role": "assistant","type": "message","status": "completed","content": [{"type": "output_text","text": "Hello! How can I help you today?"}`<br />]<br />} |
| `sequenceNumber` | *number*                       | :heavy\_check\_mark: | N/A                              |                                                                                                                                                                                |
