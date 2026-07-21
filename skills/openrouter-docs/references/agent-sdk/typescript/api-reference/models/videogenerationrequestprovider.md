> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# VideoGenerationRequestProvider - TypeScript SDK

> VideoGenerationRequestProvider type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Provider-specific passthrough configuration

## Example Usage

```typescript lines theme={null}
import { VideoGenerationRequestProvider } from "@openrouter/sdk/models";

let value: VideoGenerationRequestProvider = {};
```

## Fields

| Field     | Type                                                                 | Required             | Description | Example                                                               |
| --------- | -------------------------------------------------------------------- | -------------------- | ----------- | --------------------------------------------------------------------- |
| `options` | [models.Options](/docs/agent-sdk/typescript/api-reference/models/options) | :heavy\_minus\_sign: | N/A         | `{"google-vertex": {"output_config": {"effort": "low"}`<br />}<br />} |
