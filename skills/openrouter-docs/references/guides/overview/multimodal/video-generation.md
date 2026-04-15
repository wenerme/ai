For clean Markdown of any page, append .md to the page URL. For a complete documentation index, see https://openrouter.ai/docs/guides/overview/multimodal/llms.txt. For full documentation content, see https://openrouter.ai/docs/guides/overview/multimodal/llms-full.txt.

OpenRouter supports video generation through models that have `"video"` in their `output_modalities`. These models can create videos from text prompts (and optional reference images) via a dedicated asynchronous API.

<Info>
  Video generation uses the `/api/v1/videos` endpoint. This API may change.
</Info>

## Model Discovery

You can find video generation models in several ways:

### Via the Video Models API

Use the dedicated video models endpoint to list all available video generation models along with their supported parameters:

```bash
curl "https://openrouter.ai/api/v1/videos/models"
```

The response returns a `data` array where each model includes:

```json
{
  "data": [
    {
      "id": "google/veo-3.1",
      "canonical_slug": "google/veo-3.1",
      "name": "Google: Veo 3.1",
      "description": "...",
      "created": 1719792000,
      "supported_resolutions": ["720p", "1080p"],
      "supported_aspect_ratios": ["16:9", "9:16", "1:1"],
      "supported_sizes": ["1280x720", "1920x1080"],
      "pricing_skus": {
        "per-video-second": "0.50",
        "per-video-second-1080p": "0.75"
      },
      "allowed_passthrough_parameters": ["output_config"]
    }
  ]
}
```

| Field                            | Description                                                                       |
| -------------------------------- | --------------------------------------------------------------------------------- |
| `id`                             | Model slug to use in generation requests                                          |
| `canonical_slug`                 | Permanent model identifier                                                        |
| `supported_resolutions`          | List of supported output resolutions (e.g., `720p`, `1080p`)                      |
| `supported_aspect_ratios`        | List of supported aspect ratios (e.g., `16:9`, `9:16`)                            |
| `supported_sizes`                | List of supported pixel dimensions (e.g., `1280x720`)                             |
| `pricing_skus`                   | Pricing information per SKU                                                       |
| `allowed_passthrough_parameters` | Provider-specific parameters that can be passed through via the `provider` option |

Use this endpoint to check which resolutions, aspect ratios, and passthrough parameters are supported by each model before submitting a generation request.

### Via the Models API

You can also use the `output_modalities` query parameter on the [Models API](/docs/api-reference/models/get-models) to discover video generation models:

```bash
# List only video generation models
curl "https://openrouter.ai/api/v1/models?output_modalities=video"
```

### On the Models Page

Visit the [Models page](/models) and filter by output modalities to find models capable of video generation. Look for models that list `"video"` in their output modalities.

## How It Works

Unlike text or image generation, video generation is **asynchronous** because generating video takes significantly longer. The workflow is:

1. **Submit** a generation request to `POST /api/v1/videos`
2. **Receive** a job ID and polling URL immediately
3. **Poll** the polling URL (`GET /api/v1/videos/{jobId}`) until the status is `completed`
4. **Download** the video from the content URL (`GET /api/v1/videos/{jobId}/content`)

## API Usage

### Submitting a Video Generation Request

