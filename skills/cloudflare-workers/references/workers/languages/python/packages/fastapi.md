---
description: Build Python Workers APIs using FastAPI with the built-in ASGI server.
title: FastAPI
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# FastAPI

Last updated Aug 28, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/languages/python/packages/fastapi/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[FastAPI ↗](https://fastapi.tiangolo.com/) is supported in Python Workers.

FastAPI applications use a protocol called the [Asynchronous Server Gateway Interface (ASGI) ↗](https://asgi.readthedocs.io/en/latest/). This means that FastAPI never reads from or writes to a socket itself. An ASGI application expects to be hooked up to an ASGI server, typically [uvicorn ↗](https://uvicorn.dev/). The ASGI server handles all of the raw sockets on the application’s behalf.

The Python Workers provide [an ASGI server ↗](https://github.com/cloudflare/workers-py/blob/main/packages/runtime-sdk/src/workers/asgi.py)that you can use directly in your Python Worker, which lets you use FastAPI in Python Workers.

## Quick Start

To get started with FastAPI in Python Workers, follow these steps:

1. Create a `src/main.py` file with your FastAPI application:

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

from workers import asgi
Default = asgi.entrypoint(app)
```

1. Create a `wrangler.jsonc` file to configure your Worker:

```jsonc
{
    "$schema": "node_modules/wrangler/config-schema.json",
	"name": "my-fastapi-app",
	"main": "src/main.py",
	// Set this to today's date
	"compatibility_date": "2026-08-28",
	"compatibility_flags": ["python_workers"],
}
```

```toml
"$schema" = "node_modules/wrangler/config-schema.json"
name = "my-fastapi-app"
main = "src/main.py"
# Set this to today's date
compatibility_date = "2026-08-28"
compatibility_flags = [ "python_workers" ]
```

1. Create a `pyproject.toml` file to manage your dependencies:

```toml
[project]
name = "my-fastapi-app"
version = "0.1.0"
requires-python = ">=3.13"
dependencies = [
    "fastapi",
]

[dependency-groups]
dev = [
    "workers-py",
    "workers-runtime-sdk"
]
```

1. Run your Worker locally:

```bash
uv run pywrangler dev
```

1. In another terminal, send a request to the Worker:
```sh
curl http://localhost:8787/
```
The Worker returns:
```json
{"Hello": "World"}
```

## Serve a frontend

You can serve any static frontend alongside your FastAPI backend by using [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/).

This is equivalent to FastAPI's native [app.frontend() ↗](https://fastapi.tiangolo.com/tutorial/frontend/) method, which serves a static build directory as low-priority routes so that API path operations are checked first. The difference is where the files live: `app.frontend()` reads files from the local filesystem, while on Workers the static assets are served from Cloudflare's globally distributed asset store through the `ASSETS` binding. This means your frontend files are not bundled inside the Worker itself, keeping the bundle small.

Place your frontend build output (for example, HTML, CSS, and JavaScript files) in a directory such as `./public/`. Then configure your Wrangler file with an `assets` block that includes a `binding` and sets `run_worker_first` to `true`. This ensures every request reaches your FastAPI Worker first, so your API routes take priority over static files.

Add a catch-all route at the end of your FastAPI app that proxies unmatched requests to the assets binding:

```jsonc
{
	"name": "my-fastapi-app",
	"main": "src/worker.py",
	// Set this to today's date
	"compatibility_date": "2026-08-28",
	"compatibility_flags": ["python_workers"],
	"assets": {
		"directory": "./public/",
		"binding": "ASSETS",
		"run_worker_first": true
	}
}
```

```toml
name = "my-fastapi-app"
main = "src/worker.py"
# Set this to today's date
compatibility_date = "2026-08-28"
compatibility_flags = [ "python_workers" ]

[assets]
directory = "./public/"
binding = "ASSETS"
run_worker_first = true
```

Be sure to create a `pyproject.toml` file to manage your dependencies:

```toml
[project]
name = "my-fastapi-app"
version = "0.1.0"
requires-python = ">=3.13"
dependencies = [
    "fastapi",
]

[dependency-groups]
dev = [
    "workers-py",
    "workers-runtime-sdk"
]
```

Then write your worker:

```python
from fastapi import FastAPI, Request
from fastapi.responses import Response
from workers import asgi


app = FastAPI()
Default = asgi.entrypoint(app)

@app.get("/api/hello")
async def api_hello():
    return {"message": "Hello from the API"}

# Catch-all: proxy everything else to Workers Static Assets.
# This is the Workers equivalent of app.frontend("/", directory="dist").
@app.get("/{path:path}")
async def frontend(path: str, request: Request):
    env = request.scope["env"]
    asset_url = f"https://assets.local/{path}"
    resp = await env.ASSETS.fetch(asset_url)
    body = await resp.bytes()
    return Response(content=body, status_code=resp.status, headers=resp.headers)
```

You can run this worker locally using `uv run pywrangler dev`.

With this setup, a request to `/api/hello` is handled by FastAPI, while a request to `/index.html` or any other path is served from the `./public/` directory through the assets binding.

For more information on configuring static assets, refer to the [Workers Static Assets documentation](https://developers.cloudflare.com/workers/static-assets/).

## More examples

Clone the `cloudflare/python-workers-examples` repository and run the FastAPI examples there:

```bash
git clone https://github.com/cloudflare/python-workers-examples
cd python-workers-examples/fastapi
uv run pywrangler dev
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/languages/python/packages/fastapi/#page","headline":"FastAPI · Cloudflare Workers docs","description":"Build Python Workers APIs using FastAPI with the built-in ASGI server.","url":"https://developers.cloudflare.com/workers/languages/python/packages/fastapi/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
