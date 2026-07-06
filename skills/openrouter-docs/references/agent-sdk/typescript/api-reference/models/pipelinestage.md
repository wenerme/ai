> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# PipelineStage - TypeScript SDK

> PipelineStage type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { PipelineStage } from "@openrouter/sdk/models";

let value: PipelineStage = {
  name: "content-filter",
  type: "guardrail",
};
```

## Fields

| Field            | Type                                                                                     | Required             | Description                                                                                                                                                                          | Example   |
| ---------------- | ---------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| `costUsd`        | *number*                                                                                 | :heavy\_minus\_sign: | N/A                                                                                                                                                                                  |           |
| `data`           | `Record<string, *any*>`                                                                  | :heavy\_minus\_sign: | N/A                                                                                                                                                                                  |           |
| `guardrailId`    | *string*                                                                                 | :heavy\_minus\_sign: | N/A                                                                                                                                                                                  |           |
| `guardrailScope` | *string*                                                                                 | :heavy\_minus\_sign: | N/A                                                                                                                                                                                  |           |
| `name`           | *string*                                                                                 | :heavy\_check\_mark: | N/A                                                                                                                                                                                  |           |
| `summary`        | *string*                                                                                 | :heavy\_minus\_sign: | N/A                                                                                                                                                                                  |           |
| `type`           | [models.PipelineStageType](/agent-sdk/typescript/api-reference/models/pipelinestagetype) | :heavy\_check\_mark: | Categorical kind of a pipeline stage. Multiple plugins can share a type (e.g. all guardrail-level plugins emit `guardrail`); the `name` field disambiguates which plugin emitted it. | guardrail |
