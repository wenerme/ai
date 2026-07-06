> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ResponsesSearchContextSize - TypeScript SDK

> ResponsesSearchContextSize method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Size of the search context for web search tools

## Example Usage

```typescript lines theme={null}
import { ResponsesSearchContextSize } from "@openrouter/sdk/models";

let value: ResponsesSearchContextSize = "medium";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript lines theme={null}
"low" | "medium" | "high" | Unrecognized<string>
```
