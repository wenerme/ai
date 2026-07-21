> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ApplyPatchServerToolOpenRouter - TypeScript SDK

> ApplyPatchServerToolOpenRouter type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

OpenRouter built-in server tool: validates V4A diff patches for file operations (create, update, delete). Restricted to the Responses API.

## Example Usage

```typescript lines theme={null}
import { ApplyPatchServerToolOpenRouter } from "@openrouter/sdk/models";

let value: ApplyPatchServerToolOpenRouter = {
  type: "openrouter:apply_patch",
};
```

## Fields

| Field        | Type                                                                                                       | Required             | Description                                               | Example              |
| ------------ | ---------------------------------------------------------------------------------------------------------- | -------------------- | --------------------------------------------------------- | -------------------- |
| `parameters` | [models.ApplyPatchServerToolConfig](/docs/agent-sdk/typescript/api-reference/models/applypatchservertoolconfig) | :heavy\_minus\_sign: | Configuration for the openrouter:apply\_patch server tool | `{"engine": "auto"}` |
| `type`       | *"openrouter:apply\_patch"*                                                                                | :heavy\_check\_mark: | N/A                                                       |                      |
