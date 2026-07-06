> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ResponseFormatJSONSchema - TypeScript SDK

> ResponseFormatJSONSchema method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ResponseFormatJSONSchema } from "@openrouter/sdk/models";

let value: ResponseFormatJSONSchema = {
  type: "json_schema",
  jsonSchema: {
    name: "<value>",
  },
};
```

## Fields

| Field        | Type                                                                     | Required             | Description |
| ------------ | ------------------------------------------------------------------------ | -------------------- | ----------- |
| `type`       | *"json\_schema"*                                                         | :heavy\_check\_mark: | N/A         |
| `jsonSchema` | [models.JSONSchemaConfig](/agent-sdk/typescript/models/jsonschemaconfig) | :heavy\_check\_mark: | N/A         |
