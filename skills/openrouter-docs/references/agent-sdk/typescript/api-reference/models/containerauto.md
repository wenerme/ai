> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ContainerAuto - TypeScript SDK

> ContainerAuto type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ContainerAuto } from "@openrouter/sdk/models";

let value: ContainerAuto = {
  type: "auto",
};
```

## Fields

| Field         | Type                                                                             | Required             | Description |
| ------------- | -------------------------------------------------------------------------------- | -------------------- | ----------- |
| `fileIds`     | *string*\[]                                                                      | :heavy\_minus\_sign: | N/A         |
| `memoryLimit` | [models.MemoryLimit](/docs/agent-sdk/typescript/api-reference/models/memorylimit)     | :heavy\_minus\_sign: | N/A         |
| `type`        | [models.ContainerType](/docs/agent-sdk/typescript/api-reference/models/containertype) | :heavy\_check\_mark: | N/A         |
