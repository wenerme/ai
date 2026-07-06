> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Content - TypeScript SDK

> Content method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `operations.ContentText`

```typescript lines theme={null}
const value: operations.ContentText = {
  type: "text",
  text: "<value>",
};
```

### `operations.ContentImageURL`

```typescript lines theme={null}
const value: operations.ContentImageURL = {
  type: "image_url",
  imageUrl: {
    url: "https://zealous-march.biz/",
  },
};
```