<Template
  data={{
  API_KEY_REF,
  MODEL: 'google/veo-3.1'
}}
>
  <CodeGroup>
    ```python
    import requests
    import json
    import time

    url = "https://openrouter.ai/api/v1/videos"
    headers = {
        "Authorization": f"Bearer {API_KEY_REF}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "{{MODEL}}",
        "prompt": "A golden retriever playing fetch on a sunny beach with waves crashing in the background"
    }

    # Step 1: Submit the generation request
    response = requests.post(url, headers=headers, json=payload)
    result = response.json()

    job_id = result["id"]
    polling_url = result["polling_url"]
    print(f"Job submitted: {job_id}")
    print(f"Status: {result['status']}")

    # Step 2: Poll until completion
    while True:
        time.sleep(30)  # Wait 30 seconds between polls
        poll_response = requests.get(polling_url, headers=headers)
        status = poll_response.json()

        print(f"Status: {status['status']}")

        if status["status"] == "completed":
            # Step 3: Download the video
            content_url = status["unsigned_urls"][0]
            video_response = requests.get(content_url)
            with open("output.mp4", "wb") as f:
                f.write(video_response.content)
            print("Video saved to output.mp4")
            break
        elif status["status"] == "failed":
            print(f"Generation failed: {status.get('error', 'Unknown error')}")
            break
    ```

    ```typescript title="TypeScript (fetch)"
    const headers = {
      Authorization: `Bearer ${API_KEY_REF}`,
      'Content-Type': 'application/json',
    };

    // Step 1: Submit the generation request
    const response = await fetch('https://openrouter.ai/api/v1/videos', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: '{{MODEL}}',
        prompt: 'A golden retriever playing fetch on a sunny beach with waves crashing in the background',
      }),
    });

    const result = await response.json();
    const jobId = result.id;
    const pollingUrl = result.polling_url;
    console.log(`Job submitted: ${jobId}`);
    console.log(`Status: ${result.status}`);

    // Step 2: Poll until completion
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 30000)); // Wait 30 seconds
      const pollResponse = await fetch(pollingUrl, { headers });
      const status = await pollResponse.json();

      console.log(`Status: ${status.status}`);

      if (status.status === 'completed') {
        // Step 3: Download the video
        const contentUrl = status.unsigned_urls[0];
        const videoResponse = await fetch(contentUrl);
        const videoBuffer = await videoResponse.arrayBuffer();
        // Save or process the video buffer
        console.log(`Video ready: ${contentUrl}`);
        break;
      } else if (status.status === 'failed') {
        console.error(`Generation failed: ${status.error ?? 'Unknown error'}`);
        break;
      }
    }
    ```

    ```bash title="cURL"
    # Step 1: Submit the generation request
    curl -X POST "https://openrouter.ai/api/v1/videos" \
      -H "Authorization: Bearer $OPENROUTER_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{
        "model": "{{MODEL}}",
        "prompt": "A golden retriever playing fetch on a sunny beach with waves crashing in the background"
      }'

    # Response:
    # {
    #   "id": "<job_id>",
    #   "polling_url": "https://openrouter.ai/api/v1/videos/<job_id>",
    #   "status": "pending"
    # }

    # Step 2: Poll for status
    curl "https://openrouter.ai/api/v1/videos/<job_id>" \
      -H "Authorization: Bearer $OPENROUTER_API_KEY"

    # Step 3: Once status is "completed", download from unsigned_urls[0]
    ```
  </CodeGroup>
</Template>

### Request Parameters

| Parameter          | Type    | Required | Description                                                                                                            |
| ------------------ | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `model`            | string  | Yes      | The model to use for video generation (e.g., `google/veo-3.1`)                                                         |
| `prompt`           | string  | Yes      | Text description of the video to generate                                                                              |
| `duration`         | integer | No       | Duration of the generated video in seconds                                                                             |
| `resolution`       | string  | No       | Resolution of the output video (e.g., `720p`, `1080p`)                                                                 |
| `aspect_ratio`     | string  | No       | Aspect ratio of the output video (e.g., `16:9`, `9:16`)                                                                |
| `size`             | string  | No       | Exact pixel dimensions in `WIDTHxHEIGHT` format (e.g., `1280x720`). Interchangeable with `resolution` + `aspect_ratio` |
| `frame_images`     | array   | No       | Images for first/last frames (image-to-video)                                                                          |
| `input_references` | array   | No       | Reference images for style guidance (reference-to-video)                                                               |
| `generate_audio`   | boolean | No       | Whether to generate audio alongside the video. Defaults to `true` for models that support audio output                 |
| `seed`             | integer | No       | Seed for deterministic generation (not guaranteed by all providers)                                                    |
| `provider`         | object  | No       | Provider-specific passthrough configuration                                                                            |

### Supported Resolutions

* `480p`
* `720p`
* `1080p`
* `1K`
* `2K`
* `4K`

### Supported Aspect Ratios

* `16:9` — Widescreen landscape
* `9:16` — Vertical/portrait
* `1:1` — Square
* `4:3` — Standard landscape
* `3:4` — Standard portrait
* `21:9` — Ultra-wide
* `9:21` — Ultra-tall

### Using Images

There are two ways to provide images, each
triggering a different generation mode:

