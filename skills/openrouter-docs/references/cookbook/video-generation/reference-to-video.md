> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Guide a Video with Reference Images

Use this guide when you need to add reference-to-video generation where images
influence the output without forcing exact first or last frames.

By the end, your implementation should submit a reference-to-video job with
`input_references`.

<Tip>
  For reusable agent knowledge across projects, install the
  [openrouter-video skill](https://github.com/OpenRouterTeam/skills/tree/main/skills/openrouter-video).
</Tip>

## Before you start

You need:

* An OpenRouter API key available as `OPENROUTER_API_KEY`
* Node.js 20 or newer
* One or more public HTTPS image URLs, starting with `REFERENCE_IMAGE_URL`
* A model that supports reference-to-video, confirmed from the current
  OpenRouter video docs or model description

<Tip>
  If you have not chosen a model yet, read
  [Choose a Video Generation Model](/docs/cookbook/video-generation/choose-video-model)
  so you can select one based on your clip duration, output shape, input type,
  audio, provider controls, and cost requirements.
</Tip>

Use the API reference pages as the source of truth for exact fields:

* [Create video generation request](/docs/api/api-reference/video-generation/create-videos)
* [List video generation models](/docs/api/api-reference/video-generation/list-videos-models)
* [TypeScript SDK video generation reference](/docs/client-sdks/typescript/api-reference/videogeneration)

Use `input_references` for visual guidance. Use `frame_images` only when you need exact frame control.

Use stable, directly downloadable image URLs. Some providers cannot fetch image URLs that require cookies, redirects through HTML pages, bot checks, or unusual headers.

<Warning>
  Submitting `POST /api/v1/videos` starts a real video generation job and may
  spend OpenRouter credits.
</Warning>

The video models endpoint does not expose a dedicated structured reference-image
field for every provider. Confirm reference support from the model description
or current docs before you submit:

```bash
curl https://openrouter.ai/api/v1/videos/models
```

Example model output excerpt:

```json
{
  "id": "bytedance/seedance-2.0-fast",
  "supported_durations": [
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15
  ],
  "supported_resolutions": ["480p", "720p"],
  "supported_aspect_ratios": [
    "1:1",
    "3:4",
    "9:16",
    "4:3",
    "16:9",
    "21:9",
    "9:21"
  ]
}
```

For `bytedance/seedance-2.0-fast`, the model list can confirm the example
`duration`, `resolution`, and `aspect_ratio`; reference-image support may still
need confirmation from the model description or docs.

## Step 1: Write a prompt that tells the model how to use the references

Reference images work best when the prompt explains what should stay consistent.

```text
Create a 4-second product video of the same backpack from the reference image.
Keep the shape, color, and logo placement consistent.
Place it on a wet city sidewalk at night with neon reflections.
Use a slow orbiting camera move and realistic lighting.
```

## Step 2: Submit the reference-to-video job

Build the video request with `input_references` when the images should guide
subject, identity, or style. Unlike `frame_images`, reference images are not
exact frame anchors.

Example request shape:

```js
const apiKey = process.env.OPENROUTER_API_KEY;
const referenceImageUrl = process.env.REFERENCE_IMAGE_URL;

if (!apiKey) {
  throw new Error("Set OPENROUTER_API_KEY first.");
}

if (!referenceImageUrl) {
  throw new Error(
    "Set REFERENCE_IMAGE_URL to a directly downloadable image URL.",
  );
}

const response = await fetch("https://openrouter.ai/api/v1/videos", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "bytedance/seedance-2.0-fast",
    prompt:
      "Create a 4-second product video of the same backpack from the reference image. Keep the shape, color, and logo placement consistent. Place it on a wet city sidewalk at night with neon reflections. Use a slow orbiting camera move and realistic lighting.",
    duration: 4,
    resolution: "720p",
    aspect_ratio: "16:9",
    generate_audio: false,
    input_references: [
      {
        type: "image_url",
        image_url: {
          url: referenceImageUrl,
        },
      },
    ],
  }),
});

if (!response.ok) {
  throw new Error(await response.text());
}

const job = await response.json();
console.log(job);
```

The submit call returns the job fields immediately. In the QA run, the submitted
job later completed and downloaded with this final summary:

```json
{
  "id": "Mu1opxXnpIIpwMhwFl8v",
  "status": "completed",
  "polls": ["pending", "pending", "pending", "pending", "completed"],
  "output_path": "reference-video.mp4",
  "bytes": 2020562
}
```

## Step 3: Add more references when consistency matters

Some models can use multiple reference images. Before doing this in production,
check the current docs or model description for the selected model, then start
with the smallest number of references that gives you enough consistency.

```js
const characterSideUrl = process.env.CHARACTER_SIDE_URL;
const styleReferenceUrl = process.env.STYLE_REFERENCE_URL;

if (!characterSideUrl || !styleReferenceUrl) {
  throw new Error("Set CHARACTER_SIDE_URL and STYLE_REFERENCE_URL first.");
}

const inputReferences = [
  {
    type: "image_url",
    image_url: { url: referenceImageUrl },
  },
  {
    type: "image_url",
    image_url: { url: characterSideUrl },
  },
  {
    type: "image_url",
    image_url: { url: styleReferenceUrl },
  },
];
```

Then set `input_references` in the request body to `inputReferences`.

Request shape for the optional multi-reference path:

```json
[
  {
    "type": "image_url",
    "image_url": { "url": "https://your-domain.example/character-front.jpg" }
  },
  {
    "type": "image_url",
    "image_url": { "url": "https://your-domain.example/character-side.jpg" }
  },
  {
    "type": "image_url",
    "image_url": { "url": "https://your-domain.example/style-reference.jpg" }
  }
]
```

## Step 4: Poll and download

After submission, poll from a server route, worker, or job runner instead of the
browser. Keep the flow explicit: poll with a limit, stop on terminal failure,
then download the completed video.

Example polling and download helper:

```js
import { writeFile } from "node:fs/promises";

async function waitForVideo(job) {
  let current = job;

  for (let attempt = 1; attempt <= 60; attempt += 1) {
    if (current.status === "completed") {
      return current;
    }

    if (current.status === "failed") {
      throw new Error(current.error ?? "Video generation failed.");
    }

    if (["cancelled", "expired"].includes(current.status)) {
      throw new Error(current.error ?? `Video generation ${current.status}.`);
    }

    await new Promise((resolve) => setTimeout(resolve, 30_000));

    if (!current.polling_url) {
      throw new Error("Video job did not include a polling_url.");
    }

    const pollingUrl = new URL(current.polling_url, "https://openrouter.ai");
    const response = await fetch(pollingUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    current = await response.json();
  }

  throw new Error("Video generation did not complete after 60 attempts.");
}

async function downloadVideo(job) {
  const videoUrl =
    job.unsigned_urls?.[0] ??
    `https://openrouter.ai/api/v1/videos/${job.id}/content?index=0`;

  const response = await fetch(videoUrl, {
    headers: videoUrl.startsWith("https://openrouter.ai/api/")
      ? { Authorization: `Bearer ${apiKey}` }
      : undefined,
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return Buffer.from(await response.arrayBuffer());
}

const completedJob = await waitForVideo(job);
const videoBuffer = await downloadVideo(completedJob);
await writeFile("reference-video.mp4", videoBuffer);
console.log("Saved reference-video.mp4");
```

The QA run saved the finished video after polling completed:

```text
Saved reference-video.mp4
```

## Check your work

The output should borrow subject, style, or identity cues from the reference
images while still following the generated scene described in the prompt. The
implementation should produce a playable MP4 from the completed job.