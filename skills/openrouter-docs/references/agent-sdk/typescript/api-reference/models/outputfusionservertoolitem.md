> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputFusionServerToolItem - TypeScript SDK

> OutputFusionServerToolItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

An openrouter:fusion server tool output item

## Example Usage

```typescript lines theme={null}
import { OutputFusionServerToolItem } from "@openrouter/sdk/models";

let value: OutputFusionServerToolItem = {
  status: "completed",
  type: "openrouter:fusion",
};
```

## Fields

| Field           | Type                                                                               | Required             | Description                                                                                                                                                                                                                              | Example   |
| --------------- | ---------------------------------------------------------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `analysis`      | [models.Analysis](/agent-sdk/typescript/api-reference/models/analysis)             | :heavy\_minus\_sign: | Structured analysis produced by the fusion judge model.                                                                                                                                                                                  |           |
| `error`         | *string*                                                                           | :heavy\_minus\_sign: | Error message when the fusion run did not produce an analysis result.                                                                                                                                                                    |           |
| `failedModels`  | [models.FailedModel](/agent-sdk/typescript/api-reference/models/failedmodel)\[]    | :heavy\_minus\_sign: | Models that were requested as part of the analysis panel but did not produce a response. Present when at least one requested analysis model failed. The fusion result is still usable but was produced from a degraded panel.            |           |
| `failureReason` | *string*                                                                           | :heavy\_minus\_sign: | Typed failure reason when the fusion run failed. Possible values include: all\_panels\_failed, insufficient\_credits, rate\_limited, judge\_not\_valid\_json, judge\_schema\_mismatch, judge\_upstream\_error, judge\_empty\_completion. |           |
| `id`            | *string*                                                                           | :heavy\_minus\_sign: | N/A                                                                                                                                                                                                                                      |           |
| `responses`     | [models.ResponseT](/agent-sdk/typescript/api-reference/models/responset)\[]        | :heavy\_minus\_sign: | Slugs of the analysis models that produced a response in this fusion run.                                                                                                                                                                |           |
| `status`        | [models.ToolCallStatus](/agent-sdk/typescript/api-reference/models/toolcallstatus) | :heavy\_check\_mark: | N/A                                                                                                                                                                                                                                      | completed |
| `type`          | *"openrouter:fusion"*                                                              | :heavy\_check\_mark: | N/A                                                                                                                                                                                                                                      |           |
