> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ContentPartImage - TypeScript SDK

> ContentPartImage type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ContentPartImage } from "@openrouter/sdk/models";

let value: ContentPartImage = {
  imageUrl: {
    url: "https://example.com/image.png",
  },
  type: "image_url",
};
```

## Fields

| Field      | Type                                                                                                   | Required             | Description |
| ---------- | ------------------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `imageUrl` | [models.ContentPartImageImageUrl](/docs/agent-sdk/typescript/api-reference/models/contentpartimageimageurl) | :heavy\_check\_mark: | N/A         |
| `type`     | [models.ContentPartImageType](/docs/agent-sdk/typescript/api-reference/models/contentpartimagetype)         | :heavy\_check\_mark: | N/A         |
