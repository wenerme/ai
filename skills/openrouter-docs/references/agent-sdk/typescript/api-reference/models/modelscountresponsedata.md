> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ModelsCountResponseData - TypeScript SDK

> ModelsCountResponseData type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Model count data

## Example Usage

```typescript lines theme={null}
import { ModelsCountResponseData } from "@openrouter/sdk/models";

let value: ModelsCountResponseData = {
  count: 150,
};
```

## Fields

| Field   | Type     | Required             | Description                      | Example |
| ------- | -------- | -------------------- | -------------------------------- | ------- |
| `count` | *number* | :heavy\_check\_mark: | Total number of available models | 150     |
