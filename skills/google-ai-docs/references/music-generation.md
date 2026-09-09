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

Your prompt can be as simple as "a folk song about cute cats avoiding puddles,
female vocals and the noise of rain", or something detailed and structured
like:
> A 1980s-style synth-pop track with a driving beat, shimmering synthesizers,
> and a catchy, anthemic chorus. The song should have a retro-futuristic feel,
> reminiscent of classic 80s pop hits, with a modern production polish. The
> tempo should be upbeat and danceable, around 120 BPM, with a clear
> verse-chorus structure and a memorable instrumental hook. The lyrics are about
> the feeling of getting ready for a party.

Both simple and complex prompts can give you good outputs. Experiment with
these tips to find what works best for you.

### Genre

Lead your prompt with the genre of music you want, such as hip hop, rock, and
rap. You can specify a mix of genres:

- A fusion of metal and rap
- A combination of death metal and opera
- A classical piece with electronic drone elements
- Modern electronic dance music (EDM) mixed with Europop

You can also incorporate an era:

- Early 90s hip-hop
- 60s French ye-ye pop
- 80s electronic experimentation
- 2000s mainstream pop

If you prompt for bespoke genres or regional variants, like "Berlin techno" or
"Bay area hyphy", the model will attempt to capture that essence, but it may
not always get it right.

### Instruments

By default Lyria 3.5 will make songs with the instruments and tools you'd
expect for the genre. You don't need to be prescriptive.

However, a dance track isn't going to include a saxophone unless you ask for
it. So if you want a saxophone solo, you need to prompt it:
> A dance track with a driving beat, shimmering synthesizers, and a catchy,
> anthemic chorus. A saxophone solo should come in during the bridge.

Your prompt can include specific instruments, how they sound, and how they
interact with each other. You can use this combination to create certain moods
or textures:

- A dirty, distorted bassline fighting against clean, crisp hi-hats
- Warm, analog synthesizer pads swelling underneath a dry, intimate acoustic guitar
- A wall of sound created by multiple layers of fuzzy guitars, with buried, distant vocals

### Song structure

You can outline the progression of a song in your prompt. Use arrows or a list
to define the flow:

- `[Intro]` -\> `[Verse 1]` -\> `[Chorus]` -\> `[Verse 2]` -\> `[Chorus]` -\> `[Bridge]` -\> `[Outro]`
- Start with a quiet piano intro, build into a loud verse, drop into a silence, then explode into the chorus.

You can also specify how energy levels change between these sections:

- Build tension in the pre-chorus, then drop to silence before a massive, explosive chorus
- Gradual crescendo throughout the song, adding one instrument at a time until a chaotic wall of sound
- Sudden stop after the bridge, followed by an acapella chorus

You can also prompt the exact time you want something to happen:

- Build to a drop at 12s
- Someone says "what" every 2 seconds
- The chorus kicks in at 22s

### Lyrics

Vocals and lyrics are generated by default. You can provide your own lyrics,
ask for no lyrics (or an instrumental), or steer the lyric generation in the
direction you want.

Your lyrics will be in the language you write your prompt in. You can also ask
for lyrics to be in another language, like "Write the lyrics in French".

#### Using your own lyrics

To give the model your own lyrics, include them in the prompt with a "Lyrics:"
prefix:

    Lyrics:

    [Intro]
    Oooh, oooh

    [Verse 1]
    Let's go
    Let's go
    Go with the flow

    [Chorus]
    ...

You can prefix parts of the song with section titles like `[Intro]`,
`[Verse 1]`, `[Pre-chorus]`, `[Chorus]` and `[Outro]`.

If you want a word or line to be repeated, like an echo or by backing singers,
you can include it in parentheses: "Let's go (go)".

#### Prompting the model to write lyrics

If you want Lyria 3.5 to make lyrics for you, it's best to include details
of what the lyrics will be about in your prompt. Otherwise the model needs to
infer a subject from your music prompt, and it may not be what you want.
> The lyrics are about lost love and the pain of heartbreak. The singer is
> reminiscing about a past relationship and the memories that come flooding
> back.

If you want a repeating chorus, it helps to ask for one in your prompt:
> The lyrics are about lost love and the pain of heartbreak. The singer is
> reminiscing about a past relationship and the memories that come flooding
> back. A powerful chorus focuses on getting over the pain and moving on.

Lyria 3.5 will automatically steer the structure of the lyrics towards the
type of music you're requesting, but you can re-emphasize this in your prompt
too. For example:
> An EDM track that repeats the same energetic phrase over and over again.

You can also prompt for vocal effects that aren't strictly lyrics, for example:

- A repeating sample from a movie says "I can't believe this!" throughout the song
- A high energy techno track, right before the drop the sound all stops and a little voice says "I don't know what I'm doing here", then the music drops.
- The track opens with a conversation about the movies in the 90s being better than today. Then the track segues into a pop song.

### Vocals

You can prompt for how you want the lyrics to be delivered. For the best
results, specify a detailed singer profile covering gender, timbre, and vocal
range.

- **Female Soprano**: Clear, crystalline timbre with an agile, soaring quality. Capable of hitting whistly high notes with an airy, breathy texture.
- **Female Alto**: Rich, warm, and husky lower range. Smoky timbre with a touch of vocal fry, soulful and resonant.
- **Male Tenor**: Bright, piercing, and energetic. Youthful timbre with a slight nasal edge, cutting through the mix with high belting power.
- **Male Baritone**: Deep, chocolatey, and velvet-smooth. Resonant chest voice with a soothing, crooning delivery.
- **Weathered Rocker (Male)**: Raspy and textured with a gravelly timbre, reminiscent of 90s grunge. Strained upper range for emotional intensity.

### Other prompt parameters

You can also include these parameters to further refine your prompt:

- **BPM**: Set the tempo (e.g., "120 BPM", "slow tempo around 70 BPM").
- **Key/Scale**: Specify a musical key (e.g., "in G major", "D minor").
- **Mood and atmosphere**: Use descriptive adjectives (e.g., "nostalgic", "aggressive", "ethereal", "dreamy").
- **Duration**: The Clip model always produces 30-second clips. For the Pro model, specify the desired length in your prompt (e.g., "create a 2-minute song") or use timestamps to control duration.

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