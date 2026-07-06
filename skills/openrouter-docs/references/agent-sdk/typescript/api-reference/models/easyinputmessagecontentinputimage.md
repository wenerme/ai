> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# EasyInputMessageContentInputImage - TypeScript SDK

> EasyInputMessageContentInputImage type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Image input content item

## Example Usage

```typescript lines theme={null}
import { EasyInputMessageContentInputImage } from "@openrouter/sdk/models";

let value: EasyInputMessageContentInputImage = {
  detail: "auto",
  type: "input_image",
};
```

## Fields

| Field      | Type                                                                                               | Required             | Description |
| ---------- | -------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `detail`   | [models.EasyInputMessageDetail](/agent-sdk/typescript/api-reference/models/easyinputmessagedetail) | :heavy\_check\_mark: | N/A         |
| `imageUrl` | *string*                                                                                           | :heavy\_minus\_sign: | N/A         |
| `type`     | *"input\_image"*                                                                                   | :heavy\_check\_mark: | N/A         |
