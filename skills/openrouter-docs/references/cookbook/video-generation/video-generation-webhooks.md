> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Get Video Results with Webhooks

Use this guide when you need to add webhook-based video completion handling
instead of polling from a client or worker.

By the end, your implementation should submit a video job with `callback_url`
and verify the webhook signature.

For reusable agent knowledge across projects, install the
[openrouter-video skill](https://github.com/OpenRouterTeam/skills/tree/main/skills/openrouter-video).

## Before you start

You need:

* An OpenRouter API key available as `OPENROUTER_API_KEY`
* Node.js 20 or newer
* A public HTTPS endpoint for your webhook receiver
* A webhook signing secret configured in your OpenRouter workspace settings
* A video model slug for the job you submit with `callback_url`

If you have not chosen a model yet, read
[Choose a Video Generation Model](/docs/cookbook/video-generation/choose-video-model)
so you can select one based on your clip duration, output shape, input type,
audio, provider controls, and cost requirements.

Use the API reference pages as the source of truth for exact fields:

* [Create video generation request](/docs/api/api-reference/video-generation/create-videos)
* [List video generation models](/docs/api/api-reference/video-generation/list-videos-models)
* [TypeScript SDK video generation reference](/docs/client-sdks/typescript/api-reference/videogeneration)

If you adapt the Express examples below in a local test project, use these
dependencies:

```bash
npm install express
npm install --save-dev @types/express tsx
```

Submitting `POST /api/v1/videos` starts a real video generation job and may
spend OpenRouter credits.

## Step 1: Implement a webhook receiver

Add a webhook receiver that preserves the raw request body before parsing JSON.
Signature verification must use the exact bytes OpenRouter sent, not a
re-serialized payload.

Example Express receiver:

```ts
import crypto from "node:crypto";
import express from "express";

const app = express();
const signingSecret = process.env.OPENROUTER_WEBHOOK_SECRET;

type VideoWebhookEvent = {
  type:
    | "video.generation.completed"
    | "video.generation.failed"
    | "video.generation.cancelled"
    | "video.generation.expired";
  created_at: string;
  data: {
    id: string;
    status: "completed" | "failed" | "cancelled" | "expired";
    generation_id?: string | null;
    model?: string | null;
    unsigned_urls?: string[];
    usage?: {
      cost?: number;
      is_byok?: boolean;
    };
    error?: string;
  };
};

function verifyOpenRouterSignature(rawBody: Buffer, header: string): boolean {
  if (!signingSecret) return false;

  const parts = header.split(",").map((part) => part.trim());
  const timestamp = parts.find((part) => part.startsWith("t="))?.slice(2);
  const signature = parts.find((part) => part.startsWith("v1="))?.slice(3);

  if (!timestamp || !signature) return false;

  const age = Math.floor(Date.now() / 1000) - Number(timestamp);
  if (Number.isNaN(age) || Math.abs(age) > 300) return false;

  const signedPayload = Buffer.concat([
    Buffer.from(`${timestamp},`, "utf8"),
    rawBody,
  ]);
  const expected = crypto
    .createHmac("sha256", signingSecret)
    .update(signedPayload)
    .digest("hex");

  if (expected.length !== signature.length) return false;

  return crypto.timingSafeEqual(
    Buffer.from(expected),
    Buffer.from(signature),
  );
}

app.post(
  "/openrouter/video-webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const signature = req.header("X-OpenRouter-Signature");

    if (!signature || !verifyOpenRouterSignature(req.body, signature)) {
      return res.sendStatus(401);
    }

    const idempotencyKey = req.header("X-OpenRouter-Idempotency-Key");
    const event = JSON.parse(req.body.toString("utf8")) as VideoWebhookEvent;
    const job = event.data;

    if (job.status === "completed") {
      console.log("Video ready:", {
        id: job.id,
        idempotencyKey,
        url: job.unsigned_urls?.[0],
      });
    }

    if (["failed", "cancelled", "expired"].includes(job.status)) {
      console.error("Video did not complete:", {
        id: job.id,
        status: job.status,
        error: job.error,
        idempotencyKey,
      });
    }

    res.sendStatus(204);
  },
);

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
```

## Step 2: Validate signature handling before using real jobs

Before connecting a real `callback_url`, exercise the receiver with the same
signing secret your test sender uses:

```bash
OPENROUTER_WEBHOOK_SECRET=dev_secret npx tsx server.ts
```

Actual local receiver startup output:

```text
Listening on http://localhost:3000
```

Expose the receiver with a public HTTPS URL before using it as a real
`callback_url`. A local tunnel or deployed preview URL works as long as
OpenRouter can reach it over HTTPS.

## Step 3: Send a signed test event

Before spending credits on a real video job, test the receiver with a locally
signed event. This verifies that raw-body handling, timestamp parsing, HMAC
comparison, and idempotency headers are wired correctly.

Example local sender:

```js
import crypto from "node:crypto";

const secret = process.env.OPENROUTER_WEBHOOK_SECRET;

if (!secret) {
  throw new Error("Set OPENROUTER_WEBHOOK_SECRET first.");
}

const body = JSON.stringify({
  type: "video.generation.completed",
  created_at: new Date().toISOString(),
  data: {
    id: "job_test",
    status: "completed",
    unsigned_urls: ["https://example.com/video.mp4"],
  },
});
const timestamp = Math.floor(Date.now() / 1000).toString();
const signature = crypto
  .createHmac("sha256", secret)
  .update(`${timestamp},${body}`)
  .digest("hex");

const response = await fetch("http://localhost:3000/openrouter/video-webhook", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-OpenRouter-Signature": `t=${timestamp},v1=${signature}`,
    "X-OpenRouter-Idempotency-Key": "job_test-completed",
  },
  body,
});

console.log(response.status);
```

Exercise the local sender while the receiver is listening:

```bash
OPENROUTER_WEBHOOK_SECRET=dev_secret node send-test-webhook.mjs
```

A valid signed event should return `204`. Change the secret or signature to
confirm the receiver returns `401` for invalid requests.

Actual local signature-test output:

```text
204
```

You can also use a temporary Webhook.site URL as `CALLBACK_URL` to confirm
OpenRouter delivers the webhook and includes the expected headers and envelope.
Webhook.site does not run your signature verifier; use your own public receiver
with the workspace signing secret for end-to-end signature verification.

Example Webhook.site delivery:

```json
{
  "request": {
    "method": "POST",
    "content_type": "application/json",
    "has_signature_header": true,
    "signature": {
      "has_timestamp": true,
      "has_v1": true,
      "redacted_format": "t=<timestamp>,v1=<hex>"
    },
    "has_idempotency_key_header": true,
    "idempotency_key_shape": {
      "includes_job_id": true,
      "length": 30
    },
    "body_shape": {
      "top_level_keys": ["created_at", "data", "type"],
      "type": "video.generation.completed",
      "data_keys": [
        "generation_id",
        "id",
        "model",
        "status",
        "unsigned_urls",
        "usage"
      ],
      "data_id_matches_job": true,
      "data_status": "completed",
      "unsigned_url_count": 1,
      "usage_keys": ["cost", "is_byok"]
    }
  },
  "job": {
    "id": "Nxff2D1Z6w4Zk9iNuZam",
    "poll_statuses": [
      { "status": "pending", "elapsed_seconds": 1 },
      { "status": "pending", "elapsed_seconds": 11 },
      { "status": "pending", "elapsed_seconds": 21 },
      { "status": "pending", "elapsed_seconds": 31 },
      { "status": "completed", "elapsed_seconds": 41 }
    ],
    "downloaded_bytes": 442723
  }
}
```

## Step 4: Submit a video job with `callback_url`

Once the receiver is reachable over public HTTPS, submit the video job with
`callback_url`. The callback URL can be set per request, which is useful for
preview environments or tenant-specific receivers.

Example submit logic:

```ts
const apiKey = process.env.OPENROUTER_API_KEY;
const callbackUrl = process.env.CALLBACK_URL;

if (!apiKey) {
  throw new Error("Set OPENROUTER_API_KEY first.");
}

if (!callbackUrl) {
  throw new Error("Set CALLBACK_URL to your public HTTPS receiver URL.");
}

const response = await fetch("https://openrouter.ai/api/v1/videos", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "google/veo-3.1-lite",
    prompt: "A clean product reveal of a matte black desk lamp, slow camera slide, studio lighting",
    duration: 4,
    resolution: "720p",
    aspect_ratio: "16:9",
    generate_audio: false,
    callback_url: callbackUrl,
  }),
});

if (!response.ok) {
  throw new Error(await response.text());
}

console.log(await response.json());
```

The submit call returns the initial job fields. In a completed run, that job
later completed and delivered a webhook with this final summary:

```json
{
  "id": "Nxff2D1Z6w4Zk9iNuZam",
  "initial_status": "pending",
  "terminal_status": "completed",
  "response_keys": ["id", "polling_url", "status"]
}
```

After the receiver is deployed or exposed through a tunnel, run the submit logic
with `CALLBACK_URL` set to that public endpoint:

```bash
CALLBACK_URL=https://your-app.example.com/openrouter/video-webhook npx tsx submit-video-job.mts
```

The per-request `callback_url` takes priority over a workspace-level default callback URL.

## Step 5: Handle the completed job

Handle webhook delivery as a terminal job update. The payload is an event
envelope with the job fields inside `data`; the `data` object includes fields
such as `id`, `status`, `generation_id`, `model`, `unsigned_urls`, `usage`, and
`error`, depending on the terminal state. Store the job state in your database,
deduplicate retries with `X-OpenRouter-Idempotency-Key`, then download the
video from the first `unsigned_urls` entry or from the content endpoint. If the
URL points to the OpenRouter API, include the bearer token when downloading it.

For a complete polling and download helper, see
[Generate and Download a Video from Text](/docs/cookbook/video-generation/text-to-video).

Actual local receiver log shape from the signature test:

```text
Video ready: {
  id: "job_test",
  idempotencyKey: "job_test-completed",
  url: "https://example.com/video.mp4"
}
```

## Check your work

Your receiver should return `204` for a valid OpenRouter webhook and `401` for
a request with a missing or invalid signature. A real callback delivery should
produce a terminal job update that your app can store and use to download the
generated video.