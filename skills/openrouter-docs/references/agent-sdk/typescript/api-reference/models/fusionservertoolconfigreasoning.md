> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# FusionServerToolConfigReasoning - TypeScript SDK

> FusionServerToolConfigReasoning type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Reasoning configuration forwarded to panelist and judge inner calls. Use this to control reasoning effort and token budget for models that support extended thinking.

## Example Usage

```typescript lines theme={null}
import { FusionServerToolConfigReasoning } from "@openrouter/sdk/models";

let value: FusionServerToolConfigReasoning = {};
```

## Fields

| Field       | Type                                                                                                           | Required             | Description                                                                                                                                          |
| ----------- | -------------------------------------------------------------------------------------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `effort`    | [models.FusionServerToolConfigEffort](/agent-sdk/typescript/api-reference/models/fusionservertoolconfigeffort) | :heavy\_minus\_sign: | Reasoning effort level for panelist and judge inner calls.                                                                                           |
| `maxTokens` | *number*                                                                                                       | :heavy\_minus\_sign: | Maximum number of reasoning tokens each panelist and judge model may use. Helps bound cost when models allocate too much budget to chain-of-thought. |
