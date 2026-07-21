---
description: Define directed acyclic graph (DAG) Workflows in Python with declarative step dependencies.
title: DAG Workflows
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workflows/llms.txt
> Use this file to discover all available pages before exploring further.

#  DAG Workflows

Last updated Apr 22, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/workflows/python/dag/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

The Python Workflows SDK supports DAG workflows in a declarative way, using `step.do` and parameter names to define dependencies (other steps that must complete before a step can run).

```python
from workers import Response, WorkflowEntrypoint, WorkerEntrypoint

class PythonWorkflowStarter(WorkflowEntrypoint):
    async def run(self, event, step):
        async def await_step(fn):
            try:
                return await fn()
            except TypeError as e:
                print(f"Successfully caught {type(e).__name__}: {e}")

        await step.sleep('demo sleep', '10 seconds')

        @step.do()
        async def dep_1():
            # does stuff
            print('executing dep1')
            return 'dep1'

        @step.do()
        async def dep_2():
            # does stuff
            print('executing dep2')
            return 'dep2'

        @step.do(concurrent=True)
        async def final_step(dep_1, dep_2):
            # does stuff
            print(f'{dep_1} {dep_2}')

        await await_step(final_step)

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        await self.env.MY_WORKFLOW.create()
        return Response("Hello world!")
```

In this example, `dep_1` and `dep_2` are run concurrently before execution of `final_step`, which depends on both of them.

Having `concurrent=True` allows dependencies to be resolved concurrently. If a dependency has already completed, it will be skipped and its return value will be reused.

Note

Older compatibility behavior supports explicit dependency lists with `depends=[...]`. For new workflows, use parameter names to express step dependencies.

This pattern is useful for diamond shaped workflows, where a step depends on two or more other steps that can run concurrently.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workflows/python/dag/#page","headline":"DAG Workflows · Cloudflare Workflows docs","description":"Define directed acyclic graph (DAG) Workflows in Python with declarative step dependencies.","url":"https://developers.cloudflare.com/workflows/python/dag/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
