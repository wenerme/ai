> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# StopServerToolsWhenStepCountIs - TypeScript SDK

> StopServerToolsWhenStepCountIs type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Stop after the agent loop has executed this many steps.

## Example Usage

```typescript lines theme={null}
import { StopServerToolsWhenStepCountIs } from "@openrouter/sdk/models";

let value: StopServerToolsWhenStepCountIs = {
  stepCount: 5,
  type: "step_count_is",
};
```

## Fields

| Field       | Type                | Required             | Description |
| ----------- | ------------------- | -------------------- | ----------- |
| `stepCount` | *number*            | :heavy\_check\_mark: | N/A         |
| `type`      | *"step\_count\_is"* | :heavy\_check\_mark: | N/A         |
