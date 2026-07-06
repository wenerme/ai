> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# WebSearchEngine - TypeScript SDK

> WebSearchEngine method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

The search engine to use for web search.

## Example Usage

```typescript lines theme={null}
import { WebSearchEngine } from "@openrouter/sdk/models";

let value: WebSearchEngine = "native";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript lines theme={null}
"native" | "exa" | Unrecognized<string>
```
