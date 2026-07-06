> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesResponseText - TypeScript SDK

> OpenResponsesResponseText method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Text output configuration including format and verbosity

## Example Usage

```typescript lines theme={null}
import { OpenResponsesResponseText } from "@openrouter/sdk/models";

let value: OpenResponsesResponseText = {};
```

## Fields

| Field       | Type                                                                                                         | Required             | Description                        | Example            |
| ----------- | ------------------------------------------------------------------------------------------------------------ | -------------------- | ---------------------------------- | ------------------ |
| `format`    | *models.ResponseFormatTextConfig*                                                                            | :heavy\_minus\_sign: | Text response format configuration | `{"type": "text"}` |
| `verbosity` | [models.OpenResponsesResponseTextVerbosity](/agent-sdk/typescript/models/openresponsesresponsetextverbosity) | :heavy\_minus\_sign: | N/A                                |                    |
