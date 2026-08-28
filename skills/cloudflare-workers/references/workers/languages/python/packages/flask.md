---
description: Run Flask applications in Python Workers.
title: Flask
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Flask

Last updated Aug 28, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/languages/python/packages/flask/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Flask ↗](https://flask.palletsprojects.com/) is supported in Python Workers.

Flask applications rely on a protocol called the Web Server Gateway Interface (WSGI). This means that Flask never directly reads or writes to a socket, instead relying on the WSGI server to communicate.

Python Workers include a [WSGI server ↗](https://github.com/cloudflare/workers-py/blob/main/packages/runtime-sdk/src/workers/wsgi.py)which you can use with Flask applications.

## Create a Flask Worker

Use this quick start to run a minimal Flask application.

1. Create `src/worker.py` with your flask application:
```python
from flask import Flask
from workers import wsgi
app = Flask(__name__)
@app.get("/")
def index():
    return {"message": "Hello from Flask"}
Default = wsgi.entrypoint(app)
```
2. In the project root, create `wrangler.jsonc`:
```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "my-flask-worker",
  "main": "src/worker.py",
  // Set this to today's date
  "compatibility_date": "2026-08-28",
  "compatibility_flags": ["python_workers"]
}
```
```toml
"$schema" = "node_modules/wrangler/config-schema.json"
name = "my-flask-worker"
main = "src/worker.py"
# Set this to today's date
compatibility_date = "2026-08-28"
compatibility_flags = [ "python_workers" ]
```
3. Create a `pyproject.toml` to declare dependencies:
```toml
[project]
name = "flask-worker"
version = "0.1.0"
requires-python = ">=3.12"
dependencies = [
    "flask",
]
[dependency-groups]
dev = [
    "workers-py",
    "workers-runtime-sdk",
]
```
4. Start the local development server:
```sh
uv run pywrangler dev
```
5. In another terminal, send a request to the Worker:
```sh
curl http://localhost:8787/
```
The Worker returns:
```json
{"message":"Hello from Flask"}
```

## Serve a frontend

You can serve any static frontend alongside your flask backend by using [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/). Using Static Assets means your frontend files are not bundled inside the Worker itself, keeping the bundle small.

Place your static files in a directory such as `./public/`. Then configure your Wrangler file with an `assets` block that includes a `binding` and sets `run_worker_first` to `true`. This ensures every request reaches your FastAPI Worker first, so your API routes take priority over static files.

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "my-flask-worker",
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
"$schema" = "node_modules/wrangler/config-schema.json"
name = "my-flask-worker"
main = "src/worker.py"
# Set this to today's date
compatibility_date = "2026-08-28"
compatibility_flags = [ "python_workers" ]

[assets]
directory = "./public/"
binding = "ASSETS"
run_worker_first = true
```

The following Worker handles an API route before forwarding other requests. The catch-all handlers return each asset's body, status, and headers:

```python
from flask import Flask, Response, request
from pyodide.ffi import run_sync
from workers import wsgi


app = Flask(__name__)


@app.get("/api/hello")
def api_hello():
    return {"message": "Hello from the API"}


@app.get("/")
@app.get("/<path:path>")
def frontend(path=""):
    assets = request.environ["workers.env"].ASSETS
    asset_response = run_sync(assets.fetch(f"https://assets.local/{path}"))
    body = run_sync(asset_response.bytes())
    return Response(
        body,
        status=asset_response.status,
        headers=asset_response.headers,
    )


Default = wsgi.entrypoint(app)
```

`run_sync` bridges both asynchronous asset operations into Flask's synchronous handler. API routes take priority, and unmatched paths are served from `./public/`.

## More examples

Clone the `cloudflare/python-workers-examples` repository and run the flask-todo example there:

```bash
git clone https://github.com/cloudflare/python-workers-examples
cd python-workers-examples/flask-todo
#  See README.md for instructions
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/languages/python/packages/flask/#page","headline":"Flask · Cloudflare Workers docs","description":"Run Flask applications in Python Workers.","url":"https://developers.cloudflare.com/workers/languages/python/packages/flask/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
