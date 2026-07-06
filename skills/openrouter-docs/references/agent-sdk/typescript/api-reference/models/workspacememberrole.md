> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# WorkspaceMemberRole - TypeScript SDK

> WorkspaceMemberRole type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Role of the member in the workspace

## Example Usage

```typescript lines theme={null}
import { WorkspaceMemberRole } from "@openrouter/sdk/models";

let value: WorkspaceMemberRole = "member";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"admin" | "member" | Unrecognized<string>
```
