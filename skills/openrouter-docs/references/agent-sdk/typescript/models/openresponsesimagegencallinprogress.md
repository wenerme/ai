> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesImageGenCallInProgress - TypeScript SDK

> OpenResponsesImageGenCallInProgress method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Image generation call in progress

## Example Usage

```typescript lines theme={null}
import { OpenResponsesImageGenCallInProgress } from "@openrouter/sdk/models";

let value: OpenResponsesImageGenCallInProgress = {
  type: "response.image_generation_call.in_progress",
  itemId: "<id>",
  outputIndex: 9914.45,
  sequenceNumber: 0,
};
```

## Fields

| Field            | Type                                              | Required             | Description |
| ---------------- | ------------------------------------------------- | -------------------- | ----------- |
| `type`           | *"response.image\_generation\_call.in\_progress"* | :heavy\_check\_mark: | N/A         |
| `itemId`         | *string*                                          | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                                          | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                                          | :heavy\_check\_mark: | N/A         |
