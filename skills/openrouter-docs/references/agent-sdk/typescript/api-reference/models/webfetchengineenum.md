> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# WebFetchEngineEnum - TypeScript SDK

> WebFetchEngineEnum type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Which fetch engine to use. "auto" (default) uses native if the provider supports it, otherwise Exa. "native" forces the provider's built-in fetch. "exa" uses Exa Contents API. "openrouter" uses direct HTTP fetch. "firecrawl" uses Firecrawl scrape (requires BYOK). "parallel" uses the Parallel extract API.

## Example Usage

```typescript lines theme={null}
import { WebFetchEngineEnum } from "@openrouter/sdk/models";

let value: WebFetchEngineEnum = "auto";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"auto" | "native" | "openrouter" | "exa" | "parallel" | "firecrawl" | Unrecognized<string>
```
