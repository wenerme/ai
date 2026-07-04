To ensure a safe and responsible experience, Agent Platform's image
generation capabilities are equipped with a multi-layered safety approach. This
is designed to prevent the creation of inappropriate content, including sexually
explicit, dangerous, violent, hateful, or toxic material.

All users must adhere to the Generative AI Prohibited Use Policy. This policy
strictly forbids the generation of content that:

- Relates to child sexual abuse or exploitation.
- Facilitates violent extremism or terrorism.
- Facilitates non-consensual intimate imagery.
- Facilitates self-harm.
- Is sexually explicit.
- Constitutes hate speech.
- Promotes harassment or bullying.

When provided with an unsafe prompt, the model might refuse to generate an
image, or the prompt or generated response might be blocked by our safety
filters.

- Model refusal: If a prompt is potentially unsafe, the model might refuse to process the request. If this happens, the model usually gives a text response saying it can't generate unsafe images. The `FinishReason` is `STOP`.
- Safety filter blocking:
  - If the prompt is identified as potentially harmful by a safety filter, the API returns `BlockedReason` in `PromptFeedback`.
  - If the response is identified as potentially harmful by a safety filter, the API response includes a `FinishReason` of `IMAGE_SAFETY`, `IMAGE_PROHIBITED_CONTENT`, or similar.

### Safety filter code categories

Depending on the safety filters you configure, your output may contain a safety
reason code similar to the following:

```
    {
      "raiFilteredReason": "ERROR_MESSAGE. Support codes: 56562880"
    }
```

The listed code corresponds to a specific harmful category. The
code-to-category mappings are as follows:

| Error code | Safety category | Description | Content filtered: prompt input or image output |
|---|---|---|---|
| 58061214 17301594 | Child | Detects child content that isn't allowed due to the API request settings or allowlisting. | input (prompt): 58061214 output (image): 17301594 |
| 29310472 15236754 | Celebrity | Detects a photorealistic representation of a celebrity in the request. | input (prompt): 29310472 output (image): 15236754 |
| 62263041 | Dangerous content | Detects content that's potentially dangerous in nature. | input (prompt) |
| 57734940 22137204 | Hate | Detects hate-related topics or content. | input (prompt): 57734940 output (image): 22137204 |
| 74803281 29578790 42876398 | Other | Detects other miscellaneous safety issues with the request. | input (prompt): 42876398 output (image): 29578790, 74803281 |
| 39322892 | People/Face | Detects a person or face when it isn't allowed due to the request safety settings. | output (image) |
| 92201652 | Personal information | Detects Personally Identifiable Information (PII) in the text, such as credit card numbers, home addresses, or other similar information. | input (prompt) |
| 89371032 49114662 72817394 | Prohibited content | Detects a request for prohibited content. | input (prompt): 89371032 output (image): 49114662, 72817394 |
| 90789179 63429089 43188360 | Sexual | Detects content that's sexual in nature. | input (prompt): 90789179 output (image): 63429089, 43188360 |
| 78610348 | Toxic | Detects toxic topics or content in the text. | input (prompt) |
| 61493863 56562880 | Violence | Detects violence-related content from the image or text. | input (prompt): 61493863 output (image): 56562880 |
| 32635315 | Vulgar | Detects vulgar topics or content from the text. | input (prompt) |
| 64151117 | Celebrity or child | Detects photorealistic representation of a celebrity or child that violates Google's safety policies. | input (prompt) output (image) |

## What's next?

See the following links for more information about Gemini image
generation:

- [Generate images with
  Gemini](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/image-generation)

- [Edit images with
  Gemini](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/gemini-edit-images)

- [Gemini image generation
  limitations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/gemini-image-generation-limitations)

- [Gemini image generation best
  practices](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/gemini-image-generation-best-practices)
