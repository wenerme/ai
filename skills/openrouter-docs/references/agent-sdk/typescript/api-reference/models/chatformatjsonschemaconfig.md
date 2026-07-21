> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatFormatJsonSchemaConfig - TypeScript SDK

> ChatFormatJsonSchemaConfig type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

JSON Schema response format for structured outputs

## Example Usage

```typescript lines theme={null}
import { ChatFormatJsonSchemaConfig } from "@openrouter/sdk/models";

let value: ChatFormatJsonSchemaConfig = {
  jsonSchema: {
    name: "math_response",
  },
  type: "json_schema",
};
```

## Fields

| Field        | Type                                                                                           | Required             | Description                      | Example                                                                                                                                                                                                                                |
| ------------ | ---------------------------------------------------------------------------------------------- | -------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `jsonSchema` | [models.ChatJsonSchemaConfig](/docs/agent-sdk/typescript/api-reference/models/chatjsonschemaconfig) | :heavy\_check\_mark: | JSON Schema configuration object | `{"description": "A mathematical response","name": "math_response","schema": {"properties": {"answer": {"type": "number"}`<br />},<br />"required": \[<br />"answer"<br />],<br />"type": "object"<br />},<br />"strict": `true<br/>`} |
| `type`       | *"json\_schema"*                                                                               | :heavy\_check\_mark: | N/A                              |                                                                                                                                                                                                                                        |
