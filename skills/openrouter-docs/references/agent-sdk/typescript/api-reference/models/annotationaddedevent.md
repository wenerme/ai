> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# AnnotationAddedEvent - TypeScript SDK

> AnnotationAddedEvent type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when a text annotation is added to output

## Example Usage

```typescript lines theme={null}
import { AnnotationAddedEvent } from "@openrouter/sdk/models";

let value: AnnotationAddedEvent = {
  annotation: {
    fileId: "file-abc123",
    filename: "research_paper.pdf",
    index: 0,
    type: "file_citation",
  },
  annotationIndex: 601849,
  contentIndex: 735383,
  itemId: "<id>",
  outputIndex: 124913,
  sequenceNumber: 0,
  type: "response.output_text.annotation.added",
};
```

## Fields

| Field             | Type                                       | Required             | Description | Example                                                                                          |
| ----------------- | ------------------------------------------ | -------------------- | ----------- | ------------------------------------------------------------------------------------------------ |
| `annotation`      | *models.OpenAIResponsesAnnotation*         | :heavy\_check\_mark: | N/A         | `{"file_id": "file-abc123","filename": "research_paper.pdf","index": 0,"type": "file_citation"}` |
| `annotationIndex` | *number*                                   | :heavy\_check\_mark: | N/A         |                                                                                                  |
| `contentIndex`    | *number*                                   | :heavy\_check\_mark: | N/A         |                                                                                                  |
| `itemId`          | *string*                                   | :heavy\_check\_mark: | N/A         |                                                                                                  |
| `outputIndex`     | *number*                                   | :heavy\_check\_mark: | N/A         |                                                                                                  |
| `sequenceNumber`  | *number*                                   | :heavy\_check\_mark: | N/A         |                                                                                                  |
| `type`            | *"response.output\_text.annotation.added"* | :heavy\_check\_mark: | N/A         |                                                                                                  |
