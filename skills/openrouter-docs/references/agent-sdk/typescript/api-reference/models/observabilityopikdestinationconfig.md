> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ObservabilityOpikDestinationConfig - TypeScript SDK

> ObservabilityOpikDestinationConfig type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ObservabilityOpikDestinationConfig } from "@openrouter/sdk/models";

let value: ObservabilityOpikDestinationConfig = {
  apiKey: "<value>",
  projectName: "<value>",
  workspace: "<value>",
};
```

## Fields

| Field         | Type                       | Required             | Description                                                     |
| ------------- | -------------------------- | -------------------- | --------------------------------------------------------------- |
| `apiKey`      | *string*                   | :heavy\_check\_mark: | N/A                                                             |
| `headers`     | `Record<string, *string*>` | :heavy\_minus\_sign: | Custom HTTP headers to include in requests to this destination. |
| `projectName` | *string*                   | :heavy\_check\_mark: | N/A                                                             |
| `workspace`   | *string*                   | :heavy\_check\_mark: | N/A                                                             |
