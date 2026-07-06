> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ObservabilityLangsmithDestinationConfig - TypeScript SDK

> ObservabilityLangsmithDestinationConfig type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ObservabilityLangsmithDestinationConfig } from "@openrouter/sdk/models";

let value: ObservabilityLangsmithDestinationConfig = {
  apiKey: "<value>",
};
```

## Fields

| Field         | Type                       | Required             | Description                                                                           |
| ------------- | -------------------------- | -------------------- | ------------------------------------------------------------------------------------- |
| `apiKey`      | *string*                   | :heavy\_check\_mark: | N/A                                                                                   |
| `endpoint`    | *string*                   | :heavy\_minus\_sign: | N/A                                                                                   |
| `headers`     | `Record<string, *string*>` | :heavy\_minus\_sign: | Custom HTTP headers to include in requests to this destination.                       |
| `project`     | *string*                   | :heavy\_minus\_sign: | The name for this project, such as pr-openrouter-demo. Defaults to "main" if not set. |
| `workspaceId` | *string*                   | :heavy\_minus\_sign: | Required for org-scoped API keys. Find this in your LangSmith workspace settings.     |
