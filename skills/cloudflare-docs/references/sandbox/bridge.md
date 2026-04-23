---
title: Sandbox bridge
description: Deploy the sandbox bridge Worker to control Cloudflare Sandboxes over HTTP from any language or platform.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Python ](https://developers.cloudflare.com/search/?tags=Python)[ Node.js ](https://developers.cloudflare.com/search/?tags=Node.js)[ Docker ](https://developers.cloudflare.com/search/?tags=Docker) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/sandbox/bridge/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Sandbox bridge

**Last reviewed:**  10 days ago 

The sandbox bridge is a reference-implementation Cloudflare Worker that exposes the [Sandbox SDK](https://developers.cloudflare.com/sandbox/api/) as an HTTP API. Any HTTP client — Python script, Node.js service, CI pipeline — can create and control sandboxes without writing a Worker.

## Why use the bridge

The Sandbox SDK is designed for use within Cloudflare Workers. If your application runs outside of the Workers ecosystem, it cannot interact with sandboxes directly.

The bridge exposes the Sandbox SDK as a standard HTTP API so you can create and control sandboxes from any language or platform.

Key [Sandbox SDK methods](https://developers.cloudflare.com/sandbox/api/) map to individual HTTP endpoints. The bridge adds authentication, input validation, workspace path containment, and an optional [warm pool](https://developers.cloudflare.com/sandbox/bridge/http-api/#warm-pool) for instant container boot.

## Deploy

Deploy the bridge Worker to your Cloudflare account:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/sandbox-sdk/tree/main/bridge/worker)

The button deploys the Worker and generates a `SANDBOX_API_KEY` secret for authentication. When deployment finishes, note your Worker URL and API key — every example on this page uses them.

Manual deployment

If you prefer to deploy step by step, scaffold the project and deploy manually.

**Prerequisites:**

* A [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages) with the Containers / Sandbox beta enabled.
* [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and npm.
* [Docker ↗](https://www.docker.com/) running locally — `wrangler deploy` builds a container image from the bridge `Dockerfile`.

**Steps:**

1. Scaffold the bridge project:  
Terminal window  
```  
npm create cloudflare sandbox-bridge --template=cloudflare/sandbox-sdk/bridge/worker  
cd sandbox-bridge  
```
2. Authenticate with Cloudflare:  
Terminal window  
```  
npx wrangler login  
```
3. Set the API key secret. Choose any strong token value — clients must send this as a Bearer token:  
Terminal window  
```  
openssl rand -hex 32 | tee /dev/stderr | npx wrangler secret put SANDBOX_API_KEY  
```  
The key is printed to your terminal and piped to Wrangler. Save it — you will need it to authenticate API requests.
4. Deploy the Worker:  
Terminal window  
```  
npx wrangler deploy  
```
5. Verify the deployment:  
Terminal window  
```  
curl https://cloudflare-sandbox-bridge.<your-subdomain>.workers.dev/health  
```  
You should see `{"ok":true}`.

### Container image

The bridge `Dockerfile` extends the [cloudflare/sandbox ↗](https://hub.docker.com/r/cloudflare/sandbox) base image and pre-installs common agent tooling:

* **Languages**: Python 3.13, Node.js, Bun
* **Tools**: git, ripgrep, curl, wget, jq, tar, sed, gawk, procps

Customize the `Dockerfile` to add languages, system packages, or tools your workloads need.

## Usage

All examples assume the following environment variables are set:

Terminal window

```

export SANDBOX_API_URL=https://cloudflare-sandbox-bridge.<your-subdomain>.workers.dev

export SANDBOX_API_KEY=<your-token>


```

### Create a sandbox and run a command

* [ curl ](#tab-panel-8656)
* [ Node.js ](#tab-panel-8657)
* [ Python ](#tab-panel-8658)

Terminal window

```

# Create a sandbox

SANDBOX_ID=$(curl -s -X POST "$SANDBOX_API_URL/v1/sandbox" \

  -H "Authorization: Bearer $SANDBOX_API_KEY" | jq -r '.id')


echo "Sandbox ID: $SANDBOX_ID"


# Run a command

curl -s -X POST "$SANDBOX_API_URL/v1/sandbox/$SANDBOX_ID/exec" \

  -H "Authorization: Bearer $SANDBOX_API_KEY" \

  -H "Content-Type: application/json" \

  -d '{"argv": ["sh", "-lc", "echo hello from the sandbox"], "timeout_ms": 10000}'


# Destroy the sandbox when done

curl -s -X DELETE "$SANDBOX_API_URL/v1/sandbox/$SANDBOX_ID" \

  -H "Authorization: Bearer $SANDBOX_API_KEY"


```

Explain Code

JavaScript

```

const API_URL = process.env.SANDBOX_API_URL;

const API_KEY = process.env.SANDBOX_API_KEY;


const headers = {

  Authorization: `Bearer ${API_KEY}`,

  "Content-Type": "application/json",

};


// Create a sandbox

const { id } = await fetch(`${API_URL}/v1/sandbox`, {

  method: "POST",

  headers,

}).then((r) => r.json());


console.log(`Sandbox ID: ${id}`);


// Run a command

// Response is a text/event-stream with the following SSE events:

//   event: stdout  — data is a base64-encoded output chunk

//   event: stderr  — data is a base64-encoded error chunk

//   event: exit    — data is JSON: {"exit_code": 0}

//   event: error   — data is JSON: {"error": "...", "code": "..."}

const execRes = await fetch(`${API_URL}/v1/sandbox/${id}/exec`, {

  method: "POST",

  headers,

  body: JSON.stringify({

    argv: ["sh", "-lc", "echo hello from the sandbox"],

    timeout_ms: 10000,

  }),

});


console.log(await execRes.text());


// Destroy the sandbox when done

await fetch(`${API_URL}/v1/sandbox/${id}`, {

  method: "DELETE",

  headers,

});


```

Explain Code

Python

```

# /// script

# dependencies = ["httpx"]

# ///

import os

import httpx


API_URL = os.environ["SANDBOX_API_URL"]

API_KEY = os.environ["SANDBOX_API_KEY"]


headers = {"Authorization": f"Bearer {API_KEY}"}


# Create a sandbox

resp = httpx.post(f"{API_URL}/v1/sandbox", headers=headers)

sandbox_id = resp.json()["id"]

print(f"Sandbox ID: {sandbox_id}")


# Run a command

# Response is a text/event-stream with the following SSE events:

#   event: stdout  — data is a base64-encoded output chunk

#   event: stderr  — data is a base64-encoded error chunk

#   event: exit    — data is JSON: {"exit_code": 0}

#   event: error   — data is JSON: {"error": "...", "code": "..."}

exec_resp = httpx.post(

    f"{API_URL}/v1/sandbox/{sandbox_id}/exec",

    headers=headers,

    json={

        "argv": ["sh", "-lc", "echo hello from the sandbox"],

        "timeout_ms": 10000,

    },

)

print(exec_resp.text)


# Destroy the sandbox when done

httpx.delete(f"{API_URL}/v1/sandbox/{sandbox_id}", headers=headers)


```

Explain Code

### Write and read files

* [ curl ](#tab-panel-8659)
* [ Node.js ](#tab-panel-8660)
* [ Python ](#tab-panel-8661)

Terminal window

```

# Write a file

curl -s -X PUT "$SANDBOX_API_URL/v1/sandbox/$SANDBOX_ID/file/workspace/hello.py" \

  -H "Authorization: Bearer $SANDBOX_API_KEY" \

  --data-binary 'print("hello world")'


# Read a file

curl -s "$SANDBOX_API_URL/v1/sandbox/$SANDBOX_ID/file/workspace/hello.py" \

  -H "Authorization: Bearer $SANDBOX_API_KEY"


```

JavaScript

```

// Write a file

await fetch(`${API_URL}/v1/sandbox/${id}/file/workspace/hello.py`, {

  method: "PUT",

  headers,

  body: 'print("hello world")',

});


// Read a file

const content = await fetch(

  `${API_URL}/v1/sandbox/${id}/file/workspace/hello.py`,

  { headers },

).then((r) => r.text());


console.log(content);


```

Explain Code

Python

```

# /// script

# dependencies = ["httpx"]

# ///

import os

import httpx


API_URL = os.environ["SANDBOX_API_URL"]

API_KEY = os.environ["SANDBOX_API_KEY"]

SANDBOX_ID = os.environ["SANDBOX_ID"]  # from the "Create a sandbox" step

headers = {"Authorization": f"Bearer {API_KEY}"}


# Write a file

httpx.put(

    f"{API_URL}/v1/sandbox/{SANDBOX_ID}/file/workspace/hello.py",

    headers=headers,

    content=b'print("hello world")',

)


# Read a file

content = httpx.get(

    f"{API_URL}/v1/sandbox/{SANDBOX_ID}/file/workspace/hello.py",

    headers=headers,

).text

print(content)


```

Explain Code

## Keep the bridge updated

The bulk of the bridge logic is in the `@cloudflare/sandbox` package. To pull in the latest improvements:

1. Update the SDK dependency:  
Terminal window  
```  
npm update @cloudflare/sandbox  
```
2. Redeploy:  
Terminal window  
```  
npx wrangler deploy  
```

Check the [sandbox-sdk releases ↗](https://github.com/cloudflare/sandbox-sdk/releases) for changes to the `Dockerfile` or bridge configuration that may require manual updates.

## Source code and examples

The bridge source code and examples are available on GitHub:

* [Bridge source ↗](https://github.com/cloudflare/sandbox-sdk/tree/main/bridge) — Worker, Dockerfile, deploy script, and OpenAPI schema.
* [Workspace chat example ↗](https://github.com/cloudflare/sandbox-sdk/tree/main/bridge/examples/workspace-chat) — Full-stack chat application with a file browser sidebar.
* [Basic example ↗](https://github.com/cloudflare/sandbox-sdk/tree/main/bridge/examples/basic) — One-shot Python coding agent using the OpenAI Agents SDK.

## Related resources

* [HTTP API reference](https://developers.cloudflare.com/sandbox/bridge/http-api/) — Complete route reference for the bridge API.
* [Getting started](https://developers.cloudflare.com/sandbox/get-started/) — Build your first sandbox application directly on Workers.
* [Architecture](https://developers.cloudflare.com/sandbox/concepts/architecture/) — How the Sandbox SDK layers Workers, Durable Objects, and Containers.
* [API reference](https://developers.cloudflare.com/sandbox/api/) — Complete Sandbox SDK method reference.
* [OpenAI Agents SDK tutorial](https://developers.cloudflare.com/sandbox/tutorials/openai-agents/) — Build a Python coding agent with the bridge.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/bridge/","name":"Sandbox bridge"}}]}
```
