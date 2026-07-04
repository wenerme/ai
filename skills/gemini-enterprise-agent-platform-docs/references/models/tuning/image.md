## Use cases

Fine-tuning lets you adapt base Gemini models for specialized tasks.
Here are some image use cases:

- Product catalog enhancement: Extract key attributes from images (e.g., brand, color, size) to automatically build and enrich your product catalog.
- Image moderation: Fine-tune a model to detect and flag inappropriate or harmful content in images, ensuring a safer online experience.
- Visual inspection: Train a model to identify specific objects or defects within images, automating quality control or inspection processes.
- Image classification: Improve the accuracy of image classification for specific domains, such as medical imaging or satellite imagery analysis.
- Image-based recommendations: Analyze images to provide personalized recommendations, such as suggesting similar products or complementary items.
- Table content extraction: Extract data from tables within images and convert it into structured formats like spreadsheets or databases.

## Limitations

- Maximum images per example: 30
- Maximum image file size: 20MB

To learn more about image sample requirements, see the Image understanding page.

## Dataset format

The `fileUri` for your dataset can be the URI for a file in a Cloud Storage
bucket, or it can be a publicly available HTTP or HTTPS URL.

The `mediaResolution` field of the `GenerationConfig`
object is
used to control the tradeoff between the quality of the media file being sent
for tuning and the number of tokens used to represent the media. A higher
resolution allows the model to perceive more detail, which can lead to a more
nuanced tuned model behavior, but it will also use more tokens. This doesn't
affect the image dimensions sent to the model. When not specified, the default
resolution is `MEDIA_RESOLUTION_HIGH`.

### `mediaResolution` for Gemini versions 3 and earlier

The following are the supported `mediaResolution` values for fine-tuning image
data for Gemini versions 3 and earlier:

- `MEDIA_RESOLUTION_LOW`: 64 tokens
- `MEDIA_RESOLUTION_MEDIUM`: 256 tokens
- `MEDIA_RESOLUTION_HIGH`: 256 tokens + (256 tokens * number of pan and scan images)

To see the generic format example, see
Dataset example for Gemini.

The following is an example of an image dataset:

```
{
  "contents": [
      "role": "user",
      "parts": [
          "fileData": {
            "mimeType": "image/jpeg",
            "fileUri": "gs://cloud-samples-data/ai-platform/generative_ai/gemini-2_0/image/longcap100/100.jpeg"
            }
        },
          "text": "Describe this image in detail that captures the essence of it."
      ]
      "role": "model",
          "text": "A man stands on a road, wearing a blue denim jacket, tan pants, and white sneakers. He has his hands in his pockets and is wearing a white t-shirt under his jacket. The man's pants are cuffed, and his shoes are white. The road is dark grey, and the leaves are green. The man is standing in the shade, and the light is shining on the ground."
  ],
  "generationConfig": {
    "mediaResolution": "MEDIA_RESOLUTION_LOW"

```

### `mediaResolution` for Gemini versions 3 and higher

For Gemini 3 models and higher, you can also set the media resolution
per individual media `Part`.
This lets you mix resolutions in your dataset (for example, by setting
`MEDIA_RESOLUTION_HIGH` for one item and `MEDIA_RESOLUTION_LOW` for another).
For more information about part-level resolution and their corresponding token
counts, see Media
resolution.

`Part`-level media resolution settings take precedence over global settings.

The following is an example dataset that sets the media resolution at both the
`Part` and global levels:

```
            "fileUri": "gs://image.jpeg"
            "fileUri": "gs://ultra_high_res_image.jpeg"
          "mediaResolution": {
            "level": "MEDIA_RESOLUTION_HIGH"
          "text": "Describe these images in detail."
          "text": "Image 1 is low resolution while image 2 is sharp and clear"

```

### Sample datasets

You can use the following sample datasets to learn how to tune a
Gemini model. To use these datasets, specify the URIs in the
applicable parameters when creating a text model supervised fine-tuning job.

To use the sample tuning dataset, specify its location as follows:

```
"training_dataset_uri": "gs://cloud-samples-data/ai-platform/generative_ai/gemini-2_0/image/sft_train_data.jsonl",

```

To use the sample validation dataset, specify its location as follows:

```
"validation_dataset_uri": "gs://cloud-samples-data/ai-platform/generative_ai/gemini-2_0/image/sft_validation_data.jsonl",

```

## What's next

- To learn more about the image understanding capability of Gemini, see our Image understanding documentation.
- To start tuning, see Tune Gemini models by using supervised fine-tuning
- To learn how supervised fine-tuning can be used in a solution that builds a generative AI knowledge base, see Jump Start Solution: Generative AI
knowledge base.
