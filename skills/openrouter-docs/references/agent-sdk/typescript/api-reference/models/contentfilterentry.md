> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ContentFilterEntry - TypeScript SDK

> ContentFilterEntry type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

A custom regex content filter that scans request messages for matching patterns.

## Example Usage

```typescript lines theme={null}
import { ContentFilterEntry } from "@openrouter/sdk/models";

let value: ContentFilterEntry = {
  action: "redact",
  pattern: "\\b(sk-[a-zA-Z0-9]{48})\\b",
};
```

## Fields

| Field     | Type                                                                                         | Required             | Description                                                     | Example                     |
| --------- | -------------------------------------------------------------------------------------------- | -------------------- | --------------------------------------------------------------- | --------------------------- |
| `action`  | [models.ContentFilterAction](/docs/agent-sdk/typescript/api-reference/models/contentfilteraction) | :heavy\_check\_mark: | Action taken when the pattern matches                           | block                       |
| `label`   | *string*                                                                                     | :heavy\_minus\_sign: | Optional label used in redaction placeholders or error messages | \[API\_KEY]                 |
| `pattern` | *string*                                                                                     | :heavy\_check\_mark: | A regex pattern to match against request content                | \b(sk-\[a-zA-Z0-9]`{48}`)\b |
