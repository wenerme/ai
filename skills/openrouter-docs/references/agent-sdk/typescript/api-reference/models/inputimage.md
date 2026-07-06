> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# InputImage - TypeScript SDK

> InputImage type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Image input content item

## Example Usage

```typescript lines theme={null}
import { InputImage } from "@openrouter/sdk/models";

let value: InputImage = {
  detail: "auto",
  type: "input_image",
};
```

## Fields

| Field      | Type                                                                                       | Required             | Description |
| ---------- | ------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `detail`   | [models.InputImageDetail](/agent-sdk/typescript/api-reference/models/inputimagedetail)     | :heavy\_check\_mark: | N/A         |
| `imageUrl` | *string*                                                                                   | :heavy\_minus\_sign: | N/A         |
| `type`     | [models.InputImageTypeEnum](/agent-sdk/typescript/api-reference/models/inputimagetypeenum) | :heavy\_check\_mark: | N/A         |
