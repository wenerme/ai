> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesResultToolFunction - TypeScript SDK

> OpenResponsesResultToolFunction type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Function tool definition

## Example Usage

```typescript expandable lines theme={null}
import { OpenResponsesResultToolFunction } from "@openrouter/sdk/models";

let value: OpenResponsesResultToolFunction = {
  name: "get_weather",
  parameters: {
    "properties": {
      "location": {
        "description": "The city and state",
        "type": "string",
      },
      "unit": {
        "enum": [
          "celsius",
          "fahrenheit",
        ],
        "type": "string",
        "x-speakeasy-unknown-values": "allow",
      },
    },
    "required": [
      "location",
    ],
    "type": "object",
  },
  type: "function",
};
```

## Fields

| Field         | Type                    | Required             | Description |
| ------------- | ----------------------- | -------------------- | ----------- |
| `description` | *string*                | :heavy\_minus\_sign: | N/A         |
| `name`        | *string*                | :heavy\_check\_mark: | N/A         |
| `parameters`  | `Record<string, *any*>` | :heavy\_check\_mark: | N/A         |
| `strict`      | *boolean*               | :heavy\_minus\_sign: | N/A         |
| `type`        | *"function"*            | :heavy\_check\_mark: | N/A         |
