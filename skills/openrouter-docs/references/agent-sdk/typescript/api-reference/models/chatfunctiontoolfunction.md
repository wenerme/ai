> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatFunctionToolFunction - TypeScript SDK

> ChatFunctionToolFunction type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ChatFunctionToolFunction } from "@openrouter/sdk/models";

let value: ChatFunctionToolFunction = {
  function: {
    name: "get_weather",
  },
  type: "function",
};
```

## Fields

| Field          | Type                                                                                                                   | Required             | Description                          | Example                                                                                                                                                                                                                                                          |
| -------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cacheControl` | [models.ChatContentCacheControl](/docs/agent-sdk/typescript/api-reference/models/chatcontentcachecontrol)                   | :heavy\_minus\_sign: | Cache control for the content part   | `{"ttl": "5m","type": "ephemeral"}`                                                                                                                                                                                                                              |
| `function`     | [models.ChatFunctionToolFunctionFunction](/docs/agent-sdk/typescript/api-reference/models/chatfunctiontoolfunctionfunction) | :heavy\_check\_mark: | Function definition for tool calling | `{"description": "Get the current weather for a location","name": "get_weather","parameters": {"properties": {"location": {"description": "City name","type": "string"}`<br />},<br />"required": \[<br />"location"<br />],<br />"type": "object"<br />}<br />} |
| `type`         | [models.ChatFunctionToolType](/docs/agent-sdk/typescript/api-reference/models/chatfunctiontooltype)                         | :heavy\_check\_mark: | N/A                                  |                                                                                                                                                                                                                                                                  |
