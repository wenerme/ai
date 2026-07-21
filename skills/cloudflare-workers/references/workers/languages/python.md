---
description: Write Workers in 100% Python
title: Python Workers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

#  Python Workers

Last updated Jun 22, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/workers/languages/python/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Cloudflare Workers provides a first-class Python experience, including support for:

* Easy to install and fast-booting [Packages](https://developers.cloudflare.com/workers/languages/python/packages), including [FastAPI ↗](https://fastapi.tiangolo.com/), [Langchain ↗](https://pypi.org/project/langchain/), [Pydantic ↗](https://docs.pydantic.dev/latest/) and more.
* A robust [foreign function interface (FFI)](https://developers.cloudflare.com/workers/languages/python/ffi) that lets you use JavaScript objects and functions directly from Python — including all [Runtime APIs](https://developers.cloudflare.com/workers/runtime-apis/)
* An ecosystem of services on the Workers Platform accessible via [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/), including:
  * State storage and databases like [KV](https://developers.cloudflare.com/kv), [D1](https://developers.cloudflare.com/d1), [Durable Objects](https://developers.cloudflare.com/durable-objects/)
  * Access to [Environment Variables](https://developers.cloudflare.com/workers/configuration/environment-variables/), [Secrets](https://developers.cloudflare.com/workers/configuration/secrets/), and other Workers using [Service Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/)
  * AI capabilities with [Workers AI](https://developers.cloudflare.com/workers-ai/), [Vectorize](https://developers.cloudflare.com/vectorize)
  * File storage with [R2](https://developers.cloudflare.com/r2)
  * [Durable Workflows](https://developers.cloudflare.com/workflows/), [Queues](https://developers.cloudflare.com/queues/), and [more](https://developers.cloudflare.com/workers/runtime-apis/bindings/)

## Introduction

A Python Worker can be as simple as four lines of code:

```python
from workers import WorkerEntrypoint, Response

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        return Response("Hello World!")
```

Similar to other Workers, the main entry point for a Python worker is the [fetch handler](https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch) which handles incoming requests sent to the Worker.

In a Python Worker, this handler is placed in a `Default` class that extends the `WorkerEntrypoint` class (which you can import from the `workers` SDK module).

Python Workers are in beta.

You must add the `python_workers` compatibility flag to your Worker, while Python Workers are in open beta.

We'd love your feedback. Join the #python-workers channel in the [Cloudflare Developers Discord ↗](https://discord.cloudflare.com/) and let us know what you'd like to see next.

### The `pywrangler` CLI tool

To run a Python Worker locally, install packages, and deploy it to Cloudflare, you use [pywrangler ↗](https://github.com/cloudflare/workers-py), the CLI for Python Workers.

To set it up, first, ensure [uv ↗](https://docs.astral.sh/uv/#installation) and [Node ↗](https://nodejs.org/en) are installed.

Then set up your development environment:

```bash
uvx --from workers-py pywrangler init
```

This will create a `pyproject.toml` file with `workers-py` as a development dependency. `pywrangler init` will create a wrangler config file. You can then run `pywrangler` with:

```bash
uv run pywrangler dev
```

To deploy a Python Worker to Cloudflare, run `pywrangler deploy`:

```bash
uv run pywrangler deploy
```

### Python Worker Templates

When you initialize a new Python Worker project and select from one of many templates:

```bash
uv run pywrangler init
```

Or you can clone the examples repository to explore more options:

```bash
git clone https://github.com/cloudflare/python-workers-examples
cd python-workers-examples/01-hello
```

## Next Up

* Learn more about [the basics of Python Workers](https://developers.cloudflare.com/workers/languages/python/basics)
* Learn details about local development, deployment, and [how to Python Workers work](https://developers.cloudflare.com/workers/languages/python/how-python-workers-work).
* Explore the [package](https://developers.cloudflare.com/workers/languages/python/packages) docs for instructions on how to use packages with Python Workers.
* Understand which parts of the [Python Standard Library](https://developers.cloudflare.com/workers/languages/python/stdlib) are supported in Python Workers.
* Learn about Python Workers' [foreign function interface (FFI)](https://developers.cloudflare.com/workers/languages/python/ffi), and how to use it to work with [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings) and [Runtime APIs](https://developers.cloudflare.com/workers/runtime-apis/).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/languages/python/#page","headline":"Write Cloudflare Workers in Python · Cloudflare Workers docs","description":"Write Workers in 100% Python","url":"https://developers.cloudflare.com/workers/languages/python/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
