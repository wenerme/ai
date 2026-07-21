> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ResponseOutputText - TypeScript SDK

> ResponseOutputText type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ResponseOutputText } from "@openrouter/sdk/models";

let value: ResponseOutputText = {
  text: "The capital of France is Paris.",
  type: "output_text",
};
```

## Fields

| Field         | Type                                                                    | Required             | Description |
| ------------- | ----------------------------------------------------------------------- | -------------------- | ----------- |
| `annotations` | *models.OpenAIResponsesAnnotation*\[]                                   | :heavy\_minus\_sign: | N/A         |
| `logprobs`    | [models.Logprob](/docs/agent-sdk/typescript/api-reference/models/logprob)\[] | :heavy\_minus\_sign: | N/A         |
| `text`        | *string*                                                                | :heavy\_check\_mark: | N/A         |
| `type`        | *"output\_text"*                                                        | :heavy\_check\_mark: | N/A         |
