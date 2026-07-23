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

Last updated Jun 22, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/languages/python/packages/fastapi/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The FastAPI package is supported in Python Workers.

FastAPI applications use a protocol called the [Asynchronous Server Gateway Interface (ASGI) ↗](https://asgi.readthedocs.io/en/latest/). This means that FastAPI never reads from or writes to a socket itself. An ASGI application expects to be hooked up to an ASGI server, typically [uvicorn ↗](https://uvicorn.dev/). The ASGI server handles all of the raw sockets on the application’s behalf.

The Python Workers provides [an ASGI server ↗](https://github.com/cloudflare/workers-py/blob/main/packages/runtime-sdk/src/asgi.py)that you can use directly in your Python Worker, which lets you use FastAPI in Python Workers.

## Get Started

Clone the `cloudflare/python-workers-examples` repository and run the FastAPI example:

```bash
git clone https://github.com/cloudflare/python-workers-examples
cd python-workers-examples/03-fastapi
uv run pywrangler dev
```

### Example code

```python
from workers import WorkerEntrypoint
from fastapi import FastAPI, Request
from pydantic import BaseModel
import asgi

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        return await asgi.fetch(app, request, self.env)

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello, World!"}

@app.get("/env")
async def root(req: Request):
    env = req.scope["env"]
    return {"message": "Here is an example of getting an environment variable: " + env.MESSAGE}

class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None

@app.post("/items/")
async def create_item(item: Item):
    return item

@app.put("/items/{item_id}")
async def create_item(item_id: int, item: Item, q: str | None = None):
    result = {"item_id": item_id, **item.dict()}
    if q:
        result.update({"q": q})
    return result

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/languages/python/packages/fastapi/#page","headline":"FastAPI · Cloudflare Workers docs","description":"Build Python Workers APIs using FastAPI with the built-in ASGI server.","url":"https://developers.cloudflare.com/workers/languages/python/packages/fastapi/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
