> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ListEndpointsResponse - TypeScript SDK

> ListEndpointsResponse type definition

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
  },
};
```

## Fields

| Field  | Type                                                                                             | Required             | Description                             | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------ | ------------------------------------------------------------------------------------------------ | -------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data` | [models.ListEndpointsResponse](/agent-sdk/typescript/api-reference/models/listendpointsresponse) | :heavy\_check\_mark: | List of available endpoints for a model | `{"architecture": {"input_modalities": ["text"],"instruct_type": "chatml","modality": "text-\u003etext","output_modalities": ["text"],"tokenizer": "GPT"}`,<br />"created": 1692901234,<br />"description": "GPT-4 is a large multimodal model that can solve difficult problems with greater accuracy.",<br />"endpoints": \[<br />`{"context_length": 8192,"latency_last_30m": {"p50": 0.25,"p75": 0.35,"p90": 0.48,"p99": 0.85}`,<br />"max\_completion\_tokens": 4096,<br />"max\_prompt\_tokens": 8192,<br />"model\_name": "GPT-4",<br />"name": "OpenAI: GPT-4",<br />"pricing": `{"completion": "0.00006","image": "0","prompt": "0.00003","request": "0"}`,<br />"provider\_name": "OpenAI",<br />"quantization": "fp16",<br />"status": "default",<br />"supported\_parameters": \[<br />"temperature",<br />"top\_p",<br />"max\_tokens",<br />"frequency\_penalty",<br />"presence\_penalty"<br />],<br />"supports\_implicit\_caching": true,<br />"tag": "openai",<br />"throughput\_last\_30m": `{"p50": 45.2,"p75": 38.5,"p90": 28.3,"p99": 15.1}`,<br />"uptime\_last\_1d": 99.8,<br />"uptime\_last\_30m": 99.5,<br />"uptime\_last\_5m": `100<br/>`}<br />],<br />"id": "openai/gpt-4",<br />"name": "GPT-4"<br />} |
