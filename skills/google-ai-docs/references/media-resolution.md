The `media_resolution` parameter controls how the Gemini API processes media
inputs like images, videos, audio, and PDF documents by determining the
**maximum number of tokens** allocated for media inputs, allowing you to
balance response quality against latency and cost. While visual and document
inputs scale token allocation based on the resolution setting, audio inputs
are tokenized at a fixed rate per second across all resolution levels. For
different settings, default values and how they correspond to tokens, see the
[Token counts](https://ai.google.dev/gemini-api/docs/media-resolution#token-counts) section.

You can configure media resolution for individual media objects (content items) within your request (Gemini 3 only).

## Per-content-item media resolution (Gemini 3 only)

Gemini 3 allows you to set media resolution for individual media objects within your request, offering fine-grained optimisation of token usage. You can mix resolution levels in a single request. For example, using high resolution for a complex diagram and low resolution for a simple contextual image.

### Python

    from google import genai

    client = genai.Client()

    myfile = client.files.upload(file="path/to/image.jpg")

    interaction = client.interactions.create(
        model="gemini-3.8-flash",
        input=[
            {"type": "text", "text": "Describe this image:"},
            {
                "type": "image",
                "uri": myfile.uri,
                "mime_type": myfile.mime_type,
                "resolution": "high"
            }
        ]
    )
    print(interaction.output_text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({});

    async function main() {
      const myfile = await ai.files.upload({
        file: "path/to/image.jpg",
        config: { mime_type: "image/jpeg" },
      });

      const interaction = await ai.interactions.create({
        model: "gemini-3.8-flash",
        input: [
          { type: "text", text: "Describe this image:" },
          {
            type: "image",
            uri: myfile.uri,
            mime_type: myfile.mimeType,
            resolution: "high"
          }
        ],
      });
      console.log(interaction.output_text);
    }

    await main();

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
    import java.util.Arrays;
    import java.util.List;

    Client client = new Client();

    Content textContent = TextContent.builder().text("Describe the details in this high-resolution image.").build();
    Content imageContent =
        ImageContent.builder()
            .uri("gs://cloud-samples-data/generative-ai/image/scones.jpg")
            .mimeType(ImageContentMimeType.IMAGE_JPEG)
            .build();

    List<Content> contents = Arrays.asList(textContent, imageContent);

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-3.8-flash"))
            .input(InteractionsInput.ofContent(contents))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    System.out.println(interaction.outputText().orElse(""));

### Go

    package main

    import (
        "context"
        "fmt"
        "log"

        "google.golang.org/genai"
        "google.golang.org/genai/interactions/models/interactions"
        "google.golang.org/genai/interactions/models/operations"
    )

    func main() {
        ctx := context.Background()
        client, err := genai.NewClient(ctx, nil)
        if err != nil {
            log.Fatal(err)
        }

        uploadedFile, err := client.Files.UploadFromPath(ctx, "path/to/image.jpg", nil)
        if err != nil {
            log.Fatal(err)
        }

        res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
            Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
                Model: interactions.Model("gemini-3.8-flash"),
                Input: interactions.NewInteractionsInput([]interactions.Content{
                    interactions.NewContent(interactions.TextContent{
                        Text: "Describe the details in this high-resolution image.",
                    }),
                    interactions.NewContent(interactions.ImageContent{
                        URI:        genai.Ptr(uploadedFile.URI),
                        MimeType:   interactions.ImageContentMimeType(uploadedFile.MIMEType).ToPointer(),
                        Resolution: interactions.MediaResolutionHigh.ToPointer(),
                    }),
                }),
            }),
        })
        if err != nil {
            log.Fatal(err)
        }
        if res.Interaction.OutputText != nil {
            fmt.Println(*res.Interaction.OutputText)
        }
    }

### REST

    # First upload the file using the Files API, then use the URI:
    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -d '{
        "model": "gemini-3.8-flash",
        "input": [
          {"type": "text", "text": "Describe this image:"},
          {
            "type": "image",
            "uri": "YOUR_FILE_URI",
            "mime_type": "image/jpeg",
            "resolution": "high"
          }
        ]
      }'

## Available resolution values

