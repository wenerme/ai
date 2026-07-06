> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputImageGenerationServerToolItem - TypeScript SDK

> OutputImageGenerationServerToolItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

An openrouter:image\_generation server tool output item

## Example Usage

```typescript lines theme={null}
import { OutputImageGenerationServerToolItem } from "@openrouter/sdk/models";

let value: OutputImageGenerationServerToolItem = {
  status: "completed",
  type: "openrouter:image_generation",
};
```

## Fields

| Field           | Type                                                                                                                                 | Required             | Description                                                                                           | Example   |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------- | --------- |
| `id`            | *string*                                                                                                                             | :heavy\_minus\_sign: | N/A                                                                                                   |           |
| `imageB64`      | *string*                                                                                                                             | :heavy\_minus\_sign: | N/A                                                                                                   |           |
| `imageUrl`      | *string*                                                                                                                             | :heavy\_minus\_sign: | N/A                                                                                                   |           |
| `result`        | *string*                                                                                                                             | :heavy\_minus\_sign: | The generated image as a base64-encoded string or URL, matching OpenAI image\_generation\_call format |           |
| `revisedPrompt` | *string*                                                                                                                             | :heavy\_minus\_sign: | N/A                                                                                                   |           |
| `status`        | [models.ToolCallStatus](/agent-sdk/typescript/api-reference/models/toolcallstatus)                                                   | :heavy\_check\_mark: | N/A                                                                                                   | completed |
| `type`          | [models.OutputImageGenerationServerToolItemType](/agent-sdk/typescript/api-reference/models/outputimagegenerationservertoolitemtype) | :heavy\_check\_mark: | N/A                                                                                                   |           |
