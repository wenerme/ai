> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesImageGenCallCompleted - TypeScript SDK

> OpenResponsesImageGenCallCompleted method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Image generation call completed

## Example Usage

```typescript lines theme={null}
import { OpenResponsesImageGenCallCompleted } from "@openrouter/sdk/models";

let value: OpenResponsesImageGenCallCompleted = {
  type: "response.image_generation_call.completed",
  itemId: "<id>",
  outputIndex: 3469.55,
  sequenceNumber: 0,
};
```

## Fields

| Field            | Type                                           | Required             | Description |
| ---------------- | ---------------------------------------------- | -------------------- | ----------- |
| `type`           | *"response.image\_generation\_call.completed"* | :heavy\_check\_mark: | N/A         |
| `itemId`         | *string*                                       | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                                       | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                                       | :heavy\_check\_mark: | N/A         |
