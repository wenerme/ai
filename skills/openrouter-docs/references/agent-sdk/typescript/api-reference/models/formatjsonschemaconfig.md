> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# FormatJsonSchemaConfig - TypeScript SDK

> FormatJsonSchemaConfig type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

JSON schema constrained response format

## Example Usage

```typescript lines theme={null}
import { FormatJsonSchemaConfig } from "@openrouter/sdk/models";

let value: FormatJsonSchemaConfig = {
  name: "<value>",
  schema: {
    "key": "<value>",
  },
  type: "json_schema",
};
```

## Fields

| Field         | Type                    | Required             | Description |
| ------------- | ----------------------- | -------------------- | ----------- |
| `description` | *string*                | :heavy\_minus\_sign: | N/A         |
| `name`        | *string*                | :heavy\_check\_mark: | N/A         |
| `schema`      | `Record<string, *any*>` | :heavy\_check\_mark: | N/A         |
| `strict`      | *boolean*               | :heavy\_minus\_sign: | N/A         |
| `type`        | *"json\_schema"*        | :heavy\_check\_mark: | N/A         |
