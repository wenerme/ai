> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# JSONSchemaConfig - TypeScript SDK

> JSONSchemaConfig method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { JSONSchemaConfig } from "@openrouter/sdk/models";

let value: JSONSchemaConfig = {
  name: "<value>",
};
```

## Fields

| Field         | Type                    | Required             | Description |
| ------------- | ----------------------- | -------------------- | ----------- |
| `name`        | *string*                | :heavy\_check\_mark: | N/A         |
| `description` | *string*                | :heavy\_minus\_sign: | N/A         |
| `schema`      | `Record<string, *any*>` | :heavy\_minus\_sign: | N/A         |
| `strict`      | *boolean*               | :heavy\_minus\_sign: | N/A         |
