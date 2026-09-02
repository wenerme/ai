Gemini Omni Flash (`gemini-omni-1.1-flash`) is a high-performance multimodal
model designed for high-speed video generation, editing, and cinematic control.
Gemini Omni is built on the following core capabilities that distinguish it from
previous video models:

- **Native multimodality:** it processes text, image, audio, and video simultaneously, giving you more cohesive, consistent, and controllable output.
- **Conversational editing:** enabled by the [Interactions
  API](https://ai.google.dev/gemini-api/docs/interactions-overview), it lets you iteratively refine and edit your videos through natural language conversation. Describe what you want to change, and the model applies the edit while preserving the parts of the video you want to keep.
- **World knowledge:** Gemini Omni combines an understanding of physics with Gemini's knowledge of history, science, and cultural context, bridging the gap from photorealism to meaningful storytelling.

## Text to video generation

Generate a video from a text prompt. The model generates a video with audio
based on your text description. Write prompts with details like scene description,
camera movement, lighting and mood for best results.

### Python

    import base64
    from google import genai

    client = genai.Client()

    interaction = client.interactions.create(
        model="gemini-omni-1.1-flash",
        input="A marble rolling fast on a chain reaction style track, continuous smooth shot."
    )
    with open("marble.mp4", "wb") as f:
        f.write(base64.b64decode(interaction.output_video.data))

### JavaScript

    import { GoogleGenAI } from '@google/genai';
    import * as fs from 'fs';
    const ai = new GoogleGenAI({});

    const interaction = await ai.interactions.create({
      model: 'gemini-omni-1.1-flash',
      input: 'A marble rolling fast on a chain reaction style track, continuous smooth shot.',
    });

    if (interaction.output_video?.data) {
      fs.writeFileSync('marble.mp4', Buffer.from(interaction.output_video.data, 'base64'));
    }

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.nio.file.Files;
    import java.nio.file.Paths;
    import java.util.Base64;

    Client client = new Client();

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-omni-1.1-flash"))
            .input(InteractionsInput.of("A marble rolling fast on a chain reaction style track, continuous smooth shot."))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    if (interaction.outputVideo().isPresent() && interaction.outputVideo().get().data().isPresent()) {
        byte[] videoBytes = Base64.getDecoder().decode(interaction.outputVideo().get().data().get());
        Files.write(Paths.get("marble.mp4"), videoBytes);
    }

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions?key=$API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
     "model": "gemini-omni-1.1-flash",
     "input": "A marble rolling fast on a chain reaction style track, continuous smooth shot."
    }'

[Video](https://www.youtube.com/watch?v=6DRkXO9nM7g)

### REST response schema

The convenience field `interaction.output_video` is **SDK-only** .
Get the video output from the `steps` array when using the REST API directly.

**Raw REST JSON structure:**

    {
      "steps": [
        { "type": "user_input", "content": [{"type": "text", "text": "..."}] },
        { "type": "thought", "content": [{"text": "...", "type": "thought"}] },
        {
          "type": "model_output",
          "content": [
            {
              "type": "video",
              "mime_type": "video/mp4",
              "data": "AAAAIGZ0eXBpc29t..." // Base64 encoded video data
            }
          ]
        }
      ],
      "id": "v1_...",
      "status": "completed",
      "model": "gemini-omni-1.1-flash",
      "object": "interaction"
    }

### Control aspect ratio

Set the `aspect_ratio` to `"9:16"` to create portrait videos. Landscape (16:9)
is the default.

### Python

    import base64
    from google import genai

    client = genai.Client()

    interaction = client.interactions.create(
        model="gemini-omni-1.1-flash",
        input="A futuristic city with neon lights and flying cars, cyberpunk style",
        response_format={
            "type": "video",  # optional
            "aspect_ratio": "9:16"  # Supported values: "9:16", "16:9"
        }
    )
    with open("example.mp4", "wb") as f:
        f.write(base64.b64decode(interaction.output_video.data))

### JavaScript

    import { GoogleGenAI } from '@google/genai';
    import * as fs from 'fs';
    const ai = new GoogleGenAI({});

    const interaction = await ai.interactions.create({
      model: 'gemini-omni-1.1-flash',
      input: 'A futuristic city with neon lights and flying cars, cyberpunk style',
      response_format: {
        type: 'video', // optional
        aspect_ratio: '9:16' // Supported values: '9:16', '16:9'
      },
    });

    if (interaction.output_video?.data) {
      fs.writeFileSync('example.mp4', Buffer.from(interaction.output_video.data, 'base64'));
    }

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.CreateModelInteractionResponseFormat;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.ResponseFormat;
    import com.google.genai.gaos.models.interactions.VideoResponseFormat;
    import com.google.genai.gaos.models.interactions.VideoResponseFormatAspectRatio;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.nio.file.Files;
    import java.nio.file.Paths;
    import java.util.Base64;

    Client client = new Client();

    VideoResponseFormat videoFormat =
        VideoResponseFormat.builder()
            .aspectRatio(VideoResponseFormatAspectRatio.of("9:16"))
            .build();

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-omni-1.1-flash"))
            .input(InteractionsInput.of("A futuristic city with neon lights and flying cars, cyberpunk style"))
            .responseFormat(CreateModelInteractionResponseFormat.of(ResponseFormat.of(videoFormat)))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    if (interaction.outputVideo().isPresent() && interaction.outputVideo().get().data().isPresent()) {
        byte[] videoBytes = Base64.getDecoder().decode(interaction.outputVideo().get().data().get());
        Files.write(Paths.get("example.mp4"), videoBytes);
    }

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions?key=$API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
     "model": "gemini-omni-1.1-flash",
     "input": "A futuristic city with neon lights and flying cars, cyberpunk style",
     "response_format": {
       "type": "video",
       "aspect_ratio": "9:16"
     }
    }'

### Output resolution

Control the output resolution of your generated video using the `resolution`
parameter in `response_format`. The default resolution is 720p.

| Value | Description |
|---|---|
| `360p` | 360p output resolution |
| `720p` | 720p output resolution (default) |
| `1080p` | 1080p output (upscaled) |
| `4k` | 4K output (upscaled) |

### Python

    import base64
    from google import genai

    client = genai.Client()

    interaction = client.interactions.create(
        model="gemini-omni-1.1-flash",
        input="A drone shot of a mountain landscape at sunrise.",
        response_format={
            "type": "video",
            "resolution": "1080p",
        },
    )
    with open("hires.mp4", "wb") as f:
        f.write(base64.b64decode(interaction.output_video.data))

