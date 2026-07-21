> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ResponseInputImage - TypeScript SDK

> ResponseInputImage method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Image input content item

## Example Usage

```typescript lines theme={null}
import { ResponseInputImage } from "@openrouter/sdk/models";

let value: ResponseInputImage = {
  type: "input_image",
  detail: "auto",
};
```

## Fields

| Field      | Type                                                                                     | Required             | Description |
| ---------- | ---------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `type`     | [models.ResponseInputImageType](/docs/agent-sdk/typescript/models/responseinputimagetype)     | :heavy\_check\_mark: | N/A         |
| `detail`   | [models.ResponseInputImageDetail](/docs/agent-sdk/typescript/models/responseinputimagedetail) | :heavy\_check\_mark: | N/A         |
| `imageUrl` | *string*                                                                                 | :heavy\_minus\_sign: | N/A         |
