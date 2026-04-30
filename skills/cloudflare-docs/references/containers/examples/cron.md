---
title: Cron Container
description: Running a container on a schedule using Cron Triggers
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cron Container

**Last reviewed:**  10 months ago 

Running a container on a schedule using Cron Triggers

To launch a container on a schedule, you can use a Workers [Cron Trigger](https://developers.cloudflare.com/workers/configuration/cron-triggers/).

For a full example, see the [Cron Container Template ↗](https://github.com/mikenomitch/cron-container/tree/main).

Use a cron expression in your Wrangler config to specify the schedule:

* [  wrangler.jsonc ](#tab-panel-5320)
* [  wrangler.toml ](#tab-panel-5321)

JSONC

```

{

  "name": "cron-container",

  "main": "src/index.ts",

  "triggers": {

    "crons": [

      "*/2 * * * *" // Run every 2 minutes

    ]

  },

  "containers": [

    {

      "class_name": "CronContainer",

      "image": "./Dockerfile"

    }

  ],

  "durable_objects": {

    "bindings": [

      {

        "class_name": "CronContainer",

        "name": "CRON_CONTAINER"

      }

    ]

  },

  "migrations": [

    {

      "new_sqlite_classes": ["CronContainer"],

      "tag": "v1"

    }

  ]

}


```

TOML

```

name = "cron-container"

main = "src/index.ts"


[triggers]

crons = [ "*/2 * * * *" ]


[[containers]]

class_name = "CronContainer"

image = "./Dockerfile"


[[durable_objects.bindings]]

class_name = "CronContainer"

name = "CRON_CONTAINER"


[[migrations]]

new_sqlite_classes = [ "CronContainer" ]

tag = "v1"


```

Then in your Worker, call your Container from the "scheduled" handler:

TypeScript

```

import { Container, getContainer } from '@cloudflare/containers';


export class CronContainer extends Container {

  sleepAfter = '10s';


  override onStart() {

    console.log('Starting container');

  }


  override onStop() {

    console.log('Container stopped');

  }

}


export default {

  async fetch(): Promise<Response> {

    return new Response("This Worker runs a cron job to execute a container on a schedule.");

  },


  async scheduled(_controller: any, env: { CRON_CONTAINER: DurableObjectNamespace<CronContainer> }) {

    let container = getContainer(env.CRON_CONTAINER);

    await container.start({

      envVars: {

        MESSAGE: "Start Time: " + new Date().toISOString(),

      }

    })

  },

};


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/containers/","name":"Containers"}},{"@type":"ListItem","position":3,"item":{"@id":"/containers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/containers/examples/cron/","name":"Cron Container"}}]}
```