### JavaScript

    import { GoogleGenAI } from '@google/genai';
    import * as fs from 'fs';
    const ai = new GoogleGenAI({});

    const interaction = await ai.interactions.create({
      model: 'gemini-omni-1.1-flash',
      input: 'A drone shot of a mountain landscape at sunrise.',
      response_format: {
        type: 'video',
        resolution: '1080p',
      },
    });

    if (interaction.output_video?.data) {
      fs.writeFileSync('hires.mp4', Buffer.from(interaction.output_video.data, 'base64'));
    }

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.CreateModelInteractionResponseFormat;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.Resolution;
    import com.google.genai.gaos.models.interactions.ResponseFormat;
    import com.google.genai.gaos.models.interactions.VideoResponseFormat;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.nio.file.Files;
    import java.nio.file.Paths;
    import java.util.Base64;

    Client client = new Client();

    VideoResponseFormat videoFormat =
        VideoResponseFormat.builder()
            .resolution(Resolution.of("1080p"))
            .build();

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-omni-1.1-flash"))
            .input(InteractionsInput.of("A drone shot of a mountain landscape at sunrise."))
            .responseFormat(CreateModelInteractionResponseFormat.of(ResponseFormat.of(videoFormat)))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    if (interaction.outputVideo().isPresent() && interaction.outputVideo().get().data().isPresent()) {
        byte[] videoBytes = Base64.getDecoder().decode(interaction.outputVideo().get().data().get());
        Files.write(Paths.get("hires.mp4"), videoBytes);
    }

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions?key=$API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
     "model": "gemini-omni-1.1-flash",
     "input": "A drone shot of a mountain landscape at sunrise.",
     "response_format": {
       "type": "video",
       "resolution": "1080p"
     }
    }'

Your browser does not support the video tag.

## Image to video generation

You can provide a reference image with your text prompt. Depending on your
prompt, the model will decide
how to use the image. This is useful for bringing product shots, illustrations,
or photographs to life.

The following example shows how to use the reference image of a drawing of a
fish jumping out of water:
![Drawing of a fish jumping out of water](https://ai.google.dev/static/gemini-api/docs/images/fish-jumping-inputimage.png)

With the following prompt:

    turn this into realistic footage, using the drawing only as a guide for movement, do not show the drawing in the final video

To generate a realistic video of the drawing.

### Python

    import base64
    from google import genai

    client = genai.Client()

    interaction = client.interactions.create(
        model="gemini-omni-1.1-flash",
        input=[
            {"type": "image", "data": base64_image, "mime_type": "image/jpeg"},
            {"type": "text", "text": "turn this into realistic footage, using the drawing only as a guide for movement, do not show the drawing in the final video"}
        ],
    )
    with open("clownfish.mp4", "wb") as f:
        f.write(base64.b64decode(interaction.output_video.data))

### JavaScript

    import { GoogleGenAI } from '@google/genai';
    import * as fs from 'fs';
    const ai = new GoogleGenAI({});

    const interaction = await ai.interactions.create({
      model: 'gemini-omni-1.1-flash',
      input: [
        { type: 'image', data: base64Image, mime_type: 'image/jpeg' },
        { type: 'text', text: 'turn this into realistic footage, using the drawing only as a guide for movement, do not show the drawing in the final video' }
      ]
    });

    if (interaction.output_video?.data) {
      fs.writeFileSync('clownfish.mp4', Buffer.from(interaction.output_video.data, 'base64'));
    }

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.Content;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.ImageContent;
    import com.google.genai.gaos.models.interactions.ImageContentMimeType;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.TextContent;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.nio.file.Files;
    import java.nio.file.Paths;
    import java.util.Arrays;
    import java.util.Base64;
    import java.util.List;

    Client client = new Client();

    byte[] imageBytes = Files.readAllBytes(Paths.get("first_frame.png"));
    String base64Image = Base64.getEncoder().encodeToString(imageBytes);

    Content imageContent =
        ImageContent.builder()
            .data(base64Image)
            .mimeType(ImageContentMimeType.IMAGE_PNG)
            .build();

    Content textContent =
        TextContent.builder()
            .text("A mythical dragon perched on a craggy peak slowly unfolds its wings and lets out a roar.")
            .build();

    List<Content> contents = Arrays.asList(imageContent, textContent);

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-omni-1.1-flash"))
            .input(InteractionsInput.ofContent(contents))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    if (interaction.outputVideo().isPresent() && interaction.outputVideo().get().data().isPresent()) {
        byte[] videoBytes = Base64.getDecoder().decode(interaction.outputVideo().get().data().get());
        Files.write(Paths.get("dragon.mp4"), videoBytes);
    }

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions?key=$API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
     "model": "gemini-omni-1.1-flash",
     "input": [
       {"type": "image", "data": "'"$BASE64_IMAGE"'", "mime_type": "image/jpeg"},
       {"type": "text", "text": "turn this into realistic footage, using the drawing only as a guide for movement, do not show the drawing in the final video"}
     ]
    }'

[Video](https://www.youtube.com/watch?v=zTNIIZ0X7mA)

> [!NOTE]
> **Note:** For best results with image-to-video, use high-resolution images and provide specific motion descriptions. Vague prompts like "make it move" produce less compelling results than detailed descriptions of the camera movement, subject motion, and environmental effects.

### First and last frame interpolation

Gemini Omni Flash supports video interpolation, allowing you to generate a
video that transitions smoothly between a starting image (first frame) and an
ending image (last frame).

Provide two images in the `input` list and describe the desired transition in
your prompt. The model will animate the scene from the first frame to the
ending frame.

### Python

    import base64
    from google import genai

    client = genai.Client()

    interaction = client.interactions.create(
        model="gemini-omni-1.1-flash",
        input=[
            {"type": "image", "data": first_frame_b64, "mime_type": "image/jpeg"},
            {"type": "image", "data": last_frame_b64, "mime_type": "image/jpeg"},
            {"type": "text", "text": "A smooth cinematic transition from a lush green forest at sunrise to a snowy forest under a starry night sky."}
        ],
    )
    with open("interpolation.mp4", "wb") as f:
        f.write(base64.b64decode(interaction.output_video.data))

### JavaScript

    import { GoogleGenAI } from '@google/genai';
    import * as fs from 'fs';
    const ai = new GoogleGenAI({});

    const interaction = await ai.interactions.create({
      model: 'gemini-omni-1.1-flash',
      input: [
        { type: 'image', data: firstFrameB64, mime_type: 'image/jpeg' },
        { type: 'image', data: lastFrameB64, mime_type: 'image/jpeg' },
        { type: 'text', text: 'A smooth cinematic transition from a lush green forest at sunrise to a snowy forest under a starry night sky.' }
      ]
    });

    if (interaction.output_video?.data) {
      fs.writeFileSync('interpolation.mp4', Buffer.from(interaction.output_video.data, 'base64'));
    }

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.Content;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.ImageContent;
    import com.google.genai.gaos.models.interactions.ImageContentMimeType;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.TextContent;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.nio.file.Files;
    import java.nio.file.Paths;
    import java.util.Arrays;
    import java.util.Base64;
    import java.util.List;

    Client client = new Client();

    String firstFrameB64 = Base64.getEncoder().encodeToString(Files.readAllBytes(Paths.get("first_frame.jpg")));
    String lastFrameB64 = Base64.getEncoder().encodeToString(Files.readAllBytes(Paths.get("last_frame.jpg")));

    Content firstFrame =
        ImageContent.builder()
            .data(firstFrameB64)
            .mimeType(ImageContentMimeType.IMAGE_JPEG)
            .build();

    Content lastFrame =
        ImageContent.builder()
            .data(lastFrameB64)
            .mimeType(ImageContentMimeType.IMAGE_JPEG)
            .build();

    Content prompt =
        TextContent.builder()
            .text("A smooth cinematic transition from a lush green forest at sunrise to a snowy forest under a starry night sky.")
            .build();

    List<Content> contents = Arrays.asList(firstFrame, lastFrame, prompt);

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-omni-1.1-flash"))
            .input(InteractionsInput.ofContent(contents))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    if (interaction.outputVideo().isPresent() && interaction.outputVideo().get().data().isPresent()) {
        byte[] videoBytes = Base64.getDecoder().decode(interaction.outputVideo().get().data().get());
        Files.write(Paths.get("interpolation.mp4"), videoBytes);
    }

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions?key=$API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
     "model": "gemini-omni-1.1-flash",
     "input": [
       {"type": "image", "data": "'"$FIRST_FRAME_B64"'", "mime_type": "image/jpeg"},
       {"type": "image", "data": "'"$LAST_FRAME_B64"'", "mime_type": "image/jpeg"},
       {"type": "text", "text": "A smooth cinematic transition from a lush green forest at sunrise to a snowy forest under a starry night sky."}
     ]
    }'

