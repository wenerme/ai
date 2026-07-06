> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatFunctionToolFunctionFunction - TypeScript SDK

> ChatFunctionToolFunctionFunction type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Function definition for tool calling

## Example Usage

```typescript lines theme={null}
import { ChatFunctionToolFunctionFunction } from "@openrouter/sdk/models";

let value: ChatFunctionToolFunctionFunction = {
  name: "get_weather",
};
```

## Fields

| Field         | Type                    | Required             | Description                                                      | Example                                                                                                                                                      |
| ------------- | ----------------------- | -------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `description` | *string*                | :heavy\_minus\_sign: | Function description for the model                               | Get the current weather for a location                                                                                                                       |
| `name`        | *string*                | :heavy\_check\_mark: | Function name (a-z, A-Z, 0-9, underscores, dashes, max 64 chars) | get\_weather                                                                                                                                                 |
| `parameters`  | `Record<string, *any*>` | :heavy\_minus\_sign: | Function parameters as JSON Schema object                        | `{"properties": {"location": {"description": "City name","type": "string"}`<br />},<br />"required": \[<br />"location"<br />],<br />"type": "object"<br />} |
| `strict`      | *boolean*               | :heavy\_minus\_sign: | Enable strict schema adherence                                   | false                                                                                                                                                        |
