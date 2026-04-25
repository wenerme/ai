---
title: Multiple Cron Triggers
description: Set multiple Cron Triggers on three different schedules.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Middleware ](https://developers.cloudflare.com/search/?tags=Middleware)[ JavaScript ](https://developers.cloudflare.com/search/?tags=JavaScript)[ TypeScript ](https://developers.cloudflare.com/search/?tags=TypeScript) 

# Multiple Cron Triggers

**Last reviewed:**  over 4 years ago 

Set multiple Cron Triggers on three different schedules.

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/multiple-cron-triggers)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

* [  JavaScript ](#tab-panel-9894)
* [  TypeScript ](#tab-panel-9895)
* [  Hono ](#tab-panel-9896)

JavaScript

```

export default {

  async scheduled(event, env, ctx) {

    // Write code for updating your API

    switch (event.cron) {

      case "*/3 * * * *":

        // Every three minutes

        await updateAPI();

        break;

      case "*/10 * * * *":

        // Every ten minutes

        await updateAPI2();

        break;

      case "*/45 * * * *":

        // Every forty-five minutes

        await updateAPI3();

        break;

    }

    console.log("cron processed");

  },

};


```

Explain Code

TypeScript

```

interface Env {}

export default {

  async scheduled(

    controller: ScheduledController,

    env: Env,

    ctx: ExecutionContext,

  ) {

    // Write code for updating your API

    switch (controller.cron) {

      case "*/3 * * * *":

        // Every three minutes

        await updateAPI();

        break;

      case "*/10 * * * *":

        // Every ten minutes

        await updateAPI2();

        break;

      case "*/45 * * * *":

        // Every forty-five minutes

        await updateAPI3();

        break;

    }

    console.log("cron processed");

  },

};


```

Explain Code

TypeScript

```

import { Hono } from "hono";


interface Env {}


// Create Hono app

const app = new Hono<{ Bindings: Env }>();


// Regular routes for normal HTTP requests

app.get("/", (c) => c.text("Multiple Cron Trigger Example"));


// Export both the app and a scheduled function

export default {

  // The Hono app handles regular HTTP requests

  fetch: app.fetch,


  // The scheduled function handles Cron triggers

  async scheduled(

    controller: ScheduledController,

    env: Env,

    ctx: ExecutionContext,

  ) {

    // Check which cron schedule triggered this execution

    switch (controller.cron) {

      case "*/3 * * * *":

        // Every three minutes

        await updateAPI();

        break;

      case "*/10 * * * *":

        // Every ten minutes

        await updateAPI2();

        break;

      case "*/45 * * * *":

        // Every forty-five minutes

        await updateAPI3();

        break;

    }

    console.log("cron processed");

  },

};


```

Explain Code

## Test Cron Triggers using Wrangler

The recommended way of testing Cron Triggers is using Wrangler.

Cron Triggers can be tested using Wrangler by passing in the `--test-scheduled` flag to [wrangler dev](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev). This will expose a `/__scheduled` (or `/cdn-cgi/handler/scheduled` for Python Workers) route which can be used to test using a HTTP request. To simulate different cron patterns, a `cron` query parameter can be passed in.

Terminal window

```

npx wrangler dev --test-scheduled


curl "http://localhost:8787/__scheduled?cron=*%2F3+*+*+*+*"


curl "http://localhost:8787/cdn-cgi/handler/scheduled?cron=*+*+*+*+*" # Python Workers


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/multiple-cron-triggers/","name":"Multiple Cron Triggers"}}]}
```
