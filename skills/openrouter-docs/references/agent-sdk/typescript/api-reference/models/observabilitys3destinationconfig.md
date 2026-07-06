> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ObservabilityS3DestinationConfig - TypeScript SDK

> ObservabilityS3DestinationConfig type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ObservabilityS3DestinationConfig } from "@openrouter/sdk/models";

let value: ObservabilityS3DestinationConfig = {
  accessKeyId: "<id>",
  bucketName: "<value>",
  secretAccessKey: "<value>",
};
```

## Fields

| Field             | Type                       | Required             | Description                                                                                                                                                                                   |
| ----------------- | -------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accessKeyId`     | *string*                   | :heavy\_check\_mark: | N/A                                                                                                                                                                                           |
| `bucketName`      | *string*                   | :heavy\_check\_mark: | N/A                                                                                                                                                                                           |
| `endpoint`        | *string*                   | :heavy\_minus\_sign: | Only for S3-compatible services like Cloudflare R2 ([https://account-id.r2.cloudflarestorage.com](https://account-id.r2.cloudflarestorage.com)) or MinIO. Leave blank for standard AWS S3.    |
| `headers`         | `Record<string, *string*>` | :heavy\_minus\_sign: | Custom HTTP headers to include in requests to this destination.                                                                                                                               |
| `pathTemplate`    | *string*                   | :heavy\_minus\_sign: | Template for S3 object path. The filename (`{traceId}`-`{timestamp}`.json) is automatically appended. Available variables: `{prefix}`, `{date}`, `{year}`, `{month}`, `{day}`, `{apiKeyName}` |
| `prefix`          | *string*                   | :heavy\_minus\_sign: | N/A                                                                                                                                                                                           |
| `region`          | *string*                   | :heavy\_minus\_sign: | N/A                                                                                                                                                                                           |
| `secretAccessKey` | *string*                   | :heavy\_check\_mark: | N/A                                                                                                                                                                                           |
| `sessionToken`    | *string*                   | :heavy\_minus\_sign: | N/A                                                                                                                                                                                           |
