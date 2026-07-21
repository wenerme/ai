> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ContentImageURL - TypeScript SDK

> ContentImageURL type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ContentImageURL } from "@openrouter/sdk/models/operations";

let value: ContentImageURL = {
  imageUrl: {
    url: "https://zealous-march.biz/",
  },
  type: "image_url",
};
```

## Fields

| Field      | Type                                                                           | Required             | Description |
| ---------- | ------------------------------------------------------------------------------ | -------------------- | ----------- |
| `imageUrl` | [operations.ImageUrl](/docs/agent-sdk/typescript/api-reference/operations/imageurl) | :heavy\_check\_mark: | N/A         |
| `type`     | *"image\_url"*                                                                 | :heavy\_check\_mark: | N/A         |
