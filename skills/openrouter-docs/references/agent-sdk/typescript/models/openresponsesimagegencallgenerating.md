> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesImageGenCallGenerating - TypeScript SDK

> OpenResponsesImageGenCallGenerating method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Image generation call is generating

## Example Usage

```typescript lines theme={null}
import { OpenResponsesImageGenCallGenerating } from "@openrouter/sdk/models";

let value: OpenResponsesImageGenCallGenerating = {
  type: "response.image_generation_call.generating",
  itemId: "<id>",
  outputIndex: 7977.54,
  sequenceNumber: 0,
};
```

## Fields

| Field            | Type                                            | Required             | Description |
| ---------------- | ----------------------------------------------- | -------------------- | ----------- |
| `type`           | *"response.image\_generation\_call.generating"* | :heavy\_check\_mark: | N/A         |
| `itemId`         | *string*                                        | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                                        | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                                        | :heavy\_check\_mark: | N/A         |
