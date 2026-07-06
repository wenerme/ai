> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ContentPartInputFile - TypeScript SDK

> ContentPartInputFile type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ContentPartInputFile } from "@openrouter/sdk/models";

let value: ContentPartInputFile = {
  inputFile: {
    data: "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMyAw...",
  },
  type: "input_file",
};
```

## Fields

| Field       | Type                                                                                 | Required             | Description | Example                                                                            |
| ----------- | ------------------------------------------------------------------------------------ | -------------------- | ----------- | ---------------------------------------------------------------------------------- |
| `inputFile` | [models.MultimodalMedia](/agent-sdk/typescript/api-reference/models/multimodalmedia) | :heavy\_check\_mark: | N/A         | `{"data": "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAA...","format": "wav"}` |
| `type`      | *"input\_file"*                                                                      | :heavy\_check\_mark: | N/A         |                                                                                    |
