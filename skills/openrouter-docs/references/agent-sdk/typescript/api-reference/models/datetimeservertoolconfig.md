> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# DatetimeServerToolConfig - TypeScript SDK

> DatetimeServerToolConfig type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Configuration for the openrouter:datetime server tool

## Example Usage

```typescript lines theme={null}
import { DatetimeServerToolConfig } from "@openrouter/sdk/models";

let value: DatetimeServerToolConfig = {};
```

## Fields

| Field      | Type     | Required             | Description                                                     | Example           |
| ---------- | -------- | -------------------- | --------------------------------------------------------------- | ----------------- |
| `timezone` | *string* | :heavy\_minus\_sign: | IANA timezone name (e.g. "America/New\_York"). Defaults to UTC. | America/New\_York |
