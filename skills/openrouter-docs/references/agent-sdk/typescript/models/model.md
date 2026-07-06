> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Model - TypeScript SDK

> Model method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Information about an AI model available on OpenRouter

## Example Usage

```typescript expandable lines theme={null}
import { Model } from "@openrouter/sdk/models";

let value: Model = {
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
  ],
  defaultParameters: null,
};
```

## Fields

| Field                 | Type                                                                       | Required             | Description                                                                                                | Example                                                                                                                                   |
| --------------------- | -------------------------------------------------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                  | *string*                                                                   | :heavy\_check\_mark: | Unique identifier for the model                                                                            | openai/gpt-4                                                                                                                              |
| `canonicalSlug`       | *string*                                                                   | :heavy\_check\_mark: | Canonical slug for the model                                                                               | openai/gpt-4                                                                                                                              |
| `huggingFaceId`       | *string*                                                                   | :heavy\_minus\_sign: | Hugging Face model identifier, if applicable                                                               | microsoft/DialoGPT-medium                                                                                                                 |
| `name`                | *string*                                                                   | :heavy\_check\_mark: | Display name of the model                                                                                  | GPT-4                                                                                                                                     |
| `created`             | *number*                                                                   | :heavy\_check\_mark: | Unix timestamp of when the model was created                                                               | 1692901234                                                                                                                                |
| `description`         | *string*                                                                   | :heavy\_minus\_sign: | Description of the model                                                                                   | GPT-4 is a large multimodal model that can solve difficult problems with greater accuracy.                                                |
| `pricing`             | [models.PublicPricing](/agent-sdk/typescript/models/publicpricing)         | :heavy\_check\_mark: | Pricing information for the model                                                                          | `{"prompt": "0.00003","completion": "0.00006","request": "0","image": "0"}`                                                               |
| `contextLength`       | *number*                                                                   | :heavy\_check\_mark: | Maximum context length in tokens                                                                           | 8192                                                                                                                                      |
| `architecture`        | [models.ModelArchitecture](/agent-sdk/typescript/models/modelarchitecture) | :heavy\_check\_mark: | Model architecture information                                                                             | `{"tokenizer": "GPT","instruct_type": "chatml","modality": "text-\u003etext","input_modalities": ["text"],"output_modalities": ["text"]}` |
| `topProvider`         | [models.TopProviderInfo](/agent-sdk/typescript/models/topproviderinfo)     | :heavy\_check\_mark: | Information about the top provider for this model                                                          | `{"context_length": 8192,"max_completion_tokens": 4096,"is_moderated": true}`                                                             |
| `perRequestLimits`    | [models.PerRequestLimits](/agent-sdk/typescript/models/perrequestlimits)   | :heavy\_check\_mark: | Per-request token limits                                                                                   | `{"prompt_tokens": 1000,"completion_tokens": 1000}`                                                                                       |
| `supportedParameters` | [models.Parameter](/agent-sdk/typescript/models/parameter)\[]              | :heavy\_check\_mark: | List of supported parameters for this model                                                                |                                                                                                                                           |
| `defaultParameters`   | [models.DefaultParameters](/agent-sdk/typescript/models/defaultparameters) | :heavy\_check\_mark: | Default parameters for this model                                                                          | `{"temperature": 0.7,"top_p": 0.9,"frequency_penalty": 0}`                                                                                |
| `expirationDate`      | *string*                                                                   | :heavy\_minus\_sign: | The date after which the model may be removed. ISO 8601 date string (YYYY-MM-DD) or null if no expiration. | 2025-06-01                                                                                                                                |
