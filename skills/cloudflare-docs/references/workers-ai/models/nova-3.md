---
title: nova-3
description: Transcribe audio using Deepgram’s speech-to-text model
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Deepgram logo](https://developers.cloudflare.com/_astro/deepgram.BYzW8KfF.svg) 

#  nova-3 

Automatic Speech Recognition • Deepgram • Hosted 

`@cf/deepgram/nova-3` 

Transcribe audio using Deepgram’s speech-to-text model

| Model Info        |                                                                |
| ----------------- | -------------------------------------------------------------- |
| Terms and License | [link ↗](https://deepgram.com/terms)                           |
| Batch             | Yes                                                            |
| Partner           | Yes                                                            |
| Real-time         | Yes                                                            |
| Unit Pricing      | $0.0052 per audio minute, $0.0092 per audio minute (websocket) |

Note 

The [pricing of this model](https://developers.cloudflare.com/workers-ai/platform/pricing)is different based on transport. Transport-based pricing does not apply to all models.

* WebSocket: $0.0092 per audio minute output (836.36 neurons per audio minute output)
* Regular HTTP: $0.0052 per audio minute output (472.73 neurons per audio minute output)

## Supported languages

Nova-3 on Workers AI supports the following languages for transcription:

| Language   | Code(s)                               |
| ---------- | ------------------------------------- |
| English    | en, en-US, en-AU, en-GB, en-IN, en-NZ |
| Spanish    | es, es-419                            |
| French     | fr, fr-CA                             |
| German     | de, de-CH                             |
| Hindi      | hi                                    |
| Russian    | ru                                    |
| Portuguese | pt, pt-BR, pt-PT                      |
| Japanese   | ja                                    |
| Italian    | it                                    |
| Dutch      | nl                                    |

Use `multi` for automatic multilingual detection across all of the languages listed above.

If no language is specified, the model defaults to `en-US`. For best accuracy, explicitly set the language code matching your audio.

## Usage

* [  TypeScript ](#tab-panel-2767)
* [  curl ](#tab-panel-2768)

```

export default {

  async fetch(request, env, ctx): Promise<Response> {

    const URL = "https://URL_TO_MP3_FILE/audio.mp3";

    const mp3 = await fetch(URL);


    const resp = await env.AI.run("@cf/deepgram/nova-3", {

      "audio": {

        body: mp3.body,

        contentType: "audio/mpeg"

      },

      "detect_language": true

    }, {

      returnRawResponse: true

    });

    return resp;

  },

} satisfies ExportedHandler<Env>;


```

Explain Code

Terminal window

```

curl --request POST   --url 'https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/deepgram/nova-3?detect_language=true'   --header 'Authorization: Bearer {TOKEN}'   --header 'Content-Type: audio/mpeg'   --data-binary "@/path/to/your-mp3-file.mp3"


```

## Parameters

* [ Input ](#tab-panel-2769)
* [ Output ](#tab-panel-2770)

▶audio{}

`object`required

custom\_topic\_mode

`string`enum: extended, strictSets how the model will interpret strings submitted to the custom\_topic param. When strict, the model will only return topics submitted using the custom\_topic param. When extended, the model will return its own detected topics in addition to those submitted using the custom\_topic param.

custom\_topic

`string`Custom topics you want the model to detect within your input audio or text if present Submit up to 100

custom\_intent\_mode

`string`enum: extended, strictSets how the model will interpret intents submitted to the custom\_intent param. When strict, the model will only return intents submitted using the custom\_intent param. When extended, the model will return its own detected intents in addition those submitted using the custom\_intents param

custom\_intent

`string`Custom intents you want the model to detect within your input audio if present

detect\_entities

`boolean`Identifies and extracts key entities from content in submitted audio

detect\_language

`boolean`Identifies the dominant language spoken in submitted audio

diarize

`boolean`Recognize speaker changes. Each word in the transcript will be assigned a speaker number starting at 0

dictation

`boolean`Identify and extract key entities from content in submitted audio

encoding

`string`enum: linear16, flac, mulaw, amr-nb, amr-wb, opus, speex, g729Specify the expected encoding of your submitted audio

extra

`string`Arbitrary key-value pairs that are attached to the API response for usage in downstream processing

filler\_words

`boolean`Filler Words can help transcribe interruptions in your audio, like 'uh' and 'um'

keyterm

`string`Key term prompting can boost or suppress specialized terminology and brands.

keywords

`string`Keywords can boost or suppress specialized terminology and brands.

language

`string`The BCP-47 language tag that hints at the primary spoken language. Depending on the Model and API endpoint you choose only certain languages are available.

measurements

`boolean`Spoken measurements will be converted to their corresponding abbreviations.

mip\_opt\_out

`boolean`Opts out requests from the Deepgram Model Improvement Program. Refer to our Docs for pricing impacts before setting this to true. https://dpgr.am/deepgram-mip.

mode

`string`enum: general, medical, financeMode of operation for the model representing broad area of topic that will be talked about in the supplied audio

multichannel

`boolean`Transcribe each audio channel independently.

numerals

`boolean`Numerals converts numbers from written format to numerical format.

paragraphs

`boolean`Splits audio into paragraphs to improve transcript readability.

profanity\_filter

`boolean`Profanity Filter looks for recognized profanity and converts it to the nearest recognized non-profane word or removes it from the transcript completely.

punctuate

`boolean`Add punctuation and capitalization to the transcript.

redact

`string`Redaction removes sensitive information from your transcripts.

replace

`string`Search for terms or phrases in submitted audio and replaces them.

search

`string`Search for terms or phrases in submitted audio.

sentiment

`boolean`Recognizes the sentiment throughout a transcript or text.

smart\_format

`boolean`Apply formatting to transcript output. When set to true, additional formatting will be applied to transcripts to improve readability.

topics

`boolean`Detect topics throughout a transcript or text.

utterances

`boolean`Segments speech into meaningful semantic units.

utt\_split

`number`Seconds to wait before detecting a pause between words in submitted audio.

channels

`number`The number of channels in the submitted audio

interim\_results

`boolean`Specifies whether the streaming endpoint should provide ongoing transcription updates as more audio is received. When set to true, the endpoint sends continuous updates, meaning transcription results may evolve over time. Note: Supported only for webosockets.

endpointing

`string`Indicates how long model will wait to detect whether a speaker has finished speaking or pauses for a significant period of time. When set to a value, the streaming endpoint immediately finalizes the transcription for the processed time range and returns the transcript with a speech\_final parameter set to true. Can also be set to false to disable endpointing

vad\_events

`boolean`Indicates that speech has started. You'll begin receiving Speech Started messages upon speech starting. Note: Supported only for webosockets.

utterance\_end\_ms

`boolean`Indicates how long model will wait to send an UtteranceEnd message after a word has been transcribed. Use with interim\_results. Note: Supported only for webosockets.

▶results{}

`object`

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
