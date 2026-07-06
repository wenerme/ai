> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# GenerationContentDataOutput - TypeScript SDK

> GenerationContentDataOutput type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

The output from the generation

## Example Usage

```typescript lines theme={null}
import { GenerationContentDataOutput } from "@openrouter/sdk/models";

let value: GenerationContentDataOutput = {
  completion: "The meaning of life is a philosophical question...",
  reasoning: null,
};
```

## Fields

| Field        | Type     | Required             | Description                       | Example                                            |
| ------------ | -------- | -------------------- | --------------------------------- | -------------------------------------------------- |
| `completion` | *string* | :heavy\_check\_mark: | The completion output             | The meaning of life is a philosophical question... |
| `reasoning`  | *string* | :heavy\_check\_mark: | Reasoning/thinking output, if any | `<nil>`                                            |
