> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# GetCreditsData - TypeScript SDK

> GetCreditsData type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { GetCreditsData } from "@openrouter/sdk/models/operations";

let value: GetCreditsData = {
  totalCredits: 100.5,
  totalUsage: 25.75,
};
```

## Fields

| Field          | Type     | Required             | Description             | Example |
| -------------- | -------- | -------------------- | ----------------------- | ------- |
| `totalCredits` | *number* | :heavy\_check\_mark: | Total credits purchased | 100.5   |
| `totalUsage`   | *number* | :heavy\_check\_mark: | Total credits used      | 25.75   |
