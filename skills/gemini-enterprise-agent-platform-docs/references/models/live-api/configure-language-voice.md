This document describes how to configure synthesized speech responses and
voice activity detection in Gemini Live API. You can configure responses in a
variety of HD voices and languages, and also configure voice activity
detection settings to allow users to interrupt the model.

## Set the language and voice

Native audio models like gemini-live-2.5-flash-native-audio can switch between
languages naturally during conversation. You can also restrict the languages it
speaks in by specifying it in the system instructions.

For non-native-audio models like `gemini-live-2.5-flash`, you can configure the
language in `speech_config.language_code`.

Voice is configured in the `voice_name` field for all models.

The following code sample shows you how to configure language and voice.

```python
from google.genai.types import LiveConnectConfig, SpeechConfig, VoiceConfig, PrebuiltVoiceConfig

config = LiveConnectConfig(
  response_modalities=["AUDIO"],
  speech_config=SpeechConfig(
    voice_config=VoiceConfig(
        prebuilt_voice_config=PrebuiltVoiceConfig(
            voice_name=voice_name,
        )
    ),
    language_code="en-US",
  ),
)
```

> [!TIP]
> **Tip:** For the best results when prompting and requiring the model to respond in a non-English language, include the following as part of your system instructions:
>
> ```python
> RESPOND IN LANGUAGE. YOU MUST RESPOND UNMISTAKABLY IN LANGUAGE.
>
> ```

### Voices supported

Gemini Live API supports the following 30 voice options in the
`voice_name` field:

|---|---|---|
| Zephyr -- *Bright* Kore -- *Firm* Orus -- *Firm* Autonoe -- *Bright* Umbriel -- *Easy-going* Erinome -- *Clear* Laomedeia -- *Upbeat* Schedar -- *Even* Achird -- *Friendly* Sadachbia -- *Lively* | Puck -- *Upbeat* Fenrir -- *Excitable* Aoede -- *Breezy* Enceladus -- *Breathy* Algieba -- *Smooth* Algenib -- *Gravelly* Achernar -- *Soft* Gacrux -- *Mature* Zubenelgenubi -- *Casual* Sadaltager -- *Knowledgeable* | Charon -- *Informative* Leda -- *Youthful* Callirrhoe -- *Easy-going* Iapetus -- *Clear* Despina -- *Smooth* Rasalgethi -- *Informative* Alnilam -- *Firm* Pulcherrima -- *Forward* Vindemiatrix -- *Gentle* Sulafat -- *Warm* |

### Languages supported

Gemini Live API supports the following languages:

| Language | BCP-47 Code |
|---|---|
| Arabic (Egyptian) | ar-EG |
| Bengali (Bangladesh) | bn-BD |
| Dutch (Netherlands) | nl-NL |
| English (India) | en-IN \& hi-IN bundle |
| English (US) | en-US |
| French (France) | fr-FR |
| German (Germany) | de-DE |
| Hindi (India) | hi-IN |
| Indonesian (Indonesia) | id-ID |
| Italian (Italy) | it-IT |
| Japanese (Japan) | ja-JP |
| Korean (Korea) | ko-KR |
| Marathi (India) | mr-IN |
| Polish (Poland) | pl-PL |
| Portuguese (Brazil) | pt-BR |
| Romanian (Romania) | ro-RO |
| Russian (Russia) | ru-RU |
| Spanish (US) | es-US |
| Tamil (India) | ta-IN |
| Telugu (India) | te-IN |
| Thai (Thailand) | th-TH |
| Turkish (Turkey) | tr-TR |
| Ukrainian (Ukraine) | uk-UA |
| Vietnamese (Vietnam) | vi-VN |

## Configure voice activity detection

*Voice activity detection* (VAD) allows the model to recognize when a person is
speaking. This is essential for creating natural conversations, because it
allows a user to interrupt the model at any time.

When VAD detects an interruption, the ongoing generation is canceled and
discarded. Only the information already sent to the client is retained in the
session history. The server then sends a `BidiGenerateContentServerContent`
message to report the interruption. The server then discards any pending
function calls and sends a `BidiGenerateContentServerContent` message with the
IDs of the canceled calls.

### Python

```python
config = {
    "response_modalities": ["audio"],
    "realtime_input_config": {
        "automatic_activity_detection": {
            "disabled": False, # default
            "start_of_speech_sensitivity": "low",
            "end_of_speech_sensitivity": "low",
            "prefix_padding_ms": 20,
            "silence_duration_ms": 100,
        }
    }
}

```

## What's next

- [Start and manage live sessions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/start-manage-session)
- [Send audio and video streams](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/send-audio-video-streams)
- [Using speech-to-speech translation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/speech-to-speech-translation)
- [Best practices with Gemini Live API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/best-practices)
