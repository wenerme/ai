> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatAudioOutput - TypeScript SDK

> ChatAudioOutput type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Audio output data or reference

## Example Usage

```typescript lines theme={null}
import { ChatAudioOutput } from "@openrouter/sdk/models";

let value: ChatAudioOutput = {};
```

## Fields

| Field        | Type     | Required             | Description                |
| ------------ | -------- | -------------------- | -------------------------- |
| `data`       | *string* | :heavy\_minus\_sign: | Base64 encoded audio data  |
| `expiresAt`  | *number* | :heavy\_minus\_sign: | Audio expiration timestamp |
| `id`         | *string* | :heavy\_minus\_sign: | Audio output identifier    |
| `transcript` | *string* | :heavy\_minus\_sign: | Audio transcript           |
