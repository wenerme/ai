> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Architecture - TypeScript SDK

> Architecture type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Model architecture information

## Example Usage

```typescript lines theme={null}
import { Architecture } from "@openrouter/sdk/models";

let value: Architecture = {
  inputModalities: [
    "text",
  ],
  instructType: "chatml",
  modality: "text",
  outputModalities: [
    "text",
  ],
  tokenizer: "GPT",
};
```

## Fields

| Field              | Type                                                                                  | Required             | Description                   | Example |
| ------------------ | ------------------------------------------------------------------------------------- | -------------------- | ----------------------------- | ------- |
| `inputModalities`  | [models.InputModality](/agent-sdk/typescript/api-reference/models/inputmodality)\[]   | :heavy\_check\_mark: | Supported input modalities    |         |
| `instructType`     | [models.InstructType](/agent-sdk/typescript/api-reference/models/instructtype)        | :heavy\_check\_mark: | Instruction format type       | chatml  |
| `modality`         | *string*                                                                              | :heavy\_check\_mark: | Primary modality of the model | text    |
| `outputModalities` | [models.OutputModality](/agent-sdk/typescript/api-reference/models/outputmodality)\[] | :heavy\_check\_mark: | Supported output modalities   |         |
| `tokenizer`        | [models.Tokenizer](/agent-sdk/typescript/api-reference/models/tokenizer)              | :heavy\_check\_mark: | N/A                           | GPT     |
