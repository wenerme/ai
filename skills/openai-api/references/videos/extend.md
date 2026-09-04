## Create an extension of a completed video.

**post** `/videos/extensions`

Create an extension of a completed video.

### Body Parameters

- `prompt: string`

  Updated text prompt that directs the extension generation.

- `seconds: VideoSeconds`

  Length of the newly generated extension segment in seconds (allowed values: 4, 8, 12, 16, 20).

  - `"4"`

  - `"8"`

  - `"12"`

- `video: object { id }`

  Reference to the completed video to extend.

  - `id: string`

    The identifier of the completed video.

### Returns

- `Video object { id, completed_at, created_at, 10 more }`

  Structured information describing a generated video job.

  - `id: string`

    Unique identifier for the video job.

  - `completed_at: number or null`

    Unix timestamp (seconds) for when the job completed, if finished.

  - `created_at: number`

    Unix timestamp (seconds) for when the job was created.

  - `error: VideoCreateError or null`

    Error payload that explains why generation failed, if applicable.

    - `code: string`

      A machine-readable error code that was returned.

    - `message: string`

      A human-readable description of the error that was returned.

    - `misalignment: optional object { detailed_explanation, error_type, steer }`

      - `detailed_explanation: optional string`

        The public explanation for this block.

      - `error_type: optional string or "potentially_unintended_data_transfer" or "potentially_unintended_data_access" or "potentially_unintended_destructive_activity" or "other"`

        An optional classification; clients must accept additional values.

        - `string`

        - `SafetyAlertErrorType = "potentially_unintended_data_transfer" or "potentially_unintended_data_access" or "potentially_unintended_destructive_activity" or "other"`

          An optional classification; clients must accept additional values.

          - `"potentially_unintended_data_transfer"`

          - `"potentially_unintended_data_access"`

          - `"potentially_unintended_destructive_activity"`

          - `"other"`

      - `steer: optional object { message }`

        An optional public continuation instruction.

        - `message: string`

          The public continuation instruction.

  - `expires_at: number or null`

    Unix timestamp (seconds) for when the downloadable assets expire, if set.

  - `model: VideoModel`

    The video generation model that produced the job.

    - `string`

    - `"sora-2" or "sora-2-pro" or "sora-2-2025-10-06" or 2 more`

      - `"sora-2"`

      - `"sora-2-pro"`

      - `"sora-2-2025-10-06"`

      - `"sora-2-pro-2025-10-06"`

      - `"sora-2-2025-12-08"`

  - `object: "video"`

    The object type, which is always `video`.

    - `"video"`

  - `progress: number`

    Approximate completion percentage for the generation task.

  - `prompt: string or null`

    The prompt that was used to generate the video.

  - `remixed_from_video_id: string or null`

    Identifier of the source video if this video is a remix.

  - `seconds: string`

    Duration of the generated clip in seconds. For extensions, this is the stitched total duration.

  - `size: VideoSize`

    The resolution of the generated video.

    - `"720x1280"`

    - `"1280x720"`

    - `"1024x1792"`

    - `"1792x1024"`

  - `status: "queued" or "in_progress" or "completed" or "failed"`

    Current lifecycle status of the video job.

    - `"queued"`

    - `"in_progress"`

    - `"completed"`

    - `"failed"`

### Example

```http
curl https://api.openai.com/v1/videos/extensions \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "prompt": "x",
          "seconds": "4",
          "video": {
            "id": "video_123"
          }
        }'
```

#### Response

```json
{
  "id": "id",
  "completed_at": 0,
  "created_at": 0,
  "error": {
    "code": "code",
    "message": "message",
    "misalignment": {
      "detailed_explanation": "detailed_explanation",
      "error_type": "potentially_unintended_data_transfer",
      "steer": {
        "message": "message"
      }
    }
  },
  "expires_at": 0,
  "model": "sora-2",
  "object": "video",
  "progress": 0,
  "prompt": "prompt",
  "remixed_from_video_id": "remixed_from_video_id",
  "seconds": "string",
  "size": "720x1280",
  "status": "queued"
}
```
