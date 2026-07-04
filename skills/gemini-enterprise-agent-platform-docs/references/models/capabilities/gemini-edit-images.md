> [!NOTE]
> To see examples of Edit images with Gemini,
> run the following notebooks in the environment of your choice:
>
> - "Gemini 3.1 Flash Lite Image Generation in Agent Platform":
>
>   [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/getting-started/intro_gemini_3_1_flash_lite_image_gen.ipynb)
>
>
>   \|
>
>   [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fgetting-started%2Fintro_gemini_3_1_flash_lite_image_gen.ipynb)
>
>
>   \|
>
>   [!Open
>   in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/getting-started/intro_gemini_3_1_flash_lite_image_gen.ipynb)
>
>
>   \|
>
>   [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/getting-started/intro_gemini_3_1_flash_lite_image_gen.ipynb)
> - "Gemini 3.1 Flash Image Generation in Agent Platform":
>
>   [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/getting-started/intro_gemini_3_1_flash_image_gen.ipynb)
>
>
>   \|
>
>   [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fgetting-started%2Fintro_gemini_3_1_flash_image_gen.ipynb)
>
>
>   \|
>
>   [!Open
>   in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/getting-started/intro_gemini_3_1_flash_image_gen.ipynb)
>
>
>   \|
>
>   [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/getting-started/intro_gemini_3_1_flash_image_gen.ipynb)
> - "Gemini 3 Pro Image Generation in Agent Platform":
>
>   [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/getting-started/intro_gemini_3_image_gen.ipynb)
>
>
>   \|
>
>   [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fgetting-started%2Fintro_gemini_3_image_gen.ipynb)
>
>
>   \|
>
>   [!Open
>   in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/getting-started/intro_gemini_3_image_gen.ipynb)
>
>
>   \|
>
>   [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/getting-started/intro_gemini_3_image_gen.ipynb)

Gemini supports improved editing of images and multi-turn editing, and
supports updated safety filters that provide a more flexible and less
restrictive experience.

The following Gemini models support image editing:

#### Click to expand supported models

- [`gemini-3.1-flash-lite-image`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite-image)
- [`gemini-3-pro-image`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image)
- [`gemini-3.1-flash-image`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image)
- [`gemini-3.1-flash-image-preview`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image) preview
- [`gemini-3-pro-image-preview`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image-preview) preview
- [`gemini-2.5-flash-image`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-image)

For more information about model capabilities, see [Gemini
models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models).

### Edit an image

### Console

To edit images, do the following:

