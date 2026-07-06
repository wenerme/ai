> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# InputAudioInputAudio - TypeScript SDK

> InputAudioInputAudio type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { InputAudioInputAudio } from "@openrouter/sdk/models";

let value: InputAudioInputAudio = {
  data: "<value>",
  format: "wav",
};
```

## Fields

| Field    | Type                                                                       | Required             | Description |
| -------- | -------------------------------------------------------------------------- | -------------------- | ----------- |
| `data`   | *string*                                                                   | :heavy\_check\_mark: | N/A         |
| `format` | [models.FormatEnum](/agent-sdk/typescript/api-reference/models/formatenum) | :heavy\_check\_mark: | N/A         |
