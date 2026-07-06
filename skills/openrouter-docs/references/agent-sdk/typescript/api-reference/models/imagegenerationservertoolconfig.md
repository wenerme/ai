> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ImageGenerationServerToolConfig - TypeScript SDK

> ImageGenerationServerToolConfig type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Configuration for the openrouter:image\_generation server tool. Accepts all image\_config params (aspect\_ratio, quality, size, background, output\_format, output\_compression, moderation, etc.) plus a model field.

## Example Usage

```typescript lines theme={null}
import { ImageGenerationServerToolConfig } from "@openrouter/sdk/models";

let value: ImageGenerationServerToolConfig = {};
```

## Fields

| Field                  | Type                                                            | Required             | Description                                                                                        | Example                                                                    |
| ---------------------- | --------------------------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `model`                | *string*                                                        | :heavy\_minus\_sign: | Which image generation model to use (e.g. "openai/gpt-5-image"). Defaults to "openai/gpt-5-image". | openai/gpt-5-image                                                         |
| `additionalProperties` | `Record<string, *models.ImageGenerationServerToolConfigUnion*>` | :heavy\_minus\_sign: | N/A                                                                                                | `{"aspect_ratio": "16:9","model": "openai/gpt-5-image","quality": "high"}` |