1. Open [**Agent Studio \> Create prompt**](https://console.cloud.google.com/agent-platform/studio/multimodal;mode=prompt).
2. Click **Switch model** and select one of the displayed models.
3. In the **Outputs** panel, select **Image and text** from the drop-down menu.
4. Click **Insert media** () and select a source from the menu, then follow the dialog's instructions.
5. Write what edits you want to make to the image in the **Write a prompt** text area.
6. Click the **Prompt** () button.

Gemini generates an edited version of the provided image based on
your description. This process takes a few seconds, but can be
comparatively slower depending on capacity.

### Python

#### Install

```
pip install --upgrade google-genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/python-genai/).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    from google import genai
    from google.genai.types import GenerateContentConfig, Modality
    from PIL import Image
    from io import BytesIO

    client = genai.Client()

    # Using an image of Eiffel tower, with fireworks in the background.
    image = Image.open("test_resources/example-image-eiffel-tower.png")

    response = client.models.generate_content(
        model="gemini-3.1-flash-image",
        contents=[image, "Edit this image to make it look like a cartoon."],
        config=GenerateContentConfig(response_modalities=[Modality.TEXT, Modality.IMAGE]),
    )
    for part in response.candidates[0].content.parts:
        if part.text:
            print(part.text)
        elif part.inline_data:
            image = Image.open(BytesIO((part.inline_data.data)))
            image.save("output_folder/bw-example-image.png")

### Java

Learn how to install or update the [Java](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview).

To learn more, see the
[SDK reference documentation](https://central.sonatype.com/artifact/com.google.genai/google-genai).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    import com.google.genai.Client;
    import com.google.genai.types.Blob;
    import com.google.genai.types.Candidate;
    import com.google.genai.types.Content;
    import com.google.genai.types.GenerateContentConfig;
    import com.google.genai.types.GenerateContentResponse;
    import com.google.genai.types.Part;
    import java.awt.image.BufferedImage;
    import java.io.ByteArrayInputStream;
    import java.io.File;
    import java.io.IOException;
    import java.nio.file.Files;
    import java.nio.file.Paths;
    import java.util.ArrayList;
    import java.util.List;
    import javax.imageio.ImageIO;

    public class ImageGenMmFlashEditImageWithTextAndImage {

      public static void main(String[] args) throws IOException {
        // TODO(developer): Replace these variables before running the sample.
        String modelId = "gemini-2.5-flash-image";
        String outputFile = "resources/output/bw-example-image.png";
        generateContent(modelId, outputFile);
      }

      // Edits an image with image and text input
      public static void generateContent(String modelId, String outputFile) throws IOException {
        // Client Initialization. Once created, it can be reused for multiple requests.
        try (Client client = Client.builder().location("global").vertexAI(true).build()) {

          byte[] localImageBytes =
              Files.readAllBytes(Paths.get("resources/example-image-eiffel-tower.png"));

          GenerateContentResponse response =
              client.models.generateContent(
                  modelId,
                  Content.fromParts(
                      Part.fromBytes(localImageBytes, "image/png"),
                      Part.fromText("Edit this image to make it look like a cartoon.")),
                  GenerateContentConfig.builder().responseModalities("TEXT", "IMAGE").build());

          // Get parts of the response
          List<Part> parts =
              response
                  .candidates()
                  .flatMap(candidates -> candidates.stream().findFirst())
                  .flatMap(Candidate::content)
                  .flatMap(Content::parts)
                  .orElse(new ArrayList<>());

          // For each part print text if present, otherwise read image data if present and
          // write it to the output file
          for (Part part : parts) {
            if (part.text().isPresent()) {
              System.out.println(part.text().get());
            } else if (part.inlineData().flatMap(Blob::data).isPresent()) {
              BufferedImage image =
                  ImageIO.read(new ByteArrayInputStream(part.inlineData().flatMap(Blob::data).get()));
              ImageIO.write(image, "png", new File(outputFile));
            }
          }

          System.out.println("Content written to: " + outputFile);

          // Example response:
          // No problem! Here's the image in a cartoon style...
          //
          // Content written to: resources/output/bw-example-image.png
        }
      }
    }

### Go

Learn how to install or update the [Go](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview).

To learn more, see the
[SDK reference documentation](https://pkg.go.dev/google.golang.org/genai).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    import (
        "context"
        "fmt"
        "io"
        "os"

        "google.golang.org/genai"
    )

    // generateImageMMFlashEditWithTextImg demonstrates editing an image with text and image inputs.
    func generateImageMMFlashEditWithTextImg(w io.Writer) error {
        // TODO(developer): Update below lines
        outputFile := "bw-example-image.png"
        inputFile := "example-image-eiffel-tower.png"
        ctx := context.Background()

        client, err := genai.NewClient(ctx, &genai.ClientConfig{
            HTTPOptions: genai.HTTPOptions{APIVersion: "v1"},
        })
        if err != nil {
            return fmt.Errorf("failed to create genai client: %w", err)
        }

        image, err := os.ReadFile(inputFile)
        if err != nil {
            return fmt.Errorf("failed to read image: %w", err)
        }

        modelName := "gemini-2.5-flash-image"
        prompt := "Edit this image to make it look like a cartoon."
        contents := []*genai.Content{
            {
                Role: "user",
                Parts: []*genai.Part{
                    {Text: prompt},
                    {InlineData: &genai.Blob{
                        MIMEType: "image/png",
                        Data:     image,
                    }},
                },
            },
        }
        resp, err := client.Models.GenerateContent(ctx,
            modelName,
            contents,
            &genai.GenerateContentConfig{
                ResponseModalities: []string{
                    string(genai.ModalityText),
                    string(genai.ModalityImage),
                },
            },
        )
        if err != nil {
            return fmt.Errorf("failed to generate content: %w", err)
        }

        if len(resp.Candidates) == 0 || resp.Candidates[0].Content == nil {
            return fmt.Errorf("no content was generated")
        }

        for _, part := range resp.Candidates[0].Content.Parts {
            if part.Text != "" {
                fmt.Fprintln(w, part.Text)
            } else if part.InlineData != nil {
                if len(part.InlineData.Data) > 0 {
                    if err := os.WriteFile(outputFile, part.InlineData.Data, 0644); err != nil {
                        return fmt.Errorf("failed to save image: %w", err)
                    }
                    fmt.Fprintln(w, outputFile)
                }
            }
        }

        // Example response:
        // Here's the image of the Eiffel Tower and fireworks, cartoonized for you!
        // Cartoon-style edit:
        //  - Simplified the Eiffel Tower with bolder lines and slightly exaggerated proportions.
        //  - Brightened and saturated the colors of the sky, fireworks, and foliage for a more vibrant, cartoonish look.
        //  ....
        return nil
    }

### Node.js

#### Install

```
npm install @google/genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/js-genai/).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    const fs = require('fs');
    const {GoogleGenAI, Modality} = require('@google/genai');

    const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT;
    const GOOGLE_CLOUD_LOCATION =
      process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';

    const FILE_NAME = 'test-data/example-image-eiffel-tower.png';

    async function generateImage(
      projectId = GOOGLE_CLOUD_PROJECT,
      location = GOOGLE_CLOUD_LOCATION
    ) {
      const client = new GoogleGenAI({
        vertexai: true,
        project: projectId,
        location: location,
      });

      const imageBytes = fs.readFileSync(FILE_NAME);

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [
          {
            role: 'user',
            parts: [
              {
                inlineData: {
                  mimeType: 'image/png',
                  data: imageBytes.toString('base64'),
                },
              },
              {
                text: 'Edit this image to make it look like a cartoon',
              },
            ],
          },
        ],
        config: {
          responseModalities: [Modality.TEXT, Modality.IMAGE],
        },
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.text) {
          console.log(`${part.text}`);
        } else if (part.inlineData) {
          const outputDir = 'output-folder';
          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, {recursive: true});
          }
          const imageBytes = Buffer.from(part.inlineData.data, 'base64');
          const filename = `${outputDir}/bw-example-image.png`;
          fs.writeFileSync(filename, imageBytes);
        }
      }

      // Example response:
      // Okay, I will edit this image to give it a cartoonish style, with bolder outlines, simplified details, and more vibrant colors.
      return response;
    }

