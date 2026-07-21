> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ModelsListResponse - TypeScript SDK

> ModelsListResponse type definition

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
        "frequency_penalty",
        "presence_penalty",
      ],
      supportedVoices: null,
      topProvider: {
        isModerated: true,
      },
    },
  ],
};
```

## Fields

| Field  | Type                                                                | Required             | Description              | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------ | ------------------------------------------------------------------- | -------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data` | [models.Model](/docs/agent-sdk/typescript/api-reference/models/model)\[] | :heavy\_check\_mark: | List of available models | \[<br />`{"architecture": {"input_modalities": ["text"],"instruct_type": "chatml","modality": "text-\u003etext","output_modalities": ["text"],"tokenizer": "GPT"}`,<br />"canonical\_slug": "openai/gpt-4",<br />"context\_length": 8192,<br />"created": 1692901234,<br />"default\_parameters": null,<br />"description": "GPT-4 is a large multimodal model that can solve difficult problems with greater accuracy.",<br />"expiration\_date": null,<br />"id": "openai/gpt-4",<br />"knowledge\_cutoff": null,<br />"links": `{"details": "/api/v1/models/openai/gpt-5.4/endpoints"}`,<br />"name": "GPT-4",<br />"per\_request\_limits": null,<br />"pricing": `{"completion": "0.00006","image": "0","prompt": "0.00003","request": "0"}`,<br />"supported\_parameters": \[<br />"temperature",<br />"top\_p",<br />"max\_tokens"<br />],<br />"supported\_voices": null,<br />"top\_provider": `{"context_length": 8192,"is_moderated": true,"max_completion_tokens": 4096}`<br />}<br />] |
