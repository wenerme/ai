---
title: P-Video-Avatar
description: Pruna's P-Video-Avatar generates talking-head videos from a single portrait image driven by a text script or audio file, with multiple voices, languages, and output resolutions.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further. 

[Skip to content](#%5Ftop) 

 p 

#  P-Video-Avatar 

Image-to-Video • pruna 

`pruna/p-video-avatar` 

Pruna's P-Video-Avatar generates talking-head videos from a single portrait image driven by a text script or audio file, with multiple voices, languages, and output resolutions.

| Model Info       |                                                                                                                        |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------- |
| More information | [link ↗](https://docs.api.pruna.ai/guides/quickstart)                                                                  |
| Pricing          | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/pruna/p-video-avatar) |

## Usage

* [ TypeScript ](#tab-panel-1564)
* [ cURL ](#tab-panel-1565)

TypeScript

```
const response = await env.AI.run(  'pruna/p-video-avatar',  {    image: 'https://huggingface.co/spaces/yisol/IDM-VTON/resolve/main/example/human/00121_00.jpg',    voice_script: 'Hello, welcome to our product demo!',    voice: 'Zephyr (Female)',    resolution: '720p',  },)console.log(response)
```

Terminal window

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  --header "Content-Type: application/json" \  --data '{  "model": "pruna/p-video-avatar",  "input": {    "image": "https://huggingface.co/spaces/yisol/IDM-VTON/resolve/main/example/human/00121_00.jpg",    "voice_script": "Hello, welcome to our product demo!",    "voice": "Zephyr (Female)",    "resolution": "720p"  }}'
```

* [ Output ](#tab-panel-1562)
* [ Raw response ](#tab-panel-1563)

```
{  "state": "Completed",  "result": {    "video": "https://examples.aig.cloudflare.com/pruna/p-video-avatar/product-demo-greeting.mp4"  },  "gatewayMetadata": {    "keySource": "Unified"  }}
```

## Parameters

* [ Input ](#tab-panel-1566)
* [ Output ](#tab-panel-1567)

audio

`string`URL of uploaded audio to drive speech. HTTP(S) URL or data URI. If both audio and voice\_script are provided, audio takes priority.

disable\_prompt\_upsampling

`boolean`requireddefault: falseWhen true, skip the prompt upsampler and pass the raw user prompt.

disable\_safety\_filter

`boolean`requireddefault: trueDisable safety filter for prompts and input image.

image

`string`requiredInput portrait image (first frame). HTTP(S) URL or data URI. Supports jpg, jpeg, png, webp.

negative\_prompt

`string`requireddefault: Mention what you do NOT want in the video. Disabled if empty.

resolution

`string`requireddefault: 720penum: 720p, 1080pResolution of the video.

seed

`integer`maximum: 9007199254740991minimum: \-9007199254740991Random seed for reproducible generation.

strength\_negative\_prompt

`number`requireddefault: 0.5maximum: 4minimum: 0Strength of the negative prompt (0-4).

video\_prompt

`string`requireddefault: The person is talking.Optional prompt for the video.

voice

`string`requireddefault: Zephyr (Female)enum: Zephyr (Female), Puck (Male), Charon (Male), Kore (Female), Fenrir (Male), Leda (Female), Orus (Male), Aoede (Female), Callirrhoe (Female), Autonoe (Female), Enceladus (Male), Iapetus (Male), Umbriel (Male), Algenib (Male), Despina (Female), Erinome (Female), Laomedeia (Female), Achernar (Female), Algieba (Male), Schedar (Male), Gacrux (Female), Pulcherrima (Female), Achird (Male), Zubenelgenubi (Male), Vindemiatrix (Female), Sadachbia (Male), Sadaltager (Male), Sulafat (Female), Alnilam (Male), Rasalgethi (Male)Voice for generated speech.

voice\_language

`string`requireddefault: English (US)enum: English (US), English (UK), Spanish, French, German, Italian, Portuguese (Brazil), Japanese, Korean, HindiOutput language.

voice\_prompt

`string`requireddefault: Say the following.Optional speaking style, tone, pacing or emotion instructions.

voice\_script

`string`requireddefault: Script for the person to say when no audio is uploaded.

video

`string`format: uriPresigned URL for the generated avatar video.

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/pruna/p-video-avatar/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/pruna/p-video-avatar/schema-input.json "Download") 

Output [ ](https://developers.cloudflare.com/ai/models/pruna/p-video-avatar/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/pruna/p-video-avatar/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/pruna/p-video-avatar/#page","headline":"P-Video-Avatar (pruna) · Cloudflare AI docs · Cloudflare AI docs","description":"Pruna's P-Video-Avatar generates talking-head videos from a single portrait image driven by a text script or audio file, with multiple voices, languages, and output resolutions.","url":"https://developers.cloudflare.com/ai/models/pruna/p-video-avatar/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