Your browser does not support the video tag.

### Subject reference

You can generate a video incorporating specific subjects provided as reference images.
For example, the following code shows how to provide 2 images of a cat and yarn
to generate a video of the cat playing with the yarn.

### Python

    import base64
    from google import genai

    client = genai.Client()

    interaction = client.interactions.create(
        model="gemini-omni-1.1-flash",
        input=[
            {"type": "image", "data": cat_b64, "mime_type": "image/png"},
            {"type": "image", "data": yarn_b64, "mime_type": "image/png"},
            {"type": "text", "text": "A cat playfully batting at a ball of yarn."}
        ],
    )
    with open("cat.mp4", "wb") as f:
        f.write(base64.b64decode(interaction.output_video.data))

### JavaScript

    import { GoogleGenAI } from '@google/genai';
    import * as fs from 'fs';
    const ai = new GoogleGenAI({});

    const interaction = await ai.interactions.create({
      model: 'gemini-omni-1.1-flash',
      input: [
        { type: 'image', data: catData, mime_type: 'image/png' },
        { type: 'image', data: yarnData, mime_type: 'image/png' },
        { type: 'text', text: 'A cat playfully batting at a ball of yarn.' }
      ]
    });

    if (interaction.output_video?.data) {
      fs.writeFileSync('cat.mp4', Buffer.from(interaction.output_video.data, 'base64'));
    }

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.Content;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.ImageContent;
    import com.google.genai.gaos.models.interactions.ImageContentMimeType;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.TextContent;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.nio.file.Files;
    import java.nio.file.Paths;
    import java.util.Arrays;
    import java.util.Base64;
    import java.util.List;

    Client client = new Client();

    byte[] imageBytes = Files.readAllBytes(Paths.get("reference.png"));
    String base64Image = Base64.getEncoder().encodeToString(imageBytes);

    Content imageContent =
        ImageContent.builder()
            .data(base64Image)
            .mimeType(ImageContentMimeType.IMAGE_PNG)
            .build();

    Content textContent =
        TextContent.builder()
            .text("A cute small creature like the one in <image_1> is running in a sunny park chasing a butterfly.")
            .build();

    List<Content> contents = Arrays.asList(imageContent, textContent);

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-omni-1.1-flash"))
            .input(InteractionsInput.ofContent(contents))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    if (interaction.outputVideo().isPresent() && interaction.outputVideo().get().data().isPresent()) {
        byte[] videoBytes = Base64.getDecoder().decode(interaction.outputVideo().get().data().get());
        Files.write(Paths.get("creature.mp4"), videoBytes);
    }

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions?key=$API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
     "model": "gemini-omni-1.1-flash",
     "input": [
       {"type": "image", "data": "'"$CAT_B64"'", "mime_type": "image/png"},
       {"type": "image", "data": "'"$YARN_B64"'", "mime_type": "image/png"},
       {"type": "text", "text": "A cat playfully batting at a ball of yarn."}
     ]
    }'

### Tasks parameter

Use the `task` parameter in the `video_config` to explicitly specify the intended
behavior, for example if you want the model to generate a video from an image,
you can set the parameter to `image_to_video`. If this is not set, the
model will infer what you want from the prompt.

> [!TIP]
> **Tip:** We recommend relying primarily on prompting and using the `task` parameter only when prompting doesn't work and you need to help the model understand which mode it should use, as using the `task` field adds some constraints.

The following are allowed values:

- `text_to_video`
- `image_to_video`
- `reference_to_video`
- `edit`
- `extend`

The following example shows how to set this for the previously shown image
to video example.

### Python

    import base64
    from google import genai

    client = genai.Client()

    interaction = client.interactions.create(
        model="gemini-omni-1.1-flash",
        input=[
            {"type": "image", "data": base64_image, "mime_type": "image/jpeg"},
            {"type": "text", "text": "turn this into realistic footage, using the drawing only as a guide for movement, do not show the drawing in the final video"}
        ],
        generation_config={
          "video_config": {
            "task": "image_to_video",
          }
        },
    )
    with open("example.mp4", "wb") as f:
        f.write(base64.b64decode(interaction.output_video.data))

