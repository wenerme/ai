> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatContentFile - TypeScript SDK

> ChatContentFile type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

File content part for document processing

## Example Usage

```typescript lines theme={null}
import { ChatContentFile } from "@openrouter/sdk/models";

let value: ChatContentFile = {
  file: {},
  type: "file",
};
```

## Fields

| Field  | Type                                                             | Required             | Description |
| ------ | ---------------------------------------------------------------- | -------------------- | ----------- |
| `file` | [models.FileT](/agent-sdk/typescript/api-reference/models/filet) | :heavy\_check\_mark: | N/A         |
| `type` | *"file"*                                                         | :heavy\_check\_mark: | N/A         |
