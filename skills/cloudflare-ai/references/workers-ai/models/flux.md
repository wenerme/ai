---
description: Flux is the first conversational speech recognition model built specifically for voice agents.
title: flux
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Deepgram logo](https://developers.cloudflare.com/_astro/deepgram.BYzW8KfF.svg)

# flux

Automatic Speech Recognition • Deepgram

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers-ai/models/flux/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`@cf/deepgram/flux`

* Cloudflare-hosted
* Partner
* Real-time

Flux is the first conversational speech recognition model built specifically for voice agents.

| Model Info        |                                      |
| ----------------- | ------------------------------------ |
| Terms and License | [link ↗](https://deepgram.com/terms) |
| Partner           | Yes                                  |
| Real-time         | Yes                                  |
| Unit Pricing      | $0.0077 per audio minute (websocket) |

## Parameters

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

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/models/flux/#page","headline":"flux (Deepgram) · Cloudflare AI docs · Cloudflare Workers AI docs","description":"Flux is the first conversational speech recognition model built specifically for voice agents.","url":"https://developers.cloudflare.com/workers-ai/models/flux/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
