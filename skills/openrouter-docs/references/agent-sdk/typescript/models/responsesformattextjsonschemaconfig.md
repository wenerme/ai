> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ResponsesFormatTextJSONSchemaConfig - TypeScript SDK

> ResponsesFormatTextJSONSchemaConfig method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

JSON schema constrained response format

## Example Usage

```typescript lines theme={null}
import { ResponsesFormatTextJSONSchemaConfig } from "@openrouter/sdk/models";

let value: ResponsesFormatTextJSONSchemaConfig = {
  type: "json_schema",
  name: "<value>",
  schema: {
    "key": "<value>",
    "key1": "<value>",
  },
};
```

## Fields

| Field         | Type                    | Required             | Description |
| ------------- | ----------------------- | -------------------- | ----------- |
| `type`        | *"json\_schema"*        | :heavy\_check\_mark: | N/A         |
| `name`        | *string*                | :heavy\_check\_mark: | N/A         |
| `description` | *string*                | :heavy\_minus\_sign: | N/A         |
| `strict`      | *boolean*               | :heavy\_minus\_sign: | N/A         |
| `schema`      | `Record<string, *any*>` | :heavy\_check\_mark: | N/A         |
