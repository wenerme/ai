## Create moderation

`moderations.create(ModerationCreateParams**kwargs)  -> ModerationCreateResponse`

**post** `/moderations`

Classifies if text and/or image inputs are potentially harmful. Learn
more in the [moderation guide](https://platform.openai.com/docs/guides/moderation).

### Parameters

- `input: Union[str, Sequence[str], Iterable[ModerationMultiModalInputParam]]`

  Input (or inputs) to classify. Can be a single string, an array of strings, or
  an array of multi-modal input objects similar to other models.

  - `str`

    A string of text to classify for moderation.

  - `Sequence[str]`

    An array of strings to classify for moderation.

  - `Iterable[ModerationMultiModalInputParam]`

    An array of multi-modal inputs to the moderation model.

    - `class ModerationImageURLInput: …`

      An object describing an image to classify.

      - `image_url: ImageURL`

        Contains either an image URL or a data URL for a base64 encoded image.

        - `url: str`

          Either a URL of the image or the base64 encoded image data.

      - `type: Literal["image_url"]`

        Always `image_url`.

        - `"image_url"`

    - `class ModerationTextInput: …`

      An object describing text to classify.

      - `text: str`

        A string of text to classify.

      - `type: Literal["text"]`

        Always `text`.

        - `"text"`

- `model: Optional[Union[str, ModerationModel]]`

  The content moderation model you would like to use. Learn more in
  [the moderation guide](https://platform.openai.com/docs/guides/moderation), and learn about
  available models [here](https://platform.openai.com/docs/models#moderation).

  - `str`

  - `Literal["omni-moderation-latest", "omni-moderation-2024-09-26", "text-moderation-latest", "text-moderation-stable"]`

    - `"omni-moderation-latest"`

    - `"omni-moderation-2024-09-26"`

    - `"text-moderation-latest"`

    - `"text-moderation-stable"`

### Returns

- `class ModerationCreateResponse: …`

  Represents if a given text input is potentially harmful.

  - `id: str`

    The unique identifier for the moderation request.

  - `model: str`

    The model used to generate the moderation results.

  - `results: List[Moderation]`

    A list of moderation objects.

    - `categories: Categories`

      A list of the categories, and whether they are flagged or not.

      - `harassment: bool`

        Content that expresses, incites, or promotes harassing language towards any target.

      - `harassment_threatening: bool`

        Harassment content that also includes violence or serious harm towards any target.

      - `hate: bool`

        Content that expresses, incites, or promotes hate based on race, gender, ethnicity, religion, nationality, sexual orientation, disability status, or caste. Hateful content aimed at non-protected groups (e.g., chess players) is harassment.

      - `hate_threatening: bool`

        Hateful content that also includes violence or serious harm towards the targeted group based on race, gender, ethnicity, religion, nationality, sexual orientation, disability status, or caste.

      - `illicit: Optional[bool]`

        Content that includes instructions or advice that facilitate the planning or execution of wrongdoing, or that gives advice or instruction on how to commit illicit acts. For example, "how to shoplift" would fit this category.

      - `illicit_violent: Optional[bool]`

        Content that includes instructions or advice that facilitate the planning or execution of wrongdoing that also includes violence, or that gives advice or instruction on the procurement of any weapon.

      - `self_harm: bool`

        Content that promotes, encourages, or depicts acts of self-harm, such as suicide, cutting, and eating disorders.

      - `self_harm_instructions: bool`

        Content that encourages performing acts of self-harm, such as suicide, cutting, and eating disorders, or that gives instructions or advice on how to commit such acts.

      - `self_harm_intent: bool`

        Content where the speaker expresses that they are engaging or intend to engage in acts of self-harm, such as suicide, cutting, and eating disorders.

      - `sexual: bool`

        Content meant to arouse sexual excitement, such as the description of sexual activity, or that promotes sexual services (excluding sex education and wellness).

      - `sexual_minors: bool`

        Sexual content that includes an individual who is under 18 years old.

      - `violence: bool`

        Content that depicts death, violence, or physical injury.

      - `violence_graphic: bool`

        Content that depicts death, violence, or physical injury in graphic detail.

    - `category_applied_input_types: CategoryAppliedInputTypes`

      A list of the categories along with the input type(s) that the score applies to.

      - `harassment: List[Literal["text"]]`

        The applied input type(s) for the category 'harassment'.

        - `"text"`

      - `harassment_threatening: List[Literal["text"]]`

        The applied input type(s) for the category 'harassment/threatening'.

        - `"text"`

      - `hate: List[Literal["text"]]`

        The applied input type(s) for the category 'hate'.

        - `"text"`

      - `hate_threatening: List[Literal["text"]]`

        The applied input type(s) for the category 'hate/threatening'.

        - `"text"`

      - `illicit: List[Literal["text"]]`

        The applied input type(s) for the category 'illicit'.

        - `"text"`

      - `illicit_violent: List[Literal["text"]]`

        The applied input type(s) for the category 'illicit/violent'.

        - `"text"`

      - `self_harm: List[Literal["text", "image"]]`

        The applied input type(s) for the category 'self-harm'.

        - `"text"`

        - `"image"`

      - `self_harm_instructions: List[Literal["text", "image"]]`

        The applied input type(s) for the category 'self-harm/instructions'.

        - `"text"`

        - `"image"`

      - `self_harm_intent: List[Literal["text", "image"]]`

        The applied input type(s) for the category 'self-harm/intent'.

        - `"text"`

        - `"image"`

      - `sexual: List[Literal["text", "image"]]`

        The applied input type(s) for the category 'sexual'.

        - `"text"`

        - `"image"`

      - `sexual_minors: List[Literal["text"]]`

        The applied input type(s) for the category 'sexual/minors'.

        - `"text"`

      - `violence: List[Literal["text", "image"]]`

        The applied input type(s) for the category 'violence'.

        - `"text"`

        - `"image"`

      - `violence_graphic: List[Literal["text", "image"]]`

        The applied input type(s) for the category 'violence/graphic'.

        - `"text"`

        - `"image"`

    - `category_scores: CategoryScores`

      A list of the categories along with their scores as predicted by model.

      - `harassment: float`

        The score for the category 'harassment'.

      - `harassment_threatening: float`

        The score for the category 'harassment/threatening'.

      - `hate: float`

        The score for the category 'hate'.

      - `hate_threatening: float`

        The score for the category 'hate/threatening'.

      - `illicit: float`

        The score for the category 'illicit'.

      - `illicit_violent: float`

        The score for the category 'illicit/violent'.

      - `self_harm: float`

        The score for the category 'self-harm'.

      - `self_harm_instructions: float`

        The score for the category 'self-harm/instructions'.

      - `self_harm_intent: float`

        The score for the category 'self-harm/intent'.

      - `sexual: float`

        The score for the category 'sexual'.

      - `sexual_minors: float`

        The score for the category 'sexual/minors'.

      - `violence: float`

        The score for the category 'violence'.

      - `violence_graphic: float`

        The score for the category 'violence/graphic'.

    - `flagged: bool`

      Whether any of the below categories are flagged.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
moderation = client.moderations.create(
    input="I want to kill them.",
)
print(moderation.id)
```

#### Response

```json
{
  "id": "id",
  "model": "model",
  "results": [
    {
      "categories": {
        "harassment": true,
        "harassment/threatening": true,
        "hate": true,
        "hate/threatening": true,
        "illicit": true,
        "illicit/violent": true,
        "self-harm": true,
        "self-harm/instructions": true,
        "self-harm/intent": true,
        "sexual": true,
        "sexual/minors": true,
        "violence": true,
        "violence/graphic": true
      },
      "category_applied_input_types": {
        "harassment": [
          "text"
        ],
        "harassment/threatening": [
          "text"
        ],
        "hate": [
          "text"
        ],
        "hate/threatening": [
          "text"
        ],
        "illicit": [
          "text"
        ],
        "illicit/violent": [
          "text"
        ],
        "self-harm": [
          "text"
        ],
        "self-harm/instructions": [
          "text"
        ],
        "self-harm/intent": [
          "text"
        ],
        "sexual": [
          "text"
        ],
        "sexual/minors": [
          "text"
        ],
        "violence": [
          "text"
        ],
        "violence/graphic": [
          "text"
        ]
      },
      "category_scores": {
        "harassment": 0,
        "harassment/threatening": 0,
        "hate": 0,
        "hate/threatening": 0,
        "illicit": 0,
        "illicit/violent": 0,
        "self-harm": 0,
        "self-harm/instructions": 0,
        "self-harm/intent": 0,
        "sexual": 0,
        "sexual/minors": 0,
        "violence": 0,
        "violence/graphic": 0
      },
      "flagged": true
    }
  ]
}
```

### Single string

```python
from openai import OpenAI
client = OpenAI()

moderation = client.moderations.create(input="I want to kill them.")
print(moderation)
```

#### Response

```json
{
  "id": "modr-AB8CjOTu2jiq12hp1AQPfeqFWaORR",
  "model": "text-moderation-007",
  "results": [
    {
      "flagged": true,
      "categories": {
        "sexual": false,
        "hate": false,
        "harassment": true,
        "self-harm": false,
        "sexual/minors": false,
        "hate/threatening": false,
        "violence/graphic": false,
        "self-harm/intent": false,
        "self-harm/instructions": false,
        "harassment/threatening": true,
        "violence": true
      },
      "category_scores": {
        "sexual": 0.000011726012417057063,
        "hate": 0.22706663608551025,
        "harassment": 0.5215635299682617,
        "self-harm": 2.227119921371923e-6,
        "sexual/minors": 7.107352217872176e-8,
        "hate/threatening": 0.023547329008579254,
        "violence/graphic": 0.00003391829886822961,
        "self-harm/intent": 1.646940972932498e-6,
        "self-harm/instructions": 1.1198755256458526e-9,
        "harassment/threatening": 0.5694745779037476,
        "violence": 0.9971134662628174
      }
    }
  ]
}
```

### Image and text

```python
from openai import OpenAI
client = OpenAI()

response = client.moderations.create(
    model="omni-moderation-latest",
    input=[
        {"type": "text", "text": "...text to classify goes here..."},
        {
            "type": "image_url",
            "image_url": {
                "url": "https://example.com/image.png",
                # can also use base64 encoded image URLs
                # "url": "data:image/jpeg;base64,abcdefg..."
            }
        },
    ],
)

print(response)
```

#### Response

```json
{
  "id": "modr-0d9740456c391e43c445bf0f010940c7",
  "model": "omni-moderation-latest",
  "results": [
    {
      "flagged": true,
      "categories": {
        "harassment": true,
        "harassment/threatening": true,
        "sexual": false,
        "hate": false,
        "hate/threatening": false,
        "illicit": false,
        "illicit/violent": false,
        "self-harm/intent": false,
        "self-harm/instructions": false,
        "self-harm": false,
        "sexual/minors": false,
        "violence": true,
        "violence/graphic": true
      },
      "category_scores": {
        "harassment": 0.8189693396524255,
        "harassment/threatening": 0.804985420696006,
        "sexual": 1.573112165348997e-6,
        "hate": 0.007562942636942845,
        "hate/threatening": 0.004208854591835476,
        "illicit": 0.030535955153511665,
        "illicit/violent": 0.008925306722380033,
        "self-harm/intent": 0.00023023930975076432,
        "self-harm/instructions": 0.0002293869201073356,
        "self-harm": 0.012598046106750154,
        "sexual/minors": 2.212566909570261e-8,
        "violence": 0.9999992735124786,
        "violence/graphic": 0.843064871157054
      },
      "category_applied_input_types": {
        "harassment": [
          "text"
        ],
        "harassment/threatening": [
          "text"
        ],
        "sexual": [
          "text",
          "image"
        ],
        "hate": [
          "text"
        ],
        "hate/threatening": [
          "text"
        ],
        "illicit": [
          "text"
        ],
        "illicit/violent": [
          "text"
        ],
        "self-harm/intent": [
          "text",
          "image"
        ],
        "self-harm/instructions": [
          "text",
          "image"
        ],
        "self-harm": [
          "text",
          "image"
        ],
        "sexual/minors": [
          "text"
        ],
        "violence": [
          "text",
          "image"
        ],
        "violence/graphic": [
          "text",
          "image"
        ]
      }
    }
  ]
}
```
