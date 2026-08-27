Lyria 3 is Google's family of music generation models, available
through the Gemini API. With Lyria 3, you can generate
high-quality, 44.1 kHz stereo audio from text prompts or from images. These
models deliver structural coherence, including vocals, timed lyrics, and full
instrumental arrangements.

The Lyria 3 family includes two models:

| Model | Model ID | Best for | Duration | Output |
|---|---|---|---|---|
| **Lyria 3 Clip** | `lyria-3-clip-preview` | Short clips, loops, previews | 30 seconds | MP3 |
| **Lyria 3 Pro** | `lyria-3-pro-preview` | Full-length songs with verses, choruses, bridges | A couple of minutes (controllable using prompt) | MP3 |

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
    import com.google.genai.gaos.models.interactions.ResponseModality;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.util.Arrays;

    Client client = new Client();

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("lyria-3-generate-001"))
            .responseModalities(Arrays.asList(ResponseModality.AUDIO))
            .input(InteractionsInput.of("Upbeat electronic synthwave track"))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    System.out.println("Audio generated: " + interaction.outputAudio().isPresent());

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

Use the `lyria-3-pro-preview` model to generate full-length songs that last a
couple of minutes. The Pro model understands musical structure and can create
compositions with distinct verses, choruses, and bridges. You can influence the
duration by specifying it in your prompt (e.g., "create a 2-minute song") or by
using [timestamps](https://ai.google.dev/gemini-api/docs/music-generation#timing) to define the structure.

### Python

    interaction = client.interactions.create(
        model="lyria-3-pro-preview",
        input="An epic cinematic orchestral piece about a journey home. Starts with a solo piano intro, builds through sweeping strings, and climaxes with a massive wall of sound.",
    )

### JavaScript

    const interaction = await client.interactions.create({
        model: 'lyria-3-pro-preview',
        input: 'A beautiful piano melody.',
    });

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.ResponseModality;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.util.Arrays;

    Client client = new Client();

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("lyria-3-generate-001"))
            .responseModalities(Arrays.asList(ResponseModality.AUDIO))
            .input(InteractionsInput.of("Upbeat electronic synthwave track"))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    System.out.println("Audio generated: " + interaction.outputAudio().isPresent());

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "Content-Type: application/json" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -d '{
        "model": "lyria-3-pro-preview",
        "input": "A beautiful piano melody."
    }'

## Select output format

By default, the Lyria 3 models generate audio in **MP3** format. For
Lyria 3 Pro, you can also request the output in **WAV** format by setting
the `response_format`.

### Python

    interaction = client.interactions.create(
        model="lyria-3-pro-preview",
        input="A beautiful piano melody.",
        response_format={"type": "audio"},
    )

### JavaScript

    const interaction = await client.interactions.create({
        model: 'lyria-3-pro-preview',
        input: 'A beautiful piano melody.',
        response_format: {
            type: 'audio',
        },
    });

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.ResponseModality;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.util.Arrays;

    Client client = new Client();

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("lyria-3-generate-001"))
            .responseModalities(Arrays.asList(ResponseModality.AUDIO))
            .input(InteractionsInput.of("Upbeat electronic synthwave track"))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    System.out.println("Audio generated: " + interaction.outputAudio().isPresent());

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{
        "model": "lyria-3-pro-preview",
        "input": "A beautiful piano melody.",
        "response_format": {
            "type": "audio"
        }
      }'

## Parse the response

The response from Lyria 3 contains multiple content blocks within the `steps` schema.
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
    import com.google.genai.gaos.models.interactions.ResponseModality;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.util.Arrays;

    Client client = new Client();

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("lyria-3-generate-001"))
            .responseModalities(Arrays.asList(ResponseModality.AUDIO))
            .input(InteractionsInput.of("Upbeat electronic synthwave track"))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    System.out.println("Audio generated: " + interaction.outputAudio().isPresent());

### REST

    # The output from the REST API is a JSON object containing base64 encoded data.
    # You can extract the text or the audio data using a tool like jq.
    # To extract the audio and save it to a file:
    curl ... | jq -r '.steps[] | select(.type=="model_output") | .content[] | select(.type=="audio") | .data' | base64 -d > output.mp3

