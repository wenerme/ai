> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ActionOpenPage - TypeScript SDK

> ActionOpenPage type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ActionOpenPage } from "@openrouter/sdk/models";

let value: ActionOpenPage = {
  type: "open_page",
};
```

## Fields

| Field  | Type           | Required             | Description |
| ------ | -------------- | -------------------- | ----------- |
| `type` | *"open\_page"* | :heavy\_check\_mark: | N/A         |
| `url`  | *string*       | :heavy\_minus\_sign: | N/A         |
