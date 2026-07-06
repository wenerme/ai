> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# StreamEventsResponseOutputItemDone - TypeScript SDK

> StreamEventsResponseOutputItemDone type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when an output item is complete

## Example Usage

```typescript lines theme={null}
import { StreamEventsResponseOutputItemDone } from "@openrouter/sdk/models";

let value: StreamEventsResponseOutputItemDone = {
  item: {
    content: [
      {
        text: "Hello! How can I help you today?",
        type: "output_text",
      },
    ],
    id: "msg-abc123",
    role: "assistant",
    type: "message",
  },
  outputIndex: 307595,
  sequenceNumber: 0,
  type: "response.output_item.done",
};
```

## Fields

| Field            | Type                           | Required             | Description                      | Example                                                                                                                                                                                                |
| ---------------- | ------------------------------ | -------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `item`           | *models.OutputItems*           | :heavy\_check\_mark: | An output item from the response | `{"content": [{"text": "Hello! How can I help you today?","type": "output_text"}`<br />],<br />"id": "msg-abc123",<br />"role": "assistant",<br />"status": "completed",<br />"type": "message"<br />} |
| `outputIndex`    | *number*                       | :heavy\_check\_mark: | N/A                              |                                                                                                                                                                                                        |
| `sequenceNumber` | *number*                       | :heavy\_check\_mark: | N/A                              |                                                                                                                                                                                                        |
| `type`           | *"response.output\_item.done"* | :heavy\_check\_mark: | N/A                              |                                                                                                                                                                                                        |
