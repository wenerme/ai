Lyria 3.5 is Google's family of music generation models, available
through the Gemini API. With Lyria 3.5, you can generate
high-quality, 44.1 kHz stereo audio from text prompts or from images. These
models deliver structural coherence, including vocals, timed lyrics, and full
instrumental arrangements.

The Lyria family includes models:

| Model | Model ID | Best for | Duration | Output |
|---|---|---|---|---|
| **Lyria 3 Clip** | `lyria-3-clip-preview` | Short clips, loops, previews | 30 seconds | MP3 |
| **Lyria 3.5** | `lyria-3.5` | Full-length songs with verses, choruses, bridges | A couple of minutes (controllable using prompt) | MP3 |

Both models can be used using the new
[Interactions API](https://ai.google.dev/gemini-api/docs/interactions-overview), supporting multimodal
inputs (text and images), and produce **44.1 kHz high-fidelity stereo**
audio.

> [!NOTE]
> **Note:** Looking for real-time, streaming music generation? See [Real-time music generation with Lyria RealTime](https://ai.google.dev/gemini-api/docs/realtime-music-generation).

## Generate a music clip

The Lyria 3 Clip model always generates a **30-second** clip. To generate a
clip, call the `interactions.create` method with a text prompt. The response
always includes the generated lyrics and song structure alongside the audio in
the `steps` schema.

### Python

    import base64
    from google import genai

    client = genai.Client()

    interaction = client.interactions.create(
        model="lyria-3-clip-preview",
        input="A short instrumental acoustic guitar piece.",
    )

    generated_audio = interaction.output_audio
    if generated_audio:
        with open("music.mp3", "wb") as f:
            f.write(base64.b64decode(generated_audio.data))

    lyrics = interaction.output_text
    if lyrics:
        print(f"Lyrics:\n{lyrics}")

### JavaScript

    import { GoogleGenAI } from '@google/genai';
    import * as fs from 'fs';

    const client = new GoogleGenAI({});

    const interaction = await client.interactions.create({
        model: 'lyria-3-clip-preview',
        input: 'A short instrumental acoustic guitar piece.',
    });

    const generatedAudio = interaction.output_audio;
    if (generatedAudio) {
      fs.writeFileSync('music.mp3', Buffer.from(generatedAudio.data, 'base64'));
    }

    const lyrics = interaction.output_text;
    if (lyrics) {
      console.log(`Lyrics:\n${lyrics}`);
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
            .model(Model.of("lyria-3-clip-preview"))
            .input(InteractionsInput.of("A short instrumental acoustic guitar piece."))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    if (interaction.outputAudio().isPresent() && interaction.outputAudio().get().data().isPresent()) {
      byte[] audioBytes = Base64.getDecoder().decode(interaction.outputAudio().get().data().get());
      Files.write(Paths.get("music.mp3"), audioBytes);
    }

    interaction.outputText().ifPresent(lyrics -> System.out.println("Lyrics:\n" + lyrics));

### Go

    package main

    import (
        "context"
        "encoding/base64"
        "fmt"
        "log"
        "os"

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

        res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
            Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
                Model: interactions.Model("lyria-3-clip-preview"),
                Input: interactions.NewInteractionsInput("A short instrumental acoustic guitar piece."),
            }),
        })
        if err != nil {
            log.Fatal(err)
        }

        if res.Interaction.OutputAudio != nil && res.Interaction.OutputAudio.Data != nil {
            audioBytes, err := base64.StdEncoding.DecodeString(*res.Interaction.OutputAudio.Data)
            if err != nil {
                log.Fatal(err)
            }
            if err := os.WriteFile("music.mp3", audioBytes, 0644); err != nil {
                log.Fatal(err)
            }
        }

        if res.Interaction.OutputText != nil {
            fmt.Printf("Lyrics:\n%s\n", *res.Interaction.OutputText)
        }
    }

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "Content-Type: application/json" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -d '{
        "model": "lyria-3-clip-preview",
        "input": "A short instrumental acoustic guitar piece."
    }'

