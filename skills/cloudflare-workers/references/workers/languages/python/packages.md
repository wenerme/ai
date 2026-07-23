---
description: Manage and use Python packages in Cloudflare Workers with Pywrangler.
title: Packages
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Packages

Last updated Jun 22, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/languages/python/packages/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Pywrangler ↗](https://github.com/cloudflare/workers-py?tab=readme-ov-file#pywrangler) is a CLI tool for managing packages and Python Workers. It is meant as a wrapper for wrangler that sets up a full environment for you, including bundling your packages into your worker bundle on deployment.

To get started, create a pyproject.toml file with the following contents:

```toml
[project]
name = "YourProjectName"
version = "0.1.0"
description = "Add your description here"
requires-python = ">=3.13"
dependencies = [
    "fastapi"
]

[dependency-groups]
dev = [
	"workers-py",
	"workers-runtime-sdk"
]
```

The above will allow your worker to depend on the [FastAPI ↗](https://fastapi.tiangolo.com/) package.

To run the worker locally:

```plaintext
uv run pywrangler dev
```

To deploy your worker:

```plaintext
uv run pywrangler deploy
```

Your dependencies will get bundled with your worker automatically on deployment.

The `pywrangler` CLI also supports all commands supported by the `wrangler` tool, for the full list of commands run `uv run pywrangler --help`.

## Supported Libraries

Python Workers support pure and [PyEmscripten ↗](https://peps.python.org/pep-0783/) Python packages on [PyPI ↗](https://pypi.org/). Additionally, Python Workers support packages that are included in [Pyodide ↗](https://pyodide.org/en/stable/usage/packages-in-pyodide.html).

WebAssembly support for Python packages is still in early stages, and some packages may not yet be available as PyEmscripten wheels on PyPI. If a package you would like to use is not yet available, we encourage you to reach out to the package maintainers and request PyEmscripten wheels. You can also start a thread in the [Python Packages Discussions ↗](https://github.com/cloudflare/workerd/discussions/categories/python-packages)on the Cloudflare Workers Runtime GitHub repository — we would be happy to help you communicate with package maintainers.

## HTTP Client Libraries

Only HTTP libraries that are able to make requests asynchronously are supported. Currently, these include [aiohttp ↗](https://docs.aiohttp.org/en/stable/index.html) and [httpx ↗](https://www.python-httpx.org/). You can also use the [fetch() API](https://developers.cloudflare.com/workers/runtime-apis/fetch/) from JavaScript, using Python Workers' [foreign function interface](https://developers.cloudflare.com/workers/languages/python/ffi) to make HTTP requests.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/languages/python/packages/#page","headline":"Python packages supported in Cloudflare Workers · Cloudflare Workers docs","description":"Manage and use Python packages in Cloudflare Workers with Pywrangler.","url":"https://developers.cloudflare.com/workers/languages/python/packages/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
