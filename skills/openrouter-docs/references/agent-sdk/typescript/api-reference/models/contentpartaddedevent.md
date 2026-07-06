> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ContentPartAddedEvent - TypeScript SDK

> ContentPartAddedEvent type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when a new content part is added to an output item

## Example Usage

```typescript lines theme={null}
import { ContentPartAddedEvent } from "@openrouter/sdk/models";

let value: ContentPartAddedEvent = {
  contentIndex: 286298,
  itemId: "<id>",
  outputIndex: 549137,
  part: {
    text: "The capital of France is Paris.",
    type: "output_text",
  },
  sequenceNumber: 0,
  type: "response.content_part.added",
};
```

## Fields

| Field            | Type                               | Required             | Description |
| ---------------- | ---------------------------------- | -------------------- | ----------- |
| `contentIndex`   | *number*                           | :heavy\_check\_mark: | N/A         |
| `itemId`         | *string*                           | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                           | :heavy\_check\_mark: | N/A         |
| `part`           | *models.ContentPartAddedEventPart* | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                           | :heavy\_check\_mark: | N/A         |
| `type`           | *"response.content\_part.added"*   | :heavy\_check\_mark: | N/A         |
