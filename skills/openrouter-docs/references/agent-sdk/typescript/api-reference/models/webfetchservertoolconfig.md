> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# WebFetchServerToolConfig - TypeScript SDK

> WebFetchServerToolConfig type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Configuration for the openrouter:web\_fetch server tool

## Example Usage

```typescript lines theme={null}
import { WebFetchServerToolConfig } from "@openrouter/sdk/models";

let value: WebFetchServerToolConfig = {};
```

## Fields

| Field              | Type                                                                                       | Required             | Description                                                                                                                                                                                                                                                                                                       | Example |
| ------------------ | ------------------------------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `allowedDomains`   | *string*\[]                                                                                | :heavy\_minus\_sign: | Only fetch from these domains.                                                                                                                                                                                                                                                                                    |         |
| `blockedDomains`   | *string*\[]                                                                                | :heavy\_minus\_sign: | Never fetch from these domains.                                                                                                                                                                                                                                                                                   |         |
| `engine`           | [models.WebFetchEngineEnum](/agent-sdk/typescript/api-reference/models/webfetchengineenum) | :heavy\_minus\_sign: | Which fetch engine to use. "auto" (default) uses native if the provider supports it, otherwise Exa. "native" forces the provider's built-in fetch. "exa" uses Exa Contents API. "openrouter" uses direct HTTP fetch. "firecrawl" uses Firecrawl scrape (requires BYOK). "parallel" uses the Parallel extract API. | auto    |
| `maxContentTokens` | *number*                                                                                   | :heavy\_minus\_sign: | Maximum content length in approximate tokens. Content exceeding this limit is truncated.                                                                                                                                                                                                                          | 100000  |
| `maxUses`          | *number*                                                                                   | :heavy\_minus\_sign: | Maximum number of web fetches per request. Once exceeded, the tool returns an error.                                                                                                                                                                                                                              | 10      |
