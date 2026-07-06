> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatGenerationParamsPluginFileParser - TypeScript SDK

> ChatGenerationParamsPluginFileParser method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ChatGenerationParamsPluginFileParser } from "@openrouter/sdk/models";

let value: ChatGenerationParamsPluginFileParser = {
  id: "file-parser",
};
```

## Fields

| Field     | Type                                           | Required             | Description |
| --------- | ---------------------------------------------- | -------------------- | ----------- |
| `id`      | *"file-parser"*                                | :heavy\_check\_mark: | N/A         |
| `enabled` | *boolean*                                      | :heavy\_minus\_sign: | N/A         |
| `pdf`     | [models.Pdf](/agent-sdk/typescript/models/pdf) | :heavy\_minus\_sign: | N/A         |
