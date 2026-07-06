> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# MultimodalMedia - TypeScript SDK

> MultimodalMedia type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { MultimodalMedia } from "@openrouter/sdk/models";

let value: MultimodalMedia = {
  data: "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAA...",
};
```

## Fields

| Field    | Type     | Required             | Description |
| -------- | -------- | -------------------- | ----------- |
| `data`   | *string* | :heavy\_check\_mark: | N/A         |
| `format` | *string* | :heavy\_minus\_sign: | N/A         |
