# Moderation

Use the [moderations](https://developers.openai.com/api/docs/api-reference/moderations) endpoint to check whether text or images are potentially harmful. If harmful content is identified, you can take corrective action, like filtering content or intervening with user accounts creating offending content. The moderation endpoint is free to use.

You can use two models for this endpoint:

- `omni-moderation-latest`: This model and all snapshots support more categorization options and multi-modal inputs.
- `text-moderation-latest` **(Legacy)**: Older model that supports only text inputs and fewer input categorizations. The newer omni-moderation models will be the best choice for new applications.

## Quickstart

Use the tabs below to see how you can moderate text inputs or image inputs, using our [official SDKs](https://developers.openai.com/api/docs/libraries) and the [omni-moderation-latest model](https://developers.openai.com/api/docs/models#moderation):



<div data-content-switcher-pane data-value="text">
    <div class="hidden">Moderate text inputs</div>
    </div>
  <div data-content-switcher-pane data-value="images" hidden>
    <div class="hidden">Moderate images and text</div>
    </div>



Here's a full example output, where the input is an image from a single frame of a war movie. The model correctly predicts indicators of violence in the image, with a `violence` category score of greater than 0.8.

```json
{
  "id": "modr-970d409ef3bef3b70c73d8232df86e7d",
  "model": "omni-moderation-latest",
  "results": [
    {
      "flagged": true,
      "categories": {
        "sexual": false,
        "sexual/minors": false,
        "harassment": false,
        "harassment/threatening": false,
        "hate": false,
        "hate/threatening": false,
        "illicit": false,
        "illicit/violent": false,
        "self-harm": false,
        "self-harm/intent": false,
        "self-harm/instructions": false,
        "violence": true,
        "violence/graphic": false
      },
      "category_scores": {
        "sexual": 2.34135824776394e-7,
        "sexual/minors": 1.6346470245419304e-7,
        "harassment": 0.0011643905680426018,
        "harassment/threatening": 0.0022121340080906377,
        "hate": 3.1999824407395835e-7,
        "hate/threatening": 2.4923252458203563e-7,
        "illicit": 0.0005227032493135171,
        "illicit/violent": 3.682979260160596e-7,
        "self-harm": 0.0011175734280627694,
        "self-harm/intent": 0.0006264858507989037,
        "self-harm/instructions": 7.368592981140821e-8,
        "violence": 0.8599265510337075,
        "violence/graphic": 0.37701736389561064
      },
      "category_applied_input_types": {
        "sexual": ["image"],
        "sexual/minors": [],
        "harassment": [],
        "harassment/threatening": [],
        "hate": [],
        "hate/threatening": [],
        "illicit": [],
        "illicit/violent": [],
        "self-harm": ["image"],
        "self-harm/intent": ["image"],
        "self-harm/instructions": ["image"],
        "violence": ["image"],
        "violence/graphic": ["image"]
      }
    }
  ]
}
```

The output has several categories in the JSON response, which tell you which (if any) categories of content are present in the inputs, and to what degree the model believes them to be present.

<table>
  <tr>
    <th>Output category</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>`flagged`</td>
    <td>
      Set to `true` if the model classifies the content as potentially harmful,
      `false` otherwise.
    </td>
  </tr>
  <tr>
    <td>`categories`</td>
    <td>
      Contains a dictionary of per-category violation flags. For each category,
      the value is `true` if the model flags the corresponding category as
      violated, `false` otherwise.
    </td>
  </tr>
  <tr>
    <td>`category_scores`</td>
    <td>
      Contains a dictionary of per-category scores output by the model, denoting
      the model's confidence that the input violates the OpenAI's policy for the
      category. The value is between 0 and 1, where higher values denote higher
      confidence.
    </td>
  </tr>
  <tr>
    <td>`category_applied_input_types`</td>
    <td>
      This property contains information on which input types were flagged in
      the response, for each category. For example, if the both the image and
      text inputs to the model are flagged for "violence/graphic", the
      `violence/graphic` property will be set to `["image", "text"]`. This is
      only available on omni models.
    </td>
  </tr>
</table>

We plan to continuously upgrade the moderation endpoint's underlying model.
  Therefore, custom policies that rely on `category_scores` may need
  recalibration over time.

## Content classifications

The table below describes the types of content that can be detected in the moderation API, along with which models and input types are supported for each category.

Categories marked as "Text only" do not support image inputs. If you send only
  images (without accompanying text) to the `omni-moderation-latest` model, it
  will return a score of 0 for these unsupported categories.

<table>
  <tr>
    <th>
      <strong>Category</strong>
    </th>
    <th>
      <strong>Description</strong>
    </th>
    <th>
      <strong>Models</strong>
    </th>
    <th>
      <strong>Inputs</strong>
    </th>
  </tr>
  <tr>
    <td>`harassment`</td>
    <td>
      Content that expresses, incites, or promotes harassing language towards
      any target.
    </td>
    <td>All</td>
    <td>Text only</td>
  </tr>
  <tr>
    <td>`harassment/threatening`</td>
    <td>
      Harassment content that also includes violence or serious harm towards any
      target.
    </td>
    <td>All</td>
    <td>Text only</td>
  </tr>
  <tr>
    <td>`hate`</td>
    <td>
      Content that expresses, incites, or promotes hate based on race, gender,
      ethnicity, religion, nationality, sexual orientation, disability status,
      or caste. Hateful content aimed at non-protected groups (e.g., chess
      players) is harassment.
    </td>
    <td>All</td>
    <td>Text only</td>
  </tr>
  <tr>
    <td>`hate/threatening`</td>
    <td>
      Hateful content that also includes violence or serious harm towards the
      targeted group based on race, gender, ethnicity, religion, nationality,
      sexual orientation, disability status, or caste.
    </td>
    <td>All</td>
    <td>Text only</td>
  </tr>
  <tr>
    <td>`illicit`</td>
    <td>
      Content that gives advice or instruction on how to commit illicit acts. A
      phrase like "how to shoplift" would fit this category.
    </td>
    <td>Omni only</td>
    <td>Text only</td>
  </tr>
  <tr>
    <td>`illicit/violent`</td>
    <td>
      The same types of content flagged by the `illicit` category, but also
      includes references to violence or procuring a weapon.
    </td>
    <td>Omni only</td>
    <td>Text only</td>
  </tr>
  <tr>
    <td>`self-harm`</td>
    <td>
      Content that promotes, encourages, or depicts acts of self-harm, such as
      suicide, cutting, and eating disorders.
    </td>
    <td>All</td>
    <td>Text and images</td>
  </tr>
  <tr>
    <td>`self-harm/intent`</td>
    <td>
      Content where the speaker expresses that they are engaging or intend to
      engage in acts of self-harm, such as suicide, cutting, and eating
      disorders.
    </td>
    <td>All</td>
    <td>Text and images</td>
  </tr>
  <tr>
    <td>`self-harm/instructions`</td>
    <td>
      Content that encourages performing acts of self-harm, such as suicide,
      cutting, and eating disorders, or that gives instructions or advice on how
      to commit such acts.
    </td>
    <td>All</td>
    <td>Text and images</td>
  </tr>
  <tr>
    <td>`sexual`</td>
    <td>
      Content meant to arouse sexual excitement, such as the description of
      sexual activity, or that promotes sexual services (excluding sex education
      and wellness).
    </td>
    <td>All</td>
    <td>Text and images</td>
  </tr>
  <tr>
    <td>`sexual/minors`</td>
    <td>
      Sexual content that includes an individual who is under 18 years old.
    </td>
    <td>All</td>
    <td>Text only</td>
  </tr>
  <tr>
    <td>`violence`</td>
    <td>Content that depicts death, violence, or physical injury.</td>
    <td>All</td>
    <td>Text and images</td>
  </tr>
  <tr>
    <td>`violence/graphic`</td>
    <td>
      Content that depicts death, violence, or physical injury in graphic
      detail.
    </td>
    <td>All</td>
    <td>Text and images</td>
  </tr>
</table>