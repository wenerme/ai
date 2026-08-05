Webhooks allow the Gemini API to push real-time notifications to your server
when asynchronous or Long-Running Operations (LROs) complete. This replaces the
need to poll the API for status updates, reducing latency and overhead.

Webhooks are available for operations like [Batch](https://ai.google.dev/gemini-api/docs/batch-api) jobs,
[Interactions](https://ai.google.dev/gemini-api/docs/interactions-overview) and [video generation](https://ai.google.dev/gemini-api/docs/video).

## How it works

Instead of polling `GET /operations` repeatedly to check if a job is finished,
you can configure Gemini API Webhooks to send an HTTP POST request to your
listener URL immediately upon an event trigger.

The Gemini API supports two ways to configure webhooks:

- [**Static webhooks**](https://ai.google.dev/gemini-api/docs/webhooks#static-webhooks): Project-level endpoints configured with the Gemini [WebhookService API](https://ai.google.dev/api). Good for global integrations (e.g., notifying Slack, syncing a database, etc.).
- [**Dynamic webhooks**](https://ai.google.dev/gemini-api/docs/webhooks#dynamic-webhooks): Request-level overrides passing a webhook URL in the configuration payload of a specific jobs call. Ideal for routing specific jobs to dedicated endpoints.

## Static webhooks

Static webhooks are registered for a whole [project](https://ai.google.dev/gemini-api/docs/api-key#google-cloud-projects) and trigger for any matching
event.

### Create a webhook

You can create endpoints using the SDK or REST API.

**IMPORTANT** : When creating a webhook, the API returns a **signing secret**
**only once** . You must store this securely (e.g. in your environment variables)
to verify signatures later. If you lose the signing secret, you'll have to
[rotate](https://ai.google.dev/gemini-api/docs/webhooks#rotate-signing-secret) it.

### Python

    from google import genai

    client = genai.Client()

    webhook = client.webhooks.create(
        name="MyBatchWebhook",
        subscribed_events=["batch.succeeded", "batch.failed"],
        uri="https://my-api.com/gemini-callback",
    )

    # Store webhook.new_signing_secret securely
    webhook_secret = webhook.new_signing_secret
    print(f"Created webhook: {webhook.name}, {webhook.id}")

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const client = new GoogleGenAI();

    async function createWebhook() {
      const webhook = await client.webhooks.create({
        name: "MyBatchWebhook",
        subscribed_events: ["batch.succeeded", "batch.failed"],
        uri: "https://my-api.com/gemini-callback",
      });

      // Store webhook.signingSecret securely
      const webhookSecret = webhook.new_signing_secret;
      console.log(`Created webhook: ${webhook.name}, ${webhook.id}`);
    }

    createWebhook();

### REST

    curl -X POST \
      "https://generativelanguage.googleapis.com/v1/webhooks" \
      -H "Content-Type: application/json" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -d '{
        "name": "MyBatchWebhook",
        "uri": "https://my-api.com/gemini-callback",
        "subscribed_events": ["batch.succeeded", "batch.failed"]
      }'

For details on setting up your server to receive data, see the
[Handle webhook requests](https://ai.google.dev/gemini-api/docs/webhooks#handle-webhook-requests) section.

### Get a webhook

Retrieve details about a specific webhook by its resource name.

### Python

    from google import genai

    client = genai.Client()

    webhook = client.webhooks.get(id="<your_webhook_id>")

    print(f"Webhook: {webhook.name}")
    print(f"URI: {webhook.uri}")
    print(f"Events: {webhook.subscribed_events}")

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const client = new GoogleGenAI(); // Assumes process.env.GEMINI_API_KEY is set

    async function getWebhook() {
      const webhook = await client.webhooks.get("<your_webhook_id>");

      console.log(`Webhook: ${webhook.name}`);
      console.log(`URI: ${webhook.uri}`);
      console.log(`Events: ${webhook.subscribed_events}`);
    }

    getWebhook();

### REST

    curl -X GET \
      "https://generativelanguage.googleapis.com/v1/webhooks/<your_webhook_id>" \
      -H "x-goog-api-key: $GEMINI_API_KEY"

### List webhooks

List all configured webhooks for the current project, with optional pagination.

### Python

    from google import genai

    client = genai.Client()

    webhooks = client.webhooks.list()

    for wh in webhooks:
        print(f"{wh.id}: {wh.name} -> {wh.uri}")

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const client = new GoogleGenAI();

    async function listWebhooks() {
      const webhooks = await client.webhooks.list();

      for (const wh of webhooks) {
        console.log(`${wh.id}: ${wh.name} -> ${wh.uri}`);
      }
    }

    listWebhooks();

### REST

    curl -X GET \
      "https://generativelanguage.googleapis.com/v1/webhooks" \
      -H "x-goog-api-key: $GEMINI_API_KEY"

### Update a webhook

Update an existing webhook's properties such as the display name, target URI, or
subscribed events.

### Python

    from google import genai

    client = genai.Client()

    updated_webhook = client.webhooks.update(
        id="<your_webhook_id>",
        subscribed_events=["batch.succeeded", "batch.failed", "batch.cancelled"],
    )

    print(f"Updated webhook: {updated_webhook.name}")

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const client = new GoogleGenAI();

    async function updateWebhook() {
      const updatedWebhook = await client.webhooks.update(
        "<your_webhook_id>",
        {
          subscribed_events: ["batch.succeeded", "batch.failed", "batch.cancelled"],
        }
      );

      console.log(`Updated webhook: ${updatedWebhook.name}`);
    }

    updateWebhook();

### REST

    curl -X PATCH \
      "https://generativelanguage.googleapis.com/v1/webhooks/<your_webhook_id>" \
      -H "Content-Type: application/json" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -d '{
        "subscribed_events": ["batch.succeeded", "batch.failed", "batch.cancelled"]
      }'

### Delete a webhook

Remove a webhook endpoint from the project. This stops future event deliveries
to that endpoint.

### Python

    from google import genai

    client = genai.Client()

    client.webhooks.delete(id="<your_webhook_id>")

    print("Webhook deleted.")

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const client = new GoogleGenAI();

    async function deleteWebhook() {
      await client.webhooks.delete("<your_webhook_id>");

      console.log("Webhook deleted.");
    }

    deleteWebhook();

### REST

    curl -X DELETE \
      "https://generativelanguage.googleapis.com/v1/webhooks/<your_webhook_id>" \
      -H "x-goog-api-key: $GEMINI_API_KEY"

### Rotate a signing secret

Rotate the signing secret for a webhook. You can configure whether previously
active secrets are revoked immediately or after a 24-hour grace period.

**IMPORTANT** : The new signing secret is returned **only once** at rotation
time. Store it securely before updating your verification logic.

### Python

    from google import genai
    from google.genai import types

    client = genai.Client()

    response = client.webhooks.rotate_signing_secret(
        id="<your_webhook_id>",
        revocation_behavior="REVOKE_PREVIOUS_SECRETS_AFTER_H24",
    )

    # Store response.secret securely, then update your server's verification config
    print("New signing secret generated. Update your server configuration.")

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const client = new GoogleGenAI();

    async function rotateSigningSecret() {
      const response = await client.webhooks.rotateSigningSecret(
        "<your_webhook_id>",
        {
          revocation_behavior: "REVOKE_PREVIOUS_SECRETS_AFTER_H24",
        }
      );

      // Store response.secret securely, then update your server's verification config
      console.log("New signing secret generated. Update your server configuration.");
    }

    rotateSigningSecret();

### REST

    curl -X POST \
      "https://generativelanguage.googleapis.com/v1/webhooks/<your_webhook_id>/rotate_secret" \
      -H "Content-Type: application/json" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -d '{
        "revocation_behavior": "REVOKE_PREVIOUS_SECRETS_AFTER_H24"
      }'

### Handle webhook requests on a server

When an event happens that you're subscribed to, your webhook URL will receive
an HTTP POST request. Your endpoint must respond with a 2xx status
code within a few seconds to avoid a retry. To ensure delivery, the Gemini API
automatically retries failed requests for 24 hours using exponential backoff.

Gemini strictly follows the [Standard Webhooks](https://github.com/standard-webhooks/standard-webhooks) specification for
security headers. Verify the payload on your server using the signed header
signatures and your stored static signing secret. See the [Webhook envelope](https://ai.google.dev/gemini-api/docs/webhooks#webhook-envelope) section for the payload information.

Here is an example using Flask for the HTTP listener:

### Python

    # pip install flask standardwebhooks
    import os
    from flask import Flask, request, jsonify
    # Standard verification wrapper for Standard Webhook Headers
    from standardwebhooks.webhooks import Webhook, WebhookVerificationError

    app = Flask(__name__)

    SIGNING_SECRET = os.environ.get('WEBHOOK_SIGNING_SECRET')

    @app.route('/gemini-callback', methods=['POST'])
    def gemini_callback():
        payload = request.get_data(as_text=True)
        headers = request.headers

        try:
            wh = Webhook(SIGNING_SECRET)
            event = wh.verify(payload, headers)
        except WebhookVerificationError as e:
            return jsonify({"error": "Signature invalid"}), 400

        # Process thin payload contents
        if event.get("type") == "batch.succeeded":
            print(f"Batch completed! ID: {event['data']['id']}")
            if event["data"].get("output_file_uri"):
                # For batch jobs with input file
                print(f"Batch file: {event['data']['output_file_uri']}")
        elif event.get("type") == "interaction.completed":
            print(f"Interaction completed! ID: {event['data']['id']}")
        elif event.get("type") == "video.generated":
            print(f"Video generated! URI: {event['data']['output_file_uri']}")

        return jsonify({"status": "received"}), 200

    if __name__ == "__main__":
        app.run(port=8000)

### JavaScript

    // npm install standardwebhooks
    import { Webhook } from "standardwebhooks";
    import express from "express";

    const app = express();
    const client = new GoogleGenAI({ webhookSecret: process.env.WEBHOOK_SIGNING_SECRET });

    // Don't use express.json() because signature verification needs the raw text body
    app.use(express.text({ type: "application/json" }));

    app.post("/gemini-callback", async (req, res) => {
      const payload = await req.text();
            const headers: Record<string, string> = {};
            req.headers.forEach((value, key) => {
                headers[key] = value;
            });

            try {
                const wh = new Webhook(process.env.WEBHOOK_SIGNING_SECRET);
                const event = wh.verify(payload, headers) as Record<string, any>;
        console.log(`Event type: ${event.type}, data: ${JSON.stringify(event.data)}`);

                // Process thin payload contents
                if (event.type === "batch.succeeded") {
                    console.log(`Batch completed! ID: ${event.data.id}`);
                    if (event.data.output_file_uri) {
                        // For batch jobs with input file
                        console.log(`Batch file: ${event.data.output_file_uri}`);
                    }
                } else if (event.type === "interaction.completed") {
                    console.log(`Interaction completed! ID: ${event.data.id}`);
                } else if (event.type === "video.generated") {
                    console.log(`Video generated! URI: ${event.data.output_file_uri}`);
                }

                res.status(200).json({ status: "received" });
            } catch (e) {
                console.error("Webhook verification failed:", e);
                res.status(400).send("Invalid signature");
            }
    });

    app.listen(8000, () => {
      console.log("Webhook server is running on port 8000");
    });

## Dynamic webhooks

Dynamic webhooks allow you to bind a webhook endpoint to a **specific request
configuration**, ideal for agent-orchestration queues. Dynamic webhooks leverage
asymmetric public-key JWKS signatures instead of symmetric secrets.

### Submit a dynamic request

Add a `webhook_config` when triggering an asynchronous job (e.g., creating a
Batch).

### Python

    # This will only work for SDK newer than 2.0.0
    from google import genai

    client = genai.Client()

    response = client.interactions.create(
        model='gemini-3.6-flash',
        input='Tell me a short joke about programming.',
        background=True, # Required when webhook_config is specified
        webhook_config={
            'uris': ["https://my-api.com/gemini-webhook-dynamic"],
            'user_metadata': {"job_group": "nightly-eval", "priority": "high"}
        }
    )

    print(f"Interaction created! ID: {response.id}")
    print(f"Status: {response.status}")

### JavaScript

    // This will only work for SDK newer than 2.0.0
    import { GoogleGenAI } from "@google/genai";

    const client = new GoogleGenAI();

    async function createInteractionWithWebhook() {
      const response = await client.interactions.create({
        model: "gemini-3.6-flash",
        input: "Tell me a short joke about programming.",
        background: true, // Required when webhook_config is specified
        webhook_config: {
          uris: ["https://my-api.com/gemini-webhook-dynamic"],
          user_metadata: { job_group: "nightly-eval", priority: "high" },
        },
      });

      console.log(`Interaction created! ID: ${response.id}`);
      console.log(`Status: ${response.status}`);
    }

    createInteractionWithWebhook();

### REST

    # Specifies the API revision to avoid breaking changes when they become default
    curl -X POST \
      "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "Content-Type: application/json" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -d '{
        "model": "gemini-3.6-flash",
        "input": "Tell me a short joke about programming.",
        "background": true,
        "webhook_config": {
          "uris": ["https://my-api.com/gemini-webhook-dynamic"],
          "user_metadata": {"job_group": "nightly-eval", "priority": "high"}
        }
      }'

### Verify dynamic signatures (JWKS)

Dynamic webhook requests emit a JSON Web Token (JWT) signature. Your listener
must extract the signature and verify it using [Google's public certificate
endpoints](https://www.googleapis.com/oauth2/v3/certs).

### Python

    import jwt
    import requests
    from flask import Flask, request, jsonify

    app = Flask(__name__)

    # Google public cert list endpoint
    JWKS_URI = "https://generativelanguage.googleapis.com/.well-known/jwks.json"

    def load_google_public_key(kid):
        response = requests.get(JWKS_URI).json()
        for key_item in response.get('keys', []):
            if key_item.get('kid') == kid:
                # Convert JWK to Cert wrapper
                return jwt.algorithms.RSAAlgorithm.from_jwk(key_item)
        return None

    @app.route('/gemini-webhook-dynamic', methods=['POST'])
    def dynamic_handler():
        payload = request.get_data(as_text=True)
        headers = request.headers

        token = headers.get('Webhook-Signature')
        if not token:
            return jsonify({"error": "No signature header"}), 400

        try:
            # Extract kid from JWT header
            unverified_headers = jwt.get_unverified_header(token)
            pub_key = load_google_public_key(unverified_headers.get('kid'))

            if not pub_key:
                return jsonify({"error": "Key cert not found"}), 400

            # Verify Signature against expected audience (e.g., your project client ID)
            event = jwt.decode(
                token,
                pub_key,
                algorithms=["RS256"],
                audience="your-configured-audience"
            )
        except Exception as e:
            return jsonify({"error": "Invalid Dynamic signature", "details": str(e)}), 400

        print("Verified Dynamic payload success.")
        return jsonify({"status": "received"}), 200

### JavaScript

    import { GoogleGenAI } from "@google/genai";
    import express from "express";
    import jwt from "jsonwebtoken";
    import jwksClient from "jwks-rsa";

    const app = express();
    app.use(express.text({ type: 'application/json' }));

    const client = jwksClient({
      jwksUri: "https://generativelanguage.googleapis.com/.well-known/jwks.json"
    });

    function getKey(header, callback) {
      client.getSigningKey(header.kid, (err, key) => {
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
      });
    }

    app.post('/gemini-webhook-dynamic', (req, res) => {
      const token = req.headers['webhook-signature'];

      if (!token) {
        return res.status(400).json({ error: "No signature header" });
      }

      jwt.verify(
        token,
        getKey,
        {
          algorithms: ["RS256"],
          audience: "your-configured-audience"
        },
        (err, decoded) => {
          if (err) {
            return res.status(400).json({ error: "Invalid Dynamic signature", details: err.message });
          }

          console.log("Verified Dynamic payload success.");
          res.status(200).json({ status: "received" });
        }
      );
    });

## Webhook envelope

To avoid bandwidth congestion, Gemini webhooks use a **thin payload** model to
deliver data.
deliveries send a snapshot containing status details and pointers to results,
rather than the raw output file itself.

Here is an example payload format:

    {
      "type": "batch.succeeded",
      "version": "v1",
      "timestamp": "2026-01-22T12:00:00Z",
      "data": {
        "id": "batch_123456",
        "output_file_uri": "gs://my-bucket/results.jsonl"
      }
    }

## Event catalog reference

The following events are triggered for supporting jobs:

| Event type | Trigger | Payload item (`data`) |
|---|---|---|
| `batch.succeeded` | Processing finished successfully. | `id`, `output_file_uri` |
| `batch.cancelled` | User cancelled request | `id` |
| `batch.expired` | Batch has not been processed (finished) in 24h timeframe | `id` |
| `batch.failed` | Batch job failed (system or validation error). | `id`, `error_code`, `error_message` |
| `interaction.requires_action` | Function call, user needs to do something | `id` |
| `interaction.completed` | LRO in interactions API succeeded | `id` |
| `interaction.failed` | LRO in interactions API failed (system or validation error). | `id`, `error_code`, `error_message` |
| `interaction.cancelled` | LRO in interactions API cancelled | `id` |
| `video.generated` | Video generation LRO completed. | `id`, `output_file_uri`, `file_name` |

## Best practices

To ensure reliable, scalable operation:

- **Strict replay protection check** : All requests carry a `webhook-timestamp` header. Always validate this timestamp on your server configuration layer to reject payloads older than **5 minutes** (to mitigate replay attacks).
- **Process asynchronously** : Respond with `2xx OK` immediately upon valid signature detection, and queue parsing operations internally. Prolonged listener hold times will trigger a delivery retry cycle.
- **Deduplication handling** : Standard webhooks deliver "At-least-once". Use the consistent `webhook-id` header to handle potential duplicates in higher congestion flows.

## What's next?

- [Batch API](https://ai.google.dev/gemini-api/docs/batch-api): Utilize webhooks to automate high volume endpoints.