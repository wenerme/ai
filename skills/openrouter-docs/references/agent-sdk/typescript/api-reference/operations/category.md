> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Category - TypeScript SDK

> Category type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Filter models by use case category

## Example Usage

```typescript lines theme={null}
import { Category } from "@openrouter/sdk/models/operations";

let value: Category = "programming";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"programming" | "roleplay" | "marketing" | "marketing/seo" | "technology" | "science" | "translation" | "legal" | "finance" | "health" | "trivia" | "academia" | Unrecognized<string>
```
