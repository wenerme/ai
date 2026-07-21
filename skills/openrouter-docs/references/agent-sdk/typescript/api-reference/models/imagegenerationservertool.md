> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ImageGenerationServerTool - TypeScript SDK

> ImageGenerationServerTool type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Image generation tool configuration

## Example Usage

```typescript lines theme={null}
import { ImageGenerationServerTool } from "@openrouter/sdk/models";

let value: ImageGenerationServerTool = {
  type: "image_generation",
};
```

## Fields

| Field               | Type                                                                               | Required             | Description |
| ------------------- | ---------------------------------------------------------------------------------- | -------------------- | ----------- |
| `background`        | [models.Background](/docs/agent-sdk/typescript/api-reference/models/background)         | :heavy\_minus\_sign: | N/A         |
| `inputFidelity`     | [models.InputFidelity](/docs/agent-sdk/typescript/api-reference/models/inputfidelity)   | :heavy\_minus\_sign: | N/A         |
| `inputImageMask`    | [models.InputImageMask](/docs/agent-sdk/typescript/api-reference/models/inputimagemask) | :heavy\_minus\_sign: | N/A         |
| `model`             | [models.ModelEnum](/docs/agent-sdk/typescript/api-reference/models/modelenum)           | :heavy\_minus\_sign: | N/A         |
| `moderation`        | [models.Moderation](/docs/agent-sdk/typescript/api-reference/models/moderation)         | :heavy\_minus\_sign: | N/A         |
| `outputCompression` | *number*                                                                           | :heavy\_minus\_sign: | N/A         |
| `outputFormat`      | [models.OutputFormat](/docs/agent-sdk/typescript/api-reference/models/outputformat)     | :heavy\_minus\_sign: | N/A         |
| `partialImages`     | *number*                                                                           | :heavy\_minus\_sign: | N/A         |
| `quality`           | [models.Quality](/docs/agent-sdk/typescript/api-reference/models/quality)               | :heavy\_minus\_sign: | N/A         |
| `size`              | [models.Size](/docs/agent-sdk/typescript/api-reference/models/size)                     | :heavy\_minus\_sign: | N/A         |
| `type`              | *"image\_generation"*                                                              | :heavy\_check\_mark: | N/A         |