You can retrieve generated music data by using the `interaction.output_audio`
property, which returns the last generated audio block. You can also retrieve
the song's lyrics and structure by using the `interaction.output_text`
property. For details on convenience properties, see the
[Interactions overview](https://ai.google.dev/gemini-api/docs/interactions-overview#convenience-properties).

> [!NOTE]
> **Note:** For complex, interleaved multimodal responses (such as music containing both raw structural breakdowns and audio blocks), convenience properties may not capture all parts. You must manually iterate over the steps instead---see [Interleaved lyrics and music](https://ai.google.dev/gemini-api/docs/music-generation#interleaved-output) for an example.

## Generate a full-length song

Use the `lyria-3.5` model to generate full-length songs that last a
couple of minutes. The Pro model understands musical structure and can create
compositions with distinct verses, choruses, and bridges. You can influence the
duration by specifying it in your prompt (e.g., "create a 2-minute song") or by
using [timestamps](https://ai.google.dev/gemini-api/docs/music-generation#timing) to define the structure.

### Python

    interaction = client.interactions.create(
        model="lyria-3.5",
        input="An epic cinematic orchestral piece about a journey home. Starts with a solo piano intro, builds through sweeping strings, and climaxes with a massive wall of sound.",
    )

### JavaScript

    const interaction = await client.interactions.create({
        model: 'lyria-3.5',
        input: 'A beautiful piano melody.',
    });

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;

    Client client = new Client();

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("lyria-3.5"))
            .input(
                InteractionsInput.of(
                    "An epic cinematic orchestral piece about a journey home. Starts with a solo piano intro, builds through sweeping strings, and climaxes with a massive wall of sound."))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

### Go

    package main

    import (
        "context"
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

        res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
            Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
                Model: interactions.Model("lyria-3.5"),
                Input: interactions.NewInteractionsInput(
                    "An epic cinematic orchestral piece about a journey home. Starts with a solo piano intro, builds through sweeping strings, and climaxes with a massive wall of sound.",
                ),
            }),
        })
        if err != nil {
            log.Fatal(err)
        }
        _ = res
    }

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "Content-Type: application/json" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -d '{
        "model": "lyria-3.5",
        "input": "A beautiful piano melody."
    }'

## Select output format

By default, the Lyria 3.5 models generate audio in **MP3** format. For
Lyria 3.5, you can also request the output in **WAV** format by setting
the `response_format`.

### Python

    interaction = client.interactions.create(
        model="lyria-3.5",
        input="A beautiful piano melody.",
        response_format={"type": "audio"},
    )

### JavaScript

    const interaction = await client.interactions.create({
        model: 'lyria-3.5',
        input: 'A beautiful piano melody.',
        response_format: {
            type: 'audio',
        },
    });

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.AudioResponseFormat;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.CreateModelInteractionResponseFormat;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.ResponseFormat;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;

    Client client = new Client();

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("lyria-3.5"))
            .input(InteractionsInput.of("A beautiful piano melody."))
            .responseFormat(
                CreateModelInteractionResponseFormat.of(
                    ResponseFormat.of(AudioResponseFormat.builder().build())))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

### Go

    package main

    import (
        "context"
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

        res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
            Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
                Model: interactions.Model("lyria-3.5"),
                Input: interactions.NewInteractionsInput("A beautiful piano melody."),
                ResponseFormat: genai.Ptr(interactions.NewCreateModelInteractionResponseFormat(
                    interactions.NewResponseFormat(interactions.AudioResponseFormat{}),
                )),
            }),
        })
        if err != nil {
            log.Fatal(err)
        }
        _ = res
    }

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{
        "model": "lyria-3.5",
        "input": "A beautiful piano melody.",
        "response_format": {
            "type": "audio"
        }
      }'

## Parse the response

The response from Lyria 3.5 contains multiple content blocks within the `steps` schema.
Interactions return a sequence of steps, where `model_output` steps contain the
generated content.
Text content blocks contain the generated lyrics or a JSON description of the song
structure.
Content blocks with `audio` type contain the base64 encoded audio data.

### Python

    lyrics = []
    audio_data = None

    generated_audio = interaction.output_audio
    if generated_audio:
        with open("output.mp3", "wb") as f:
            f.write(base64.b64decode(generated_audio.data))

    lyrics = interaction.output_text
    if lyrics:
        print(f"Lyrics:\n{lyrics}")

