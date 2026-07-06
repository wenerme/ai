> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# GenerationContentData - TypeScript SDK

> GenerationContentData type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Stored prompt and completion content

## Example Usage

```typescript lines theme={null}
import { GenerationContentData } from "@openrouter/sdk/models";

let value: GenerationContentData = {
  input: {
    messages: [
      {
        "content": "What is the meaning of life?",
        "role": "user",
      },
    ],
  },
  output: {
    completion: "The meaning of life is a philosophical question...",
    reasoning: null,
  },
};
```

## Fields

| Field    | Type                                                                                                         | Required             | Description                                                                  |
| -------- | ------------------------------------------------------------------------------------------------------------ | -------------------- | ---------------------------------------------------------------------------- |
| `input`  | *models.InputUnion*                                                                                          | :heavy\_check\_mark: | The input to the generation — either a prompt string or an array of messages |
| `output` | [models.GenerationContentDataOutput](/agent-sdk/typescript/api-reference/models/generationcontentdataoutput) | :heavy\_check\_mark: | The output from the generation                                               |
