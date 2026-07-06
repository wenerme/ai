> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesStreamEventResponseOutputTextAnnotationAdded - TypeScript SDK

> OpenResponsesStreamEventResponseOutputTextAnnotationAdded method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when a text annotation is added to output

## Example Usage

```typescript lines theme={null}
import { OpenResponsesStreamEventResponseOutputTextAnnotationAdded } from "@openrouter/sdk/models";

let value: OpenResponsesStreamEventResponseOutputTextAnnotationAdded = {
  type: "response.output_text.annotation.added",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  sequenceNumber: 5,
  annotationIndex: 0,
  annotation: {
    type: "url_citation",
    url: "https://example.com",
    title: "Example",
    startIndex: 0,
    endIndex: 7,
  },
};
```

## Fields

| Field             | Type                                       | Required             | Description |
| ----------------- | ------------------------------------------ | -------------------- | ----------- |
| `type`            | *"response.output\_text.annotation.added"* | :heavy\_check\_mark: | N/A         |
| `outputIndex`     | *number*                                   | :heavy\_check\_mark: | N/A         |
| `itemId`          | *string*                                   | :heavy\_check\_mark: | N/A         |
| `contentIndex`    | *number*                                   | :heavy\_check\_mark: | N/A         |
| `sequenceNumber`  | *number*                                   | :heavy\_check\_mark: | N/A         |
| `annotationIndex` | *number*                                   | :heavy\_check\_mark: | N/A         |
| `annotation`      | *models.OpenAIResponsesAnnotation*         | :heavy\_check\_mark: | N/A         |
