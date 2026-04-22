# Image generation

The image generation tool allows you to generate images using a text prompt, and optionally image inputs. It uses GPT Image models, including `gpt-image-2`, `gpt-image-1.5`, `gpt-image-1`, and `gpt-image-1-mini`, and automatically optimizes text inputs for improved performance.

To learn more about image generation, refer to our dedicated [image generation
  guide](https://developers.openai.com/api/docs/guides/image-generation?api=responses).

## Usage

When you include the `image_generation` tool in your request, the model can decide when and how to generate images as part of the conversation, using your prompt and any provided image inputs.

The `image_generation_call` tool call result will include a base64-encoded image.

Generate an image

```javascript
import OpenAI from "openai";
const openai = new OpenAI();

const response = await openai.responses.create({
    model: "gpt-5.4",
    input: "Generate an image of gray tabby cat hugging an otter with an orange scarf",
    tools: [{type: "image_generation"}],
});

// Save the image to a file
const imageData = response.output
  .filter((output) => output.type === "image_generation_call")
  .map((output) => output.result);

if (imageData.length > 0) {
  const imageBase64 = imageData[0];
  const fs = await import("fs");
  fs.writeFileSync("otter.png", Buffer.from(imageBase64, "base64"));
}
```

```python
from openai import OpenAI
import base64

client = OpenAI() 

response = client.responses.create(
    model="gpt-5.4",
    input="Generate an image of gray tabby cat hugging an otter with an orange scarf",
    tools=[{"type": "image_generation"}],
)

# Save the image to a file
image_data = [
    output.result
    for output in response.output
    if output.type == "image_generation_call"
]
    
if image_data:
    image_base64 = image_data[0]
    with open("otter.png", "wb") as f:
        f.write(base64.b64decode(image_base64))
```


You can [provide input images](https://developers.openai.com/api/docs/guides/image-generation?image-generation-model=gpt-image#edit-images) using file IDs or base64 data.

To force the image generation tool call, you can set the parameter `tool_choice` to `{"type": "image_generation"}`.

### Tool options

You can configure the following output options as parameters for the [image generation tool](https://developers.openai.com/api/docs/api-reference/responses/create#responses-create-tools):

- Size: Image dimensions, for example, 1024 × 1024 or 1024 × 1536
- Quality: Rendering quality, for example, low, medium, or high
- Format: File output format
- Compression: Compression level (0-100%) for JPEG and WebP formats
- Background: Transparent or opaque
- Action: Whether the request should automatically choose, generate, or edit an image

`size`, `quality`, and `background` support the `auto` option, where the model will automatically select the best option based on the prompt.

`gpt-image-2` supports flexible `size` values that meet its [resolution constraints](https://developers.openai.com/api/docs/guides/image-generation#size-and-quality-options). It doesn't currently support transparent backgrounds, so requests with `background: "transparent"` fail.

For more details on available options, refer to the [image generation guide](https://developers.openai.com/api/docs/guides/image-generation#customize-image-output).

When using the Responses API image generation tool, supported GPT Image models can choose whether to generate a new image or edit one already in the conversation. The optional `action` parameter controls this behavior: keep `action` set to `auto` so the model chooses whether to generate or edit, or set it to `generate` or `edit` to force that behavior. If not specified, the default is `auto`.

### Revised prompt

When using the image generation tool, the mainline model, for example, `gpt-5.4`, will automatically revise your prompt for improved performance.

You can access the revised prompt in the `revised_prompt` field of the image generation call:

```json
{
  "id": "ig_123",
  "type": "image_generation_call",
  "status": "completed",
  "revised_prompt": "A gray tabby cat hugging an otter. The otter is wearing an orange scarf. Both animals are cute and friendly, depicted in a warm, heartwarming style.",
  "result": "..."
}
```

### Prompting tips

Image generation works best when you use terms like `draw` or `edit` in your prompt.

For example, if you want to combine images, instead of saying `combine` or `merge`, you can say something like "edit the first image by adding this element from the second image."

## Multi-turn editing

You can iteratively edit images by referencing previous response or image IDs. This allows you to refine images across conversation turns.



<div data-content-switcher-pane data-value="responseid">
    <div class="hidden">Using previous response ID</div>
    Multi-turn image generation

```javascript
import OpenAI from "openai";
const openai = new OpenAI();

const response = await openai.responses.create({
  model: "gpt-5.4",
  input:
    "Generate an image of gray tabby cat hugging an otter with an orange scarf",
  tools: [{ type: "image_generation" }],
});

const imageData = response.output
  .filter((output) => output.type === "image_generation_call")
  .map((output) => output.result);

if (imageData.length > 0) {
  const imageBase64 = imageData[0];
  const fs = await import("fs");
  fs.writeFileSync("cat_and_otter.png", Buffer.from(imageBase64, "base64"));
}

// Follow up

const response_fwup = await openai.responses.create({
  model: "gpt-5.4",
  previous_response_id: response.id,
  input: "Now make it look realistic",
  tools: [{ type: "image_generation" }],
});

const imageData_fwup = response_fwup.output
  .filter((output) => output.type === "image_generation_call")
  .map((output) => output.result);

if (imageData_fwup.length > 0) {
  const imageBase64 = imageData_fwup[0];
  const fs = await import("fs");
  fs.writeFileSync(
    "cat_and_otter_realistic.png",
    Buffer.from(imageBase64, "base64")
  );
}
```

```python
from openai import OpenAI
import base64

client = OpenAI()

response = client.responses.create(
    model="gpt-5.4",
    input="Generate an image of gray tabby cat hugging an otter with an orange scarf",
    tools=[{"type": "image_generation"}],
)

image_data = [
    output.result
    for output in response.output
    if output.type == "image_generation_call"
]

if image_data:
    image_base64 = image_data[0]

    with open("cat_and_otter.png", "wb") as f:
        f.write(base64.b64decode(image_base64))


# Follow up

response_fwup = client.responses.create(
    model="gpt-5.4",
    previous_response_id=response.id,
    input="Now make it look realistic",
    tools=[{"type": "image_generation"}],
)

image_data_fwup = [
    output.result
    for output in response_fwup.output
    if output.type == "image_generation_call"
]

if image_data_fwup:
    image_base64 = image_data_fwup[0]
    with open("cat_and_otter_realistic.png", "wb") as f:
        f.write(base64.b64decode(image_base64))
```

  </div>
  <div data-content-switcher-pane data-value="imageid" hidden>
    <div class="hidden">Using image ID</div>
    Multi-turn image generation

```javascript
import OpenAI from "openai";
const openai = new OpenAI();

const response = await openai.responses.create({
  model: "gpt-5.4",
  input:
    "Generate an image of gray tabby cat hugging an otter with an orange scarf",
  tools: [{ type: "image_generation" }],
});

const imageGenerationCalls = response.output.filter(
  (output) => output.type === "image_generation_call"
);

const imageData = imageGenerationCalls.map((output) => output.result);

if (imageData.length > 0) {
  const imageBase64 = imageData[0];
  const fs = await import("fs");
  fs.writeFileSync("cat_and_otter.png", Buffer.from(imageBase64, "base64"));
}

// Follow up

const response_fwup = await openai.responses.create({
  model: "gpt-5.4",
  input: [
    {
      role: "user",
      content: [{ type: "input_text", text: "Now make it look realistic" }],
    },
    {
      type: "image_generation_call",
      id: imageGenerationCalls[0].id,
    },
  ],
  tools: [{ type: "image_generation" }],
});

const imageData_fwup = response_fwup.output
  .filter((output) => output.type === "image_generation_call")
  .map((output) => output.result);

if (imageData_fwup.length > 0) {
  const imageBase64 = imageData_fwup[0];
  const fs = await import("fs");
  fs.writeFileSync(
    "cat_and_otter_realistic.png",
    Buffer.from(imageBase64, "base64")
  );
}
```

```python
import openai
import base64

response = openai.responses.create(
    model="gpt-5.4",
    input="Generate an image of gray tabby cat hugging an otter with an orange scarf",
    tools=[{"type": "image_generation"}],
)

image_generation_calls = [
    output
    for output in response.output
    if output.type == "image_generation_call"
]

image_data = [output.result for output in image_generation_calls]

if image_data:
    image_base64 = image_data[0]

    with open("cat_and_otter.png", "wb") as f:
        f.write(base64.b64decode(image_base64))


# Follow up

response_fwup = openai.responses.create(
    model="gpt-5.4",
    input=[
        {
            "role": "user",
            "content": [{"type": "input_text", "text": "Now make it look realistic"}],
        },
        {
            "type": "image_generation_call",
            "id": image_generation_calls[0].id,
        },
    ],
    tools=[{"type": "image_generation"}],
)

image_data_fwup = [
    output.result
    for output in response_fwup.output
    if output.type == "image_generation_call"
]

if image_data_fwup:
    image_base64 = image_data_fwup[0]
    with open("cat_and_otter_realistic.png", "wb") as f:
        f.write(base64.b64decode(image_base64))
```

  </div>



## Streaming

The image generation tool supports streaming partial images while it generates the final result. This provides faster visual feedback for users and improves perceived latency.

You can set the number of partial images (1-3) with the `partial_images` parameter.

Stream an image

```javascript
import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

const prompt =
  "Draw a gorgeous image of a river made of white owl feathers, snaking its way through a serene winter landscape";
const stream = await openai.images.generate({
  prompt: prompt,
  model: "gpt-image-2",
  stream: true,
  partial_images: 2,
});

for await (const event of stream) {
  if (event.type === "image_generation.partial_image") {
    const idx = event.partial_image_index;
    const imageBase64 = event.b64_json;
    const imageBuffer = Buffer.from(imageBase64, "base64");
    fs.writeFileSync(\`river\${idx}.png\`, imageBuffer);
  }
}
```

```python
from openai import OpenAI
import base64

client = OpenAI()

stream = client.images.generate(
    prompt="Draw a gorgeous image of a river made of white owl feathers, snaking its way through a serene winter landscape",
    model="gpt-image-2",
    stream=True,
    partial_images=2,
)

for event in stream:
    if event.type == "image_generation.partial_image":
        idx = event.partial_image_index
        image_base64 = event.b64_json
        image_bytes = base64.b64decode(image_base64)
        with open(f"river{idx}.png", "wb") as f:
            f.write(image_bytes)
```


## Supported models

The following models support the image generation tool:

- `gpt-4o`
- `gpt-4o-mini`
- `gpt-4.1`
- `gpt-4.1-mini`
- `gpt-4.1-nano`
- `o3`
- `gpt-5`
- `gpt-5.4-mini`
- `gpt-5.4-nano`
- `gpt-5-nano`
- `gpt-5.4`
- `gpt-5.2`

The model used for the image generation process is always a GPT Image model, including `gpt-image-2`, `gpt-image-1.5`, `gpt-image-1`, and `gpt-image-1-mini`, but these models aren't valid values for the `model` field in the Responses API. Use a text-capable mainline model (for example, `gpt-5.4` or `gpt-5`) with the hosted `image_generation` tool.