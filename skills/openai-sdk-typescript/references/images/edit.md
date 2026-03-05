## Edit

`client.images.edit(ImageEditParamsbody, RequestOptionsoptions?): ImagesResponse | Stream<ImageEditStreamEvent>`

**post** `/images/edits`

Creates an edited or extended image given one or more source images and a prompt. This endpoint supports GPT Image models (`gpt-image-1.5`, `gpt-image-1`, `gpt-image-1-mini`, and `chatgpt-image-latest`) and `dall-e-2`.

### Parameters

- `ImageEditParams = ImageEditParamsNonStreaming | ImageEditParamsStreaming`

  - `ImageEditParamsBase`

    - `image: Uploadable | Array<Uploadable>`

      The image(s) to edit. Must be a supported image file or an array of images.

      For the GPT image models (`gpt-image-1`, `gpt-image-1-mini`, and `gpt-image-1.5`), each image should be a `png`, `webp`, or `jpg`
      file less than 50MB. You can provide up to 16 images.
      `chatgpt-image-latest` follows the same input constraints as GPT image models.

      For `dall-e-2`, you can only provide one image, and it should be a square
      `png` file less than 4MB.

      - `Uploadable`

      - `Array<Uploadable>`

    - `prompt: string`

      A text description of the desired image(s). The maximum length is 1000 characters for `dall-e-2`, and 32000 characters for the GPT image models.

    - `background?: "transparent" | "opaque" | "auto" | null`

      Allows to set transparency for the background of the generated image(s).
      This parameter is only supported for the GPT image models. Must be one of
      `transparent`, `opaque` or `auto` (default value). When `auto` is used, the
      model will automatically determine the best background for the image.

      If `transparent`, the output format needs to support transparency, so it
      should be set to either `png` (default value) or `webp`.

      - `"transparent"`

      - `"opaque"`

      - `"auto"`

    - `input_fidelity?: "high" | "low" | null`

      Control how much effort the model will exert to match the style and features, especially facial features, of input images. This parameter is only supported for `gpt-image-1` and `gpt-image-1.5` and later models, unsupported for `gpt-image-1-mini`. Supports `high` and `low`. Defaults to `low`.

      - `"high"`

      - `"low"`

    - `mask?: Uploadable`

      An additional image whose fully transparent areas (e.g. where alpha is zero) indicate where `image` should be edited. If there are multiple images provided, the mask will be applied on the first image. Must be a valid PNG file, less than 4MB, and have the same dimensions as `image`.

    - `model?: (string & {}) | ImageModel | null`

      The model to use for image generation. Defaults to `gpt-image-1.5`.

      - `(string & {})`

      - `ImageModel = "gpt-image-1.5" | "dall-e-2" | "dall-e-3" | 2 more`

        - `"gpt-image-1.5"`

        - `"dall-e-2"`

        - `"dall-e-3"`

        - `"gpt-image-1"`

        - `"gpt-image-1-mini"`

    - `n?: number | null`

      The number of images to generate. Must be between 1 and 10.

    - `output_compression?: number | null`

      The compression level (0-100%) for the generated images. This parameter
      is only supported for the GPT image models with the `webp` or `jpeg` output
      formats, and defaults to 100.

    - `output_format?: "png" | "jpeg" | "webp" | null`

      The format in which the generated images are returned. This parameter is
      only supported for the GPT image models. Must be one of `png`, `jpeg`, or `webp`.
      The default value is `png`.

      - `"png"`

      - `"jpeg"`

      - `"webp"`

    - `partial_images?: number | null`

      The number of partial images to generate. This parameter is used for
      streaming responses that return partial images. Value must be between 0 and 3.
      When set to 0, the response will be a single image sent in one streaming event.

      Note that the final image may be sent before the full number of partial images
      are generated if the full image is generated more quickly.

    - `quality?: "standard" | "low" | "medium" | 2 more | null`

      The quality of the image that will be generated for GPT image models. Defaults to `auto`.

      - `"standard"`

      - `"low"`

      - `"medium"`

      - `"high"`

      - `"auto"`

    - `response_format?: "url" | "b64_json" | null`

      The format in which the generated images are returned. Must be one of `url` or `b64_json`. URLs are only valid for 60 minutes after the image has been generated. This parameter is only supported for `dall-e-2` (default is `url` for `dall-e-2`), as GPT image models always return base64-encoded images.

      - `"url"`

      - `"b64_json"`

    - `size?: "256x256" | "512x512" | "1024x1024" | 3 more | null`

      The size of the generated images. Must be one of `1024x1024`, `1536x1024` (landscape), `1024x1536` (portrait), or `auto` (default value) for the GPT image models, and one of `256x256`, `512x512`, or `1024x1024` for `dall-e-2`.

      - `"256x256"`

      - `"512x512"`

      - `"1024x1024"`

      - `"1536x1024"`

      - `"1024x1536"`

      - `"auto"`

    - `stream?: false | null`

      Edit the image in streaming mode. Defaults to `false`. See the
      [Image generation guide](https://platform.openai.com/docs/guides/image-generation) for more information.

      - `false`

    - `user?: string`

      A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](https://platform.openai.com/docs/guides/safety-best-practices#end-user-ids).

  - `ImageEditParamsNonStreaming extends ImageEditParamsBase`

    - `stream?: false | null`

      Edit the image in streaming mode. Defaults to `false`. See the
      [Image generation guide](https://platform.openai.com/docs/guides/image-generation) for more information.

      - `false`

  - `ImageEditParamsNonStreaming extends ImageEditParamsBase`

    - `stream?: false | null`

      Edit the image in streaming mode. Defaults to `false`. See the
      [Image generation guide](https://platform.openai.com/docs/guides/image-generation) for more information.

      - `false`

### Returns

- `ImagesResponse`

  The response from the image generation endpoint.

  - `created: number`

    The Unix timestamp (in seconds) of when the image was created.

  - `background?: "transparent" | "opaque"`

    The background parameter used for the image generation. Either `transparent` or `opaque`.

    - `"transparent"`

    - `"opaque"`

  - `data?: Array<Image>`

    The list of generated images.

    - `b64_json?: string`

      The base64-encoded JSON of the generated image. Returned by default for the GPT image models, and only present if `response_format` is set to `b64_json` for `dall-e-2` and `dall-e-3`.

    - `revised_prompt?: string`

      For `dall-e-3` only, the revised prompt that was used to generate the image.

    - `url?: string`

      When using `dall-e-2` or `dall-e-3`, the URL of the generated image if `response_format` is set to `url` (default value). Unsupported for the GPT image models.

  - `output_format?: "png" | "webp" | "jpeg"`

    The output format of the image generation. Either `png`, `webp`, or `jpeg`.

    - `"png"`

    - `"webp"`

    - `"jpeg"`

  - `quality?: "low" | "medium" | "high"`

    The quality of the image generated. Either `low`, `medium`, or `high`.

    - `"low"`

    - `"medium"`

    - `"high"`

  - `size?: "1024x1024" | "1024x1536" | "1536x1024"`

    The size of the image generated. Either `1024x1024`, `1024x1536`, or `1536x1024`.

    - `"1024x1024"`

    - `"1024x1536"`

    - `"1536x1024"`

  - `usage?: Usage`

    For `gpt-image-1` only, the token usage information for the image generation.

    - `input_tokens: number`

      The number of tokens (images and text) in the input prompt.

    - `input_tokens_details: InputTokensDetails`

      The input tokens detailed information for the image generation.

      - `image_tokens: number`

        The number of image tokens in the input prompt.

      - `text_tokens: number`

        The number of text tokens in the input prompt.

    - `output_tokens: number`

      The number of output tokens generated by the model.

    - `total_tokens: number`

      The total number of tokens (images and text) used for the image generation.

    - `output_tokens_details?: OutputTokensDetails`

      The output token details for the image generation.

      - `image_tokens: number`

        The number of image output tokens generated by the model.

      - `text_tokens: number`

        The number of text output tokens generated by the model.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const imagesResponse = await client.images.edit({
  image: fs.createReadStream('path/to/file'),
  prompt: 'A cute baby sea otter wearing a beret',
});

console.log(imagesResponse);
```
