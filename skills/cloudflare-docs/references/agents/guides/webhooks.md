---
title: Webhooks
description: Receive webhook events from external services and route them to dedicated agent instances. Each webhook source (repository, customer, device) can have its own agent with isolated state, persistent storage, and real-time client connections.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/agents/guides/webhooks.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Webhooks

Receive webhook events from external services and route them to dedicated agent instances. Each webhook source (repository, customer, device) can have its own agent with isolated state, persistent storage, and real-time client connections.

## Quick start

* [  JavaScript ](#tab-panel-2984)
* [  TypeScript ](#tab-panel-2985)

JavaScript

```

import { Agent, getAgentByName, routeAgentRequest } from "agents";


// Agent that handles webhooks for a specific entity

export class WebhookAgent extends Agent {

  async onRequest(request) {

    if (request.method !== "POST") {

      return new Response("Method not allowed", { status: 405 });

    }


    // Verify the webhook signature

    const signature = request.headers.get("X-Hub-Signature-256");

    const body = await request.text();


    if (

      !(await this.verifySignature(body, signature, this.env.WEBHOOK_SECRET))

    ) {

      return new Response("Invalid signature", { status: 401 });

    }


    // Process the webhook payload

    const payload = JSON.parse(body);

    await this.processEvent(payload);


    return new Response("OK", { status: 200 });

  }


  async verifySignature(payload, signature, secret) {

    if (!signature) return false;


    const encoder = new TextEncoder();

    const key = await crypto.subtle.importKey(

      "raw",

      encoder.encode(secret),

      { name: "HMAC", hash: "SHA-256" },

      false,

      ["sign"],

    );


    const signatureBytes = await crypto.subtle.sign(

      "HMAC",

      key,

      encoder.encode(payload),

    );

    const expected = `sha256=${Array.from(new Uint8Array(signatureBytes))

      .map((b) => b.toString(16).padStart(2, "0"))

      .join("")}`;


    return signature === expected;

  }


  async processEvent(payload) {

    // Store event, update state, trigger actions...

  }

}


// Route webhooks to the right agent instance

export default {

  async fetch(request, env) {

    const url = new URL(request.url);


    // Webhook endpoint: POST /webhooks/:entityId

    if (url.pathname.startsWith("/webhooks/") && request.method === "POST") {

      const entityId = url.pathname.split("/")[2];

      const agent = await getAgentByName(env.WebhookAgent, entityId);

      return agent.fetch(request);

    }


    // Default routing for WebSocket connections

    return (

      (await routeAgentRequest(request, env)) ||

      new Response("Not found", { status: 404 })

    );

  },

};


```

TypeScript

```

import { Agent, getAgentByName, routeAgentRequest } from "agents";


// Agent that handles webhooks for a specific entity

export class WebhookAgent extends Agent {

  async onRequest(request: Request): Promise<Response> {

    if (request.method !== "POST") {

      return new Response("Method not allowed", { status: 405 });

    }


    // Verify the webhook signature

    const signature = request.headers.get("X-Hub-Signature-256");

    const body = await request.text();


    if (

      !(await this.verifySignature(body, signature, this.env.WEBHOOK_SECRET))

    ) {

      return new Response("Invalid signature", { status: 401 });

    }


    // Process the webhook payload

    const payload = JSON.parse(body);

    await this.processEvent(payload);


    return new Response("OK", { status: 200 });

  }


  private async verifySignature(

    payload: string,

    signature: string | null,

    secret: string,

  ): Promise<boolean> {

    if (!signature) return false;


    const encoder = new TextEncoder();

    const key = await crypto.subtle.importKey(

      "raw",

      encoder.encode(secret),

      { name: "HMAC", hash: "SHA-256" },

      false,

      ["sign"],

    );


    const signatureBytes = await crypto.subtle.sign(

      "HMAC",

      key,

      encoder.encode(payload),

    );

    const expected = `sha256=${Array.from(new Uint8Array(signatureBytes))

      .map((b) => b.toString(16).padStart(2, "0"))

      .join("")}`;


    return signature === expected;

  }


  private async processEvent(payload: unknown) {

    // Store event, update state, trigger actions...

  }

}


// Route webhooks to the right agent instance

export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    const url = new URL(request.url);


    // Webhook endpoint: POST /webhooks/:entityId

    if (url.pathname.startsWith("/webhooks/") && request.method === "POST") {

      const entityId = url.pathname.split("/")[2];

      const agent = await getAgentByName(env.WebhookAgent, entityId);

      return agent.fetch(request);

    }


    // Default routing for WebSocket connections

    return (

      (await routeAgentRequest(request, env)) ||

      new Response("Not found", { status: 404 })

    );

  },

} satisfies ExportedHandler<Env>;


```

## Use cases

Webhooks combined with agents enable patterns where each external entity gets its own isolated, stateful agent instance.

### Developer tools

| Use case                 | Description                                                                |
| ------------------------ | -------------------------------------------------------------------------- |
| **GitHub Repo Monitor**  | One agent per repository tracking commits, PRs, issues, and stars          |
| **CI/CD Pipeline Agent** | React to build/deploy events, notify on failures, track deployment history |
| **Linear/Jira Tracker**  | Auto-triage issues, assign based on content, track resolution times        |

### E-commerce and payments

| Use case                   | Description                                                           |
| -------------------------- | --------------------------------------------------------------------- |
| **Stripe Customer Agent**  | One agent per customer tracking payments, subscriptions, and disputes |
| **Shopify Order Agent**    | Order lifecycle from creation to fulfillment with inventory sync      |
| **Payment Reconciliation** | Match webhook events to internal records, flag discrepancies          |

### Communication and notifications

| Use case             | Description                                                             |
| -------------------- | ----------------------------------------------------------------------- |
| **Twilio SMS/Voice** | Conversational agents triggered by inbound messages or calls            |
| **Slack Bot**        | Respond to slash commands, button clicks, and interactive messages      |
| **Email Tracking**   | SendGrid/Mailgun delivery events, bounce handling, engagement analytics |

### IoT and infrastructure

| Use case              | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| **Device Telemetry**  | One agent per device processing sensor data streams          |
| **Alert Aggregation** | Collect alerts from PagerDuty, Datadog, or custom monitoring |
| **Home Automation**   | React to IFTTT/Zapier triggers with persistent state         |

### SaaS integrations

| Use case             | Description                                                     |
| -------------------- | --------------------------------------------------------------- |
| **CRM Sync**         | Salesforce/HubSpot contact and deal updates                     |
| **Calendar Agent**   | Google Calendar event notifications and scheduling              |
| **Form Submissions** | Typeform, Tally, or custom form webhooks with follow-up actions |

## Routing webhooks to agents

The key pattern is extracting an entity identifier from the webhook and using `getAgentByName()` to route to a dedicated agent instance.

### Extract entity from payload

Most webhooks include an identifier in the payload:

* [  JavaScript ](#tab-panel-2960)
* [  TypeScript ](#tab-panel-2961)

JavaScript

```

export default {

  async fetch(request, env) {

    if (request.method === "POST" && url.pathname === "/webhooks/github") {

      const payload = await request.clone().json();


      // Extract entity ID from payload

      const repoFullName = payload.repository?.full_name;

      if (!repoFullName) {

        return new Response("Missing repository", { status: 400 });

      }


      // Sanitize for use as agent name

      const agentName = repoFullName.toLowerCase().replace(/\//g, "-");


      // Route to dedicated agent

      const agent = await getAgentByName(env.RepoAgent, agentName);

      return agent.fetch(request);

    }

  },

};


```

TypeScript

```

export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    if (request.method === "POST" && url.pathname === "/webhooks/github") {

      const payload = await request.clone().json();


      // Extract entity ID from payload

      const repoFullName = payload.repository?.full_name;

      if (!repoFullName) {

        return new Response("Missing repository", { status: 400 });

      }


      // Sanitize for use as agent name

      const agentName = repoFullName.toLowerCase().replace(/\//g, "-");


      // Route to dedicated agent

      const agent = await getAgentByName(env.RepoAgent, agentName);

      return agent.fetch(request);

    }

  },

} satisfies ExportedHandler<Env>;


```

### Extract entity from URL

Alternatively, include the entity ID in the webhook URL:

* [  JavaScript ](#tab-panel-2956)
* [  TypeScript ](#tab-panel-2957)

JavaScript

```

// Webhook URL: https://your-worker.dev/webhooks/stripe/cus_123456

if (url.pathname.startsWith("/webhooks/stripe/")) {

  const customerId = url.pathname.split("/")[3]; // "cus_123456"

  const agent = await getAgentByName(env.StripeAgent, customerId);

  return agent.fetch(request);

}


```

TypeScript

```

// Webhook URL: https://your-worker.dev/webhooks/stripe/cus_123456

if (url.pathname.startsWith("/webhooks/stripe/")) {

  const customerId = url.pathname.split("/")[3]; // "cus_123456"

  const agent = await getAgentByName(env.StripeAgent, customerId);

  return agent.fetch(request);

}


```

### Extract entity from headers

Some services include identifiers in headers:

* [  JavaScript ](#tab-panel-2958)
* [  TypeScript ](#tab-panel-2959)

JavaScript

```

// Slack sends workspace info in headers

const teamId = request.headers.get("X-Slack-Team-Id");

if (teamId) {

  const agent = await getAgentByName(env.SlackAgent, teamId);

  return agent.fetch(request);

}


```

TypeScript

```

// Slack sends workspace info in headers

const teamId = request.headers.get("X-Slack-Team-Id");

if (teamId) {

  const agent = await getAgentByName(env.SlackAgent, teamId);

  return agent.fetch(request);

}


```

## Signature verification

Always verify webhook signatures to ensure requests are authentic. Most providers use HMAC-SHA256.

### HMAC-SHA256 pattern

* [  JavaScript ](#tab-panel-2970)
* [  TypeScript ](#tab-panel-2971)

JavaScript

```

async function verifySignature(payload, signature, secret) {

  if (!signature) return false;


  const encoder = new TextEncoder();

  const key = await crypto.subtle.importKey(

    "raw",

    encoder.encode(secret),

    { name: "HMAC", hash: "SHA-256" },

    false,

    ["sign"],

  );


  const signatureBytes = await crypto.subtle.sign(

    "HMAC",

    key,

    encoder.encode(payload),

  );


  const expected = `sha256=${Array.from(new Uint8Array(signatureBytes))

    .map((b) => b.toString(16).padStart(2, "0"))

    .join("")}`;


  // Use timing-safe comparison in production

  return signature === expected;

}


```

TypeScript

```

async function verifySignature(

  payload: string,

  signature: string | null,

  secret: string,

): Promise<boolean> {

  if (!signature) return false;


  const encoder = new TextEncoder();

  const key = await crypto.subtle.importKey(

    "raw",

    encoder.encode(secret),

    { name: "HMAC", hash: "SHA-256" },

    false,

    ["sign"],

  );


  const signatureBytes = await crypto.subtle.sign(

    "HMAC",

    key,

    encoder.encode(payload),

  );


  const expected = `sha256=${Array.from(new Uint8Array(signatureBytes))

    .map((b) => b.toString(16).padStart(2, "0"))

    .join("")}`;


  // Use timing-safe comparison in production

  return signature === expected;

}


```

### Provider-specific headers

| Provider | Signature Header      | Algorithm                    |
| -------- | --------------------- | ---------------------------- |
| GitHub   | X-Hub-Signature-256   | HMAC-SHA256                  |
| Stripe   | Stripe-Signature      | HMAC-SHA256 (with timestamp) |
| Twilio   | X-Twilio-Signature    | HMAC-SHA1                    |
| Slack    | X-Slack-Signature     | HMAC-SHA256 (with timestamp) |
| Shopify  | X-Shopify-Hmac-Sha256 | HMAC-SHA256 (base64)         |

## Processing webhooks

### The onRequest handler

Use `onRequest()` to handle incoming webhooks in your agent:

* [  JavaScript ](#tab-panel-2978)
* [  TypeScript ](#tab-panel-2979)

JavaScript

```

export class WebhookAgent extends Agent {

  async onRequest(request) {

    // 1. Validate method

    if (request.method !== "POST") {

      return new Response("Method not allowed", { status: 405 });

    }


    // 2. Get event type from headers

    const eventType = request.headers.get("X-Event-Type");


    // 3. Verify signature

    const signature = request.headers.get("X-Signature");

    const body = await request.text();


    if (!(await this.verifySignature(body, signature))) {

      return new Response("Invalid signature", { status: 401 });

    }


    // 4. Parse and process

    const payload = JSON.parse(body);

    await this.handleEvent(eventType, payload);


    // 5. Respond quickly

    return new Response("OK", { status: 200 });

  }


  async handleEvent(type, payload) {

    // Update state (broadcasts to connected clients)

    this.setState({

      ...this.state,

      lastEventType: type,

      lastEventTime: new Date().toISOString(),

    });


    // Store in SQL for history

    this

      .sql`INSERT INTO events (type, payload, timestamp) VALUES (${type}, ${JSON.stringify(payload)}, ${Date.now()})`;

  }

}


```

TypeScript

```

export class WebhookAgent extends Agent {

  async onRequest(request: Request): Promise<Response> {

    // 1. Validate method

    if (request.method !== "POST") {

      return new Response("Method not allowed", { status: 405 });

    }


    // 2. Get event type from headers

    const eventType = request.headers.get("X-Event-Type");


    // 3. Verify signature

    const signature = request.headers.get("X-Signature");

    const body = await request.text();


    if (!(await this.verifySignature(body, signature))) {

      return new Response("Invalid signature", { status: 401 });

    }


    // 4. Parse and process

    const payload = JSON.parse(body);

    await this.handleEvent(eventType, payload);


    // 5. Respond quickly

    return new Response("OK", { status: 200 });

  }


  private async handleEvent(type: string, payload: unknown) {

    // Update state (broadcasts to connected clients)

    this.setState({

      ...this.state,

      lastEventType: type,

      lastEventTime: new Date().toISOString(),

    });


    // Store in SQL for history

    this

      .sql`INSERT INTO events (type, payload, timestamp) VALUES (${type}, ${JSON.stringify(payload)}, ${Date.now()})`;

  }

}


```

## Storing webhook events

Use SQLite to persist webhook events for history and replay.

### Event table schema

* [  JavaScript ](#tab-panel-2968)
* [  TypeScript ](#tab-panel-2969)

JavaScript

```

class WebhookAgent extends Agent {

  async onStart() {

    this.sql`

      CREATE TABLE IF NOT EXISTS events (

        id TEXT PRIMARY KEY,

        type TEXT NOT NULL,

        action TEXT,

        title TEXT NOT NULL,

        description TEXT,

        url TEXT,

        actor TEXT,

        payload TEXT,

        timestamp TEXT NOT NULL

      )

    `;


    this.sql`

      CREATE INDEX IF NOT EXISTS idx_events_timestamp

      ON events(timestamp DESC)

    `;

  }

}


```

TypeScript

```

class WebhookAgent extends Agent {

  async onStart(): Promise<void> {

    this.sql`

      CREATE TABLE IF NOT EXISTS events (

        id TEXT PRIMARY KEY,

        type TEXT NOT NULL,

        action TEXT,

        title TEXT NOT NULL,

        description TEXT,

        url TEXT,

        actor TEXT,

        payload TEXT,

        timestamp TEXT NOT NULL

      )

    `;


    this.sql`

      CREATE INDEX IF NOT EXISTS idx_events_timestamp

      ON events(timestamp DESC)

    `;

  }

}


```

### Cleanup old events

Prevent unbounded growth by keeping only recent events:

* [  JavaScript ](#tab-panel-2962)
* [  TypeScript ](#tab-panel-2963)

JavaScript

```

// Keep last 100 events

this.sql`

  DELETE FROM events WHERE id NOT IN (

    SELECT id FROM events ORDER BY timestamp DESC LIMIT 100

  )

`;


// Or delete events older than 30 days

this.sql`

  DELETE FROM events

  WHERE timestamp < datetime('now', '-30 days')

`;


```

TypeScript

```

// Keep last 100 events

this.sql`

  DELETE FROM events WHERE id NOT IN (

    SELECT id FROM events ORDER BY timestamp DESC LIMIT 100

  )

`;


// Or delete events older than 30 days

this.sql`

  DELETE FROM events

  WHERE timestamp < datetime('now', '-30 days')

`;


```

### Query events

* [  JavaScript ](#tab-panel-2974)
* [  TypeScript ](#tab-panel-2975)

JavaScript

```

import { Agent, callable } from "agents";


class WebhookAgent extends Agent {

  @callable()

  getEvents(limit = 20) {

    return [

      ...this.sql`

      SELECT * FROM events

      ORDER BY timestamp DESC

      LIMIT ${limit}

    `,

    ];

  }


  @callable()

  getEventsByType(type, limit = 20) {

    return [

      ...this.sql`

      SELECT * FROM events

      WHERE type = ${type}

      ORDER BY timestamp DESC

      LIMIT ${limit}

    `,

    ];

  }

}


```

TypeScript

```

import { Agent, callable } from "agents";


class WebhookAgent extends Agent {

  @callable()

  getEvents(limit = 20) {

    return [

      ...this.sql`

      SELECT * FROM events

      ORDER BY timestamp DESC

      LIMIT ${limit}

    `,

    ];

  }


  @callable()

  getEventsByType(type: string, limit = 20) {

    return [

      ...this.sql`

      SELECT * FROM events

      WHERE type = ${type}

      ORDER BY timestamp DESC

      LIMIT ${limit}

    `,

    ];

  }

}


```

## Real-time broadcasting

When a webhook arrives, update agent state to automatically broadcast to connected WebSocket clients.

* [  JavaScript ](#tab-panel-2964)
* [  TypeScript ](#tab-panel-2965)

JavaScript

```

class WebhookAgent extends Agent {

  async processWebhook(eventType, payload) {

    // Update state - this automatically broadcasts to all connected clients

    this.setState({

      ...this.state,

      stats: payload.stats,

      lastEvent: {

        type: eventType,

        timestamp: new Date().toISOString(),

      },

    });

  }

}


```

TypeScript

```

class WebhookAgent extends Agent {

  private async processWebhook(eventType: string, payload: WebhookPayload) {

    // Update state - this automatically broadcasts to all connected clients

    this.setState({

      ...this.state,

      stats: payload.stats,

      lastEvent: {

        type: eventType,

        timestamp: new Date().toISOString(),

      },

    });

  }

}


```

On the client side:

```

import { useAgent } from "agents/react";


function Dashboard() {

  const [state, setState] = useState(null);


  const agent = useAgent({

    agent: "webhook-agent",

    name: "my-entity-id",

    onStateUpdate: (newState) => {

      setState(newState); // Automatically updates when webhooks arrive

    },

  });


  return <div>Last event: {state?.lastEvent?.type}</div>;

}


```

## Patterns

### Event deduplication

Prevent processing duplicate events using event IDs:

* [  JavaScript ](#tab-panel-2972)
* [  TypeScript ](#tab-panel-2973)

JavaScript

```

class WebhookAgent extends Agent {

  async handleEvent(eventId, payload) {

    // Check if already processed

    const existing = [

      ...this.sql`

      SELECT id FROM events WHERE id = ${eventId}

    `,

    ];


    if (existing.length > 0) {

      console.log(`Event ${eventId} already processed, skipping`);

      return;

    }


    // Process and store

    await this.processPayload(payload);

    this.sql`INSERT INTO events (id, ...) VALUES (${eventId}, ...)`;

  }

}


```

TypeScript

```

class WebhookAgent extends Agent {

  async handleEvent(eventId: string, payload: unknown) {

    // Check if already processed

    const existing = [

      ...this.sql`

      SELECT id FROM events WHERE id = ${eventId}

    `,

    ];


    if (existing.length > 0) {

      console.log(`Event ${eventId} already processed, skipping`);

      return;

    }


    // Process and store

    await this.processPayload(payload);

    this.sql`INSERT INTO events (id, ...) VALUES (${eventId}, ...)`;

  }

}


```

### Respond quickly, process asynchronously

Webhook providers expect fast responses. Use the queue for heavy processing:

* [  JavaScript ](#tab-panel-2976)
* [  TypeScript ](#tab-panel-2977)

JavaScript

```

class WebhookAgent extends Agent {

  async onRequest(request) {

    const payload = await request.json();


    // Quick validation

    if (!this.isValid(payload)) {

      return new Response("Invalid", { status: 400 });

    }


    // Queue heavy processing

    await this.queue("processWebhook", payload);


    // Respond immediately

    return new Response("Accepted", { status: 202 });

  }


  async processWebhook(payload) {

    // Heavy processing happens here, after response sent

    await this.enrichData(payload);

    await this.notifyDownstream(payload);

    await this.updateAnalytics(payload);

  }

}


```

TypeScript

```

class WebhookAgent extends Agent {

  async onRequest(request: Request): Promise<Response> {

    const payload = await request.json();


    // Quick validation

    if (!this.isValid(payload)) {

      return new Response("Invalid", { status: 400 });

    }


    // Queue heavy processing

    await this.queue("processWebhook", payload);


    // Respond immediately

    return new Response("Accepted", { status: 202 });

  }


  async processWebhook(payload: WebhookPayload) {

    // Heavy processing happens here, after response sent

    await this.enrichData(payload);

    await this.notifyDownstream(payload);

    await this.updateAnalytics(payload);

  }

}


```

### Multi-provider routing

Handle webhooks from multiple services in one Worker:

* [  JavaScript ](#tab-panel-2982)
* [  TypeScript ](#tab-panel-2983)

JavaScript

```

export default {

  async fetch(request, env) {

    const url = new URL(request.url);


    if (request.method === "POST") {

      // GitHub webhooks

      if (url.pathname.startsWith("/webhooks/github/")) {

        const payload = await request.clone().json();

        const repoName = payload.repository?.full_name?.replace("/", "-");

        const agent = await getAgentByName(env.GitHubAgent, repoName);

        return agent.fetch(request);

      }


      // Stripe webhooks

      if (url.pathname.startsWith("/webhooks/stripe/")) {

        const payload = await request.clone().json();

        const customerId = payload.data?.object?.customer;

        const agent = await getAgentByName(env.StripeAgent, customerId);

        return agent.fetch(request);

      }


      // Slack webhooks

      if (url.pathname === "/webhooks/slack") {

        const teamId = request.headers.get("X-Slack-Team-Id");

        const agent = await getAgentByName(env.SlackAgent, teamId);

        return agent.fetch(request);

      }

    }


    return (

      (await routeAgentRequest(request, env)) ??

      new Response("Not found", { status: 404 })

    );

  },

};


```

TypeScript

```

export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    const url = new URL(request.url);


    if (request.method === "POST") {

      // GitHub webhooks

      if (url.pathname.startsWith("/webhooks/github/")) {

        const payload = await request.clone().json();

        const repoName = payload.repository?.full_name?.replace("/", "-");

        const agent = await getAgentByName(env.GitHubAgent, repoName);

        return agent.fetch(request);

      }


      // Stripe webhooks

      if (url.pathname.startsWith("/webhooks/stripe/")) {

        const payload = await request.clone().json();

        const customerId = payload.data?.object?.customer;

        const agent = await getAgentByName(env.StripeAgent, customerId);

        return agent.fetch(request);

      }


      // Slack webhooks

      if (url.pathname === "/webhooks/slack") {

        const teamId = request.headers.get("X-Slack-Team-Id");

        const agent = await getAgentByName(env.SlackAgent, teamId);

        return agent.fetch(request);

      }

    }


    return (

      (await routeAgentRequest(request, env)) ??

      new Response("Not found", { status: 404 })

    );

  },

} satisfies ExportedHandler<Env>;


```

## Sending outgoing webhooks

Agents can also send webhooks to external services:

* [  JavaScript ](#tab-panel-2980)
* [  TypeScript ](#tab-panel-2981)

JavaScript

```

export class NotificationAgent extends Agent {

  async notifySlack(message) {

    const response = await fetch(this.env.SLACK_WEBHOOK_URL, {

      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({ text: message }),

    });


    if (!response.ok) {

      throw new Error(`Slack notification failed: ${response.status}`);

    }

  }


  async sendSignedWebhook(url, payload) {

    const body = JSON.stringify(payload);

    const signature = await this.sign(body, this.env.WEBHOOK_SECRET);


    await fetch(url, {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

        "X-Signature": signature,

      },

      body,

    });

  }

}


```

TypeScript

```

export class NotificationAgent extends Agent {

  async notifySlack(message: string) {

    const response = await fetch(this.env.SLACK_WEBHOOK_URL, {

      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({ text: message }),

    });


    if (!response.ok) {

      throw new Error(`Slack notification failed: ${response.status}`);

    }

  }


  async sendSignedWebhook(url: string, payload: unknown) {

    const body = JSON.stringify(payload);

    const signature = await this.sign(body, this.env.WEBHOOK_SECRET);


    await fetch(url, {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

        "X-Signature": signature,

      },

      body,

    });

  }

}


```

## Security best practices

1. **Always verify signatures** \- Never trust unverified webhooks.
2. **Use environment secrets** \- Store secrets with `wrangler secret put`, not in code.
3. **Respond quickly** \- Return 200/202 within seconds to avoid retries.
4. **Validate payloads** \- Check required fields before processing.
5. **Log rejections** \- Track invalid signatures for security monitoring.
6. **Use HTTPS** \- Webhook URLs should always use TLS.

* [  JavaScript ](#tab-panel-2966)
* [  TypeScript ](#tab-panel-2967)

JavaScript

```

// Store secrets securely

// wrangler secret put GITHUB_WEBHOOK_SECRET


// Access in agent

const secret = this.env.GITHUB_WEBHOOK_SECRET;


```

TypeScript

```

// Store secrets securely

// wrangler secret put GITHUB_WEBHOOK_SECRET


// Access in agent

const secret = this.env.GITHUB_WEBHOOK_SECRET;


```

## Common webhook providers

| Provider | Documentation                                                                                                  |
| -------- | -------------------------------------------------------------------------------------------------------------- |
| GitHub   | [Webhook events and payloads ↗](https://docs.github.com/en/webhooks)                                           |
| Stripe   | [Webhook signatures ↗](https://stripe.com/docs/webhooks/signatures)                                            |
| Twilio   | [Validate webhook requests ↗](https://www.twilio.com/docs/usage/webhooks/webhooks-security)                    |
| Slack    | [Verifying requests ↗](https://api.slack.com/authentication/verifying-requests-from-slack)                     |
| Shopify  | [Webhook verification ↗](https://shopify.dev/docs/apps/webhooks/configuration/https#step-5-verify-the-webhook) |
| SendGrid | [Event webhook ↗](https://docs.sendgrid.com/for-developers/tracking-events/getting-started-event-webhook)      |
| Linear   | [Webhooks ↗](https://developers.linear.app/docs/graphql/webhooks)                                              |

## Next steps

[ Queue tasks ](https://developers.cloudflare.com/agents/api-reference/queue-tasks/) Background task processing. 

[ Email routing ](https://developers.cloudflare.com/agents/api-reference/email/) Handle inbound emails in your agent. 

[ Agents API ](https://developers.cloudflare.com/agents/api-reference/agents-api/) Complete API reference for the Agents SDK. 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/guides/","name":"Guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/guides/webhooks/","name":"Webhooks"}}]}
```
