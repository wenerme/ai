> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatContentImageImageUrl - TypeScript SDK

> ChatContentImageImageUrl type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ChatContentImageImageUrl } from "@openrouter/sdk/models";

let value: ChatContentImageImageUrl = {
  url: "https://torn-knuckle.org/",
};
```

## Fields

| Field    | Type                                                                                               | Required             | Description                             |
| -------- | -------------------------------------------------------------------------------------------------- | -------------------- | --------------------------------------- |
| `detail` | [models.ChatContentImageDetail](/docs/agent-sdk/typescript/api-reference/models/chatcontentimagedetail) | :heavy\_minus\_sign: | Image detail level for vision models    |
| `url`    | *string*                                                                                           | :heavy\_check\_mark: | URL of the image (data: URLs supported) |
