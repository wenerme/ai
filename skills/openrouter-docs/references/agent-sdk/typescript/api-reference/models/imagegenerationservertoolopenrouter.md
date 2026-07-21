> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ImageGenerationServerToolOpenRouter - TypeScript SDK

> ImageGenerationServerToolOpenRouter type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

OpenRouter built-in server tool: generates images from text prompts using an image generation model

## Example Usage

```typescript lines theme={null}
import { ImageGenerationServerToolOpenRouter } from "@openrouter/sdk/models";

let value: ImageGenerationServerToolOpenRouter = {
  type: "openrouter:image_generation",
};
```

## Fields

| Field        | Type                                                                                                                                 | Required             | Description                                                                                                                                                                                                            | Example                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `parameters` | [models.ImageGenerationServerToolConfig](/docs/agent-sdk/typescript/api-reference/models/imagegenerationservertoolconfig)                 | :heavy\_minus\_sign: | Configuration for the openrouter:image\_generation server tool. Accepts all image\_config params (aspect\_ratio, quality, size, background, output\_format, output\_compression, moderation, etc.) plus a model field. | `{"aspect_ratio": "16:9","model": "openai/gpt-5-image","quality": "high"}` |
| `type`       | [models.ImageGenerationServerToolOpenRouterType](/docs/agent-sdk/typescript/api-reference/models/imagegenerationservertoolopenroutertype) | :heavy\_check\_mark: | N/A                                                                                                                                                                                                                    |                                                                            |
