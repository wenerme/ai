> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ObservabilityOtelCollectorDestinationConfig - TypeScript SDK

> ObservabilityOtelCollectorDestinationConfig type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ObservabilityOtelCollectorDestinationConfig } from "@openrouter/sdk/models";

let value: ObservabilityOtelCollectorDestinationConfig = {
  endpoint: "<value>",
};
```

## Fields

| Field      | Type                       | Required             | Description                                                                                                                    |
| ---------- | -------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `endpoint` | *string*                   | :heavy\_check\_mark: | N/A                                                                                                                            |
| `headers`  | `Record<string, *string*>` | :heavy\_minus\_sign: | Custom HTTP headers as a JSON object. For Axiom, use `{"Authorization": "Bearer xaat-xxx", "X-Axiom-Dataset": "your-dataset"}` |
