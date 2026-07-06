> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# SearchQualityLevel - TypeScript SDK

> SearchQualityLevel type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

How much context to retrieve per result. Applies to Exa and Parallel engines; ignored with native provider search and Firecrawl. For Exa, pins a fixed per-result character cap (low=5,000, medium=15,000, high=30,000); when omitted, Exa picks an adaptive size per query and document (typically \~2,000–4,000 characters per result). For Parallel, controls the total characters across all results; when omitted, Parallel uses its own default size.

## Example Usage

```typescript lines theme={null}
import { SearchQualityLevel } from "@openrouter/sdk/models";

let value: SearchQualityLevel = "medium";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"low" | "medium" | "high" | Unrecognized<string>
```
