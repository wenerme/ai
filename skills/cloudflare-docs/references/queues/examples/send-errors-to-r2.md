---
title: Use Queues to store data in R2
description: Example of how to use Queues to batch data and store it in an R2 bucket.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/queues/examples/send-errors-to-r2.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Use Queues to store data in R2

**Last reviewed:**  over 3 years ago 

Example of how to use Queues to batch data and store it in an R2 bucket.

The following Worker will catch JavaScript errors and send them to a queue. The same Worker will receive those errors in batches and store them to a log file in an R2 bucket.

* [  wrangler.jsonc ](#tab-panel-8097)
* [  wrangler.toml ](#tab-panel-8098)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "my-worker",

  "queues": {

    "producers": [

      {

        "queue": "my-queue",

        "binding": "ERROR_QUEUE"

      }

    ],

    "consumers": [

      {

        "queue": "my-queue",

        "max_batch_size": 100,

        "max_batch_timeout": 30

      }

    ]

  },

  "r2_buckets": [

    {

      "bucket_name": "my-bucket",

      "binding": "ERROR_BUCKET"

    }

  ]

}


```

Explain Code

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "my-worker"


[[queues.producers]]

queue = "my-queue"

binding = "ERROR_QUEUE"


[[queues.consumers]]

queue = "my-queue"

max_batch_size = 100

max_batch_timeout = 30


[[r2_buckets]]

bucket_name = "my-bucket"

binding = "ERROR_BUCKET"


```

Explain Code

TypeScript

```

interface ErrorMessage {

  message: string;

  stack?: string;

}


interface Env {

  readonly ERROR_QUEUE: Queue<ErrorMessage>;

  readonly ERROR_BUCKET: R2Bucket;

}


export default {

  async fetch(req, env, ctx): Promise<Response> {

    try {

      return doRequest(req);

    } catch (e) {

      const error: ErrorMessage = {

        message: e instanceof Error ? e.message : String(e),

        stack: e instanceof Error ? e.stack : undefined,

      };

      await env.ERROR_QUEUE.send(error);

      return new Response(error.message, { status: 500 });

    }

  },

  async queue(batch, env, ctx): Promise<void> {

    let file = "";

    for (const message of batch.messages) {

      const error = message.body;

      file += error.stack ?? error.message;

      file += "\r\n";

    }

    await env.ERROR_BUCKET.put(`errors/${Date.now()}.log`, file);

  },

} satisfies ExportedHandler<Env, ErrorMessage>;


function doRequest(request: Request): Response {

  if (Math.random() > 0.5) {

    return new Response("Success!");

  }

  throw new Error("Failed!");

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/queues/","name":"Queues"}},{"@type":"ListItem","position":3,"item":{"@id":"/queues/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/queues/examples/send-errors-to-r2/","name":"Use Queues to store data in R2"}}]}
```
