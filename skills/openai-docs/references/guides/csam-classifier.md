# CSAM classifier

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

The OpenAI CSAM Image Classifier helps reviewers prioritize images that may contain child sexual abuse material (CSAM), including AI-generated material.

The classifier is available to approved organizations at no cost. .

## How it works

The classifier takes one image as input and returns signals for two categories: potential CSAM and potential AI-generated CSAM. To use the classifier, set the model to `omni-moderation-csam-latest`.

For general moderation, use `omni-moderation-latest`. It can flag sexual content in images, but its `sexual/minors` category applies only to text.

## Classify an image

Follow your organization's approved input-handling process. Do not submit known CSAM.

- Set `OPENAI_API_KEY` to an API key for an approved organization.
- Send a standalone [Create moderation](https://developers.openai.com/api/reference/resources/moderations/methods/create) request (`POST /v1/moderations`).
- Send exactly one still image of up to 20 MB (20,000,000 bytes) in the `input` array with `type: "image_url"`. Set `image_url.url` to an HTTP or HTTPS image URL or a base64-encoded image data URL. The classifier doesn't support text classification.

The following example sends an image of soap to the classifier.

Classify an image

```bash
curl https://api.openai.com/v1/moderations \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "omni-moderation-csam-latest",
    "input": [
      {
        "type": "image_url",
        "image_url": {
          "url": "https://cdn.openai.com/API/docs/images/soap.png"
        }
      }
    ]
  }'
```


Here’s an example response:

```json
{
  "id": "modr_example",
  "model": "omni-moderation-csam-latest",
  "results": [
    {
      "flagged": false,
      "categories": {
        "likely-csam": false,
        "likely-csam/gen-ai": false
      },
      "category_scores": {
        "likely-csam": 0.12,
        "likely-csam/gen-ai": 0.01
      },
      "category_applied_input_types": {
        "likely-csam": ["image"],
        "likely-csam/gen-ai": ["image"]
      }
    }
  ]
}
```

## Interpret the result

Read the classification result at `results[0]`. Start with `flagged`, then check the individual category flags.

| Response field                 | Description                                                                                                                                                                                                                                  |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `flagged`                      | Whether the classifier flagged the image.                                                                                                                                                                                                    |
| `categories`                   | A boolean flag for each category, based on its configured decision threshold.                                                                                                                                                                |
| `category_scores`              | A score from 0 to 1 for each category, with no units. Higher scores signal a stronger match within the same category and model snapshot. Do not interpret these scores as calibrated probabilities or assume `0.5` is a universal threshold. |
| `category_applied_input_types` | The input types evaluated for each category. Each value is `["image"]`.                                                                                                                                                                      |

### Understand the categories

| Category             | Signal                                  |
| -------------------- | --------------------------------------- |
| `likely-csam`        | Signal for potential CSAM.              |
| `likely-csam/gen-ai` | Signal for potential AI-generated CSAM. |

A category flag doesn't establish that an image is CSAM, and the classifier doesn't automatically report content to authorities. Follow your organization's review, escalation, and reporting processes. See the [CSAM guidance](https://developers.openai.com/api/docs/guides/csam-guidance) for recommendations on handling flagged content.

## Troubleshoot a request

If a request fails, check that you selected `omni-moderation-csam-latest`, used an API key for an approved organization, and sent one image within the size limit.

The classifier doesn't support [inline moderation](https://developers.openai.com/api/docs/guides/moderation#moderate-generated-content) or the [Batch API](https://developers.openai.com/api/docs/guides/batch).

For rate-limit errors, consult your organization's limits and the [rate-limit guidance](https://developers.openai.com/api/docs/guides/rate-limits).

## Access

To request access, submit the .