The Gemini API defines the following levels for media resolution:

- `unspecified`: The default setting. The token count for this level varies significantly between Gemini 3 and earlier Gemini models.
- `low`: Lower token count, resulting in faster processing and lower cost, but with less detail.
- `medium`: A balance between detail, cost, and latency.
- `high`: Higher token count, providing more detail for the model to work with, at the expense of increased latency and cost.
- `ultra_high` (Per content item only): Highest token count, required for specific use cases such as [computer use](https://ai.google.dev/gemini-api/docs/computer-use).

Note that `high` provides the optimal performance for most use cases.

The exact number of tokens generated for each of these levels depends on both
the **media type** (Image, Video, Audio, PDF) and the **model version**.

## Token counts

The tables below summarize the approximate token counts for each `media_resolution` value and media type per model family.

**Gemini 3 models**

| MediaResolution | Image | Video | Audio | PDF |
|---|---|---|---|---|
| `unspecified` (Default) | 1120 | 70 | 25 (per second) | 560 |
| `low` | 280 | 70 | 25 (per second) | 280 + Native Text |
| `medium` | 560 | 70 | 25 (per second) | 560 + Native Text |
| `high` | 1120 | 280 | 25 (per second) | 1120 + Native Text |
| `ultra_high` | 2240 | N/A | N/A | N/A |

## Choosing the right resolution

- **Default (`unspecified`):** Start with the default. It's tuned for a good balance of quality, latency, and cost for most common use cases.
- **`low`:** Use for scenarios where cost and latency are paramount, and fine-grained detail is less critical.
- **`medium` / `high`:** Increase the resolution when the task requires understanding intricate details within the media. This is often needed for complex visual analysis, chart reading, or dense document comprehension.
- **`ultra_high`** - Only available for per content item setting. Recommended for specific use cases such as computer use or where testing shows a clear enhancement over `high`.
- **Per-content-item control (Gemini 3):** Optimizes token usage. For example, in a prompt with multiple images, use `high` for a complex diagram and `low` or `medium` for simpler contextual images.

**Recommended settings**

The following lists the recommended media resolution settings for each supported media type.

| Media Type | Recommended Setting | Max Tokens | Usage Guidance |
|---|---|---|---|
| **Images** | `high` | 1120 | Recommended for most image analysis tasks to ensure maximum quality. |
| **PDFs** | `medium` | 560 | Optimal for document understanding; quality typically saturates at `medium`. Increasing to `high` rarely improves OCR results for standard documents. |
| **Video** (General) | `low` (or `medium`) | 70 (per frame) | **Note:** For video, `low` and `medium` settings are treated identically (70 tokens) to optimize context usage. This is sufficient for most action recognition and description tasks. |
| **Video** (Text-heavy) | `high` | 280 (per frame) | Required only when the use case involves reading dense text (OCR) or small details within video frames. |
| **Audio** | `unspecified` (Default) | 25 (per second) | Audio is tokenized at a fixed rate of 25 tokens per second across all supported resolution settings (`unspecified`, `low`, `medium`, and `high`). |

Always test and evaluate the impact of different resolution settings on your application to find the best trade-off between quality, latency, and cost.

## Relationship with video processing modes

The `media_resolution` and processing parameters control different aspects of video input:

- `media_resolution` controls the **resolution** of each frame (number of tokens per frame).
- `processing` / `media_processing` controls **which content from the video** is loaded into context.

You can set both on the same video input. For example, you might use agentic processing with low media resolution to minimize total token usage for a long video.

For details on video processing modes, see the [Agentic video understanding](https://ai.google.dev/gemini-api/docs/video-understanding#agentic-video-understanding) guide.

## Version compatibility summary

- Setting the `resolution` on individual content items is **exclusive to Gemini 3 models**.

## Next steps

- Learn more about the multimodal capabilities of Gemini API in the [image understanding](https://ai.google.dev/gemini-api/docs/image-understanding), [video understanding](https://ai.google.dev/gemini-api/docs/video-understanding), [audio understanding](https://ai.google.dev/gemini-api/docs/audio), and [document understanding](https://ai.google.dev/gemini-api/docs/document-processing) guides.