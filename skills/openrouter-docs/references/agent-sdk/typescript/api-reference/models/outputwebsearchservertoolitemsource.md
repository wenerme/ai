> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputWebSearchServerToolItemSource - TypeScript SDK

> OutputWebSearchServerToolItemSource type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { OutputWebSearchServerToolItemSource } from "@openrouter/sdk/models";

let value: OutputWebSearchServerToolItemSource = {
  type: "url",
  url: "https://immense-vista.com/",
};
```

## Fields

| Field  | Type                                                                                                                           | Required             | Description |
| ------ | ------------------------------------------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `type` | [models.OutputWebSearchServerToolItemTypeURL](/docs/agent-sdk/typescript/api-reference/models/outputwebsearchservertoolitemtypeurl) | :heavy\_check\_mark: | N/A         |
| `url`  | *string*                                                                                                                       | :heavy\_check\_mark: | N/A         |
