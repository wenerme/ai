> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesStreamEventResponseContentPartDone - TypeScript SDK

> OpenResponsesStreamEventResponseContentPartDone method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when a content part is complete

## Example Usage

```typescript lines theme={null}
import { OpenResponsesStreamEventResponseContentPartDone } from "@openrouter/sdk/models";

let value: OpenResponsesStreamEventResponseContentPartDone = {
  type: "response.content_part.done",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  part: {
    type: "output_text",
    text: "Hello! How can I help you?",
  },
  sequenceNumber: 7,
};
```

## Fields

| Field            | Type                            | Required             | Description |
| ---------------- | ------------------------------- | -------------------- | ----------- |
| `type`           | *"response.content\_part.done"* | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                        | :heavy\_check\_mark: | N/A         |
| `itemId`         | *string*                        | :heavy\_check\_mark: | N/A         |
| `contentIndex`   | *number*                        | :heavy\_check\_mark: | N/A         |
| `part`           | *models.Part2*                  | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                        | :heavy\_check\_mark: | N/A         |
