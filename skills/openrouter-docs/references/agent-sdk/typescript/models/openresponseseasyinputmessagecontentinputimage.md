> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesEasyInputMessageContentInputImage - TypeScript SDK

> OpenResponsesEasyInputMessageContentInputImage method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Image input content item

## Example Usage

```typescript lines theme={null}
import { OpenResponsesEasyInputMessageContentInputImage } from "@openrouter/sdk/models";

let value: OpenResponsesEasyInputMessageContentInputImage = {
  type: "input_image",
  detail: "auto",
};
```

## Fields

| Field      | Type                                                                                                           | Required             | Description |
| ---------- | -------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `type`     | *"input\_image"*                                                                                               | :heavy\_check\_mark: | N/A         |
| `detail`   | [models.OpenResponsesEasyInputMessageDetail](/docs/agent-sdk/typescript/models/openresponseseasyinputmessagedetail) | :heavy\_check\_mark: | N/A         |
| `imageUrl` | *string*                                                                                                       | :heavy\_minus\_sign: | N/A         |
