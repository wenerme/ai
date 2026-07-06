> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# FusionServerToolConfig - TypeScript SDK

> FusionServerToolConfig type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Configuration for the openrouter:fusion server tool.

## Example Usage

```typescript lines theme={null}
import { FusionServerToolConfig } from "@openrouter/sdk/models";

let value: FusionServerToolConfig = {};
```

## Fields

| Field                 | Type                                                                                                                 | Required             | Description                                                                                                                                                                                                                                                                                                                                       | Example                                                                                                        |
| --------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `analysisModels`      | *string*\[]                                                                                                          | :heavy\_minus\_sign: | Slugs of models to run in parallel as the analysis panel. Each model receives the user prompt with openrouter:web\_search and openrouter:web\_fetch enabled, then a judge model summarizes the collective output into structured analysis JSON. Capped at 8 models to bound cost amplification. Defaults to the Quality preset from /labs/fusion. | \[<br />"\~anthropic/claude-opus-latest",<br />"\~openai/gpt-latest",<br />"\~google/gemini-pro-latest"<br />] |
| `maxCompletionTokens` | *number*                                                                                                             | :heavy\_minus\_sign: | Maximum number of output tokens (including reasoning tokens) each panelist and the judge model may produce per inner call. Controls the total output budget so reasoning-heavy models like GPT-5.5 do not exhaust their token allowance before producing visible text. When omitted, the provider's default applies.                              | 16384                                                                                                          |
| `maxToolCalls`        | *number*                                                                                                             | :heavy\_minus\_sign: | Maximum number of tool-calling steps each panelist (analysis model) and the judge model may take during their agentic web-research loop. Models with web\_search/web\_fetch enabled iterate until they produce a text response or hit this ceiling. Defaults to 8. Capped at 16.                                                                  | 12                                                                                                             |
| `model`               | *string*                                                                                                             | :heavy\_minus\_sign: | Slug of the judge model that produces the structured analysis JSON. Defaults to the model used in the outer API request.                                                                                                                                                                                                                          | \~anthropic/claude-opus-latest                                                                                 |
| `reasoning`           | [models.FusionServerToolConfigReasoning](/agent-sdk/typescript/api-reference/models/fusionservertoolconfigreasoning) | :heavy\_minus\_sign: | Reasoning configuration forwarded to panelist and judge inner calls. Use this to control reasoning effort and token budget for models that support extended thinking.                                                                                                                                                                             |                                                                                                                |
| `temperature`         | *number*                                                                                                             | :heavy\_minus\_sign: | Sampling temperature forwarded to panelist and judge inner calls. When omitted, the provider's default applies.                                                                                                                                                                                                                                   | 0.7                                                                                                            |
