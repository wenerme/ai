> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# URLCitation - TypeScript SDK

> URLCitation type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { URLCitation } from "@openrouter/sdk/models";

let value: URLCitation = {
  endIndex: 827156,
  startIndex: 720244,
  title: "<value>",
  type: "url_citation",
  url: "https://snappy-decision.biz",
};
```

## Fields

| Field        | Type              | Required             | Description |
| ------------ | ----------------- | -------------------- | ----------- |
| `endIndex`   | *number*          | :heavy\_check\_mark: | N/A         |
| `startIndex` | *number*          | :heavy\_check\_mark: | N/A         |
| `title`      | *string*          | :heavy\_check\_mark: | N/A         |
| `type`       | *"url\_citation"* | :heavy\_check\_mark: | N/A         |
| `url`        | *string*          | :heavy\_check\_mark: | N/A         |