### REST

Run the following command in the terminal to create or overwrite this file in
the current directory:

    curl -X POST \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json" \
      https://${API_ENDPOINT}:generateContent \
      -d '{
        "contents": {
          "role": "USER",
          "parts": [
            {"fileData": {
              "mimeType": "image/jpg",
              "fileUri": "FILE_NAME"
              }
            },
            {"text": "Convert this photo to black and white, in a cartoonish style."},
          ]

        },
        "generationConfig": {
          "imageConfig": {
            "aspectRatio": "16:9",
            "imageSize": "4K",
            "responseModalities": ["TEXT", "IMAGE"],
            "imageOutputOptions": {
              "mimeType": "image/png"
            },
          "personGeneration": "allow_all"
          },
        },
        "safetySettings": {
          "method": "PROBABILITY",
          "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
          "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
      }' 2>/dev/null >response.json

For more information about model capabilities, including supported aspect ratios
and output resolutions, see [Gemini
models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models#gemini-models).

Gemini generates an image based on your description. This process takes
a few seconds, but can be comparatively slower depending on capacity.

### Multi-turn image editing

Multi-turn editing lets you respond to the model with changes after it displays
an edited image response.

The following Gemini models support multi-turn editing:

#### Click to expand supported models

- [`gemini-3.1-flash-lite-image`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite-image)
- [`gemini-3-pro-image`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image)
- [`gemini-3.1-flash-image`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image)
- [`gemini-3.1-flash-image-preview`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image) preview
- [`gemini-3-pro-image-preview`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image-preview) preview
- [`gemini-2.5-flash-image`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-image)

We recommend limiting the entire request file size to 50MB maximum.

To test out multi-turn image editing, see the following notebooks:

- [Gemini 3 Pro Image Generation in Agent Platform](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/getting-started/intro_gemini_3_image_gen.ipynb),

- [Gemini 3.1 Flash Image Generation in Agent Platform](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/getting-started/intro_gemini_3_1_flash_image_gen.ipynb)

- [Gemini 3.1 Flash Lite Image Generation in Agent Platform](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/getting-started/intro_gemini_3_1_flash_lite_image_gen.ipynb)

To see code samples related to multi-turn image creation and editing using
Gemini 3 Pro Image, see
[Example of multi-turn image editing using thought signatures](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/thought-signatures#multi-turn-image-editing).

## What's next?

See the following links for more information about Gemini image
generation:

- [Generate images with
  Gemini](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/image-generation)

- [Gemini image generation best
  practices](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/gemini-image-generation-best-practices)

- [Gemini image generation
  limitations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/gemini-image-generation-limitations)

- [Gemini image generation and responsible AI](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/gemini-image-responsible-ai)