* **`frame_images`** — Specifies first or last frame
  images for **image-to-video** generation. Each entry
  must include a `frame_type` of `first_frame` or
  `last_frame`.
* **`input_references`** — Provides style or content
  reference images for **reference-to-video**
  generation. The model uses these as visual guidance
  rather than exact frames.

If both fields are provided, `frame_images` takes
precedence and the request is treated as
image-to-video.

#### Image-to-Video (frame\_images)

```json
{
  "model": "alibaba/wan-2.7",
  "prompt": "A character walking through a forest",
  "frame_images": [
    {
      "type": "image_url",
      "image_url": {
        "url": "https://example.com/first-frame.png"
      },
      "frame_type": "first_frame"
    }
  ],
  "resolution": "1080p"
}
```

#### Reference-to-Video (input\_references)

```json
{
  "model": "alibaba/wan-2.7",
  "prompt": "A colossal solar flare beside a planet",
  "input_references": [
    {
      "type": "image_url",
      "image_url": {
        "url": "https://example.com/style-ref.png"
      }
    }
  ],
  "resolution": "1080p"
}
```

### Provider-Specific Options

You can pass provider-specific options using the `provider` parameter. Options are keyed by provider slug, and only the options for the matched provider are forwarded:

```json
{
  "model": "google/veo-3.1",
  "prompt": "A time-lapse of a flower blooming",
  "provider": {
    "options": {
      "google-vertex": {
        "parameters": {
          "personGeneration": "allow",
          "negativePrompt": "blurry, low quality"
        }
      }
    }
  }
}
```

Use the [Video Models API](#via-the-video-models-api) to check which passthrough parameters each model supports via the `allowed_passthrough_parameters` field.

## Response Format

### Submit Response (202 Accepted)

When you submit a video generation request, you receive an immediate response with the job details:

```json
{
  "id": "abc123",
  "polling_url": "https://openrouter.ai/api/v1/videos/abc123",
  "status": "pending"
}
```

### Poll Response

When polling the job status, the response includes additional fields as the job progresses:

```json
{
  "id": "abc123",
  "generation_id": "gen-1234567890-abcdef",
  "polling_url": "https://openrouter.ai/api/v1/videos/abc123",
  "status": "completed",
  "unsigned_urls": [
    "https://openrouter.ai/api/v1/videos/abc123/content?index=0"
  ],
  "usage": {
    "cost": 0.25,
    "is_byok": false
  }
}
```

### Job Statuses

| Status        | Description                                     |
| ------------- | ----------------------------------------------- |
| `pending`     | The job has been submitted and is queued        |
| `in_progress` | The video is being generated                    |
| `completed`   | The video is ready to download                  |
| `failed`      | The generation failed (check the `error` field) |

### Downloading the Video

Once the job status is `completed`, the `unsigned_urls` array contains URLs to download the generated video content. You can also use the content endpoint directly:

```bash
curl "https://openrouter.ai/api/v1/videos/{jobId}/content?index=0" \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  --output video.mp4
```

The `index` query parameter defaults to `0` and can be used if the model generates multiple video outputs.

## Best Practices

* **Detailed Prompts**: Provide specific, descriptive prompts for better video quality. Include details about motion, camera angles, lighting, and scene composition
* **Appropriate Resolution**: Higher resolutions take longer to generate and cost more. Choose the resolution that fits your use case
* **Polling Interval**: Use a reasonable polling interval (e.g., 30 seconds) to avoid excessive API calls. Video generation typically takes 30 seconds to several minutes depending on the model and parameters
* **Error Handling**: Always check the job status for `failed` state and handle the `error` field appropriately
* **Reference Images**: When using reference images, ensure they are high quality and relevant to the desired video output

## Troubleshooting

**Job stays in `pending` for a long time?**

* Video generation can take several minutes depending on the model, resolution, and server load
* Continue polling at regular intervals

**Generation failed?**

* Check the `error` field in the poll response for details
* Verify the model supports video generation (`output_modalities` includes `"video"`)
* Ensure your prompt is appropriate and within model guidelines
* Check that any reference images are accessible and in supported formats

**Model not found?**

* Use the [Video Models API](#via-the-video-models-api) or the [Models page](/models) to find available video generation models
* Verify the model slug is correct (e.g., `google/veo-3.1`)