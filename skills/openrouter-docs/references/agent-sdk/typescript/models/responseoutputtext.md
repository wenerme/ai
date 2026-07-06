> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ResponseOutputText - TypeScript SDK

> ResponseOutputText method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ResponseOutputText } from "@openrouter/sdk/models";

let value: ResponseOutputText = {
  type: "output_text",
  text: "The capital of France is Paris.",
};
```

## Fields

| Field         | Type                                                      | Required             | Description |
| ------------- | --------------------------------------------------------- | -------------------- | ----------- |
| `type`        | *"output\_text"*                                          | :heavy\_check\_mark: | N/A         |
| `text`        | *string*                                                  | :heavy\_check\_mark: | N/A         |
| `annotations` | *models.OpenAIResponsesAnnotation*\[]                     | :heavy\_minus\_sign: | N/A         |
| `logprobs`    | [models.Logprob](/agent-sdk/typescript/models/logprob)\[] | :heavy\_minus\_sign: | N/A         |