### JavaScript

    import { GoogleGenAI } from "@google/genai";
    import * as fs from 'fs';
    const ai = new GoogleGenAI({});

    const interaction = await ai.interactions.create({
      model: 'gemini-omni-1.1-flash',
      input: [
        { type: 'image', data: base64Image, mime_type: 'image/jpeg' },
        { type: 'text', text: 'turn this into realistic footage, using the drawing only as a guide for movement, do not show the drawing in the final video' }
      ],
      generationConfig: {
        videoConfig: {
          task: 'image_to_video',
        }
      }
    });

    if (interaction.output_video?.data) {
      fs.writeFileSync('example.mp4', Buffer.from(interaction.output_video.data, 'base64'));
    }

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.Content;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.GenerationConfig;
    import com.google.genai.gaos.models.interactions.ImageContent;
    import com.google.genai.gaos.models.interactions.ImageContentMimeType;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.Task;
    import com.google.genai.gaos.models.interactions.TextContent;
    import com.google.genai.gaos.models.interactions.VideoConfig;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.nio.file.Files;
    import java.nio.file.Paths;
    import java.util.Arrays;
    import java.util.Base64;
    import java.util.List;

    Client client = new Client();

    byte[] imageBytes = Files.readAllBytes(Paths.get("reference.png"));
    String base64Image = Base64.getEncoder().encodeToString(imageBytes);

    Content imageContent =
        ImageContent.builder()
            .data(base64Image)
            .mimeType(ImageContentMimeType.IMAGE_PNG)
            .build();

    Content textContent =
        TextContent.builder()
            .text("A fast red sports car drives down an empty desert highway at dusk.")
            .build();

    List<Content> contents = Arrays.asList(imageContent, textContent);

    GenerationConfig generationConfig =
        GenerationConfig.builder()
            .videoConfig(VideoConfig.builder().task(Task.IMAGE_TO_VIDEO).build())
            .build();

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-omni-1.1-flash"))
            .input(InteractionsInput.ofContent(contents))
            .generationConfig(generationConfig)
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    if (interaction.outputVideo().isPresent() && interaction.outputVideo().get().data().isPresent()) {
        byte[] videoBytes = Base64.getDecoder().decode(interaction.outputVideo().get().data().get());
        Files.write(Paths.get("task_output.mp4"), videoBytes);
    }

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{
        "model": "gemini-omni-1.1-flash",
        "input": [
          {
            "type": "image",
            "data": "'"$BASE64_IMAGE"'",
            "mime_type": "image/jpeg"
          },
          {
            "type": "text",
            "text": "turn this into realistic footage, using the drawing only as a guide for movement, do not show the drawing in the final video"
          }
        ],
        "generation_config": {
          "video_config": {
            "task": "image_to_video"
          }
        }
      }'

## Stateful video editing

Generate a video and edit it iteratively using follow-up prompts. Each turn
builds on the previous result. The model remembers the video context, applying
your changes while preserving elements you did not mention. Use the
`previous_interaction_id` to track the conversation history and the generated
video state without re-uploading the previous video.

> [!NOTE]
> **Note:** See [Limitations](https://ai.google.dev/gemini-api/docs/omni#limitations) for detailed list of restrictions for video editing.

The following example demonstrates how to generate a first video then edit it:

### Python

    import base64
    from google import genai

    client = genai.Client()

    # Turn 1: Generate initial video
    res1 = client.interactions.create(model="gemini-omni-1.1-flash", input="A woman playing violin outdoors.")

    # Turn 2: Edit the previous video
    res2 = client.interactions.create(
        model="gemini-omni-1.1-flash",
        previous_interaction_id=res1.id,
        input="Make the violin invisible."
    )
    with open("example.mp4", "wb") as f:
        f.write(base64.b64decode(res2.output_video.data))

### JavaScript

    import { GoogleGenAI } from '@google/genai';
    import * as fs from 'fs';
    const ai = new GoogleGenAI({});

    // Turn 1: Generate initial video
    const res1 = await ai.interactions.create({
      model: 'gemini-omni-1.1-flash',
      input: 'A woman playing violin outdoors.',
    });

    // Turn 2: Edit the previous video
    const res2 = await ai.interactions.create({
      model: 'gemini-omni-1.1-flash',
      previous_interaction_id: res1.id,
      input: 'Make the violin invisible.',
    });

    if (res2.output_video?.data) {
      fs.writeFileSync('example.mp4', Buffer.from(res2.output_video.data, 'base64'));
    }

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.nio.file.Files;
    import java.nio.file.Paths;
    import java.util.Base64;

    Client client = new Client();

    // Turn 1: Generate initial video
    CreateModelInteraction turn1Params =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-omni-1.1-flash"))
            .input(InteractionsInput.of("A person in a red jacket standing in a snowy landscape."))
            .build();

    Interaction turn1 =
        client.interactions.create(CreateInteractionRequestBody.of(turn1Params)).interaction().get();

    // Turn 2: Edit the previous video using previousInteractionId
    CreateModelInteraction turn2Params =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-omni-1.1-flash"))
            .input(InteractionsInput.of("Change the jacket to bright yellow."))
            .previousInteractionId(turn1.id().get())
            .build();

    Interaction turn2 =
        client.interactions.create(CreateInteractionRequestBody.of(turn2Params)).interaction().get();

    if (turn2.outputVideo().isPresent() && turn2.outputVideo().get().data().isPresent()) {
        byte[] videoBytes = Base64.getDecoder().decode(turn2.outputVideo().get().data().get());
        Files.write(Paths.get("edited.mp4"), videoBytes);
    }

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions?key=$API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
     "model": "gemini-omni-1.1-flash",
     "previous_interaction_id": "'"$PREVIOUS_ID"'",
     "input": "Make the violin invisible."
    }'

Example of an initial video:

