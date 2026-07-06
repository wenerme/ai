> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesStreamEventResponseContentPartAdded - TypeScript SDK

> OpenResponsesStreamEventResponseContentPartAdded method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when a new content part is added to an output item

## Example Usage

```typescript lines theme={null}
import { OpenResponsesStreamEventResponseContentPartAdded } from "@openrouter/sdk/models";

let value: OpenResponsesStreamEventResponseContentPartAdded = {
  type: "response.content_part.added",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  part: {
    type: "output_text",
    text: "",
  },
  sequenceNumber: 3,
};
```

## Fields

| Field            | Type                             | Required             | Description |
| ---------------- | -------------------------------- | -------------------- | ----------- |
| `type`           | *"response.content\_part.added"* | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                         | :heavy\_check\_mark: | N/A         |
| `itemId`         | *string*                         | :heavy\_check\_mark: | N/A         |
| `contentIndex`   | *number*                         | :heavy\_check\_mark: | N/A         |
| `part`           | *models.Part1*                   | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                         | :heavy\_check\_mark: | N/A         |