### JavaScript

    const lyrics = [];
    let audioData = null;

    const generatedAudio = interaction.output_audio;
    if (generatedAudio) {
        fs.writeFileSync("output.mp3", Buffer.from(generatedAudio.data, 'base64'));
    }

    const lyrics = interaction.output_text;
    if (lyrics) {
        console.log("Lyrics:\n" + lyrics);
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
            .model(Model.of("lyria-3.5"))
            .input(InteractionsInput.of("A song about a starry night."))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    if (interaction.outputAudio().isPresent() && interaction.outputAudio().get().data().isPresent()) {
      byte[] audioBytes = Base64.getDecoder().decode(interaction.outputAudio().get().data().get());
      Files.write(Paths.get("output.mp3"), audioBytes);
    }

    if (interaction.outputText().isPresent()) {
      System.out.println("Lyrics:\n" + interaction.outputText().get());
    }

### Go

    package main

    import (
        "context"
        "encoding/base64"
        "fmt"
        "log"
        "os"

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

        res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
            Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
                Model: interactions.Model("lyria-3.5"),
                Input: interactions.NewInteractionsInput("A song about a starry night."),
            }),
        })
        if err != nil {
            log.Fatal(err)
        }

        if res.Interaction.OutputAudio != nil && res.Interaction.OutputAudio.Data != nil {
            audioBytes, err := base64.StdEncoding.DecodeString(*res.Interaction.OutputAudio.Data)
            if err != nil {
                log.Fatal(err)
            }
            if err := os.WriteFile("output.mp3", audioBytes, 0644); err != nil {
                log.Fatal(err)
            }
        }

        if res.Interaction.OutputText != nil {
            fmt.Printf("Lyrics:\n%s\n", *res.Interaction.OutputText)
        }
    }

### REST

    # The output from the REST API is a JSON object containing base64 encoded data.
    # You can extract the text or the audio data using a tool like jq.
    # To extract the audio and save it to a file:
    curl ... | jq -r '.steps[] | select(.type=="model_output") | .content[] | select(.type=="audio") | .data' | base64 -d > output.mp3

#### Interleaved lyrics and music

Because the output from Lyria 3.5 is complex---containing separate steps and
blocks for generated lyrics (text) and the song itself (audio)---convenience
properties offer a fast and recommended shortcut.

However, if you want full, programmatic control over the raw timeline of steps
returned by the server (such as logging individual content blocks as they are
received), you can manually iterate over `steps` instead:

### Python

    lyrics = []
    audio_data = None

    for step in interaction.steps:
        if step.type == "model_output":
            for content_block in step.content:
                if content_block.type == "audio":
                    audio_data = base64.b64decode(content_block.data)
                elif content_block.type == "text":
                    lyrics.append(content_block.text)

    if lyrics:
        print("Lyrics:\n" + "\n".join(lyrics))

    if audio_data:
        with open("output.mp3", "wb") as f:
            f.write(audio_data)

### JavaScript

    const lyrics = [];
    let audioData = null;

    for (const step of interaction.steps) {
        if (step.type === 'model_output') {
            for (const contentBlock of step.content) {
                if (contentBlock.type === 'audio') {
                    audioData = Buffer.from(contentBlock.data, 'base64');
                } else if (contentBlock.type === 'text') {
                    lyrics.push(contentBlock.text);
                }
            }
        }
    }

    if (lyrics.length) {
        console.log("Lyrics:\n" + lyrics.join("\n"));
    }

    if (audioData) {
        fs.writeFileSync("output.mp3", audioData);
    }

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.AudioContent;
    import com.google.genai.gaos.models.interactions.Content;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.ModelOutputStep;
    import com.google.genai.gaos.models.interactions.Step;
    import com.google.genai.gaos.models.interactions.TextContent;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.nio.file.Files;
    import java.nio.file.Paths;
    import java.util.ArrayList;
    import java.util.Base64;
    import java.util.List;

    Client client = new Client();

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("lyria-3.5"))
            .input(InteractionsInput.of("A song about a starry night."))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    List<String> lyrics = new ArrayList<>();
    byte[] audioData = null;

    if (interaction.steps().isPresent()) {
      for (Step step : interaction.steps().get()) {
        if (step instanceof ModelOutputStep) {
          ModelOutputStep outputStep = (ModelOutputStep) step;
          if (outputStep.content().isPresent()) {
            for (Content contentBlock : outputStep.content().get()) {
              if (contentBlock instanceof AudioContent) {
                AudioContent audioBlock = (AudioContent) contentBlock;
                if (audioBlock.data().isPresent()) {
                  audioData = Base64.getDecoder().decode(audioBlock.data().get());
                }
              } else if (contentBlock instanceof TextContent) {
                TextContent textBlock = (TextContent) contentBlock;
                textBlock.text().ifPresent(lyrics::add);
              }
            }
          }
        }
      }
    }

    if (!lyrics.isEmpty()) {
      System.out.println("Lyrics:\n" + String.join("\n", lyrics));
    }

    if (audioData != null) {
      Files.write(Paths.get("output.mp3"), audioData);
    }

