> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# MetadataLevel - TypeScript SDK

> MetadataLevel type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Opt-in level for surfacing routing metadata on the response under `openrouter_metadata`.

## Example Usage

```typescript lines theme={null}
import { MetadataLevel } from "@openrouter/sdk/models";

let value: MetadataLevel = "enabled";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"disabled" | "enabled" | Unrecognized<string>
```
