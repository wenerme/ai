> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# RouterAttempt - TypeScript SDK

> RouterAttempt type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { RouterAttempt } from "@openrouter/sdk/models";

let value: RouterAttempt = {
  model: "openai/gpt-4o",
  provider: "OpenAI",
  status: 200,
};
```

## Fields

| Field      | Type     | Required             | Description |
| ---------- | -------- | -------------------- | ----------- |
| `model`    | *string* | :heavy\_check\_mark: | N/A         |
| `provider` | *string* | :heavy\_check\_mark: | N/A         |
| `status`   | *number* | :heavy\_check\_mark: | N/A         |