### Go

    package main

    import (
        "context"
        "encoding/base64"
        "fmt"
        "log"
        "os"
        "strings"

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

        res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
            Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
                Model: interactions.Model("lyria-3.5"),
                Input: interactions.NewInteractionsInput("A song about a starry night."),
            }),
        })
        if err != nil {
            log.Fatal(err)
        }

        var lyrics []string
        var audioData []byte

        for _, step := range res.Interaction.Steps {
            if step.ModelOutputStep != nil {
                for _, contentBlock := range step.ModelOutputStep.Content {
                    if contentBlock.AudioContent != nil && contentBlock.AudioContent.Data != nil {
                        decoded, err := base64.StdEncoding.DecodeString(*contentBlock.AudioContent.Data)
                        if err != nil {
                            log.Fatal(err)
                        }
                        audioData = decoded
                    } else if contentBlock.TextContent != nil {
                        lyrics = append(lyrics, contentBlock.TextContent.Text)
                    }
                }
            }
        }

        if len(lyrics) > 0 {
            fmt.Printf("Lyrics:\n%s\n", strings.Join(lyrics, "\n"))
        }

        if audioData != nil {
            if err := os.WriteFile("output.mp3", audioData, 0644); err != nil {
                log.Fatal(err)
            }
        }
    }

## Generate music from images

Lyria 3.5 supports multimodal inputs --- you can provide up to **10 images**
alongside your text prompt in the `input` list and the model will compose music
inspired by the visual content.

### Python

    import base64

    with open("desert_sunset.jpg", "rb") as f:
        image_bytes = f.read()
        image_b64 = base64.b64encode(image_bytes).decode("utf-8")

    response = client.interactions.create(
        model="lyria-3.5",
        input=[
            {
                "type": "text",
                "text": "An atmospheric ambient track inspired by the mood and colors in this image.",
            },
            {
                "type": "image",
                "mime_type": "image/jpeg",
                "data": image_b64,
            },
        ],
    )

### JavaScript

    import * as fs from "fs";

    const imageBytes = fs.readFileSync("desert_sunset.jpg").toString("base64");

    const interaction = await client.interactions.create({
        model: "lyria-3.5",
        input: [
            {
                type: "text",
                text: "An atmospheric ambient track inspired by the mood and colors in this image.",
            },
            {
                type: "image",
                mime_type: "image/jpeg",
                data: imageBytes,
            },
        ],
    });

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

    byte[] imageBytes = Files.readAllBytes(Paths.get("desert_sunset.jpg"));
    String imageB64 = Base64.getEncoder().encodeToString(imageBytes);

    Content textContent =
        TextContent.builder()
            .text("An atmospheric ambient track inspired by the mood and colors in this image.")
            .build();
    Content imageContent =
        ImageContent.builder()
            .mimeType(ImageContentMimeType.IMAGE_JPEG)
            .data(imageB64)
            .build();

    List<Content> contents = Arrays.asList(textContent, imageContent);

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("lyria-3.5"))
            .input(InteractionsInput.ofContent(contents))
            .build();

    Interaction response =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

