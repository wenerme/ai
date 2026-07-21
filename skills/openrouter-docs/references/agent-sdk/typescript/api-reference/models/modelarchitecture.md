> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ModelArchitecture - TypeScript SDK

> ModelArchitecture type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Model architecture information

## Example Usage

```typescript lines theme={null}
import { ModelArchitecture } from "@openrouter/sdk/models";

let value: ModelArchitecture = {
  inputModalities: [
    "text",
  ],
  modality: "text->text",
  outputModalities: [
    "text",
  ],
};
```

## Fields

| Field              | Type                                                                                                             | Required             | Description                      | Example    |
| ------------------ | ---------------------------------------------------------------------------------------------------------------- | -------------------- | -------------------------------- | ---------- |
| `inputModalities`  | [models.InputModality](/docs/agent-sdk/typescript/api-reference/models/inputmodality)\[]                              | :heavy\_check\_mark: | Supported input modalities       |            |
| `instructType`     | [models.ModelArchitectureInstructType](/docs/agent-sdk/typescript/api-reference/models/modelarchitectureinstructtype) | :heavy\_minus\_sign: | Instruction format type          | chatml     |
| `modality`         | *string*                                                                                                         | :heavy\_check\_mark: | Primary modality of the model    | text->text |
| `outputModalities` | [models.OutputModality](/docs/agent-sdk/typescript/api-reference/models/outputmodality)\[]                            | :heavy\_check\_mark: | Supported output modalities      |            |
| `tokenizer`        | [models.ModelGroup](/docs/agent-sdk/typescript/api-reference/models/modelgroup)                                       | :heavy\_minus\_sign: | Tokenizer type used by the model | GPT        |
