> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ContentThinking - TypeScript SDK

> ContentThinking type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ContentThinking } from "@openrouter/sdk/models";

let value: ContentThinking = {
  signature: "<value>",
  thinking: "<value>",
  type: "thinking",
};
```

## Fields

| Field       | Type         | Required             | Description |
| ----------- | ------------ | -------------------- | ----------- |
| `signature` | *string*     | :heavy\_check\_mark: | N/A         |
| `thinking`  | *string*     | :heavy\_check\_mark: | N/A         |
| `type`      | *"thinking"* | :heavy\_check\_mark: | N/A         |
