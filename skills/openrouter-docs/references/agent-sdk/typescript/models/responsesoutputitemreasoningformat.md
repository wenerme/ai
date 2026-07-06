> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ResponsesOutputItemReasoningFormat - TypeScript SDK

> ResponsesOutputItemReasoningFormat method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

The format of the reasoning content

## Example Usage

```typescript lines theme={null}
import { ResponsesOutputItemReasoningFormat } from "@openrouter/sdk/models";

let value: ResponsesOutputItemReasoningFormat = "anthropic-claude-v1";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript lines theme={null}
"unknown" | "openai-responses-v1" | "azure-openai-responses-v1" | "xai-responses-v1" | "anthropic-claude-v1" | "google-gemini-v1" | Unrecognized<string>
```
