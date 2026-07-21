> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ResponseTextConfig - TypeScript SDK

> ResponseTextConfig method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Text output configuration including format and verbosity

## Example Usage

```typescript lines theme={null}
import { ResponseTextConfig } from "@openrouter/sdk/models";

let value: ResponseTextConfig = {};
```

## Fields

| Field       | Type                                                                                           | Required             | Description                        | Example            |
| ----------- | ---------------------------------------------------------------------------------------------- | -------------------- | ---------------------------------- | ------------------ |
| `format`    | *models.ResponseFormatTextConfig*                                                              | :heavy\_minus\_sign: | Text response format configuration | `{"type": "text"}` |
| `verbosity` | [models.ResponseTextConfigVerbosity](/docs/agent-sdk/typescript/models/responsetextconfigverbosity) | :heavy\_minus\_sign: | N/A                                |                    |
