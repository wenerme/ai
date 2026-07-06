> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# DataCollection - TypeScript SDK

> DataCollection method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Data collection setting. If no available model provider meets the requirement, your request will return an error.

* allow: (default) allow providers which store user data non-transiently and may train on it

* deny: use only providers which do not collect user data.

## Example Usage

```typescript lines theme={null}
import { DataCollection } from "@openrouter/sdk/models";

let value: DataCollection = "allow";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript lines theme={null}
"deny" | "allow" | Unrecognized<string>
```
