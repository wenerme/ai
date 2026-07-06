> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ApplyPatchServerToolConfig - TypeScript SDK

> ApplyPatchServerToolConfig type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Configuration for the openrouter:apply\_patch server tool

## Example Usage

```typescript lines theme={null}
import { ApplyPatchServerToolConfig } from "@openrouter/sdk/models";

let value: ApplyPatchServerToolConfig = {};
```

## Fields

| Field    | Type                                                                                           | Required             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Example |
| -------- | ---------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `engine` | [models.ApplyPatchEngineEnum](/agent-sdk/typescript/api-reference/models/applypatchengineenum) | :heavy\_minus\_sign: | Which apply\_patch engine to use. "auto" (default) uses native passthrough when the endpoint advertises native apply\_patch support, otherwise falls back to OpenRouter's HITL validator. "native" forces native passthrough — when the endpoint does not support native, the request falls back to HITL. "openrouter" always runs the HITL validator. Native passthrough streams the diff incrementally via `apply_patch_call_operation_diff.delta` events; HITL buffers the diff for atomic delivery as a single delta. | auto    |
