---
title: TTS 1.5 Max
description: Highest-quality text-to-speech with under 200ms latency, emotion control, and 15-language support.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![Inworld logo](https://developers.cloudflare.com/_astro/inworld.BDwMAXI2.svg) 

#  TTS 1.5 Max 

Text-to-Speech • Inworld • Proxied 

`inworld/tts-1.5-max` 

Highest-quality text-to-speech with under 200ms latency, emotion control, and 15-language support.

| Model Info        |                                                                                                                       |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://inworld.ai/terms)                                                                                    |
| More information  | [link ↗](https://inworld.ai/)                                                                                         |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/inworld/tts-1.5-max) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'inworld/tts-1.5-max',

  {

    text: 'Hello! Welcome to Cloudflare AI Gateway. Let me show you what we can do.',

    voice_id: 'Dennis',

    output_format: 'mp3',

    temperature: 1,

    timestamp_type: 'none',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 

## Examples

**Slow Narration**  — Slower speech for narration 

TypeScript

```

const response = await env.AI.run(

  'inworld/tts-1.5-max',

  {

    text: 'In the beginning, the universe was a singularity of infinite density. Then, in a fraction of a second, it expanded into everything we know today.',

    voice_id: 'Dennis',

    output_format: 'mp3',

    speaking_rate: 0.85,

    temperature: 1,

    timestamp_type: 'none',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 

**High Quality Audio**  — Higher sample rate for studio quality 

TypeScript

```

const response = await env.AI.run(

  'inworld/tts-1.5-max',

  {

    text: 'This recording is generated at studio quality for the best possible listening experience.',

    voice_id: 'Dennis',

    output_format: 'mp3',

    sample_rate: 48000,

    temperature: 1,

    timestamp_type: 'none',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 

**With Text Normalization**  — Expand numbers and abbreviations before synthesis 

TypeScript

```

const response = await env.AI.run(

  'inworld/tts-1.5-max',

  {

    text: 'The meeting is at 3:30 PM on Jan 15th, 2026. Please confirm by calling 555-0123.',

    voice_id: 'Dennis',

    output_format: 'mp3',

    temperature: 1,

    timestamp_type: 'none',

    apply_text_normalization: true,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 

## Parameters

* [ Input ](#tab-panel-220)
* [ Output ](#tab-panel-221)

text

`string`requiredmaxLength: 2000The text to be synthesized into speech. Maximum input of 2,000 characters.

voice\_id

`string`requireddefault: Dennisenum: Loretta, Darlene, Marlene, Hank, Evelyn, Celeste, Pippa, Tessa, Liam, Callum, Hamish, Abby, Graham, Rupert, Mortimer, Snik, Anjali, Saanvi, Arjun, Claire, Oliver, Simon, Elliot, James, Serena, Gareth, Vinny, Lauren, Jessica, Ethan, Tyler, Jason, Chloe, Veronica, Victoria, Miranda, Sebastian, Victor, Malcolm, Nate, Brian, Amina, Kelsey, Derek, Evan, Kayla, Jake, Grant, Tristan, Nadia, Selene, Marcus, Riley, Damon, Cedric, Mia, Naomi, Jonah, Levi, Avery, Brandon, Conrad, Bianca, Lucian, Trevor, Alex, Ashley, Craig, Deborah, Dennis, Edward, Elizabeth, Hades, Julia, Pixie, Mark, Olivia, Priya, Ronald, Sarah, Shaun, Theodore, Timothy, Wendy, Dominus, Hana, Clive, Carter, Blake, Luna, Reed, Duncan, Felix, Eleanor, SophieThe ID of the voice to use for synthesizing speech. Defaults to Dennis.

output\_format

`string`requireddefault: mp3enum: mp3, opus, wav, flacThe output format for the audio. Supported formats are mp3, opus, wav, and flac. Defaults to mp3.

bit\_rate

`integer`minimum: \-9007199254740991maximum: 9007199254740991Bits per second of the audio. Only for compressed audio formats (mp3, opus). The default is 128,000.

sample\_rate

`integer`minimum: \-9007199254740991maximum: 9007199254740991The synthesis sample rate in hertz. Accepts: 8000, 16000, 22050, 24000, 32000, 44100, 48000\. The default is 48,000.

speaking\_rate

`number`minimum: 0.5maximum: 1.5Speaking rate/speed, in the range \[0.5, 1.5\]. The default is 1.0\. We recommend using values above 0.8 to ensure high quality.

temperature

`number`requireddefault: 1minimum: 0.01maximum: 2Determines the degree of randomness when sampling audio tokens. Defaults to 1.0\. Accepts values between 0 (exclusive) and 2 (inclusive). Higher values = more expressive, lower values = more deterministic.

timestamp\_type

`string`requireddefault: noneenum: none, word, characterControls timestamp metadata returned with the audio. "word" returns word-level timing, "character" returns character-level timing. Note: adds latency. Defaults to none.

apply\_text\_normalization

`boolean`When enabled, text normalization expands numbers, dates, times, and abbreviations before converting to speech. Turning this off may reduce latency.

audio

`string`URL to the generated audio file

## API Schemas

* [ Input ](#tab-panel-218)
* [ Output ](#tab-panel-219)

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "text": {

      "description": "The text to be synthesized into speech. Maximum input of 2,000 characters.",

      "type": "string",

      "maxLength": 2000

    },

    "voice_id": {

      "description": "The ID of the voice to use for synthesizing speech. Defaults to Dennis.",

      "default": "Dennis",

      "type": "string",

      "enum": [

        "Loretta",

        "Darlene",

        "Marlene",

        "Hank",

        "Evelyn",

        "Celeste",

        "Pippa",

        "Tessa",

        "Liam",

        "Callum",

        "Hamish",

        "Abby",

        "Graham",

        "Rupert",

        "Mortimer",

        "Snik",

        "Anjali",

        "Saanvi",

        "Arjun",

        "Claire",

        "Oliver",

        "Simon",

        "Elliot",

        "James",

        "Serena",

        "Gareth",

        "Vinny",

        "Lauren",

        "Jessica",

        "Ethan",

        "Tyler",

        "Jason",

        "Chloe",

        "Veronica",

        "Victoria",

        "Miranda",

        "Sebastian",

        "Victor",

        "Malcolm",

        "Nate",

        "Brian",

        "Amina",

        "Kelsey",

        "Derek",

        "Evan",

        "Kayla",

        "Jake",

        "Grant",

        "Tristan",

        "Nadia",

        "Selene",

        "Marcus",

        "Riley",

        "Damon",

        "Cedric",

        "Mia",

        "Naomi",

        "Jonah",

        "Levi",

        "Avery",

        "Brandon",

        "Conrad",

        "Bianca",

        "Lucian",

        "Trevor",

        "Alex",

        "Ashley",

        "Craig",

        "Deborah",

        "Dennis",

        "Edward",

        "Elizabeth",

        "Hades",

        "Julia",

        "Pixie",

        "Mark",

        "Olivia",

        "Priya",

        "Ronald",

        "Sarah",

        "Shaun",

        "Theodore",

        "Timothy",

        "Wendy",

        "Dominus",

        "Hana",

        "Clive",

        "Carter",

        "Blake",

        "Luna",

        "Reed",

        "Duncan",

        "Felix",

        "Eleanor",

        "Sophie"

      ]

    },

    "output_format": {

      "description": "The output format for the audio. Supported formats are mp3, opus, wav, and flac. Defaults to mp3.",

      "default": "mp3",

      "type": "string",

      "enum": [

        "mp3",

        "opus",

        "wav",

        "flac"

      ]

    },

    "bit_rate": {

      "description": "Bits per second of the audio. Only for compressed audio formats (mp3, opus). The default is 128,000.",

      "type": "integer",

      "minimum": -9007199254740991,

      "maximum": 9007199254740991

    },

    "sample_rate": {

      "description": "The synthesis sample rate in hertz. Accepts: 8000, 16000, 22050, 24000, 32000, 44100, 48000. The default is 48,000.",

      "type": "integer",

      "minimum": -9007199254740991,

      "maximum": 9007199254740991

    },

    "speaking_rate": {

      "description": "Speaking rate/speed, in the range [0.5, 1.5]. The default is 1.0. We recommend using values above 0.8 to ensure high quality.",

      "type": "number",

      "minimum": 0.5,

      "maximum": 1.5

    },

    "temperature": {

      "description": "Determines the degree of randomness when sampling audio tokens. Defaults to 1.0. Accepts values between 0 (exclusive) and 2 (inclusive). Higher values = more expressive, lower values = more deterministic.",

      "default": 1,

      "type": "number",

      "minimum": 0.01,

      "maximum": 2

    },

    "timestamp_type": {

      "description": "Controls timestamp metadata returned with the audio. \"word\" returns word-level timing, \"character\" returns character-level timing. Note: adds latency. Defaults to none.",

      "default": "none",

      "type": "string",

      "enum": [

        "none",

        "word",

        "character"

      ]

    },

    "apply_text_normalization": {

      "description": "When enabled, text normalization expands numbers, dates, times, and abbreviations before converting to speech. Turning this off may reduce latency.",

      "type": "boolean"

    }

  },

  "required": [

    "text",

    "voice_id",

    "output_format",

    "temperature",

    "timestamp_type"

  ],

  "additionalProperties": false

}


```

Explain Code

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "audio": {

      "description": "URL to the generated audio file",

      "type": "string"

    }

  },

  "required": [

    "audio"

  ],

  "additionalProperties": false

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