### Go

    package main

    import (
        "context"
        "encoding/base64"
        "log"
        "os"

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

        imageBytes, err := os.ReadFile("desert_sunset.jpg")
        if err != nil {
            log.Fatal(err)
        }
        imageB64 := base64.StdEncoding.EncodeToString(imageBytes)

        contents := []interactions.Content{
            interactions.NewContent(interactions.TextContent{
                Text: "An atmospheric ambient track inspired by the mood and colors in this image.",
            }),
            interactions.NewContent(interactions.ImageContent{
                MimeType: interactions.ImageContentMimeTypeImageJpeg.ToPointer(),
                Data:     genai.Ptr(imageB64),
            }),
        }

        res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
            Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
                Model: interactions.Model("lyria-3.5"),
                Input: interactions.NewInteractionsInput(contents),
            }),
        })
        if err != nil {
            log.Fatal(err)
        }
        _ = res
    }

### REST

    # Pass base64 encoded image data directly:
    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -d '{
        "model": "lyria-3.5",
        "input": [
          {"type": "text", "text": "An atmospheric ambient track inspired by the mood and colors in this image."},
          {"type": "image", "mime_type": "image/jpeg", "data": "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA="}
        ]
      }'

## Provide custom lyrics

You can write your own lyrics and include them in the prompt. Use section tags
like `[Verse]`, `[Chorus]`, and `[Bridge]` to help the model understand the
song structure:

### Python

    prompt = """
    Create a dreamy indie pop song with the following lyrics:

    [Verse 1]
    Walking through the neon glow,
    city lights reflect below,
    every shadow tells a story,
    every corner, fading glory.

    [Chorus]
    We are the echoes in the night,
    burning brighter than the light,
    hold on tight, don't let me go,
    we are the echoes down below.

    [Verse 2]
    Footsteps lost on empty streets,
    rhythms sync to heartbeats,
    whispers carried by the breeze,
    dancing through the autumn leaves.
    """

    interaction = client.interactions.create(
        model="lyria-3.5",
        input=prompt,
    )

### JavaScript

    const prompt = `
    Create a dreamy indie pop song with the following lyrics:

    [Verse 1]
    Walking through the neon glow,
    city lights reflect below,
    every shadow tells a story,
    every corner, fading glory.

    [Chorus]
    We are the echoes in the night,
    burning brighter than the light,
    hold on tight, don't let me go,
    we are the echoes down below.

    [Verse 2]
    Footsteps lost on empty streets,
    rhythms sync to heartbeats,
    whispers carried by the breeze,
    dancing through the autumn leaves.
    `;

    const interaction = await client.interactions.create({
        model: 'lyria-3.5',
        input: prompt,
    });

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;

    Client client = new Client();

    String prompt =
        "Create a dreamy indie pop song with the following lyrics:\n\n"
            + "[Verse 1]\n"
            + "Walking through the neon glow,\n"
            + "city lights reflect below,\n"
            + "every shadow tells a story,\n"
            + "every corner, fading glory.\n\n"
            + "[Chorus]\n"
            + "We are the echoes in the night,\n"
            + "burning brighter than the light,\n"
            + "hold on tight, don't let me go,\n"
            + "we are the echoes down below.\n\n"
            + "[Verse 2]\n"
            + "Footsteps lost on empty streets,\n"
            + "rhythms sync to heartbeats,\n"
            + "whispers carried by the breeze,\n"
            + "dancing through the autumn leaves.";

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("lyria-3.5"))
            .input(InteractionsInput.of(prompt))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

### Go

    package main

    import (
        "context"
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

        prompt := "Create a dreamy indie pop song with the following lyrics:\n\n" +
            "[Verse 1]\n" +
            "Walking through the neon glow,\n" +
            "city lights reflect below,\n" +
            "every shadow tells a story,\n" +
            "every corner, fading glory.\n\n" +
            "[Chorus]\n" +
            "We are the echoes in the night,\n" +
            "burning brighter than the light,\n" +
            "hold on tight, don't let me go,\n" +
            "we are the echoes down below.\n\n" +
            "[Verse 2]\n" +
            "Footsteps lost on empty streets,\n" +
            "rhythms sync to heartbeats,\n" +
            "whispers carried by the breeze,\n" +
            "dancing through the autumn leaves."

        res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
            Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
                Model: interactions.Model("lyria-3.5"),
                Input: interactions.NewInteractionsInput(prompt),
            }),
        })
        if err != nil {
            log.Fatal(err)
        }
        _ = res
    }

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{
        "model": "lyria-3.5",
        "input": "Create a dreamy indie pop song with the following lyrics: ..."
      }'

## Control timing and structure

