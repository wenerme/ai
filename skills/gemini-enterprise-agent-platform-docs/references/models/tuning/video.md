## Use cases

Fine-tuning lets you adapt base Gemini models for specialized tasks.
Here are some video use cases:

- Automated video summarization: Tuning LLMs to generate concise and
coherent summaries of long videos, capturing the main themes, events, and
narratives. This is useful for content discovery, archiving, and quick
reviews.
- Detailed event recognition and localization: Fine-tuning allows LLMs to
identify and pinpoint specific actions, events, or objects within a video
timeline with greater accuracy. For example, identifying all instances of a
particular product in a marketing video or a specific action in sports
footage.
- Content moderation: Specialized tuning can improve an LLM's ability to
detect sensitive, inappropriate, or policy-violating content within videos,
going beyond simple object detection to understand context and nuance.
- Video captioning and subtitling: While already a common application,
tuning can improve the accuracy, fluency, and context-awareness of
automatically generated captions and subtitles, including descriptions of
nonverbal cues.

## Limitations

- Maximum video file size : 100MB. This may not be sufficient for large video files. Some recommended workarounds are as follows:
- If there are very few large files, drop those files from including those in the JSONL files.
- If there are many large files in your dataset and cannot be ignored, reduce visual resolution of the files. This may hurt performance.
- Chunk the videos to limit the files size to 100MB and use the chunked videos for tuning. Make sure to change any timestamp annotations corresponding to the original video to the new (chunked) video timeline.
- Maximum video length per example : Limit 1 video per example. It can be 5 minutes with `MEDIA_RESOLUTION_HIGH` or `MEDIA_RESOLUTION_MEDIUM` and 20 minutes with `MEDIA_RESOLUTION_LOW`.
- Dropped examples: If an example contains video that is longer than the supported maximum length, that example is dropped from the dataset. Dropped examples are not billed or used for training. If more than 10% of the dataset is dropped, the job will fail with an error message before the start of training.
- Mixing different media resolutions isn't supported : The value of `mediaResolution` for each example in the entire training dataset must be consistent. All lines in the JSONL files used for training and validation should have the same value of `mediaResolution`.

## Dataset format

The `fileUri` field specifies the location of your dataset. It can be the URI
for a file in a Cloud Storage bucket, or it can be a publicly available HTTP
or HTTPS URL.

The `mediaResolution` field is used to specify the token count per frame for
the input videos. The following describes token counts for supported models:

- Gemini 2.5:
- `MEDIA_RESOLUTION_LOW`: 64 tokens per frame
- `MEDIA_RESOLUTION_MEDIUM` and `MEDIA_RESOLUTION_HIGH` : 256 tokens per
frame

Model tuning with `MEDIA_RESOLUTION_LOW` is roughly 4 times faster than the
ones tuned with `MEDIA_RESOLUTION_MEDIUM` or `MEDIA_RESOLUTION_HIGH` with
minimal performance improvement.

- Gemini 3:

Token counts are the same as the base model. For more information, see
Media
resolution.

When a video segment is used for training and validation, the video segment
is in the `videoMetadata` field. During tuning, this data point is decoded
to contain information from the segment extracted from the specified video file,
starting from timestamp `startOffset` (the start offset, in seconds) until
`endOffset`.

To see the generic format example, see
Dataset example for Gemini.

The following sections present video dataset format examples.

### JSON schema example for cases where the full video is used for training and validation

This schema is added as a single line in the JSONL file.

{
"contents": [
"role": "user",
"parts": [
"fileData": {
"fileUri": "gs://",
"mimeType": "video/mp4"
},
"text": "
You are a video analysis expert. Detect which animal appears in the
video.The video can only have one of the following animals: dog, cat,
rabbit.\n Output Format:\n Generate output in the following JSON
format:\n
[{\n
"animal_name": "",\n
}]\n"
}
]
"role": "model",
"text": "`json\n[{\"animal_name\": \"dog\"}]\n`"
],
"generationConfig": {
"mediaResolution": "MEDIA_RESOLUTION_LOW"

(Gemini 3 and higher models only) Starting with the Gemini 3
models, you can also set the media resolution per individual media `Part`.
This lets you mix resolutions in your dataset (for example, by setting
`MEDIA_RESOLUTION_HIGH` for one item and `MEDIA_RESOLUTION_LOW` for another).
For more information about part-level resolution and their corresponding token
counts, see Media

`Part`-level media resolution settings take precedence over global settings.

The following is an example dataset that sets the media resolution at both the
`Part` and global levels:

"mediaResolution": {
"level": "MEDIA_RESOLUTION_HIGH"
"text": "Describe these videos in detail."
"text": "Video 1 is low resolution while video 2 is sharp and clear"

### JSON schema example for cases where a video segment is used for training and validation

"videoMetadata": {
"startOffset": "5s",
"endOffset": "25s"

## What's next

- To learn more about video tuning, see How to fine-tune Gemini 2.5 using
videos via Agent
Platform.
- To learn more about the image understanding capability of Gemini, see
our Image understanding
documentation.
- To start tuning, see Tune Gemini models by using supervised
fine-tuning
- To learn how supervised fine-tuning can be used in a solution that builds a
generative AI knowledge base, see Jump Start Solution: Generative AI
knowledge base.
