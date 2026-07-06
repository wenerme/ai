> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesRequestMaxPrice - TypeScript SDK

> OpenResponsesRequestMaxPrice method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

The object specifying the maximum price you want to pay for this request. USD price per million tokens, for prompt and completion.

## Example Usage

```typescript lines theme={null}
import { OpenResponsesRequestMaxPrice } from "@openrouter/sdk/models";

let value: OpenResponsesRequestMaxPrice = {};
```

## Fields

| Field        | Type     | Required             | Description                                     | Example |
| ------------ | -------- | -------------------- | ----------------------------------------------- | ------- |
| `prompt`     | *string* | :heavy\_minus\_sign: | A value in string format that is a large number | 1000    |
| `completion` | *string* | :heavy\_minus\_sign: | A value in string format that is a large number | 1000    |
| `image`      | *string* | :heavy\_minus\_sign: | A value in string format that is a large number | 1000    |
| `audio`      | *string* | :heavy\_minus\_sign: | A value in string format that is a large number | 1000    |
| `request`    | *string* | :heavy\_minus\_sign: | A value in string format that is a large number | 1000    |
