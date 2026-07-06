> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# EndpointInfo - TypeScript SDK

> EndpointInfo type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { EndpointInfo } from "@openrouter/sdk/models";

let value: EndpointInfo = {
  model: "openai/gpt-4o",
  provider: "OpenAI",
  selected: true,
};
```

## Fields

| Field      | Type      | Required             | Description |
| ---------- | --------- | -------------------- | ----------- |
| `model`    | *string*  | :heavy\_check\_mark: | N/A         |
| `provider` | *string*  | :heavy\_check\_mark: | N/A         |
| `selected` | *boolean* | :heavy\_check\_mark: | N/A         |
