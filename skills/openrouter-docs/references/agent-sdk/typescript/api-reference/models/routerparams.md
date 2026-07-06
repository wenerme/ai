> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# RouterParams - TypeScript SDK

> RouterParams type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { RouterParams } from "@openrouter/sdk/models";

let value: RouterParams = {};
```

## Fields

| Field                  | Type                    | Required             | Description | Example                                          |
| ---------------------- | ----------------------- | -------------------- | ----------- | ------------------------------------------------ |
| `qualityFloor`         | *number*                | :heavy\_minus\_sign: | N/A         |                                                  |
| `throughputFloor`      | *number*                | :heavy\_minus\_sign: | N/A         |                                                  |
| `versionGroup`         | *string*                | :heavy\_minus\_sign: | N/A         |                                                  |
| `additionalProperties` | `Record<string, *any*>` | :heavy\_minus\_sign: | N/A         | `{"version_group": "anthropic/claude-sonnet-4"}` |
