> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ListEndpointsResponse - TypeScript SDK

> ListEndpointsResponse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

List of available endpoints for a model

## Example Usage

```typescript expandable lines theme={null}
import { ListEndpointsResponse } from "@openrouter/sdk/models";

let value: ListEndpointsResponse = {
  architecture: {
    inputModalities: [
      "text",
    ],
    instructType: "chatml",
    modality: "text->text",
    outputModalities: [
      "text",
    ],
    tokenizer: "GPT",
  },
  created: 1692901234,
  description:
    "GPT-4 is a large multimodal model that can solve difficult problems with greater accuracy.",
  endpoints: [
    {
      contextLength: 8192,
      latencyLast30m: {
        p50: 0.25,
        p75: 0.35,
        p90: 0.48,
        p99: 0.85,
      },
      maxCompletionTokens: 4096,
      maxPromptTokens: 8192,
      modelId: "openai/gpt-4",
      modelName: "GPT-4",
      name: "OpenAI: GPT-4",
      pricing: {
        completion: "0.00006",
        prompt: "0.00003",
      },
      providerName: "OpenAI",
      quantization: "fp16",
      supportedParameters: [
        "temperature",
        "top_p",
        "max_tokens",
        "frequency_penalty",
        "presence_penalty",
      ],
      supportsImplicitCaching: true,
      tag: "openai",
      throughputLast30m: {
        p50: 45.2,
        p75: 38.5,
        p90: 28.3,
        p99: 15.1,
      },
      uptimeLast1d: 99.8,
      uptimeLast30m: 99.5,
      uptimeLast5m: 100,
    },
  ],
  id: "openai/gpt-4",
  name: "GPT-4",
};
```

## Fields

| Field          | Type                                                                                  | Required             | Description                                  | Example                                                                                    |
| -------------- | ------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `architecture` | [models.Architecture](/agent-sdk/typescript/api-reference/models/architecture)        | :heavy\_check\_mark: | N/A                                          | `{"instruct_type": "chatml","modality": "text","tokenizer": "GPT"}`                        |
| `created`      | *number*                                                                              | :heavy\_check\_mark: | Unix timestamp of when the model was created | 1692901234                                                                                 |
| `description`  | *string*                                                                              | :heavy\_check\_mark: | Description of the model                     | GPT-4 is a large multimodal model that can solve difficult problems with greater accuracy. |
| `endpoints`    | [models.PublicEndpoint](/agent-sdk/typescript/api-reference/models/publicendpoint)\[] | :heavy\_check\_mark: | List of available endpoints for this model   |                                                                                            |
| `id`           | *string*                                                                              | :heavy\_check\_mark: | Unique identifier for the model              | openai/gpt-4                                                                               |
| `name`         | *string*                                                                              | :heavy\_check\_mark: | Display name of the model                    | GPT-4                                                                                      |
