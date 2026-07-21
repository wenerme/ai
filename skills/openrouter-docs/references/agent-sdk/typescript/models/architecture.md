> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Architecture - TypeScript SDK

> Architecture method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Model architecture information

## Example Usage

```typescript lines theme={null}
import { Architecture } from "@openrouter/sdk/models";

let value: Architecture = {
  tokenizer: "GPT",
  instructType: "chatml",
  modality: "text->text",
  inputModalities: [
    "text",
  ],
  outputModalities: [
    "text",
  ],
};
```

## Fields

| Field              | Type                                                                    | Required             | Description                   | Example |
| ------------------ | ----------------------------------------------------------------------- | -------------------- | ----------------------------- | ------- |
| `tokenizer`        | [models.Tokenizer](/docs/agent-sdk/typescript/models/tokenizer)              | :heavy\_check\_mark: | N/A                           | GPT     |
| `instructType`     | [models.InstructType](/docs/agent-sdk/typescript/models/instructtype)        | :heavy\_check\_mark: | Instruction format type       |         |
| `modality`         | *string*                                                                | :heavy\_check\_mark: | Primary modality of the model | text    |
| `inputModalities`  | [models.InputModality](/docs/agent-sdk/typescript/models/inputmodality)\[]   | :heavy\_check\_mark: | Supported input modalities    |         |
| `outputModalities` | [models.OutputModality](/docs/agent-sdk/typescript/models/outputmodality)\[] | :heavy\_check\_mark: | Supported output modalities   |         |
