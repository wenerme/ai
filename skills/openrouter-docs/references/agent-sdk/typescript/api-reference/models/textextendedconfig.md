> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# TextExtendedConfig - TypeScript SDK

> TextExtendedConfig type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Text output configuration including format and verbosity

## Example Usage

```typescript lines theme={null}
import { TextExtendedConfig } from "@openrouter/sdk/models";

let value: TextExtendedConfig = {};
```

## Fields

| Field       | Type                                                                     | Required             | Description                        | Example            |
| ----------- | ------------------------------------------------------------------------ | -------------------- | ---------------------------------- | ------------------ |
| `format`    | *models.Formats*                                                         | :heavy\_minus\_sign: | Text response format configuration | `{"type": "text"}` |
| `verbosity` | [models.Verbosity](/agent-sdk/typescript/api-reference/models/verbosity) | :heavy\_minus\_sign: | N/A                                |                    |
