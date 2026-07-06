> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatJsonSchemaConfig - TypeScript SDK

> ChatJsonSchemaConfig type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

JSON Schema configuration object

## Example Usage

```typescript lines theme={null}
import { ChatJsonSchemaConfig } from "@openrouter/sdk/models";

let value: ChatJsonSchemaConfig = {
  name: "math_response",
};
```

## Fields

| Field         | Type                    | Required             | Description                                                    | Example                                                                                                                       |
| ------------- | ----------------------- | -------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `description` | *string*                | :heavy\_minus\_sign: | Schema description for the model                               | A mathematical response                                                                                                       |
| `name`        | *string*                | :heavy\_check\_mark: | Schema name (a-z, A-Z, 0-9, underscores, dashes, max 64 chars) | math\_response                                                                                                                |
| `schema`      | `Record<string, *any*>` | :heavy\_minus\_sign: | JSON Schema object                                             | `{"properties": {"answer": {"type": "number"}`<br />},<br />"required": \[<br />"answer"<br />],<br />"type": "object"<br />} |
| `strict`      | *boolean*               | :heavy\_minus\_sign: | Enable strict schema adherence                                 | false                                                                                                                         |
