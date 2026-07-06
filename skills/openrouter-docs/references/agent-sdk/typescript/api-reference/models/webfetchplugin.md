> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# WebFetchPlugin - TypeScript SDK

> WebFetchPlugin type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { WebFetchPlugin } from "@openrouter/sdk/models";

let value: WebFetchPlugin = {
  id: "web-fetch",
};
```

## Fields

| Field              | Type          | Required             | Description                                                                              |
| ------------------ | ------------- | -------------------- | ---------------------------------------------------------------------------------------- |
| `allowedDomains`   | *string*\[]   | :heavy\_minus\_sign: | Only fetch from these domains.                                                           |
| `blockedDomains`   | *string*\[]   | :heavy\_minus\_sign: | Never fetch from these domains.                                                          |
| `id`               | *"web-fetch"* | :heavy\_check\_mark: | N/A                                                                                      |
| `maxContentTokens` | *number*      | :heavy\_minus\_sign: | Maximum content length in approximate tokens. Content exceeding this limit is truncated. |
| `maxUses`          | *number*      | :heavy\_minus\_sign: | Maximum number of web fetches per request. Once exceeded, the tool returns an error.     |
