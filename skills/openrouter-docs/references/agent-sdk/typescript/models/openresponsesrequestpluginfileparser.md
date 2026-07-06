> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesRequestPluginFileParser - TypeScript SDK

> OpenResponsesRequestPluginFileParser method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { OpenResponsesRequestPluginFileParser } from "@openrouter/sdk/models";

let value: OpenResponsesRequestPluginFileParser = {
  id: "file-parser",
};
```

## Fields

| Field     | Type                                                                     | Required             | Description                                                                        |
| --------- | ------------------------------------------------------------------------ | -------------------- | ---------------------------------------------------------------------------------- |
| `id`      | *"file-parser"*                                                          | :heavy\_check\_mark: | N/A                                                                                |
| `enabled` | *boolean*                                                                | :heavy\_minus\_sign: | Set to false to disable the file-parser plugin for this request. Defaults to true. |
| `pdf`     | [models.PDFParserOptions](/agent-sdk/typescript/models/pdfparseroptions) | :heavy\_minus\_sign: | Options for PDF parsing.                                                           |
