---
title: Inworld TTS 1.5 Mini
description: Ultra-fast, cost-efficient text-to-speech with approximately 120ms latency and 15-language support.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Inworld logo](https://developers.cloudflare.com/_astro/inworld.BDwMAXI2.svg) 

#  Inworld TTS 1.5 Mini 

Text-to-Speech • Inworld • Proxied 

`inworld/tts-1.5-mini` 

Ultra-fast, cost-efficient text-to-speech with approximately 120ms latency and 15-language support.

| Model Info        |                                                                                                                        |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://inworld.ai/terms)                                                                                     |
| More information  | [link ↗](https://inworld.ai/)                                                                                          |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/inworld/tts-1.5-mini) |

## Usage

* [ TypeScript ](#tab-panel-704)
* [ cURL ](#tab-panel-705)

TypeScript

```

const response = await env.AI.run(

  'inworld/tts-1.5-mini',

  {

    output_format: 'mp3',

    temperature: 1,

    text: 'Hello! Welcome to Cloudflare AI Gateway. Let me show you what we can do.',

    timestamp_type: 'none',

    voice_id: 'Dennis',

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "inworld/tts-1.5-mini",

  "input": {

    "output_format": "mp3",

    "temperature": 1,

    "text": "Hello! Welcome to Cloudflare AI Gateway. Let me show you what we can do.",

    "timestamp_type": "none",

    "voice_id": "Dennis"

  }

}'


```

* [ Output ](#tab-panel-700)
* [ Raw response ](#tab-panel-701)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/inworld__tts-1.5-mini/simple-speech.mp3"

  },

  "state": "Completed"

}


```

## Examples

**Fast Speech**  — Speed up speech for quick playback 

* [ TypeScript ](#tab-panel-708)
* [ cURL ](#tab-panel-709)

TypeScript

```

const response = await env.AI.run(

  'inworld/tts-1.5-mini',

  {

    output_format: 'mp3',

    speaking_rate: 1.4,

    temperature: 1,

    text: 'This is a fast-paced summary of the key findings from the quarterly report. Revenue is up fifteen percent and user growth exceeded expectations.',

    timestamp_type: 'none',

    voice_id: 'Dennis',

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "inworld/tts-1.5-mini",

  "input": {

    "output_format": "mp3",

    "speaking_rate": 1.4,

    "temperature": 1,

    "text": "This is a fast-paced summary of the key findings from the quarterly report. Revenue is up fifteen percent and user growth exceeded expectations.",

    "timestamp_type": "none",

    "voice_id": "Dennis"

  }

}'


```

* [ Output ](#tab-panel-702)
* [ Raw response ](#tab-panel-703)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/inworld__tts-1.5-mini/fast-speech.mp3"

  },

  "state": "Completed"

}


```

**Low Latency**  — Minimize latency by disabling text normalization 

* [ TypeScript ](#tab-panel-710)
* [ cURL ](#tab-panel-711)

TypeScript

```

const response = await env.AI.run(

  'inworld/tts-1.5-mini',

  {

    apply_text_normalization: false,

    output_format: 'mp3',

    temperature: 1,

    text: 'Quick response needed. The server is ready.',

    timestamp_type: 'none',

    voice_id: 'Dennis',

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "inworld/tts-1.5-mini",

  "input": {

    "apply_text_normalization": false,

    "output_format": "mp3",

    "temperature": 1,

    "text": "Quick response needed. The server is ready.",

    "timestamp_type": "none",

    "voice_id": "Dennis"

  }

}'


```

* [ Output ](#tab-panel-706)
* [ Raw response ](#tab-panel-707)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/inworld__tts-1.5-mini/low-latency.mp3"

  },

  "state": "Completed"

}


```

## Parameters

* [ Input ](#tab-panel-712)
* [ Output ](#tab-panel-713)

apply\_text\_normalization

`boolean`When enabled, text normalization expands numbers, dates, times, and abbreviations before converting to speech. Turning this off may reduce latency.

bit\_rate

`integer`maximum: 9007199254740991minimum: \-9007199254740991Bits per second of the audio. Only for compressed audio formats (mp3, opus). The default is 128,000.

output\_format

`string`requireddefault: mp3enum: mp3, opus, wav, flacThe output format for the audio. Supported formats are mp3, opus, wav, and flac. Defaults to mp3.

sample\_rate

`integer`maximum: 9007199254740991minimum: \-9007199254740991The synthesis sample rate in hertz. Accepts: 8000, 16000, 22050, 24000, 32000, 44100, 48000\. The default is 48,000.

speaking\_rate

`number`maximum: 1.5minimum: 0.5Speaking rate/speed, in the range \[0.5, 1.5\]. The default is 1.0\. We recommend using values above 0.8 to ensure high quality.

temperature

`number`requireddefault: 1maximum: 2minimum: 0.01Determines the degree of randomness when sampling audio tokens. Defaults to 1.0\. Accepts values between 0 (exclusive) and 2 (inclusive). Higher values = more expressive, lower values = more deterministic.

text

`string`requiredmaxLength: 2000The text to be synthesized into speech. Maximum input of 2,000 characters.

timestamp\_type

`string`requireddefault: noneenum: none, word, characterControls timestamp metadata returned with the audio. "word" returns word-level timing, "character" returns character-level timing. Note: adds latency. Defaults to none.

voice\_id

`string`requireddefault: Dennisenum: Loretta, Darlene, Marlene, Hank, Evelyn, Celeste, Pippa, Tessa, Liam, Callum, Hamish, Abby, Graham, Rupert, Mortimer, Snik, Anjali, Saanvi, Arjun, Claire, Oliver, Simon, Elliot, James, Serena, Gareth, Vinny, Lauren, Jessica, Ethan, Tyler, Jason, Chloe, Veronica, Victoria, Miranda, Sebastian, Victor, Malcolm, Nate, Brian, Amina, Kelsey, Derek, Evan, Kayla, Jake, Grant, Tristan, Nadia, Selene, Marcus, Riley, Damon, Cedric, Mia, Naomi, Jonah, Levi, Avery, Brandon, Conrad, Bianca, Lucian, Trevor, Alex, Ashley, Craig, Deborah, Dennis, Edward, Elizabeth, Hades, Julia, Pixie, Mark, Olivia, Priya, Ronald, Sarah, Shaun, Theodore, Timothy, Wendy, Dominus, Hana, Clive, Carter, Blake, Luna, Reed, Duncan, Felix, Eleanor, SophieThe ID of the voice to use for synthesizing speech. Defaults to Dennis.

audio

`string`URL to the generated audio file

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
