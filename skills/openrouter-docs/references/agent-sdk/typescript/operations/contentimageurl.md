> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ContentImageURL - TypeScript SDK

> ContentImageURL method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ContentImageURL } from "@openrouter/sdk/models/operations";

let value: ContentImageURL = {
  type: "image_url",
  imageUrl: {
    url: "https://zealous-march.biz/",
  },
};
```

## Fields

| Field      | Type                                                             | Required             | Description |
| ---------- | ---------------------------------------------------------------- | -------------------- | ----------- |
| `type`     | *"image\_url"*                                                   | :heavy\_check\_mark: | N/A         |
| `imageUrl` | [operations.ImageUrl](/agent-sdk/typescript/operations/imageurl) | :heavy\_check\_mark: | N/A         |
