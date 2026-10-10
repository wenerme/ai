---
description: Clef-omni is a multimodal decision model built on a 30B-parameter mixture-of-experts (3B active) backbone. It turns a state and a schema of typed questions into decisions, reads the state as text, JSON, images, audio, or video, and returns a probability for every allowed option of every question.
title: clef-omni
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Cloudflare logo](https://developers.cloudflare.com/_astro/cloudflare.DP8rkHys.svg)

# clef-omni

Text Generation • Cloudflare

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/%40cf/cloudflare/clef-omni/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`@cf/cloudflare/clef-omni`

- Cloudflare-hosted
- Vision

Clef-omni is a multimodal decision model built on a 30B-parameter mixture-of-experts (3B active) backbone. It turns a state and a schema of typed questions into decisions, reads the state as text, JSON, images, audio, or video, and returns a probability for every allowed option of every question.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 64,000 tokens |
| Terms and License | [link ↗](https://huggingface.co/Cloudflare/clef-omni/blob/main/LICENSE) |
| More information | [link ↗](https://huggingface.co/Cloudflare/clef-omni) |
| Vision | Yes |
| Unit Pricing | $0.15 per M input tokens |

How media inputs are billed

Clef models convert media inputs to input tokens and bill them at the model's input token rate. Clef models do not charge for output tokens. For per-model rates, refer to [pricing](https://developers.cloudflare.com/workers-ai/platform/pricing/).

Images are tokenized as follows:

1. **Resize**: The image keeps its aspect ratio, but:
   - Each side is rounded to a multiple of 32 pixels.
   - If the area is under about 65,000 pixels (256x256), it is scaled up to reach that.
   - If the area is over about 1 megapixel, it is scaled down to fit.
2. **Count patches**: Each 32x32-pixel block is one token: `tokens = (width / 32) x (height / 32)`.
3. **Add markers**: 3 tokens are added to mark where the image starts and ends.

Each image is capped at 1,024 tokens.

Audio and video are tokenized by duration:

- **Audio**: about 780 tokens per minute.
- **Video**: up to about 15,400 tokens per minute at maximum resolution, plus about 780 tokens per minute if the video has sound. A 480p clip uses about 8,600 frame tokens per minute (144 tokens per second).

Each request accepts up to 4 audio clips and 2 videos.

Media tokens count toward the model's context window, together with the questions. If they exceed the context window, the request fails. Otherwise, the text `state` is truncated to fit the remaining space.

## Usage

```ts
export interface Env {
	AI: Ai;
}

export default {
	async fetch(request, env): Promise<Response> {
		const response = await env.AI.run("@cf/cloudflare/clef-omni", {
			model: "clef-omni",
			state: "Checkout has been failing for every customer for the last hour.",
			questions: {
				urgent: {
					type: "noul",
					instructions: "Is this support request urgent?",
				},
				team: {
					type: "choice",
					instructions: "Which team should handle this request?",
					criteria: {
						billing: "Payments, invoices, and refunds",
						technical: "Outages, errors, and configuration",
						sales: "Plans and upgrades",
					},
				},
				severity: {
					type: "score",
					instructions: "How severe is the customer impact?",
					criteria: ["No impact", "Minor", "Major", "Critical"],
				},
			},
		});

		// response.answers.urgent   -> probability the request is urgent
		// response.answers.team     -> chosen team with per-option probabilities
		// response.answers.severity -> probability-weighted score (0 = lowest level)
		return Response.json(response);
	},
} satisfies ExportedHandler<Env>;
```

```py
import os
import requests

ACCOUNT_ID = "your-account-id"
AUTH_TOKEN = os.environ.get("CLOUDFLARE_AUTH_TOKEN")

response = requests.post(
    f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/cloudflare/clef-omni",
    headers={"Authorization": f"Bearer {AUTH_TOKEN}"},
    json={
        "model": "clef-omni",
        "state": "Checkout has been failing for every customer for the last hour.",
        "questions": {
            "urgent": {
                "type": "noul",
                "instructions": "Is this support request urgent?",
            },
            "team": {
                "type": "choice",
                "instructions": "Which team should handle this request?",
                "criteria": {
                    "billing": "Payments, invoices, and refunds",
                    "technical": "Outages, errors, and configuration",
                    "sales": "Plans and upgrades",
                },
            },
            "severity": {
                "type": "score",
                "instructions": "How severe is the customer impact?",
                "criteria": ["No impact", "Minor", "Major", "Critical"],
            },
        },
    },
)
print(response.json())
```

```sh
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/cloudflare/clef-omni \
  -X POST \
  -H "Authorization: Bearer $CLOUDFLARE_AUTH_TOKEN" \
  -d '{
    "model": "clef-omni",
    "state": "Checkout has been failing for every customer for the last hour.",
    "questions": {
      "urgent": { "type": "noul", "instructions": "Is this support request urgent?" },
      "team": {
        "type": "choice",
        "instructions": "Which team should handle this request?",
        "criteria": {
          "billing": "Payments, invoices, and refunds",
          "technical": "Outages, errors, and configuration",
          "sales": "Plans and upgrades"
        }
      },
      "severity": {
        "type": "score",
        "instructions": "How severe is the customer impact?",
        "criteria": ["No impact", "Minor", "Major", "Critical"]
      }
    }
  }'
```

## Parameters

model

`string`requireddefault: clef-omnipattern: ^\\s\*clef-omni\\s\*$Required. The model selector: "clef-omni" for @cf/cloudflare/clef-omni.

state

requiredRequired. The content to evaluate: a string, or structured data (object/array) such as records, chat logs, or application state. Long text state is truncated to fit the model's token limit.

▶questions{}

`object`requiredminProperties: 1maxProperties: 64Map of question id to a typed question (noul, choice, or score). 1 to 64 questions; ids may use letters, digits, '\_', '.', '-' (max 100 chars). Answers are returned under the same ids.

▶images\[]

`array`maxItems: 4Clef extension to the System One API. Optional embedded PNG, JPEG, or WebP images placed before the state (max 4; 4 MiB and 16 megapixels each, 8 MiB total decoded). Each image costs 64 to 1,024 input tokens. Remote URLs are not accepted.

▶audio\[]

`array`maxItems: 4Clef-Omni extension. Optional embedded audio clips (max 4; 8 MiB and 300 seconds each). Audio and video clips together may total at most 16 MiB decoded. Remote URLs are not accepted.

▶videos\[]

`array`maxItems: 2Clef-Omni extension. Optional embedded videos (max 2; 16 MiB and 60 seconds each), sampled at 2 frames per second. A video's soundtrack is heard with its frames when every video in the request has one. Audio and video clips together may total at most 16 MiB decoded. Each second of video costs up to 256 input tokens. Remote URLs are not accepted.

model

`string`The model that performed the evaluation.

▶answers{}

`object`One answer per question, keyed by the question ids from the request.

▶usage{}

`object`

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/@cf/cloudflare/clef-omni/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/@cf/cloudflare/clef-omni/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/@cf/cloudflare/clef-omni/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/@cf/cloudflare/clef-omni/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/%40cf/cloudflare/clef-omni/#page","headline":"clef-omni","description":"Clef-omni is a multimodal decision model built on a 30B-parameter mixture-of-experts (3B active) backbone. It turns a state and a schema of typed questions into decisions, reads the state as text, JSON, images, audio, or video, and returns a probability for every allowed option of every question.","url":"https://developers.cloudflare.com/ai/models/%40cf/cloudflare/clef-omni/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
