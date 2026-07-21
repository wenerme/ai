> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ContentFilterBuiltinEntryInput - TypeScript SDK

> ContentFilterBuiltinEntryInput type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

A builtin content filter entry for create/update requests. Labels are system-assigned and cannot be set by the caller.

## Example Usage

```typescript lines theme={null}
import { ContentFilterBuiltinEntryInput } from "@openrouter/sdk/models";

let value: ContentFilterBuiltinEntryInput = {
  action: "redact",
  slug: "email",
};
```

## Fields

| Field       | Type                                                                                                       | Required             | Description                                                                                                                                                                                                                                                              | Example                |
| ----------- | ---------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| `action`    | [models.ContentFilterBuiltinAction](/docs/agent-sdk/typescript/api-reference/models/contentfilterbuiltinaction) | :heavy\_check\_mark: | Action taken when the builtin filter triggers                                                                                                                                                                                                                            | block                  |
| ~~`label`~~ | *string*                                                                                                   | :heavy\_minus\_sign: | : warning: \*\* DEPRECATED \*\*: This will be removed in a future release, please migrate away from it as soon as possible.<br /><br />Deprecated: labels are system-assigned and cannot be set by the caller. Accepted for backward compatibility but silently ignored. |                        |
| `slug`      | [models.ContentFilterBuiltinSlug](/docs/agent-sdk/typescript/api-reference/models/contentfilterbuiltinslug)     | :heavy\_check\_mark: | The builtin filter identifier                                                                                                                                                                                                                                            | regex-prompt-injection |