#### Interleaved lyrics and music

Because the output from Lyria 3 is complex---containing separate steps and
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
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.ResponseModality;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.util.Arrays;

    Client client = new Client();

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("lyria-3-generate-001"))
            .responseModalities(Arrays.asList(ResponseModality.AUDIO))
            .input(InteractionsInput.of("Upbeat electronic synthwave track"))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    System.out.println("Audio generated: " + interaction.outputAudio().isPresent());

## Generate music from images

Lyria 3 supports multimodal inputs --- you can provide up to **10 images**
alongside your text prompt in the `input` list and the model will compose music
inspired by the visual content.

### Python

    import base64

    with open("desert_sunset.jpg", "rb") as f:
        image_bytes = f.read()
        image_b64 = base64.b64encode(image_bytes).decode("utf-8")

    response = client.interactions.create(
        model="lyria-3-pro-preview",
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
        model: "lyria-3-pro-preview",
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
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.ResponseModality;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.util.Arrays;

    Client client = new Client();

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("lyria-3-generate-001"))
            .responseModalities(Arrays.asList(ResponseModality.AUDIO))
            .input(InteractionsInput.of("Upbeat electronic synthwave track"))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    System.out.println("Audio generated: " + interaction.outputAudio().isPresent());

### REST

    # Pass base64 encoded image data directly:
    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -d '{
        "model": "lyria-3-pro-preview",
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
        model="lyria-3-pro-preview",
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
        model: 'lyria-3-pro-preview',
        input: prompt,
    });

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.ResponseModality;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.util.Arrays;

    Client client = new Client();

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("lyria-3-generate-001"))
            .responseModalities(Arrays.asList(ResponseModality.AUDIO))
            .input(InteractionsInput.of("Upbeat electronic synthwave track"))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    System.out.println("Audio generated: " + interaction.outputAudio().isPresent());

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{
        "model": "lyria-3-pro-preview",
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
        model="lyria-3-pro-preview",
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
        model: 'lyria-3-pro-preview',
        input: prompt,
    });

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.ResponseModality;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.util.Arrays;

    Client client = new Client();

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("lyria-3-generate-001"))
            .responseModalities(Arrays.asList(ResponseModality.AUDIO))
            .input(InteractionsInput.of("Upbeat electronic synthwave track"))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    System.out.println("Audio generated: " + interaction.outputAudio().isPresent());

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{
        "model": "lyria-3-pro-preview",
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
    import com.google.genai.gaos.models.interactions.ResponseModality;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.util.Arrays;

    Client client = new Client();

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("lyria-3-generate-001"))
            .responseModalities(Arrays.asList(ResponseModality.AUDIO))
            .input(InteractionsInput.of("Upbeat electronic synthwave track"))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    System.out.println("Audio generated: " + interaction.outputAudio().isPresent());

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{
        "model": "lyria-3-clip-preview",
        "input": "A bright chiptune melody in C Major, retro 8-bit video game style. Instrumental only, no vocals."
      }'

## Generate music in different languages

Lyria 3 generates lyrics in the language of your prompt. To generate a song
with French lyrics, write your prompt in French. The model adapts its vocal
style and pronunciation to match the language.

### Python

    interaction = client.interactions.create(
        model="lyria-3-pro-preview",
        input="Crée une chanson pop romantique en français sur un coucher de soleil à Paris. Utilise du piano et de la guitare acoustique.",
    )

### JavaScript

    const interaction = await client.interactions.create({
        model: 'lyria-3-pro-preview',
        input: 'Crée une chanson pop romantique en français sur un coucher de soleil à Paris. Utilise du piano et de la guitare acoustique.',
    });

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.ResponseModality;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.util.Arrays;

    Client client = new Client();

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("lyria-3-generate-001"))
            .responseModalities(Arrays.asList(ResponseModality.AUDIO))
            .input(InteractionsInput.of("Upbeat electronic synthwave track"))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    System.out.println("Audio generated: " + interaction.outputAudio().isPresent());

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{
        "model": "lyria-3-pro-preview",
        "input": "Crée une chanson pop romantique en français sur un coucher de soleil à Paris. Utilise du piano et de la guitare acoustique."
      }'

