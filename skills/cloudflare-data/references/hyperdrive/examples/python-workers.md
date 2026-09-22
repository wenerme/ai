---
description: Connect Python Workers to PostgreSQL and MySQL with Hyperdrive.
title: Python Workers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt
> Use this file to discover all available pages before exploring further.

# Python Workers

Last updated Sep 19, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/hyperdrive/examples/python-workers/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

You can use Hyperdrive with [Python Workers](https://developers.cloudflare.com/workers/languages/python/). To use Hyperdrive with Python Workers, set your compatibility date to `2026-09-08` or later.

## Supported drivers

Hyperdrive in Python Workers uses [TCP socket support](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/#connect) to establish database connections. While you can use any Python driver that works with TCP connections, we strongly recommend using the drivers in the tables below, as they have been tested and verified to work with Hyperdrive.

### PostgreSQL

| Driver | Documentation |
| --- | --- |
| `asyncpg` (recommended) | [asyncpg documentation ↗](https://magicstack.github.io/asyncpg/current/) |
| `pg8000` | [pg8000 documentation ↗](https://codeberg.org/tlocke/pg8000) |
| `psycopg` | [psycopg documentation ↗](https://www.psycopg.org/psycopg3/docs/index.html) |

### MySQL

| Driver | Documentation |
| --- | --- |
| `aiomysql` (recommended) | [aiomysql documentation ↗](https://aiomysql.readthedocs.io/en/latest/) |
| `pymysql` | [pymysql documentation ↗](https://pymysql.readthedocs.io/) |

## Connect to your database

Before you begin, [create a Python Worker](https://developers.cloudflare.com/workers/languages/python/#the-pywrangler-cli-tool) and [create a Hyperdrive configuration](https://developers.cloudflare.com/hyperdrive/get-started/) for your database.

1. Add the Hyperdrive binding to your [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/). Replace `<HYPERDRIVE_CONFIG_ID>` with your configuration ID.

   ```jsonc
   {
     "$schema": "./node_modules/wrangler/config-schema.json",
     "name": "python-hyperdrive",
     "main": "src/main.py",
     // Set this to today's date
     "compatibility_date": "2026-09-22",
     "compatibility_flags": [
       "python_workers"
     ],
     "hyperdrive": [
       {
         "binding": "HYPERDRIVE",
         "id": "<HYPERDRIVE_CONFIG_ID>"
       }
     ]
   }
   ```

   ```toml
   name = "python-hyperdrive"
   main = "src/main.py"
   # Set this to today's date
   compatibility_date = "2026-09-22"
   compatibility_flags = ["python_workers"]

   [[hyperdrive]]
   binding = "HYPERDRIVE"
   id = "<HYPERDRIVE_CONFIG_ID>"
   ```


2. Install your driver and replace `src/main.py` with the corresponding example.

   ```toml
   [project]
   dependencies = [
       "asyncpg",
   ]
   ```

   *src/main.pypython*



   ```python
   from contextlib import closing

   import asyncpg
   from workers import Response, WorkerEntrypoint

   class Default(WorkerEntrypoint):
       async def fetch(self, request):
           hd = self.env.HYPERDRIVE
           connection = await asyncpg.connect(
               host=hd.host,
               port=int(hd.port),
               user=hd.user,
               password=hd.password,
               database=hd.database,
               ssl=False,
           )
           await connection.execute("SELECT 1")
           await connection.close()
   ```

   ```toml
   [project]
   dependencies = [
       "aiomysql",
   ]
   ```

   *src/main.pypython*



   ```python
   import aiomysql
   from workers import Response, WorkerEntrypoint


   class Default(WorkerEntrypoint):
       async def fetch(self, request):
           hd = self.env.HYPERDRIVE
           connection = await aiomysql.connect(
               host=hd.host,
               port=int(hd.port),
               user=hd.user,
               password=hd.password,
               db=hd.database,
               ssl=None,
           )
           try:
               cursor = await connection.cursor()
               await cursor.execute("SELECT 1")
               result = await cursor.fetchone()
               return Response.json({"result": result[0]})
           finally:
               connection.close()
   ```


3. Deploy your Worker:

   ```bash
   uv run pywrangler deploy
   ```



## Limitations and compatibility

### Socket support

TCP socket support in Python Workers internally uses the [`connect`](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/#connect) API. While most standard library socket operations are supported, some low-level operations might not work as expected.

### Concurrency and async safety

Socket operations in Python Workers do not block the event loop. Although Python's native socket operations are synchronous, the underlying TCP socket implementation in Python Workers is asynchronous. This allows multiple requests to be processed concurrently while one request waits for a socket operation to complete.

To ensure synchronous database operations are serialized, use a lock to prevent concurrent access:

```python
import asyncio

lock = asyncio.Lock()

async with lock:
    # Your database operation here
    synchronous_db_operation()
```

### SQLAlchemy support

Currently, only synchronous SQLAlchemy ORMs are supported in Python Workers. Async SQLAlchemy ORMs are not yet supported due to a lack of greenlet support in the Python Workers environment.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/examples/python-workers/#page","headline":"Python Workers","description":"Connect Python Workers to PostgreSQL and MySQL with Hyperdrive.","url":"https://developers.cloudflare.com/hyperdrive/examples/python-workers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-19","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
