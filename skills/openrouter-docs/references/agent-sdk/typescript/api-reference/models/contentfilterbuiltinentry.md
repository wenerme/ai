> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ContentFilterBuiltinEntry - TypeScript SDK

> ContentFilterBuiltinEntry type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

A builtin content filter entry. Builtin filters include PII detectors and the regex-based prompt injection detector.

## Example Usage

```typescript lines theme={null}
import { ContentFilterBuiltinEntry } from "@openrouter/sdk/models";

let value: ContentFilterBuiltinEntry = {
  action: "redact",
  slug: "email",
};
```

## Fields

| Field    | Type                                                                                                       | Required             | Description                                                                                                                       | Example                |
| -------- | ---------------------------------------------------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `action` | [models.ContentFilterBuiltinAction](/docs/agent-sdk/typescript/api-reference/models/contentfilterbuiltinaction) | :heavy\_check\_mark: | Action taken when the builtin filter triggers                                                                                     | block                  |
| `label`  | *string*                                                                                                   | :heavy\_minus\_sign: | Read-only, system-assigned redaction placeholder derived from the slug (e.g. "\[EMAIL]", "\[PHONE]"). Not settable by the caller. | \[EMAIL]               |
| `slug`   | [models.ContentFilterBuiltinSlug](/docs/agent-sdk/typescript/api-reference/models/contentfilterbuiltinslug)     | :heavy\_check\_mark: | The builtin filter identifier                                                                                                     | regex-prompt-injection |
