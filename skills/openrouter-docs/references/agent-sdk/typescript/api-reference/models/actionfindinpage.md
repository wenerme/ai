> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ActionFindInPage - TypeScript SDK

> ActionFindInPage type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ActionFindInPage } from "@openrouter/sdk/models";

let value: ActionFindInPage = {
  pattern: "<value>",
  type: "find_in_page",
  url: "https://qualified-king.org",
};
```

## Fields

| Field     | Type               | Required             | Description |
| --------- | ------------------ | -------------------- | ----------- |
| `pattern` | *string*           | :heavy\_check\_mark: | N/A         |
| `type`    | *"find\_in\_page"* | :heavy\_check\_mark: | N/A         |
| `url`     | *string*           | :heavy\_check\_mark: | N/A         |
