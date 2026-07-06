> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatContentVideoInput - TypeScript SDK

> ChatContentVideoInput type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Video input object

## Example Usage

```typescript lines theme={null}
import { ChatContentVideoInput } from "@openrouter/sdk/models";

let value: ChatContentVideoInput = {
  url: "https://example.com/video.mp4",
};
```

## Fields

| Field | Type     | Required             | Description                             |
| ----- | -------- | -------------------- | --------------------------------------- |
| `url` | *string* | :heavy\_check\_mark: | URL of the video (data: URLs supported) |