You can specify exactly what happens at specific moments in the song using
timestamps. This is useful for controlling when instruments enter, when lyrics
are delivered, and how the song progresses:

### Python

    prompt = """
    [0:00 - 0:10] Intro: Begin with a soft lo-fi beat and muffled
                  vinyl crackle.
    [0:10 - 0:30] Verse 1: Add a warm Fender Rhodes piano melody
                  and gentle vocals singing about a rainy morning.
    [0:30 - 0:50] Chorus: Full band with upbeat drums and soaring
                  synth leads. The lyrics are hopeful and uplifting.
    [0:50 - 1:00] Outro: Fade out with the piano melody alone.
    """

    interaction = client.interactions.create(
        model="lyria-3.5",
        input=prompt,
    )

### JavaScript

    const prompt = `
    [0:00 - 0:10] Intro: Begin with a soft lo-fi beat and muffled
                  vinyl crackle.
    [0:10 - 0:30] Verse 1: Add a warm Fender Rhodes piano melody
                  and gentle vocals singing about a rainy morning.
    [0:30 - 0:50] Chorus: Full band with upbeat drums and soaring
                  synth leads. The lyrics are hopeful and uplifting.
    [0:50 - 1:00] Outro: Fade out with the piano melody alone.
    `;

    const interaction = await client.interactions.create({
        model: 'lyria-3.5',
        input: prompt,
    });

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;

    Client client = new Client();

    String prompt =
        "[0:00 - 0:10] Intro: Begin with a soft lo-fi beat and muffled vinyl crackle.\n"
            + "[0:10 - 0:30] Verse 1: Add a warm Fender Rhodes piano melody and gentle vocals singing about a rainy morning.\n"
            + "[0:30 - 0:50] Chorus: Full band with upbeat drums and soaring synth leads. The lyrics are hopeful and uplifting.\n"
            + "[0:50 - 1:00] Outro: Fade out with the piano melody alone.";

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("lyria-3.5"))
            .input(InteractionsInput.of(prompt))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

### Go

    package main

    import (
        "context"
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

        prompt := "[0:00 - 0:10] Intro: Begin with a soft lo-fi beat and muffled vinyl crackle.\n" +
            "[0:10 - 0:30] Verse 1: Add a warm Fender Rhodes piano melody and gentle vocals singing about a rainy morning.\n" +
            "[0:30 - 0:50] Chorus: Full band with upbeat drums and soaring synth leads. The lyrics are hopeful and uplifting.\n" +
            "[0:50 - 1:00] Outro: Fade out with the piano melody alone."

        res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
            Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
                Model: interactions.Model("lyria-3.5"),
                Input: interactions.NewInteractionsInput(prompt),
            }),
        })
        if err != nil {
            log.Fatal(err)
        }
        _ = res
    }

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{
        "model": "lyria-3.5",
        "input": "[0:00 - 0:10] Intro: ..."
      }'

## Generate instrumental tracks

For background music, game soundtracks, or any use case where vocals are not
required, you can prompt the model to produce instrumental-only tracks:

### Python

    interaction = client.interactions.create(
        model="lyria-3-clip-preview",
        input="A bright chiptune melody in C Major, retro 8-bit video game style. Instrumental only, no vocals.",
    )

### JavaScript

    const interaction = await client.interactions.create({
        model: 'lyria-3-clip-preview',
        input: 'A bright chiptune melody in C Major, retro 8-bit video game style. Instrumental only, no vocals.',
    });

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;

    Client client = new Client();

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("lyria-3-clip-preview"))
            .input(
                InteractionsInput.of(
                    "A bright chiptune melody in C Major, retro 8-bit video game style. Instrumental only, no vocals."))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

### Go

    package main

    import (
        "context"
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

        res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
            Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
                Model: interactions.Model("lyria-3-clip-preview"),
                Input: interactions.NewInteractionsInput(
                    "A bright chiptune melody in C Major, retro 8-bit video game style. Instrumental only, no vocals.",
                ),
            }),
        })
        if err != nil {
            log.Fatal(err)
        }
        _ = res
    }

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{
        "model": "lyria-3-clip-preview",
        "input": "A bright chiptune melody in C Major, retro 8-bit video game style. Instrumental only, no vocals."
      }'

