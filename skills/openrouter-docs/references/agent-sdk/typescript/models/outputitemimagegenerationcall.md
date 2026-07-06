> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputItemImageGenerationCall - TypeScript SDK

> OutputItemImageGenerationCall method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { OutputItemImageGenerationCall } from "@openrouter/sdk/models";

let value: OutputItemImageGenerationCall = {
  type: "image_generation_call",
  id: "imagegen-abc123",
  result:
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  status: "completed",
};
```

## Fields

| Field    | Type                                                                                                       | Required             | Description | Example   |
| -------- | ---------------------------------------------------------------------------------------------------------- | -------------------- | ----------- | --------- |
| `type`   | [models.OutputItemImageGenerationCallType](/agent-sdk/typescript/models/outputitemimagegenerationcalltype) | :heavy\_check\_mark: | N/A         |           |
| `id`     | *string*                                                                                                   | :heavy\_check\_mark: | N/A         |           |
| `result` | *string*                                                                                                   | :heavy\_minus\_sign: | N/A         |           |
| `status` | [models.ImageGenerationStatus](/agent-sdk/typescript/models/imagegenerationstatus)                         | :heavy\_check\_mark: | N/A         | completed |
