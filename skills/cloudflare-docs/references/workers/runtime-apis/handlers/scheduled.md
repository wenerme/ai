---
title: Scheduled Handler
description: Run Workers on a recurring schedule using the scheduled() handler and Cron Triggers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Scheduled Handler

## Background

When a Worker is invoked via a [Cron Trigger](https://developers.cloudflare.com/workers/configuration/cron-triggers/), the `scheduled()` handler handles the invocation.

Testing scheduled() handlers in local development

You can test the behavior of your `scheduled()` handler in local development by sending an HTTP request to `/cdn-cgi/handler/scheduled` to trigger the handler. Pass `?format=json` to return the structured scheduled handler result.

Terminal window

```

curl "http://localhost:8787/cdn-cgi/handler/scheduled?format=json"


```

---

## Syntax

* [  JavaScript ](#tab-panel-10796)
* [  TypeScript ](#tab-panel-10797)
* [  Python ](#tab-panel-10798)

JavaScript

```

export default {

  async scheduled(controller, env, ctx) {

    ctx.waitUntil(doSomeTaskOnASchedule());

  },

};


```

TypeScript

```

interface Env {}

export default {

  async scheduled(

    controller: ScheduledController,

    env: Env,

    ctx: ExecutionContext,

  ) {

    ctx.waitUntil(doSomeTaskOnASchedule());

  },

};


```

Python

```

from workers import WorkerEntrypoint, Response, fetch


class Default(WorkerEntrypoint):

    async def scheduled(self, controller, env, ctx):

        ctx.waitUntil(doSomeTaskOnASchedule())


```

### Properties

* `controller.cron` string  
   * The value of the [Cron Trigger](https://developers.cloudflare.com/workers/configuration/cron-triggers/) that started the `ScheduledEvent`.
* `controller.type` string  
   * The type of controller. This will always return `"scheduled"`.
* `controller.scheduledTime` number  
   * The time the `ScheduledEvent` was scheduled to be executed in milliseconds since January 1, 1970, UTC. It can be parsed as `new Date(controller.scheduledTime)`.
* `env` object  
   * An object containing the bindings associated with your Worker using ES modules format, such as KV namespaces and Durable Objects.
* `ctx` object  
   * An object containing the context associated with your Worker using ES modules format. Currently, this object just contains the `waitUntil` function.

### Handle multiple cron triggers

When you configure multiple [Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/) for a single Worker, each trigger invokes the same `scheduled()` handler. Use `controller.cron` to distinguish which schedule fired and run different logic for each.

* [  wrangler.jsonc ](#tab-panel-10801)
* [  wrangler.toml ](#tab-panel-10802)

JSONC

```

{

  "triggers": {

    "crons": ["*/5 * * * *", "0 0 * * *"],

  },

}


```

TOML

```

[triggers]

crons = [ "*/5 * * * *", "0 0 * * *" ]


```

* [  JavaScript ](#tab-panel-10799)
* [  TypeScript ](#tab-panel-10800)

JavaScript

```

export default {

  async scheduled(controller, env, ctx) {

    switch (controller.cron) {

      case "*/5 * * * *":

        ctx.waitUntil(fetch("https://example.com/api/sync"));

        break;

      case "0 0 * * *":

        ctx.waitUntil(env.MY_KV.put("last-cleanup", new Date().toISOString()));

        break;

    }

  },

};


```

TypeScript

```

export default {

  async scheduled(

    controller: ScheduledController,

    env: Env,

    ctx: ExecutionContext,

  ) {

    switch (controller.cron) {

      case "*/5 * * * *":

        ctx.waitUntil(fetch("https://example.com/api/sync"));

        break;

      case "0 0 * * *":

        ctx.waitUntil(env.MY_KV.put("last-cleanup", new Date().toISOString()));

        break;

    }

  },

} satisfies ExportedHandler<Env>;


```

The value of `controller.cron` is the exact cron expression string from your configuration. It must match character-for-character, including spacing.

### Methods

When a Workers script is invoked by a [Cron Trigger](https://developers.cloudflare.com/workers/configuration/cron-triggers/), the Workers runtime starts a `ScheduledEvent` which will be handled by the `scheduled` function in your Workers Module class. The `ctx` argument represents the context your function runs in, and contains the following methods to control what happens next:

* `ctx.waitUntil(promisePromise)` : void - Use this method to notify the runtime to wait for asynchronous tasks (for example, logging, analytics to third-party services, streaming and caching). The first `ctx.waitUntil` to fail will be observed and recorded as the status in the [Cron Trigger](https://developers.cloudflare.com/workers/configuration/cron-triggers/) Past Events table. Otherwise, it will be reported as a success.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/handlers/","name":"Handlers"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/runtime-apis/handlers/scheduled/","name":"Scheduled Handler"}}]}
```
