> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# FusionServerToolOpenRouter - TypeScript SDK

> FusionServerToolOpenRouter type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

OpenRouter built-in server tool: fans out the user prompt to a panel of analysis models, then asks a judge model to summarize their collective output as structured JSON the outer model can synthesize from.

## Example Usage

```typescript lines theme={null}
import { FusionServerToolOpenRouter } from "@openrouter/sdk/models";

let value: FusionServerToolOpenRouter = {
  type: "openrouter:fusion",
};
```

## Fields

| Field        | Type                                                                                               | Required             | Description                                          | Example                                                                                                   |
| ------------ | -------------------------------------------------------------------------------------------------- | -------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `parameters` | [models.FusionServerToolConfig](/docs/agent-sdk/typescript/api-reference/models/fusionservertoolconfig) | :heavy\_minus\_sign: | Configuration for the openrouter:fusion server tool. | `{"analysis_models": ["~anthropic/claude-opus-latest","~openai/gpt-latest","~google/gemini-pro-latest"]}` |
| `type`       | *"openrouter:fusion"*                                                                              | :heavy\_check\_mark: | N/A                                                  |                                                                                                           |
