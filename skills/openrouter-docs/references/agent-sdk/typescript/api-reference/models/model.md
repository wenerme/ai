> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Model - TypeScript SDK

> Model type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Information about an AI model available on OpenRouter

## Example Usage

```typescript expandable lines theme={null}
import { Model } from "@openrouter/sdk/models";

let value: Model = {
  architecture: {
    inputModalities: [
      "text",
    ],
    modality: "text->text",
    outputModalities: [
      "text",
    ],
  },
  canonicalSlug: "openai/gpt-4",
  contextLength: 8192,
  created: 1692901234,
  defaultParameters: null,
  id: "openai/gpt-4",
  links: {
    details: "/api/v1/models/openai/gpt-5.4/endpoints",
  },
  name: "GPT-4",
  perRequestLimits: null,
  pricing: {
    completion: "0.00006",
    prompt: "0.00003",
  },
  supportedParameters: [
    "temperature",
    "top_p",
    "max_tokens",
  ],
  supportedVoices: null,
  topProvider: {
    isModerated: true,
  },
};
```

## Fields

| Field                 | Type                                                                                     | Required             | Description                                                                                                | Example                                                                                                                                   |
| --------------------- | ---------------------------------------------------------------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `architecture`        | [models.ModelArchitecture](/docs/agent-sdk/typescript/api-reference/models/modelarchitecture) | :heavy\_check\_mark: | Model architecture information                                                                             | `{"input_modalities": ["text"],"instruct_type": "chatml","modality": "text-\u003etext","output_modalities": ["text"],"tokenizer": "GPT"}` |
| `canonicalSlug`       | *string*                                                                                 | :heavy\_check\_mark: | Canonical slug for the model                                                                               | openai/gpt-4                                                                                                                              |
| `contextLength`       | *number*                                                                                 | :heavy\_check\_mark: | Maximum context length in tokens                                                                           | 8192                                                                                                                                      |
| `created`             | *number*                                                                                 | :heavy\_check\_mark: | Unix timestamp of when the model was created                                                               | 1692901234                                                                                                                                |
| `defaultParameters`   | [models.DefaultParameters](/docs/agent-sdk/typescript/api-reference/models/defaultparameters) | :heavy\_check\_mark: | Default parameters for this model                                                                          | `{"frequency_penalty": 0,"presence_penalty": 0,"repetition_penalty": 1,"temperature": 0.7,"top_k": 0,"top_p": 0.9}`                       |
| `description`         | *string*                                                                                 | :heavy\_minus\_sign: | Description of the model                                                                                   | GPT-4 is a large multimodal model that can solve difficult problems with greater accuracy.                                                |
| `expirationDate`      | *string*                                                                                 | :heavy\_minus\_sign: | The date after which the model may be removed. ISO 8601 date string (YYYY-MM-DD) or null if no expiration. | 2025-06-01                                                                                                                                |
| `huggingFaceId`       | *string*                                                                                 | :heavy\_minus\_sign: | Hugging Face model identifier, if applicable                                                               | microsoft/DialoGPT-medium                                                                                                                 |
| `id`                  | *string*                                                                                 | :heavy\_check\_mark: | Unique identifier for the model                                                                            | openai/gpt-4                                                                                                                              |
| `knowledgeCutoff`     | *string*                                                                                 | :heavy\_minus\_sign: | The date up to which the model was trained on data. ISO 8601 date string (YYYY-MM-DD) or null if unknown.  | 2024-10-01                                                                                                                                |
| `links`               | [models.ModelLinks](/docs/agent-sdk/typescript/api-reference/models/modellinks)               | :heavy\_check\_mark: | Related API endpoints and resources for this model.                                                        | `{"details": "/api/v1/models/openai/gpt-5.4/endpoints"}`                                                                                  |
| `name`                | *string*                                                                                 | :heavy\_check\_mark: | Display name of the model                                                                                  | GPT-4                                                                                                                                     |
| `perRequestLimits`    | [models.PerRequestLimits](/docs/agent-sdk/typescript/api-reference/models/perrequestlimits)   | :heavy\_check\_mark: | Per-request token limits                                                                                   | `{"completion_tokens": 1000,"prompt_tokens": 1000}`                                                                                       |
| `pricing`             | [models.PublicPricing](/docs/agent-sdk/typescript/api-reference/models/publicpricing)         | :heavy\_check\_mark: | Pricing information for the model                                                                          | `{"completion": "0.00006","image": "0","prompt": "0.00003","request": "0"}`                                                               |
| `supportedParameters` | [models.Parameter](/docs/agent-sdk/typescript/api-reference/models/parameter)\[]              | :heavy\_check\_mark: | List of supported parameters for this model                                                                |                                                                                                                                           |
| `supportedVoices`     | *string*\[]                                                                              | :heavy\_check\_mark: | List of supported voice identifiers for TTS models. Null for non-TTS models.                               | `<nil>`                                                                                                                                   |
| `topProvider`         | [models.TopProviderInfo](/docs/agent-sdk/typescript/api-reference/models/topproviderinfo)     | :heavy\_check\_mark: | Information about the top provider for this model                                                          | `{"context_length": 8192,"is_moderated": true,"max_completion_tokens": 4096}`                                                             |
