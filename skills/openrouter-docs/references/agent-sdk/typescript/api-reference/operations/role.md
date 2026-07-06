> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Role - TypeScript SDK

> Role type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Role of the member in the organization

## Example Usage

```typescript lines theme={null}
import { Role } from "@openrouter/sdk/models/operations";

let value: Role = "org:member";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"org:admin" | "org:member" | Unrecognized<string>
```
