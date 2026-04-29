---
title: flux
description: Flux is the first conversational speech recognition model built specifically for voice agents.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Deepgram logo](https://developers.cloudflare.com/_astro/deepgram.BYzW8KfF.svg) 

#  flux 

Automatic Speech Recognition • Deepgram • Hosted 

`@cf/deepgram/flux` 

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

Explain Code

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

Explain Code

## Parameters

* [ Input ](#tab-panel-2525)
* [ Output ](#tab-panel-2526)

encoding

`string`requiredenum: linear16Encoding of the audio stream. Currently only supports raw signed little-endian 16-bit PCM.

sample\_rate

`string`requiredpattern: ^\[0-9\]+$Sample rate of the audio stream in Hz.

eager\_eot\_threshold

`string`End-of-turn confidence required to fire an eager end-of-turn event. When set, enables EagerEndOfTurn and TurnResumed events. Valid Values 0.3 - 0.9.

eot\_threshold

`string`default: 0.7End-of-turn confidence required to finish a turn. Valid Values 0.5 - 0.9.

eot\_timeout\_ms

`string`default: 5000pattern: ^\[0-9\]+$A turn will be finished when this much time has passed after speech, regardless of EOT confidence.

keyterm

`string`Keyterm prompting can improve recognition of specialized terminology. Pass multiple keyterm query parameters to boost multiple keyterms.

mip\_opt\_out

`string`default: falseenum: true, falseOpts out requests from the Deepgram Model Improvement Program. Refer to Deepgram Docs for pricing impacts before setting this to true. https://dpgr.am/deepgram-mip

tag

`string`Label your requests for the purpose of identification during usage reporting

request\_id

`string`The unique identifier of the request (uuid)

sequence\_id

`integer`minimum: 0Starts at 0 and increments for each message the server sends to the client.

event

`string`enum: Update, StartOfTurn, EagerEndOfTurn, TurnResumed, EndOfTurnThe type of event being reported.

turn\_index

`integer`minimum: 0The index of the current turn

audio\_window\_start

`number`Start time in seconds of the audio range that was transcribed

audio\_window\_end

`number`End time in seconds of the audio range that was transcribed

transcript

`string`Text that was said over the course of the current turn

▶words\[\]

`array`The words in the transcript

end\_of\_turn\_confidence

`number`Confidence that no more speech is coming in this turn

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
