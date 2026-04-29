---
title: whisper-tiny-en
description: Whisper is a pre-trained model for automatic speech recognition (ASR) and speech translation. Trained on 680k hours of labelled data, Whisper models demonstrate a strong ability to generalize to many datasets and domains without the need for fine-tuning. This is the English-only version of the Whisper Tiny model which was trained on the task of speech recognition.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  whisper-tiny-en Beta 

Automatic Speech Recognition • OpenAI • Hosted 

`@cf/openai/whisper-tiny-en` 

Whisper is a pre-trained model for automatic speech recognition (ASR) and speech translation. Trained on 680k hours of labelled data, Whisper models demonstrate a strong ability to generalize to many datasets and domains without the need for fine-tuning. This is the English-only version of the Whisper Tiny model which was trained on the task of speech recognition.

| Model Info |     |
| ---------- | --- |
| Beta       | Yes |

## Usage

* [  TypeScript ](#tab-panel-2880)
* [  curl ](#tab-panel-2881)

```

export interface Env {

  AI: Ai;

}


export default {

  async fetch(request, env): Promise<Response> {

    const res = await fetch(

      "https://github.com/Azure-Samples/cognitive-services-speech-sdk/raw/master/samples/cpp/windows/console/samples/enrollment_audio_katie.wav"

    );

    const blob = await res.arrayBuffer();


    const input = {

      audio: [...new Uint8Array(blob)],

    };


    const response = await env.AI.run(

      "@cf/openai/whisper-tiny-en",

      input

    );


    return Response.json({ input: { audio: [] }, response });

  },

} satisfies ExportedHandler<Env>;


```

Explain Code

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/openai/whisper-tiny-en  \

  -X POST  \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \

  --data-binary "@talking-llama.mp3"


```

## Parameters

* [ Input ](#tab-panel-2882)
* [ Output ](#tab-panel-2883)

Option 1

stringformat: binary

▶Option 2{}

object

text

`string`The transcription

word\_count

`number`

▶words\[\]

`array`

vtt

`string`

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
