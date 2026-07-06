> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# PromptTokensDetails - TypeScript SDK

> PromptTokensDetails type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Per-modality token breakdown. Only present when the input contains 2+ modalities (e.g. text + image) and the upstream provider returns modality-level usage data. Only non-zero modality counts are included.

## Example Usage

```typescript lines theme={null}
import { PromptTokensDetails } from "@openrouter/sdk/models/operations";

let value: PromptTokensDetails = {};
```

## Fields

| Field         | Type     | Required             | Description                                 | Example |
| ------------- | -------- | -------------------- | ------------------------------------------- | ------- |
| `audioTokens` | *number* | :heavy\_minus\_sign: | Number of audio tokens in the input         |         |
| `fileTokens`  | *number* | :heavy\_minus\_sign: | Number of file/document tokens in the input |         |
| `imageTokens` | *number* | :heavy\_minus\_sign: | Number of image tokens in the input         | 258     |
| `textTokens`  | *number* | :heavy\_minus\_sign: | Number of text tokens in the input          | 8       |
| `videoTokens` | *number* | :heavy\_minus\_sign: | Number of video tokens in the input         |         |
