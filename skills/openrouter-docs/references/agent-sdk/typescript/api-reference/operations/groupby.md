> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# GroupBy - TypeScript SDK

> GroupBy type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Set to 'workspace' to split each row per workspace and include `workspace_id` on every item. Omitted by default, in which case rows are aggregated across workspaces (by date, model, and endpoint) and `workspace_id` is not returned — preserving the historical response shape.

## Example Usage

```typescript lines theme={null}
import { GroupBy } from "@openrouter/sdk/models/operations";

let value: GroupBy = "workspace";
```

## Values

```typescript lines theme={null}
"workspace"
```
