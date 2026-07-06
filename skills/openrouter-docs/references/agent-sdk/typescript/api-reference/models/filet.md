> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# FileT - TypeScript SDK

> FileT type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { FileT } from "@openrouter/sdk/models";

let value: FileT = {};
```

## Fields

| Field      | Type     | Required             | Description                            |
| ---------- | -------- | -------------------- | -------------------------------------- |
| `fileData` | *string* | :heavy\_minus\_sign: | File content as base64 data URL or URL |
| `fileId`   | *string* | :heavy\_minus\_sign: | File ID for previously uploaded files  |
| `filename` | *string* | :heavy\_minus\_sign: | Original filename                      |
