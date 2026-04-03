---
title: flux
description: Flux is the first conversational speech recognition model built specifically for voice agents.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![Deepgram logo](https://developers.cloudflare.com/_astro/deepgram.DVGPhlbc.svg) 

#  flux 

Automatic Speech Recognition • Deepgram 

@cf/deepgram/flux 

Flux is the first conversational speech recognition model built specifically for voice agents.

| Model Info        |                                      |
| ----------------- | ------------------------------------ |
| Terms and License | [link ↗](https://deepgram.com/terms) |
| Partner           | Yes                                  |
| Real-time         | Yes                                  |
| Unit Pricing      | $0.0077 per audio minute (websocket) |

## Usage

Step 1: Create a Worker that establishes a WebSocket connection

TypeScript

```

export default {

  async fetch(request, env, ctx): Promise<Response> {

    const resp = await env.AI.run("@cf/deepgram/flux", {

      encoding: "linear16",

      sample_rate: "16000"

    }, {

      websocket: true

    });

    return resp;

  },

} satisfies ExportedHandler<Env>;


```

Step 2: Deploy your Worker

Terminal window

```

npx wrangler deploy


```

Step 3: Write a client script to connect to your Worker and send audio

JavaScript

```

const ws = new WebSocket('wss://<your-worker-url.com>');


ws.onopen = () => {

  console.log('Connected to WebSocket');


  // Generate and send random audio bytes

  // You can replace this part with a function

  // that reads from your mic or other audio source

  const audioData = generateRandomAudio();

  ws.send(audioData);

  console.log('Audio data sent');

};


ws.onmessage = (event) => {

  // Transcription will be received here

  // Add your custom logic to parse the data

  console.log('Received:', event.data);

};


ws.onerror = (error) => {

  console.error('WebSocket error:', error);

};


ws.onclose = () => {

  console.log('WebSocket closed');

};


// Generate random audio data (1 second of noise at 44.1kHz, mono)

function generateRandomAudio() {

  const sampleRate = 44100;

  const duration = 1;

  const numSamples = sampleRate * duration;

  const buffer = new ArrayBuffer(numSamples * 2);

  const view = new Int16Array(buffer);


  for (let i = 0; i < numSamples; i++) {

    view[i] = Math.floor(Math.random() * 65536 - 32768);

  }


  return buffer;

}


```

## Parameters

\* indicates a required field

### Input

* `encoding` ` string ` required  
Encoding of the audio stream. Currently only supports raw signed little-endian 16-bit PCM.
* `sample_rate` ` string ` required  
Sample rate of the audio stream in Hz.
* `eager_eot_threshold` ` string `  
End-of-turn confidence required to fire an eager end-of-turn event. When set, enables EagerEndOfTurn and TurnResumed events. Valid Values 0.3 - 0.9.
* `eot_threshold` ` string ` default 0.7  
End-of-turn confidence required to finish a turn. Valid Values 0.5 - 0.9.
* `eot_timeout_ms` ` string ` default 5000  
A turn will be finished when this much time has passed after speech, regardless of EOT confidence.
* `keyterm` ` string `  
Keyterm prompting can improve recognition of specialized terminology. Pass multiple keyterm query parameters to boost multiple keyterms.
* `mip_opt_out` ` string ` default false  
Opts out requests from the Deepgram Model Improvement Program. Refer to Deepgram Docs for pricing impacts before setting this to true. https://dpgr.am/deepgram-mip
* `tag` ` string `  
Label your requests for the purpose of identification during usage reporting

### Output

* `request_id` ` string `  
The unique identifier of the request (uuid)
* `sequence_id` ` integer ` min 0  
Starts at 0 and increments for each message the server sends to the client.
* `event` ` string `  
The type of event being reported.
* `turn_index` ` integer ` min 0  
The index of the current turn
* `audio_window_start` ` number `  
Start time in seconds of the audio range that was transcribed
* `audio_window_end` ` number `  
End time in seconds of the audio range that was transcribed
* `transcript` ` string `  
Text that was said over the course of the current turn
* `words` ` array `  
The words in the transcript  
   * `items` ` object `  
         * `word` ` string ` required  
         The individual punctuated, properly-cased word from the transcript  
         * `confidence` ` number ` required  
         Confidence that this word was transcribed correctly
* `end_of_turn_confidence` ` number `  
Confidence that no more speech is coming in this turn

## API Schemas

The following schemas are based on JSON Schema

* [ Input ](#tab-panel-1711)
* [ Output ](#tab-panel-1712)

```

{

    "type": "object",

    "properties": {

        "encoding": {

            "type": "string",

            "description": "Encoding of the audio stream. Currently only supports raw signed little-endian 16-bit PCM.",

            "enum": [

                "linear16"

            ]

        },

        "sample_rate": {

            "type": "string",

            "description": "Sample rate of the audio stream in Hz.",

            "pattern": "^[0-9]+$"

        },

        "eager_eot_threshold": {

            "type": "string",

            "description": "End-of-turn confidence required to fire an eager end-of-turn event. When set, enables EagerEndOfTurn and TurnResumed events. Valid Values 0.3 - 0.9."

        },

        "eot_threshold": {

            "type": "string",

            "description": "End-of-turn confidence required to finish a turn. Valid Values 0.5 - 0.9.",

            "default": "0.7"

        },

        "eot_timeout_ms": {

            "type": "string",

            "description": "A turn will be finished when this much time has passed after speech, regardless of EOT confidence.",

            "default": "5000",

            "pattern": "^[0-9]+$"

        },

        "keyterm": {

            "type": "string",

            "description": "Keyterm prompting can improve recognition of specialized terminology. Pass multiple keyterm query parameters to boost multiple keyterms."

        },

        "mip_opt_out": {

            "type": "string",

            "description": "Opts out requests from the Deepgram Model Improvement Program. Refer to Deepgram Docs for pricing impacts before setting this to true. https://dpgr.am/deepgram-mip",

            "enum": [

                "true",

                "false"

            ],

            "default": "false"

        },

        "tag": {

            "type": "string",

            "description": "Label your requests for the purpose of identification during usage reporting"

        }

    },

    "required": [

        "sample_rate",

        "encoding"

    ]

}


```

```

{

    "type": "object",

    "description": "Output will be returned as websocket messages.",

    "properties": {

        "request_id": {

            "type": "string",

            "description": "The unique identifier of the request (uuid)"

        },

        "sequence_id": {

            "type": "integer",

            "description": "Starts at 0 and increments for each message the server sends to the client.",

            "minimum": 0

        },

        "event": {

            "type": "string",

            "description": "The type of event being reported.",

            "enum": [

                "Update",

                "StartOfTurn",

                "EagerEndOfTurn",

                "TurnResumed",

                "EndOfTurn"

            ]

        },

        "turn_index": {

            "type": "integer",

            "description": "The index of the current turn",

            "minimum": 0

        },

        "audio_window_start": {

            "type": "number",

            "description": "Start time in seconds of the audio range that was transcribed"

        },

        "audio_window_end": {

            "type": "number",

            "description": "End time in seconds of the audio range that was transcribed"

        },

        "transcript": {

            "type": "string",

            "description": "Text that was said over the course of the current turn"

        },

        "words": {

            "type": "array",

            "description": "The words in the transcript",

            "items": {

                "type": "object",

                "required": [

                    "word",

                    "confidence"

                ],

                "properties": {

                    "word": {

                        "type": "string",

                        "description": "The individual punctuated, properly-cased word from the transcript"

                    },

                    "confidence": {

                        "type": "number",

                        "description": "Confidence that this word was transcribed correctly"

                    }

                }

            }

        },

        "end_of_turn_confidence": {

            "type": "number",

            "description": "Confidence that no more speech is coming in this turn"

        }

    }

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
