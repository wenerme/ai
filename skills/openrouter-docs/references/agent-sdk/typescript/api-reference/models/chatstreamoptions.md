> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatStreamOptions - TypeScript SDK

> ChatStreamOptions type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Streaming configuration options

## Example Usage

```typescript lines theme={null}
import { ChatStreamOptions } from "@openrouter/sdk/models";

let value: ChatStreamOptions = {};
```

## Fields

| Field              | Type      | Required             | Description                                                                                                                                                                                                          | Example |
| ------------------ | --------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| ~~`includeUsage`~~ | *boolean* | :heavy\_minus\_sign: | : warning: \*\* DEPRECATED \*\*: This will be removed in a future release, please migrate away from it as soon as possible.<br /><br />Deprecated: This field has no effect. Full usage details are always included. | true    |