## Generate music in different languages

Lyria 3.5 generates lyrics in the language of your prompt. To generate a song
with French lyrics, write your prompt in French. The model adapts its vocal
style and pronunciation to match the language.

### Python

    interaction = client.interactions.create(
        model="lyria-3.5",
        input="Crée une chanson pop romantique en français sur un coucher de soleil à Paris. Utilise du piano et de la guitare acoustique.",
    )

### JavaScript

    const interaction = await client.interactions.create({
        model: 'lyria-3.5',
        input: 'Crée une chanson pop romantique en français sur un coucher de soleil à Paris. Utilise du piano et de la guitare acoustique.',
    });

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;

    Client client = new Client();

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("lyria-3.5"))
            .input(
                InteractionsInput.of(
                    "Crée une chanson pop romantique en français sur un coucher de soleil à Paris. Utilise du piano et de la guitare acoustique."))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

### Go

    package main

    import (
        "context"
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

        res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
            Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
                Model: interactions.Model("lyria-3.5"),
                Input: interactions.NewInteractionsInput(
                    "Crée une chanson pop romantique en français sur un coucher de soleil à Paris. Utilise du piano et de la guitare acoustique.",
                ),
            }),
        })
        if err != nil {
            log.Fatal(err)
        }
        _ = res
    }

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{
        "model": "lyria-3.5",
        "input": "Crée une chanson pop romantique en français sur un coucher de soleil à Paris. Utilise du piano et de la guitare acoustique."
      }'

## Model intelligence

Lyria 3.5 analyzes your prompt process where the
model reasons through musical structure (intro, verse, chorus, bridge, etc.)
based on your prompt.
This happens before the audio is generated and ensures structural coherence and
musicality.

> [!IMPORTANT]
> **Important:** While Lyria 3.5 uses a prompt rewriter internally to interpret natural language instructions, it does **not** expose intermediate "thought" blocks or thought signatures to the user.

## Prompting guide

To learn how to craft effective prompts for music genres, instruments,
song structure, custom lyrics, and vocal delivery styles, see the
[Lyria prompt guide](https://ai.google.dev/gemini-api/docs/lyria-prompt-guide).

## Best practices

- **Iterate with Clip first.** Use the faster `lyria-3-clip-preview` model to experiment with prompts before committing to a full-length generation with `lyria-3.5`.
- **Be specific.** Vague prompts produce generic results. Mention instruments, BPM, key, mood, and structure for the best output.
- **Match your language.** Prompt in the language you want the lyrics in.
- **Use section tags.** `[Verse]`, `[Chorus]`, `[Bridge]` tags give the model clear structure to follow.
- **Separate lyrics from instructions.** When providing custom lyrics, clearly separate them from your musical direction instructions.

## Limitations

- **Safety**: All prompts are checked by safety filters. Prompts that trigger the filters will be blocked. This includes prompts that request specific artist voices or the generation of copyrighted lyrics.
- **Watermarking** : All generated audio includes a [SynthID audio watermark](https://ai.google.dev/responsible/docs/safeguards/synthid) for identification. This watermark is imperceptible to the human ear and does not affect the listening experience.
- **Multi-turn editing**: Music generation is a single-turn process. Iterative editing or refining a generated clip through multiple prompts is not supported in the current version of Lyria 3.5.
- **Length**: The Clip model always generates 30-second clips. The Pro model generates songs that last a couple of minutes; exact duration can be influenced through your prompt.
- **Determinism**: Results may vary between calls, even with the same prompt.

## What's next

- Check [pricing](https://ai.google.dev/gemini-api/docs/pricing) for Lyria 3.5 models.
- Try [real-time, streaming music generation](https://ai.google.dev/gemini-api/docs/realtime-music-generation) with Lyria RealTime.
- Generate multi-speaker conversations with the [TTS models](https://ai.google.dev/gemini-api/docs/speech-generation).
- Discover how to generate [images](https://ai.google.dev/gemini-api/docs/image-generation) or [videos](https://ai.google.dev/gemini-api/docs/video).
- Find out how Gemini can [understand audio files](https://ai.google.dev/gemini-api/docs/audio).
- Have a real-time conversation with Gemini using the [Live API](https://ai.google.dev/gemini-api/docs/live).