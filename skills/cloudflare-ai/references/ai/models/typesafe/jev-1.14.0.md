---
description: Jev 1.14 is TypeSafe's structured evaluation model. It evaluates one state against typed Noul, Choice, Score, and Box questions and returns calibrated answers with probabilities and confidence. Image inputs and Box questions are beta and dreamer-ready, not recommended for production.
title: Jev 1.14
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

t

# Jev 1.14

Text Generation • typesafe

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/typesafe/jev-1.14.0/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`typesafe/jev-1.14.0`

- Third-party

Jev 1.14 is TypeSafe's structured evaluation model. It evaluates one state against typed Noul, Choice, Score, and Box questions and returns calibrated answers with probabilities and confidence. Image inputs and Box questions are beta and dreamer-ready, not recommended for production.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 32,000 tokens |
| Terms and License | [link ↗](https://docs.typesafe.ai/legal.md) |
| More information | [link ↗](https://docs.typesafe.ai/models.md) |
| Pricing | <ul><li>Input (per 1M tokens)$0.042</li><li>Cached input (per 1M tokens)$0.00</li><li>Output (per 1M tokens)$0.00</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'typesafe/jev-1.14.0',
  {
    state: { photo: 'black-rectangle' },
    assets: {
      'black-rectangle': {
        type: 'image',
        format: 'png',
        data_base64:
          'iVBORw0KGgoAAAANSUhEUgAAARgAAAEYAQAAAACv9dQhAAAATklEQVR42u3ZoQ3AMAADwU8X6f47RkpJigqKI52pD5l6rH5zxTAMwzAMwzBMVWtnfpr7rWzIMAzDMAzDMAzDMMzpZvgQGYZhGIZhGKaqB4heFTaRz7VhAAAAAElFTkSuQmCC',
      },
    },
    questions: { visible: { type: 'noul', instructions: 'Is there a black rectangle in `photo`?' } },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "typesafe/jev-1.14.0",
  "input": {
    "state": {
      "photo": "black-rectangle"
    },
    "assets": {
      "black-rectangle": {
        "type": "image",
        "format": "png",
        "data_base64": "iVBORw0KGgoAAAANSUhEUgAAARgAAAEYAQAAAACv9dQhAAAATklEQVR42u3ZoQ3AMAADwU8X6f47RkpJigqKI52pD5l6rH5zxTAMwzAMwzBMVWtnfpr7rWzIMAzDMAzDMAzDMMzpZvgQGYZhGIZhGKaqB4heFTaRz7VhAAAAAElFTkSuQmCC"
      }
    },
    "questions": {
      "visible": {
        "type": "noul",
        "instructions": "Is there a black rectangle in `photo`?"
      }
    }
  }
}'
```

```json
{
  "model": "jev-1.14.0",
  "answers": {
    "visible": {
      "type": "noul",
      "noul": 0.95
    }
  },
  "usage": {
    "input_tokens": 489,
    "output_tokens": 20
  }
}
```

## Examples

<details>

<summary>**Beta image instructions** — Beta image input: compare a referenced image in instructions</summary>



```ts
const response = await env.AI.run(
  'typesafe/jev-1.14.0',
  {
    state: 'A black rectangle image is attached as black-rectangle.',
    assets: {
      'black-rectangle': {
        type: 'image',
        format: 'png',
        data_base64:
          'iVBORw0KGgoAAAANSUhEUgAAARgAAAEYAQAAAACv9dQhAAAATklEQVR42u3ZoQ3AMAADwU8X6f47RkpJigqKI52pD5l6rH5zxTAMwzAMwzBMVWtnfpr7rWzIMAzDMAzDMAzDMMzpZvgQGYZhGIZhGKaqB4heFTaRz7VhAAAAAElFTkSuQmCC',
      },
    },
    questions: {
      visible: { type: 'noul', instructions: 'Does black-rectangle contain a black rectangle?' },
    },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "typesafe/jev-1.14.0",
  "input": {
    "state": "A black rectangle image is attached as black-rectangle.",
    "assets": {
      "black-rectangle": {
        "type": "image",
        "format": "png",
        "data_base64": "iVBORw0KGgoAAAANSUhEUgAAARgAAAEYAQAAAACv9dQhAAAATklEQVR42u3ZoQ3AMAADwU8X6f47RkpJigqKI52pD5l6rH5zxTAMwzAMwzBMVWtnfpr7rWzIMAzDMAzDMAzDMMzpZvgQGYZhGIZhGKaqB4heFTaRz7VhAAAAAElFTkSuQmCC"
      }
    },
    "questions": {
      "visible": {
        "type": "noul",
        "instructions": "Does black-rectangle contain a black rectangle?"
      }
    }
  }
}'
```

```json
{
  "model": "jev-1.14.0",
  "answers": {
    "visible": {
      "type": "noul",
      "noul": 0.98
    }
  },
  "usage": {
    "input_tokens": 694,
    "output_tokens": 20
  }
}
```

</details>

<details>

<summary>**Beta Box detection** — Beta Box question: locate the black rectangle</summary>



```ts
const response = await env.AI.run(
  'typesafe/jev-1.14.0',
  {
    state: { photo: 'black-rectangle' },
    assets: {
      'black-rectangle': {
        type: 'image',
        format: 'png',
        data_base64:
          'iVBORw0KGgoAAAANSUhEUgAAARgAAAEYAQAAAACv9dQhAAAATklEQVR42u3ZoQ3AMAADwU8X6f47RkpJigqKI52pD5l6rH5zxTAMwzAMwzBMVWtnfpr7rWzIMAzDMAzDMAzDMMzpZvgQGYZhGIZhGKaqB4heFTaRz7VhAAAAAElFTkSuQmCC',
      },
    },
    questions: { rectangle: { type: 'box', instructions: 'Find the black rectangle in `photo`' } },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "typesafe/jev-1.14.0",
  "input": {
    "state": {
      "photo": "black-rectangle"
    },
    "assets": {
      "black-rectangle": {
        "type": "image",
        "format": "png",
        "data_base64": "iVBORw0KGgoAAAANSUhEUgAAARgAAAEYAQAAAACv9dQhAAAATklEQVR42u3ZoQ3AMAADwU8X6f47RkpJigqKI52pD5l6rH5zxTAMwzAMwzBMVWtnfpr7rWzIMAzDMAzDMAzDMMzpZvgQGYZhGIZhGKaqB4heFTaRz7VhAAAAAElFTkSuQmCC"
      }
    },
    "questions": {
      "rectangle": {
        "type": "box",
        "instructions": "Find the black rectangle in `photo`"
      }
    }
  }
}'
```

```json
{
  "model": "jev-1.14.0",
  "answers": {
    "rectangle": {
      "type": "box",
      "box": {
        "top": 0.23,
        "bottom": 0.83,
        "left": 0.14,
        "right": 0.76
      },
      "confidence": 0.74
    }
  },
  "usage": {
    "input_tokens": 487,
    "output_tokens": 20
  }
}
```

</details>

<details>

<summary>**Beta Box with visibility check** — Beta Box question: pair location with a visibility check</summary>



```ts
const response = await env.AI.run(
  'typesafe/jev-1.14.0',
  {
    state: { photo: 'black-rectangle' },
    assets: {
      'black-rectangle': {
        type: 'image',
        format: 'png',
        data_base64:
          'iVBORw0KGgoAAAANSUhEUgAAARgAAAEYAQAAAACv9dQhAAAATklEQVR42u3ZoQ3AMAADwU8X6f47RkpJigqKI52pD5l6rH5zxTAMwzAMwzBMVWtnfpr7rWzIMAzDMAzDMAzDMMzpZvgQGYZhGIZhGKaqB4heFTaRz7VhAAAAAElFTkSuQmCC',
      },
    },
    questions: {
      visible: { type: 'noul', instructions: 'Is there a black rectangle in `photo`?' },
      rectangle: { type: 'box', instructions: 'Find the black rectangle in `photo`' },
    },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "typesafe/jev-1.14.0",
  "input": {
    "state": {
      "photo": "black-rectangle"
    },
    "assets": {
      "black-rectangle": {
        "type": "image",
        "format": "png",
        "data_base64": "iVBORw0KGgoAAAANSUhEUgAAARgAAAEYAQAAAACv9dQhAAAATklEQVR42u3ZoQ3AMAADwU8X6f47RkpJigqKI52pD5l6rH5zxTAMwzAMwzBMVWtnfpr7rWzIMAzDMAzDMAzDMMzpZvgQGYZhGIZhGKaqB4heFTaRz7VhAAAAAElFTkSuQmCC"
      }
    },
    "questions": {
      "visible": {
        "type": "noul",
        "instructions": "Is there a black rectangle in `photo`?"
      },
      "rectangle": {
        "type": "box",
        "instructions": "Find the black rectangle in `photo`"
      }
    }
  }
}'
```

```json
{
  "model": "jev-1.14.0",
  "answers": {
    "visible": {
      "type": "noul",
      "noul": 0.95
    },
    "rectangle": {
      "type": "box",
      "box": {
        "top": 0.24,
        "bottom": 0.81,
        "left": 0.15,
        "right": 0.74
      },
      "confidence": 0.74
    }
  },
  "usage": {
    "input_tokens": 504,
    "output_tokens": 36
  }
}
```

</details>

## Parameters

▶state

`one of`required

▶assets{}

`object`

▶questions{}

`object`required

model

`string`minLength: 1

▶answers{}

`object`

▶usage{}

`object`

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/typesafe/jev-1.14.0/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/typesafe/jev-1.14.0/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/typesafe/jev-1.14.0/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/typesafe/jev-1.14.0/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/typesafe/jev-1.14.0/#page","headline":"Jev 1.14","description":"Jev 1.14 is TypeSafe's structured evaluation model. It evaluates one state against typed Noul, Choice, Score, and Box questions and returns calibrated answers with probabilities and confidence. Image inputs and Box questions are beta and dreamer-ready, not recommended for production.","url":"https://developers.cloudflare.com/ai/models/typesafe/jev-1.14.0/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
