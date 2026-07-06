> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Pricing - TypeScript SDK

> Pricing type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { Pricing } from "@openrouter/sdk/models";

let value: Pricing = {
  completion: "1000",
  prompt: "1000",
};
```

## Fields

| Field               | Type     | Required             | Description | Example |
| ------------------- | -------- | -------------------- | ----------- | ------- |
| `audio`             | *string* | :heavy\_minus\_sign: | N/A         | 1000    |
| `audioOutput`       | *string* | :heavy\_minus\_sign: | N/A         | 1000    |
| `completion`        | *string* | :heavy\_check\_mark: | N/A         | 1000    |
| `discount`          | *number* | :heavy\_minus\_sign: | N/A         |         |
| `image`             | *string* | :heavy\_minus\_sign: | N/A         | 1000    |
| `imageOutput`       | *string* | :heavy\_minus\_sign: | N/A         | 1000    |
| `imageToken`        | *string* | :heavy\_minus\_sign: | N/A         | 1000    |
| `inputAudioCache`   | *string* | :heavy\_minus\_sign: | N/A         | 1000    |
| `inputCacheRead`    | *string* | :heavy\_minus\_sign: | N/A         | 1000    |
| `inputCacheWrite`   | *string* | :heavy\_minus\_sign: | N/A         | 1000    |
| `internalReasoning` | *string* | :heavy\_minus\_sign: | N/A         | 1000    |
| `prompt`            | *string* | :heavy\_check\_mark: | N/A         | 1000    |
| `request`           | *string* | :heavy\_minus\_sign: | N/A         | 1000    |
| `webSearch`         | *string* | :heavy\_minus\_sign: | N/A         | 1000    |