## Model intelligence

Lyria 3 analyzes your prompt process where the
model reasons through musical structure (intro, verse, chorus, bridge, etc.)
based on your prompt.
This happens before the audio is generated and ensures structural coherence and
musicality.

> [!IMPORTANT]
> **Important:** While Lyria 3 uses a prompt rewriter internally to interpret natural language instructions, it does **not** expose intermediate "thought" blocks or thought signatures to the user.

## Prompting guide

The more specific your prompt, the better the results. Here's what you can
include to guide the generation:

- **Genre**: Specify a genre or blend of genres (e.g., "lo-fi hip hop", "jazz fusion", "cinematic orchestral").
- **Instruments**: Name specific instruments (e.g., "Fender Rhodes piano", "slide guitar", "TR-808 drum machine").
- **BPM**: Set the tempo (e.g., "120 BPM", "slow tempo around 70 BPM").
- **Key/Scale**: Specify a musical key (e.g., "in G major", "D minor").
- **Mood and atmosphere**: Use descriptive adjectives (e.g., "nostalgic", "aggressive", "ethereal", "dreamy").
- **Structure** : Use tags like `[Verse]`, `[Chorus]`, `[Bridge]`, `[Intro]`, `[Outro]` or timestamps to control the song's progression.
- **Duration**: The Clip model always produces 30-second clips. For the Pro model, specify the intended length in your prompt (e.g., "create a 2-minute song") or use timestamps to control duration.

### Example prompts

Here are some examples of effective prompts:

- `"A 30-second lofi hip hop beat with dusty vinyl crackle, mellow Rhodes
  piano chords, a slow boom-bap drum pattern at 85 BPM, and a jazzy upright
  bass line. Instrumental only."`
- `"An upbeat, feel-good pop song in G major at 120 BPM with bright acoustic
  guitar strumming, claps, and warm vocal harmonies about a summer road
  trip."`
- `"A dark, atmospheric trap beat at 140 BPM with heavy 808 bass, eerie synth
  pads, sharp hi-hats, and a haunting vocal sample. In D minor."`

## Best practices

- **Iterate with Clip first.** Use the faster `lyria-3-clip-preview` model to experiment with prompts before committing to a full-length generation with `lyria-3-pro-preview`.
- **Be specific.** Vague prompts produce generic results. Mention instruments, BPM, key, mood, and structure for the best output.
- **Match your language.** Prompt in the language you want the lyrics in.
- **Use section tags.** `[Verse]`, `[Chorus]`, `[Bridge]` tags give the model clear structure to follow.
- **Separate lyrics from instructions.** When providing custom lyrics, clearly separate them from your musical direction instructions.

## Limitations

- **Safety**: All prompts are checked by safety filters. Prompts that trigger the filters will be blocked. This includes prompts that request specific artist voices or the generation of copyrighted lyrics.
- **Watermarking** : All generated audio includes a [SynthID audio watermark](https://ai.google.dev/responsible/docs/safeguards/synthid) for identification. This watermark is imperceptible to the human ear and does not affect the listening experience.
- **Multi-turn editing**: Music generation is a single-turn process. Iterative editing or refining a generated clip through multiple prompts is not supported in the current version of Lyria 3.
- **Length**: The Clip model always generates 30-second clips. The Pro model generates songs that last a couple of minutes; exact duration can be influenced through your prompt.
- **Determinism**: Results may vary between calls, even with the same prompt.

## What's next

- Check [pricing](https://ai.google.dev/gemini-api/docs/pricing) for Lyria 3 models.
- Try [real-time, streaming music generation](https://ai.google.dev/gemini-api/docs/realtime-music-generation) with Lyria RealTime.
- Generate multi-speaker conversations with the [TTS models](https://ai.google.dev/gemini-api/docs/speech-generation).
- Discover how to generate [images](https://ai.google.dev/gemini-api/docs/image-generation) or [videos](https://ai.google.dev/gemini-api/docs/video).
- Find out how Gemini can [understand audio files](https://ai.google.dev/gemini-api/docs/audio).
- Have a real-time conversation with Gemini using the [Live API](https://ai.google.dev/gemini-api/docs/live).