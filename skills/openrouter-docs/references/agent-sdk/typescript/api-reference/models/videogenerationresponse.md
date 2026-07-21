> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# VideoGenerationResponse - TypeScript SDK

> VideoGenerationResponse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { VideoGenerationResponse } from "@openrouter/sdk/models";

let value: VideoGenerationResponse = {
  id: "job-abc123",
  pollingUrl: "/api/v1/videos/job-abc123",
  status: "pending",
};
```

## Fields

| Field          | Type                                                                                                             | Required             | Description                                                                                             | Example                          |
| -------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `error`        | *string*                                                                                                         | :heavy\_minus\_sign: | N/A                                                                                                     |                                  |
| `generationId` | *string*                                                                                                         | :heavy\_minus\_sign: | The generation ID associated with this video generation job. Available once the job has been processed. |                                  |
| `id`           | *string*                                                                                                         | :heavy\_check\_mark: | N/A                                                                                                     |                                  |
| `pollingUrl`   | *string*                                                                                                         | :heavy\_check\_mark: | N/A                                                                                                     |                                  |
| `status`       | [models.VideoGenerationResponseStatus](/docs/agent-sdk/typescript/api-reference/models/videogenerationresponsestatus) | :heavy\_check\_mark: | N/A                                                                                                     |                                  |
| `unsignedUrls` | *string*\[]                                                                                                      | :heavy\_minus\_sign: | N/A                                                                                                     |                                  |
| `usage`        | [models.VideoGenerationUsage](/docs/agent-sdk/typescript/api-reference/models/videogenerationusage)                   | :heavy\_minus\_sign: | Usage and cost information for the video generation. Available once the job has completed.              | `{"cost": 0.5,"is_byok": false}` |
