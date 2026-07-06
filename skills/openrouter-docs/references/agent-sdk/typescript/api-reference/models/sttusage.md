> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# STTUsage - TypeScript SDK

> STTUsage type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Aggregated usage statistics for the request

## Example Usage

```typescript lines theme={null}
import { STTUsage } from "@openrouter/sdk/models";

let value: STTUsage = {};
```

## Fields

| Field          | Type     | Required             | Description                                    | Example  |
| -------------- | -------- | -------------------- | ---------------------------------------------- | -------- |
| `cost`         | *number* | :heavy\_minus\_sign: | Total cost of the request in USD               | 0.000508 |
| `inputTokens`  | *number* | :heavy\_minus\_sign: | Number of input tokens billed for this request | 83       |
| `outputTokens` | *number* | :heavy\_minus\_sign: | Number of output tokens generated              | 30       |
| `seconds`      | *number* | :heavy\_minus\_sign: | Duration of the input audio in seconds         | 9.2      |
| `totalTokens`  | *number* | :heavy\_minus\_sign: | Total number of tokens used (input + output)   | 113      |
