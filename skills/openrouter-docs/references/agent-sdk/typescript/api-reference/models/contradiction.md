> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Contradiction - TypeScript SDK

> Contradiction type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { Contradiction } from "@openrouter/sdk/models";

let value: Contradiction = {
  stances: [
    {
      model: "Roadster",
      stance: "<value>",
    },
  ],
  topic: "<value>",
};
```

## Fields

| Field     | Type                                                                  | Required             | Description |
| --------- | --------------------------------------------------------------------- | -------------------- | ----------- |
| `stances` | [models.Stance](/docs/agent-sdk/typescript/api-reference/models/stance)\[] | :heavy\_check\_mark: | N/A         |
| `topic`   | *string*                                                              | :heavy\_check\_mark: | N/A         |
