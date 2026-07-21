> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ListEndpointsResponse - TypeScript SDK

> ListEndpointsResponse method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Returns a list of endpoints

## Example Usage

```typescript expandable lines theme={null}
import { ListEndpointsResponse } from "@openrouter/sdk/models/operations";

let value: ListEndpointsResponse = {
  data: {
    id: "openai/gpt-4",
    name: "GPT-4",
    created: 1692901234,
    description:
      "GPT-4 is a large multimodal model that can solve difficult problems with greater accuracy.",
    architecture: {
      tokenizer: "GPT",
      instructType: "chatml",
      modality: "text->text",
      inputModalities: [
        "text",
      ],
      outputModalities: [
        "text",
      ],
    },
    endpoints: [
      {
        name: "OpenAI: GPT-4",
        modelName: "GPT-4",
        contextLength: 8192,
        pricing: {
          prompt: "0.00003",
          completion: "0.00006",
        },
        providerName: "OpenAI",
        tag: "openai",
        quantization: "fp16",
        maxCompletionTokens: 4096,
        maxPromptTokens: 8192,
        supportedParameters: [
          "temperature",
          "top_p",
          "max_tokens",
          "frequency_penalty",
          "presence_penalty",
        ],
        uptimeLast30m: 99.5,
        supportsImplicitCaching: true,
        latencyLast30m: {
          p50: 0.25,
          p75: 0.35,
          p90: 0.48,
          p99: 0.85,
        },
        throughputLast30m: {
          p50: 45.2,
          p75: 38.5,
          p90: 28.3,
          p99: 15.1,
        },
      },
    ],
  },
};
```

## Fields

| Field  | Type                                                                               | Required             | Description                             | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------ | ---------------------------------------------------------------------------------- | -------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data` | [models.ListEndpointsResponse](/docs/agent-sdk/typescript/models/listendpointsresponse) | :heavy\_check\_mark: | List of available endpoints for a model | `{"id": "openai/gpt-4","name": "GPT-4","created": 1692901234,"description": "GPT-4 is a large multimodal model that can solve difficult problems with greater accuracy.","architecture": {"tokenizer": "GPT","instruct_type": "chatml","modality": "text-\u003etext","input_modalities": ["text"],"output_modalities": ["text"]}`,<br />"endpoints": \[<br />`{"name": "OpenAI: GPT-4","model_name": "GPT-4","context_length": 8192,"pricing": {"prompt": "0.00003","completion": "0.00006","request": "0","image": "0"}`,<br />"provider\_name": "OpenAI",<br />"tag": "openai",<br />"quantization": "fp16",<br />"max\_completion\_tokens": 4096,<br />"max\_prompt\_tokens": 8192,<br />"supported\_parameters": \[<br />"temperature",<br />"top\_p",<br />"max\_tokens",<br />"frequency\_penalty",<br />"presence\_penalty"<br />],<br />"status": "default",<br />"uptime\_last\_30m": 99.5,<br />"supports\_implicit\_caching": true,<br />"latency\_last\_30m": `{"p50": 0.25,"p75": 0.35,"p90": 0.48,"p99": 0.85}`,<br />"throughput\_last\_30m": `{"p50": 45.2,"p75": 38.5,"p90": 28.3,"p99": 15.1}`<br />}<br />]<br />} |
