---
title: MiniMax Music 2.6
description: MiniMax's music generation model that creates full-length songs with vocals from text prompts and lyrics, or instrumental tracks. Supports BPM/key control and auto-generated lyrics.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![MiniMax logo](https://developers.cloudflare.com/_astro/minimax.DPZX-zZI.svg) 

#  MiniMax Music 2.6 

Music Generation • MiniMax • Proxied 

`minimax/music-2.6` 

MiniMax's music generation model that creates full-length songs with vocals from text prompts and lyrics, or instrumental tracks. Supports BPM/key control and auto-generated lyrics.

| Model Info        |                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.minimaxi.com/terms)                                                                            |
| More information  | [link ↗](https://www.minimaxi.com/)                                                                                 |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/minimax/music-2.6) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'minimax/music-2.6',

  {

    prompt:

      'An upbeat electronic dance track with a catchy synth melody and driving beat',

    lyrics_optimizer: true,

    is_instrumental: false,

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

**With Lyrics**  — Generate a song with custom lyrics 

TypeScript

```

const response = await env.AI.run(

  'minimax/music-2.6',

  {

    prompt:

      'A warm acoustic folk ballad with fingerpicked guitar and gentle vocals',

    lyrics:

      'Walking down a dusty road\nWith the sunset painting gold\nEvery step a story told\nOf the places I call home',

    lyrics_optimizer: false,

    is_instrumental: false,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 

**Instrumental**  — Generate instrumental music without vocals 

TypeScript

```

const response = await env.AI.run(

  'minimax/music-2.6',

  {

    prompt:

      'A calm lo-fi hip hop instrumental with vinyl crackle and mellow piano chords',

    lyrics_optimizer: false,

    is_instrumental: true,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 

**High Quality Audio**  — Specify audio format and sample rate 

TypeScript

```

const response = await env.AI.run(

  'minimax/music-2.6',

  {

    prompt:

      'An orchestral cinematic score building to an epic crescendo with full symphony',

    sample_rate: 44100,

    format: 'wav',

    lyrics_optimizer: true,

    is_instrumental: false,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 

**Auto-Generated Lyrics**  — Let the model generate lyrics from the prompt 

TypeScript

```

const response = await env.AI.run(

  'minimax/music-2.6',

  {

    prompt: 'A cheerful pop song about a summer road trip with friends',

    lyrics_optimizer: true,

    is_instrumental: false,

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

* [ Input ](#tab-panel-202)
* [ Output ](#tab-panel-203)

prompt

`string`requiredmaxLength: 2000Description of the music style, mood, and scenario

lyrics

`string`minLength: 1maxLength: 3500Song lyrics, using \\n to separate lines

▶sample\_rate

`one of`

▶bitrate

`one of`

format

`string`enum: mp3, wavAudio format

lyrics\_optimizer

`boolean`requireddefault: falseAutomatically generate lyrics based on the prompt description

is\_instrumental

`boolean`requireddefault: falseGenerate instrumental music (no vocals)

audio

`string`format: uriURL to the generated audio file

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
