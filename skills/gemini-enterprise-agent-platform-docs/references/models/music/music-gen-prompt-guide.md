This guide provides examples of the types of music and audio soundscapes that you can create using Lyria and shows you how to modify specific parts of a prompt to produce different results.

## Prompt guide overview

To use Lyria, you must provide a prompt
on of what you want Lyria to generate.

Lyria supports the following:

- Multimodal prompts, including support for image and text inputs
- Vocal generation for songs
- Audio generation

## Safety filters

Lyria applies safety filters across Agent Platform to help ensure that generated audio doesn't contain offensive content or violate usage guidelines. For example, prompts that violate [responsible AI guidelines](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/responsible-ai) are blocked. Lyria also includes recitation checking and artist intent checks.

If you suspect abuse of Lyria or any generated output that contains inappropriate material or inaccurate information, use the [Report suspected abuse on Google Cloud form](https://support.google.com/code/contact/cloud_platform_report).

## Basics for writing prompts

Good prompts are descriptive and clear. While a list of keywords can generate great songs, to control the models with precision, use this structured framework to create your prompt:

    [Genre & style] + [Mood] + [Instrumentation] + [Tempo & rhythm] + [Vocal style & language] + [Lyrics]

- **Genre \& style:** Define the primary musical category (for example, `"cinematic orchestral fantasy"`, `"electronic dance"`, `"classical"`, `"jazz"`, `"ambient"`) and stylistic characteristics (for example, `"8-bit"`, `"cinematic"`, `"lo-fi"`).
- **Mood \& emotion:** Describe the feeling that the music should evoke (for example, `"energetic"`, `"melancholy"`, `"peaceful"`, `"tense and suspenseful"`).
- **Instrumentation:** Name the key instruments you want to hear (for example, `"piano"`, `"synthesizer"`, `"acoustic guitar"`, `"string orchestra"`, `"electronic drums"`).
- **Tempo \& rhythm:** Set the speed (for example, `"fast tempo"`, `"slow ballad"`, `"120 BPM"`) and rhythmic character (for example, `"driving beat"`, `"syncopated rhythm"`, `"gentle waltz"`).
- **Vocal style \& language:** Designate gender, vocal range (for example, `"smooth baritone"`, `"breathy soprano"`), delivery style (for example, `"rapping"`), and language.
- **Lyrics:** Either provide a theme for Lyria to generate the lyrics (for example, `"song about a cross-cultural connection"`), or provide your exact lyrics in quotes to be performed.
- (Optional) **Arrangement/Structure:** Describe how the music progresses or layers (for example, `"starts with a solo piano, then strings enter"`, `"crescendo into a powerful chorus"`). Specify `"instrumental"` in your prompt to exclude vocals completely.
- (Optional) **Soundscape/Ambiance:** Background sounds or overall sonic environment (for example, `"rain falling"`, `"city nightlife"`, `"spacious reverb"`, `"underwater feel"`).
- (Optional) **Production Quality:** Desired audio fidelity or recording style (for example, `"high-quality production"`, `"clean mix"`, `"vintage recording"`,`"raw demo feel"`).

## Examples of prompts and generated output

This section presents prompts and how the level of detail can affect the music.

### Fusion duet in English and French

This example demonstrates using several elements in your prompt. Here, it combines classical Bossa Nova and modern R\&B styles using detailed instrumentation, tempo descriptions, and vocal duets.

| Prompt | Generated output |
|---|---|
| A romantic fusion of classic Bossa Nova and modern R\&B. The mood is intimate, warm, and deeply affectionate. Features a gentle acoustic nylon-string guitar, warm electric piano chords, and a crisp, laid-back modern hip-hop drum beat. A slow, swaying tempo. Featuring a vocal duet: a smooth male vocalist singing in English, and a soft, breathy female vocalist singing in French. The lyrics are a beautiful love song about an undeniable, cross-cultural connection. | *Description: A 2-minute, 50-second song clip combining classic Bossa Nova and modern R\&B styles with a romantic male and female vocal duet singing in English and French, accompanied by warm piano chords and a laid-back hip-hop beat.* [Video](https://www.youtube.com/watch?v=WZcD6JNP2cg) |

## Manage vocals and lyrics

Lyria 3 models lets you do the following:

- **Use your own lyrics:** Type `"Lyrics:"` before the lines you want the model to sing.
- **Add backing vocals:** If you want backing singers to echo the main vocals, mention where you want the backing vocals in the prompt.
- **Ask the model to write lyrics:** To ask the model to write the lyrics for you, clearly describe the theme in your prompt (for example, ask for `"a love song"` or a `"new happy birthday song"`).

| Prompt | Generated output |
|---|---|
| A smooth, moody jazz ballad featuring piano and upright bass. The vocals should be a female singer with a breathy, soulful soprano range. The vocal pattern should start out confident but get calmer and quieter as the track progresses. Song lyrics about meeting the love of her life in New York. | [Video](https://www.youtube.com/watch?v=4Vy1PtBla1A) |

## Control voice

Define the vocal style you want in detail to get the performance you want:

- **Singer demographics and range:** Specify whether you want a male or female singer, and dictate their vocal range. For example, you can ask for `"commanding baritone vocals"` or `"clear and high soprano range"`.
- **Voice texture (timbre):** Describe the texture of the voice, you can ask for vocals that are `"gravelly,"` `"soulful,"` or `"breathy."`
- **Vocal patterns and styles:** Describe the specific vocal pattern you want to hear, such as a `"fast-paced"` or `"laid-back"` groove. You can also experiment with layering different vocal styles or having the vocals change dynamically, such as getting `"calmer and quieter as the track progresses."`
- **Language:** You can specify the language you want the vocals to be sung in. The model supports multi-vocal generation in eight languages: English, German, Spanish, French, Hindi, Japanese, Korean, and Portuguese.

| Prompt | Generated output |
|---|---|
| An upbeat, high-energy J-pop track with bright, sparkling synths, electric guitar, and a driving bassline. Featuring a clear, expressive male tenor vocal singing in Japanese. The vocal style should be fast-paced and melodic, with a sweet and highly polished texture. | [Video](https://www.youtube.com/watch?v=3f672vKu2-w) |

## Advanced creative workflows

The following sections showcase advanced workflows, demonstrating how to use structured prompting techniques to direct the exact composition and evolution of your generated audio.

### Workflow 1: Timestamp prompting

Timestamp prompting is ideal for creating dynamic genre shifts or scoring video content by assigning specific actions to timed segments within the song structure.

#### Timeline sequence prompting (Pro models)

You can design multi-scene music structures by formatting timed segments with `[mm:ss]` indicators.

| Prompt | Generated output |
|---|---|
| `[00:00]` Begin immediately with a massive gospel choir singing a powerful, uplifting harmony about being kind to yourself. `[00:15]` A heavy, modern hip-hop drum beat and a deep 808 bassline drop in, matching the energy of the choir. `[00:30]` A male lead vocalist begins rapping a confident verse about overcoming life's challenges, while the large choir punctuates his lines in the background. `[01:10]` Transition into a huge, triumphant chorus celebrating victory and winning. The gospel choir sings at full volume, layering rich, soulful harmonies over the driving hip-hop beat and triumphant brass horns. `[01:50]` The beat strips back to just a gentle Hammond B3 organ. The rapper delivers a quiet, emotional bridge about giving yourself grace, supported by soft, warm hums from the massive choir. `[02:10]` The full hip-hop beat and the giant choir return at maximum energy for an uplifting final chorus, before ending on a resonant, sustained choir chord at `[03:00]`. | [Video](https://www.youtube.com/watch?v=HcrSjLdX5Eg) |

### Workflow 2: Multimodal generation

Lyria models allow you to upload up to 10 reference images or PDFs to establish the emotional baseline and visual storytelling baseline for the generated track.

| Prompt | Generated output |
|---|---|
| A deeply emotional, modern Bollywood song in English. The lyrics and mood should match the story in the images attached. | [Video](https://www.youtube.com/watch?v=hvnZwS9f6G0) |

## Negative prompts

Negative prompts help specify elements to exclude from the music. Describe what
you want to discourage the model from generating.

- The API parameter is `negative_prompt`.

- List elements to exclude, for example, `negative_prompt: "vocals, excessive
  cymbal crashes, distorted guitar"`.

| Prompt Scenario | Generated output |
|---|---|
| Prompt: "A warm, modern lofi hip-hop beat for studying, featuring a muffled drum break and dusty jazz piano samples. Instrumental." *(Without negative prompt)* | *Description: The hip-hop instrumental is generally calm, but might include some unexpected louder dynamics or complex runs that could be distracting for study.* |
| Prompt: "A warm, modern lofi hip-hop beat for studying, featuring a muffled drum break and dusty jazz piano samples. Instrumental." Negative Prompt: "complex melodies, loud dynamics, sudden changes, drums, vocals" | *Description: The resulting hip-hop instrumental is consistently calm and simple. The mood is more even and suitable for background focus.* [Video](https://www.youtube.com/watch?v=2L9hL8jG7Qs) |

## More tips for writing prompts

The following tips help you write effective prompts for Lyria:

- **Be descriptive and specific:** Use adjectives and adverbs to paint a clear
  sonic picture. The more detail, the better Lyria can
  understand your intent.

- **Reference genres, moods, and styles:** Clearly state the musical category and the feeling you want to evoke, and any stylistic characteristics.

- **Specify key instruments and rhythms:** Mention important instruments and
  describe the pace and rhythmic feel you want.

- **Iterate and experiment:** If the first result isn't perfect, modify your
  prompt by adding, removing, or changing keywords. See [Introduction to
  prompting](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/prompts/introduction-prompt-design) for
  general strategies.

## Detailed structure

You can provide detailed prompts that describe the structure of a song to guide
the music over multiple parts.

The following are parameters that you can use to generate detailed music
structures:

- **Timestamps** : Provide timestamps in `[mm:ss - mm:ss]` format to dictate
  events in a piece.

- **Song key** : Describe the key that a segment of a song is set in. For
  example, **A major**.

- **Beat rate** : Describe the desired beats per minute. For example, **150
  BPM**.

- **Intensity** : Describe the intensity of a song segment. For example,
  **Intensity: 1/10 (Very low)**.

The following is an example of a prompt with detailed structure to create a
multi-part song:

    Create a 60-second instrumental track at 80 BPM. The feeling is nostalgic,
    introspective, and atmospheric - a warm, comforting melancholy with a soft,
    minor-key feel. The sound should be centered around a warm, slightly overdriven
    Fender Rhodes and soft, ethereal synth pads. The rhythm is a minimalist,
    laid-back drum beat with a relaxed, human feel. Weave subtle atmospheric
    textures, like soft static or room tone, through the entire track for texture.

    [0:00 - 0:12] Intro: Begin atmospherically with just the Fender Rhodes
    playing soft, hazy chords. Drench it in warm reverb and introduce a light
    atmospheric texture. The mood is like a memory coming into focus. Intensity:
    1/10 (Very Low)

    [0:12 - 0:24] Verse 1: The laid-back drum beat enters with a simple kick and
    snare. A soft, ethereal synth pad swells in the background. A clean, subtle
    sub-bass joins, adding depth. The Rhodes melody becomes slightly more defined,
    following a simple, melancholic progression. Intensity: 3/10 (Low)

    [0:24 - 0:36] Build: The groove deepens as a gentle, syncopated hi-hat is added.
    A simple, memorable lead melody appears, played on a warm, rounded synth. This
    section should feel like the gentle peak of the track's focus, with a chord
    progression that builds a sense of hopeful tension. Intensity: 5/10 (Medium)

    [0:36 - 0:48] Chorus: Gracefully pull back the intensity. The synth lead melody
    fades out, returning focus to the core Rhodes groove and the drums. This gives
    the track space to breathe, resolving the tension from the build. Intensity:
    4/10 (Medium-Low)

    [0:48 - 1:00] Outro: The drums and bass drop out completely. The track fades out
    leaving only the Rhodes playing spacious chords, the lingering synth pad, and
    the persistent atmospheric texture. Intensity: 2/10 (Very Low)