[Video](https://www.youtube.com/watch?v=9yk4HuZmF0g)

Example of an edited video:

[Video](https://www.youtube.com/watch?v=U5GXcvq6GZY)

Each turn in the conversation produces a new video. The model understands
context from prior turns, letting you make incremental changes like adjusting
lighting, and swapping backgrounds, without re-describing the entire scene.

### Edit your own videos

Upload your videos using the [Files API](https://ai.google.dev/gemini-api/docs/files) to edit them
with Gemini Omni Flash.

> [!NOTE]
> **Note:** Editing uploaded videos is not available in all regions. See [Limitations](https://ai.google.dev/gemini-api/docs/omni#limitations) section for details.

The following example shows how to edit the following original video:

[Video](https://www.youtube.com/watch?v=lw9MJDx9Zas)

### Python

    import time
    import base64
    from google import genai

    client = genai.Client()

    # Upload video using the file API
    video_file = client.files.upload(file="Video.mp4")

    while video_file.state == "PROCESSING":
        print('Waiting for video to be processed.')
        time.sleep(10)
        video_file = client.files.get(name=video_file.name)

    if video_file.state == "FAILED":
      raise ValueError(video_file.state)
    print(f'Video processing complete: ' + video_file.uri)

    # Edit your video
    interaction = client.interactions.create(
        model="gemini-omni-1.1-flash",
        input=[
            {"type": "document", "uri": video_file.uri},
            {"type": "text", "text": "When the person touches the mirror, make the mirror ripple beautifully like liquid, and the person's arm turns into reflective mirror material"}
        ],
    )
    with open("example.mp4", "wb") as f:
        f.write(base64.b64decode(interaction.output_video.data))

### JavaScript

    import { GoogleGenAI } from '@google/genai';
    import * as fs from 'fs';
    const ai = new GoogleGenAI({});

    // Upload video using the file API
    let videoFile = await ai.files.upload({
      file: 'Video.mp4',
    });

    while (videoFile.state === 'PROCESSING') {
      console.log('Waiting for video to be processed.');
      await new Promise(r => setTimeout(r, 10000));
      videoFile = await ai.files.get({ name: videoFile.name });
    }

    if (videoFile.state === 'FAILED') {
      throw new Error(videoFile.state);
    }
    console.log('Video processing complete: ' + videoFile.uri);

    // Edit your video
    const interaction = await ai.interactions.create({
      model: 'gemini-omni-1.1-flash',
      input: [
        { type: 'document', uri: videoFile.uri },
        { type: 'text', text: "When the person touches the mirror, make the mirror ripple beautifully like liquid, and the person's arm turns into reflective mirror material" }
      ],
    });

    if (interaction.output_video?.data) {
      fs.writeFileSync('example.mp4', Buffer.from(interaction.output_video.data, 'base64'));
    }

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.Content;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.TextContent;
    import com.google.genai.gaos.models.interactions.VideoContent;
    import com.google.genai.gaos.models.interactions.VideoContentMimeType;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.nio.file.Files;
    import java.nio.file.Paths;
    import java.util.Arrays;
    import java.util.Base64;
    import java.util.List;

    Client client = new Client();

    byte[] videoBytes = Files.readAllBytes(Paths.get("my_video.mp4"));
    String base64Video = Base64.getEncoder().encodeToString(videoBytes);

    Content videoContent =
        VideoContent.builder()
            .data(base64Video)
            .mimeType(VideoContentMimeType.VIDEO_MP4)
            .build();

    Content textContent =
        TextContent.builder()
            .text("Make the violin completely invisible while keeping the musician playing normally in the air.")
            .build();

    List<Content> contents = Arrays.asList(videoContent, textContent);

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-omni-1.1-flash"))
            .input(InteractionsInput.ofContent(contents))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    if (interaction.outputVideo().isPresent() && interaction.outputVideo().get().data().isPresent()) {
        byte[] editedBytes = Base64.getDecoder().decode(interaction.outputVideo().get().data().get());
        Files.write(Paths.get("edited_invisible_violin.mp4"), editedBytes);
    }

### REST

    #!/bin/bash
    VIDEO_B64=$(encode_file "$VIDEO_FILE")

    curl -sS -w "\n[HTTP %{http_code}]\n" "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: ${API_KEY}" \
      -H "Content-Type: application/json" \
      -d @- <<EOF > video_editing_response.json
    {
      "model": "gemini-omni-1.1-flash",
      "input": [
        {
          "type": "user_input",
          "content": [
            {
              "type": "video",
              "mime_type": "video/mp4",
              "data": "$VIDEO_B64"
            },
            {
              "type": "text",
              "text": "When the person touches the mirror, make the mirror ripple beautifully like liquid, and the person's arm turns into reflective mirror material"
            }
          ]
        }
      ],
      "response_format": { "type": "video" }
    }
    EOF

Example of an edited video:

[Video](https://www.youtube.com/watch?v=Bn-6vCl1wgQ)

> [!NOTE]
> **Note:** You can also pass the data directly in base64, but since videos can be quite big we recommend using the File API.

## Retrieving videos with an URI

Use the `delivery="uri"` parameter in
`response_format` to retrieve generated videos that are larger than 4MB.
This returns a Google-hosted URI that you can poll until the
video is `ACTIVE` before downloading.

### Python

    import time
    from google import genai

    client = genai.Client()

    # 1. Request video via URI delivery
    interaction = client.interactions.create(
        model="gemini-omni-1.1-flash",
        input="A beautiful sunset.",
        response_format={"type": "video", "delivery": "uri"}
    )

    # 2. Extract file name and poll for ACTIVE state
    video_output = interaction.output_video
    file_name = video_output.uri.split("/")[-1] # Extract ID

    print("Waiting for video processing...")
    while True:
        f_info = client.files.get(name=f"files/{file_name}")
        if f_info.state.name == "ACTIVE":
            break
        elif f_info.state.name == "FAILED":
            raise RuntimeError("Generation failed.")
        time.sleep(5)

    # 3. Download the final video
    client.files.download(file=video_output.uri, destination="output.mp4")

### JavaScript

    import { GoogleGenAI } from '@google/genai';
    const ai = new GoogleGenAI({});

    // 1. Request video via URI delivery
    const interaction = await ai.interactions.create({
      model: 'gemini-omni-1.1-flash',
      input: 'A beautiful sunset.',
      response_format: { type: 'video', delivery: 'uri' },
    });

    // 2. Extract file name and poll for ACTIVE state
    const videoOutput = interaction.output_video;
    const fileId = videoOutput.uri.match(/files\/([a-zA-Z0-9]+)/)[1];
    const name = `files/${fileId}`;

    console.log("Waiting for video processing...");
    while (true) {
      const fInfo = await ai.files.get({ name });
      if (fInfo.state.name === 'ACTIVE') break;
      if (fInfo.state.name === 'FAILED') throw new Error("Generation failed.");
      await new Promise(r => setTimeout(r, 5000));
    }

    // 3. Download the final video
    await ai.files.download({
      file: videoOutput,
      downloadPath: 'output.mp4',
    });
    console.log("💾 Saved video to output.mp4");

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.CreateModelInteractionResponseFormat;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.ResponseFormat;
    import com.google.genai.gaos.models.interactions.VideoResponseFormat;
    import com.google.genai.gaos.models.interactions.VideoResponseFormatDelivery;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;

    Client client = new Client();

    // 1. Request video via URI delivery
    VideoResponseFormat videoFormat =
        VideoResponseFormat.builder()
            .delivery(VideoResponseFormatDelivery.URI)
            .build();

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-omni-1.1-flash"))
            .input(InteractionsInput.of("A camera flies over a misty redwood forest at sunrise."))
            .responseFormat(CreateModelInteractionResponseFormat.of(ResponseFormat.of(videoFormat)))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    // 2. Extract file URI
    interaction.outputVideo().flatMap(v -> v.uri()).ifPresent(uri -> {
        System.out.println("Video URI: " + uri);
    });

### REST

    #!/bin/bash

    # 1. Initial request to generate the video
    RESPONSE=$(curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/interactions?key=$API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
     "model": "gemini-omni-1.1-flash",
     "input": "A beautiful sunset over a calm ocean.",
     "response_format": {"type": "video", "delivery": "uri"}
    }')

    # Extract FILE_ID from the URI (e.g., "files/abc-123" -> "abc-123")
    FILE_URI=$(echo $RESPONSE | jq -r '.output_video.uri')
    FILE_ID=$(echo $FILE_URI | cut -d'/' -f2)

    echo "Video requested (ID: $FILE_ID). Waiting for processing..."

    # 2. Polling loop
    while true; do
     # Get current file status
     STATUS_JSON=$(curl -s -X GET "https://generativelanguage.googleapis.com/v1beta/files/$FILE_ID?key=$API_KEY")
     STATE=$(echo $STATUS_JSON | jq -r '.state')

     if [ "$STATE" == "ACTIVE" ]; then
       echo "Processing complete! Downloading..."
       break
     elif [ "$STATE" == "FAILED" ]; then
       echo "Error: Generation failed."
       exit 1
     else
       echo "Current state: $STATE... (waiting 5s)"
       sleep 5
     fi
    done

    # 3. Final download
    curl -L -X GET "https://generativelanguage.googleapis.com/v1beta/files/$FILE_ID:download?alt=media&key=$API_KEY" \
    --output "output.mp4"

    echo "Done! Video saved to output.mp4"

**Raw REST JSON structure (URI):**

    {
      "steps": [
        { "type": "user_input", "content": [{"type": "text", "text": "..."}] },
        { "type": "thought", "content": [{"text": "...", "type": "thought"}] },
        {
          "type": "model_output",
          "content": [
            {
              "type": "video",
              "mime_type": "video/mp4",
              "uri": "https://generativelanguage.googleapis.com/v1beta/files/...:download?alt=media"
            }
          ]
        }
      ],
      "id": "v1_...",
      "status": "completed",
      "model": "gemini-omni-1.1-flash",
      "object": "interaction"
    }

<br />

> [!NOTE]
> **Note:** Currently, calling `GET /v1beta/interactions/{id}` returns the video as inline base64 data in the `data` field, even if the interaction was originally created with `delivery: "uri"`. The `uri` field is only guaranteed to be present in the initial creation response or Server-Sent Events (SSE) stream.

## Video extension

Extend an existing video by generating a seamless continuation at the tail end
of the clip. Describe how you want the video to continue in your prompt, for example
`"Extend this video"` or `"Continue the scene: the camera pans across the mountains"`.
The model analyzes the input video to generate a 3--10 second continuation.

You can extend:

- **Videos generated by the model (multi-turn)** : Extend a previously generated video by referencing its `previous_interaction_id`.
- **Uploaded videos**: Provide an uploaded video file (via the Files API) along
  with your extension prompt.

### Python

    import base64
    from google import genai

    client = genai.Client()

    # Upload your video using the Files API
    video_file = client.files.upload(file="my_video.mp4")

    # Extend the video using prompt-based extension
    interaction = client.interactions.create(
        model="gemini-omni-1.1-flash",
        input=[
            {"type": "document", "uri": video_file.uri},
            {"type": "text", "text": "Continue the scene."}
        ],
    )
    with open("extended.mp4", "wb") as f:
        f.write(base64.b64decode(interaction.output_video.data))

### JavaScript

    import { GoogleGenAI } from '@google/genai';
    import * as fs from 'fs';
    const ai = new GoogleGenAI({});

    // Upload your video using the Files API
    let videoFile = await ai.files.upload({
      file: 'my_video.mp4',
    });

    while (videoFile.state === 'PROCESSING') {
      await new Promise(r => setTimeout(r, 10000));
      videoFile = await ai.files.get({ name: videoFile.name });
    }

    // Extend the video using prompt-based extension
    const interaction = await ai.interactions.create({
      model: 'gemini-omni-1.1-flash',
      input: [
        { type: 'document', uri: videoFile.uri },
        { type: 'text', text: 'Continue the scene.' }
      ],
    });

    if (interaction.output_video?.data) {
      fs.writeFileSync('extended.mp4', Buffer.from(interaction.output_video.data, 'base64'));
    }

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.Content;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.TextContent;
    import com.google.genai.gaos.models.interactions.VideoContent;
    import com.google.genai.gaos.models.interactions.VideoContentMimeType;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.nio.file.Files;
    import java.nio.file.Paths;
    import java.util.Arrays;
    import java.util.Base64;
    import java.util.List;

    Client client = new Client();

    // Load base video
    byte[] videoBytes = Files.readAllBytes(Paths.get("my_video.mp4"));
    String base64Video = Base64.getEncoder().encodeToString(videoBytes);

    Content videoContent =
        VideoContent.builder()
            .data(base64Video)
            .mimeType(VideoContentMimeType.VIDEO_MP4)
            .build();

    // Prompt describing seamless continuation
    Content promptContent =
        TextContent.builder()
            .text("Continue the scene.")
            .build();

    List<Content> contents = Arrays.asList(videoContent, promptContent);

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-omni-1.1-flash"))
            .input(InteractionsInput.ofContent(contents))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    if (interaction.outputVideo().isPresent() && interaction.outputVideo().get().data().isPresent()) {
        byte[] extendedBytes = Base64.getDecoder().decode(interaction.outputVideo().get().data().get());
        Files.write(Paths.get("extended.mp4"), extendedBytes);
    }

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions?key=$API_KEY"     -H "Content-Type: application/json"     -d '{
     "model": "gemini-omni-1.1-flash",
     "input": [
       {"type": "document", "uri": "'"$VIDEO_URI"'"},
       {"type": "text", "text": "Continue the scene."}
     ]
    }'

Your browser does not support the video tag. Your browser does not support the video tag.

### Extending with reference media

You can provide reference images in the `input` array along with your prompt to
introduce new characters or elements into the extended video:

### Python

    import base64
    from google import genai

    client = genai.Client()

    # Upload base video and reference image using the Files API
    video_file = client.files.upload(file="my_video.mp4")
    character_img = client.files.upload(file="character.png")

    # Extend the video while introducing the reference character
    interaction = client.interactions.create(
        model="gemini-omni-1.1-flash",
        input=[
            {"type": "document", "uri": video_file.uri},
            {"type": "document", "uri": character_img.uri},
            {"type": "text", "text": "Extend this video: have the character shown in <IMAGE_REF_0> enter the scene and wave."}
        ],
    )
    with open("extended_with_character.mp4", "wb") as f:
        f.write(base64.b64decode(interaction.output_video.data))

### JavaScript

    import { GoogleGenAI } from '@google/genai';
    import * as fs from 'fs';
    const ai = new GoogleGenAI({});

    // Upload base video and reference image using the Files API
    let videoFile = await ai.files.upload({ file: 'my_video.mp4' });
    let characterImg = await ai.files.upload({ file: 'character.png' });

    while (videoFile.state === 'PROCESSING' || characterImg.state === 'PROCESSING') {
      await new Promise(r => setTimeout(r, 10000));
      videoFile = await ai.files.get({ name: videoFile.name });
      characterImg = await ai.files.get({ name: characterImg.name });
    }

    // Extend the video while introducing the reference character
    const interaction = await ai.interactions.create({
      model: 'gemini-omni-1.1-flash',
      input: [
        { type: 'document', uri: videoFile.uri },
        { type: 'document', uri: characterImg.uri },
        { type: 'text', text: 'Extend this video: have the character shown in <IMAGE_REF_0> enter the scene and wave.' }
      ],
    });

    if (interaction.output_video?.data) {
      fs.writeFileSync('extended_with_character.mp4', Buffer.from(interaction.output_video.data, 'base64'));
    }

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.Content;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.ImageContent;
    import com.google.genai.gaos.models.interactions.ImageContentMimeType;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.TextContent;
    import com.google.genai.gaos.models.interactions.VideoContent;
    import com.google.genai.gaos.models.interactions.VideoContentMimeType;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.nio.file.Files;
    import java.nio.file.Paths;
    import java.util.Arrays;
    import java.util.Base64;
    import java.util.List;

    Client client = new Client();

    // Load base video and reference character image
    byte[] videoBytes = Files.readAllBytes(Paths.get("my_video.mp4"));
    byte[] charBytes = Files.readAllBytes(Paths.get("character.png"));

    Content baseVideo =
        VideoContent.builder()
            .data(Base64.getEncoder().encodeToString(videoBytes))
            .mimeType(VideoContentMimeType.VIDEO_MP4)
            .build();

    Content characterImg =
        ImageContent.builder()
            .data(Base64.getEncoder().encodeToString(charBytes))
            .mimeType(ImageContentMimeType.IMAGE_PNG)
            .build();

    Content prompt =
        TextContent.builder()
            .text("Extend the video: the car stops, and the traveler from <image_1> steps out and waves at the sunset.")
            .build();

    List<Content> contents = Arrays.asList(baseVideo, characterImg, prompt);

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-omni-1.1-flash"))
            .input(InteractionsInput.ofContent(contents))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    if (interaction.outputVideo().isPresent() && interaction.outputVideo().get().data().isPresent()) {
        byte[] extendedBytes = Base64.getDecoder().decode(interaction.outputVideo().get().data().get());
        Files.write(Paths.get("extended_with_character.mp4"), extendedBytes);
    }

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions?key=$API_KEY"     -H "Content-Type: application/json"     -d '{
     "model": "gemini-omni-1.1-flash",
     "input": [
       {"type": "document", "uri": "'$VIDEO_URI'"},
       {"type": "document", "uri": "'$CHARACTER_IMG_URI'"},
       {"type": "text", "text": "Extend this video: have the character shown in <IMAGE_REF_0> enter the scene and wave."}
     ]
    }'

Your browser does not support the video tag.

> [!TIP]
> **Tip:** Optionally, you can set `"task": "extend"` in `video_config` under `generation_config` if prompting alone does not produce the expected extension mode. However, we recommend relying primarily on prompting first, as using the `task` field adds strict constraints to the model.

### Extension constraints and guidelines

Keep the following rules and constraints in mind when extending videos:

- **Spoken dialogue on uploaded videos**: Currently, you cannot extend an uploaded video where someone is talking to add additional dialogue (it is supported if the character remains silent or if the prompt does not add dialogue).
- **Multi-turn voice extension** : Generating spoken dialogue or speech is supported when extending previously generated videos via multi-turn (`previous_interaction_id`).
- **End-of-clip only**: Extension is limited to appending to the end of the video. You cannot prepend content or extend the middle of a clip.
- **Duration limit**: Input videos for extension must be 10 seconds or less in length when uploading (unless using multi-turn).
- **Regional availability**: Extending uploaded videos is not currently available for users in the European Economic Area (EEA), Switzerland, and the United Kingdom (extending videos generated by the model is supported in all available regions).

## Best practices

- **Use URI delivery for large videos:** For videos larger than 4MB (\>720p when available), use `delivery="uri"` in `response_format` to avoid payload size limits.
- **Optimized performance:** Set `background=false`, `store=false`, and `stream=false` for faster, synchronous unary generation. Note that setting `store=false` means the generated video won't be editable in subsequent turns using the `previous_interaction_id`.
- **Prompt precision:** See [prompt guidance](https://ai.google.dev/gemini-api/docs/omni#prompt-guide) section for details.

## Limitations

- Uploading and editing images containing minors is not supported in European Economic Area, Switzerland, and the United Kingdom.
- Uploading and editing images containing certain recognizable people is not supported.
- Editing or extending uploaded videos is not currently available for users in the European Economic Area (EEA), Switzerland, and the United Kingdom (editing or extending videos generated by the model is supported).
- Input videos for editing and extension must be 10 seconds or less when uploading (unless extending videos generated by the model in multi-turn).
- Video extension is limited to appending to the end of a video; prepending or extending the middle of a clip is not supported.
- You cannot extend an uploaded video where someone is talking to add additional dialogue (characters can remain silent, or multi-turn extension with `previous_interaction_id` can be used).
- Voice editing is not supported.
- Uploading audio references is unsupported in the current version of the API.
- Video references work best with likenesses; any audio in a video reference is ignored. Video references support a maximum of 3 clips, up to 3 seconds each.
- Referencing or reasoning across multiple videos is not supported. Attempting multi-video prompting may result in degraded model performance or unexpected outputs.
- Provisioned throughput is not supported.
- System instructions, temperature, `top_p`, stop sequences, and negative prompts are not supported (you can put your negatives in the regular prompt: e.g., "Do not do X").
- Using YouTube videos as a media source is not supported.

## Technical details

- All generated videos include SynthID watermarking, which is invisible to viewers but can be detected programmatically for provenance verification.
- Video generation times vary based on duration, resolution, and current API load. Longer and higher-resolution videos take more time to generate.
- Omni applies content safety filters to both input prompts and generated video (which vary by region). Prompts that violate usage policies are blocked.
- English (EN) is fully supported, but other languages have not been evaluated, so they may work but results can vary.

## Gemini Omni Flash prompt guide

This section contains tips and examples on how to prompt Gemini Omni Flash effectively.

### Single scene

By default Omni Flash will try to create a video with a few different shots.
It'll attempt to craft an interesting narrative based on the prompt.

If you need the output video to contain a single scene, you must prompt for that:

- In a single unbroken scene
- In a single continuous shot
- No scene cuts

For example:

    Continuous, unbroken handheld shot of a fluffy tabby cat sitting on a sunny windowsill, looking out into a leafy garden. The cat's tail twitches slowly, and its ears rotate slightly toward ambient noises. Sunbeams illuminate dust motes in the air. Sound design: Gentle breeze, distant bird chirps. No dialogue.

### Removing unwanted elements

If the generated video contains things you don't want, include simple negative prompts to avoid them:

- No dialogue
- No embellishments
- No extra sound effects

### Prompts for editing

Simple prompts work best for video editing. Overly descriptive prompts can lead to unintended changes.

The following are more examples of simple editing prompts:

- Make this video anime
- Put a fashionable hat on this person
- Change the lighting to be more dramatic
- Change the text on the sign to say "Omni Flash"

When editing a specific aspect of the video, include `"Keep everything else the same"` to maintain visual consistency.

The following are some examples to show how to apply this technique:

- **Avoid:** `In the video of the man sitting on the sofa, please add a small
  black cat that runs from the right side of the screen, jumps onto his lap,
  and then he starts to stroke its head while looking down.`
  - **Simplify:** `Add a cat that jumps onto his lap, he begins to pet it.
    Keep everything else the same.`
- **Avoid:** `Please remove the cell phone that the person is holding in
  their hand and fill in the background so it looks like they are just holding
  their hand empty.`
  - **Simplify:** `Make the phone invisible. Keep everything else the
    same.`

### Prompting the audio

By default the model will try to generate an appropriate audio track for a
video. This might not always be what you want. You can use your prompt to
describe the type of audio you want. This is especially important if you want
music in your video:

- Include calm background music
- The video has a high energy techno beat
- The audio is a low tinny radio broadcast in the background, playing a song

### Timing events

You can prompt for things to happen at specific times in the video, there is no
precise syntax needed and you can use natural language. This is especially
useful in creating your own scene cuts, rhythm or rapid fire sequences.
See the following for examples:

- After 3 seconds, a woman enters the scene.
- At 5s the chorus starts in the background audio.
- Every 2s cut to a new frame.
- In a rapid fire sequence, every half a second (12 frames at 24fps) change the scene to a new location.

You can also use a timecode syntax:

    [0-3s] A person is walking
    [3-6s] They stop and turn around
    [6-10s] They start running

### Meta prompting

You can ask Gemini Omni Flash to pay attention to general qualities or
principles of video generation:

- Consider micro-detail, expression and timing to create a very rich, detailed but entirely natural scene.
- Be extremely detailed in your descriptions of characters and environments. Apply costume design principles to characters. Be very specific about the people, items and objects in the scene.
- Include plenty of appropriate detail in the background elements to make the scene feel realistic and natural.
- Make a rapid fire video that shows a different rare `[thing]` every 1s, upbeat music, include text to label the thing.

### Text in videos

You can prompt to include text in your video and Gemini Omni will render in a
way that is correct and readable. If there will be naturally occurring text in
your video, even in background elements, it can help to define what it should
say.

- One word on the screen at a time: "did, you, know, that, Omni, can, do, awesome, text?" Each word appears for 1s with a different animated style. No dialogue.
- There is a street sign that says: "This is an AI generation by Omni", there is a storefront that says: "All you need AI", there's a car with the number plate: "OMNI1.1"

### Prompts for extending a video

With Gemini Omni 1.1 Flash you can extend videos with prompts like, `"Extend this video"` or `"The scene continues"`. You can extend videos by 10s, up to a total length of 40s.

Omni creates an extension that keeps video, motion, characters and audio coherent by using the last 10s of your original video as context. Some of the final frames in your input video will be edited to make the transition seamless.

When extending, all of this guide's Omni prompting tips still apply:

- Describe the audio in your extended scene, especially if you need it to change: `"The music continues into the chorus"`
- Describe if the scene continues, or if there is a shot cut to a new scene (perhaps with the same characters): `"Show the same characters in the next scene"`
- Include images and videos as references when extending to help keep your outputs accurate, or to introduce new characters: `"The person shown in the reference image enters the scene"`, `"The dog in the reference video <VIDEO_REF_0> jumps onto the sofa"`
- If using timestamps or a timecode syntax, 0s refers to the beginning of the extended part of the video. If extending a 10s video, the scene cut in this prompt will happen after 12s: `"After 2s cut to a new scene with the same characters"`

### Using tags in prompts to set image and video roles

You can use tags to bind uploaded media to specific generation roles. This lets
you specify whether each image or video is a starting frame, a final frame, or a
reference.

#### 1. Simple tags (recommended)

For simple cases where media roles are clear from the prompt, you can bind
images and videos to roles directly:

- **`<FIRST_FRAME>`** : use the image as the starting frame of the video, for example: `<FIRST_FRAME> a woman is walking`
- **`<LAST_FRAME>`** : use the image as the final frame of the video to transition to. Must be used with `<FIRST_FRAME>`, for example: `<FIRST_FRAME> <LAST_FRAME> a woman is walking`
- **`<IMAGE_REF_N>`** : use the image as a reference, for example: `in the
  style of <IMAGE_REF_0> a woman <IMAGE_REF_1> is walking` (combines style reference from the first image and subject reference from the second image). Image references start from 0.
- **`<VIDEO_REF_N>`** : use the video as a character or object reference, for example: `the person in <VIDEO_REF_0> is playing the violin`. Video references also start from 0.

The following is an example with 6 reference images:

    [0-3s] A studio fashion sequence. Starting with woman <IMAGE_REF_0>, she is holding <IMAGE_REF_1>
    [3-6s] Then we see the man <IMAGE_REF_2> holding <IMAGE_REF_3>
    [6-10s] And finally another woman <IMAGE_REF_4> who is holding <IMAGE_REF_5> while walking.

#### 2. Declaring sources and references

For more complex cases with multiple media inputs and multiple roles, you can use
explicit prefix tags paired with natural language instructions. You should
declare these sources and references at the start of your prompt.

- `[# Sources <FIRST_FRAME>@Image1]` will use the first image as the starting frame.
- `[# Sources <FIRST_FRAME>@Image1 <LAST_FRAME>@Image2]` will use the first image as the starting frame and the second image as the final frame.
- `[# Sources <FIRST_FRAME>@Image1 <LAST_FRAME>@Image1]` will use the first image as both the first frame and the last frame, creating a video that loops.
- `[# Sources <FIRST_FRAME>@Image1] [# References <IMAGE_REF_0>@Image2]` will use the first image as the starting frame and the second image as a reference.
- `[# Sources <VIDEO_0>@Video1]` will use the video as the primary source video to edit or modify.
- `[# Sources <PREVIOUS_VIDEO>@Video1]` will use the video from the previous turn to extend.
- `[# References <IMAGE_REF_0>@Image1]` will use the first image as a reference.
- `[# References <IMAGE_REF_1>@Image2]` will use the second image as a reference.
- `[# References <IMAGE_REF_0>@Image1 <IMAGE_REF_1>@Image2]` will use both images as references.
- `[# References <VIDEO_REF_0>@Video1]` will use the first video as a reference.
- `[# References <IMAGE_REF_0>@Image1 <VIDEO_REF_0>@Video1]` will use both an image and a video as a reference.

Add guiding instructions at the end of your prompt:

- For a starting frame: `"Use this image as the starting frame."`
- For a looping video via start and end frames: `"Use this image as the first frame and the last frame."`
- For reference images: `"Use the given image(s) as references for video generation. The images should not be used as literal initial frames."`
- For reference videos: `"Use the given video(s) as references. Do not use them as a source for video editing."`

Some examples of prompts with source and reference declarations:

**Starting frame combined with a reference image:**

    [# Sources <FIRST_FRAME>@Image1] [# References <IMAGE_REF_0>@Image2] a woman <IMAGE_REF_0> is walking. Use Image1 as the starting frame. Use Image2 as a reference for the video generation.

**Character reference video combined with an object reference image:**

    [# References <IMAGE_REF_0>@Image1 <VIDEO_REF_0>@Video1] The woman in <VIDEO_REF_0> is playing the violin shown in <IMAGE_REF_0>. Use Video1 as a character reference and Image1 as an object reference.

## What's next

- Get started with the Gemini Omni Flash by experimenting in the [Omni Quickstart Colab](https://colab.sandbox.google.com/github/google-gemini/cookbook/blob/main/quickstarts/Get_started_Omni.ipynb).
- Learn how to write even better prompts with our [Introduction to prompt design](https://ai.google.dev/gemini-api/docs/prompting-intro).