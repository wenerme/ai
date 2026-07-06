> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# StopServerToolsWhenFinishReasonIs - TypeScript SDK

> StopServerToolsWhenFinishReasonIs type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Stop when the upstream model emits this finish reason (e.g. `length`).

## Example Usage

```typescript lines theme={null}
import { StopServerToolsWhenFinishReasonIs } from "@openrouter/sdk/models";

let value: StopServerToolsWhenFinishReasonIs = {
  reason: "<value>",
  type: "finish_reason_is",
};
```

## Fields

| Field    | Type                   | Required             | Description |
| -------- | ---------------------- | -------------------- | ----------- |
| `reason` | *string*               | :heavy\_check\_mark: | N/A         |
| `type`   | *"finish\_reason\_is"* | :heavy\_check\_mark: | N/A         |
