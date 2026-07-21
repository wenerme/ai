> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatMessageContentItemImage - TypeScript SDK

> ChatMessageContentItemImage method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ChatMessageContentItemImage } from "@openrouter/sdk/models";

let value: ChatMessageContentItemImage = {
  type: "image_url",
  imageUrl: {
    url: "https://pretty-reservation.org",
  },
};
```

## Fields

| Field      | Type                                                     | Required             | Description |
| ---------- | -------------------------------------------------------- | -------------------- | ----------- |
| `type`     | *"image\_url"*                                           | :heavy\_check\_mark: | N/A         |
| `imageUrl` | [models.ImageUrl](/docs/agent-sdk/typescript/models/imageurl) | :heavy\_check\_mark: | N/A         |
