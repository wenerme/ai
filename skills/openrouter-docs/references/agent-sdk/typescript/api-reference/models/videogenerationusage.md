> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# VideoGenerationUsage - TypeScript SDK

> VideoGenerationUsage type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Usage and cost information for the video generation. Available once the job has completed.

## Example Usage

```typescript lines theme={null}
import { VideoGenerationUsage } from "@openrouter/sdk/models";

let value: VideoGenerationUsage = {};
```

## Fields

| Field    | Type      | Required             | Description                                                            |
| -------- | --------- | -------------------- | ---------------------------------------------------------------------- |
| `cost`   | *number*  | :heavy\_minus\_sign: | The cost of the video generation in USD.                               |
| `isByok` | *boolean* | :heavy\_minus\_sign: | Whether the request was made using a Bring Your Own Key configuration. |
