# Counting tokens

Token counting lets you determine how many input tokens a request will use before you send it to the model. Use it to:

- **Optimize prompts** to fit within context limits
- **Estimate costs** before making API calls
- **Route requests** based on size (e.g., smaller prompts to faster models)
- **Avoid surprises** with images and files—no more character-based estimation

The [input token count endpoint](https://developers.openai.com/api/reference/python/resources/responses/subresources/input_tokens/methods/count) accepts the same input format as the [Responses API](https://developers.openai.com/api/docs/api-reference/responses/create). Pass text, messages, images, files, tools, or conversations—the API returns the exact count the model will receive.

## Why use the token counting API?

Local tokenizers like [tiktoken](https://github.com/openai/tiktoken) work for plain text, but they have limitations:

- **Images and files** are not supported—estimates like `characters / 4` are inaccurate
- **Tools and schemas** add tokens that are hard to count locally
- **Model-specific behavior** can change tokenization (e.g., reasoning, caching)

The token counting API handles all of these. Use the same payload you would send to `responses.create` and get an accurate count. Then plug the result into your message validation or cost estimation flow.

## Count tokens in basic messages

## Count tokens in conversations

## Count tokens with instructions

## Count tokens with images

Images consume tokens based on size and detail level. The token counting API returns the exact count—no guesswork.

You can use `file_id` (from the [Files API](https://developers.openai.com/api/docs/api-reference/files)) or `image_url` (a URL or base64 data URL). See [images and vision](https://developers.openai.com/api/docs/guides/images-vision) for details.

## Count tokens with tools

Tool definitions (function schemas, MCP servers, etc.) add tokens to the context. Count them together with your input:

## Count tokens with files

[File inputs](https://developers.openai.com/api/docs/guides/pdf-files)—currently PDFs—are supported. Pass `file_id`, `file_url`, or `file_data` as you would for `responses.create`. The token count reflects the model’s full processed input.

## API reference

For full parameters and response shape, see the [Count input tokens API reference](https://developers.openai.com/api/reference/python/resources/responses/subresources/input_tokens/methods/count). The endpoint is:

```
POST /v1/responses/input_tokens
```

The response includes `input_tokens` (integer) and `object: "response.input_tokens"`.