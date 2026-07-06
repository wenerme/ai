> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ContentPartDoneEvent - TypeScript SDK

> ContentPartDoneEvent type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when a content part is complete

## Example Usage

```typescript lines theme={null}
import { ContentPartDoneEvent } from "@openrouter/sdk/models";

let value: ContentPartDoneEvent = {
  contentIndex: 928075,
  itemId: "<id>",
  outputIndex: 289472,
  part: {
    text: "The capital of France is Paris.",
    type: "output_text",
  },
  sequenceNumber: 0,
  type: "response.content_part.done",
};
```

## Fields

| Field            | Type                              | Required             | Description |
| ---------------- | --------------------------------- | -------------------- | ----------- |
| `contentIndex`   | *number*                          | :heavy\_check\_mark: | N/A         |
| `itemId`         | *string*                          | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                          | :heavy\_check\_mark: | N/A         |
| `part`           | *models.ContentPartDoneEventPart* | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                          | :heavy\_check\_mark: | N/A         |
| `type`           | *"response.content\_part.done"*   | :heavy\_check\_mark: | N/A         |
