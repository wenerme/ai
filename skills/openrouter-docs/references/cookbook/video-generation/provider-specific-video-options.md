> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Use Provider-Specific Video Options

Use this guide when you need to add video model controls that are not part of
OpenRouter's normalized video schema.

By the end, your implementation should inspect a model's allowed passthrough
parameters and send one through `provider.options`.

For reusable agent knowledge across projects, install the
[openrouter-video skill](https://github.com/OpenRouterTeam/skills/tree/main/skills/openrouter-video).

## Before you start

You need:

* Node.js 20 or newer
* An OpenRouter API key available as `OPENROUTER_API_KEY` only when you submit
  the video job
* A target video model for the provider-specific options you want to send

If you are not already targeting a specific provider model, read
[Choose a Video Generation Model](/docs/cookbook/video-generation/choose-video-model)
so you can select one based on your clip duration, output shape, input type,
audio, provider controls, and cost requirements.

Use the API reference pages as the source of truth for exact fields:

* [Create video generation request](/docs/api/api-reference/video-generation/create-videos)
* [List video generation models](/docs/api/api-reference/video-generation/list-videos-models)
* [TypeScript SDK video generation reference](/docs/client-sdks/typescript/api-reference/videogeneration)

Provider-specific options can change by model and provider. Always check `allowed_passthrough_parameters` before relying on one.

Submitting `POST /api/v1/videos` starts a real video generation job and may
spend OpenRouter credits.

## Step 1: Inspect allowed passthrough parameters

Start by reading `allowed_passthrough_parameters` from the selected model. This
keeps provider-specific controls behind a model metadata check instead of
hard-coding unsupported request keys.

Example metadata check:

```js
const response = await fetch("https://openrouter.ai/api/v1/videos/models");

if (!response.ok) {
  throw new Error(await response.text());
}

const { data } = await response.json();
const models = data;
const veo = models.find(
  (model) => model.id === "google/veo-3.1-lite",
);

if (!veo) {
  throw new Error("google/veo-3.1-lite was not found in the video model list.");
}

console.log(veo.allowed_passthrough_parameters);
```

Example output:

```json
[
  "personGeneration",
  "aspectRatio",
  "negativePrompt",
  "conditioningScale",
  "enhancePrompt"
]
```

For example, `google/veo-3.1-lite` may expose passthrough controls such as
`negativePrompt`, `enhancePrompt`, `personGeneration`, or `conditioningScale`.
OpenRouter lists supported parameter names; check the provider docs for valid
values when a parameter has an enum.

Before submitting a paid job, assert that every passthrough key you plan to send
is allowed for the selected model:

```js
const providerParameters = {
  negativePrompt: "blurry, low quality, distorted petals",
  enhancePrompt: true,
};

const unsupportedParameters = Object.keys(providerParameters).filter(
  (key) => !veo.allowed_passthrough_parameters?.includes(key),
);

if (unsupportedParameters.length > 0) {
  throw new Error(
    `Unsupported passthrough parameters: ${unsupportedParameters.join(", ")}`,
  );
}

console.log("All provider parameters are supported.");
```

Metadata assertion output:

```text
All provider parameters are supported.
```

## Step 2: Add provider options to the video request

Provider options are keyed by provider slug. Only the options for the matched
provider are forwarded. For the Google Vertex video endpoint, use the
`google-vertex` provider slug.

Example request shape:

```js
const apiKey = process.env.OPENROUTER_API_KEY;

if (!apiKey) {
  throw new Error("Set OPENROUTER_API_KEY before submitting a video job.");
}

const response = await fetch("https://openrouter.ai/api/v1/videos", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "google/veo-3.1-lite",
    prompt:
      "A 4-second time-lapse of a white orchid blooming on a dark tabletop, macro lens, gentle studio light",
    duration: 4,
    resolution: "720p",
    aspect_ratio: "16:9",
    generate_audio: false,
    provider: {
      options: {
        "google-vertex": {
          parameters: providerParameters,
        },
      },
    },
  }),
});

if (!response.ok) {
  throw new Error(await response.text());
}

console.log(await response.json());
```

The submit call returns the job fields immediately. In the QA run, the submitted
job later completed and downloaded with this final summary:

```json
{
  "id": "2hAwXrT31ZpCI8MsjBEe",
  "status": "completed",
  "polling_url": "https://openrouter.ai/api/v1/videos/2hAwXrT31ZpCI8MsjBEe",
  "downloaded_path": "provider-options.mp4",
  "downloaded_bytes": 794331
}
```

To wait for the playable MP4, use the polling and download helper from
[Generate and Download a Video from Text](/docs/cookbook/video-generation/text-to-video)
after submission.

## Step 3: Keep a fallback without passthrough options

If your app can route across multiple video models, keep the normalized request
separate from model-specific options:

```js
const baseRequest = {
  prompt: "A short cinematic product shot of a white orchid blooming",
  duration: 4,
  resolution: "720p",
  aspect_ratio: "16:9",
};

const selectedModel = {
  id: "google/veo-3.1-lite",
};

const requestBody =
  selectedModel.id === "google/veo-3.1-lite"
    ? {
        ...baseRequest,
        model: selectedModel.id,
        provider: {
          options: {
            "google-vertex": {
              parameters: {
                negativePrompt: "blurry, low quality",
              },
            },
          },
        },
      }
    : {
        ...baseRequest,
        model: selectedModel.id,
      };
```

Request shape for `google/veo-3.1-lite`:

```json
{
  "prompt": "A short cinematic product shot of a white orchid blooming",
  "duration": 4,
  "resolution": "720p",
  "aspect_ratio": "16:9",
  "model": "google/veo-3.1-lite",
  "provider": {
    "options": {
      "google-vertex": {
        "parameters": {
          "negativePrompt": "blurry, low quality"
        }
      }
    }
  }
}
```

## Check your work

The metadata assertion should pass before you submit a job. If you submit the
request, it should return a video job. If the provider option is invalid for
the selected model, remove it or re-check the current
`allowed_passthrough_parameters` list. To verify the final output, poll the
returned `polling_url` until `completed`, then download the MP4.