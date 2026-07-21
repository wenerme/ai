> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ModelsCountResponse - TypeScript SDK

> ModelsCountResponse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Model count data

## Example Usage

```typescript lines theme={null}
import { ModelsCountResponse } from "@openrouter/sdk/models";

let value: ModelsCountResponse = {
  data: {
    count: 150,
  },
};
```

## Fields

| Field  | Type                                                                                                 | Required             | Description      | Example          |
| ------ | ---------------------------------------------------------------------------------------------------- | -------------------- | ---------------- | ---------------- |
| `data` | [models.ModelsCountResponseData](/docs/agent-sdk/typescript/api-reference/models/modelscountresponsedata) | :heavy\_check\_mark: | Model count data | `{"count": 150}` |
