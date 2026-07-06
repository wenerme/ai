> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# FusionPlugin - TypeScript SDK

> FusionPlugin type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { FusionPlugin } from "@openrouter/sdk/models";

let value: FusionPlugin = {
  id: "fusion",
};
```

## Fields

| Field            | Type        | Required             | Description                                                                                                                                                                                                                                                                                                                                                           | Example                                                                                                        |
| ---------------- | ----------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `analysisModels` | *string*\[] | :heavy\_minus\_sign: | Slugs of models to run in parallel as the "expert panel" the judge analyzes. Each model receives the same user prompt with web\_search + web\_fetch enabled. Capped at 8 models to bound cost amplification. When omitted, defaults to the Quality preset from the /labs/fusion UI (\~anthropic/claude-opus-latest, \~openai/gpt-latest, \~google/gemini-pro-latest). | \[<br />"\~anthropic/claude-opus-latest",<br />"\~openai/gpt-latest",<br />"\~google/gemini-pro-latest"<br />] |
| `enabled`        | *boolean*   | :heavy\_minus\_sign: | Set to false to disable the fusion plugin for this request. Defaults to true.                                                                                                                                                                                                                                                                                         |                                                                                                                |
| `id`             | *"fusion"*  | :heavy\_check\_mark: | N/A                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                |
| `maxToolCalls`   | *number*    | :heavy\_minus\_sign: | Maximum number of tool-calling steps each panelist (analysis model) and the judge model may take during their agentic web-research loop. Models with web\_search/web\_fetch enabled iterate until they produce a text response or hit this ceiling. Defaults to 8. Capped at 16.                                                                                      | 12                                                                                                             |
| `model`          | *string*    | :heavy\_minus\_sign: | Slug of the model that performs both the judge step (with web\_search + web\_fetch) and the final synthesis. When omitted, defaults to the first model in the Quality preset.                                                                                                                                                                                         | \~anthropic/claude-opus-latest                                                                                 |
