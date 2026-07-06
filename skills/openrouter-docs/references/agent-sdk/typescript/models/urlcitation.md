> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# URLCitation - TypeScript SDK

> URLCitation method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { URLCitation } from "@openrouter/sdk/models";

let value: URLCitation = {
  type: "url_citation",
  url: "https://openrouter.ai/docs",
  title: "OpenRouter Documentation",
  startIndex: 0,
  endIndex: 42,
};
```

## Fields

| Field        | Type              | Required             | Description |
| ------------ | ----------------- | -------------------- | ----------- |
| `type`       | *"url\_citation"* | :heavy\_check\_mark: | N/A         |
| `url`        | *string*          | :heavy\_check\_mark: | N/A         |
| `title`      | *string*          | :heavy\_check\_mark: | N/A         |
| `startIndex` | *number*          | :heavy\_check\_mark: | N/A         |
| `endIndex`   | *number*          | :heavy\_check\_mark: | N/A         |
