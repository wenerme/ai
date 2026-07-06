> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ModelArchitecture - TypeScript SDK

> ModelArchitecture method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Model architecture information

## Example Usage

```typescript lines theme={null}
import { ModelArchitecture } from "@openrouter/sdk/models";

let value: ModelArchitecture = {
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

| Field              | Type                                                                                               | Required             | Description                      | Example    |
| ------------------ | -------------------------------------------------------------------------------------------------- | -------------------- | -------------------------------- | ---------- |
| `tokenizer`        | [models.ModelGroup](/agent-sdk/typescript/models/modelgroup)                                       | :heavy\_minus\_sign: | Tokenizer type used by the model | GPT        |
| `instructType`     | [models.ModelArchitectureInstructType](/agent-sdk/typescript/models/modelarchitectureinstructtype) | :heavy\_minus\_sign: | Instruction format type          | chatml     |
| `modality`         | *string*                                                                                           | :heavy\_check\_mark: | Primary modality of the model    | text->text |
| `inputModalities`  | [models.InputModality](/agent-sdk/typescript/models/inputmodality)\[]                              | :heavy\_check\_mark: | Supported input modalities       |            |
| `outputModalities` | [models.OutputModality](/agent-sdk/typescript/models/outputmodality)\[]                            | :heavy\_check\_mark: | Supported output modalities      |            |
