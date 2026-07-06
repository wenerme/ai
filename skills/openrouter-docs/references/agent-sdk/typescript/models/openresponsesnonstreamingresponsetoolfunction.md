> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesNonStreamingResponseToolFunction - TypeScript SDK

> OpenResponsesNonStreamingResponseToolFunction method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Function tool definition

## Example Usage

```typescript expandable lines theme={null}
import { OpenResponsesNonStreamingResponseToolFunction } from "@openrouter/sdk/models";

let value: OpenResponsesNonStreamingResponseToolFunction = {
  type: "function",
  name: "get_weather",
  parameters: {
    "type": "object",
    "properties": {
      "location": {
        "type": "string",
        "description": "The city and state",
      },
      "unit": {
        "type": "string",
        "enum": [
          "celsius",
          "fahrenheit",
        ],
        "x-speakeasy-unknown-values": "allow",
      },
    },
    "required": [
      "location",
    ],
  },
};
```

## Fields

| Field         | Type                    | Required             | Description |
| ------------- | ----------------------- | -------------------- | ----------- |
| `type`        | *"function"*            | :heavy\_check\_mark: | N/A         |
| `name`        | *string*                | :heavy\_check\_mark: | N/A         |
| `description` | *string*                | :heavy\_minus\_sign: | N/A         |
| `strict`      | *boolean*               | :heavy\_minus\_sign: | N/A         |
| `parameters`  | `Record<string, *any*>` | :heavy\_check\_mark: | N/A         |
