> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# PDFParserOptions - TypeScript SDK

> PDFParserOptions method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Options for PDF parsing.

## Example Usage

```typescript lines theme={null}
import { PDFParserOptions } from "@openrouter/sdk/models";

let value: PDFParserOptions = {};
```

## Fields

| Field    | Type                                                                   | Required             | Description                              |
| -------- | ---------------------------------------------------------------------- | -------------------- | ---------------------------------------- |
| `engine` | [models.PDFParserEngine](/docs/agent-sdk/typescript/models/pdfparserengine) | :heavy\_minus\_sign: | The engine to use for parsing PDF files. |
