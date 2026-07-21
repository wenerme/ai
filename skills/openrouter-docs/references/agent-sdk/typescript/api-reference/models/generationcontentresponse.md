> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# GenerationContentResponse - TypeScript SDK

> GenerationContentResponse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Stored prompt and completion content for a generation

## Example Usage

```typescript lines theme={null}
import { GenerationContentResponse } from "@openrouter/sdk/models";

let value: GenerationContentResponse = {
  data: {
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
  },
};
```

## Fields

| Field  | Type                                                                                             | Required             | Description                          | Example                                                                                                                                                                                                            |
| ------ | ------------------------------------------------------------------------------------------------ | -------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `data` | [models.GenerationContentData](/docs/agent-sdk/typescript/api-reference/models/generationcontentdata) | :heavy\_check\_mark: | Stored prompt and completion content | `{"input": {"messages": [{"content": "What is the meaning of life?","role": "user"}`<br />]<br />},<br />"output": `{"completion": "The meaning of life is a philosophical question...","reasoning": null}`<br />} |
