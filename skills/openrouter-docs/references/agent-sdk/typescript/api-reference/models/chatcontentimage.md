> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatContentImage - TypeScript SDK

> ChatContentImage type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Image content part for vision models

## Example Usage

```typescript lines theme={null}
import { ChatContentImage } from "@openrouter/sdk/models";

let value: ChatContentImage = {
  imageUrl: {
    url: "https://vague-assist.org/",
  },
  type: "image_url",
};
```

## Fields

| Field      | Type                                                                                                   | Required             | Description |
| ---------- | ------------------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `imageUrl` | [models.ChatContentImageImageUrl](/docs/agent-sdk/typescript/api-reference/models/chatcontentimageimageurl) | :heavy\_check\_mark: | N/A         |
| `type`     | *"image\_url"*                                                                                         | :heavy\_check\_mark: | N/A         |
