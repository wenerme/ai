> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ModelsListResponse - TypeScript SDK

> ModelsListResponse method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

List of available models

## Example Usage

```typescript expandable lines theme={null}
import { ModelsListResponse } from "@openrouter/sdk/models";

let value: ModelsListResponse = {
  data: [
    {
      id: "openai/gpt-4",
      canonicalSlug: "openai/gpt-4",
      name: "GPT-4",
      created: 1692901234,
      pricing: {
        prompt: "0.00003",
        completion: "0.00006",
      },
      contextLength: 8192,
      architecture: {
        modality: "text->text",
        inputModalities: [
          "text",
        ],
        outputModalities: [
          "text",
        ],
      },
      topProvider: {
        isModerated: true,
      },
      perRequestLimits: null,
      supportedParameters: [
        "temperature",
        "top_p",
        "max_tokens",
        "frequency_penalty",
        "presence_penalty",
      ],
      defaultParameters: null,
    },
  ],
};
```

## Fields

| Field  | Type                                                  | Required             | Description              |
| ------ | ----------------------------------------------------- | -------------------- | ------------------------ |
| `data` | [models.Model](/docs/agent-sdk/typescript/models/model)\[] | :heavy\_check\_mark: | List of available models |
